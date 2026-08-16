'use client'

import { ArrowRight, Menu, Search, X } from 'lucide-react'
import { NAV_ITEMS } from '@/components/site-data'

export function Header({
  scrolled,
  menuOpen,
  setMenuOpen,
  activeSection,
  setActiveSection,
}: {
  scrolled: boolean
  menuOpen: boolean
  setMenuOpen: (v: boolean | ((v: boolean) => boolean)) => void
  activeSection: string
  setActiveSection: (v: string) => void
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 grid h-[84px] grid-cols-[1fr_auto_1fr] items-center border-0 border-b border-line px-[34px] transition-[height,background-color,backdrop-filter] duration-400 ease-out max-[850px]:h-16 max-[850px]:px-3.5 max-[850px]:grid-cols-[1fr_auto] ${
        scrolled ? 'h-[68px] bg-[rgba(6,8,12,.86)] backdrop-blur-xl max-[850px]:h-[58px]' : 'bg-transparent'
      }`}
    >
      <a href="#top" className="relative z-10 flex items-center gap-3 font-display text-lg font-bold uppercase tracking-[.02em] transition-transform duration-300 ease-out hover:-translate-y-px max-[850px]:text-[13px] max-[850px]:gap-2">
        <img src="/epigrotive-logo.png" alt="Epigrotive Gaming logo" className="h-[42px] w-[42px] rounded-xl border border-white/16 object-cover transition-[box-shadow,transform] duration-400 max-[850px]:h-9 max-[850px]:w-9" />
        <span className="text-[#f5f6f7]">
          EPIGROTIVE
          <span className="mt-0.75 block font-mono text-[8px] font-bold tracking-[.24em] text-accent-blue max-[850px]:text-[7px]">GAMING CULTURE</span>
        </span>
      </a>

      <nav
        className={`relative z-10 flex items-center justify-center gap-9 max-[850px]:fixed max-[850px]:inset-0 max-[850px]:m-0 max-[850px]:flex-col max-[850px]:items-start max-[850px]:justify-start max-[850px]:gap-0 max-[850px]:bg-[rgba(6,8,12,.94)] max-[850px]:px-[10vw] max-[850px]:pt-27.5 max-[850px]:pb-15 max-[850px]:backdrop-blur-[26px] ${
          menuOpen ? 'max-[850px]:flex' : 'max-[850px]:hidden'
        }`}
        aria-label="Main navigation"
      >
        {NAV_ITEMS.map((item, i) => (
          <a
            href={`#${item.toLowerCase()}`}
            key={`${item}-${menuOpen}`}
            onClick={() => { setMenuOpen(false); setActiveSection(item.toLowerCase()) }}
            className={`relative py-[9px] font-sans text-xs font-semibold tracking-[.13em] text-[#8b8f96] opacity-0 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 max-[850px]:w-full max-[850px]:border-b max-[850px]:border-white/8 max-[850px]:py-4.5 max-[850px]:font-display max-[850px]:text-[28px] max-[850px]:font-bold max-[850px]:tracking-[-.02em] max-[850px]:opacity-100 ${
              activeSection === item.toLowerCase() ? 'text-white after:scale-x-100' : ''
            }`}
            style={{ ['--nav-delay' as string]: `${i * 55}ms`, animation: 'nav-drop .6s var(--nav-delay,0ms) cubic-bezier(.19,1,.22,1) forwards' }}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="relative z-10 flex items-center justify-end gap-2.5 max-[850px]:gap-1.5">
        <button className="hidden" aria-label="Search"><Search /></button>
        <button className="subscribe-button relative inline-flex min-w-42 items-center justify-center gap-2.75 overflow-hidden rounded-full border border-white/25 bg-white/8 px-5.5 py-3.5 font-sans text-[13px] font-extrabold tracking-[-.02em] text-white shadow-[0_4px_20px_rgba(0,0,0,.25),inset_0_1px_0_rgba(255,255,255,.15)] backdrop-blur-xl transition-colors duration-300 hover:border-white/45 hover:bg-white/15 max-[850px]:hidden">
          ENTER THE WORLD <ArrowRight className="relative z-10 w-3.5" />
        </button>
        <button
          type="button"
          className={`hidden h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/6 text-[#c7cbd1] shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl transition-[background-color,transform,border-color] duration-300 max-[850px]:grid ${
            menuOpen ? 'bg-[rgba(33,113,181,.22)] border-[rgba(33,113,181,.5)] rotate-90' : ''
          }`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
