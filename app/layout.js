import { Fraunces, Inter, Amiri } from 'next/font/google'
import './globals.css'

const display = Fraunces({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const arabic = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-arabic', display: 'swap' })

export const metadata = {
  title: 'Sakina · Neuro Reset Console',
  description: 'A calming routine of breath, gentle frequency and Quran, matched to what you need right now.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdf1e6' },
    { media: '(prefers-color-scheme: dark)', color: '#160b1d' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <body>{children}</body>
    </html>
  )
}
