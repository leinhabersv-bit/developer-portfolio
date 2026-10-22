import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07090e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://developer-portfolio-eta-steel.vercel.app"),
  title: {
    default: "Rithik SV — Student Developer & Systems Builder",
    template: "%s | Rithik SV",
  },
  description:
    "Personal engineering portfolio of Rithik SV (@leinhabersv-bit). Showcasing interactive 2D/3D web graphics, local-first applications, and rigorously tested systems.",
  keywords: [
    "Rithik SV",
    "leinhabersv-bit",
    "Student Software Developer",
    "Frontend Engineer",
    "Three.js Developer",
    "TypeScript",
    "Next.js",
    "React",
    "Local-First Software",
    "Panic Delivery",
    "ClientLaunch",
  ],
  authors: [{ name: "Rithik SV", url: "https://github.com/leinhabersv-bit" }],
  creator: "Rithik SV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://developer-portfolio-eta-steel.vercel.app",
    siteName: "Rithik SV Portfolio",
    title: "Rithik SV — Student Developer & Systems Builder",
    description:
      "Interactive 2D/3D web graphics, local-first architectures, and rigorously tested frontend engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithik SV — Student Developer & Systems Builder",
    description:
      "Interactive 2D/3D graphics, local-first architectures, and verified engineering test suites.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07090e] text-[#f8fafc] font-sans bg-grid-subtle selection:bg-cyan-primary/20 selection:text-cyan-primary">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
