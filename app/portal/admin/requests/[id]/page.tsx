import type { Metadata } from "next";
import { AdminRequestDetail } from "./admin-request-detail";

export const metadata: Metadata = {
  title: "Client Request | Aaland Client Portal",
  description: "Review a client website request in the Aaland client portal.",
};

export default function AdminRequestPage() {
  return <AdminRequestDetail />;
}
