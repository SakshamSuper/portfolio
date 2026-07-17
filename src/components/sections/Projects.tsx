'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// ── ANIMATED VISUALIZATIONS ───────────────────────────────────────

const PostureViz = ({ accent }: { accent: string }) => {
  const [angle, setAngle] = useState(164);
  useEffect(() => {
    const t = setInterval(() => setAngle(a => a === 164 ? 148 : 164), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full relative flex items-center justify-center" style={{ background: 'rgba(200,192,168,0.03)' }}>
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-[8px] font-bold text-emerald-400 uppercase tracking-wider">
        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />Live
      </div>
      <div className="absolute top-2 right-2 bg-black/60 border border-white/10 rounded px-2 py-0.5 text-[8px] font-mono">
        <span className="text-white/50">Shoulder </span>
        <span className="font-bold" style={{ color: accent }}>{angle}°</span>
      </div>
      <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-90">
        <circle cx="50" cy="18" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <circle cx="50" cy="18" r="2.5" fill="rgba(255,255,255,0.25)" />
        <line x1="50" y1="28" x2="50" y2="62" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        <line x1="50" y1="36" x2="28" y2="50" stroke={accent} strokeWidth="2" strokeLinecap="round" style={{ transition: 'all 0.6s ease' }} />
        <line x1="28" y1="50" x2="16" y2="70" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="36" x2="72" y2="50" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <line x1="72" y1="50" x2="84" y2="70" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="36" r="3" fill="#8B5CF6" />
        <circle cx="28" cy="50" r="2.5" fill="#8B5CF6" />
        <circle cx="72" cy="50" r="2.5" fill="#8B5CF6" />
      </svg>
      <div className="absolute bottom-2 left-2 bg-black/60 border border-white/8 rounded px-2 py-0.5 text-[8px] font-mono text-emerald-400">
        Posture: <span className="font-bold">Good ✓</span>
      </div>
      <div className="absolute bottom-2 right-2 bg-black/60 border border-white/8 rounded px-2 py-0.5 text-[8px] font-mono text-white/40">
        Reps: <span className="text-white font-bold">12/15</span>
      </div>
    </div>
  );
};

const CryptoViz = ({ accent }: { accent: string }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setOffset(o => (o + 1) % 20), 60);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full relative flex items-center justify-center" style={{ background: 'rgba(168,160,144,0.03)' }}>
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-[8px] font-bold text-emerald-400 uppercase tracking-wider">
        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />Live
      </div>
      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center font-black text-white text-[11px] shadow-[0_0_10px_rgba(245,158,11,0.5)]">₿</div>
      <svg viewBox="0 0 120 50" className="w-[85%] h-20">
        <defs>
          <linearGradient id="cg-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 38 Q18 12 36 28 T72 14 T108 32 T120 10" fill="url(#cg-p)" />
        <path d="M0 38 Q18 12 36 28 T72 14 T108 32 T120 10" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <circle cx="120" cy="10" r="3" fill={accent} />
      </svg>
      <div className="absolute bottom-2 left-2 bg-black/60 border border-white/8 rounded px-2 py-0.5 text-[8px] font-mono text-white/40">
        Model: <span style={{ color: accent }} className="font-bold">XGBoost</span>
      </div>
      <div className="absolute bottom-2 right-2 bg-black/60 border border-white/8 rounded px-2 py-0.5 text-[8px] font-mono text-emerald-400 font-bold">R²: 0.93</div>
    </div>
  );
};

const ReportViz = ({ accent }: { accent: string }) => {
  const [step, setStep] = useState(0);
  const steps = ['Parsing PDF...', 'Extracting XML...', 'Validating JSON...', 'Agent Done ✓'];
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % steps.length), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full relative flex items-center justify-center px-4" style={{ background: 'rgba(245,158,11,0.03)' }}>
      <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-[8px] font-bold text-[#0EA5E9] uppercase tracking-wider">
        <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />Agentic
      </div>
      <div className="w-full space-y-1.5">
        {['PDF Input', 'Claude Tool Call', 'XML Schema', 'JSON Output'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: i <= step ? accent : 'rgba(255,255,255,0.1)', boxShadow: i === step ? `0 0 6px ${accent}` : 'none', transition: 'all 0.4s' }} />
            <div className="flex-1 h-1 rounded-full overflow-hidden bg-white/5">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: i < step ? '100%' : i === step ? '60%' : '0%', background: accent, opacity: 0.7 }} />
            </div>
            <span className="text-[8px] font-mono text-white/30 w-14 text-right truncate">{label}</span>
          </div>
        ))}
        <div className="text-center text-[8px] font-mono mt-1 transition-all" style={{ color: accent }}>{steps[step]}</div>
      </div>
    </div>
  );
};

