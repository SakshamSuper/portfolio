'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Star, Medal, Zap, ArrowUpRight } from 'lucide-react';

// ── ACHIEVEMENT DATA ─────────────────────────────────────────────
const ACHIEVEMENTS = [
  {
    icon: <Trophy className="w-5 h-5" />,
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.2)',
    rank: 'Winner (1st Place)',
    title: 'Zero-to-One National Hackathon (Chandigarh University)',
    desc: 'Secured 1st place among 600+ competing teams for developing an innovative AI-driven solution. Featured in ANI News & MadeInMedia.',
    link: 'https://www.linkedin.com/in/saksham-aggarwal-1343b0219',
  },
  {
    icon: <Medal className="w-5 h-5" />,
    color: '#8B5CF6',
    glow: 'rgba(168,160,144,0.2)',
    rank: 'Runner-Up',
    title: 'HackLLM Hackathon (IIIT Delhi)',
    desc: 'Awarded for delivering a high-impact Machine Learning prototype under strict time constraints.',
    link: 'https://www.linkedin.com/in/saksham-aggarwal-1343b0219',
  },
  {
    icon: <Star className="w-5 h-5" />,
    color: '#06B6D4',
    glow: 'rgba(200,192,168,0.2)',
    rank: 'Finalist',
    title: '5+ National-Level Hackathons',
    desc: 'Consistently recognized for excellence in AI, Machine Learning, Computer Vision, and real-world problem solving.',
    link: 'https://github.com/SakshamSuper',
  },
];

// ── SINGLE MILESTONE TIMELINE DATA ──────────────────────────────
const MILESTONES = [
  { date: 'Jan\'23', label: 'Started B.Tech',       value: 8,   color: '#94A3B8', short: 'B.Tech begins', desc: 'B.Tech in Artificial Intelligence & Data Science at Guru Gobind Singh Indraprastha University.' },
  { date: 'Apr\'23', label: 'GSSoC Contributor',    value: 22,  color: '#34D399', short: 'GSSoC',         desc: 'Contributed to active open-source repositories covering REST APIs, bug fixes, and dashboards.' },
  { date: 'Jul\'23', label: 'Postman Certified',    value: 36,  color: '#F8FAFC', short: 'Postman API',   desc: 'Postman Certified Student Expert, covering REST API calling, request chaining, and debugging.' },
  { date: 'Oct\'23', label: 'Azure AI Certified',   value: 54,  color: '#60A5FA', short: 'Azure AI Eng',  desc: 'Cleared Azure AI Engineer Associate certification (AI-102), covering cognitive service APIs.' },
  { date: 'Jan\'24', label: 'Azure Data Sci Cert',  value: 66,  color: '#60A5FA', short: 'Azure DS',      desc: 'Cleared Azure Data Scientist Associate certification (DP-100), covering training & pipelines.' },
  { date: 'Mar\'24', label: 'MLSA Ambassador',      value: 76,  color: '#A78BFA', short: 'MLSA',          desc: 'Admitted as Microsoft Learn Student Ambassador to lead local communities and host bootcamps.' },
  { date: 'May\'24', label: '🥈 HackLLM IIIT Delhi',value: 86,  color: '#F59E0B', short: 'Runner-Up',     desc: 'Won Runner-Up out of national teams at IIIT Delhi building ML prototypes under tight timelines.' },
  { date: 'Jul\'24', label: '🏆 CU Hackathon Win',  value: 100, color: '#FBBF24', short: '1st / 600+',    desc: 'Secured 1st Place out of 600+ teams nationwide at Chandigarh University, covered by ANI news.' },
];

// ── SVG DIMENSIONS ───────────────────────────────────────────────
const W = 520, H = 210, PAD = { top: 50, right: 24, bottom: 32, left: 36 };
const chartW = W - PAD.left - PAD.right;
const chartH = H - PAD.top - PAD.bottom;

const toPath = (pts: { value: number }[]) => {
  const coords = pts.map((p, i) => ({
    x: PAD.left + (i / (pts.length - 1)) * chartW,
    y: PAD.top + (1 - p.value / 100) * chartH,
  }));
  return coords
    .map((p, i) =>
      i === 0
        ? `M${p.x},${p.y}`
        : `C${coords[i-1].x + chartW/(pts.length-1)/2},${coords[i-1].y} ${p.x - chartW/(pts.length-1)/2},${p.y} ${p.x},${p.y}`
    )
    .join(' ');
};

