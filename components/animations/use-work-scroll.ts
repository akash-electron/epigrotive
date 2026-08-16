'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Cards punch in with an elastic overshoot, slightly rotated, snapping flat. */
export function useWorkScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = scopeRef.current?.querySelectorAll<HTMLElement>('.work-card')
    if (!cards?.length) return

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { autoAlpha: 0, scale: 0.82, rotate: i % 2 === 0 ? -3 : 3 },
        {
          autoAlpha: 1, scale: 1, rotate: 0, duration: 1, ease: 'elastic.out(1, 0.65)',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
    })
  }, { scope: scopeRef })
}
