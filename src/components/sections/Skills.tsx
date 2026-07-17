'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { aiKnowledgeBase } from '@/utils/ai-knowledge-base';
import { BrainCircuit, Cloud, Code, Database, Eye, BarChart3, Terminal } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const skillCategories = aiKnowledgeBase.skills;

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ml/ai':
        return <BrainCircuit className="w-5 h-5 text-[#94A3B8]" />;
      case 'data analytics':
        return <BarChart3 className="w-5 h-5 text-[#94A3B8]" />;
      case 'languages & tools':
        return <Terminal className="w-5 h-5 text-primary-blue" />;
      case 'platforms':
        return <Cloud className="w-5 h-5 text-slate-400" />;
      default:
        return <Database className="w-5 h-5" />;
    }
  };

  // Maps skills to specific projects where they were applied for storytelling
  const getAppliedProject = (skillName: string) => {
    const name = skillName.toLowerCase();
    if (name.includes('opencv') || name.includes('mediapipe') || name.includes('tensorflow') || name.includes('pytorch')) {
      return 'AI Based Posture Analysis System';
    }
    if (name.includes('pandas') || name.includes('numpy') || name.includes('seaborn') || name.includes('power bi') || name.includes('tableau')) {
      return 'Cryptocurrency Market Analysis';
    }
    if (name.includes('azure')) {
      return 'Microsoft Learn Student Ambassador';
    }
    return null;
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-l-2 border-[#0EA5E9] pl-6 mb-14 relative z-10 max-w-2xl">
          {/* Ambient header glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#0ea5e9]/3 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[9px] font-mono tracking-wider text-slate-400 uppercase select-none mb-3">
            <span className="text-[#0EA5E9] font-bold">02</span>
            <span className="text-slate-600">/</span>
            <span>STACK</span>
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F8FAFC] leading-none mb-3.5">
            Technical <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00F2FE] to-[#38BDF8] bg-clip-text text-transparent">Skills</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Click categories to discover specific proficiencies and where they are applied in production.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Tabs (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {skillCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`relative flex items-center gap-4 p-5 rounded-xl border text-left transition-all duration-300 w-full overflow-hidden ${
                  activeTab === idx
                    ? 'bg-[#0a0a0c] border-[#0EA5E9]/30 text-white shadow-[0_0_20px_rgba(14,165,233,0.08)] pl-6'
                    : 'border-white/5 text-slate-400 hover:border-white/10 hover:bg-slate-950/80 hover:pl-6'
                }`}
              >
                {activeTab === idx && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#0EA5E9] rounded-r z-10" />
                )}
                <div className={`p-2.5 rounded-lg border transition-colors ${
                  activeTab === idx ? 'bg-slate-950 border-[#0EA5E9]/20' : 'bg-slate-900 border-white/5'
                }`}>
                  {getCategoryIcon(cat.category)}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm sm:text-base leading-tight">
                    {cat.category}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium">
                    {cat.items.length} Core Technologies
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Skills Grid (8 columns) */}
          <div className="lg:col-span-8">
            <GlassCard className="p-8 min-h-[400px]" glowColor="rgba(6, 182, 212, 0.08)">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(skillCategories[activeTab].category)}
                  <h3 className="text-lg font-display font-semibold text-white">
                    {skillCategories[activeTab].category}
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Engine Matrix
                </span>
              </div>

              {/* Grid of skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {skillCategories[activeTab].items.map((skill, idx) => {
                  const appliedIn = getAppliedProject(skill.name);
                  return (
                    <div key={idx} className="flex flex-col group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-xs font-semibold text-[#94A3B8]">
                          {skill.proficiency}%
                        </span>
                      </div>
                      
                      {/* Bar Track */}
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5 mb-2">
                        <motion.div
                          key={`${activeTab}-${idx}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="h-full bg-gradient-to-r from-[#94a3b8] to-[#0ea5e9] rounded-full"
                        />
                      </div>

                      {/* Storytelling snippet */}
                      {appliedIn && (
                        <div className="text-[10px] text-slate-500 leading-snug flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-accent-purple" />
                          <span>Applied in: <strong className="text-slate-400 font-medium">{appliedIn}</strong></span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Interactive Dashboard Footer */}
              <div className="mt-12 p-4 rounded-xl border border-white/5 bg-slate-950/60 text-xs text-slate-500 leading-relaxed">
                <span className="font-semibold text-slate-400 block mb-1">Empirical Competency</span>
                Proficiency bars are evaluated based on active development hours, successfully shipped features, and alignment with Azure Certification standards (AI-102, DP-100).
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Skills;
