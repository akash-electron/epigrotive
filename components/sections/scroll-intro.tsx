import { useRef } from 'react'
import { Reveal } from '@/components/shared/reveal'
import { useScrollIntroScroll } from '@/components/animations/use-scroll-intro-scroll'

export function ScrollIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollIntroScroll(sectionRef)

  return (
    <section ref={sectionRef} className="scroll-intro relative z-2 flex min-h-svh items-center border-b border-line bg-[#0a1121] px-[8vw] pb-30 pt-35 max-[850px]:px-[8vw] max-[850px]:pb-22.5 max-[850px]:pt-30">
      <Reveal variant="up" className="max-w-275">
        <span className="folio mb-1 inline-block font-display text-[13px] italic text-[#6b7784]">Epigrotive, field notes —</span>
        <h1 className="display-reveal ml-[-0.02em] mt-2.5 font-display text-[clamp(52px,8.4vw,128px)] font-bold leading-[.86] tracking-[-.01em]">
          <span>Built for the</span>
          <span><em className="font-normal text-accent-blue">next generation.</em></span>
        </h1>
        <p className="ml-auto mt-8.5 max-w-95 border-t border-line pt-5.5 text-sm leading-[1.8] text-[#9aa8ba] max-[850px]:mt-7">
          We started Epigrotive because most gaming media reads like a press release. This is the version we&apos;d actually want to read — scroll through what we&apos;re building.
        </p>
      </Reveal>
    </section>
  )
}
