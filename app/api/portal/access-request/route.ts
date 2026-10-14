import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

type AccessRequestBody = {
  contactName?: unknown;
  businessName?: unknown;
  email?: unknown;
  reason?: unknown;
  companySite?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function createPortalClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) return null;

  return createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

export async function POST(request: Request) {
  let body: AccessRequestBody;

  try {
    body = (await request.json()) as AccessRequestBody;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const companySite = clean(body.companySite, 200);

  // Honeypot: accept silently so automated submitters get no useful signal.
  if (companySite) {
    return Response.json({ ok: true });
  }

  const contactName = clean(body.contactName, 100);
  const businessName = clean(body.businessName, 150);
  const email = clean(body.email, 254).toLowerCase();
  const reason = clean(body.reason, 1000);

  if (contactName.length < 2 || !emailPattern.test(email)) {
    return Response.json(
      { error: "Please enter your name and a valid email address." },
      { status: 400 },
    );
  }

  const supabase = createPortalClient();

  if (!supabase) {
    return Response.json(
      { error: "Portal access requests are not configured right now." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("portal_access_requests").insert({
    contact_name: contactName,
    business_name: businessName || null,
    email,
    reason: reason || null,
  });

  const duplicatePending = error?.code === "23505";

  if (error && !duplicatePending) {
    console.error("Portal access request failed:", error.code);
    return Response.json(
      { error: "We could not save your access request. Please try again." },
      { status: 400 },
    );
  }

  const requestStatus = duplicatePending ? "pending" : "created";
  let emailSent = false;
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    const resend = new Resend(apiKey);
    const subjectName = contactName.replace(/[\r\n]+/g, " ");
    const dashboardUrl = `${new URL(request.url).origin}/portal/dashboard`;
    const details = [
      "A new client portal access request was submitted.",
      "",
      `Name: ${contactName}`,
      `Email: ${email}`,
      businessName ? `Business: ${businessName}` : "",
      reason ? `Reason: ${reason}` : "Reason: Not provided",
      "",
      "Approve or reject this request in the Aaland Client Portal:",
      dashboardUrl,
    ].filter(Boolean);

    try {
      const { error: emailError } = await resend.emails.send({
        from: "Aaland Web Design & Business Solutions <website@rebeccaiaaland.com>",
        to: ["rebecca@rebeccaiaaland.com"],
        replyTo: email,
        subject: `Portal access request from ${subjectName}`,
        text: details.join("\n"),
      });

      emailSent = !emailError;

      if (emailError) {
        console.error("Portal access notification failed:", emailError.name);
      }
    } catch {
      console.error("Portal access notification request failed.");
    }
  }

  return Response.json({
    ok: true,
    status: requestStatus,
    emailSent,
  });
}
