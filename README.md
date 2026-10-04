# TapTools

TapTools is a responsive browser utilities site built with Next.js, TypeScript, Tailwind CSS, Framer Motion and Lucide icons. Tool pages use a shared client-side workspace; file processing stays in the browser.

## Run locally

```sh
npm install
npm run dev
```

Create and serve a production build with `npm run build` and `npm start`.

Set `NEXT_PUBLIC_SITE_URL` to the canonical public origin before deploying (for example, `https://taptools.app`). It is used to generate canonical links, social metadata, `sitemap.xml`, and `robots.txt`; when omitted, TapTools uses `https://taptools.app`.

## Tools

The catalog contains 25 tools across images, PDFs, QR, text, developer utilities and generators. Image conversion, compression, resizing, cropping and rotation use Canvas. PDF merge/split/optimization and image-to-PDF use `pdf-lib`; PDF-to-image uses PDF.js. QR generation, barcode generation, scanning, text transformations, Web Crypto hashing, colors, timestamps, passwords and UUIDs are all handled in the browser.

Background removal is marked as requiring a segmentation model or an online service. No image is uploaded and no result is simulated until a model is configured.

