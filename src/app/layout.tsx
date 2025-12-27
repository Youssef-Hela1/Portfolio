import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Youssef Helal | Data Analytics Portfolio",
    description: "Data analytics portfolio showcasing projects in Excel, Google Sheets, Looker Studio, Tableau, and Power BI. Transform data into actionable insights.",
    keywords: ["data analytics", "Excel", "Google Sheets", "Looker Studio", "Tableau", "Power BI", "dashboard", "visualization"],
    authors: [{ name: "Youssef Helal" }],
    openGraph: {
        title: "Youssef Helal | Data Analytics Portfolio",
        description: "Data analytics portfolio showcasing projects in Excel, Google Sheets, Looker Studio, Tableau, and Power BI.",
        type: "website",
    },
};

import Providers from "@/components/Providers";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
            <body className="font-sans min-h-screen bg-grey-50">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
