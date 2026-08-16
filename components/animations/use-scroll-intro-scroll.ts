'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** The big intro statement scales up with the scrollbar, holds, then shrinks and dims on exit. */
export function useScrollIntroScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const h1 = scopeRef.current?.querySelector<HTMLElement>('h1')
    if (!h1) return

    gsap.timeline({ scrollTrigger: { trigger: scopeRef.current, start: 'top bottom', end: 'bottom top', scrub: true } })
      .fromTo(h1, { scale: 0.68, opacity: 0.08 }, { scale: 1, opacity: 1, ease: 'none', duration: 0.42 })
      .to(h1, { scale: 1, duration: 0.18 })
      .to(h1, { scale: 0.86, opacity: 0.2, ease: 'none', duration: 0.4 })
  }, { scope: scopeRef })
}
