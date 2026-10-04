import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Command, LockKeyhole, MousePointer2, Sparkles } from "lucide-react";
import { tools } from "@/data/tools";
import SiteHeader from "@/components/SiteHeader";
import { absoluteUrl } from "@/lib/seo";

function Mark({large=false}:{large?:boolean}) { return <span className={`brand-mark ${large?"brand-mark-large":""}`} aria-hidden="true"/> }

function Demo(){return <div className="demo-shell" aria-label="Animated background remover demo">
 <div className="demo-top"><div><span className="live-dot"/> <span>IN THE STUDIO</span></div><span>Background remover <ArrowUpRight size={13}/></span></div>
 <div className="demo-canvas">
  <div className="demo-image before"><div className="sun-disc"/><div className="leaf leaf-a"/><div className="leaf leaf-b"/><div className="portrait"><div className="hair"/><div className="face"><i/><b/></div><div className="neck"/><div className="coat"/><div className="shirt"/></div><div className="image-grain"/></div>
  <div className="scan-line"/><div className="scan-ring"/>
  <div className="demo-image after"><div className="checker"/><div className="portrait"><div className="hair"/><div className="face"><i/><b/></div><div className="neck"/><div className="coat"/><div className="shirt"/></div></div>
  <div className="demo-cursor"><MousePointer2 size={26} fill="white"/><span/></div>
  <div className="demo-label"><span><Check size={13}/></span> Background removed</div>
  <div className="before-tag">BEFORE</div><div className="after-tag">AFTER</div>
 </div>
 <div className="demo-bottom"><span><Sparkles size={14}/> A little more you, a little less background.</span><span className="demo-dots"><i/><i/><i/></span></div>
 </div>}

export default function Home(){
 const structuredData={
  "@context":"https://schema.org",
  "@graph":[
   {"@type":"Organization",name:"TapTools",url:absoluteUrl("/"),logo:absoluteUrl("/taptools-favicon.png")},
   {"@type":"WebSite",name:"TapTools",url:absoluteUrl("/"),description:"Free, simple and privacy-friendly online tools for everyday work.",publisher:{"@type":"Organization",name:"TapTools"}},
   {"@type":"WebApplication",name:"TapTools Online Tools",url:absoluteUrl("/"),applicationCategory:"UtilitiesApplication",operatingSystem:"Any",isAccessibleForFree:true}
  ]
 };
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}}/><SiteHeader/><main>
  <section className="hero"><div className="hero-grid"/><div className="hero-copy"><div className="hero-eyebrow"><span><Sparkles size={13}/></span> 25+ FREE ONLINE TOOLS</div><h1>Everything you need.<br/><em>One simple tap.</em></h1><p>Simple, fast and private tools for files, images, PDFs, text and everyday work.</p><div className="hero-actions"><Link href="/tools" className="button-primary">Explore tools <ArrowRight size={16}/></Link><Link href="/tools" className="button-secondary">See all tools <ArrowDownRight size={16}/></Link></div><div className="hero-trust"><span><LockKeyhole size={13}/> Private by design</span><i/><span>Free forever</span><i/><span>No account needed</span></div></div>
   <div className="hero-demo"><Demo/></div><div className="hero-caption"><span>01 — REMOVE BACKGROUND</span><span>JUST ONE OF 25+ TOOLS <ArrowDownRight size={13}/></span></div>
  </section>

  <section className="popular-section"><div className="section-wrap popular-inner"><div className="popular-title"><span className="eyebrow">POPULAR</span><h2>Start with<br/><em>a favorite.</em></h2><p>Quick access to the tools people reach for most.</p><Link href="/tools" className="text-link">Browse all tools <ArrowRight size={15}/></Link></div><div className="popular-cards">{tools.filter(t=>t.popular).map((t,i)=>{const Icon=t.icon;return <Link className={`popular-card popular-${i}`} href={`/tools/${t.slug}`} key={t.slug}><div className="popular-card-top"><span className="popular-icon"><Icon size={18}/></span><ArrowUpRight size={17}/></div><div><span className="tool-category">{t.category}</span><h3>{t.name}</h3><p>{t.description}</p></div></Link>})}</div></div></section>

  <section className="privacy-band" id="privacy"><div className="privacy-orb"/><div className="privacy-content"><div className="privacy-symbol"><LockKeyhole size={21}/></div><div><span className="eyebrow">PRIVATE BY DEFAULT</span><h2>Your files stay <em>yours.</em></h2><p>Supported tools process files in your browser. They aren’t uploaded.</p></div><Link href="/tools/image-converter" className="privacy-link">Try a tool <ArrowUpRight size={15}/></Link></div></section>

  <section className="final-cta"><div className="cta-noise"/><span className="eyebrow">A LITTLE LESS BUSYWORK</span><h2>Ready when <em>you are.</em></h2><p>Pick a tool, drop in your file, and get on with your day.</p><Link href="/tools" className="button-primary">Find your tool <ArrowRight size={16}/></Link><span className="cta-footnote"><Command size={12}/> GOOD TO GO. NO SIGN-UP.</span></section>
 </main><footer className="footer"><div className="footer-main"><div className="footer-brand-col"><Link href="/" className="brand"><Mark/><span>tap<span className="brand-light">tools</span></span></Link><p>Simple tools for everyday work.</p></div><div className="footer-col"><h4>Tools</h4><Link href="/tools">Image tools</Link><Link href="/tools">PDF tools</Link><Link href="/tools">QR tools</Link><Link href="/tools">Text tools</Link><Link href="/tools">Developer tools</Link></div><div className="footer-col"><h4>Product</h4><Link href="/tools">All tools</Link><Link href="/tools">Popular tools</Link><Link href="#privacy">Privacy</Link></div><div className="footer-col"><h4>Legal</h4><Link href="#privacy">Privacy policy</Link><Link href="#privacy">Terms</Link><Link href="#privacy">Cookie policy</Link></div></div><div className="footer-bottom"><span>© 2026 TapTools</span><a href="#top">BACK TO TOP ↑</a></div></footer></>;
}
