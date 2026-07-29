'use client';

import React, { useState } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import RecruiterAssistant from '@/components/ai-assistant/RecruiterAssistant';
import {
  Bot, Home as HomeIcon, User, Code, Award, FolderOpen,
  Mail, Moon, Download, Briefcase
} from 'lucide-react';
import Link from 'next/link';

import { CustomCursor } from '@/components/ui/CustomCursor';

const NAV_LINKS = [
  { label: 'Home',           section: 'top' },
  { label: 'About',          section: 'about' },
  { label: 'Projects',       section: 'projects' },
  { label: 'Achievements',   section: 'achievements' },
  { label: 'Certifications', section: 'certifications' },
  { label: 'Experience',     section: 'experience' },
  { label: 'Blog',           section: 'blog' },
  { label: 'Contact',        section: 'contact' },
];

const SIDEBAR_ICONS = [
  { icon: HomeIcon,   label: 'Home',         section: 'top' },
  { icon: User,       label: 'About',        section: 'about' },
  { icon: Code,       label: 'Skills',       section: 'skills' },
  { icon: Award,      label: 'Achievements', section: 'achievements' },
  { icon: FolderOpen, label: 'Projects',     section: 'projects' },
  { icon: Briefcase,  label: 'Experience',   section: 'experience' },
  { icon: Mail,       label: 'Contact',      section: 'contact' },
];

