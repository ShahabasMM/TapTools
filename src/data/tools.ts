import type { LucideIcon } from "lucide-react";
import { Image, FileImage, Shrink, Scan, RotateCw, FileText, Files, Split, QrCode, ScanLine, Barcode, KeyRound, Fingerprint, Type, CaseSensitive, Eraser, AlignLeft, Braces, Binary, Hash, Palette, Clock3, Languages } from "lucide-react";

export type Tool = { slug:string; name:string; category:string; description:string; icon:LucideIcon; popular?:boolean; privacy?:boolean };
export const tools: Tool[] = [
  {slug:"background-remover",name:"Background Remover",category:"Images",description:"Create a clean cutout from any image.",icon:Image,popular:true},
  {slug:"image-converter",name:"Image Converter",category:"Images",description:"Switch between PNG, JPG, WebP and BMP.",icon:FileImage,privacy:true,popular:true},
  {slug:"image-compressor",name:"Image Compressor",category:"Images",description:"Make image files smaller in seconds.",icon:Shrink,privacy:true,popular:true},
  {slug:"image-resizer",name:"Image Resizer",category:"Images",description:"Resize images to the dimensions you need.",icon:Scan,privacy:true},
  {slug:"image-cropper",name:"Image Cropper",category:"Images",description:"Crop to a custom size or a useful preset.",icon:ScanLine,privacy:true},
  {slug:"image-rotator",name:"Image Rotator",category:"Images",description:"Rotate or flip an image in a click.",icon:RotateCw,privacy:true},
  {slug:"jpg-to-pdf",name:"JPG to PDF",category:"PDF",description:"Turn one or more images into a PDF.",icon:FileText,privacy:true},
  {slug:"pdf-to-jpg",name:"PDF to JPG",category:"PDF",description:"Save PDF pages as crisp JPG images.",icon:FileImage,privacy:true},
  {slug:"pdf-compressor",name:"PDF Compressor",category:"PDF",description:"Reduce PDF size by optimizing its content.",icon:Shrink,privacy:true},
  {slug:"pdf-merger",name:"PDF Merger",category:"PDF",description:"Combine PDF documents into one file.",icon:Files,privacy:true},
  {slug:"pdf-splitter",name:"PDF Splitter",category:"PDF",description:"Extract a range of pages from a PDF.",icon:Split,privacy:true},
  {slug:"qr-generator",name:"QR Generator",category:"QR",description:"Make a downloadable QR for anything.",icon:QrCode,privacy:true,popular:true},
  {slug:"qr-scanner",name:"QR Scanner",category:"QR",description:"Read a QR code from an image or camera.",icon:ScanLine,privacy:true},
  {slug:"barcode-generator",name:"Barcode Generator",category:"Generators",description:"Create a clean, scannable barcode.",icon:Barcode,privacy:true},
  {slug:"password-generator",name:"Password Generator",category:"Generators",description:"Create a strong password on your device.",icon:KeyRound,privacy:true},
  {slug:"uuid-generator",name:"UUID Generator",category:"Developer",description:"Generate unique IDs in an instant.",icon:Fingerprint,privacy:true},
  {slug:"word-counter",name:"Word Counter",category:"Text",description:"Get a clear read on any piece of writing.",icon:Type,privacy:true},
  {slug:"case-converter",name:"Case Converter",category:"Text",description:"Change text case with one click.",icon:CaseSensitive,privacy:true},
  {slug:"text-cleaner",name:"Text Cleaner",category:"Text",description:"Tidy up spaces, lines and pasted text.",icon:Eraser,privacy:true},
  {slug:"manglish-to-english",name:"Manglish to English",category:"Text",description:"Turn everyday Manglish into clear, natural English with AI.",icon:Languages},
  {slug:"lorem-ipsum",name:"Lorem Ipsum Generator",category:"Text",description:"Generate placeholder copy in any length.",icon:AlignLeft,privacy:true},
  {slug:"json-formatter",name:"JSON Formatter",category:"Developer",description:"Format, validate and minify JSON.",icon:Braces,privacy:true,popular:true},
  {slug:"base64",name:"Base64 Encoder",category:"Developer",description:"Encode and decode Base64 text locally.",icon:Binary,privacy:true},
  {slug:"hash-generator",name:"Hash Generator",category:"Developer",description:"Create SHA-256, SHA-384 or SHA-512 hashes.",icon:Hash,privacy:true},
  {slug:"color-converter",name:"Color Converter",category:"Developer",description:"Move between HEX, RGB and HSL values.",icon:Palette,privacy:true},
  {slug:"timestamp-converter",name:"Timestamp Converter",category:"Developer",description:"Translate Unix timestamps and dates.",icon:Clock3,privacy:true},
];
export const categories = ["All","Images","PDF","QR","Text","Developer","Generators"];
export const bySlug = (slug:string) => tools.find((tool)=>tool.slug===slug);
