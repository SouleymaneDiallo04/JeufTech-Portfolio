'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { PageId } from '@/app/page'
import { projets } from '@/lib/data'
import { useIsMobile } from '@/lib/hooks'

type Cat = 'all' | 'ia-web' | 'ia-mobile' | 'fullstack' | 'mobile' | 'ia-desktop'
type Layout = 'grid' | 'carousel'

const filters: { id: Cat; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'ia-web', label: 'IA & Web' },
  { id: 'ia-mobile', label: 'IA & Mobile' },
  { id: 'ia-desktop', label: 'IA & Desktop' },
]

const catLabel = (c: string) =>
  c === 'ia-web' ? 'IA & Web'
  : c === 'ia-mobile' ? 'IA & Mobile'
  : c === 'fullstack' ? 'Full Stack Web'
  : c === 'ia-desktop' ? 'IA & Desktop'
  : ''


const TECH_COLORS = [
  'var(--c1)', '#00C2FF', '#FFB800', '#22c55e', '#a78bfa',
  '#f472b6', '#38bdf8', '#fb923c', '#4ade80',
]

const CARD_GAP = 16

function parseTechs(techStr: string) {
  return techStr.split('·').map((t, i) => ({
    name: t.trim(),
    color: TECH_COLORS[i % TECH_COLORS.length],
  }))
}

function parseFeatures(stackStr: string) {
  return stackStr.split('·').map(s => s.trim()).filter(Boolean)
}

const IconClock = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const IconUsers = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const IconGrid = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="8" height="8" rx="1.5"/>
    <rect x="13" y="3" width="8" height="8" rx="1.5"/>
    <rect x="3" y="13" width="8" height="8" rx="1.5"/>
    <rect x="13" y="13" width="8" height="8" rx="1.5"/>
  </svg>
)

const IconCarousel = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 5l-5 7 5 7"/>
    <path d="M16 5l5 7-5 7"/>
    <line x1="12" y1="3" x2="12" y2="21"/>
  </svg>
)

