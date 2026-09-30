import type { Metadata } from "next";
import { UploadPhotosRequestForm } from "./upload-photos-request-form";

export const metadata: Metadata = {
  title: "Upload photos or files",
  description: "Securely send photos or files with a client website request.",
};

export default function UploadPhotosPage() {
  return <UploadPhotosRequestForm />;
}
