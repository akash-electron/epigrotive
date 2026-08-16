'use client'

import { useRef } from 'react'
import { Particles } from '@/components/fx'
import { useHeroScroll } from '@/components/animations/use-hero-scroll'

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  useHeroScroll(heroRef)

  function handleHeroMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <section id="top" className="hero" ref={heroRef} onMouseMove={handleHeroMove}>
      <div className="hero-image" />
      <div className="hero-grid" />
      <div className="hero-scanlines" />
      <Particles className="hero-particles" />
      <div className="hero-spotlight" />
    </section>
  )
}
