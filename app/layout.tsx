import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Souleymane Diallo — AI Engineer & Data Scientist',
  description: 'Portfolio Souleymane Diallo — Élève Ingénieur IA & Data Science. Projets ML, NLP, FastAPI. Disponible 2026.',
  keywords: ['AI Engineer', 'Data Science', 'Machine Learning', 'FastAPI', 'PyTorch', 'Next.js'],
  openGraph: {
    title: 'Souleymane Diallo — AI Engineer & Data Scientist',
    description: 'Portfolio IA & Data Science — Disponible stage & alternance 2026',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
