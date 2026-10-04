"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { tools } from "@/data/tools";
import SearchControl from "@/components/SearchControl";

function Mark({large=false}:{large?:boolean}){return <span className={`brand-mark ${large?"brand-mark-large":""}`} aria-hidden="true"/>}

export default function SiteHeader(){
 const[productsOpen,setProductsOpen]=useState(false),[mobileOpen,setMobileOpen]=useState(false),[mobileProductsOpen,setMobileProductsOpen]=useState(false);
 const groups=["Images","PDF","QR","Text","Developer","Generators"];
 return <header className="site-header"><div className="header-inner">
  <Link href="/" className="brand" aria-label="TapTools home"><Mark/><span>tap<span className="brand-light">tools</span></span></Link>
  <nav className="desktop-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/tools">Tools</Link><button className={`nav-products ${productsOpen?"active":""}`} onClick={()=>setProductsOpen(v=>!v)} aria-expanded={productsOpen}>Products <ChevronDown size={15}/></button></nav>
  <div className="header-actions"><SearchControl/><Link href="/tools" className="header-cta"><span>Explore tools</span><ArrowUpRight size={16}/></Link></div>
  <button className="mobile-menu-btn" aria-label={mobileOpen?"Close menu":"Open menu"} aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?<X/>:<Menu/>}</button>
  <AnimatePresence>{productsOpen&&<motion.div className="mega-menu" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}} transition={{duration:.16}} onMouseLeave={()=>setProductsOpen(false)}>
   <div className="mega-intro"><span className="eyebrow">THE TOOLBOX</span><h3>One good tool<br/>can change your day.</h3><p>Simple tools for everyday work.</p><Link href="/tools" onClick={()=>setProductsOpen(false)}>Explore all tools <ArrowRight size={15}/></Link><div className="mega-decoration"><Mark large/></div></div>
   <div className="mega-cats">{groups.map(category=>{const first=tools.find(tool=>tool.category===category);const items=tools.filter(tool=>tool.category===category).slice(0,3);if(!first)return null;const Icon=first.icon;return <div className="mega-cat" key={category}><div className="mega-cat-head"><span className="mini-icon"><Icon size={17}/></span><span>{category}</span></div>{items.map(tool=><Link key={tool.slug} href={`/tools/${tool.slug}`} onClick={()=>setProductsOpen(false)}>{tool.name}</Link>)}</div>})}</div>
  </motion.div>}</AnimatePresence>
 </div>
 <AnimatePresence>{mobileOpen&&<motion.nav className="mobile-nav" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} aria-label="Mobile navigation"><Link onClick={()=>setMobileOpen(false)} href="/">Home</Link><Link onClick={()=>setMobileOpen(false)} href="/tools">All tools</Link><button className="mobile-products-toggle" onClick={()=>setMobileProductsOpen(v=>!v)} aria-expanded={mobileProductsOpen}>Products <ChevronDown size={15}/></button><AnimatePresence>{mobileProductsOpen&&<motion.div className="mobile-cat-grid" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}>{groups.map(category=><Link onClick={()=>setMobileOpen(false)} href="/tools" key={category}>{category}<ArrowUpRight size={14}/></Link>)}</motion.div>}</AnimatePresence></motion.nav>}</AnimatePresence>
 </header>
}
