'use client'
import { PageId } from '@/app/page'

const links: { id: PageId; label: string }[] = [
  { id:'home', label:'Accueil' },
  { id:'services', label:'Services' },
  { id:'competences', label:'Compétences' },
  { id:'realisations', label:'Réalisations' },
  { id:'contact', label:'Contact' },
]

export default function Nav({ currentPage, goPage }: { currentPage: PageId; goPage: (id: PageId) => void }) {
  return (
    <nav className="nav">
      <a className="nav-logo" onClick={() => goPage('home')} style={{cursor:'pointer',color:'#F0F5F0'}}>\<em style={{fontStyle:'normal',color:'var(--c1)'}}>Kaizen</em>/</a>
      <div className="nav-links">
        {links.map(l => (
          <button key={l.id} className={`nav-link${currentPage===l.id?' active':''}`} onClick={() => goPage(l.id)}>
            {l.label}
          </button>
        ))}
      </div>
      <button className="nav-cta" onClick={() => goPage('contact')}>Engagez-moi</button>
    </nav>
  )
}
