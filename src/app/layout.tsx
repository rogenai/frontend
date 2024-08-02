import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import '../styles/globals.css';

const inter = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Rogen AI",
    description: "Expand your understanding of roguelike games",
};

export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (<html lang="en">
        <body className={inter.className}>
            {children}
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXX"} />
        <Analytics />
  </html>)
}
