import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pix do joão",
  description: "Aqui ficam as minhas chaves pix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
