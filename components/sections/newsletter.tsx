'use client'

import { useRef, useState } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import { useNewsletterScroll } from '@/components/animations/use-newsletter-scroll'

export function Newsletter() {
  const [newsletter, setNewsletter] = useState('')
  const [joined, setJoined] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  useNewsletterScroll(sectionRef)

  return (
    <section id="features" ref={sectionRef} className="relative min-h-130 overflow-hidden bg-primary px-[12vw] py-30 max-[850px]:px-[8vw] max-[850px]:py-22.5">
      <div className="absolute inset-0 origin-center scale-120 -skew-y-7 bg-[linear-gradient(rgba(0,0,0,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.25)_1px,transparent_1px)] bg-size-[65px_65px] opacity-16" />
      <div className="newsletter-panel relative max-w-130">
        <span className="folio inline-block font-display text-[13px] italic text-black/60">Never miss a moment</span>
        <h2 className="my-4.5 font-display text-[clamp(62px,8vw,100px)] font-bold">Stay in the<br /><em className="font-normal text-[#080b10]">know.</em></h2>
        <p className="max-w-85 text-sm leading-[1.6] text-black/70">Weekly signal from the world of competitive gaming. No noise, just what matters.</p>
        {joined ? (
          <div className="flex items-center gap-2.5 py-4 font-mono text-xs font-bold text-[#080b10]"><Zap className="w-4.25" /> You&apos;re on the list. Welcome to Northstar.</div>
        ) : (
          <form
            className="relative mt-7 flex max-w-107.5 items-center gap-2 rounded-full border border-black/15 bg-white/30 py-1.5 pl-5.5 pr-1.5 shadow-[0_4px_20px_rgba(0,0,0,.12),inset_0_1px_0_rgba(255,255,255,.5)]"
            onSubmit={(e) => { e.preventDefault(); if (newsletter.includes('@')) setJoined(true) }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={newsletter}
              onChange={(e) => setNewsletter(e.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-[#080b10] outline-0 placeholder:text-black/60"
            />
            <button aria-label="Subscribe" className="grid h-10 w-10 flex-none place-items-center rounded-full border border-white/50 bg-white/60 text-[#080b10] shadow-[inset_0_1px_0_rgba(255,255,255,.6)] transition-colors duration-300 hover:bg-white/80"><ArrowRight className="w-4.5" /></button>
          </form>
        )}
        <span className="mt-3 block font-mono text-[9px] text-black/50">By subscribing, you agree to our terms and privacy policy.</span>
      </div>
    </section>
  )
}
