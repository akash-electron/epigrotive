'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Cards slide in from alternating sides with a light skew that settles flat. */
export function useNewsScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = scopeRef.current?.querySelectorAll<HTMLElement>('.story-card')
    if (!cards?.length) return

    cards.forEach((card, i) => {
      const dir = i % 2 === 0 ? -1 : 1
      gsap.fromTo(card,
        { autoAlpha: 0, x: 70 * dir, skewX: 6 * dir },
        {
          autoAlpha: 1, x: 0, skewX: 0, duration: 0.9, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
    })
  }, { scope: scopeRef })
}
