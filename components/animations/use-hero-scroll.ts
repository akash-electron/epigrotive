'use client'

import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Curtain-pin merge: the hero stays pinned (no spacer) while the SocialStats panel
 *  docks into place and its cards tip up — all scrubbed to the same pin range, so the
 *  hero zoom/dim and the stats reveal read as one continuous motion, not two separate steps. */
export function useHeroScroll(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const hero = scopeRef.current
    if (!hero) return

    const panel = document.querySelector<HTMLElement>('.stats-panel')
    const cards = panel?.querySelectorAll<HTMLElement>('.stat-card')
    const glass = panel?.querySelectorAll<HTMLElement>('.stat-card-glass')

    const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, pin: true, pinSpacing: false } })
    tl.fromTo('.hero-image', { scale: 1.02, filter: 'saturate(.75) brightness(1)' }, { scale: 1.25, filter: 'saturate(.75) brightness(.45)', ease: 'none' }, 0)
    tl.to('.hero-grid', { opacity: 0, ease: 'none' }, 0)

    if (panel) tl.fromTo(panel, { yPercent: 5, scale: 1.03 }, { yPercent: 0, scale: 1, ease: 'none', duration: 1 }, 0)
    if (cards?.length) {
      // The panel isn't visible on screen until roughly 35% into the pin range
      // (it's sliding up from below the fold before that). Starting the reveal
      // right there and finishing by the halfway point means all cards are fully
      // settled once the panel has covered about half the screen, not lagging
      // behind it. Plain rise + fade (no per-card 3D tilt) so every in-between
      // frame still reads as a straight row instead of mismatched heights.
      tl.fromTo(cards,
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, stagger: 0.05, ease: 'none', duration: 0.15 }, 0.32)
    }
    if (glass?.length) {
      // The frosted-glass blur ramps up over the same window as the card
      // reveal — the cards arrive looking clear, then the panel behind them
      // progressively frosts as it settles into place.
      tl.fromTo(glass,
        { backdropFilter: 'blur(0px)' },
        { backdropFilter: 'blur(15px)', ease: 'none', duration: 0.2 }, 0.32)
    }
  }, { scope: scopeRef })
}
