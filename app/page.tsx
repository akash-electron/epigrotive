'use client'

import { useEffect, useRef, useState } from 'react'
import { SiteFX } from '@/components/fx'
import { NAV_ITEMS } from '@/components/site-data'
import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { SocialStats } from '@/components/sections/social-stats'
import { Architecture } from '@/components/sections/architecture'
import { Services } from '@/components/sections/services'
import { Work } from '@/components/sections/work'
import { News } from '@/components/sections/news'
import { Film } from '@/components/sections/film'
import { Gaming } from '@/components/sections/gaming'
import { Proof } from '@/components/sections/proof'
import { Rankings } from '@/components/sections/rankings'
import { Newsletter } from '@/components/sections/newsletter'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('news')
  const pageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      pageRef.current?.style.setProperty('--scroll-progress', `${max ? window.scrollY / max : 0}`)
      setScrolled(window.scrollY > 40)
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.toLowerCase())).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <main ref={pageRef} className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <SiteFX />
      <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <SocialStats />
      <Architecture />
      <Services />
      <Work />
      <News />
      <Film />
      <Gaming />
      <Proof />
      <Rankings />
      <Newsletter />
      <Footer />
    </main>
  )
}
