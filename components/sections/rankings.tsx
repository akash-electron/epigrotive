'use client'

import { useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/shared/reveal'
import { Counter } from '@/components/shared/counter'
import { useRankingsScroll } from '@/components/animations/use-rankings-scroll'

const TEAMS = ['Gen.G', 'FNATIC', 'Team Vitality', 'T1']
const GRID = 'grid-cols-[90px_1.6fr_1fr_110px_20px] gap-5 max-[850px]:grid-cols-[42px_1fr_80px_45px] max-[850px]:gap-2.5 max-[850px]:px-1.75'

export function Rankings() {
  const sectionRef = useRef<HTMLElement>(null)
  useRankingsScroll(sectionRef)

  return (
    <section id="rankings" ref={sectionRef} className="mx-auto max-w-312.5 px-[4vw] py-31.25 max-[850px]:px-[8vw] max-[850px]:py-21.25">
      <Reveal className="flex flex-wrap items-end justify-between gap-7.5 border-b border-line pb-6.5 max-[850px]:flex-col max-[850px]:items-start max-[850px]:gap-4.5">
        <h2 className="m-0 font-display text-[clamp(46px,6vw,74px)] font-bold">The power <em className="font-normal text-primary">index.</em></h2>
        <a href="#rankings" className="text-link mb-2.5 flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-widest text-[#c3cad1]">Full rankings <ArrowRight className="w-3.5 text-primary" /></a>
      </Reveal>

      <div className="mt-15 border-t border-line">
        <div className={`grid items-center ${GRID} px-5 py-4 font-mono text-[9px] tracking-[.12em] text-[#69737e]`}>
          <span>RANK</span>
          <span>TEAM</span>
          <span className="max-[850px]:hidden">FORM</span>
          <span>RATING</span>
        </div>
        {TEAMS.map((team, i) => (
          <div className={`rank-row grid min-h-19.25 items-center ${GRID} border-t border-line px-5 font-mono text-[13px] text-[#8c96a1] transition-[background-color,padding-left] duration-300 hover:bg-[#0e141c] hover:pl-7 max-[850px]:px-1.75`} key={team}>
            <strong className="font-normal text-[#ccd2d8]">0{i + 1}</strong>
            <span className="flex items-center gap-3.75 text-[15px] text-white">
              <i className="grid h-7.5 w-7.5 flex-none place-items-center border border-[#3c4d63] bg-[#253244] font-mono text-[11px] font-bold not-italic text-[#d8e0e8]">{team[0]}</i>
              {team}
            </span>
            <span className="flex gap-1.25 max-[850px]:hidden">
              {[1, 1, 0, 1, 1].map((x, j) => (
                <b key={j} className={`grid h-5 w-5 place-items-center text-[8px] ${x ? 'bg-[rgba(62,209,123,.15)] text-[#54d993]' : 'bg-[rgba(221,24,37,.12)] text-[#e25a65]'}`}>{x ? 'W' : 'L'}</b>
              ))}
            </span>
            <strong className="text-base font-normal text-[#ccd2d8]"><Counter value={968 - i * 21} /></strong>
            <ChevronDown className="w-3.5 text-[#596470]" />
          </div>
        ))}
      </div>
    </section>
  )
}