export default function PageRealisations({ goPage }: { goPage: (id: PageId) => void }) {
  const isMobile = useIsMobile()
  const [cat, setCat] = useState<Cat>('all')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [layout, setLayout] = useState<Layout>('grid')

  const carouselRef = useRef<HTMLDivElement>(null)
  const selectedIdxRef = useRef(selectedIdx)
  const [cardPx, setCardPx] = useState(0)
  const [trackOffset, setTrackOffset] = useState(0)

  const filteredProjects = projets.filter(p => cat === 'all' || p.cat === cat)
  const selected = filteredProjects[selectedIdx] || filteredProjects[0] || projets[0]

  useEffect(() => { setSelectedIdx(0) }, [cat])

  useEffect(() => { selectedIdxRef.current = selectedIdx }, [selectedIdx])

  const recalc = useCallback(() => {
    if (!carouselRef.current) return
    const W = carouselRef.current.offsetWidth
    const cw = Math.round(W * 0.48)
    setCardPx(cw)
    setTrackOffset((W - cw) / 2 - selectedIdxRef.current * (cw + CARD_GAP))
  }, [])

  useEffect(() => {
    if (layout !== 'carousel') return
    const W = carouselRef.current?.offsetWidth ?? 0
    const cw = Math.round(W * 0.48)
    setTrackOffset((W - cw) / 2 - selectedIdx * (cw + CARD_GAP))
  }, [selectedIdx, layout])

  useEffect(() => {
    if (layout !== 'carousel') return
    const id = setTimeout(recalc, 30)
    return () => clearTimeout(id)
  }, [layout, recalc])

  useEffect(() => {
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [recalc])

  // Auto-play : avance toutes les 4 secondes
  useEffect(() => {
    if (layout !== 'carousel') return
    const timer = setInterval(() => {
      setSelectedIdx(prev => (prev + 1) % filteredProjects.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [layout, filteredProjects.length])

  const selectedTechs = parseTechs(selected.tech)
  const selectedFeatures = parseFeatures(selected.stack)

  return (
    <>
      {/* ── HERO ── */}
      <div className="page-hero">
        <div className="sec-badge" style={{ margin: '0 auto 18px' }}>
          <span className="sec-badge-dot" />Mes Réalisations
        </div>
        <div className="sec-title" style={{ textAlign: 'center' }}>
          Projets & <em>Innovations</em>
        </div>
        <p className="sec-desc">
          Découvrez une sélection de mes projets les plus significatifs, alliant innovation technique et créativité pour des solutions concrètes.
        </p>
        <div className="sec-line" />
      </div>

      <div className="section" style={{ paddingBottom: 0 }}>

        {/* ── FILTRES + TOGGLE ── */}
        <div className="filters-bar">
          <div className="work-filters">
            {filters.map(f => (
              <button
                key={f.id}
                className={`wf-btn${cat === f.id ? ' active' : ''}`}
                onClick={() => setCat(f.id)}
                data-cat={f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="layout-toggle">
            <button
              className={`lt-btn${layout === 'grid' ? ' active' : ''}`}
              onClick={() => setLayout('grid')}
              title="Grille verticale"
            >
              <IconGrid />
            </button>
            <button
              className={`lt-btn${layout === 'carousel' ? ' active' : ''}`}
              onClick={() => setLayout('carousel')}
              title="Carrousel horizontal"
            >
              <IconCarousel />
            </button>
          </div>
        </div>

        {/* ── MAIN LAYOUT : 2 colonnes ── */}
        <div className="work-main-layout">

          {/* ══ COLONNE GAUCHE ══ */}
          <div style={{ minWidth: 0 }}>

            {layout === 'grid' ? (
              /* ── MODE GRILLE ── */
              <div className="proj-cards-grid">
                {filteredProjects.map((p, idx) => {
                  const isSelected = selectedIdx === idx
                  const techs = parseTechs(p.tech)
                  return (
                    <div
                      key={p.num}
                      className={`proj-card${isSelected ? ' proj-card--active' : ''}`}
                      onClick={() => setSelectedIdx(idx)}
                    >
                      <div className="proj-card-thumb" style={(p as any).imgBg ? { background: (p as any).imgBg } : undefined}>
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="proj-card-img"
                            style={{ objectFit: (p as any).imgFit ?? 'cover', objectPosition: (p as any).imgPos ?? 'center' }}
                          />
                        ) : (
                          <span style={{ fontSize: 30, zIndex: 1 }}>{p.icon}</span>
                        )}
                      </div>
                      <div className="proj-card-body">
                        <div className="proj-card-num">{p.num}</div>
                        <div className="proj-card-title">{p.title}</div>
                        <div className="proj-card-desc">{p.desc.slice(0, 100)}…</div>
                        <div className="proj-card-footer">
                          <span className="proj-card-cat">{catLabel(p.cat)}</span>
                          <div className="proj-card-dots">
                            {techs.slice(0, 3).map((t, i) => (
                              <span key={i} style={{ background: t.color }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* ── MODE CARROUSEL ── */
              <div ref={carouselRef} className="carousel-outer">
                <div
                  className="carousel-track"
                  style={{ transform: `translateX(${trackOffset}px)` }}
                >
                  {filteredProjects.map((p, idx) => {
                    const isActive = selectedIdx === idx
                    const techs = parseTechs(p.tech)
                    const offset = idx - selectedIdx
                    const scale = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.88 : 0.75
                    const opacity = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.55 : 0.25
                    return (
                      <div
                        key={p.num}
                        className={`carousel-slide${isActive ? ' active' : ''}`}
                        style={{
                          ...(cardPx ? { width: cardPx } : { minWidth: 220 }),
                          transform: `scale(${scale})`,
                          opacity,
                        }}
                        onClick={() => setSelectedIdx(idx)}
                      >
                        <div
                          className="proj-card-thumb"
                          style={{ ...((p as any).imgBg ? { background: (p as any).imgBg } : {}), height: 190, position: 'relative' }}
                        >
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              className="proj-card-img"
                              style={{ objectFit: (p as any).imgFit ?? 'cover', objectPosition: (p as any).imgPos ?? 'center' }}
                            />
                          ) : (
                            <span style={{ fontSize: 30, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{p.icon}</span>
                          )}
                        </div>
                        <div className="proj-card-body">
                          <div className="proj-card-num">{p.num}</div>
                          <div className="proj-card-title">{p.title}</div>
                          <div className="proj-card-desc">{p.desc.slice(0, 90)}…</div>
                          <div className="proj-card-footer">
                            <span className="proj-card-cat">{catLabel(p.cat)}</span>
                            <div className="proj-card-dots">
                              {techs.slice(0, 3).map((t, i) => (
                                <span key={i} style={{ background: t.color }} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ══ COLONNE DROITE : panneau détail sticky ══ */}
          <div className="proj-detail-panel">
            <div className="pdp-header">
              <div className="pdp-num">{selected.num}</div>
              <div className="pdp-actions">
                <a href={selected.demo} target="_blank" rel="noreferrer" className="pdp-action-btn" title="Voir la démo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
                <a href={selected.github} target="_blank" rel="noreferrer" className="pdp-action-btn" title="Voir sur GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="pdp-body">
              <h3 className="pdp-title">{selected.title}</h3>
              <div className="pdp-meta">
                <span className="pd-badge">{catLabel(selected.cat)}</span>
                <span className="pd-badge b2" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <IconClock /> {selected.dur}
                </span>
                <span className="pd-badge b2" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <IconUsers /> {selected.type}
                </span>
              </div>
              <p className="pdp-desc">{selected.desc}</p>
              <div className="pdp-section">
                <div className="pdp-section-label">Fonctionnalités clés</div>
                <div className="pdp-features">
                  {selectedFeatures.map((f, i) => (
                    <div key={i} className="pdp-feature-item">
                      <span className="pdp-feature-dot" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pdp-section">
                <div className="pdp-section-label">Technologies utilisées</div>
                <div className="pdp-techs">
                  {selectedTechs.map((t, i) => (
                    <span key={i} className="pdp-tech-badge">{t.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── STATS ── */}
        <div className="stats-row" style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', maxWidth: 1200, margin: `${isMobile ? 40 : 120}px auto 0` }}>
          <div className="stat-item"><div className="stat-n">11</div><div className="stat-l">Projets réalisés</div></div>
          <div className="stat-item"><div className="stat-n">32</div><div className="stat-l">Technologies</div></div>
          <div className="stat-item"><div className="stat-n">10</div><div className="stat-l">Projets livrés</div></div>
          <div className="stat-item"><div className="stat-n">34</div><div className="stat-l">Mois d'expérience</div></div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ padding: isMobile ? '20px 16px 40px' : '25px 44px 56px' }}>
        <div className="svc-cta">
          <h3>Prêt à démarrer votre projet ?</h3>
          <p>Discutons de vos besoins et trouvons ensemble la solution technologique adaptée à vos objectifs.</p>
          <div className="svc-cta-btns">
            <button className="btn-pri" onClick={() => goPage('contact')}>Demander un devis</button>
            <button className="btn-sec" onClick={() => goPage('services')}>Voir mes réalisations →</button>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Barre filtres + toggle ── */
        .filters-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto 28px;
          padding: 0 40px 0 32px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .work-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* ── Toggle icônes ── */
        .layout-toggle {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }
        .lt-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid var(--borderx);
          background: var(--card2, rgba(255,255,255,.06));
          color: var(--muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color .2s, border-color .2s, background .2s;
        }
        .lt-btn.active {
          color: var(--c1);
          border-color: var(--c1);
          background: rgba(139,69,19,.12);
        }
        .lt-btn:hover:not(.active) {
          color: var(--c1);
          border-color: rgba(139,69,19,.4);
        }

        /* ── Layout principal 2 colonnes ── */
        .work-main-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (min-width: 1280px) {
          .work-main-layout {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* ── Grille des cartes ── */
        .proj-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding-left: 32px;
          padding-right: 8px;
        }
        @media (max-width: 767px) {
          .proj-cards-grid {
            grid-template-columns: 1fr;
            padding-left: 16px;
            padding-right: 16px;
          }
        }

        /* ── Carrousel ── */
        .carousel-outer {
          overflow: hidden;
          position: relative;
          width: 100%;
          padding: 28px 0 28px;
          padding-left: 32px;
        }
        .carousel-track {
          display: flex;
          gap: ${CARD_GAP}px;
          transition: transform 0.52s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .carousel-slide {
          flex-shrink: 0;
          background: var(--card);
          border: 1.5px solid var(--borderx);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: opacity .45s ease, transform .45s ease, border-color .3s, box-shadow .3s;
          transform-origin: center center;
        }
        .carousel-slide.active {
          border-color: var(--c1);
          box-shadow: 0 0 0 1px var(--c1), 0 12px 32px rgba(139,69,19,.22);
        }

        /* ── Carte réduite (partagée grille + carrousel) ── */
        .proj-card {
          background: var(--card);
          border: 1.5px solid var(--borderx);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color .2s, box-shadow .2s, transform .2s;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .proj-card:hover {
          border-color: rgba(139,69,19,.3);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139,69,19,.1);
        }
        .proj-card--active {
          border-color: var(--c1) !important;
          box-shadow: 0 0 0 1px var(--c1), 0 8px 24px rgba(139,69,19,.18) !important;
        }

        .proj-card-thumb {
          height: 250px;
          position: relative;
          overflow: hidden;
          background: var(--card2, rgba(255,255,255,.04));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .proj-card-img {
          transition: transform .35s ease;
        }
        .proj-card:hover .proj-card-img,
        .carousel-slide:hover .proj-card-img {
          transform: scale(1.06);
        }

        .proj-card-body {
          padding: 12px 14px 14px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .proj-card-num {
          font-family: var(--ff, inherit);
          font-size: 22px;
          font-weight: 800;
          color: rgba(139,69,19,.35);
          line-height: 1;
          margin-bottom: 2px;
        }
        .proj-card--active .proj-card-num,
        .carousel-slide.active .proj-card-num {
          color: rgba(139,69,19,.55);
        }
        .proj-card-title {
          font-family: var(--ff, inherit);
          font-size: 12px;
          font-weight: 700;
          line-height: 1.4;
          margin-bottom: 5px;
          color: var(--text);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .proj-card-desc {
          font-size: 11px;
          color: var(--muted2);
          line-height: 1.6;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .proj-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .proj-card-cat {
          font-size: 10px;
          font-weight: 600;
          color: var(--c1);
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .proj-card-dots {
          display: flex;
          gap: 4px;
        }
        .proj-card-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
        }

        /* ── Panneau détail sticky ── */
        .proj-detail-panel {
          position: sticky;
          top: 80px;
          background: var(--card);
          border: 1px solid var(--borderx);
          border-radius: 16px;
          overflow: hidden;
          scrollbar-width: thin;
          scrollbar-color: var(--c1) var(--borderx);
          margin-right: 32px;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 1279px) {
          .proj-detail-panel { margin-right: 0; min-height: 600px; }
        }

        .pdp-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 16px 20px 0;
        }
        .pdp-num {
          font-family: var(--ff, inherit);
          font-size: 80px;
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(180deg, rgba(139,69,19,.12) 0%, transparent 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -2px;
          user-select: none;
        }
        .pdp-actions {
          display: flex;
          gap: 10px;
          padding-top: 18px;
        }
        .pdp-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid var(--borderx);
          background: var(--card2, rgba(255,255,255,.06));
          color: var(--text);
          text-decoration: none;
          transition: color .2s, border-color .2s, background .2s;
        }
        .pdp-action-btn:hover {
          color: var(--c1);
          border-color: var(--c1);
          background: rgba(139,69,19,.1);
        }
        .pdp-body {
          padding: 12px 20px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .pdp-title {
          font-family: var(--ff, inherit);
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -.3px;
          line-height: 1.3;
          color: var(--text);
          margin: 0 0 12px;
        }
        .pdp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 14px;
        }
        .pdp-desc {
          font-size: 13px;
          color: var(--muted2);
          line-height: 1.8;
          margin: 0 0 14px;
        }
        .pdp-section { margin-bottom: 14px; }
        .pdp-section-label {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .6px;
          color: var(--muted);
          font-weight: 800;
          margin-bottom: 8px;
        }
        .pdp-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px 12px;
        }
        @media (max-width: 500px) {
          .pdp-features { grid-template-columns: 1fr; }
        }
        .pdp-feature-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: var(--text);
          line-height: 1.4;
        }
        .pdp-feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--c1);
          flex-shrink: 0;
        }
        .pdp-techs {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: 8px;
          justify-content: flex-start;
          align-items: center;
          margin-top: 8px;
        }
        @media (max-width: 640px) {
          .pdp-techs { grid-template-columns: repeat(2, auto); }
        }
        .pdp-tech-badge {
          display: inline-flex;
          align-items: center;
          background: var(--card2, rgba(255,255,255,.04));
          border: 1px solid var(--borderx);
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 600;
          color: var(--text);
          white-space: nowrap;
          transition: background 0.2s;
        }
        .pdp-tech-badge:hover {
          background: rgba(255,255,255,.08);
          border-color: rgba(139,69,19,.3);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(.8); }
        }
      `}</style>
    </>
  )
}
