'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/shared/reveal'
import { ArrowUpRight } from '@/components/shared/arrow-up-right'
import { useGamingScroll } from '@/components/animations/use-gaming-scroll'

const PILLARS = ['Tournament IPs', 'Roster Programs', 'Creator Showdowns', 'Community Qualifiers']

export function Gaming() {
  const sectionRef = useRef<HTMLElement>(null)
  useGamingScroll(sectionRef)

  return (
    <section id="gaming" ref={sectionRef} className="relative grid min-h-180 grid-cols-2 gap-[8vw] overflow-hidden bg-[#0a1420] px-[10vw] py-35 max-[850px]:grid-cols-1 max-[850px]:gap-13.75 max-[850px]:px-[8vw] max-[850px]:py-22.5">
      <div className="gaming-chapter-bg absolute inset-0 scale-108 bg-[linear-gradient(90deg,#0a1420_15%,transparent),url('https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-32" />

      <Reveal variant="left" className="relative z-1">
        <span className="folio mb-1 inline-block font-display text-[13px] italic text-[#6b7784]">Epigrotive Gaming</span>
        <h2 className="my-2.5 font-display text-[clamp(60px,8vw,105px)] font-bold">The next<br /><em className="font-normal text-accent-deep">chapter.</em></h2>
        <p className="mb-8 max-w-82.5 text-sm leading-[1.7] text-[#a8b8c9]">Competitive gaming is more than a match. It is a living world of teams, creators and fans. We build the IPs that bring all three together.</p>
        <a className="primary-button inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/8 px-6 py-3.5 font-sans text-sm font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-xl transition-colors duration-300 hover:border-white/40 hover:bg-white/15" href="#contact">Start a conversation <ArrowRight className="w-4" /></a>
      </Reveal>

      <div className="relative z-1 self-center">
        {PILLARS.map((item) => (
          <div className="gaming-pillar group relative flex items-center justify-between gap-3.75 border-b border-white/14 py-5" key={item}>
            <strong className="font-display text-xl font-medium tracking-[-.01em] text-[#e9e2ee]">{item}</strong>
            <ArrowUpRight className="w-3.75 text-accent-deep opacity-55 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            <span className="gaming-pillar-line absolute inset-x-0 bottom-0 h-px bg-accent-deep" />
          </div>
        ))}
      </div>
    </section>
  )
}
