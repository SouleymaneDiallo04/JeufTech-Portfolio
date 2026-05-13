'use client'
import { useState, useEffect } from 'react'

const msgs = ['Initialisation...','Chargement des modules...','Connexion API...','Portfolio prêt !']

export default function Splash() {
  const [txt, setTxt] = useState(msgs[0])
  useEffect(() => {
    let i = 0
    const t = setInterval(() => { i++; if (i < msgs.length) setTxt(msgs[i]); else clearInterval(t) }, 550)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="splash">
      <div className="splash-ring" style={{width:80,height:80,border:'1px solid rgba(196,135,58,.5)'}}/>
      <div className="splash-ring" style={{width:160,height:160,border:'1px solid rgba(196,135,58,.25)'}}/>
      <div className="splash-ring" style={{width:260,height:260,border:'1px solid rgba(196,135,58,.12)'}}/>
      <div className="splash-logo">\<em>JeufTech</em>/</div>
      <div className="splash-bar"><div className="splash-fill"/></div>
      <div className="splash-txt">{txt}</div>
    </div>
  )
}
