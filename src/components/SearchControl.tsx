"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Command, Search, X } from "lucide-react";
import { tools } from "@/data/tools";

export default function SearchControl(){
 const [open,setOpen]=useState(false),[query,setQuery]=useState(""),[shortcut,setShortcut]=useState("Ctrl K");
 const input=useRef<HTMLInputElement>(null);
 const router=useRouter();
 useEffect(()=>{setShortcut(/Mac|iPhone|iPad/i.test(navigator.platform)?"⌘ K":"Ctrl K")},[]);
 useEffect(()=>{const onKey=(event:KeyboardEvent)=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();setOpen(true)}if(event.key==="Escape")setOpen(false)};window.addEventListener("keydown",onKey);return()=>window.removeEventListener("keydown",onKey)},[]);
 useEffect(()=>{if(open){setQuery("");requestAnimationFrame(()=>input.current?.focus())}},[open]);
 const results=useMemo(()=>{const q=query.trim().toLowerCase();return (q?tools.filter(t=>`${t.name} ${t.description} ${t.category}`.toLowerCase().includes(q)):tools).slice(0,8)},[query]);
 return <>
  <button type="button" className="search-trigger" aria-label={`Search tools (${shortcut})`} onClick={()=>setOpen(true)}><Search size={17}/><span>Search</span><kbd>{shortcut}</kbd></button>
  <AnimatePresence>{open&&<motion.div className="search-backdrop" role="presentation" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
   <motion.section className="search-dialog" role="dialog" aria-modal="true" aria-label="Search TapTools" initial={{opacity:0,y:14,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:.99}} transition={{duration:.16}}>
    <div className="search-input-row"><Search size={20}/><input ref={input} value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&results[0]){router.push(`/tools/${results[0].slug}`);setOpen(false)}}} placeholder="Search tools…" aria-label="Search tools"/><kbd>{shortcut}</kbd><button type="button" onClick={()=>setOpen(false)} aria-label="Close search"><X size={18}/></button></div>
    <div className="search-results" role="listbox" aria-label="Tools">{results.length?results.map(tool=><Link role="option" aria-selected="false" key={tool.slug} href={`/tools/${tool.slug}`} onClick={()=>setOpen(false)}><span className={`search-result-icon icon-${tool.category.toLowerCase()}`}><tool.icon size={18}/></span><span className="search-result-copy"><b>{tool.name}</b><small>{tool.description}</small></span><span className="search-result-category">{tool.category}</span><ArrowRight size={16}/></Link>):<div className="search-empty">No tools match “{query}”.</div>}</div>
    <div className="search-dialog-foot"><span><Command size={13}/> Find a tool and get back to it.</span><button onClick={()=>setOpen(false)}>ESC <span>to close</span></button></div>
   </motion.section>
  </motion.div>}</AnimatePresence>
 </>
}
