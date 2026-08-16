'use client'

import { useRef } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { Reveal } from '@/components/shared/reveal'
import { ArrowUpRight } from '@/components/shared/arrow-up-right'
import { useFilmScroll } from '@/components/animations/use-film-scroll'

export function Film() {
  const sectionRef = useRef<HTMLElement>(null)
  useFilmScroll(sectionRef)

  return (
    <section id="video" ref={sectionRef} className="relative grid min-h-170 grid-cols-[1fr_1.1fr] items-center gap-[8vw] overflow-hidden bg-[#111a28] px-[10vw] py-25 max-[850px]:grid-cols-1 max-[850px]:gap-11.25 max-[850px]:px-[8vw] max-[850px]:py-22.5">
      <div className="film-backdrop absolute inset-0 scale-108 bg-[linear-gradient(90deg,#111a28_15%,transparent),url('https://images.unsplash.com/photo-1592840062661-93f5de56a4ba?auto=format&fit=crop&w=1800&q=75')] bg-cover bg-center opacity-26" />

      <Reveal className="relative z-1">
        <span className="folio mb-1 inline-block font-display text-[13px] italic text-[#6b7784]">Epigrotive Films</span>
        <h2 className="my-6.25 font-display text-[clamp(56px,7vw,94px)] font-bold">Made for<br /><em className="font-normal text-primary">the moment.</em></h2>
        <p className="mb-8.25 max-w-81.25 text-sm leading-[1.7] text-[#9ba8b7]">Every frame tells a story. Go behind the scenes with the people who make competitive gaming unforgettable.</p>
        <a className="primary-button inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-3.5 font-sans text-sm font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-xl transition-colors duration-300 hover:border-white/40 hover:bg-white/15" href="#video">Explore films <ArrowRight className="w-4" /></a>
      </Reveal>

      <div className="film-frame relative z-1 bg-white/7 p-2.5 shadow-[25px_30px_60px_rgba(0,0,0,.35)]">
        <div className="relative aspect-[1.7] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1100&q=85" alt="Gaming setup glowing in a dark room" className="h-full w-full object-cover saturate-72" />
          <button className="absolute left-1/2 top-1/2 grid h-16.5 w-16.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/12 text-white shadow-[0_8px_24px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-xl transition-colors duration-300 hover:bg-white/20" aria-label="Play Northstar film"><Play className="w-5" fill="currentColor" /></button>
        </div>
        <div className="flex justify-between px-2 pb-1.75 pt-3.75 font-mono text-[10px] tracking-[.11em] text-[#b8c3cf]">
          <span>THE RISE OF THE UNDERDOG</span>
          <span className="flex items-center gap-1">FILM 04 <ArrowUpRight className="w-3.25" /></span>
        </div>
      </div>
    </section>
  )
}
