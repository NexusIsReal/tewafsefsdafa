import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CinematicBackground from "@/components/layout/CinematicBackground";
import "./globals.css";
import Head from "next/head";

// Font setup
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

// Important: To make the favicon work correctly:
// 1. Copy your logo image to /public/favicon.ico (for browsers)
// 2. Copy your logo to /public/apple-icon.png (for Apple devices) - must be at least 180×180px
// 3. Create an optimized /public/og-image.jpg for social media sharing (1200×630px recommended)

export const metadata: Metadata = {
  title: "Johan | Professional Video Editor",
  description: "Expert video editing services by Johan. Transforming raw footage into captivating cinematic stories with professional editing techniques.",
  keywords: "video editor, video editing, cinematic storytelling, visual narratives, professional video editor, Johan, post-production",
  authors: [{ name: "Johan" }],
  creator: "Johan",
  publisher: "Johan Media",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/navbar-image.jpg', type: 'image/jpeg' },
    ],
    apple: { url: '/apple-icon.png' },
  },
  openGraph: {
    title: "Johan | Professional Video Editor",
    description: "Expert video editing services by Johan. Transforming raw footage into captivating cinematic stories.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Johan - Professional Video Editor',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Johan | Professional Video Editor",
    description: "Expert video editing services by Johan. Transforming raw footage into captivating cinematic stories.",
    images: ['/og-image.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: "#4ecdc4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/navbar-image.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/navbar-image.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/navbar-image.jpg" />
      </head>
      <body className={`${montserrat.variable}`}>
        <CinematicBackground />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
