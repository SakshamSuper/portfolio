'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenAiAssistant: () => void;
  onScrollToProjects: () => void;
  onScrollToContact: () => void;
}

const TECH_ICONS: { src?: string; label: string; isConcept?: boolean; color?: string; renderSvg?: () => React.ReactNode }[] = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', label: 'Python' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', label: 'C++' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', label: 'Java' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', label: 'HTML' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', label: 'CSS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', label: 'MySQL' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', label: 'TensorFlow' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', label: 'PyTorch' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', label: 'OpenCV' },
  { src: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg', label: 'Hugging Face' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', label: 'Azure' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', label: 'GitHub' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', label: 'Postman' },
  {
    label: 'LLM',
    isConcept: true,
    renderSvg: () => (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5">
        <circle cx="4" cy="6" r="2" fill="#0ea5e9" fillOpacity="0.2" />
        <circle cx="4" cy="12" r="2" fill="#0ea5e9" fillOpacity="0.2" />
        <circle cx="4" cy="18" r="2" fill="#0ea5e9" fillOpacity="0.2" />
        <circle cx="12" cy="9" r="2" fill="#0ea5e9" fillOpacity="0.2" />
        <circle cx="12" cy="15" r="2" fill="#0ea5e9" fillOpacity="0.2" />
        <circle cx="20" cy="12" r="2" fill="#0ea5e9" fillOpacity="0.2" />
        <line x1="6" y1="6" x2="10" y2="9" />
        <line x1="6" y1="12" x2="10" y2="9" />
        <line x1="6" y1="12" x2="10" y2="15" />
        <line x1="6" y1="18" x2="10" y2="15" />
        <line x1="14" y1="9" x2="18" y2="12" />
        <line x1="14" y1="15" x2="18" y2="12" />
      </svg>
    )
  },
  {
    label: 'RAG',
    isConcept: true,
    renderSvg: () => (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5">
        <path d="M4 6c0 1.66 3.58 3 8 3s8-1.34 8-3-3.58-3-8-3-8 1.34-8 3z" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        <circle cx="17" cy="17" r="3.5" />
        <line x1="19.5" y1="19.5" x2="22" y2="22" strokeWidth="2" />
      </svg>
    )
  },
  {
    label: 'API',
    isConcept: true,
    renderSvg: () => (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4M6.5 10v4M14 17.5H10M17.5 14V10" />
      </svg>
    )
  },
];

const CERTS_DATA = [
  {
    img: '/assets/ai102.png',
    fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    name: 'AI Engineer',
    fullName: 'Azure AI Engineer Associate',
    issuer: 'Microsoft',
    date: '2024',
    color: '#3b82f6',
    shadow: 'rgba(59,130,246,0.15)',
    url: 'https://learn.microsoft.com/credentials'
  },
  {
    img: '/assets/dp100.png',
    fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    name: 'Data Scientist',
    fullName: 'Azure Data Scientist Associate',
    issuer: 'Microsoft',
    date: '2024',
    color: '#3b82f6',
    shadow: 'rgba(59,130,246,0.15)',
    url: 'https://learn.microsoft.com/credentials'
  },
  {
    img: '/assets/dp600.png',
    fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    name: 'Fabric Analyst',
    fullName: 'Fabric Analytics Engineer Associate',
    issuer: 'Microsoft',
    date: '2024',
    color: '#3b82f6',
    shadow: 'rgba(59,130,246,0.15)',
    url: 'https://learn.microsoft.com/credentials'
  },
  {
    img: 'https://images.credly.com/size/340x340/images/42171545-21d3-4a11-b0be-3cd9cdb84f3e/image.png',
    fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
    name: 'Oracle OCI',
    fullName: 'OCI Foundations Associate',
    issuer: 'Oracle',
    date: '2024',
    color: '#ef4444',
    shadow: 'rgba(239,68,68,0.18)',
    url: 'https://education.oracle.com'
  },
  {
    img: 'https://images.credly.com/size/340x340/images/2237eb89-bc89-4bc2-afdf-3e61c5bc79fa/image.png',
    fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    name: 'Postman API',
    fullName: 'API Student Expert',
    issuer: 'Postman',
    date: '2024',
    color: '#f97316',
    shadow: 'rgba(249,115,22,0.18)',
    url: 'https://credentials.postman.com'
  },
];



