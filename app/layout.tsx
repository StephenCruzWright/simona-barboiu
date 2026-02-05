import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Roboto_Slab } from "next/font/google";
import "@/styles/globals.css";
import RoutingNav from "@/components/RoutingNav";
import ScrollToTop from "@/components/ScrollToTop";
import Inter from "next/font/local";

const interFont = Inter({
  src: [
    {
      path: "./fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/inter/Inter-VariableFont_opsz,wght.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Simona Barboiu",
  description: "Portfolio Website for Simona Barboiu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${robotoSlab.className} antialiased`}
    >
      <body className="font-[var(--font-inter)]">
        <Header />
        <RoutingNav />
        {children}
        <ScrollToTop />
        <br />
        <Footer />
      </body>
    </html>
  );
}
