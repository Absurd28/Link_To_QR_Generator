import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link-to-QR | High-End Generator",
  description: "Premium QR code generator with real-time customization and generative UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-accent-violet selection:text-white">
        {children}
      </body>
    </html>
  );
}