const TrafficViz = ({ accent }: { accent: string }) => (
  <div className="w-full h-full relative flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.03)' }}>
    <div className="absolute top-2 left-2 px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[8px] font-bold text-white/30 uppercase tracking-wider">Coming Soon</div>
    <svg viewBox="0 0 120 60" className="w-[88%] h-20">
      <line x1="12" y1="60" x2="54" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
      <line x1="60" y1="60" x2="60" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="108" y1="60" x2="66" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
      <rect x="26" y="28" width="20" height="14" rx="1" fill="none" stroke={accent} strokeWidth="1.5" />
      <text x="28" y="26" fill={accent} fontSize="4.5" fontFamily="monospace">Car 98%</text>
      <rect x="70" y="12" width="15" height="11" rx="1" fill="none" stroke="#8B5CF6" strokeWidth="1.2" />
      <text x="71" y="10" fill="#8B5CF6" fontSize="3.5" fontFamily="monospace">Truck 92%</text>
    </svg>
    <div className="absolute bottom-2 left-2 bg-black/60 border border-white/8 rounded px-2 py-0.5 text-[8px] font-mono text-white/40">
      Engine: <span style={{ color: accent }} className="font-bold">YOLOv8</span>
    </div>
  </div>
);

// ── PROJECT DATA ──────────────────────────────────────────────────
const PROJECTS = [
  {
    num: '01', tag: 'COMPUTER VISION · AI',
    title: 'AI POSTURE ANALYSIS SYSTEM',
    desc: 'Real-time posture detection & joint-angle estimation using MediaPipe. ~90% tracking accuracy with live rep counting across 10+ exercises.',
    metrics: [{ label: 'Accuracy', value: '~90%' }, { label: 'Exercises', value: '10+' }],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'CV'],
    github: 'https://github.com/SakshamSuper',
    live: 'https://github.com/SakshamSuper',
    accent: '#06B6D4',
    gradient: 'from-[#040d14] via-[#061520] to-[#041620]',
    Viz: PostureViz,
  },
  {
    num: '02', tag: 'FINANCE · MACHINE LEARNING',
    title: 'CRYPTO MARKET ANALYSIS ENGINE',
    desc: 'EDA & ML pipeline on 5 years of Bitcoin data. Regression + classification models improving price prediction by ~60–75%. Power BI dashboards.',
    metrics: [{ label: 'Forecast Δ', value: '+60%' }, { label: 'R² Score', value: '0.93' }],
    tech: ['Python', 'ML', 'Power BI', 'SQL'],
    github: 'https://github.com/SakshamSuper',
    live: 'https://github.com/SakshamSuper',
    accent: '#8B5CF6',
    gradient: 'from-[#0d0714] via-[#130a1f] to-[#0d0718]',
    Viz: CryptoViz,
  },
  {
    num: '03', tag: 'COMPUTER VISION · YOLO',
    title: 'SMART TRAFFIC MANAGEMENT',
    desc: 'AI-powered real-time vehicle detection & traffic flow using YOLOv8 + Deep SORT. Dynamically optimizes intersection green-light intervals.',
    metrics: [{ label: 'Engine', value: 'YOLOv8' }, { label: 'Tracking', value: 'SORT' }],
    tech: ['YOLOv8', 'Deep SORT', 'OpenCV', 'Python'],
    github: 'https://github.com/SakshamSuper',
    accent: '#10B981',
    gradient: 'from-[#060f0e] via-[#07150f] to-[#060f0d]',
    comingSoon: true,
    Viz: TrafficViz,
  },
];

