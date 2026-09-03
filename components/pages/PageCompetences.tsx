'use client'
import { useState, useEffect, useRef } from 'react'
import { PageId } from '@/app/page'
import { useIsMobile } from '@/lib/hooks'

/* ══ LOGOS SVG 18px — identiques SouleCode ══ */
const PY = () => <svg width="18" height="18" viewBox="0 0 256 255" style={{flexShrink:0}}><defs><linearGradient id="py1" x1="12.959" y1="12.042" x2="169.086" y2="169.085" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#387EB8"/><stop offset="1" stopColor="#366994"/></linearGradient><linearGradient id="py2" x1="84.452" y1="84.44" x2="252.076" y2="252.075" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#FFE052"/><stop offset="1" stopColor="#FFC331"/></linearGradient></defs><path fill="url(#py1)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072z"/><path fill="url(#py2)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897z"/></svg>
const JS = () => <svg width="18" height="18" viewBox="0 0 256 256" style={{flexShrink:0}}><rect width="256" height="256" rx="20" fill="#F7DF1E"/><path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.994M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.979l-6.013-2.58c-17.357-7.388-28.871-16.653-28.871-36.245 0-18.04 13.748-31.79 35.229-31.79 15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.579c20.45 8.765 31.963 17.686 31.963 37.79 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.577"/></svg>
const FAPI = () => <svg width="18" height="18" viewBox="0 0 512 512" style={{flexShrink:0}}><circle cx="256" cy="256" r="256" fill="#009688"/><path fill="#fff" d="M271.1 131.4L148.5 280.5h122.6l-30.2 100.1 122.6-149.1H241l30.1-100.1z"/></svg>
const NX = () => <svg width="18" height="18" viewBox="0 0 256 256" style={{flexShrink:0}}><circle cx="128" cy="128" r="128" fill="#000"/><path fill="#fff" d="M212.6 195.7L98.7 52H76v152.2h18V74.9l107.7 134.5c3.2-4.5 6-9.2 8.9-13.7z"/><rect x="163" y="52" width="18" height="152" fill="#fff"/></svg>
const SQL_ = () => <svg width="18" height="18" viewBox="0 0 128 128" style={{flexShrink:0}}><path fill="#00758F" d="M64 0C28.7 0 0 9.6 0 21.4v85.2C0 118.4 28.7 128 64 128s64-9.6 64-21.4V21.4C128 9.6 99.3 0 64 0z"/><ellipse cx="64" cy="21.4" rx="64" ry="21.4" fill="#00618A"/></svg>
const DOCK = () => <svg width="18" height="18" viewBox="0 0 106 77" style={{flexShrink:0}}><path fill="#2496ED" d="M103.8 32.5c-1.7-1.2-5.7-1.6-8.7-1-.4-3.1-2.2-5.8-5.3-8.2l-1.8-1.2-1.2 1.8c-1.5 2.3-2.3 5.5-2.1 8.7.1 1.1.5 3.1 1.7 4.9-1.2.7-3.5 1.6-6.7 1.6H2.6l-.2 1c-.6 3.2-.5 13.2 5.7 20.9 4.7 5.9 11.7 8.9 21 8.9 20 0 34.8-9.2 41.7-26 2.7.1 8.6.1 11.6-5.7.1-.2.6-1.2 1.8-3.7l.3-.7-1.7-1.3zM58 31.5H49v-9h9v9zm0-11H49v-9h9v9zm0-11H49v-9h9v9zm11 22H60v-9h9v9zm0-11H60v-9h9v9zm11 11H71v-9h9v9zm0-11H71v-9h9v9zm0-11H71v-9h9v9zM47 31.5H38v-9h9v9zm0-11H38v-9h9v9zm-11 11H27v-9h9v9zm0-11H27v-9h9v9zm0-11H27v-9h9v9zM25 31.5H16v-9h9v9zm0-11H16v-9h9v9z"/></svg>
const GH_ = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#2C1A0E" style={{flexShrink:0}}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
const AWS_ = () => <svg width="18" height="18" viewBox="0 0 50 31" style={{flexShrink:0}}><path fill="#FF9900" d="M14.3 13.7c0 .5.1 1 .2 1.3.1.4.3.8.6 1.2.1.2.2.3.2.5 0 .2-.1.4-.3.6l-1 .7c-.1.1-.3.1-.4.1-.2 0-.4-.1-.5-.2-.3-.3-.5-.5-.7-.8s-.5-.8-.8-1.3c-2 2.3-4.4 3.5-7.3 3.5-2.1 0-3.7-.6-5-1.8-1.2-1.2-1.9-2.9-1.9-5 0-2.2.8-4 2.3-5.4C1.7 5.7 3.8 5 6.3 5c.8 0 1.7.1 2.6.2.9.2 1.8.4 2.8.7V4.1c0-1.9-.4-3.2-1.2-4-.8-.8-2.1-1.2-4-1.2-.9 0-1.7.1-2.6.3-.9.2-1.8.5-2.5.9"/><text x="18" y="14" fontSize="12" fontWeight="bold" fill="#FF9900" fontFamily="Arial">AWS</text></svg>
const PT_ = () => <svg width="18" height="18" viewBox="0 0 64 64" style={{flexShrink:0}}><circle cx="32" cy="32" r="32" fill="#EE4C2C"/><path fill="#fff" d="M32 12l-4 4 4 4 4-4-4-4zm0 7.5C22.3 19.5 14 27.8 14 37.5c0 9.7 8.3 18 18 18s18-8.3 18-18S41.7 19.5 32 19.5zm0 5c5 0 9 4 9 9s-4 9-9 9-9-4-9-9 4-9 9-9z"/></svg>
const SK_ = () => <svg width="18" height="18" viewBox="0 0 64 64" style={{flexShrink:0}}><circle cx="32" cy="32" r="32" fill="#F7931E"/><text x="32" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff" fontFamily="Arial">SK</text></svg>
const LC_ = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C6B48" strokeWidth="2" style={{flexShrink:0}}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
const AZURE_ = () => <svg width="18" height="18" viewBox="0 0 96 96" style={{flexShrink:0}}><defs><linearGradient id="az1" x1="-.018" x2=".501" y1=".101" y2=".861" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#114a8b"/><stop offset="1" stopColor="#0669bc"/></linearGradient><linearGradient id="az2" x1=".5" x2=".5" y1="0" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stopColor="#3ccbf4"/><stop offset="1" stopColor="#2892df"/></linearGradient></defs><path fill="url(#az1)" d="M33.338 6.544h26.038L33.552 83.556a4.152 4.152 0 01-3.933 2.8H8.152a4.145 4.145 0 01-3.928-5.47L26.64 9.344a4.152 4.152 0 013.932-2.8z"/><path fill="#0078d4" d="M71.175 60.261H29.311a1.91 1.91 0 00-1.3 3.308l27.045 25.252a4.16 4.16 0 002.852 1.125h23.8z"/><path fill="url(#az2)" d="M33.338 6.544a4.12 4.12 0 00-3.94 2.852L4.252 80.791a4.14 4.14 0 003.9 5.565h20.787a4.443 4.443 0 003.308-2.9l5.025-14.795 17.973 16.762a4.237 4.237 0 002.666.934h23.29l-10.22-29.095-29.773.007L51.16 6.544z"/></svg>
const K8S_ = () => <svg width="18" height="18" viewBox="0 0 32 32" style={{flexShrink:0}}><circle cx="16" cy="16" r="16" fill="#326CE5"/><path fill="#fff" d="M16 4.5a1.25 1.25 0 00-.49.1L7.87 7.72a1.25 1.25 0 00-.78.94l-1.54 8.36a1.25 1.25 0 00.3 1.06l5.67 6.21a1.25 1.25 0 001.02.41h6.92a1.25 1.25 0 001.02-.41l5.67-6.21a1.25 1.25 0 00.3-1.06l-1.54-8.36a1.25 1.25 0 00-.78-.94l-7.64-3.12A1.25 1.25 0 0016 4.5zm0 2.1l6.97 2.84 1.4 7.62-5.17 5.66h-6.4L7.63 17.06l1.4-7.62L16 6.6zm0 2.9a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0016 9.5zm-4.68 2.28l-2.25 3.9a.75.75 0 001.3.75l2.25-3.9a.75.75 0 00-1.3-.75zm9.36 0a.75.75 0 00-.65.38l-2.25 3.9a.75.75 0 001.3.75l2.25-3.9a.75.75 0 00-.65-1.13zM13 18.5a.75.75 0 00-.37 1.4l3.9 2.25a.75.75 0 00.75-1.3l-3.9-2.25A.75.75 0 0013 18.5zm6 0a.75.75 0 00-.38.1l-3.9 2.25a.75.75 0 00.75 1.3l3.9-2.25A.75.75 0 0019 18.5z"/></svg>
const NODE_ = () => <svg width="18" height="18" viewBox="0 0 256 289" style={{flexShrink:0}}><path fill="#539E43" d="M128 288.464c-3.975 0-7.685-1.06-11.13-2.915l-35.247-20.936c-5.3-2.915-2.65-3.975-1.06-4.505 7.155-2.385 8.48-2.915 15.9-7.155.795-.53 1.855-.265 2.65.265l27.032 16.166c1.06.53 2.385.53 3.18 0l105.74-61.008c1.06-.53 1.59-1.59 1.59-2.915V83.01c0-1.325-.53-2.385-1.59-2.915L128.795 19.087c-1.06-.53-2.385-.53-3.18 0L19.875 80.095c-1.06.53-1.59 1.855-1.59 2.915v122.016c0 1.06.53 2.385 1.59 2.915l28.887 16.696c15.635 7.95 25.44-1.325 25.44-10.6V94.14c0-1.59 1.325-3.18 3.18-3.18h13.515c1.59 0 3.18 1.325 3.18 3.18v119.9c0 20.936-11.395 32.86-31.27 32.86-6.095 0-10.865 0-24.38-6.625l-27.827-15.9C4.24 220.885 0 213.465 0 205.515V83.01c0-7.95 4.24-15.37 11.13-19.345L116.87 2.656c6.625-3.71 15.635-3.71 22.26 0L244.87 63.665C251.76 67.64 256 75.06 256 83.01v122.016c0 7.95-4.24 15.37-11.13 19.345l-105.74 61.008c-3.445 1.59-7.155 2.385-11.13 2.385z"/><path fill="#539E43" d="M160.728 204.19c-46.277 0-55.952-21.2-55.952-39.017 0-1.59 1.325-3.18 3.18-3.18h13.78c1.59 0 2.915 1.06 2.915 2.65 2.12 14.045 8.215 20.936 36.342 20.936 22.525 0 32.065-5.035 32.065-16.961 0-6.89-2.65-11.925-37.402-15.37-29.152-2.915-47.072-9.275-47.072-32.595 0-21.466 18.08-34.187 48.397-34.187 34.187 0 50.882 11.66 53.002 37.137 0 .795-.265 1.59-.795 2.12-.53.53-1.325.795-2.12.795h-13.78c-1.325 0-2.65-1.06-2.915-2.385-3.18-14.575-11.395-19.345-33.655-19.345-24.645 0-27.56 8.745-27.56 15.105 0 7.95 3.445 10.335 36.342 14.575 32.595 4.24 48.132 10.335 48.132 33.125-.265 23.585-19.61 36.597-52.204 36.597z"/></svg>
const DJANGO_ = () => <svg width="18" height="18" viewBox="0 0 256 325" style={{flexShrink:0}}><path fill="#092E20" d="M114.784 0h-59.86v244.452c32.81-6.235 56.834-30.806 56.834-72.343 0-43.281-22.52-55.99-22.52-55.99s22.52 0 25.546-116.12zm27.23 0v183.275c0 41.275-34.22 72.06-34.22 72.06h36.82c30.256-21.49 35.34-42.24 35.34-92.85V0h-37.94zm84.47 0H169.87v130.59c0 50.6-5.09 71.35-35.34 92.85h64.07c44.46-28.36 57.09-66.54 57.09-111.44V0h-33.04z"/></svg>
const FLASK_ = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}><path d="M16.309 16.316c-.12.19-.32.315-.54.315H8.23a.64.64 0 01-.54-.315l-3.54-5.73a.64.64 0 010-.675l3.54-5.73a.64.64 0 01.54-.315h7.539a.64.64 0 01.54.315l3.54 5.73a.64.64 0 010 .675l-3.54 5.73zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg>
const REACT_ = () => <svg width="18" height="18" viewBox="0 0 256 228" style={{flexShrink:0}}><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 00-8.24-2.597c.465-1.9.893-3.777 1.273-5.621 6.238-30.281 2.16-54.676-11.769-62.708-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 00-6.375 5.848 155.866 155.866 0 00-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233 50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 001.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 008.479 2.671c-1.484 6.478-2.54 12.96-3.155 19.406-2.822 29.442 1.672 52.3 15.314 60.01 14.176 8.015 37.143-.195 59.377-19.882a169.972 169.972 0 005.455-5.138 164.25 164.25 0 005.523 5.188c22.41 19.418 45.578 27.465 59.943 19.53 14.443-7.995 18.99-32.002 16.022-62.3a145.57 145.57 0 00-2.54-19.165 146.48 146.48 0 009.014-2.867c28.069-9.615 46.607-25.424 46.607-41.19 0-15.264-17.89-30.592-45.517-40.175zm-10.24 135.688c-2.887.914-5.852 1.748-8.884 2.499a174.187 174.187 0 00-10.95-27.392c5.01-7.79 9.658-16.03 13.882-24.608 9.887 3.393 19.133 7.29 27.521 11.636-4.63 15.98-13.187 29.96-21.57 37.865zm-5.96-69.315c-5.188 10.64-10.99 20.798-17.28 30.374-10.858.992-21.965 1.5-33.098 1.5-11.133 0-22.24-.508-33.098-1.5-6.29-9.576-12.092-19.734-17.28-30.374-5.188-10.64-9.822-21.42-13.823-32.215 4.001-10.796 8.635-21.575 13.823-32.215 5.188-10.64 10.99-20.798 17.28-30.374 10.858-.992 21.965-1.5 33.098-1.5 11.133 0 22.24.508 33.098 1.5 6.29 9.576 12.092 19.734 17.28 30.374 5.188 10.64 9.822 21.42 13.823 32.215-4.001 10.796-8.635 21.575-13.823 32.215z"/><circle fill="#00D8FF" cx="127.985" cy="113.667" r="18.415"/></svg>
const RISE_ICON = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

