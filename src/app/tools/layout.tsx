import type { Metadata } from "next";
import { tools } from "@/data/tools";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Free Online Tools",
  description: "Browse 25+ free online tools for images, PDFs, QR codes, text, generators and developer tasks. Find a fast, private tool for everyday work.",
  keywords: ["free online tools", "image tools", "PDF tools", "text utilities", "developer tools", "QR tools"],
  alternates: { canonical: absoluteUrl("/tools") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/tools"),
    siteName: "TapTools",
    title: "All Free Online Tools | TapTools",
    description: "Browse 25+ fast and privacy-friendly browser tools for images, PDFs, QR codes, text and more.",
    images: [{ url: absoluteUrl("/taptools-favicon.png"), width: 512, height: 512, alt: "TapTools logo" }],
  },
  twitter: {
    card: "summary",
    title: "All Free Online Tools | TapTools",
    description: "Browse 25+ fast, privacy-friendly tools for everyday work.",
    images: [absoluteUrl("/taptools-favicon.png")],
  },
};

export default function ToolsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Free Online Tools",
    url: absoluteUrl("/tools"),
    description: "Free online utilities for images, PDFs, QR codes, text and developer tasks.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tools.length,
      itemListElement: tools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.name,
        url: absoluteUrl(`/tools/${tool.slug}`),
      })),
    },
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    {children}
  </>;
}
