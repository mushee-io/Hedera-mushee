import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mushee Suite — Hedera Dashboard",
  description: "Sleek Hedera-native demo dashboard for Mushee Suite.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
