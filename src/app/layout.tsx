import type { Metadata } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: {
    default: "TapTools — Free Online Tools for Files, Images & Text",
    template: "%s | TapTools",
  },
  description: "Use 25+ free online tools for images, PDFs, QR codes, writing and developer tasks. Fast browser-based utilities with privacy-first processing.",
  applicationName: "TapTools",
  keywords: [
    "free online tools", "browser tools", "image tools", "PDF tools", "QR code generator",
    "text tools", "developer tools", "Manglish to English",
  ],
  category: "technology",
  creator: "TapTools",
  publisher: "TapTools",
  alternates: { canonical: absoluteUrl("/") },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "TapTools",
    title: "TapTools — Free Online Tools for Everyday Work",
    description: "Simple, fast and privacy-friendly tools for images, PDFs, text and everyday work.",
    locale: "en_US",
    images: [{ url: absoluteUrl("/taptools-favicon.png"), width: 512, height: 512, alt: "TapTools logo" }],
  },
  twitter: {
    card: "summary",
    title: "TapTools — Free Online Tools",
    description: "25+ simple, fast and privacy-friendly online tools.",
    images: [absoluteUrl("/taptools-favicon.png")],
  },
  icons: {
    icon: "/taptools-favicon.png",
    apple: "/taptools-favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