// ── CARD ──────────────────────────────────────────────────────────
const ProjectCard = ({ p, i }: { p: typeof PROJECTS[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative bg-gradient-to-br from-[#08080a] to-[#020202] rounded-3xl border border-white/5 overflow-hidden flex flex-col group cursor-pointer hover:border-white/12 hover:-translate-y-1 transition-all duration-300 shadow-[0_12px_42px_rgba(0,0,0,0.7)]"
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.9), 0 0 30px ${p.accent}12`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 12px 42px rgba(0,0,0,0.7)';
      }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(350px circle at 50% 10%, ${p.accent}, transparent 80%)`
        }} 
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${p.accent}60, transparent)` }} />

      {/* ── Animated Visualization ── */}
      <div className="w-full shrink-0 relative" style={{ height: '140px', background: 'rgba(0,0,0,0.45)' }}>
        <p.Viz accent={p.accent} />
      </div>

      {/* ── Body ── */}
      <div className="relative z-10 flex flex-col flex-1 p-6">

        {/* Ghost number */}
        <div className="absolute -bottom-4 right-2 font-black leading-none select-none pointer-events-none"
          style={{ fontSize: '120px', color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.05em' }}>
          {p.num}
        </div>

        {/* Tag */}
        <p className="text-[9px] font-black tracking-[0.2em] uppercase mb-3"
          style={{ color: `${p.accent}dd` }}>{p.tag}</p>

        {/* Title */}
        <h3 className="text-lg font-bold uppercase tracking-tight text-white/90 mb-3 leading-tight group-hover:text-white transition-colors">
          {p.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">{p.desc}</p>

        {/* Metrics */}
        <div className="flex gap-5 mb-5 flex-wrap">
          {p.metrics.map(m => (
            <div key={m.label} className="flex flex-col">
              <span className="text-[8px] uppercase tracking-widest text-[#94A3B8]/40 font-bold mb-1">{m.label}</span>
              <span className="text-sm font-bold font-display" style={{ color: p.accent }}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2 pt-4 border-t border-white/5 flex-wrap mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map(t => (
              <span key={t} className="text-[8px] font-mono px-2.5 py-0.5 rounded-full border border-white/5 bg-white/[0.01] text-slate-400 group-hover:text-slate-300 group-hover:border-white/10 transition-colors">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <a href={p.github} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 bg-white/3 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all">
              <GithubIcon />
            </a>
            {p.live && !p.comingSoon ? (
              <a href={p.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-black/40"
                style={{ color: p.accent, borderColor: `${p.accent}30`, background: `${p.accent}12` }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${p.accent}60`;
                  e.currentTarget.style.background = `${p.accent}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${p.accent}30`;
                  e.currentTarget.style.background = `${p.accent}12`;
                }}
              >
                View <ArrowUpRight size={10} />
              </a>
            ) : (
              <span className="text-[9px] font-bold text-white/25 border border-white/5 bg-white/[0.01] px-3.5 py-1.5 rounded-full">Soon</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── SECTION ───────────────────────────────────────────────────────
export const Projects: React.FC = () => (
  <section id="projects" className="py-24 px-6 md:px-12 lg:px-16 relative"
    style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>

    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(200,192,168,0.08) 0%, transparent 70%)' }} />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-14 relative">
        <div className="border-l-2 border-[#0EA5E9] pl-6 max-w-2xl">
          {/* Ambient header glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#0ea5e9]/3 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[9px] font-mono tracking-wider text-slate-400 uppercase select-none mb-3">
            <span className="text-[#0EA5E9] font-bold">04</span>
            <span className="text-slate-600">/</span>
            <span>WORKS</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F8FAFC] leading-none mb-3.5">
            Selected <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00F2FE] to-[#38BDF8] bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5">Ideas that left the notebook.</p>
          
          <a href="https://github.com/SakshamSuper" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#0EA5E9]/85 hover:text-white border border-[#0EA5E9]/20 hover:border-[#0EA5E9]/50 bg-[#0EA5E9]/5 hover:bg-[#0EA5E9]/12 px-4.5 py-2.5 rounded-full transition-all shrink-0 group relative z-10"
          >
            All Projects <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* 3-col Equal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.num} p={p} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
