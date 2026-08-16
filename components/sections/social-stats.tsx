import { ArrowUpRight } from '@/components/shared/arrow-up-right'
import { InstagramIcon, TwitchIcon, XIcon, YoutubeIcon } from '@/components/shared/social-icons'

const STATS = [
  { platform: 'Instagram', value: '2.4M', label: 'Followers', icon: InstagramIcon, href: 'https://instagram.com/epigrotive' },
  { platform: 'YouTube', value: '18M', label: 'Monthly views', icon: YoutubeIcon, href: 'https://youtube.com/@epigrotive' },
  { platform: 'X', value: '540K', label: 'Followers', icon: XIcon, href: 'https://x.com/epigrotive' },
  { platform: 'Twitch', value: '92K', label: 'Avg. live viewers', icon: TwitchIcon, href: 'https://twitch.tv/epigrotive' },
]

export function SocialStats() {
  return (
    <section className="stats-panel relative isolate z-2 overflow-hidden px-[4vw] py-20 max-[850px]:px-[8vw] max-[850px]:py-14">
      <div className="mx-auto max-w-312.5">
        <div className="grid grid-cols-4 gap-4 max-[850px]:grid-cols-2 max-[600px]:grid-cols-1">
          {STATS.map((s) => (
            <div key={s.platform} className="stat-card rounded-2xl">
              <div className="stat-card-glass relative overflow-hidden rounded-2xl border border-white/15 bg-white/6 p-6.5 shadow-[0_8px_30px_rgba(0,0,0,.35)] backdrop-blur-lg">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Epigrotive on ${s.platform}`}
                  className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/8 text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,.15)] transition-colors duration-300 hover:border-white/30 hover:bg-white/16 hover:text-white"
                >
                  <ArrowUpRight className="w-3.5" />
                </a>
                <div className="flex items-center gap-2.75">
                  <i className="grid h-7.5 w-7.5 flex-none place-items-center rounded-full border border-white/15 bg-white/8 not-italic">
                    <s.icon className="w-3.5 text-primary" />
                  </i>
                  <span className="font-mono text-[10px] font-bold tracking-widest text-white/55">{s.platform.toUpperCase()}</span>
                </div>
                <div className="mt-6 font-display text-[2.6rem] font-bold leading-none text-white tabular-nums max-[850px]:text-4xl">{s.value}</div>
                <div className="mt-2.5 text-sm text-white/55">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
