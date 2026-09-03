'use client'
import { useState } from 'react'
import { PageId } from '@/app/page'
import { useIsMobile } from '@/lib/hooks'

export default function PageContact({ goPage }: { goPage: (id: PageId) => void }) {
  const isMobile = useIsMobile()
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', sujet: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = async () => {
    if (!form.email || !form.message) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ prenom: '', nom: '', email: '', telephone: '', sujet: '', message: '' })
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="sec-badge" style={{ margin: '0 auto 18px' }}><span className="sec-badge-dot" />Contact</div>
        <div className="sec-title" style={{ textAlign: 'center' }}>Travaillons <em>Ensemble</em></div>
        <p className="sec-desc">Disponible pour un stage, une alternance ou un projet freelance. Je réponds sous 24h.</p>
        <div className="sec-line" />
      </div>

      <div className="section contact-section">
        {/* TITRE AU-DESSUS DES CARTES */}
        <div className="contact-header">
          <div className="sec-h">Me contacter</div>
          <p className="contact-header-desc">
            N&apos;hésitez pas à me contacter pour discuter de vos besoins. Je suis disponible immédiatement pour de nouvelles opportunités professionnelles.
          </p>
        </div>

        {/* DEUX CARTES CENTRÉES */}
        <div className="contact-layout">
          {/* CARTE GAUCHE — Informations */}
          <div className="contact-card">
            <div className="contact-card-title">Informations de Contact</div>
            <div className="contact-items">
              <div className="c-item">
                <div className="c-item-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div>
                  <div className="c-item-label">Téléphone</div>
                  <div className="c-item-val">(+212) 06 69 27 54 36</div>
                  <div className="c-item-sub">Disponible 24H/24</div>
                </div>
              </div>
              <a className="c-item" href="mailto:diallosouleymane2026@hotmail.com">
                <div className="c-item-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div>
                  <div className="c-item-label">Email</div>
                  <div className="c-item-val">diallosouleymane2026@hotmail.com</div>
                  <div className="c-item-sub">Réponse sous H24</div>
                </div>
              </a>
              <a className="c-item" href="https://www.linkedin.com/in/souleymane-diallo-51214728b/?locale=fr" target="_blank" rel="noreferrer">
                <div className="c-item-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </div>
                <div>
                  <div className="c-item-label">LinkedIn</div>
                </div>
              </a>
              <a className="c-item" href="https://github.com/SouleymaneDiallo04" target="_blank" rel="noreferrer">
                <div className="c-item-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </div>
                <div>
                  <div className="c-item-label">GitHub</div>
                  <div className="c-item-val">SouleymaneDiallo04</div>
                </div>
              </a>
              <div className="c-item">
                <div className="c-item-ico">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <div className="c-item-label">Localisation</div>
                  <div className="c-item-val">Rabat, Maroc</div>
                  <div className="c-item-sub">Disponible à distance</div>
                </div>
              </div>
            </div>
          </div>

          {/* CARTE DROITE — Formulaire */}
          <div className="contact-form">
            <div className="form-title">Envoyer un message</div>
            <div className="form-2col">
              <div className="form-group">
                <label className="form-label">Prénom</label>
                <input className="form-input" placeholder="Jean" value={form.prenom}
                  onChange={e => setForm({ ...form, prenom: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Nom</label>
                <input className="form-input" placeholder="Dupont" value={form.nom}
                  onChange={e => setForm({ ...form, nom: e.target.value })} />
              </div>
            </div>
            <div className="form-2col">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="jean@entreprise.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Téléphone</label>
                <input className="form-input" type="tel" placeholder="+33 6 12 34 56 78"
                  value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Sujet</label>
              <input className="form-input" placeholder="Proposition de stage / Collaboration"
                value={form.sujet} onChange={e => setForm({ ...form, sujet: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input" style={{ resize: 'none', height: 90 }}
                placeholder="Bonjour Souleymane, je vous contacte concernant..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button className="form-submit" onClick={handleSubmit} disabled={status === 'loading'}>
              {status === 'loading' ? 'Envoi en cours...' : status === 'success' ? '✓ Message envoyé !' : 'Envoyer le message →'}
            </button>
            {status === 'error' && (
              <p style={{ fontSize: 11, color: '#e53e3e', textAlign: 'center', marginTop: 8 }}>
                Une erreur est survenue. Réessayez ou contactez-moi directement.
              </p>
            )}
            {status === 'success' && (
              <p style={{ fontSize: 11, color: 'var(--c1)', textAlign: 'center', marginTop: 8 }}>
                ✓ Votre message a été envoyé — Je vous réponds sous 24h !
              </p>
            )}
            <div className="form-powered">Propulsé par Resend</div>
          </div>
        </div>
      </div>
      {/* CTA BAS DE PAGE */}
      <div style={{ padding: isMobile ? '0 16px 40px' : '0 80px 60px' }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(139,69,19,.12) 0%, rgba(196,135,58,.08) 50%, rgba(139,69,19,.06) 100%)',
          border: '1px solid rgba(139,69,19,.25)',
          borderRadius: 20,
          padding: isMobile ? '32px 20px' : '52px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative glow */}
          <div style={{
            position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
            width: 320, height: 320,
            background: 'radial-gradient(circle, rgba(196,135,58,.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <h3 style={{
            fontFamily: 'var(--ff)', fontSize: isMobile ? 20 : 26, fontWeight: 800,
            letterSpacing: '-.4px', marginBottom: 12, color: 'var(--text)',
          }}>
            Prêt à commencer ?
          </h3>
          <p style={{
            fontSize: 14, color: 'var(--muted2)', lineHeight: 1.8,
            maxWidth: 480, margin: '0 auto 28px',
          }}>
            Chaque grand projet commence par une simple conversation. Contactez-moi aujourd&apos;hui et donnons vie à vos idées.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/souley.pdf" target="_blank" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--c1)', color: '#fff',
              padding: '12px 28px', borderRadius: 10,
              fontWeight: 700, fontSize: 13, letterSpacing: '.4px',
              textDecoration: 'none', textTransform: 'uppercase',
              transition: 'opacity .2s',
            }}>
              Télécharger mon CV
            </a>
            <button onClick={() => goPage('realisations')} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent',
              border: '1.5px solid rgba(139,69,19,.4)',
              color: 'var(--c1)',
              padding: '12px 28px', borderRadius: 10,
              fontWeight: 700, fontSize: 13, letterSpacing: '.4px',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'border-color .2s, background .2s',
            }}>
              Voir mes projets
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
