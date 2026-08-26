import { Resend } from "resend";

const inquiryLabels = {
  role: "Frontend opportunity",
  website: "Website project",
  general: "General inquiry",
} as const;

type InquiryType = keyof typeof inquiryLabels;

type ContactRequest = {
  inquiryType?: unknown;
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  roleTitle?: unknown;
  website?: unknown;
  companySite?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isInquiryType(value: string): value is InquiryType {
  return value in inquiryLabels;
}

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const companySite = clean(body.companySite, 200);

  // Silently accept bot submissions so the honeypot is not easy to probe.
  if (companySite) {
    return Response.json({ ok: true });
  }

  const inquiryType = clean(body.inquiryType, 20);
  const name = clean(body.name, 100);
  const email = clean(body.email, 254).toLowerCase();
  const organization = clean(body.organization, 150);
  const roleTitle = clean(body.roleTitle, 150);
  const website = clean(body.website, 500);
  const message = clean(body.message, 5000);

  if (
    !isInquiryType(inquiryType) ||
    !name ||
    !emailPattern.test(email) ||
    !message
  ) {
    return Response.json(
      { error: "Please complete the required fields." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  const subjectName = name.replace(/[\r\n]+/g, " ");
  const details = [
    `Inquiry: ${inquiryLabels[inquiryType]}`,
    `Name: ${name}`,
    `Email: ${email}`,
    organization ? `Company / organization: ${organization}` : "",
    inquiryType === "role" && roleTitle ? `Role: ${roleTitle}` : "",
    inquiryType === "website" && website ? `Current website: ${website}` : "",
  ].filter(Boolean);

  details.push("", "Message:", message);

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Rebecca Aaland Portfolio <onboarding@resend.dev>",
      to: ["reaaland@gmail.com"],
      replyTo: email,
      subject: `${inquiryLabels[inquiryType]} from ${subjectName}`,
      text: details.join("\n"),
    });

    if (!error) {
      return Response.json({ ok: true });
    }

    console.error("Contact form email failed:", error.name);
  } catch {
    console.error("Contact form email request failed.");
  }

  return Response.json(
    { error: "The message could not be delivered." },
    { status: 502 },
  );
}
