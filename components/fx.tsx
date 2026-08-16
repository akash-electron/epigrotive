'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#0123456789ABCDEF'

function scrambleTextNode(node: Text) {
  const final = node.textContent ?? ''
  if (!final.trim()) return
  const start = performance.now()
  const duration = 750
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration)
    const revealed = Math.floor(final.length * p)
    let out = final.slice(0, revealed)
    for (let i = revealed; i < final.length; i++) {
      out += final[i] === ' ' ? ' ' : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0]
    }
    node.textContent = out
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function splitChars(heading: HTMLElement) {
  if (heading.dataset.split) return
  heading.dataset.split = '1'
  const wrap = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      if (!text.trim()) return
      const frag = document.createDocumentFragment()
      for (const ch of text) {
        if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); continue }
        const s = document.createElement('span')
        s.className = 'char'
        s.textContent = ch
        frag.appendChild(s)
      }
      node.parentNode?.replaceChild(frag, node)
    } else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName !== 'BR') {
      Array.from(node.childNodes).forEach(wrap)
    }
  }
  Array.from(heading.childNodes).forEach(wrap)
}

export function SiteFX() {
  const lenisRef = useRef<Lenis | null>(null)

  // Lenis smooth scroll, driven by GSAP's ticker (autoRaf off to avoid double-raf)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, duration: 1.4 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const target = document.getElementById(a.getAttribute('href')!.slice(1))
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -100, duration: 1.3 })
    }
    document.addEventListener('click', onAnchorClick)

    // Recalculate trigger positions once everything (fonts, images) has loaded
    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    window.addEventListener('load', refresh)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', refresh)
      document.removeEventListener('click', onAnchorClick)
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // All scroll-driven animations — useGSAP handles strict-mode-safe cleanup
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const isCompact = window.matchMedia('(max-width: 850px), (pointer: coarse)').matches

    // Curtain hero: the hero stays pinned (no spacer) while the next section
    // slides up over it — the image zooms and dims exactly once, then is covered
    const hero = document.querySelector<HTMLElement>('.hero')
    if (hero) {
      gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true, pin: true, pinSpacing: false } })
        .fromTo('.hero-image', { scale: 1.02, filter: 'saturate(.75) brightness(1)' }, { scale: 1.25, filter: 'saturate(.75) brightness(.45)', ease: 'none' }, 0)
        .to('.hero-grid', { opacity: 0, ease: 'none' }, 0)
        .to('.hero-index', { yPercent: -140, opacity: 0, ease: 'none' }, 0)
        .to('.scroll-cue', { opacity: 0, ease: 'none' }, 0)
    }

    // Big intro statement scales with the scrollbar, then shrinks and dims on exit
    const introH1 = document.querySelector<HTMLElement>('.scroll-intro h1')
    if (introH1) {
      gsap.timeline({ scrollTrigger: { trigger: '.scroll-intro', start: 'top bottom', end: 'bottom top', scrub: true } })
        .fromTo(introH1, { scale: 0.68, opacity: 0.08 }, { scale: 1, opacity: 1, ease: 'none', duration: 0.42 })
        .to(introH1, { scale: 1, duration: 0.18 })
        .to(introH1, { scale: 0.86, opacity: 0.2, ease: 'none', duration: 0.4 })
    }

    // Section backdrops drift with scroll position
    ;['.film-backdrop', '.gaming-chapter-bg'].forEach((sel) => {
      const el = document.querySelector<HTMLElement>(sel)
      if (!el?.parentElement) return
      gsap.fromTo(el, { yPercent: -7, scale: 1.18 }, { yPercent: 7, scale: 1.08, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } })
    })

    // Headline letter cascade — plays in, reverses when scrolling back up.
    // Skip the 3D perspective tilt on phones: many small rotateX spans are
    // costly on mobile GPUs, so fall back to a cheaper 2D rise there.
    document.querySelectorAll<HTMLElement>('h2').forEach((h) => {
      splitChars(h)
      const chars = h.querySelectorAll('.char')
      if (!chars.length) return
      gsap.fromTo(chars,
        isCompact ? { y: 30, opacity: 0 } : { y: 70, opacity: 0, rotateX: -55 },
        { y: 0, opacity: 1, rotateX: 0, stagger: isCompact ? 0.018 : 0.028, duration: isCompact ? 0.5 : 0.85, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 88%', toggleActions: 'play none none reverse' } })
    })

    // Work-card orbit rings rotate with the scrollbar
    document.querySelectorAll<HTMLElement>('.work-orbit').forEach((el) => {
      gsap.to(el, { rotate: 200, ease: 'none', scrollTrigger: { trigger: el, scrub: 1.2 } })
    })

    // Ranking rows stagger in and reverse out
    const rows = document.querySelectorAll('.ranking-row')
    if (rows.length) {
      gsap.fromTo(rows,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.09, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.ranking-table', start: 'top 82%', toggleActions: 'play none none reverse' } })
    }
  })

  // Non-GSAP flourishes: HUD text decode + magnetic buttons
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const scrambleEls = document.querySelectorAll<HTMLElement>('.eyebrow, .scroll-intro-number, .story-category, .engine-index, .work-client')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        io.unobserve(entry.target)
        Array.from(entry.target.childNodes)
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .forEach((n) => scrambleTextNode(n as Text))
      })
    }, { threshold: 0.5 })
    scrambleEls.forEach((el) => io.observe(el))

    const magnets = document.querySelectorAll<HTMLElement>('.subscribe-button, .primary-button')
    const magnetCleanups: (() => void)[] = []
    magnets.forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
      }
      const leave = () => { xTo(0); yTo(0) }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      magnetCleanups.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) })
    })

    return () => {
      io.disconnect()
      magnetCleanups.forEach((fn) => fn())
    }
  }, [])

  return null
}

type Particle = { x: number; y: number; r: number; s: number; drift: number; c: string; a: number }

export function Particles({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let w = 0, h = 0, rafId = 0
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const COLORS = ['rgba(37,136,255,', 'rgba(221,24,37,', 'rgba(255,255,255,']
    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: h + Math.random() * h * 0.4,
      r: 0.7 + Math.random() * 1.7,
      s: 0.2 + Math.random() * 0.55,
      drift: (Math.random() - 0.5) * 0.35,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      a: 0.15 + Math.random() * 0.45,
    })
    const count = window.matchMedia('(max-width: 850px), (pointer: coarse)').matches ? 22 : 55
    const particles = Array.from({ length: count }, spawn)
    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.y -= p.s
        p.x += p.drift
        if (p.y < -8 || p.x < -8 || p.x > w + 8) Object.assign(p, spawn(), { y: h + 8 })
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.c + p.a + ')'
        ctx.fill()
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className={className} aria-hidden="true" />
}
