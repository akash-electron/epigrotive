'use client'

import { useRef } from 'react'
import { Reveal } from '@/components/shared/reveal'
import { useProofScroll } from '@/components/animations/use-proof-scroll'

const BRANDS = ['RED BULL', 'RIOT GAMES', 'EA SPORTS', 'LOGITECH', 'ADIDAS']

export function Proof() {
  const sectionRef = useRef<HTMLElement>(null)
  useProofScroll(sectionRef)

  return (
    <section ref={sectionRef} className="mx-auto max-w-312.5 px-[4vw] pb-33.75 pt-31.25 max-[850px]:px-[8vw] max-[850px]:pt-21.25">
      <Reveal variant="up" className="flex flex-wrap items-end justify-between gap-7.5 border-b border-line pb-6.5 max-[850px]:flex-col max-[850px]:items-start max-[850px]:gap-4.5">
        <h2 className="m-0 font-display text-[clamp(46px,6vw,74px)] font-bold">Made with<br /><em className="font-normal text-primary">ambition.</em></h2>
        <p className="max-w-82.5 text-sm leading-[1.7] text-[#8995a2]">The best partnerships are built on shared appetite. We work with people ready to make the next important thing.</p>
      </Reveal>

      <div className="mt-16.25 overflow-hidden border-y border-line py-9.5 mask-[linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="proof-rail-track flex w-max items-center gap-15 animate-[marquee_26s_linear_infinite] hover:paused max-[850px]:flex-wrap max-[850px]:justify-start">
          {[...Array(2)].flatMap(() => BRANDS).map((brand, i) => (
            <span key={i} className="flex-none whitespace-nowrap font-mono text-sm font-extrabold tracking-wider text-[#697581] transition-colors duration-300 hover:text-[#e9edf0] max-[850px]:min-w-[42%]">{brand}</span>
          ))}
        </div>
      </div>

      <div className="mt-4.5 grid grid-cols-2 gap-4.5 max-[850px]:grid-cols-1">
        <div className="proof-quote min-h-57.5 border border-line bg-[#0e141d] p-7.5">
          <span className="font-display text-6xl leading-[.5] text-primary">&ldquo;</span>
          <blockquote className="my-5 max-w-107.5 font-display text-[26px] font-bold leading-[1.05] tracking-normal">They understood the audience before we had the words for it.</blockquote>
          <cite className="font-mono text-[9px] not-italic tracking-widest text-[#778390]">— Marketing director, global publisher</cite>
        </div>
        <div className="min-h-57.5 border border-line bg-[#0e141d] p-7.5">
          <span className="folio inline-block font-display text-[13px] italic text-[#6b7784]">How we work</span>
          <div className="proof-steps mt-13.75 flex items-center gap-5 max-[850px]:gap-3">
            {['Discover', 'Build', 'Launch'].map((step, i) => (
              <div key={step} className="proof-step flex flex-1 flex-col gap-2.75">
                <b className="font-mono text-[10px] font-normal text-[#778390]">0{i + 1}</b>
                <strong className="font-display text-xl font-bold max-[850px]:text-base">{step}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
