import { redirect } from "next/navigation";

export default function PortalAuthTestRedirect() {
  redirect("/portal/login");
}
