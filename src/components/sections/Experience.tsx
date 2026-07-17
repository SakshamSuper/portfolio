'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { aiKnowledgeBase } from '@/utils/ai-knowledge-base';
import { Award, Briefcase, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = aiKnowledgeBase.experience;
  const certifications = aiKnowledgeBase.certifications;

  const getIssuerColor = (issuer: string) => {
    const name = issuer.toLowerCase();
    if (name.includes('microsoft')) return '#3b82f6';
    if (name.includes('postman')) return '#f97316';
    if (name.includes('oracle')) return '#ef4444';
    return '#0ea5e9';
  };

  return (
    <section id="experience" className="py-24 px-6 md:px-12 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="border-l-2 border-[#0EA5E9] pl-6 mb-14 relative z-10 max-w-2xl">
          {/* Ambient header glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#0ea5e9]/3 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[9px] font-mono tracking-wider text-slate-400 uppercase select-none mb-3">
            <span className="text-[#0EA5E9] font-bold">05</span>
            <span className="text-slate-600">/</span>
            <span>HISTORY</span>
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F8FAFC] leading-none mb-3.5">
            Experience &amp; <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00F2FE] to-[#38BDF8] bg-clip-text text-transparent">Certifications</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Professional milestones, open-source work, and official cloud credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── LEFT: Experience Timeline ── */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-5 h-5 text-[#94A3B8]" />
              <h3 className="text-xl font-display font-semibold text-white">Experience Timeline</h3>
            </div>

            <div className="relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10 space-y-10">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline node */}
                  <div className="absolute left-[-27px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border border-white/10 group-hover:border-[#0EA5E9] group-hover:shadow-[0_0_12px_rgba(14,165,233,0.35)] transition-all duration-300 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-500 group-hover:bg-[#0EA5E9] transition-colors" />
                  </div>

                  <GlassCard className="p-5 hover:border-[#0EA5E9]/20 transition-all duration-300" glowColor="rgba(14, 165, 233, 0.04)">
                    <div className="flex flex-col gap-1 mb-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-slate-200 transition-colors">
                        {exp.role}
                      </h4>
                      <span className="text-sm font-semibold text-slate-400">{exp.company}</span>
                    </div>
                    <ul className="space-y-2">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-slate-400 text-sm leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#94A3B8] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Certifications Grid ── */}
          <div id="certifications" className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="w-5 h-5 text-[#94A3B8]" />
              <h3 className="text-xl font-display font-semibold text-white">Azure &amp; AI Credentials</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, idx) => {
                const brandColor = getIssuerColor(cert.issuer);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <GlassCard 
                      className="p-5 flex flex-col justify-between hover:border-white/12 transition-all duration-300 group/cert cursor-pointer" 
                      glowColor={`${brandColor}0a`}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = `0 10px 24px ${brandColor}0a`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: brandColor }}>
                            {cert.issuer} Certified
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold">{cert.date}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white leading-snug mb-3 group-hover/cert:text-slate-200 transition-colors">{cert.title}</h4>
                      </div>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold transition-all duration-200 mt-2"
                          style={{ color: '#94a3b8' }}
                          onMouseEnter={e => { e.currentTarget.style.color = brandColor; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; }}
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Verify Credential</span>
                        </a>
                      )}
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
