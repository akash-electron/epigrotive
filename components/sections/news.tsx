'use client'

import { useRef, useState } from 'react'
import { ArrowRight, Clock3, Flame, Play } from 'lucide-react'
import { Reveal } from '@/components/shared/reveal'
import { stories } from '@/components/site-data'
import { useNewsScroll } from '@/components/animations/use-news-scroll'

const TABS = ['LATEST', 'TRENDING', 'OPINION']

export function News() {
  const [activeTab, setActiveTab] = useState('LATEST')
  const sectionRef = useRef<HTMLElement>(null)
  useNewsScroll(sectionRef)

  return (
    <section id="news" ref={sectionRef} className="mx-auto max-w-312.5 px-[4vw] py-31.25 max-[850px]:px-[8vw] max-[850px]:py-21.25">
      <Reveal className="flex flex-wrap items-end justify-between gap-7.5 border-b border-line pb-6.5 max-[850px]:flex-col max-[850px]:items-start max-[850px]:gap-4.5">
        <h2 className="m-0 font-display text-[clamp(46px,6vw,74px)] font-bold">What&apos;s <em className="font-normal text-primary">happening.</em></h2>
        <a href="#news" className="text-link mb-2.5 flex items-center gap-2.5 font-mono text-[10px] font-bold tracking-[.1em] text-[#c3cad1]">View all news <ArrowRight className="w-3.5 text-primary" /></a>
      </Reveal>

      <div className="mt-16.25 mb-7.5 flex gap-6 border-b border-line">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.75 border-0 bg-transparent pb-3.75 font-mono text-[10px] font-bold tracking-[.15em] text-[#69737e] ${
              activeTab === tab ? 'border-b-2 border-primary text-[#f4f5f6]' : ''
            }`}
          >
            {tab}{tab === 'TRENDING' && <Flame className="w-3.25 text-primary" />}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-6 max-[850px]:grid-cols-1">
        {stories.map((story, i) => (
          <div className={`story-card card-${i + 1} group min-w-0`} key={story.title}>
            <div className={`relative overflow-hidden bg-card after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_50%,rgba(0,0,0,.7))] max-[850px]:aspect-[1.5] ${i === 0 ? 'aspect-[1.08]' : 'aspect-[1.46]'}`}>
              <img src={story.image} alt="Esports competition" className="h-full w-full object-cover grayscale-[.18] transition-[transform,filter] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-108 group-hover:grayscale-0" />
              <button className="absolute bottom-3.5 right-3.75 z-1 grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/12 text-white shadow-[0_4px_14px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.2)] backdrop-blur-lg transition-colors duration-300 hover:bg-white/20" aria-label="Play story"><Play className="w-2.75" fill="currentColor" /></button>
            </div>
            <div className="py-4.5">
              <span className="story-category font-mono text-[9px] font-bold tracking-[.13em] text-primary">{story.category}</span>
              <h3 className={`my-2.75 font-display font-bold leading-[1.16] tracking-[0em] ${i === 0 ? 'text-[27px]' : 'text-[22px]'}`}>{story.title}</h3>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#717c88]"><Clock3 className="w-3" /> {story.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
