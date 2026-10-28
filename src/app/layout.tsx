import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { HashScroll } from "@/components/hash-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Final year B.Tech student at IIT Bombay. Work in document intelligence, retrieval, real time voice, speech data, and software agents.";

export const metadata: Metadata = {
  title: {
    default: "Nadeem Shabir Mir, AI engineer",
    template: "%s, Nadeem Shabir Mir",
  },
  description,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    "Nadeem Shabir Mir",
    "AI engineer",
    "IIT Bombay",
    "agentic AI",
    "RAG",
    "speech AI",
    "document intelligence",
  ],
  openGraph: {
    title: "Nadeem Shabir Mir, AI engineer",
    description,
    type: "profile",
    locale: "en_IN",
    firstName: "Nadeem",
    lastName: "Shabir Mir",
    username: profile.githubHandle,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadeem Shabir Mir, AI engineer",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#232833",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${profile.email}`,
  jobTitle: "AI Engineer",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Bombay",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Bombay",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
    addressCountry: "IN",
  },
  sameAs: [profile.github, profile.linkedin],
  description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#content"
          className="absolute top-3 left-3 z-50 -translate-y-24 bg-primary px-3 py-2 text-sm text-primary-foreground focus:translate-y-0"
        >
          Skip to content
        </a>
        <HashScroll />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
