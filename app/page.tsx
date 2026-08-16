'use client'

import { useEffect, useRef, useState } from 'react'
import { Particles, SiteFX } from '@/components/fx'
import {
  ArrowDownRight,
  ArrowRight,
  Bell,
  ChevronDown,
  Clock3,
  Flame,
  Gamepad2,
  Menu,
  Play,
  Search,
  Trophy,
  X,
  Zap,
} from 'lucide-react'

const stories = [
  { category: 'VALORANT', title: 'Sentinels survive a five-map thriller to lift the Red Bull Home Ground trophy', time: '18 min ago', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85' },
  { category: 'COUNTER-STRIKE', title: 'The new era of Counter-Strike is here. Seven teams are ready to define it.', time: '42 min ago', image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1000&q=85' },
  { category: 'EA FC', title: 'Inside the bootcamp: how a world champion prepares for the biggest stage', time: '1 hr ago', image: 'https://images.unsplash.com/photo-1606166325695-0f3e4b0f6f8f?auto=format&fit=crop&w=1000&q=85' },
]

const scores = [
  { league: 'VCT EMEA', status: 'FINAL', a: 'FNATIC', b: 'Team Heretics', score: '3 — 1', icon: 'F' },
  { league: 'LCK SUMMER', status: 'LIVE', a: 'Gen.G', b: 'T1', score: '1 — 0', icon: 'G' },
  { league: 'IEM COLOGNE', status: 'UP NEXT', a: 'Vitality', b: 'MOUZ', score: '18:30', icon: 'V' },
]

const services = [
  ['01', 'Strategy & Brand', 'Positioning, identity and campaigns built for the culture.'],
  ['02', 'Content & Creative', 'Films, social systems and stories that earn attention.'],
  ['03', 'Creators & Community', 'Talent, communities and formats with real momentum.'],
  ['04', 'Esports & Events', 'Tournament IPs and live experiences made to scale.'],
]
const work = [
  { client: 'EPIGROTIVE OPEN', title: 'A new arena for the next generation', result: '48M+ organic impressions', tone: 'work-red' },
  { client: 'CREATOR SHOWDOWN', title: 'Turning rivalry into a community ritual', result: '32K live peak viewers', tone: 'work-blue' },
  { client: 'ROSTER PROGRAM', title: 'Building a team people want to follow', result: '4.8x content completion', tone: 'work-pink' },
]

function Reveal({ children, className = '', variant = 'up', delay = 0, tilt = false }: { children: React.ReactNode; className?: string; variant?: 'up' | 'left' | 'right' | 'scale' | 'blur' | 'rotate'; delay?: number; tilt?: boolean }) {
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

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const duration = 1000
      function tick(now: number) {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setDisplay(Math.round(value * eased))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      observer.disconnect()
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])
  return <span ref={ref}>{display}</span>
}

function ScoreRow({ match, index }: { match: typeof scores[number]; index: number }) {
  return (
    <div className="score-row" style={{ animationDelay: `${index * 120}ms` }}>
      <div className="score-meta"><span>{match.league}</span><b className={match.status === 'LIVE' ? 'live' : ''}>{match.status}</b></div>
      <div className="teams"><span><i>{match.icon}</i>{match.a}</span><strong>{match.score}</strong><span>{match.b}<i className="alt">{match.b[0]}</i></span></div>
    </div>
  )
}

const NAV_ITEMS = ['NEWS', 'SERVICES', 'WORK', 'GAMING']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('LATEST')
  const [newsletter, setNewsletter] = useState('')
  const [joined, setJoined] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('news')
  const pageRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateScroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; pageRef.current?.style.setProperty('--scroll-progress', `${max ? window.scrollY / max : 0}`); setScrolled(window.scrollY > 40) }
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

  function handleHeroMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <main ref={pageRef} className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <SiteFX />
      <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
        <a href="#top" className="brand"><img src="/epigrotive-logo.png" alt="Epigrotive Gaming logo" /><span>EPIGROTIVE<span className="brand-sub">GAMING CULTURE</span></span></a>
        <nav className={menuOpen ? 'nav mobile-open' : 'nav'} aria-label="Main navigation">
          {NAV_ITEMS.map((item, i) => (
            <a
              href={`#${item.toLowerCase()}`}
              key={item}
              onClick={() => { setMenuOpen(false); setActiveSection(item.toLowerCase()) }}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
              style={{ ['--nav-delay' as string]: `${i * 55}ms` }}
            >
              <span>0{i + 1}</span>{item}
            </a>
          ))}
        </nav>
        <div className="header-actions"><button className="icon-button" aria-label="Search"><Search /></button><button className="subscribe-button">ENTER THE WORLD <ArrowRight /></button><button className={menuOpen ? 'mobile-menu open' : 'mobile-menu'} aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <section id="top" className="hero" ref={heroRef} onMouseMove={handleHeroMove}>
        <div className="hero-image" />
        <div className="hero-grid" />
        <div className="hero-scanlines" />
        <Particles className="hero-particles" />
        <div className="hero-spotlight" />
        <div className="hero-index">01 <span>/ 04</span></div>
        <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><div className="scroll-line" /></div>
      </section>

      <section className="scroll-intro"><Reveal variant="up"><span className="scroll-intro-number">01 / THE THESIS</span><h1 className="display-reveal"><span>Built for the</span><span><em>next generation.</em></span></h1><p>Epigrotive is a gaming company for people who care about what happens next. Scroll through the worlds, teams and ideas we are building.</p></Reveal></section>

      <section className="architecture-section section-wrap"><Reveal variant="left" className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> THE EPIGROTIVE MODEL</div><h2>One house.<br /><em>Two engines.</em></h2></div><p className="section-intro">One connected company for brands, creators and competitive gaming. Two specialist engines built to move at culture speed.</p></Reveal><div className="engine-grid"><Reveal variant="left" delay={80} tilt className="engine-card engine-media"><span className="engine-index">01 / EPIGRO MEDIA</span><h3>Make culture<br /><em>move.</em></h3><p>Brand worlds, content systems and creator programs designed for the audience, not around it.</p><a className="text-link" href="#services">Explore media <ArrowRight /></a></Reveal><Reveal variant="right" delay={220} tilt className="engine-card engine-gaming"><span className="engine-index">02 / EPIGROTIVE GAMING</span><h3>Build the<br /><em>arena.</em></h3><p>Esports IPs, tournaments and community ecosystems that give people a reason to show up.</p><a className="text-link" href="#gaming">Explore gaming <ArrowRight /></a></Reveal></div></section>

      <section id="services" className="services-section section-wrap"><Reveal variant="up" className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> WHAT WE DO</div><h2>Built to<br /><em>deliver.</em></h2></div><p className="section-intro">From the first strategic question to the final live moment, every discipline works in the same direction.</p></Reveal><div className="services-grid">{services.map(([number, title, description], i) => <Reveal variant={i % 2 ? 'right' : 'left'} delay={i * 100} className="service-row" key={title}><span className="service-number">{number}</span><h3>{title}</h3><p>{description}</p><ArrowDownRight className="service-arrow" /></Reveal>)}</div></section>

      <section id="work" className="work-section section-wrap"><Reveal variant="scale" className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> SELECTED WORK + IPS</div><h2>Proof in<br /><em>the wild.</em></h2></div><a className="text-link" href="#work">VIEW CASE STUDIES <ArrowRight /></a></Reveal><div className="work-grid">{work.map((item, i) => <Reveal variant={i === 1 ? 'up' : i === 0 ? 'left' : 'right'} delay={i * 140} tilt className={`work-card ${item.tone}`} key={item.client}><span className="work-client">{item.client}</span><div className="work-orbit" /><h3>{item.title}</h3><div className="work-result"><span>VERIFIED RESULT</span><strong>{item.result}</strong></div><ArrowUpRight className="work-arrow" /></Reveal>)}</div></section>

      <section id="news" className="news-section section-wrap">
        <Reveal className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> THE DAILY BRIEFING</div><h2>What&apos;s <em>happening.</em></h2></div><a href="#news" className="text-link">VIEW ALL NEWS <ArrowRight /></a></Reveal>
        <div className="tab-row">{['LATEST', 'TRENDING', 'OPINION'].map(tab => <button key={tab} className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => setActiveTab(tab)}>{tab}{tab === 'TRENDING' && <Flame />}</button>)}</div>
        <div className="story-grid">{stories.map((story, i) => <Reveal variant={i === 0 ? 'scale' : i === 1 ? 'left' : 'right'} delay={i * 140} className={`story-card card-${i + 1}`} key={story.title}><div className="story-image scroll-image"><img src={story.image} alt="Esports competition" /><span className="story-number">0{i + 1}</span><button className="story-play" aria-label="Play story"><Play fill="currentColor" /></button></div><div className="story-info scroll-text"><span className="story-category">{story.category}</span><h3>{story.title}</h3><span className="story-time"><Clock3 /> {story.time}</span></div></Reveal>)}</div>
      </section>

      <section id="video" className="film-section">
        <div className="film-backdrop" />
        <Reveal className="film-content"><div className="eyebrow"><span className="eyebrow-line" /> EPIGROTIVE FILMS</div><h2>Made for<br /><em>the moment.</em></h2><p>Every frame tells a story. Go behind the scenes with the people who make competitive gaming unforgettable.</p><a className="primary-button" href="#video">Explore films <ArrowRight /></a></Reveal>
        <Reveal variant="rotate" delay={180} className="film-card"><div className="film-card-image scroll-image"><img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1100&q=85" alt="Gaming setup glowing in a dark room" /><button className="big-play" aria-label="Play Northstar film"><Play fill="currentColor" /></button></div><div className="film-card-footer"><span>THE RISE OF THE UNDERDOG</span><span>FILM 04 <ArrowUpRight /></span></div></Reveal>
      </section>

      <section id="gaming" className="gaming-chapter"><div className="gaming-chapter-bg" /><Reveal variant="left" className="gaming-copy"><div className="eyebrow"><span className="eyebrow-line" /> EPIGROTIVE GAMING</div><h2>The next<br /><em>chapter.</em></h2><p>Competitive gaming is more than a match. It is a living world of teams, creators and fans. We build the IPs that bring all three together.</p><a className="primary-button" href="#contact">Start a conversation <ArrowRight /></a></Reveal><div className="gaming-pillars">{['Tournament IPs', 'Roster Programs', 'Creator Showdowns', 'Community Qualifiers'].map((item, i) => <Reveal variant="right" delay={i * 110} className="gaming-pillar" key={item}><span>0{i + 1}</span><strong>{item}</strong><ArrowUpRight /></Reveal>)}</div></section>

      <section className="proof-section section-wrap"><Reveal variant="up" className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> WHO WE WORK WITH</div><h2>Made with<br /><em>ambition.</em></h2></div><p className="section-intro">The best partnerships are built on shared appetite. We work with people ready to make the next important thing.</p></Reveal><div className="proof-rail"><div className="proof-rail-track">{[...Array(2)].flatMap(() => ['RED BULL', 'RIOT GAMES', 'EA SPORTS', 'LOGITECH', 'ADIDAS']).map((brand, i) => <span key={i}>{brand}</span>)}</div></div><div className="quote-grid"><Reveal variant="left" className="quote-card"><span className="quote-mark">“</span><blockquote>They understood the audience before we had the words for it.</blockquote><cite>— MARKETING DIRECTOR, GLOBAL PUBLISHER</cite></Reveal><Reveal variant="right" className="process-card"><span className="eyebrow">HOW WE WORK</span><div className="process-line">{['Discover', 'Build', 'Launch'].map((step, i) => <div key={step}><b>0{i + 1}</b><strong>{step}</strong></div>)}</div></Reveal></div></section>

      <section id="rankings" className="rankings section-wrap"><Reveal className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> WORLD RANKINGS</div><h2>The power <em>index.</em></h2></div><a href="#rankings" className="text-link">FULL RANKINGS <ArrowRight /></a></Reveal><div className="ranking-table"><div className="ranking-head"><span>RANK</span><span>TEAM</span><span>FORM</span><span>RATING</span></div>{['Gen.G','FNATIC','Team Vitality','T1'].map((team, i) => <div className="ranking-row" key={team}><strong>0{i + 1}</strong><span className="team-name"><i>{team[0]}</i>{team}</span><span className="form">{[1, 1, 0, 1, 1].map((x, j) => <b className={x ? 'win' : 'loss'} key={j}>{x ? 'W' : 'L'}</b>)}</span><strong className="rating"><Counter value={968 - i * 21} /></strong><ChevronDown className="rank-arrow" /></div>)}</div></section>

      <section id="features" className="newsletter"><div className="newsletter-grid" /><Reveal><div className="eyebrow"><span className="eyebrow-line" /> NEVER MISS A MOMENT</div><h2>Stay in the<br /><em>know.</em></h2><p>Weekly signal from the world of competitive gaming. No noise, just what matters.</p>{joined ? <div className="success-message"><Zap /> You&apos;re on the list. Welcome to Northstar.</div> : <form className="signup-form" onSubmit={(e) => { e.preventDefault(); if (newsletter.includes('@')) setJoined(true) }}><input type="email" required placeholder="Your email address" value={newsletter} onChange={(e) => setNewsletter(e.target.value)} /><button aria-label="Subscribe"><ArrowRight /></button></form>}<span className="form-note">By subscribing, you agree to our terms and privacy policy.</span></Reveal></section>

      <footer className="footer"><div className="footer-main"><a href="#top" className="brand"><img src="/epigrotive-logo.png" alt="Epigrotive Gaming logo" /><span>EPIGROTIVE<span className="brand-sub">GAMING</span></span></a><p>The home of competitive gaming.<br />Built for the next generation.</p><div className="socials"><a href="#top">X</a><a href="#top">IG</a><a href="#top">YT</a><a href="#top">IN</a></div></div><div className="footer-links"><div><span>EXPLORE</span><a href="#news">Newsroom</a><a href="#scores">Live scores</a><a href="#video">Films</a></div><div><span>COMPANY</span><a href="#top">About Northstar</a><a href="#top">Careers</a><a href="#top">Contact</a></div><div><span>LEGAL</span><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Cookies</a></div></div><div className="footer-bottom"><span>© 2026 EPIGROTIVE MEDIA. ALL RIGHTS RESERVED.</span><span>BUILT FOR THE PLAYERS <Gamepad2 /></span></div></footer>
    </main>
  )
}

function ArrowUpRight({ className = '' }: { className?: string }) { return <ArrowRight className={`arrow-up-right ${className}`} /> }
