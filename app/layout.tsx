import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Roboto_Slab } from "next/font/google";
import "@/styles/globals.css";

import path from "path";
import RoutingNav from "@/components/RoutingNav";
import SideTitle from "@/components/SideTitle";
import { pageToRoute } from "next/dist/build/utils";
import { title } from "process";

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Simona Barboiu",
  description: "Portfolio website of Simona Barboiu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${robotoSlab.className} ${robotoSlab.className} antialiased`}>
      <body>
        <Header />
        <RoutingNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
