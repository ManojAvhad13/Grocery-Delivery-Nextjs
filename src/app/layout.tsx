import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grocery | 10 minutes grocery delivery",
  description: " Grocery delivery in 10 minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-gradient-to-b from-green-200 to-white">
        {children}
      </body>
    </html>
  );
}
