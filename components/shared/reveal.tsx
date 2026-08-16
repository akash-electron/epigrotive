'use client'

import { useEffect, useRef } from 'react'

export function Reveal({ children, className = '', variant = 'up', delay = 0, tilt = false }: { children: React.ReactNode; className?: string; variant?: 'up' | 'left' | 'right' | 'scale' | 'blur' | 'rotate'; delay?: number; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      el.classList.toggle('is-visible', entry.isIntersecting)
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tilt) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateX(${py * -10}deg) rotateY(${px * 10}deg) scale(1.015)`
  }
  function handleLeave() {
    if (!tilt) return
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <div
      ref={ref}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
      className={`reveal reveal-${variant}${tilt ? ' tilt' : ''} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
