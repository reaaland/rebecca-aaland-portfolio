import type { Metadata } from "next";
import { ClientRequestDetail } from "./client-request-detail";

export const metadata: Metadata = {
  title: "Request Details | Aaland Client Portal",
  description: "View the status and history of your client portal request.",
};

export default function ClientRequestPage() {
  return <ClientRequestDetail />;
}
