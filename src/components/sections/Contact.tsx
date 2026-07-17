'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import MagneticButton from '../ui/MagneticButton';
import { aiKnowledgeBase } from '@/utils/ai-knowledge-base';
import confetti from 'canvas-confetti';
import { Check, Mail, MapPin, Send } from 'lucide-react';
import { createDbInquiry } from '@/app/admin/actions';


export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(aiKnowledgeBase.personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setStatus('submitting');

    try {
      // 1. Save to SQLite database via server action
      await createDbInquiry({
        name: formState.name,
        email: formState.email,
        company: formState.company || undefined,
        message: formState.message
      });

      // 2. Email forwarder via Web3Forms if NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is present
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (accessKey) {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: accessKey,
              name: formState.name,
              email: formState.email,
              subject: `New Portfolio Inquiry from ${formState.name}`,
              message: `You received a new message from your portfolio:\n\nName: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company || 'Not Specified'}\n\nMessage:\n${formState.message}`
            })
          });
        } catch (mailErr) {
          console.error("Web3Forms email delivery error:", mailErr);
        }
      }

      setStatus('success');
      
      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#3B82F6', '#06B6D4', '#8B5CF6']
      });

      // Reset form
      setFormState({
        name: '',
        email: '',
        company: '',
        message: ''
      });

      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="border-l-2 border-[#0EA5E9] pl-6 mb-14 relative z-10 max-w-2xl">
          {/* Ambient header glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#0ea5e9]/3 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[9px] font-mono tracking-wider text-slate-400 uppercase select-none mb-3">
            <span className="text-[#0EA5E9] font-bold">06</span>
            <span className="text-slate-600">/</span>
            <span>ENGAGE</span>
          </span>
          
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-[#F8FAFC] leading-none mb-3.5">
            Connect &amp; <span className="bg-gradient-to-r from-[#0EA5E9] via-[#00F2FE] to-[#38BDF8] bg-clip-text text-transparent">Hire</span>
          </h2>
          
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind, want to discuss model pipelines, or looking to schedule a recruitment interview?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Coordinates & Information (5 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <GlassCard className="p-8 h-full flex flex-col justify-between" glowColor="rgba(14, 165, 233, 0.08)">
              <div>
                <h3 className="text-xl font-display font-bold text-white mb-6">Contact Channels</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  I am actively seeking internships and associate roles starting immediately. If you represent a startup, VC-backed team, or enterprise engineering division, feel free to drop a message or reach out via email directly.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center justify-between w-full">
                    <a 
                      href={`mailto:${aiKnowledgeBase.personalInfo.email}`}
                      className="flex items-center gap-4 text-slate-300 hover:text-white transition-all group/email"
                    >
                      <div className="p-2.5 rounded-lg bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] group-hover/email:bg-[#0ea5e9]/20 transition-all duration-300">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block">Primary Email</span>
                        <span className="text-sm underline decoration-[#0ea5e9]/20 underline-offset-4 group-hover/email:text-white group-hover/email:decoration-[#0ea5e9]">
                          {aiKnowledgeBase.personalInfo.email}
                        </span>
                      </div>
                    </a>
                    <button 
                      type="button" 
                      onClick={handleCopyEmail}
                      className="text-[10px] font-bold text-[#0ea5e9] uppercase tracking-wider bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 px-2.5 py-1.5 rounded-lg hover:bg-[#0ea5e9]/12 active:scale-95 transition-all duration-200"
                    >
                      {copied ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-white">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 font-bold block">Location</span>
                      <span className="text-sm">{aiKnowledgeBase.personalInfo.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-12 pt-8 border-t border-white/5 flex gap-4">
                <a
                  href={aiKnowledgeBase.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/3 hover:bg-[#0ea5e9]/10 border border-white/5 hover:border-[#0ea5e9]/30 text-slate-400 hover:text-[#0ea5e9] transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  title="Connect on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                
                <a
                  href={aiKnowledgeBase.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/3 hover:bg-[#0ea5e9]/10 border border-white/5 hover:border-[#0ea5e9]/30 text-slate-400 hover:text-[#0ea5e9] transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                  title="View GitHub Profiles"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column: Contact Form (7 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8" glowColor="rgba(14, 165, 233, 0.08)">
              <h3 className="text-xl font-display font-bold text-white mb-6">Send an Inquiry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#0EA5E9] focus:bg-[#070708] focus:shadow-[0_0_20px_rgba(14,165,233,0.12)] transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#0EA5E9] focus:bg-[#070708] focus:shadow-[0_0_20px_rgba(14,165,233,0.12)] transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    placeholder="e.g. OpenAI, Stripe"
                    className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#0EA5E9] focus:bg-[#070708] focus:shadow-[0_0_20px_rgba(14,165,233,0.12)] transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                    Inquiry Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or open role requirements..."
                    className="w-full bg-white/[0.01] hover:bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#0EA5E9] focus:bg-[#070708] focus:shadow-[0_0_20px_rgba(14,165,233,0.12)] transition-all duration-300 resize-none"
                  />
                </div>

                {status === 'success' ? (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-success/15 border border-success/30 text-success text-sm font-semibold">
                    <Check className="w-5 h-5 shrink-0" />
                    <span>Inquiry processed! I will reach out to you within 24 hours.</span>
                  </div>
                ) : (
                  <div className="pt-2">
                    <MagneticButton
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#0ea5e9]/85 text-black hover:opacity-95 shadow-lg shadow-[#0ea5e9]/10 hover:shadow-[#0ea5e9]/20 transition-all text-xs uppercase tracking-widest font-black py-3.5 rounded-xl border border-[#0ea5e9]/20 flex items-center justify-center gap-2 duration-300 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {status === 'submitting' ? (
                        <span>Transmission Active...</span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </MagneticButton>
                  </div>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
