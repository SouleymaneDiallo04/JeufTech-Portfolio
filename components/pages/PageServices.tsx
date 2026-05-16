'use client'
import { useState } from 'react'
import { PageId } from '@/app/page'
import { services } from '@/lib/data'
import { useIsMobile } from '@/lib/hooks'

// Couleurs exactes du HTML (vert de SouleCode = rgba(0,230,118,...))
const TECH_COLORS = [
  { bg:'rgba(0,230,118,.06)', border:'rgba(0,230,118,.2)', color:'#00C853' },
  { bg:'rgba(0,194,255,.06)', border:'rgba(0,194,255,.2)', color:'#00B0CC' },
  { bg:'rgba(255,184,0,.06)', border:'rgba(255,184,0,.2)', color:'#C4873A' },
  { bg:'rgba(123,47,255,.06)', border:'rgba(123,47,255,.2)', color:'#7B2FFF' },
  { bg:'rgba(255,77,77,.06)', border:'rgba(255,77,77,.2)', color:'#CC3333' },
]

function SvcCard({ svc }: { svc: typeof services[0] }) {
  const [open, setOpen] = useState(false)
  const PREVIEW = 3
  const previewTechs = svc.techs.slice(0, PREVIEW)
  const extraCount = svc.techs.length - PREVIEW

  return (
    <div style={{
      background:'var(--card)', border:'1px solid var(--borderx)',
      borderRadius:14, padding:'22px 24px', transition:'.2s',
      borderColor: open ? 'var(--border2)' : 'var(--borderx)',
    }}>
      {/* HEADER: icône + numéro + flèche */}
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:16}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          {/* Icône */}
          <div style={{
  width:44, height:44, borderRadius:10,
  background:'rgba(139,69,19,.08)', border:'1px solid rgba(139,69,19,.18)',
  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
  color:'var(--c1)',
}}>
  <svc.ico />
</div>          {/* Numéro à droite de l'icône, grande taille */}
          <div style={{
            fontFamily:'var(--ff)', fontSize:38, fontWeight:800,
            color:'rgba(0,230,118,.25)', lineHeight:1,
          }}>{svc.num}</div>
        </div>
        {/* Flèche cliquable qui toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            width:34, height:34, borderRadius:8,
            border:`1px solid ${open ? 'var(--c1)' : 'var(--borderx)'}`,
            background: open ? 'rgba(139,69,19,.1)' : 'transparent',
            color: open ? 'var(--c1)' : 'var(--muted)',
            cursor:'pointer', fontSize:15,
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'.2s',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            flexShrink:0,
          }}
        >↗</button>
      </div>

      {/* TITRE */}
      <div style={{fontFamily:'var(--ff)', fontSize:16, fontWeight:800, marginBottom:9, lineHeight:1.3}}>{svc.title}</div>

      {/* DESCRIPTION courte */}
      <div style={{fontSize:12, color:'var(--muted2)', lineHeight:1.75, marginBottom:14}}>{svc.short}</div>

      {/* TECHNOS version réduite — couleurs vert SouleCode */}
      {!open && (
        <div style={{display:'flex', gap:6, flexWrap:'wrap', marginBottom:12}}>
          {previewTechs.map((t, i) => {
            const c = TECH_COLORS[i % TECH_COLORS.length]
            return (
              <span key={t} style={{
                fontSize:12, fontWeight:600, padding:'4px 12px', borderRadius:5,
                background:c.bg, border:`1px solid ${c.border}`, color:c.color,
              }}>{t}</span>
            )
          })}
          {extraCount > 0 && (
            <span style={{
              fontSize:12, padding:'4px 12px', borderRadius:5,
              background:'rgba(139,69,19,.04)', border:'1px solid var(--borderx)',
              color:'var(--muted2)',
            }}>+{extraCount} autres</span>
          )}
        </div>
      )}

      {/* BOUTON EN SAVOIR PLUS / VOIR MOINS */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display:'flex', alignItems:'center', gap:5,
          fontSize:12, color:'var(--c1)', cursor:'pointer',
          background:'transparent', border:'none', padding:'10px 0 0',
          fontFamily:'var(--fb)', fontWeight:600,
          borderTop:'1px solid var(--border)', width:'100%', marginTop:4,
        }}
      >
        {open ? 'Voir moins ▴' : 'En savoir plus ▾'}
      </button>

      {/* DÉTAIL DÉPLIABLE */}
      {open && (
        <div style={{marginTop:14}}>
          <div style={{fontSize:12, color:'var(--muted2)', lineHeight:1.8, marginBottom:12}}>{svc.detail}</div>
          <div style={{fontSize:11, color:'var(--c1)', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>
            Technologies maîtrisées :
          </div>
          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
            {svc.techs.map((t, i) => {
              const c = TECH_COLORS[i % TECH_COLORS.length]
              return (
                <span key={t} style={{
                  fontSize:12, fontWeight:600, padding:'4px 12px', borderRadius:5,
                  background:c.bg, border:`1px solid ${c.border}`, color:c.color,
                }}>{t}</span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function PageServices({ goPage }: { goPage: (id: PageId) => void }) {
  const isMobile = useIsMobile()
  return (
    <>
      <div className="page-hero">
        <div className="sec-badge" style={{margin:'0 auto 18px'}}><span className="sec-badge-dot"/>Mes Services</div>
        <div className="sec-title" style={{textAlign:'center'}}>Solutions <em>Digitales</em></div>
        <p className="sec-desc">De la conception à la mise en production, je vous accompagne dans tous vos projets technologiques avec une expertise complète et une approche innovante.</p>
        <div className="sec-line"/>
      </div>
      <div style={{height:isMobile ? 16 : 32}}/>
      <div style={{padding: isMobile ? '0 16px 24px' : '0 44px 32px', maxWidth:1000, margin:'0 auto'}}>
        <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 14 : 20}}>
          {services.map(svc => <SvcCard key={svc.num} svc={svc} />)}
        </div>
        <div className="svc-cta" style={{marginTop:32}}>
          <h3>Prêt à démarrer votre projet ?</h3>
          <p>Discutons de vos besoins et trouvons ensemble la solution technologique parfaitement adaptée à vos objectifs.</p>
          <div className="svc-cta-btns">
            <button className="btn-pri" onClick={() => goPage('contact')}>Demander un devis</button>
            <button className="btn-sec" onClick={() => goPage('realisations')}>Voir mes réalisations →</button>
          </div>
        </div>
      </div>
    </>
  )
}
