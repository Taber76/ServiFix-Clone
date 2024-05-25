import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ServiFix",
  description: "Web application for searching and hiring services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className} >
        <Navbar />
        <main className='flex flex-col min-h-[calc(100vh-4rem-1px)]'>
          <div className='flex-1 flex flex-col h-full'>
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
