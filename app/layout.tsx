import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionController } from "@/components/motion-controller";
import { BusinessStructuredData } from "@/components/business-structured-data";
import { SITE_URL } from "@/lib/site-metadata";
import "./globals.css";
import "./portfolio-enhancements.css";
import "./minnlawn-portfolio.css";
import "./business-extensions.css";

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
    default: "Aaland Web Design & Site Care | Rochester, MN",
    template: "%s | Aaland Web Design & Site Care",
  },
  description:
    "Web design, website updates, and ongoing site care for small businesses in Rochester, Minnesota and beyond.",
  authors: [{ name: "Rebecca Aaland" }],
  creator: "Rebecca Aaland",
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "RbevpWa_IZwBUPSQDoubqD8KQA1-eOP3VwNSTLGcQao",
  },
  openGraph: {
    title: "Aaland Web Design & Site Care",
    description:
      "Web design, website updates, and ongoing site care for small businesses.",
    url: "/",
    siteName: "Aaland Web Design & Site Care",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaland Web Design & Site Care",
    description:
      "Web design, website updates, and ongoing site care for small businesses.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
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
        <BusinessStructuredData />
        <MotionController />
        {children}
      </body>
    </html>
  );
}
