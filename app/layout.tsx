import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Choose your lift, build today's plan, and track your work.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#141619]">
        <div className="flex min-h-screen w-full flex-1 flex-col bg-[#141619]">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
