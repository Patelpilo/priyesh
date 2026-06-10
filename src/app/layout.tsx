import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  themeColor: "#111827", // dark theme matching portfolio
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Priyesh Bhalala | AI & Machine Learning Engineer Portfolio",
  description: "Portfolio of Priyesh Bhalala, an AI/ML and Generative AI Engineer. Exploring projects in Machine Learning, Deep Learning, RAG systems, LLMs, and Python development.",
  keywords: ["Priyesh Bhalala", "AI Engineer", "Machine Learning Engineer", "Generative AI", "LLM", "RAG Chatbot", "Python Developer", "Deep Learning", "Portfolio", "AI Portfolio"],
  authors: [{ name: "Priyesh Bhalala" }],
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Priyesh Bhalala | AI & Machine Learning Engineer Portfolio",
    description: "Explore projects, skills, and experience of Priyesh Bhalala, specializing in Generative AI, Machine Learning, and Python Development.",
    siteName: "Priyesh Bhalala Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyesh Bhalala | AI & Machine Learning Engineer Portfolio",
    description: "Explore projects, skills, and experience of Priyesh Bhalala, specializing in Generative AI, Machine Learning, and Python Development.",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {/* JSON-LD Structured Data for Strong SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Priyesh Bhalala",
              "alternateName": "Priyesh",
              "url": "https://linkedin.com/in/priyesh-bhalala-60ba0330b",
              "image": "/logo.png",
              "sameAs": [
                "https://github.com/priyeshbhalala",
                "https://linkedin.com/in/priyesh-bhalala-60ba0330b"
              ],
              "jobTitle": "AI & Machine Learning Engineer",
              "description": "Portfolio of Priyesh Bhalala, an AI/ML and Generative AI Engineer. Exploring projects in Machine Learning, Deep Learning, RAG systems, LLMs, and Python development.",
              "knowsAbout": [
                "Machine Learning",
                "Deep Learning",
                "TensorFlow",
                "Keras",
                "Computer Vision",
                "Prompt Engineering",
                "RAG Systems",
                "LLMs",
                "Generative AI",
                "Python",
                "Next.js"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
