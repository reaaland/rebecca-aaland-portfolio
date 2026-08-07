import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionController } from "@/components/motion-controller";
import "./globals.css";

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
    default: "Rebecca Aaland Portfolio",
    template: "%s · Rebecca Aaland",
  },
  description:
    "Frontend developer and web designer building clear, useful digital experiences for teams and small businesses.",
  authors: [{ name: "Rebecca Aaland" }],
  creator: "Rebecca Aaland",
  metadataBase: new URL("https://rebeccaiaaland.com"),
  openGraph: {
    title: "Rebecca Aaland — Frontend Developer & Web Designer",
    description:
      "Evidence-backed frontend work, independent product experience, and practical website services.",
    url: "https://rebeccaiaaland.com",
    siteName: "Rebecca Aaland Portfolio",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebecca Aaland — Frontend Developer & Web Designer",
    description:
      "Evidence-backed frontend work, independent product experience, and practical website services.",
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
    <html lang="en" id="top" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MotionController />
        {children}
      </body>
    </html>
  );
}
