"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { categories, tools } from "@/data/tools";
import SiteHeader from "@/components/SiteHeader";

export default function ToolsDirectory(){
 const [category,setCategory]=useState("All"),[query,setQuery]=useState("");
 const filtered=useMemo(()=>tools.filter(t=>(category==="All"||t.category===category)&&`${t.name} ${t.description} ${t.category}`.toLowerCase().includes(query.toLowerCase().trim())),[category,query]);
 return <><SiteHeader/>
 <main className="directory-page"><section className="directory-heading"><span className="eyebrow">THE TOOLBOX</span><h1>Find your <em>tool.</em></h1><p>25 useful tools for the things you do every day.</p><label className="directory-search"><Search size={20}/><input aria-label="Search tools" placeholder="Search tools…" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear search">×</button>}</label></section>
  <section className="directory-results"><div className="directory-filter" role="tablist" aria-label="Filter tools">{categories.map(c=><button role="tab" aria-selected={category===c} className={category===c?"selected":""} key={c} onClick={()=>setCategory(c)}>{c}<span>{c==="All"?tools.length:tools.filter(t=>t.category===c).length}</span></button>)}</div><div className="directory-count">{filtered.length} {filtered.length===1?"tool":"tools"}</div><div className="tool-grid directory-grid"><AnimatePresence mode="popLayout">{filtered.map((tool,i)=>{const Icon=tool.icon;return <motion.div layout initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.98}} transition={{duration:.2,delay:Math.min(i*.012,.18)}} className="tool-card" key={tool.slug}><Link href={`/tools/${tool.slug}`}><div className={`tool-icon icon-${tool.category.toLowerCase()}`}><Icon size={22} strokeWidth={1.8}/></div><ArrowUpRight className="directory-card-arrow" size={18}/><span className="tool-category">{tool.category}</span><h2>{tool.name}</h2><p>{tool.description}</p></Link></motion.div>})}</AnimatePresence></div>{filtered.length===0&&<div className="directory-empty"><span>No matches</span><p>Try another search or category.</p><button onClick={()=>{setQuery("");setCategory("All")}}>Clear filters <ArrowRight size={15}/></button></div>}</section>
 </main><footer className="tool-footer"><Link href="/" className="brand"><span className="brand-mark"/><span>tap<span className="brand-light">tools</span></span></Link><span>© 2026 TapTools</span><Link href="/">Home <ArrowRight size={14}/></Link></footer></>;
}
