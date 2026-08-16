'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** The panel reveals from a circular mask expanding out of its center, like a spotlight opening. */
export function useNewsletterScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const panel = scopeRef.current?.querySelector<HTMLElement>('.newsletter-panel')
    if (!panel) return

    gsap.fromTo(panel,
      { clipPath: 'circle(0% at 0% 50%)' },
      {
        clipPath: 'circle(140% at 0% 50%)', duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: scopeRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      })
  }, { scope: scopeRef })
}
