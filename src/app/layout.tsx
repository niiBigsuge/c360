import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "TheCrown360 - Perfect Hair, Wherever You Want It",
  description: "Book your favorite hairstyle online and choose whether to visit our salon or have a professional stylist come directly to you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
