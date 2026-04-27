import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import RoutingNav from "@/components/RoutingNav";
import ScrollToTop from "@/components/ScrollToTop";
import MotionProvider from "@/components/motion/MotionProvider";
import Cursor from "@/components/motion/Cursor";
import ScrollProgress from "@/components/motion/ScrollProgress";
import GrainOverlay from "@/components/motion/GrainOverlay";
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
    <html lang="en" className={`${interFont.variable} antialiased`}>
      <body className="font-(--font-inter)">
        <MotionProvider />
        <ScrollProgress />
        <GrainOverlay />
        <Cursor />
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