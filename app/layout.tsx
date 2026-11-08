import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BYD Cyprus Community",
    template: "%s | BYD Cyprus Community",
  },
  description:
    "The community hub for BYD owners and fans in Cyprus: meetups, drives and accessories.",
  keywords: ["BYD", "Cyprus", "electric vehicles", "EV", "community", "meetups"],
  openGraph: {
    title: "BYD Cyprus Community",
    description:
      "Meetups, drives and accessories for BYD owners and fans in Cyprus.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
