'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Rows slide in from the left in sequence, like a leaderboard being called out. */
export function useRankingsScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rows = scopeRef.current?.querySelectorAll<HTMLElement>('.rank-row')
    if (!rows?.length) return

    gsap.fromTo(rows,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.09, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: scopeRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } })
  }, { scope: scopeRef })
}