export default function Home() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  React.useEffect(() => {
    const sections = ['top', 'about', 'skills', 'achievements', 'projects', 'certifications', 'experience', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const link = NAV_LINKS.find((l) => l.section === id) || SIDEBAR_ICONS.find((l) => l.section === id);
          if (link) {
            setActiveNav(link.label);
          }
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollTo = (section: string) => {
    if (section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNav = (label: string, section: string) => {
    setActiveNav(label);
    scrollTo(section);
  };

  return (
    <div className="relative min-h-screen flex overflow-x-hidden" style={{ background: 'transparent', color: '#F8FAFC' }}>
      <CustomCursor />

      {/* ══ GLOBAL ANIMATED BACKGROUND ══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -10 }}>
        {/* Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-95" />
        
        {/* Drifting orb 1 — top right (Electric Cyan / Aqua) */}
        <div className="absolute animate-orb-1" style={{
          top: '-10%', right: '-5%', width: '550px', height: '550px',
          borderRadius: '50%',
          background: 'rgba(14, 165, 233, 0.025)',
          border: '1px solid rgba(14, 165, 233, 0.08)',
        }} />
        
        {/* Drifting orb 2 — mid left (Vibrant Indigo / Violet) */}
        <div className="absolute animate-orb-2" style={{
          top: '35%', left: '-10%', width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'rgba(139, 92, 246, 0.03)',
          border: '1px solid rgba(139, 92, 246, 0.08)',
        }} />
        
        {/* Drifting orb 3 — bottom center (Teal / Emerald) */}
        <div className="absolute animate-orb-3" style={{
          bottom: '5%', left: '25%', width: '480px', height: '480px',
          borderRadius: '50%',
          background: 'rgba(20, 184, 166, 0.02)',
          border: '1px solid rgba(20, 184, 166, 0.06)',
        }} />
      </div>

      {/* ══════════════════════════════════
          LEFT SIDEBAR (Desktop / Tablet)
      ══════════════════════════════════ */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 flex-col justify-between items-center py-6 border-r border-white/5"
        style={{ width: '64px', background: 'rgba(14,14,18,0.9)', backdropFilter: 'blur(20px)' }}>

        {/* Logo */}
        <button
          onClick={() => scrollTo('top')}
          className="text-[#F8FAFC] font-mono font-bold text-xl hover:text-[#F8FAFC] transition-colors hover:scale-110 transform"
        >
          &lt;/&gt;
        </button>

        {/* Nav Icons */}
        <nav className="flex flex-col gap-2">
          {SIDEBAR_ICONS.map(({ icon: Icon, label, section }) => (
            <button
              key={label}
              onClick={() => handleNav(label, section)}
              title={label}
              className={`relative group p-3 rounded-xl transition-all duration-200 ${
                activeNav === label
                   ? 'text-[#F8FAFC] bg-[#F8FAFC]/10 border border-[#F8FAFC]/20'
                   : 'text-slate-500 hover:text-white hover:bg-white/6 border border-transparent'
              }`}
            >
              <Icon className="w-5 h-5" />
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-white/10"
                style={{ background: 'rgba(15,23,42,0.95)' }}>
                {label}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom: Social + Theme */}
        <div className="flex flex-col gap-2 items-center">
          {/* GitHub */}
          <a href="https://github.com/SakshamSuper" target="_blank" rel="noopener noreferrer"
            title="GitHub"
            className="p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/8 border border-transparent transition-all">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/saksham-aggarwal-1343b0219" target="_blank" rel="noopener noreferrer"
            title="LinkedIn"
            className="p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/8 border border-transparent transition-all">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          {/* Mail */}
          <a href="mailto:sakshamaggarwal2475@gmail.com"
            title="Email"
            className="p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/8 border border-transparent transition-all">
            <Mail className="w-4.5 h-4.5 w-[18px] h-[18px]" />
          </a>
          {/* Theme toggle */}
          <button title="Toggle Theme"
            className="p-2.5 rounded-xl text-slate-500 hover:text-[#F8FAFC] hover:bg-white/6 border border-transparent transition-all">
            <Moon className="w-[18px] h-[18px]" />
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════ */}
      <div className="flex-1 flex flex-col ml-0 md:ml-[64px]">

        {/* ── TOP NAVBAR ── */}
        <header className="fixed top-2 sm:top-3 left-0 md:left-[64px] right-0 z-40 px-3 sm:px-6 md:px-12 lg:px-16 pointer-events-none">
          <div
            className="w-full max-w-7xl mx-auto flex items-center justify-between px-3.5 sm:px-6 py-2 rounded-2xl border border-white/8 pointer-events-auto"
            style={{
              background: 'rgba(8,8,10,0.85)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {/* Brand */}
            <button
              onClick={() => scrollTo('top')}
              className="flex items-center gap-2 group"
            >
              <span className="font-mono font-bold text-[#F8FAFC] text-lg group-hover:text-[#F8FAFC] transition-colors">&lt;/&gt;</span>
              <span className="font-bold text-white text-xs sm:text-sm tracking-tight whitespace-nowrap">Saksham Aggarwal</span>
            </button>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ label, section }) => (
                <button
                  key={label}
                  onClick={() => handleNav(label, section)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeNav === label
                      ? 'text-white border-b-2 border-[#F8FAFC] pb-[4px]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="hidden lg:inline-flex text-[11px] font-bold text-slate-400 hover:text-white border border-white/8 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
              >
                Admin
              </Link>
              <a
                href="/Saksham_Aggarwal_Resume.pdf"
                download
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-white px-2.5 sm:px-4 py-1.5 rounded-lg transition-all hover:opacity-90 hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F8FAFC] shrink-0" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </header>

        {/* ── PAGE SECTIONS ── */}
        <main className="flex-1 pt-16">

          <Hero
            onOpenAiAssistant={() => setIsAiOpen(true)}
            onScrollToProjects={() => { handleNav('Projects', 'projects'); }}
            onScrollToContact={() => { handleNav('Contact', 'contact'); }}
          />

          <About />
          <Skills />
          <Achievements />
          <Projects />
          <Experience />



          <Contact />
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 text-center text-xs text-slate-600" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-left">
              <span className="font-bold text-white block">Saksham Aggarwal</span>
              <span className="text-slate-600 text-[11px]">AI & Data Science Specialist · Expected Graduation 2027</span>
            </div>
            <p className="text-slate-700 text-[11px]">
              © {new Date().getFullYear()} Saksham Aggarwal. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* ── AI ASSISTANT BUTTON ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsAiOpen(true)}
          className="flex items-center gap-2.5 text-white font-semibold px-5 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(200,192,168,0.2)] hover:shadow-[0_4px_35px_rgba(200,192,168,0.3)]"
          style={{ background: 'linear-gradient(135deg, #1e1c18, #2a2820)' }}
        >
          <Bot className="w-5 h-5" />
          <div className="text-left">
            <span className="text-[11px] font-bold uppercase tracking-wide block opacity-80 leading-none">Ask AI Assistant</span>
            <span className="text-[10px] block text-[#94A3B8] mt-0.5 leading-none">About my projects</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      </div>

      {/* Recruiter AI drawer */}
      <RecruiterAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
