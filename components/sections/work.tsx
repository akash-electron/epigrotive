'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/shared/reveal'
import { ArrowUpRight } from '@/components/shared/arrow-up-right'
import { work } from '@/components/site-data'
import { useWorkScroll } from '@/components/animations/use-work-scroll'

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  useWorkScroll(sectionRef)

  return (
    <section id="work" ref={sectionRef} className="mx-auto max-w-312.5 px-[4vw] py-31.25 max-[850px]:px-[8vw] max-[850px]:py-21.25">
      <Reveal variant="scale" className="flex flex-wrap items-end justify-between gap-7.5 border-b border-line pb-6.5 max-[850px]:flex-col max-[850px]:items-start max-[850px]:gap-4.5">
        <h2 className="m-0 font-display text-[clamp(46px,6vw,74px)] font-bold">Proof in<br /><em className="font-normal text-primary">the wild.</em></h2>
        <a className="mb-2.5 flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.1em] text-[#c3cad1]" href="#work">View case studies <ArrowRight className="w-3.5 text-primary" /></a>
      </Reveal>

      <div className="mt-16.25 grid grid-cols-[1.3fr_1fr] grid-rows-2 gap-4.5 max-[850px]:grid-cols-1 max-[850px]:grid-rows-none">
        {work.map((item, i) => (
          <div
            className={`work-card ${item.tone} relative flex flex-col justify-between overflow-hidden border border-line p-6.75 ${
              i === 0 ? 'row-span-2 min-h-140 max-[850px]:row-span-1 max-[850px]:min-h-82.5' : 'min-h-67.75'
            }`}
            key={item.client}
          >
            <span className="work-client font-mono text-[9px] font-bold uppercase tracking-[.12em] text-[#7c8794]">{item.client}</span>
            <h3 className={`relative z-1 my-auto mb-6.25 font-display font-bold leading-[.98] tracking-[-.01em] ${i === 0 ? 'max-w-95 text-[clamp(30px,2.8vw,42px)]' : 'max-w-65 text-[27px]'}`}>{item.title}</h3>
            <div className="relative z-1 flex flex-col gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[.12em] text-[#788492]">Verified result</span>
              <strong className="font-mono text-sm font-bold text-[#e9edf0]">{item.result}</strong>
            </div>
            <ArrowUpRight className="absolute bottom-6.25 right-6.25 w-4.5 text-primary" />
          </div>
        ))}
      </div>
    </section>
  )
}
