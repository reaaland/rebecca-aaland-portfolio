import type { Metadata } from "next";
import { ChangeBusinessInformationRequestForm } from "./change-business-information-request-form";

export const metadata: Metadata = {
  title: "Change Business Information | Aaland Client Portal",
  description:
    "Submit a business information update through the Aaland client portal.",
};

export default function ChangeBusinessInformationRequestPage() {
  return <ChangeBusinessInformationRequestForm />;
}
