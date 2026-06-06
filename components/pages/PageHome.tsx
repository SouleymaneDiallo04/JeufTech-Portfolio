'use client'
import { useState, useEffect, useRef } from 'react'
import { PageId } from '@/app/page'
import { technologies, typeStrings } from '@/lib/data'

const LOGOS = {
  python: <svg width="14" height="14" viewBox="0 0 256 255"><defs><linearGradient id="py1" x1="12.959" y1="12.042" x2="169.086" y2="169.085" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#387EB8"/><stop offset="1" stopColor="#366994"/></linearGradient><linearGradient id="py2" x1="84.452" y1="84.44" x2="252.076" y2="252.075" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFE052"/><stop offset="1" stopColor="#FFC331"/></linearGradient></defs><path fill="url(#py1)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.12 11.12 11.12 11.12 0 0 1-11.12 11.12 11.12 11.12 0 0 1-11.12-11.12 11.12 11.12 0 0 1 11.12-11.12z"/><path fill="url(#py2)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.12-11.12 11.12 11.12 0 0 1 11.12-11.12 11.12 11.12 0 0 1 11.12 11.12 11.12 11.12 0 0 1-11.12 11.12z"/></svg>,
  code: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c2)" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  data: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c4)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  ai: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c1)" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
}

function useCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let v = 0
    const step = setInterval(() => {
      v += Math.ceil(target / 50)
      if (v >= target) { v = target; clearInterval(step) }
      setVal(v)
    }, 800 / 50)
    return () => clearInterval(step)
  }, [target, active])
  return val
}

function Counter({ target, label }: { target: number; label: string }) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const val = useCounter(target, active)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-n">{val}{target > 10 ? '' : ''}</div>
      <div className="stat-l">{label}</div>
    </div>
  )
}

function Typewriter() {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const cur = typeStrings[idx]
    const speed = deleting ? 55 : 85
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(cur.slice(0, charIdx + 1))
        if (charIdx + 1 === cur.length) setTimeout(() => setDeleting(true), 1200)
        else setCharIdx(c => c + 1)
      } else {
        setText(cur.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) { setDeleting(false); setIdx(i => (i + 1) % typeStrings.length); setCharIdx(0) }
        else setCharIdx(c => c - 1)
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [text, idx, charIdx, deleting])
  return <div className="hero-type">{text}<span className="cursor"/></div>
}

const skills = [
  { ico:'🤖', name:'Machine Learning', pct:90, desc:'Modélisation prédictive, feature engineering', tags:['Scikit-learn','XGBoost','MLflow'] },
  { ico:'🧠', name:'Deep Learning', pct:85, desc:'CNN, RNN, Transformers, fine-tuning LLMs', tags:['PyTorch','TensorFlow','HuggingFace'] },
  { ico:'📊', name:'Data Science', pct:92, desc:'EDA, pipeline end-to-end, visualisation avancée', tags:['Pandas','Plotly','Power BI'] },
  { ico:'💬', name:'NLP & LLMs', pct:80, desc:'RAG, agents IA, embeddings sémantiques', tags:['LangChain','OpenAI','FAISS'] },
  { ico:'🌐', name:'Web & API', pct:78, desc:'Next.js, FastAPI, REST/GraphQL', tags:['Next.js','FastAPI','Streamlit'] },
  { ico:'☁️', name:'MLOps & Cloud', pct:75, desc:'Docker, CI/CD, monitoring de modèles', tags:['Docker','Fly.io','GitHub Actions'] },
]

const radarSkills = [['ML',90],['Deep L.',85],['Data Sci.',92],['NLP',80],['Web',78],['MLOps',75]]

export default function PageHome({ goPage }: { goPage: (id: PageId) => void }) {
  const [barsActive, setBarsActive] = useState(false)
  const skillsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setBarsActive(true) }, { threshold: 0.3 })
    if (skillsRef.current) obs.observe(skillsRef.current)
    return () => obs.disconnect()
  }, [])

  const ticker2 = [...technologies, ...technologies]

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-lines"/>
        <div className="hero-inner">
          <div>
            <div className="hero-avail"><span className="avail-dot"/>Disponible pour de nouveaux projets</div>
            <div className="hero-greeting">Salut 👋, je suis</div>
            <h1>Souleymane<br/>Diallo</h1>
            <div className="hero-badges">
              <span className="h-badge">{LOGOS.ai} Intelligence Artificielle</span>
              <span className="h-badge">{LOGOS.code} Développement Software</span>
              <span className="h-badge">{LOGOS.data} Data Science</span>
            </div>
            <Typewriter />
            <p className="hero-desc">
              Passionné par l'intelligence artificielle et ses applications innovantes, je conçois des solutions digitales performantes qui allient <span className="hl1">robustesse technique</span> et <span className="hl2">élégance design</span>. Mon expertise couvre l'ensemble du cycle de développement, de la conception à la mise en production.
            </p>
            <div className="hero-btns">
              <button className="btn-pri" onClick={() => window.open('/souley.pdf', '_blank')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Télécharger mon CV
              </button>
              <button className="btn-sec" onClick={() => goPage('realisations')}>Voir mes projets →</button>
            </div>
            <div className="hero-socials">
              {/* GitHub */}
              <a className="soc" href="https://github.com/SouleymaneDiallo04" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              {/* LinkedIn */}
              <a className="soc" href="https://www.linkedin.com/in/souleymane-diallo-51214728b/" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* Kaggle */}
              <a className="soc" href="https://www.kaggle.com/souleymanediallo21" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z"/></svg>
              </a>
              {/* Medium */}
              <a className="soc" href="https://jeuf-tech-portfolio.vercel.app/" target="_blank" rel="noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795h6.633v.403l-1.916 1.837c-.165.126-.247.333-.213.53v13.358c-.034.197.048.404.213.53l1.87 1.837v.403h-9.412v-.403l1.937-1.882c.19-.19.19-.246.19-.53v-10.8l-5.389 13.688h-.728l-6.275-13.688v9.174c-.052.385.076.774.347 1.052l2.521 3.058v.404h-7.148v-.404l2.521-3.058c.27-.278.39-.67.325-1.052v-10.6z"/></svg>
              </a>
            </div>
          </div>
          {/* AVATAR */}
          <div className="hero-av-wrap">
            <div className="ring-spin" style={{width:400,height:400,borderWidth:1,borderColor:'rgba(139,69,19,.3)',animationDuration:'12s'}}/>
            <div className="ring-spin" style={{width:438,height:438,borderWidth:1,borderColor:'rgba(196,135,58,.18)',animationDuration:'18s',animationDirection:'reverse'}}/>
            <div className="av-circle">
              <img
                src="/profil.jpeg"
                alt="Souleymane Diallo"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', borderRadius: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-row">
        <Counter target={3} label="Années d'expérience" />
        <Counter target={21} label="Projets terminés" />
        <Counter target={14} label="Technologies maîtrisées" />
        <Counter target={108} label="Codes commits" />
      </div>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-wrap">
          {ticker2.map((t, i) => (
            <span key={i} className="t-chip">
              <span className="t-dot" style={{background: i%4===0?'var(--c1)':i%4===1?'var(--c2)':i%4===2?'var(--c4)':'var(--c3)'}}/>
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
