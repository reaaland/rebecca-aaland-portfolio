import type { Metadata } from "next";
import { PortalDashboard } from "./portal-dashboard";

export const metadata: Metadata = {
  title: "Client Portal Dashboard",
  description: "Aaland Web Design & Site Care client portal dashboard.",
};

export default function PortalDashboardPage() {
  return <PortalDashboard />;
}
