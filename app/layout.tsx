import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Rajdhani, Chakra_Petch, Share_Tech_Mono } from 'next/font/google'
import './globals.css'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-head',
  display: 'swap',
})

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-hud',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Epigrotive — Gaming Culture, Competitive Play, Original IP',
  description: 'Epigrotive builds the worlds, teams and experiences shaping the next generation of gaming.',
  generator: 'Epigrotive',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${rajdhani.variable} ${chakraPetch.variable} ${shareTechMono.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
