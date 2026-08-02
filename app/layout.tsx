import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FarmGuard AI | FutureTech HackFest 2026",
  description: "AI-powered crop disease detection for smart agriculture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