/* ══ DONNÉES EXPÉRIENCE — cartes comme la capture ══ */
const experiences = [
  {
  type: 'Stage',
  typeColor: 'rgba(139,69,19,.15)',
  typeText: 'var(--c1)',
  date: 'Juillet — Sept. 2026',
  dotColor: 'var(--c1)',
  title: 'Stagiaire Ingénieur R&D - IA Embarquée, IoT & Data Science',
  org: 'Smart Digital Systems',
  desc: "Conception de systèmes intelligents de bout en bout, du capteur physique au modèle validé, au service de l'agriculture de précision et du contrôle qualité agroalimentaire. Un stage à forte dimension recherche appliquée, combinant instrumentation, IA embarquée sur microcontrôleur et science des données.",
  missions: [
    "Conception et Fiabilisation d'un pipeline de calcul d'évapotranspiration de référence (ETo, FAO-56 Penman-Monteith) et modélisation du rayonnement solaire à partir de capteurs bas coût (lux, UV, température) pour le pilotage de l'irrigation.",
    "Déploiement en production : solution intégrée aux plateformes IoT de stations agricoles connectées ; identification et correction d'une anomalie critique dans la chaîne de calcul en production.",
    "Validation scientifique et transférabilité : validation croisée par mois exclu (LeaveOneMonthOut), test prospectif walk-forward et intervalles de confiance par bootstrap ; robustesse confirmée par transférabilité sur 4 stations indépendantes.",
    "Développement de firmware embarqué sur microcontrôleur ESP32 / Heltec (C++, framework Arduino, PlatformIO) : acquisition de capteurs multi-gaz en liaison série UART, décodage de trames binaires et contrôle d'intégrité.",
    "Contrôle qualité agroalimentaire : chaîne d'acquisition et d'analyse d'un nez électronique (capteur Bosch BME688 à balayage thermique et module Grove) pour la mesure de l'acidité d'huiles d'olive, avec traitement du signal, régression PLS et validation croisée Q².",
    "Reproductibilité complète : scripts Python (pandas, NumPy, scikit-learn), documentation technique et rédaction de rapports scientifiques.",
  ],
  techs: ['Python', 'C++', 'ESP32 / Arduino', 'IoT / LoRaWAN', 'scikit-learn', 'Traitement du signal', 'Capteurs (BME688, multi-gaz)', 'Git'],
  achievements: [
    "Agriculture de précision : modèle de rayonnement validé et déployé en production, réduisant la dépendance à un pyranomètre professionnel coûteux au profit de capteurs à quelques euros.",
    "Robustesse prouvée par transférabilité sur 4 stations indépendantes, sans réentraînement spécifique.",
    "IA embarquée : firmware d'acquisition multi-gaz opérationnel sur ESP32, avec vérification d'intégrité des trames en temps réel.",
    "Contrôle qualité agroalimentaire : campagne de plus de 100 000 relevés (plus de 400 000 mesures) sur des échantillons d'huile d'olive, avec un rapport signal sur bruit de 186:1 et une fidélité meilleure que 2 %.",
    "Résultat de recherche : démonstration, par une méthodologie expérimentale rigoureuse (plan anti-dérive, PLS, validation croisée Q²) des limites physico-chimiques d'une approche capteur.",
  ],
  },
  {
  type: 'Stage',
  typeColor: 'rgba(139,69,19,.15)',
  typeText: 'var(--c1)',
  date: 'Juillet — Aout 2026',
  dotColor: 'var(--c1)',
  title: "Ingénieur Full Stack & Generative AI – Plateforme SaaS B2B de Prospection Commerciale Augmentée par l'IA",
  org: '3LM Solutions — Tunis (à distance)',
  desc: "Conception et développement d'une plateforme web B2B qui transforme les 15 millions d'entreprises du registre public français en un outil de prospection commerciale, doté d'une IA générative pour les résumés et argumentaires de vente et d'une recommandation intelligente d'entreprises similaires.",
  missions: [
    "Développement intégral de la plateforme : API back-end (Laravel / PHP) et application front-end (React, TypeScript), avec authentification, double authentification (2FA) et permissions par rôle (administrateur / manager / commercial).",
    "Collecte des coordonnées manquantes du registre : croisement d'OpenStreetMap et d'un crawler web pour récupérer téléphones, e-mails, réseaux sociaux et avis publiés.",
    "Moteur de recherche et cartographie : recherche multicritères sur plus d'un million de fiches (secteur d'activité, zone géographique, effectif, ancienneté), carte interactive et sélection par rayon autour d'une adresse.",
    "Moteur de scoring déterministe et explicable : indice de réputation, score commercial et paliers A/B/C/D, chaque note justifiée par ses facteurs.",
    "Couche d'IA générative : résumé d'entreprise et argumentaire d'approche personnalisés selon le canal (courrier électronique ou script d'appel téléphonique), et recommandation de prospects similaires par recherche vectorielle (embeddings, KNN cosinus).",
    "Démarche d'ingénierie complète : spécification, développement piloté par les tests, revues de code et de sécurité, intégration continue (GitHub Actions).",
  ],
  techs: ['Laravel', 'React / TypeScript', 'PostgreSQL', 'Docker', 'PgVector', 'Redis / Horizon', 'Tailwind CSS', 'CI/CD'],
  achievements: [
    "Chaîne d'ingestion à l'échelle nationale : 15 millions d'établissements traités par lecture en flux sans charger le fichier en mémoire, plus d'1 million géolocalisés dont 335 000 indexés pour la recommandation d'entreprises similaires.",
    "Couverture obtenue sans achat de données : base construite exclusivement à partir de sources ouvertes, là où l'équivalent par API commerciale était chiffré à 19 000 $ pour un seul département.",
    "Recherche par ressemblance opérationnelle : retrouver les jumeaux commerciaux d'un client parmi les fiches indexées, sans contrainte géographique.",
    "Robustesse de niveau production : diagnostic et correction d'une fuite mémoire sur le traitement massif d'embeddings, et fiabilisation des appels d'IA sous limitation de débit, ramenant un taux d'échec de 38 % à un niveau stable.",
    "Livraison intégrale en deux mois : cadrage, architecture, développement, tests automatisés, mise en conteneurs, démonstration et déploiement.",
  ],
  },
  {
  type: 'Stage',
  typeColor: 'rgba(139,69,19,.15)',
  typeText: 'var(--c1)',
  date: 'Aout — Oct 2025',
  dotColor: 'var(--c1)',
  title: 'Stagiaire IA / Data Science - MLOps',
  org: 'Technocolabs Software Inc.',
  desc: 'Prédiction de la trajectoire des startups – pipeline ML complet, de la data au déploiement.',
  missions: [
    'Prétraitement de données massives avec PySpark : nettoyage, gestion des manquants, normalisation et encodage sur plus de 50 000 startups.',
    'Analyse exploratoire (EDA) univariée, bivariée et multivariée pour identifier les facteurs clés du succès.',
    'Feature engineering : création de variables pertinentes .',
    'Développement de modèles de classification adaptes au desequilibre de classes: d’abord binaire, puis multi‑classe.',
    'Optimisation des modèles (Random Forest, XGBoost, LightGBM, ExtraTrees) avec validation croisée et recherche d’hyperparamètres.',
    'Mise en production du pipeline gagnant (LightGBM pour le binaire + ExtraTrees pour le multi‑classe) via une API Flask dockerisée et déployée sur AWS Elastic Beanstalk.',
    'Rédaction d’un rapport final documentant l’ensemble du cycle de vie du projet.'
  ],
  techs: ['Python', 'Flask', 'Docker', 'AWS', 'Scikit-learn', 'Pandas', 'PySpark', 'Git'],
  achievements: [
    'Modèle binaire (actif/inactif) atteignant 90% de précision.',
    'Modèle multi‑classe (4 statuts) atteignant 95% de précision avec une approche hiérarchique pour la gestion du deséquilibre.',
    'Pipeline d’ingénierie des fonctionnalités ayant amélioré de 15% les scores par rapport aux features brutes.',
    'API Flask conteneurisée et déployée sur AWS.'
  ]
  },
{
  type: 'Freelance',
  typeColor: 'rgba(107,66,38,.15)',
  typeText: 'var(--c3)',
  date: '2024 — Présent',
  dotColor: 'var(--c3)',
  title: 'Développeur Web',
  org: 'JeüfTech',
  desc: 'Création de solutions web innovantes adaptées aux besoins du client – de l’idée au déploiement.',
  missions: [
    'Développement d’une plateforme de location et vente de voitures avec système de réservation, catalogue véhicules, filtres avancés et paiement sécurisé.',
    'Conception d’un site e-commerce complet pour la vente d’articles de mode : panier, gestion des stocks, passerelle Stripe, espace client.',
    'Réalisation de dashboards d’administration pour la gestion des annonces, des commandes et des utilisateurs.',
    'Mise en place d’APIs REST avec Node.js/Express ou Django REST Framework, et déploiement sur Vercel, Fly.io ou AWS.',
    'Formation des clients à l’utilisation des outils développés.',
    'Optimisation des performances et responsive design (mobile first).'
  ],
  techs: ['React.js', 'Next.js', 'Node.js', 'Django', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
  achievements: [
    'Plusieurs projets web & mobile livrés avec 100 % de satisfaction client.',
    'Amélioration moyenne de 40 % des performances sur les sites optimisés.',
    'Livraison systématique des projets dans les délais impartis, avec une communication transparente tout au long du processus.'
  ]
},
]

/* ══ CARTE EXPÉRIENCE — exactement comme la capture ══ */
function ExpCard({ exp }: { exp: typeof experiences[0] }) {
  const [open, setOpen] = useState(false)
  const PREVIEW = 4
  const extra = exp.techs.length - PREVIEW
  const TECH_C = [
    {bg:'rgba(0,230,118,.06)',border:'rgba(0,230,118,.2)',color:'#00C853'},
    {bg:'rgba(0,194,255,.06)',border:'rgba(0,194,255,.2)',color:'#00B0CC'},
    {bg:'rgba(255,184,0,.06)',border:'rgba(255,184,0,.2)',color:'#C4873A'},
    {bg:'rgba(123,47,255,.06)',border:'rgba(123,47,255,.2)',color:'#7B2FFF'},
  ]

  // Icône de réalisation (flèche zigzag)
  const RiseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )

  return (
    <div style={{
      background:'var(--card)',
      border:'1px solid var(--borderx)',
      borderRadius:14,
      padding:'20px 22px',
      transition:'.2s',
    }}>
      {/* TOP: badge type + date */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{width:8,height:8,borderRadius:'50%',background:exp.dotColor,display:'inline-block',flexShrink:0}}/>
          <span style={{fontSize:12,fontWeight:700,padding:'3px 12px',borderRadius:20,background:exp.typeColor,color:exp.typeText,border:`1px solid ${exp.typeText}44`}}>{exp.type}</span>
        </div>
        <span style={{fontSize:13,fontWeight:700,color:exp.dotColor}}>{exp.date}</span>
      </div>

      {/* TITRE (avec marge supérieure pour descendre) */}
      <div style={{fontFamily:'var(--ff)',fontSize:18,fontWeight:800,marginBottom:6,marginTop:8,color:exp.type==='Stage'||exp.type==='Freelance'?'var(--c1)':'var(--text)'}}>
        {exp.title}
      </div>

      {/* ORG */}
      <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:10,fontSize:13,color:'var(--muted2)'}}>
        <span style={{width:7,height:7,borderRadius:'50%',background:exp.dotColor,display:'inline-block',flexShrink:0}}/>
        {exp.org}
      </div>

      {/* DESC */}
      <p style={{fontSize:13,color:'var(--muted2)',lineHeight:1.7,marginBottom:12}}>{exp.desc}</p>

      {/* BOUTON VOIR PLUS */}
      <button onClick={() => setOpen(!open)} style={{display:'flex',alignItems:'center',gap:5,fontSize:13,color:'var(--c1)',background:'transparent',border:'none',cursor:'pointer',fontFamily:'var(--fb)',fontWeight:600,marginBottom:12,padding:0}}>
        {open ? <><span>▲</span> Voir moins</> : <><span>▼</span> Voir plus de détails</>}
      </button>

      {/* CONTENU DÉPLIÉ */}
      {open && (
        <div style={{marginBottom:12}}>
          {/* MISSIONS */}
          <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:8}}>
            <span style={{fontSize:12,color:exp.dotColor}}>◎</span>
            <span style={{fontSize:13,fontWeight:700,color:'var(--text)'}}>Missions principales</span>
          </div>
          <ul style={{paddingLeft:16,marginBottom:12}}>
            {exp.missions.map((m,i) => <li key={i} style={{fontSize:12,color:'var(--muted2)',lineHeight:1.7,marginBottom:4,listStyleType:'disc'}}>{m}</li>)}
          </ul>

          {/* TECHNOLOGIES (détaillées) */}
          <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:8}}>
            <span style={{fontSize:12,color:exp.dotColor}}>&lt;&gt;</span>
            <span style={{fontSize:13,fontWeight:700,color:'var(--text)'}}>Technologies utilisées</span>
          </div>
          <div style={{display:'flex',gap:7,flexWrap:'wrap',marginBottom:16}}>
            {exp.techs.map((t,i) => {
              const c = TECH_C[i % TECH_C.length]
              return <span key={t} style={{fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:20,background:c.bg,border:`1px solid ${c.border}`,color:c.color}}>{t}</span>
            })}
          </div>

          {/* RÉALISATIONS CLÉS */}
          {exp.achievements && exp.achievements.length > 0 && (
            <>
              <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:8}}>
                <span style={{fontSize:12,color:exp.dotColor}}><RiseIcon /></span>
                <span style={{fontSize:13,fontWeight:700,color:'var(--text)'}}>Réalisations clés</span>
              </div>
              <ul style={{paddingLeft:16}}>
                {exp.achievements.map((a,i) => (
                  <li key={i} style={{fontSize:12,color:'var(--muted2)',lineHeight:1.7,marginBottom:4,listStyleType:'disc'}}>{a}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {/* TECHS RÉSUMÉ (quand fermé) */}
      {!open && (
        <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
          {exp.techs.slice(0,PREVIEW).map((t,i) => {
            const c = TECH_C[i % TECH_C.length]
            return <span key={t} style={{fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:20,background:c.bg,border:`1px solid ${c.border}`,color:c.color}}>{t}</span>
          })}
          {extra > 0 && (
            <span style={{fontSize:12,fontWeight:600,padding:'4px 12px',borderRadius:20,background:'rgba(139,69,19,.04)',border:'1px solid var(--borderx)',color:'var(--muted2)'}}>
              +{extra} autres
            </span>
          )}
        </div>
      )}
    </div>
  )
}

/* ══ DONNÉES FORMATION ══ */
const formations = [
  { year:'2022 — 2027', title:'Diplôme d\'Ingénieur : IA / Data Science - Systèmes Industriels', school:'ENSAM Meknès, Maroc', desc:'Formation en ML, deep learning, Big Data, MLOps et déploiement de systèmes intelligents en production.' },
  { year:'2022 — 2024', title:'Classes Préparatoires Integrés', school:'ENSAM-Meknès, Maroc', desc:'Formation intensive en mathématiques, physique et sciences de l\'ingénieur. Base solide en algorithmique et analyse numérique.' },
  { year:'2021', title:'Diplôme du Baccalaureat en Série S', school:'Lycée Cheikh Hamidou Kane de Mbao', desc:'Formation en série scientifique au Lycée de Mbao.' },
]

/* ══ DONNÉES COMPÉTENCES ══ */
const groups = [
  { title:'IA & Machine Learning', type:'bars', items:[{label:'Machine Learning',pct:95},{label:'Deep Learning',pct:85},{label:'NLP & LLMs',pct:80},{label:'Data Science',pct:92},{label:'Computer Vision',pct:82}] },
  { title:'Frontend', type:'logos', items:[{ label: 'React', pct: 75, logo: <img src="/React.webp" alt="ReactJs" style={{ width: 18, height: 18 }} /> },{label:'Next.js',pct:75,logo:<NX/>},{ label: 'HTML5', pct: 75, logo: <img src="/html.webp" alt="HTML5" style={{ width: 19, height: 19 }} /> },{label:'JavaScript',pct:80,logo:<JS/>},{ label: 'TailwindCSS', pct: 75, logo: <img src="/css.webp" alt="TailwindCSS" style={{ width: 18, height: 18 }} /> }] },
{
  title: 'Backend',
  type: 'logos',
  items: [
    { label: 'Node.js', pct: 78, logo: <NODE_/> },
    { label: 'Django', pct: 75, logo: <img src="/django.png" alt="Django" style={{ width: 18, height: 18 }} /> },
    { label: 'Flask', pct: 80, logo: <img src="/Flask.avif" alt="Flask" style={{ width: 18, height: 18 }} /> },
    { label: 'FastAPI', pct: 82, logo: <FAPI/> },
    { label: 'SQL / NoSQL', pct: 80, logo: <SQL_/> }
  ]
},  { title:'Cloud & DevOps', type:'logos', items:[{ label: 'Docker', pct: 75, logo: <img src="/docker.jpeg" alt="Docker" style={{ width: 20, height: 20 }} /> },{label:'Git / GitHub',pct:90,logo:<GH_/>},{label:'AWS / Cloud',pct:65,logo:<AWS_/>},{ label: 'azure', pct: 75, logo: <img src="/azure.jpg" alt="azure" style={{ width: 20, height: 20 }} /> },{label:'Kubernetes',pct:58,logo:<K8S_/>}] },
]

/* ══ CERTIFICATIONS — structure exacte de la capture ══ */
const certDomains = [
  { domain:'ML & Data Science', color:'var(--c1)', certs:[
    { type:'Certification', title:'Associate Data Analyst in Python', org:'DataCamp', desc:'Spécialisation en 3 cours couvrant supervised learning, unsupervised learning et RL.', year:'2025', hours:'36 Heures', file:'/analyst.pdf' },
    { type:'Certification', title:'Associate Data Scientist in Python', org:'DataCamp', desc:'Formation avancée sur les architectures Transformer, BERT, GPT et leurs applications NLP.', year:'2025', hours:'90 Heures', file:null as string|null },
    { type:'Certification', title:'Associate ML Scientist in Python', org:'Datacamp', desc:'Spécialisation Deep Learning — CNN, RNN, Optimization et structuration de projets ML.', year:'2026', hours:'85 Heures', file:null as string|null },
    { type:'Certification', title:'OCI Data Science Professional', org:'Oracle', desc:'Certification délivrée par Oracle Cloud Infrastructor : De l\'exploration des données jusqu\'au déploiement des modèles', year:'2025', hours:'-', file:'/OCI.jpg' },
  ]},
  { domain:'Data Engineering', color:'var(--c1)', certs:[
    { type:'Certification', title:'Associate Data Engineer in Python', org:'DataCamp', desc:'Programme de 8 cours couvrant l\'analyse de données avec SQL, R, Tableau et Google Sheets.', year:'2025', hours:'40 Heures', file:null as string|null },
    { type:'Certification', title:'Associate ML Engineer & MLOps', org:'DataCamp', desc:'Certification couvrant l\'apprentissage supervisée, concepts et déploiement MLOps, Dockerisation, Monitoring et CI/CD', year:'2026', hours:'44 Heures', file:null as string|null },
  ]},
  { domain:'LLMs & Cloud/DevOps', color:'var(--c1)', certs:[
    { type:'Certification', title:'Associate AI Engineer for Data Scientists', org:'DataCamp', desc:'Certification fondamentale AWS couvrant les services cloud, la sécurité et l\'architecture.', year:'2026', hours:'40 Heures', file:null as string|null },
    { type:'Certification', title:'Microsoft Azure Developer Associate', org:'DataCamp', desc:'Certification fondamentale AWS couvrant les services cloud, la sécurité et l\'architecture.', year:'2026', hours:'21 Heures', file:null as string|null },
  ]},
]

/* ══ LIGHTBOX ══ */
function Lightbox({ cert, onClose }: { cert:{title:string;file:string}; onClose:()=>void }) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(44,26,14,.85)',zIndex:600,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={onClose}>
      <div style={{background:'var(--card)',borderRadius:16,overflow:'hidden',maxWidth:700,width:'100%'}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:'14px 20px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontFamily:'var(--ff)',fontSize:15,fontWeight:800}}>{cert.title}</span>
          <button onClick={onClose} style={{background:'transparent',border:'1px solid var(--borderx)',borderRadius:7,width:30,height:30,cursor:'pointer',fontSize:16,color:'var(--muted2)'}}>✕</button>
        </div>
        <div style={{padding:20,textAlign:'center',background:'var(--bg2)'}}>
          {cert.file.toLowerCase().endsWith('.pdf')
            ? <iframe src={cert.file} style={{width:'100%',height:500,border:'none',borderRadius:8}} title={cert.title}/>
            : <img src={cert.file} alt={cert.title} style={{maxWidth:'100%',maxHeight:500,borderRadius:8,objectFit:'contain'}}/>
          }
        </div>
        <div style={{padding:'12px 20px',display:'flex',gap:10,justifyContent:'flex-end'}}>
          <a href={cert.file} download style={{padding:'9px 18px',borderRadius:8,background:'var(--c1)',color:'#fff',fontSize:12,fontWeight:700,textDecoration:'none',fontFamily:'var(--ff)'}}>⬇ Télécharger</a>
          <button onClick={onClose} style={{padding:'9px 18px',borderRadius:8,background:'transparent',color:'var(--muted2)',border:'1px solid var(--borderx)',fontSize:12,cursor:'pointer'}}>Fermer</button>
        </div>
      </div>
    </div>
  )
}