// ── MILESTONE CHART COMPONENT ────────────────────────────────────
const StockChart: React.FC = () => {
  const [drawn, setDrawn] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setDrawn(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const linePath   = toPath(MILESTONES);
  const areaPath   = linePath + ` L${PAD.left + chartW},${PAD.top + chartH} L${PAD.left},${PAD.top + chartH} Z`;
  const LINE_LEN   = 900;
  const gridRows   = [25, 50, 75, 100];

  return (
    <div className="relative rounded-2xl border border-white/8 overflow-hidden p-5"
      style={{ background: 'rgba(20,20,26,0.55)', backdropFilter: 'blur(16px)' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#F8FAFC]" />
            <span className="text-sm font-bold text-white">Achievement Timeline</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Jan '23 → Now</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-0.5">Every real milestone, in order · hover to explore</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-[#F8FAFC] font-mono">🏆 1st Place</div>
          <div className="text-[10px] text-slate-500">Latest achievement</div>
        </div>
      </div>

      {/* SVG */}
      <div className="relative" style={{ overflowX: 'auto' }}>
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ minWidth: '280px' }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          <defs>
            <linearGradient id="milestone-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0" />
            </linearGradient>
            <filter id="milestone-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <clipPath id="chartClip">
              <rect x={PAD.left} y={PAD.top} width={chartW} height={chartH} />
            </clipPath>
          </defs>

          {/* Grid */}
          {gridRows.map(row => {
            const y = PAD.top + (1 - row / 100) * chartH;
            return (
              <g key={row}>
                <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
                  stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 4" />
                <text x={PAD.left - 6} y={y + 4} fill="#374151" fontSize="7.5" textAnchor="end" fontFamily="monospace">{row}</text>
              </g>
            );
          })}

          {/* Area + Line (clipped) */}
          <g clipPath="url(#chartClip)">
            <path d={areaPath} fill="url(#milestone-grad)"
              opacity={drawn ? 1 : 0} style={{ transition: 'opacity 0.6s ease 1s' }} />
            <path d={linePath} fill="none" stroke="#F8FAFC" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              filter="url(#milestone-glow)"
              strokeDasharray={LINE_LEN} strokeDashoffset={drawn ? 0 : LINE_LEN}
              style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1) 0.1s' }}
            />
          </g>

          {/* Milestone pins */}
          {MILESTONES.map((m, i) => {
            const x = PAD.left + (i / (MILESTONES.length - 1)) * chartW;
            const y = PAD.top + (1 - m.value / 100) * chartH;
            const isHover = hoverIdx === i;
            const isLast  = i === MILESTONES.length - 1;
            // Label position: alternate above/below for readability
            const labelAbove = i % 2 === 0;
            const lx = x;
            const ly = labelAbove ? y - 14 : y + 20;

            return (
              <g key={i} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              >
                {/* Stem line */}
                <line x1={x} y1={y} x2={x} y2={labelAbove ? y - 10 : y + 10}
                  stroke={m.color} strokeWidth={isHover ? 1.5 : 0.8} strokeOpacity={drawn ? 0.6 : 0}
                  style={{ transition: 'opacity 0.5s ease' }} />
                {/* Dot */}
                <circle cx={x} cy={y} r={isHover || isLast ? 5.5 : 3.5}
                  fill={m.color} stroke="#0a0a10" strokeWidth="1.5"
                  opacity={drawn ? 1 : 0}
                  style={{ transition: 'r 0.2s, opacity 0.5s ease ' + (i * 0.12) + 's' }}
                />
                {/* Short label (always visible) */}
                <text x={lx} y={ly} textAnchor="middle" fill={isHover ? '#fff' : '#64748b'}
                  fontSize={isHover ? '8' : '7'} fontFamily="monospace" fontWeight={isHover ? 'bold' : 'normal'}
                  style={{ transition: 'fill 0.2s', opacity: drawn ? 1 : 0 }}
                >{m.short}</text>

                {/* Expanded tooltip on hover */}
                {isHover && (() => {
                  const tipX = i > MILESTONES.length - 3 ? x - 80 : x + 8;
                  const tipY = PAD.top + 4;
                  return (
                    <g>
                      <rect x={tipX} y={tipY} width={78} height={30} rx="4"
                        fill="rgba(20,20,26,0.55)" stroke={m.color} strokeWidth="0.8" strokeOpacity="0.5" />
                      <text x={tipX + 6} y={tipY + 11} fill="#94a3b8" fontSize="7" fontFamily="monospace">{m.date}</text>
                      <text x={tipX + 6} y={tipY + 22} fill={m.color} fontSize="7.5" fontFamily="monospace" fontWeight="bold">{m.label}</text>
                    </g>
                  );
                })()}
              </g>
            );
          })}

          {/* X-axis: date of first and last */}
          {[0, MILESTONES.length - 1].map(i => (
            <text key={i}
              x={PAD.left + (i / (MILESTONES.length - 1)) * chartW}
              y={H - 6} fill="#374151" fontSize="7.5" textAnchor={i === 0 ? 'start' : 'end'}
              fontFamily="monospace">{MILESTONES[i].date}</text>
          ))}
        </svg>
      </div>

      {/* Bottom: interactive milestone explorer */}
      <div className="flex flex-col gap-2 mt-4 pt-3.5 border-t border-white/5">
        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Milestone Explorer</div>
        <div className="bg-[#070708]/60 border border-white/5 rounded-xl p-3 flex flex-col gap-1 transition-all duration-300 min-h-[64px] justify-center">
          {(() => {
            const currentIdx = hoverIdx !== null ? hoverIdx : MILESTONES.length - 1;
            return (
              <>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: MILESTONES[currentIdx].color }}>
                    {MILESTONES[currentIdx].label}
                  </span>
                  <span className="text-[9.5px] font-mono text-slate-500">{MILESTONES[currentIdx].date}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                  {MILESTONES[currentIdx].desc}
                </p>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

// ── MAIN COMPONENT ───────────────────────────────────────────────
export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 lg:px-16 relative"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,160,144,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="border-l-2 border-[#0EA5E9] pl-6 mb-14 relative z-10 max-w-2xl">
          {/* Ambient header glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#0ea5e9]/3 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[9px] font-mono tracking-wider text-slate-400 uppercase select-none mb-3">
            <span className="text-[#0EA5E9] font-bold">03</span>
            <span className="text-slate-600">/</span>
            <span>RECOGNITION</span>
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F8FAFC] leading-none mb-3.5">
            Wins &amp; <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00F2FE] to-[#38BDF8] bg-clip-text text-transparent">Milestones</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Competing nationally, building under pressure, and shipping solutions that actually work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: Achievement Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.a
                key={i}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 transition-all hover:scale-[1.015] group cursor-pointer"
                style={{ background: 'rgba(16,16,22,0.5)', backdropFilter: 'blur(12px)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 12px 30px ${a.glow}`;
                  e.currentTarget.style.borderColor = `${a.color}30`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                }}
              >
                {/* Icon */}
                <div className="shrink-0 p-3 rounded-xl border border-white/8 transition-all group-hover:scale-105"
                  style={{ background: a.glow, color: a.color }}>
                  {a.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all"
                      style={{ color: a.color, borderColor: `${a.color}40`, background: `${a.color}12` }}>
                      {a.rank}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-slate-100 transition-colors leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
                </div>

                <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
              </motion.a>
            ))}
          </div>

          {/* RIGHT: Stock Chart */}
          <div className="lg:col-span-5">
            <StockChart />
          </div>

        </div>

        {/* Bottom row: 4 mini stats spanning full width */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/5">
          {[
            { label: 'Total Hackathons', value: '6+',    icon: '🏆', color: '#F59E0B' },
            { label: 'National Rankings', value: 'Top 2', icon: '📊', color: '#8B5CF6' },
            { label: 'Azure Certified',   value: '3×',   icon: '☁️', color: '#F8FAFC' },
            { label: 'Open Source',       value: 'GSSoC', icon: '🔥', color: '#10B981' },
          ].map(s => (
            <div key={s.label}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all hover:scale-[1.02] cursor-default"
              style={{ background: 'rgba(14,14,18,0.3)', backdropFilter: 'blur(8px)' }}>
              <span className="text-2xl">{s.icon}</span>
              <div>
                <div className="text-sm font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[10.5px] text-slate-500 font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
