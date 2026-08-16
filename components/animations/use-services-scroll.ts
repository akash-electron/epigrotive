'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Rows uncover left to right like venetian blinds opening, one after another. */
export function useServicesScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rows = scopeRef.current?.querySelectorAll<HTMLElement>('.service-row')
    if (!rows?.length) return

    gsap.fromTo(rows,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)', duration: 0.85, stagger: 0.1, ease: 'power3.inOut',
        scrollTrigger: { trigger: scopeRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      })
  }, { scope: scopeRef })
}