// ── TERMINAL LOG LINES ─────────────────────────────────────────
const LOG_LINES = [
  { prefix: '✓', text: 'Azure AI Engineer Associate certified',    color: '#34D399' },
  { prefix: '✓', text: 'Azure Data Scientist Associate certified', color: '#34D399' },
  { prefix: '✓', text: 'Postman API Expert certified',             color: '#34D399' },
  { prefix: '↑', text: 'Winner: Zero-to-One Hackathon (CU)',       color: '#FBBF24' },
  { prefix: '↑', text: 'Runner-Up: HackLLM @ IIIT Delhi',         color: '#FBBF24' },
  { prefix: '→', text: 'Microsoft Learn Student Ambassador',       color: '#94A3B8' },
  { prefix: '→', text: 'GSSoC Open Source Contributor',            color: '#94A3B8' },
  { prefix: '~', text: 'CGPA 8.98 · BTech AI & Data Science',     color: '#94A3B8' },
];

// ── MINI SPARKLINE CHART ───────────────────────────────────────
const SparkLine = ({ pts, color }: { pts: number[]; color: string }) => {
  const max = Math.max(...pts), min = Math.min(...pts);
  const norm = pts.map(v => 1 - (v - min) / (max - min || 1));
  const w = 80, h = 24;
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w);
  const ys = norm.map(v => v * (h - 4) + 2);
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="2" fill={color} />
    </svg>
  );
};

// ── METRICS CARDS (right panel top row) ───────────────────────
const METRIC_CARDS = [
  {
    label: 'CGPA Score',
    value: '8.98',
    sub: 'Top 1% · GGSIPU',
    color: '#F8FAFC',
    pts: [7.2, 7.8, 8.1, 8.4, 8.6, 8.8, 8.9, 8.98],
    badge: '↑ Consistent',
  },
  {
    label: 'Hackathon Wins',
    value: '1st + 2nd',
    sub: '600+ teams beaten',
    color: '#FBBF24',
    pts: [1, 2, 2, 3, 3, 4, 5, 6],
    badge: '🏆 National',
  },
];

