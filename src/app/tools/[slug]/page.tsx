import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { bySlug, tools } from "@/data/tools";
import ToolWorkbench from "@/components/ToolWorkbench";
import { absoluteUrl } from "@/lib/seo";

const seoDescriptions: Record<string, string> = {
  "background-remover": "Learn about privacy-first image background removal and the local image segmentation needed to create transparent PNG cutouts.",
  "image-converter": "Convert images online between PNG, JPG, WebP and BMP. Choose an output format and convert images in your browser.",
  "image-compressor": "Compress JPG and other images online, adjust quality, and compare the new file size before downloading.",
  "image-resizer": "Resize images online by exact width and height while keeping the original aspect ratio or setting custom dimensions.",
  "image-cropper": "Crop images online with freeform, square, 4:3 and 16:9 presets, then save the cropped image locally.",
  "image-rotator": "Rotate or flip images online in your browser and download the corrected image without uploading your file.",
  "jpg-to-pdf": "Combine one or more JPG images into a PDF online. Create a PDF from images locally in your browser.",
  "pdf-to-jpg": "Convert PDF pages to JPG images online, adjust image quality, and download the rendered pages from your browser.",
  "pdf-compressor": "Optimize and reduce PDF file size online in your browser, then compare the original and optimized document sizes.",
  "pdf-merger": "Merge multiple PDF files into one document online. Select and combine PDFs locally in your browser.",
  "pdf-splitter": "Extract a page range from a PDF and save it as a separate document with this browser-based PDF splitter.",
  "qr-generator": "Create a custom QR code for links, text, email, phone or Wi-Fi. Choose colors, add a center logo and download it.",
  "qr-scanner": "Scan QR codes from an image or supported device camera and read the decoded content in your browser.",
  "barcode-generator": "Generate a downloadable Code 128 barcode from text directly in your browser.",
  "password-generator": "Generate a strong random password locally. Choose its length and include uppercase, lowercase, numbers or symbols.",
  "uuid-generator": "Generate one or more random UUIDs locally in your browser and copy the IDs when you need them.",
  "word-counter": "Count words, characters, sentences and paragraphs, and estimate reading time as you type or edit text.",
  "case-converter": "Convert text to uppercase, lowercase, title case, sentence case, camelCase, snake_case or kebab-case instantly.",
  "text-cleaner": "Clean pasted text by removing extra spaces, duplicate lines and blank lines, or normalizing line breaks.",
  "manglish-to-english": "Translate Manglish, Malayalam written with English letters, into clear English with the TapTools AI translator.",
  "lorem-ipsum": "Generate Lorem Ipsum placeholder text by paragraph count for design mockups, layouts and development projects.",
  "json-formatter": "Format, validate and minify JSON online. Inspect readable JSON and copy or download the result locally.",
  "base64": "Encode text to Base64 or decode Base64 back to text securely in your browser.",
  "hash-generator": "Generate SHA-256, SHA-384 or SHA-512 hashes from text using the browser Web Crypto API.",
  "color-converter": "Convert color values between HEX, RGB and HSL formats and preview the selected color instantly.",
  "timestamp-converter": "Convert Unix timestamps to readable dates or convert date and time values into Unix timestamps.",
};

const toolKeywords: Record<string, string[]> = {
  "background-remover": ["image background removal", "transparent PNG", "local image processing"],
  "image-converter": ["image converter", "PNG to JPG", "WebP converter", "BMP converter"],
  "image-compressor": ["image compressor", "compress images", "reduce image file size"],
  "image-resizer": ["image resizer", "resize image online", "image dimensions"],
  "image-cropper": ["image cropper", "crop image online", "photo crop presets"],
  "image-rotator": ["rotate image", "flip image", "image editor"],
  "jpg-to-pdf": ["JPG to PDF", "images to PDF", "convert images to PDF"],
  "pdf-to-jpg": ["PDF to JPG", "PDF page to image", "convert PDF pages"],
  "pdf-compressor": ["PDF compressor", "reduce PDF size", "optimize PDF"],
  "pdf-merger": ["PDF merger", "merge PDF files", "combine PDFs"],
  "pdf-splitter": ["PDF splitter", "extract PDF pages", "split PDF"],
  "qr-generator": ["QR code generator", "custom QR code", "QR logo"],
  "qr-scanner": ["QR code scanner", "scan QR code", "read QR image"],
  "barcode-generator": ["barcode generator", "Code 128", "create barcode"],
  "password-generator": ["password generator", "random secure password", "strong password"],
  "uuid-generator": ["UUID generator", "random UUID", "generate unique ID"],
  "word-counter": ["word counter", "character counter", "reading time"],
  "case-converter": ["case converter", "uppercase converter", "camel case", "snake case"],
  "text-cleaner": ["text cleaner", "remove duplicate lines", "clean text"],
  "manglish-to-english": ["Manglish to English", "Malayalam translation", "Manglish translator"],
  "lorem-ipsum": ["Lorem Ipsum generator", "placeholder text generator", "dummy text"],
  "json-formatter": ["JSON formatter", "JSON validator", "JSON minifier"],
  "base64": ["Base64 encoder", "Base64 decoder", "text encoding"],
  "hash-generator": ["SHA-256 generator", "SHA-384", "SHA-512", "hash text"],
  "color-converter": ["color converter", "HEX to RGB", "RGB to HSL"],
  "timestamp-converter": ["Unix timestamp converter", "epoch converter", "timestamp to date"],
};

export function generateStaticParams() { return tools.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = bySlug(slug);
  if (!tool) return { title: "Tool not found", robots: { index: false, follow: false } };

  const title = `${tool.name} Online Tool`;
  const description = seoDescriptions[slug] || tool.description;
  const canonical = absoluteUrl(`/tools/${slug}`);
  const image = absoluteUrl("/taptools-favicon.png");

  return {
    title,
    description,
    keywords: toolKeywords[slug] || [tool.name, `${tool.name} online`, "free online tools"],
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "TapTools",
      title: `${tool.name} Online — Free Browser Tool`,
      description,
      images: [{ url: image, width: 512, height: 512, alt: "TapTools logo" }],
    },
    twitter: {
      card: "summary",
      title: `${tool.name} Online | TapTools`,
      description,
      images: [image],
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = bySlug(slug);
  if (!tool) notFound();

  const relatedSlugs = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 3).map((item) => item.slug);
  const canonical = absoluteUrl(`/tools/${slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: `${tool.name} — TapTools`,
        url: canonical,
        description: seoDescriptions[slug] || tool.description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@type": "Organization", name: "TapTools", url: absoluteUrl("/") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Tools", item: absoluteUrl("/tools") },
          { "@type": "ListItem", position: 3, name: tool.name, item: canonical },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <ToolWorkbench slug={slug} relatedSlugs={relatedSlugs}/>
  </>;
}
