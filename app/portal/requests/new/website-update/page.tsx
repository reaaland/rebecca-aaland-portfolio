import type { Metadata } from "next";
import { WebsiteUpdateRequestForm } from "./website-update-request-form";

export const metadata: Metadata = {
  title: "Website Update Request",
  description: "Submit a website update request through the Aaland client portal.",
};

export default function WebsiteUpdateRequestPage() {
  return <WebsiteUpdateRequestForm />;
}