export const Hero: React.FC<HeroProps> = ({ onScrollToProjects, onScrollToContact }) => {
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [blink, setBlink] = useState(true);
  const [activeCert, setActiveCert] = useState<number>(0);
  const animated = useRef(false);

  const handleConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#FBBF24', '#0EA5E9', '#FFFFFF'],
    });
  };

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;



    // Terminal log reveal — stagger each line
    LOG_LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLogs(i + 1), 400 + i * 280);
    });
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative w-full min-h-screen flex flex-col" style={{
      background: 'transparent'
    }}>

      {/* ── BACKGROUND GLOWS ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,192,168,0.06) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '550px', height: '550px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,227,213,0.03) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '-5%', right: '20%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,192,168,0.04) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* ── HERO BODY ── */}
      <div className="relative z-10 flex-1 flex items-center w-full px-6 md:px-12 lg:px-16 pt-10 pb-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_620px] xl:grid-cols-[1fr_700px] gap-8 items-center max-w-7xl mx-auto">

          {/* ────────── LEFT: TEXT ────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }
              }
            }}
            className="flex flex-col items-start max-w-2xl lg:pr-4"
          >
            {/* Title */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="font-bold text-white tracking-tight leading-[1.08] mb-4 flex items-baseline gap-2 flex-wrap"
              style={{ fontSize: 'clamp(3rem, 5.5vw, 4.6rem)' }}
            >
              <span>Hi, I&apos;m</span>
              <br className="sm:hidden" />
              <span style={{
                background: 'linear-gradient(125deg, #F8FAFC 0%, #F8FAFC 45%, #94A3B8 75%, #64748B 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Saksham Aggarwal
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-slate-400 text-base sm:text-[18.5px] leading-relaxed mb-6 max-w-xl"
            >
              Building intelligent systems that solve real-world problems{' '}
              through <span className="text-slate-200 font-semibold">Machine Learning</span>,{' '}
              <span className="text-slate-200 font-semibold">Computer Vision</span>, and{' '}
              <span className="text-slate-200 font-semibold">Data Science</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="flex flex-wrap gap-4 mb-6"
            >
              <button
                onClick={onScrollToProjects}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#2a2820,#1a1814)', boxShadow: '0 0 28px rgba(255,255,255,0.05)' }}
              >
                View My Projects <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onScrollToContact}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-slate-300 text-sm border border-white/12 bg-white/4 hover:bg-white/8 hover:border-white/20 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Let&apos;s Connect <Send className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Tech Icons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="mt-5"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]/60 font-bold mb-2">Trusted by technologies</p>
              <div className="flex flex-wrap gap-3.5 items-center">
                {TECH_ICONS.map((item) => {
                  const isGithub = item.label === 'GitHub';
                  const isMySQL = item.label === 'MySQL';
                  const isHuggingFace = item.label === 'Hugging Face';
                  return (
                    <div key={item.label} className="group relative">
                      {/* Squircle container */}
                      <div className="w-13 h-13 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/20 group-hover:scale-110 shadow-lg">
                        {item.isConcept ? (
                          item.renderSvg ? (
                            item.renderSvg()
                          ) : (
                            <span className="text-[10.5px] font-black font-mono leading-none tracking-widest select-none transition-colors"
                              style={{ color: item.color || '#0ea5e9' }}>
                              {item.label}
                            </span>
                          )
                        ) : (
                          <img
                            src={item.src}
                            alt={item.label}
                            style={{
                              filter: isGithub 
                                ? 'brightness(0) invert(1)' 
                                : isMySQL 
                                  ? 'brightness(1.3) drop-shadow(0 0 6px rgba(0, 117, 143, 0.4))'
                                  : isHuggingFace
                                    ? 'drop-shadow(0 0 4px rgba(255, 214, 94, 0.25))'
                                    : 'none'
                            }}
                            className={`w-7 h-7 object-contain transition-all duration-300 ${
                              isGithub ? 'opacity-80 group-hover:opacity-100' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                            }`}
                          />
                        )}
                      </div>
                      
                      {/* Tooltip */}
                      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[#070708] border border-white/10 text-[9px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 shadow-md">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* ────────── RIGHT: PREMIUM DASHBOARD ────────── */}
          <div className="relative flex flex-col gap-2.5" style={{ minHeight: '525px' }}>

            {/* ── TOP ROW: Profile card + Metric cards ── */}
            <div className="grid grid-cols-12 gap-2.5 flex-1 min-h-0">

              {/* Profile Card */}
              <div
                className="col-span-4 relative flex flex-col overflow-hidden rounded-2xl border border-white/8"
                style={{
                  background: 'linear-gradient(180deg, rgba(14,14,18,0.9) 0%, rgba(6,6,8,0.99) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.85), inset 0 1px 0 rgba(232,227,213,0.05)',
                }}
              >
                {/* Bone top accent bar */}
                <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #F8FAFC, #F8FAFC, transparent)' }} />

                {/* Photo */}
                <div className="relative flex-1 overflow-hidden">
                  <Image src="/assets/portrait.png" alt="Saksham Aggarwal" fill priority
                    className="object-cover object-top" sizes="220px" />
                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-20"
                    style={{ background: 'linear-gradient(transparent, rgba(12,12,16,0.98))' }} />
                </div>

                {/* Name & status at bottom */}
                <div className="px-4 pb-4 -mt-6 relative z-10">
                  <div className="text-sm font-bold text-white leading-tight">Saksham</div>
                  <div className="text-xs text-slate-400 leading-tight mb-2.5">Aggarwal</div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9.5px] font-bold text-emerald-400">Available</span>
                  </div>
                </div>
              </div>

              {/* Right column — 2 custom cards */}
              <div className="col-span-8 flex flex-col gap-3 min-w-0">

                {/* ── CARD 1: Verified Certifications ── */}
                <div className="flex-1 rounded-2xl border border-white/8 px-4 py-3 flex flex-col justify-between overflow-hidden relative group"
                  style={{ background: 'rgba(10,10,12,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
                  
                  {/* Dynamic background spotlight matching active cert brand color */}
                  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.09] transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(140px circle at 50% 10%, ${CERTS_DATA[activeCert].color}, transparent 80%)`
                    }} 
                  />

                  {/* Header */}
                  <div className="flex items-center justify-between mb-1.5 z-10">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Verified Credentials</div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border transition-all duration-300"
                      style={{ color: CERTS_DATA[activeCert].color, borderColor: `${CERTS_DATA[activeCert].color}40`, background: `${CERTS_DATA[activeCert].color}12` }}>
                      {CERTS_DATA[activeCert].issuer}
                    </span>
                  </div>

                  {/* Squircle Badges */}
                  <div className="grid grid-cols-5 gap-2.5 items-start my-1.5 z-10">
                    {CERTS_DATA.map((cert, index) => {
                      const isActive = activeCert === index;
                      return (
                        <button
                          key={cert.name}
                          type="button"
                          onMouseEnter={() => setActiveCert(index)}
                          onClick={() => setActiveCert(index)}
                          className="flex flex-col items-center focus:outline-none group/btn cursor-pointer"
                        >
                          <div className={`relative w-[60px] h-[60px] rounded-xl overflow-hidden border flex items-center justify-center transition-all duration-300 ${
                            isActive ? 'scale-110 border-white/30 bg-[#0a0a0d]' : 'border-white/5 bg-black/40 opacity-50 group-hover/btn:opacity-100 group-hover/btn:scale-105'
                          }`}
                            style={{ boxShadow: isActive ? `0 0 14px ${cert.shadow}` : 'none' }}>
                            <img
                              src={cert.img}
                              alt={cert.name}
                              className="w-11 h-11 object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).src = cert.fallback; }}
                            />
                          </div>
                          <span className={`text-[9.5px] font-bold tracking-tight text-center leading-[1.1] mt-1.5 transition-colors duration-300 w-full ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover/btn:text-slate-200'
                          }`}>
                            {cert.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active details layout */}
                  <div className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-2.5 z-10 transition-all duration-300 flex items-center justify-between gap-2.5 mt-1">
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] sm:text-[10.5px] uppercase tracking-wider text-[#94A3B8] font-bold font-mono leading-tight">{CERTS_DATA[activeCert].fullName}</div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase mt-1 leading-none">
                        Certified · {CERTS_DATA[activeCert].date}
                      </div>
                    </div>
                    <a
                      href={CERTS_DATA[activeCert].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center justify-center text-[9.5px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-white hover:bg-[#0ea5e9]/10 hover:border-[#0ea5e9]/30 hover:text-[#0ea5e9] transition-all duration-200"
                    >
                      Verify
                    </a>
                  </div>

                </div>

                {/* ── CARD 2: Hackathon Wins ── */}
                <div 
                  onClick={handleConfetti}
                  className="flex-1 rounded-2xl border border-white/5 overflow-hidden px-4 py-2.5 flex flex-col justify-between group cursor-pointer hover:border-amber-500/25 active:scale-[0.99] transition-all duration-300 relative"
                  style={{
                    background: 'rgba(12,10,6,0.95)',
                    borderColor: 'rgba(251,191,36,0.08)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
                  }}>

                  {/* Sparkle background glow on hover */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(130px circle at 50% 50%, #FBBF24, transparent 80%)'
                    }} 
                  />

                  {/* Header */}
                  <div className="flex items-center justify-between mb-2 z-10">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-amber-500/80 group-hover:text-amber-400 transition-colors">Hackathon Wins</div>
                    <span className="inline-flex items-center text-[9.5px] font-extrabold px-3.5 py-1.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10 group-hover:bg-amber-500/15 transition-all shadow-[0_0_10px_rgba(251,191,36,0.1)]">
                      Celebrate 🎉
                    </span>
                  </div>

                  {/* Win list */}
                  <div className="space-y-2 z-10">
                    {/* ── WIN 1 ── */}
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl border bg-amber-500/[0.04] border-amber-500/15 group-hover:border-amber-500/25 transition-all duration-300">
                      <div className="text-xl leading-none drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] shrink-0">🏆</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold font-mono text-amber-400">1st Place</span>
                          <span className="text-[9px] px-2 py-0.5 rounded font-black bg-amber-500/10 text-amber-500">600+ Teams</span>
                        </div>
                        <div className="text-[10.5px] text-slate-350 font-bold leading-tight mt-0.5">Zero to One · CU</div>
                      </div>
                    </div>

                    {/* ── WIN 2 ── */}
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl border bg-slate-400/[0.02] border-white/5 group-hover:border-white/10 transition-all duration-300">
                      <div className="text-xl leading-none shrink-0" style={{ filter: 'drop-shadow(0 0 6px rgba(192,192,192,0.4))' }}>🥈</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-bold font-mono text-slate-300">Runner-Up</span>
                          <span className="text-[9px] px-2 py-0.5 rounded font-black bg-slate-500/10 text-slate-400">HackLLM</span>
                        </div>
                        <div className="text-[10.5px] text-slate-400 font-bold leading-tight mt-0.5">IIIT Delhi</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* ── BOTTOM: Terminal Activity Log ── */}
            <div
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{
                background: 'rgba(10,10,14,0.97)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] text-slate-600 font-mono ml-1">saksham@portfolio ~ achievements</span>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[9px] text-emerald-500 font-mono">LIVE</span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="px-4 py-2 font-mono space-y-0.5" style={{ minHeight: '124px' }}>
                {LOG_LINES.map((line, i) => (
                  <div key={i}
                    className="flex items-center gap-2 text-[11px] leading-relaxed transition-all duration-300"
                    style={{
                      opacity: visibleLogs > i ? 1 : 0,
                      transform: visibleLogs > i ? 'translateY(0)' : 'translateY(4px)',
                    }}
                  >
                    <span style={{ color: line.color }} className="shrink-0 w-3 text-center">{line.prefix}</span>
                    <span className="text-slate-400">{line.text}</span>
                  </div>
                ))}
                {/* Blinking cursor */}
                {visibleLogs < LOG_LINES.length && (
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-600 w-3 text-center">›</span>
                    <span className="text-slate-600">loading</span>
                    <span style={{ opacity: blink ? 1 : 0, color: '#F8FAFC' }}>█</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ── END RIGHT ── */}

        </div>
      </div>


    </section>
  );
};

export default Hero;
