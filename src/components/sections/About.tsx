'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { aiKnowledgeBase } from '@/utils/ai-knowledge-base';
import { Award, GraduationCap, MapPin, Cpu, BarChart3 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-l-2 border-[#0EA5E9] pl-6 mb-14 relative z-10 max-w-2xl">
          {/* Ambient header glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#0ea5e9]/3 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[9px] font-mono tracking-wider text-slate-400 uppercase select-none mb-3">
            <span className="text-[#0EA5E9] font-bold">01</span>
            <span className="text-slate-600">/</span>
            <span>PROFILE</span>
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F8FAFC] leading-none mb-3.5">
            Story &amp; <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00F2FE] to-[#38BDF8] bg-clip-text text-transparent">Academics</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Bridging theoretical artificial intelligence with rugged, production-ready software systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Storytelling Narrative - Left Grid (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex"
          >
            <GlassCard className="p-8 h-full flex flex-col justify-between" glowColor="rgba(59, 130, 246, 0.08)">
              <div>
                <div className="flex items-center gap-3 text-slate-400 mb-5 text-sm">
                  <MapPin className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Based in {aiKnowledgeBase.personalInfo.location}</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-display font-semibold text-white mb-6 leading-snug">
                  "I don't just train models. I build end-to-end systems that solve real-world problems."
                </h3>
                
                <div className="space-y-5 text-slate-300 text-sm sm:text-[15px] leading-relaxed">
                  <p>
                    I am an AI & Data Science Engineer currently pursuing my Bachelor of Technology at Guru Gobind Singh Indraprastha University, Delhi, maintaining a CGPA of <strong>8.98</strong>. My engineering focus centers on creating end-to-end, high-performance intelligent systems.
                  </p>
                  <p>
                    I specialize in utilizing Python, OpenCV, and MediaPipe to build real-time computer vision applications, and PyTorch/TensorFlow for predictive machine learning models. Whether designing real-time physiotherapy posture analyzers that track joint angles with ~90% accuracy, or parsing complex market trends with ML regression to improve forecast stability by ~20%, I aim to engineer solutions with quantifiable impact.
                  </p>
                  <p>
                    As a Microsoft Learn Student Ambassador and a national hackathon champion competing against 600+ teams, I thrive on collaborative engineering, strict timelines, and building robust codebases.
                  </p>
                </div>
              </div>

              {/* Core Philosophy Tags */}
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group/philosophy p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-[#0EA5E9]/20 hover:bg-white/[0.03] transition-all duration-300 flex gap-3">
                  <Cpu className="w-5 h-5 text-[#0EA5E9] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase text-slate-300 font-bold mb-1 group-hover/philosophy:text-[#0EA5E9] transition-colors">AI &amp; Computer Vision</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">Engineering real-time posture analysis, joint-angle tracking, and model inference pipelines using OpenCV and MediaPipe.</p>
                  </div>
                </div>
                
                <div className="group/philosophy p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-[#10b981]/20 hover:bg-white/[0.03] transition-all duration-300 flex gap-3">
                  <BarChart3 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase text-slate-300 font-bold mb-1 group-hover/philosophy:text-[#10b981] transition-colors">Data Analytics &amp; BI</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">Performing deep EDA, regression modeling, and building interactive dashboards in Power BI and Tableau to capture business insights.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Academic Timeline - Right Grid (5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <GlassCard className="p-6 flex-1 flex flex-col justify-between" glowColor="rgba(139, 92, 246, 0.08)">
              <div>
                <div className="flex items-center gap-3 text-white mb-6">
                  <GraduationCap className="w-5 h-5 text-[#a855f7]" />
                  <h3 className="text-lg font-display font-semibold">Education &amp; Academics</h3>
                </div>

                <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                  {aiKnowledgeBase.education.map((edu, idx) => {
                    const isPercentage = edu.cgpa.includes('%');
                    const displayScore = isPercentage ? edu.cgpa : `CGPA ${edu.cgpa}`;
                    return (
                      <div key={idx} className="relative pl-8 group/timeline hover:translate-x-0.5 transition-transform duration-300">
                        {/* Circle Node */}
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-slate-950 border border-white/15 group-hover/timeline:border-[#a855f7] group-hover/timeline:shadow-[0_0_12px_rgba(168,85,247,0.35)] transition-all flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover/timeline:bg-[#a855f7] transition-colors" />
                        </div>

                        <div className="text-xs text-slate-500 font-semibold mb-1 flex items-center justify-between">
                          <span>{edu.date}</span>
                          {!edu.degree.toLowerCase().includes('class') && (
                            <span className="text-[#a855f7] border border-[#a855f7]/25 bg-[#a855f7]/5 px-2 py-0.5 rounded text-[10px] font-bold">
                              {displayScore}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-white leading-snug mb-1 group-hover/timeline:text-[#a855f7] transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-xs text-slate-400 mb-2">{edu.institution}</p>
                        <ul className="list-disc pl-4 space-y-1">
                          {edu.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-xs text-slate-400 leading-relaxed">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </GlassCard>

            {/* Quick Achievements Summary Card */}
            <GlassCard className="p-6" glowColor="rgba(6, 182, 212, 0.08)">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-lg bg-slate-900 border border-white/10 group hover:border-amber-500/30 transition-colors shrink-0">
                  <Award className="w-6 h-6 text-amber-500 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    National Level Recognition <span className="text-amber-500">🏆</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    1st Place at Chandigarh University Hackathon out of 600+ teams. 2nd Place at IIIT Delhi HackLLM. Finalist in 5+ others.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
