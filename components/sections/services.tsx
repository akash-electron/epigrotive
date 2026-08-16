'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowDownRight } from 'lucide-react'
import { Reveal } from '@/components/shared/reveal'
import { services } from '@/components/site-data'
import { useServicesScroll } from '@/components/animations/use-services-scroll'

function ServicesList({ items }: { items: typeof services }) {
  const [active, setActive] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const railTween = useRef<{ y: (v: number) => void; h: (v: number) => void } | null>(null)
  const coarse = useRef(false)

  useEffect(() => {
    coarse.current = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (railRef.current) {
      railTween.current = {
        y: gsap.quickTo(railRef.current, 'y', { duration: reduced ? 0.01 : 0.5, ease: 'power3.out' }),
        h: gsap.quickTo(railRef.current, 'height', { duration: reduced ? 0.01 : 0.4, ease: 'power3.out' }),
      }
    }
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dOpen = reduced ? 0.01 : 0.55
    const dClose = reduced ? 0.01 : 0.38

    items.forEach((_, i) => {
      const panel = panelRefs.current[i]
      const copy = panel?.querySelectorAll<HTMLElement>('p')
      if (!panel) return
      gsap.killTweensOf(panel)
      if (active === i) {
        gsap.set(panel, { display: 'block' })
        gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: dOpen, ease: 'power3.out' })
        if (copy?.length) gsap.fromTo(copy, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: dOpen, stagger: 0.07, delay: 0.06, ease: 'power2.out' })
      } else {
        gsap.to(panel, { height: 0, opacity: 0, duration: dClose, ease: 'power2.inOut', onComplete: () => gsap.set(panel, { display: 'none' }) })
      }
    })

    const row = active !== null ? rowRefs.current[active] : null
    if (row && listRef.current && railTween.current) {
      const listBox = listRef.current.getBoundingClientRect()
      const rowBox = row.getBoundingClientRect()
      railTween.current.y(rowBox.top - listBox.top)
      railTween.current.h(rowBox.height)
      gsap.to(railRef.current, { opacity: 1, duration: 0.25 })
    } else if (railRef.current) {
      gsap.to(railRef.current, { opacity: 0, duration: 0.25 })
    }
  }, [active, items])

  return (
    <div className="relative mt-16.25 border-t border-line" ref={listRef}>
      <div ref={railRef} aria-hidden="true" className="absolute left-0 top-0 h-0 w-0.5 bg-primary opacity-0 shadow-[0_0_14px_rgba(33,113,181,.55)]" />
      {items.map((item, i) => (
        <div key={item.title} ref={(el) => { rowRefs.current[i] = el }} className="service-row relative border-b border-line">
          <button
            type="button"
            aria-expanded={active === i}
            onClick={() => setActive((a) => (a === i ? null : i))}
            onMouseEnter={() => { if (!coarse.current) setActive(i) }}
            onMouseLeave={() => { if (!coarse.current) setActive((a) => (a === i ? null : a)) }}
            className={`flex min-h-25 w-full items-center justify-between gap-5.5 border-0 bg-transparent pl-6.5 text-left transition-[padding-left,background-color] duration-400 ease-out hover:bg-[#0d131c] hover:pl-8.5 max-[850px]:min-h-19.5 max-[850px]:gap-3 max-[850px]:pl-1 max-[850px]:hover:pl-2.5 ${active === i ? 'bg-[#0d131c] pl-8.5 max-[850px]:pl-2.5' : ''}`}
          >
            <h3 className={`m-0 font-display text-2xl font-bold text-[#dfe3e7] transition-colors duration-350 max-[850px]:text-xl ${active === i ? 'text-white' : ''}`}>{item.title}</h3>
            <ArrowDownRight className={`mr-6.5 w-4.5 flex-none text-primary transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] max-[850px]:mr-1 ${active === i ? 'rotate-45' : ''}`} />
          </button>
          <div
            ref={(el) => { panelRefs.current[i] = el }}
            style={{ display: 'none', height: 0, overflow: 'hidden' }}
            className={`px-6.5 max-[850px]:px-1 ${active === i ? 'pb-7.5' : ''}`}
          >
            <p className="mb-2.5 max-w-120 text-sm leading-[1.6] text-[#8995a2]">{item.line}</p>
            <p className="relative max-w-120 pl-4 text-sm italic leading-[1.6] text-[#c3cad1] before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  useServicesScroll(sectionRef)

  return (
    <section id="services" ref={sectionRef} className="mx-auto max-w-312.5 px-[4vw] py-31.25 max-[850px]:px-[8vw] max-[850px]:py-21.25">
      <Reveal variant="up" className="flex flex-wrap items-end justify-between gap-7.5 border-b border-line pb-6.5 max-[850px]:flex-col max-[850px]:items-start max-[850px]:gap-4.5">
        <h2 className="m-0 font-display text-[clamp(46px,6vw,74px)] font-bold">Built to<br /><em className="font-normal text-primary">deliver.</em></h2>
        <p className="max-w-82.5 text-sm leading-[1.7] text-[#8995a2]">Four disciplines. No handoffs — the same people carry an idea from the first strategy call to the night it goes live.</p>
      </Reveal>
      <ServicesList items={services} />
    </section>
  )
}
