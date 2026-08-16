'use client'

import { useRef } from 'react'
import { Gamepad2 } from 'lucide-react'
import { useFooterScroll } from '@/components/animations/use-footer-scroll'
import { InstagramIcon, TwitchIcon, XIcon, YoutubeIcon } from '@/components/shared/social-icons'

const SOCIALS = [['X', XIcon], ['IG', InstagramIcon], ['YT', YoutubeIcon], ['TW', TwitchIcon]] as const

const EXPLORE = [['Newsroom', '#news'], ['Live scores', '#scores'], ['Films', '#video']]
const COMPANY = [['About Northstar', '#top'], ['Careers', '#top'], ['Contact', '#top']]
const LEGAL = [['Privacy', '#top'], ['Terms', '#top'], ['Cookies', '#top']]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  useFooterScroll(footerRef)

  return (
    <footer ref={footerRef} className="bg-background px-[4vw] pb-6 pt-17.5">
      <div className="flex items-start justify-between pb-17.5 max-[850px]:flex-wrap max-[850px]:gap-7">
        <a href="#top" className="flex items-center gap-3 font-display text-lg font-bold uppercase tracking-[.02em] transition-transform duration-350 ease-out hover:-translate-y-px">
          <img src="/epigrotive-logo.png" alt="Epigrotive Gaming logo" className="h-[42px] w-[42px] rounded-xl border border-white/16 object-cover transition-[box-shadow,transform] duration-400 hover:-rotate-4 hover:shadow-[0_0_0_4px_rgba(37,136,255,.18),0_6px_18px_rgba(37,136,255,.3)]" />
          <span className="text-[#f5f6f7]">EPIGROTIVE<span className="mt-0.75 block font-mono text-[8px] font-bold tracking-[.24em] text-accent-blue">GAMING</span></span>
        </a>
        <p className="mx-auto ml-[10vw] text-xs leading-[1.7] text-[#74808b] max-[850px]:order-3 max-[850px]:mx-0 max-[850px]:basis-full">The home of competitive gaming.<br />Built for the next generation.</p>
        <div className="flex gap-2.25">
          {SOCIALS.map(([label, Icon]) => (
            <a key={label} href="#top" aria-label={label} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/6 text-[#c7cbd1] shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-lg transition-colors duration-300 hover:border-white/30 hover:bg-white/12 hover:text-white">
              <Icon className="w-3.5" />
            </a>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-[8vw] pb-17.5 max-[850px]:justify-between max-[850px]:gap-3.75 max-[850px]:pb-13.75">
        {[['EXPLORE', EXPLORE], ['COMPANY', COMPANY], ['LEGAL', LEGAL]].map(([label, links]) => (
          <div key={label as string} className="footer-col flex min-w-22.5 flex-col gap-3">
            <span className="mb-1.75 font-mono text-[9px] tracking-widest text-[#717c87]">{label as string}</span>
            {(links as string[][]).map(([text, href]) => (
              <a key={text} href={href} className="text-xs text-[#c7ccd1]">{text}</a>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t border-line pt-4.5 font-mono text-[9px] tracking-[.08em] text-[#626d78] max-[850px]:flex-col max-[850px]:gap-3">
        <span>© 2026 EPIGROTIVE MEDIA. ALL RIGHTS RESERVED.</span>
        <span className="flex items-center gap-1.75">BUILT FOR THE PLAYERS <Gamepad2 className="w-3.5 text-primary" /></span>
      </div>
    </footer>
  )
}
