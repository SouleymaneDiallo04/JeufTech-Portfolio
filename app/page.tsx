'use client'
import { useState, useEffect, useCallback } from 'react'
import Splash from '@/components/Splash'
import Nav from '@/components/Nav'
import PageHome from '@/components/pages/PageHome'
import PageServices from '@/components/pages/PageServices'
import PageCompetences from '@/components/pages/PageCompetences'
import PageRealisations from '@/components/pages/PageRealisations'
import PageContact from '@/components/pages/PageContact'
import Footer from '@/components/Footer'

export type PageId = 'home'|'services'|'competences'|'realisations'|'contact'

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentPage, setCurrentPage] = useState<PageId>('home')
  useEffect(() => { const t = setTimeout(() => setShowSplash(false), 2200); return () => clearTimeout(t) }, [])
  const goPage = useCallback((id: PageId) => {
    setCurrentPage(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <>
      {showSplash && <Splash />}
      <Nav currentPage={currentPage} goPage={goPage} />
      <main>
        <div style={{display: currentPage==='home' ? 'block':'none'}}><PageHome goPage={goPage} /></div>
        <div style={{display: currentPage==='services' ? 'block':'none'}}><PageServices goPage={goPage} /></div>
        <div style={{display: currentPage==='competences' ? 'block':'none'}}><PageCompetences goPage={goPage} /></div>        <div style={{display: currentPage==='realisations' ? 'block':'none'}}><PageRealisations goPage={goPage} /></div>
        <div style={{display: currentPage==='contact' ? 'block':'none'}}><PageContact goPage={goPage} /></div>
      </main>
      <Footer goPage={goPage} />
    </>
  )
}
