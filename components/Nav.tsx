'use client'
import { useState } from 'react'
import { PageId } from '@/app/page'

const links: { id: PageId; label: string }[] = [
  { id: 'home',         label: 'Accueil' },
  { id: 'services',     label: 'Services' },
  { id: 'competences',  label: 'Compétences' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'contact',      label: 'Contact' },
]

export default function Nav({ currentPage, goPage }: { currentPage: PageId; goPage: (id: PageId) => void }) {
  const [open, setOpen] = useState(false)

  const navigate = (id: PageId) => {
    goPage(id)
    setOpen(false)
  }

  return (
    <>
      <nav className="nav">
        <a className="nav-logo" onClick={() => navigate('home')} style={{ cursor: 'pointer', color: '#F0F5F0' }}>
          \<em style={{ fontStyle: 'normal', color: 'var(--c1)' }}>Kaizen</em>/
        </a>

        {/* Liens desktop */}
        <div className="nav-links">
          {links.map(l => (
            <button key={l.id} className={`nav-link${currentPage === l.id ? ' active' : ''}`} onClick={() => navigate(l.id)}>
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="nav-cta nav-cta-desktop" onClick={() => navigate('contact')}>Engagez-moi</button>

          {/* Bouton hamburger — visible uniquement sur mobile */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            <span className={`ham-line${open ? ' open' : ''}`} style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span className={`ham-line${open ? ' open' : ''}`} style={{ opacity: open ? 0 : 1 }} />
            <span className={`ham-line${open ? ' open' : ''}`} style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Menu mobile overlay */}
      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
            {links.map(l => (
              <button
                key={l.id}
                className={`mobile-nav-link${currentPage === l.id ? ' active' : ''}`}
                onClick={() => navigate(l.id)}
              >
                {l.label}
              </button>
            ))}
            <button className="mobile-nav-cta" onClick={() => navigate('contact')}>
              Engagez-moi →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