/* ══ TABS ══ */
type TabId = 'exp'|'formation'|'competences'|'certifications'|'apropos'
const tabs: {id:TabId;label:string;icon:React.ReactNode}[] = [
  {id:'exp',label:'Expérience',icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>},
  {id:'formation',label:'Formation',icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>},
  {id:'competences',label:'Compétences',icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>},
  {id:'certifications',label:'Certifications',icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>},
  {id:'apropos',label:'À Propos',icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>},
]

export default function PageCompetences({ goPage }: { goPage: (id: PageId) => void }) {
  const [tab, setTab] = useState<TabId>('exp')
  const [activeBars, setActiveBars] = useState(false)
  const [lightbox, setLightbox] = useState<{title:string;file:string}|null>(null)
  const isMobile = useIsMobile()

  /* Animation barres : reset + trigger à CHAQUE clic sur l'onglet Compétences */
  function handleTabClick(id: TabId) {
    if (id === 'competences') {
      setActiveBars(false)
      setTab(id)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setActiveBars(true))
      })
    } else {
      setTab(id)
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="sec-badge" style={{margin:'0 auto 18px'}}><span className="sec-badge-dot"/>Mon Parcours</div>
        <div className="sec-title" style={{textAlign:'center'}}>Expérience & <em>Compétences</em></div>
        <p className="sec-desc">Découvrez mon parcours professionnel, mes formations et les technologies que je maîtrise pour créer des solutions innovantes.</p>
        <div className="sec-line"/>
      </div>
      <div style={{height:28}}/>

      {/* TABS BAR — scroll horizontal sur mobile */}
      <div className="tabs-scroll-wrap">
        <div className="tabs-bar">
          {tabs.map(t => (
            <button key={t.id} className={`tab-btn${tab===t.id?' active':''}`} onClick={() => handleTabClick(t.id)} style={{ fontSize: '16px', fontWeight: 600 }} >
              <div className="tab-ico">{t.icon}</div>{t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── EXPÉRIENCE — grille 2 colonnes de cartes ── */}
      {tab === 'exp' && (
        <div className="tab-pane active">
          <div className="pane-title" style={{textAlign:"center"}}>Mon Expérience</div>
          <p className="pane-sub" style={{textAlign:"center"}}>Avec 3 années d'expérience dans le domaine des technologies de l'information, j'ai eu l'opportunité de travailler sur des projets variés et stimulants.</p>
          <div style={{display:"grid",gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",gap: isMobile ? 14 : 20,maxWidth:1150,margin:"0 auto"}}>
            {experiences.map((exp,i) => <ExpCard key={i} exp={exp} />)}
          </div>
        </div>
      )}

      {/* ── FORMATION — grille 2×2 centrée ── */}
      {tab === 'formation' && (
  <div className="tab-pane active">
    <div className="pane-title" style={{textAlign:"center"}}>Ma Formation</div>
    <p className="pane-sub" style={{textAlign:"center"}}>Un parcours académique solide en mathématiques et ingénierie, orienté vers l'intelligence artificielle.</p>
    <div style={{maxWidth:1000, margin:'0 auto'}}>
      <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 14 : 20}}>
        {formations.map((f, i) => (
          <div key={i} style={{
            background: 'var(--card)',
            border: '1px solid var(--borderx)',
            borderRadius: 14,
            padding: '20px 22px',
            transition: '.2s',
          }}>
            {/* TOP : badge + date */}
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <span style={{width:8, height:8, borderRadius:'50%', background:'var(--c1)', display:'inline-block'}}/>
                <span style={{fontSize:12, fontWeight:700, padding:'3px 12px', borderRadius:20, background:'rgba(139,69,19,.15)', color:'var(--c1)', border:'1px solid rgba(139,69,19,.2)'}}>
                  Formation
                </span>
              </div>
              <span style={{fontSize:13, fontWeight:700, color:'var(--c1)'}}>{f.year}</span>
            </div>
            {/* Titre */}
            <div style={{fontFamily:'var(--ff)', fontSize:18, fontWeight:800, marginBottom:6, marginTop:8, color:'var(--c1)'}}>
              {f.title}
            </div>
            {/* École */}
            <div style={{display:'flex', alignItems:'center', gap:7, marginBottom:10, fontSize:13, color:'var(--muted2)'}}>
              <span style={{width:7, height:7, borderRadius:'50%', background:'var(--c1)', display:'inline-block'}}/>
              {f.school}
            </div>
            {/* Description */}
            <p style={{fontSize:13, color:'var(--muted2)', lineHeight:1.7, marginBottom:0}}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

      {/* ── COMPÉTENCES — SANS cartes englobantes, titres centrés, animation à chaque clic ── */}
      {tab === 'competences' && (
        <div className="tab-pane active">
          <div className="pane-title" style={{textAlign:'center'}}>Mes Compétences</div>
          <p className="pane-sub" style={{textAlign:'center',marginBottom:36}}>Un stack technique polyvalent couvrant l'IA, le développement et l'infrastructure cloud.</p>

          {groups.map(g => (
            <div key={g.title} style={{marginBottom:44}}>
              {/* Titre centré, grande police */}
              <h3 style={{fontFamily:'var(--ff)',fontSize:20,fontWeight:800,textAlign:'center',color:'var(--c1)',marginBottom:24,letterSpacing:.5}}>
                {g.title}
              </h3>

              {g.type === 'bars' ? (
                /* Barres SANS cartes englobantes — juste les lignes */
                <div style={{maxWidth:700,margin:'0 auto',display:'flex',flexDirection:'column',gap:14}}>
                  {g.items.map(s => (
                    <div key={s.label}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                        <span style={{fontSize:13,color:'var(--text)',fontWeight:600}}>{s.label}</span>
                        <span style={{fontSize:12,color:'var(--c1)',fontWeight:700}}>{s.pct}%</span>
                      </div>
                      <div style={{height:6,background:"var(--borderx)",borderRadius:3,overflow:"hidden"}}>
                        <div style={{
                          height:"100%",borderRadius:3,
                          background:"linear-gradient(90deg,#00C853,#00B0CC)",
                          width: activeBars ? `${s.pct}%` : "0%",
                          transition:"width 1s ease",
                        }}/>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Logos SANS cartes englobantes — grille de mini-items */
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:18,maxWidth:960,margin:"0 auto"}}>
                  {g.items.map((s: any) => (
                    <div key={s.label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:"16px 10px",textAlign:"center"}}>
                      <div style={{transform:"scale(3)",transformOrigin:"center",margin:"16px 0"}}>{s.logo}</div>
                      <span style={{fontSize:13,fontWeight:700,color:"var(--text)",fontFamily:"var(--fb)",marginTop:4}}>{s.label}</span>
                      <div style={{width:"100%",height:5,background:"var(--borderx)",borderRadius:3,overflow:"hidden"}}>
                        <div style={{
                          height:"100%",borderRadius:3,
                          background:"linear-gradient(90deg,#00C853,#00B0CC)",
                          width: activeBars ? `${s.pct}%` : "0%",
                          transition:"width 1s ease",
                        }}/>
                      </div>
                      <span style={{fontSize:12,color:"#00C853",fontWeight:700}}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── CERTIFICATIONS — exactement comme la capture ── */}
      {tab === 'certifications' && (
        <div className="tab-pane active">
          <div className="pane-title" style={{textAlign:'center'}}>Mes Certifications</div>
          <p className="pane-sub" style={{textAlign:'center'}}>Apprendre sans cesse, certifier sans relâche : voilà comment je maintiens mon niveau d’expertise au plus haut.</p>

          {certDomains.map((d,di) => (
            <div key={di} style={{marginBottom:36}}>
              {/* Titre domaine — centré, couleur accent, comme la capture */}
              <h3 style={{fontFamily:'var(--ff)',fontSize:20,fontWeight:800,textAlign:'center',color:d.color,marginBottom:20}}>{d.domain}</h3>

              {/* Grille 2 colonnes — cartes comme la capture */}
              <div style={{display:'grid',gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',gap: isMobile ? 12 : 16,maxWidth:1000,margin:'0 auto'}}>
                {d.certs.map((cert,ci) => (
                  <div key={ci} style={{
                    background:'var(--card)',border:'1px solid var(--borderx)',
                    borderRadius:14,padding:'20px 22px',
                    transition:'.2s',position:'relative',
                  }}>
                    {/* TOP: point + badge type + heures */}
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{width:8,height:8,borderRadius:'50%',background:'var(--c1)',display:'inline-block',flexShrink:0}}/>
                        <span style={{fontSize:11,fontWeight:600,padding:'3px 11px',borderRadius:20,background:'rgba(139,69,19,.12)',color:'var(--c1)',border:'1px solid rgba(139,69,19,.2)'}}>{cert.type}</span>
                      </div>
                      {cert.hours && (
                        <span style={{fontSize:12,fontWeight:700,color: '#ea580c'}}>{cert.hours}</span>
                      )}
                    </div>
                    {/* TITRE */}
                    <div style={{fontFamily:'var(--ff)',fontSize:16,fontWeight:800,marginBottom:6,lineHeight:1.3,color:'var(--text)'}}>{cert.title}</div>
                    {/* ORG */}
                    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8,fontSize:12,color:'var(--muted2)'}}>
                      <span style={{width:6,height:6,borderRadius:'50%',background:'var(--c1)',display:'inline-block',flexShrink:0}}/>
                      {cert.org}
                    </div>
                    {/* DESC */}
                    <p style={{fontSize:12,color:'var(--muted2)',lineHeight:1.65,marginBottom:14}}>{cert.desc}</p>
                    {/* BOUTON VOIR — ouvre le PDF dans un nouvel onglet comme le CV */}
                    <button
  onClick={() => cert.file && window.open(cert.file, '_blank')}
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 14px',
    borderRadius: 8,
    cursor: cert.file ? 'pointer' : 'not-allowed',
    background: cert.file ? 'rgba(139,69,19,.08)' : 'var(--card2)',
    color: cert.file ? 'var(--c1)' : 'var(--muted)',
    border: `1px solid ${cert.file ? 'rgba(139,69,19,.2)' : 'var(--borderx)'}`,
    fontFamily: 'var(--fb)',
    transition: '.2s',
  }}
>
  {cert.file ? (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v13M7 11l5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
      Voir le certificat
    </>
  ) : (
    'Certificat non disponible'
  )}
</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── À PROPOS ── */}
{tab === 'apropos' && (
  <div className="tab-pane active">
    <div className="pane-title" style={{textAlign:"center"}}>À Propos de Moi</div>
    <p className="pane-sub" style={{textAlign:"center",maxWidth:780,margin:'0 auto 6px'}}>
      Je suis un élève Ingénieur en IA/Data Science-Systèmes Industriels à l'ENSAM-Meknès. Passionné par l'innovation technologique, je suis toujours en quête de nouvelles opportunités pour apprendre, expérimenter et contribuer à des projets significatifs. Par ailleurs, j'exerce également dans le domaine du développement web avec des technologies modernes faisant de moi un atout précieux et polyvalent pour votre équipe.
    </p>
    <p className="pane-sub" style={{textAlign:"center",maxWidth:780,margin:'0 auto 36px'}}> N'hésitez pas à me rejoindre dans cette aventure excitante où la collaboration et l'innovation redéfinissent les limites du possible.</p>

    <div style={{display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 16, maxWidth:940, margin:'0 auto'}}>
      {[
        { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, label:'Nom', value:'Souleymane DIALLO' },
        { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, label:"Téléphone", value:'0669275436' },
        { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label:'Adresse', value:'Meknès, Maroc' },
        { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:'Email', value:'diallosouleymane2026@hotmail.com' },
        { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, label:'Langues', value:'Français, Anglais' },
        { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, label:'Collaboration', value:'Disponible' },
      ].map(({ icon, label, value }) => (
        <div key={label} style={{
          background:'var(--card)',
          border:'1px solid var(--borderx)',
          borderRadius:14,
          padding:'18px 22px',
          display:'flex',
          alignItems:'center',
          gap:16,
          transition:'.2s',
        }}>
          <div style={{
            width:46, height:46, borderRadius:12, flexShrink:0,
            background:'rgba(139,69,19,.12)',
            border:'1px solid rgba(139,69,19,.2)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'var(--c1)',
          }}>
            {icon}
          </div>
          <div>
            <div style={{fontSize:12, color:'var(--muted2)', marginBottom:4}}>{label}</div>
            <div style={{fontSize:14, fontWeight:700, color:'var(--text)', fontFamily:'var(--fb)', wordBreak:'break-all', overflowWrap:'anywhere'}}>{value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      {/* ── CTA — Prêt à démarrer ── */}
<div className="svc-cta" style={{marginTop:32, maxWidth:1000, margin:'32px auto 0'}}>
  <h3>Prêt à démarrer votre projet ?</h3>
  <p>Discutons de vos besoins et trouvons ensemble la solution technologique parfaitement adaptée à vos objectifs.</p>
  <div className="svc-cta-btns">
    <button className="btn-pri" onClick={() => goPage('contact')}>Demander un devis</button>
    <button className="btn-sec" onClick={() => goPage('realisations')}>Voir mes réalisations →</button>
  </div>
</div>

      <div style={{height:40}}/>
      {lightbox && <Lightbox cert={lightbox} onClose={() => setLightbox(null)} />}
    </>
  )
}
