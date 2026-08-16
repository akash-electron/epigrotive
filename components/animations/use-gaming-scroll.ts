'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Backdrop drifts as a slow parallax layer; pillar rows rise in while an underline draws itself beneath each. */
export function useGamingScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = scopeRef.current
    if (!section) return

    const backdrop = section.querySelector<HTMLElement>('.gaming-chapter-bg')
    if (backdrop) {
      gsap.fromTo(backdrop, { yPercent: -7, scale: 1.18 }, { yPercent: 7, scale: 1.08, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } })
    }

    const pillars = section.querySelectorAll<HTMLElement>('.gaming-pillar')
    pillars.forEach((pillar, i) => {
      const underline = pillar.querySelector<HTMLElement>('.gaming-pillar-line')
      const tl = gsap.timeline({ scrollTrigger: { trigger: pillar, start: 'top 88%', toggleActions: 'play none none reverse' }, delay: i * 0.08 })
      tl.fromTo(pillar, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      if (underline) tl.fromTo(underline, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.25')
    })
  }, { scope: scopeRef })
}
