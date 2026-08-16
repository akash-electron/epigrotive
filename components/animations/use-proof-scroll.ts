'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** The quote is uncovered by a sweeping mask, left to right; the process steps count up into view. */
export function useProofScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = scopeRef.current
    if (!section) return

    const quote = section.querySelector<HTMLElement>('.proof-quote')
    if (quote) {
      gsap.fromTo(quote,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power4.inOut', scrollTrigger: { trigger: quote, start: 'top 80%', toggleActions: 'play none none reverse' } })
    }

    const steps = section.querySelectorAll<HTMLElement>('.proof-step')
    if (steps.length) {
      gsap.fromTo(steps,
        { autoAlpha: 0, y: 24, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, stagger: 0.14, duration: 0.65, ease: 'back.out(2)', scrollTrigger: { trigger: section.querySelector('.proof-steps'), start: 'top 82%', toggleActions: 'play none none reverse' } })
    }
  }, { scope: scopeRef })
}
