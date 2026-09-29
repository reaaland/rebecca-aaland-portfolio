import type { Metadata } from "next";
import { SomethingElseRequestForm } from "./something-else-request-form";

export const metadata: Metadata = {
  title: "Something Else | Aaland Client Portal",
  description: "Submit a general request through the Aaland client portal.",
};

export default function SomethingElseRequestPage() {
  return <SomethingElseRequestForm />;
}
