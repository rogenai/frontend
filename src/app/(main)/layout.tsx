import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";
import Header from "../../components/header";
import Tracker from "@/src/components/tracker";

const inter = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rogen AI",
  description: "Expand your understanding of roguelike games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Tracker />
        <Header />
        {children}
      </body>
    </html>
  );
}
