'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Footer columns rise up one after another, like credits settling into place. */
export function useFooterScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cols = scopeRef.current?.querySelectorAll<HTMLElement>('.footer-col')
    if (!cols?.length) return

    gsap.fromTo(cols,
      { autoAlpha: 0, y: 34 },
      { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: scopeRef.current, start: 'top 90%', toggleActions: 'play none none reverse' } })
  }, { scope: scopeRef })
}
