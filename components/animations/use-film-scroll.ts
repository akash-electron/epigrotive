'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Backdrop drifts as a slow parallax layer; the framed preview swings in from a 3D tilt and settles flat. */
export function useFilmScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = scopeRef.current
    if (!section) return

    const backdrop = section.querySelector<HTMLElement>('.film-backdrop')
    if (backdrop) {
      gsap.fromTo(backdrop, { yPercent: -7, scale: 1.18 }, { yPercent: 7, scale: 1.08, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } })
    }

    const frame = section.querySelector<HTMLElement>('.film-frame')
    if (frame) {
      gsap.fromTo(frame,
        { autoAlpha: 0, rotateY: -35, rotateX: 8, x: 90, transformPerspective: 1200 },
        {
          autoAlpha: 1, rotateY: -7, rotateX: 3, x: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: frame, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
    }
  }, { scope: scopeRef })
}
