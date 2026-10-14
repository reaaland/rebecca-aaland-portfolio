import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

type DecisionBody = {
  requestId?: unknown;
  approve?: unknown;
  reason?: unknown;
};

type DecisionResult = {
  status?: "approved" | "rejected";
  request_id?: string;
  client_id?: string;
  contact_name?: string;
  email?: string;
  decision_reason?: string | null;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function createAuthenticatedPortalClient(accessToken: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) return null;

  return createClient(url, publishableKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return Response.json({ error: "Admin sign-in required." }, { status: 401 });
  }

  const accessToken = authorization.slice("Bearer ".length).trim();

  if (!accessToken) {
    return Response.json({ error: "Admin sign-in required." }, { status: 401 });
  }

  let body: DecisionBody;

  try {
    body = (await request.json()) as DecisionBody;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const requestId = clean(body.requestId, 64);
  const approve = body.approve === true;
  const reason = clean(body.reason, 1000);

  if (!requestId) {
    return Response.json({ error: "Access request is required." }, { status: 400 });
  }

  if (!approve && !reason) {
    return Response.json(
      { error: "Please enter a reason before rejecting access." },
      { status: 400 },
    );
  }

  const supabase = createAuthenticatedPortalClient(accessToken);

  if (!supabase) {
    return Response.json(
      { error: "Portal administration is not configured right now." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase.rpc("decide_portal_access_request", {
    p_request_id: requestId,
    p_approve: approve,
    p_decision_reason: reason || null,
  });

  if (error) {
    console.error("Portal access decision failed:", error.code);
    const status = error.message.includes("Administrator") ? 403 : 400;
    return Response.json(
      { error: "We could not save that access decision. Please refresh and try again." },
      { status },
    );
  }

  const result = (data ?? {}) as DecisionResult;
  const recipient = result.email;
  const name = result.contact_name || "there";
  const apiKey = process.env.RESEND_API_KEY;
  let emailSent = false;

  if (recipient && apiKey) {
    const resend = new Resend(apiKey);
    const origin = new URL(request.url).origin;
    const signInUrl = `${origin}/portal/login`;

    const approvedText = [
      `Hi ${name},`,
      "",
      "Your Aaland Client Portal access has been approved.",
      "",
      `Sign in here: ${signInUrl}`,
      "",
      "You can use Google sign-in or request a secure email sign-in link with the approved email address.",
      "",
      "Aaland Web Design & Business Solutions",
    ].join("\n");

    const rejectedText = [
      `Hi ${name},`,
      "",
      "Your Aaland Client Portal access request was not approved.",
      "",
      `Reason: ${result.decision_reason || reason}`,
      "",
      "If you think this was a mistake, reply to this email and Rebecca can review it.",
      "",
      "Aaland Web Design & Business Solutions",
    ].join("\n");

    try {
      const { error: emailError } = await resend.emails.send({
        from: "Aaland Web Design & Business Solutions <website@rebeccaiaaland.com>",
        to: [recipient],
        replyTo: "rebecca@rebeccaiaaland.com",
        subject:
          result.status === "approved"
            ? "Your Aaland Client Portal access is approved"
            : "Aaland Client Portal access request",
        text: result.status === "approved" ? approvedText : rejectedText,
      });

      emailSent = !emailError;

      if (emailError) {
        console.error("Portal access decision email failed:", emailError.name);
      }
    } catch {
      console.error("Portal access decision email request failed.");
    }
  }

  return Response.json({
    ok: true,
    status: result.status,
    emailSent,
  });
}
