import type { Metadata } from "next";
import { AddSomethingNewRequestForm } from "./add-something-new-request-form";

export const metadata: Metadata = {
  title: "Add Something New | Aaland Client Portal",
  description: "Request a new website addition through the Aaland client portal.",
};

export default function AddSomethingNewRequestPage() {
  return <AddSomethingNewRequestForm />;
}
