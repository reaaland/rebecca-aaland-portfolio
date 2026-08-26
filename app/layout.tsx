import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionController } from "@/components/motion-controller";
import { SITE_URL } from "@/lib/site-metadata";
import "./globals.css";
import "./portfolio-enhancements.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rebecca Aaland | Frontend Developer & Web Designer",
    template: "%s | Rebecca Aaland",
  },
  description:
    "Rochester, Minnesota frontend developer and web designer building responsive websites and practical web applications for small businesses and teams.",
  authors: [{ name: "Rebecca Aaland" }],
  creator: "Rebecca Aaland",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Rebecca Aaland — Frontend Developer & Web Designer",
    description:
      "Responsive frontend work, independent product experience, and practical website services from Rochester, Minnesota.",
    url: "/",
    siteName: "Rebecca Aaland Portfolio",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebecca Aaland — Frontend Developer & Web Designer",
    description:
      "Responsive frontend work, independent product experience, and practical website services from Rochester, Minnesota.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      id="top"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MotionController />
        {children}
      </body>
    </html>
  );
}
