'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { ArrowUpRight } from '@/components/shared/arrow-up-right'
import { useArchitectureScroll } from '@/components/animations/use-architecture-scroll'

const ENGINES = [
  {
    key: 'media',
    label: 'Epigro Media',
    title: <>Make culture<br /><em className="font-normal text-primary">move.</em></>,
    copy: 'Brand worlds, content systems and creator programs designed for the audience, not around it.',
    tags: ['Brand', 'Content', 'Creators'],
    href: '#services',
    cta: 'Explore media',
    accent: 'text-primary',
    accentBorder: 'border-l-primary',
    glow: '#2171b5',
  },
  {
    key: 'gaming',
    label: 'Epigrotive Gaming',
    title: <>Build the<br /><em className="font-normal text-accent-blue">arena.</em></>,
    copy: 'Esports IPs, tournaments and community ecosystems that give people a reason to show up.',
    tags: ['Esports', 'Tournaments', 'Community'],
    href: '#gaming',
    cta: 'Explore gaming',
    accent: 'text-accent-blue',
    accentBorder: 'border-l-accent-blue',
    glow: '#6baed6',
  },
]

export function Architecture() {
  const sectionRef = useRef<HTMLElement>(null)
  useArchitectureScroll(sectionRef)

  return (
    <section ref={sectionRef} className="relative z-2 mx-auto max-w-312.5 bg-background px-[4vw] pt-34 max-[850px]:px-[8vw]">
      <div className="architecture-heading mb-17.5 flex flex-wrap items-end justify-between gap-7.5 border-b border-line pb-6.5 max-[850px]:flex-col max-[850px]:items-start max-[850px]:gap-4.5">
        <h2 className="m-0 font-display text-[clamp(46px,6vw,74px)] font-bold leading-[.9]">One house.<br /><em className="font-normal text-primary">Two engines.</em></h2>
        <p className="max-w-82.5 text-sm leading-[1.7] text-[#8995a2]">One connected company, run as two specialist teams — because a brand campaign and a live tournament need different instincts, even when they&apos;re telling the same story.</p>
      </div>

      <div className="architecture-grid relative grid grid-cols-2 gap-4.5 max-[850px]:grid-cols-1">
        <div className="architecture-seam pointer-events-none absolute inset-y-0 left-1/2 z-2 w-px -translate-x-1/2 max-[850px]:hidden">
          <span className="architecture-seam-line absolute inset-x-0 top-0 h-0 w-px bg-linear-to-b from-transparent via-white/25 to-transparent" />
          <span className="architecture-seam-badge absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0b0f16]/70 font-mono text-[9px] font-bold tracking-widest text-[#8b95a2] shadow-[0_0_24px_rgba(0,0,0,.5)] backdrop-blur-md">VS</span>
        </div>

        {ENGINES.map((e) => (
          <div
            key={e.key}
            className={`engine-card engine-${e.key} group relative isolate flex min-h-115 flex-col justify-between overflow-hidden rounded-2xl border border-white/12 border-l-2 ${e.accentBorder} bg-white/4.5 p-9 shadow-[0_20px_60px_-20px_rgba(0,0,0,.65),inset_0_1px_0_rgba(255,255,255,.09)] backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1.5 hover:border-white/28 hover:bg-white/7.5 hover:shadow-[0_28px_70px_-18px_rgba(0,0,0,.7),inset_0_1px_0_rgba(255,255,255,.14)] max-[850px]:min-h-90`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full opacity-35 blur-[90px] transition-opacity duration-500 group-hover:opacity-50"
              style={{ background: e.glow }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-white/10 via-transparent to-transparent" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/6" />

            <div className="relative flex items-start justify-between">
              <span className="engine-index font-mono text-sm font-bold uppercase tracking-[.14em] text-[#c3cad1]">{e.label}</span>
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/15 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-xl transition-[background-color,border-color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/30 group-hover:bg-white/15">
                <ArrowUpRight className={`w-4 ${e.accent}`} />
              </span>
            </div>

            <h3 className="relative my-auto mb-5 font-display text-[clamp(36px,4.2vw,58px)] font-bold leading-[.9] tracking-[-.01em]">{e.title}</h3>

            <div className="relative">
              <p className="mb-5 max-w-85 text-[13px] leading-[1.65] text-[#9ba5b0]">{e.copy}</p>
              <div className="mb-6.5 flex flex-wrap gap-2">
                {e.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/12 bg-white/5 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-[#aab3bd] backdrop-blur-md">{tag}</span>
                ))}
              </div>
              <a
                className="group/btn inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_4px_20px_rgba(0,0,0,.3),inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-xl transition-[background-color,border-color] duration-300 hover:border-white/35 hover:bg-white/15"
                href={e.href}
              >
                {e.cta}
                <ArrowRight className={`w-3.5 ${e.accent} transition-transform duration-300 group-hover/btn:translate-x-1`} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
