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
  themeColor: "#06080d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://developer-portfolio-eta-steel.vercel.app"),
  title: {
    default: "Rithik SV — Student Software Developer & Systems Engineer",
    template: "%s | Rithik SV",
  },
  description:
    "Engineering portfolio of Rithik SV (@leinhabersv-bit). Showcasing computational physics simulators (CHAMP Lab), 60fps arcade drift engines (Panic Delivery), Three.js 3D spatial cores, and local-first architectures.",
  keywords: [
    "Rithik SV",
    "leinhabersv-bit",
    "VIT Chennai",
    "Student Software Developer",
    "Frontend Engineer",
    "CHAMP Virtual Physics Lab",
    "Panic Delivery",
    "Three.js Developer",
    "TypeScript",
    "Next.js 16",
    "React 19",
    "Quantum Simulators",
    "Web Audio API",
    "Local-First Software",
  ],
  authors: [{ name: "Rithik SV", url: "https://github.com/leinhabersv-bit" }],
  creator: "Rithik SV",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://developer-portfolio-eta-steel.vercel.app",
    siteName: "Rithik SV Portfolio",
    title: "Rithik SV — Student Software Developer & Systems Engineer",
    description:
      "Interactive 2D/3D web graphics, quantum physics simulators, local-first architectures, and rigorously tested frontend engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithik SV — Student Software Developer & Systems Engineer",
    description:
      "Interactive 2D/3D graphics, physics simulators, local-first architectures, and verified engineering test suites.",
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
      <body className="min-h-full flex flex-col bg-[#06080d] text-[#f8fafc] font-sans bg-grid-subtle selection:bg-cyan-primary/20 selection:text-cyan-primary">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
