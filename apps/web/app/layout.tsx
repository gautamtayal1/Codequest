import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "CodeQuest",
  description: "Coding challenges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
