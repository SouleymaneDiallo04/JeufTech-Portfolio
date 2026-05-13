// ─── 01 · IA / Data Science / ML ────────────────────────────────────────────
// CPU avec réseau neuronal intégré
export const IconCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Boîtier CPU */}
    <rect x="4" y="4" width="16" height="16" rx="2" />
    {/* Broches */}
    <line x1="9"  y1="1"  x2="9"  y2="4"  />
    <line x1="15" y1="1"  x2="15" y2="4"  />
    <line x1="9"  y1="20" x2="9"  y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="1"  y1="9"  x2="4"  y2="9"  />
    <line x1="1"  y1="15" x2="4"  y2="15" />
    <line x1="20" y1="9"  x2="23" y2="9"  />
    <line x1="20" y1="15" x2="23" y2="15" />
    {/* Réseau neuronal — nœuds */}
    <circle cx="8"  cy="9"  r="1.2" fill="currentColor" stroke="none" />
    <circle cx="8"  cy="15" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7"  r="1.2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="16" cy="10" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="16" cy="14" r="1.2" fill="currentColor" stroke="none" />
    {/* Connexions couche 1 → 2 */}
    <line x1="8"  y1="9"  x2="12" y2="7"  strokeWidth="0.9" />
    <line x1="8"  y1="9"  x2="12" y2="12" strokeWidth="0.9" />
    <line x1="8"  y1="9"  x2="12" y2="17" strokeWidth="0.9" />
    <line x1="8"  y1="15" x2="12" y2="7"  strokeWidth="0.9" />
    <line x1="8"  y1="15" x2="12" y2="12" strokeWidth="0.9" />
    <line x1="8"  y1="15" x2="12" y2="17" strokeWidth="0.9" />
    {/* Connexions couche 2 → 3 */}
    <line x1="12" y1="7"  x2="16" y2="10" strokeWidth="0.9" />
    <line x1="12" y1="7"  x2="16" y2="14" strokeWidth="0.9" />
    <line x1="12" y1="12" x2="16" y2="10" strokeWidth="0.9" />
    <line x1="12" y1="12" x2="16" y2="14" strokeWidth="0.9" />
    <line x1="12" y1="17" x2="16" y2="10" strokeWidth="0.9" />
    <line x1="12" y1="17" x2="16" y2="14" strokeWidth="0.9" />
  </svg>
)

// ─── 02 · Développement Web Full Stack ──────────────────────────────────────
export const IconAI = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 2,7 12,12 22,7" />
    <polyline points="2,17 12,22 22,17" />
    <polyline points="2,12 12,17 22,12" />
  </svg>
)

// ─── 03 · Chatbots & Agents IA ───────────────────────────────────────────────
export const IconChat = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
  </svg>
)

// ─── 04 · Industrie 4.0 / IIoT / Lean Six Sigma ────────────────────────────
export const IconIndustry = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
    <path d="M17 18h1"/>
    <path d="M12 18h1"/>
    <path d="M7 18h1"/>
  </svg>
)

// ─── 05 · MLOps & Infrastructure Cloud ──────────────────────────────────────
export const IconCloud = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
)

// ─── 06 · Applications Desktop ──────────────────────────────────────────────
export const IconDesktop = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8m-4-4v4"/>
  </svg>
)
