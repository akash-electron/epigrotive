'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Pinned scroll-scrub. The section locks in place while the two cards fly
 *  in from opposite edges and converge on the seam, entirely driven by
 *  scroll offset (not time): scroll up and the cards retreat exactly as far
 *  as you scrolled. Needs extra scroll distance, so the page grows by ~120%
 *  of the viewport while this section is pinned. Skipped on mobile/coarse
 *  pointers, where a pinned section eats too much of a short viewport.
 *
 *  Scrub is unsmoothed (`scrub: true`) on purpose — Lenis (see fx.tsx)
 *  already lerps the raw scroll input, so an eased scrub here would stack a
 *  second layer of lag on top of it and the cards would visibly trail the
 *  scrollbar. The heading is left alone: it's already driven by the global
 *  per-character cascade in fx.tsx, and a second, independently-triggered
 *  fade on the same element caused a flash/flicker right as the section
 *  came into view. */
export function useArchitectureScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 850px)').matches) return
    const section = scopeRef.current
    if (!section) return

    const cards = section.querySelectorAll<HTMLElement>('.engine-card')
    const seamLine = section.querySelector<HTMLElement>('.architecture-seam-line')
    const seamBadge = section.querySelector<HTMLElement>('.architecture-seam-badge')
    if (!cards.length) return

    gsap.set(cards[0], { xPercent: -70, autoAlpha: 0 })
    gsap.set(cards[1], { xPercent: 70, autoAlpha: 0 })
    if (seamLine) gsap.set(seamLine, { height: '0%' })
    if (seamBadge) gsap.set(seamBadge, { autoAlpha: 0, scale: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: 'top top', end: '+=120%', scrub: true, pin: true, anticipatePin: 1, invalidateOnRefresh: true,
      },
    })

    tl.to(cards[0], { xPercent: 0, autoAlpha: 1, ease: 'none' }, 0)
      .to(cards[1], { xPercent: 0, autoAlpha: 1, ease: 'none' }, 0)
    if (seamLine) tl.to(seamLine, { height: '100%', ease: 'none' }, 0.3)
    if (seamBadge) tl.to(seamBadge, { autoAlpha: 1, scale: 1, ease: 'power2.out' }, 0.6)
  }, { scope: scopeRef })
}
