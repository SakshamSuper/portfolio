'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import { aiKnowledgeBase } from '@/utils/ai-knowledge-base';
import confetti from 'canvas-confetti';
import { Bot, CheckCircle, Cpu, HelpCircle, Loader2, Sparkles, X } from 'lucide-react';

interface RecruiterAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export const RecruiterAssistant: React.FC<RecruiterAssistantProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'ats'>('chat');
  
  // Chat States
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I am Saksham's AI Recruitment agent. Ask me anything about his credentials, hackathons, computer vision capabilities, or Azure certifications. Try asking: 'Are you certified?' or 'Tell me about your posture analysis project.'",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ATS States
  const [jdText, setJdText] = useState('');
  const [atsResult, setAtsResult] = useState<{
    score: number;
    matched: string[];
    missing: string[];
    strengths: string[];
    verdict: string;
  } | null>(null);
  const [isAtsAnalyzing, setIsAtsAnalyzing] = useState(false);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Client-side rule-based NLP intent matcher for instant resume chat replies
  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Check certifications
    if (q.includes('certif') || q.includes('credential') || q.includes('microsoft') || q.includes('certified')) {
      const certNames = aiKnowledgeBase.certifications.map(c => `• ${c.title} (${c.issuer})`).join('\n');
      return `Saksham holds several official Microsoft and technical credentials:\n\n${certNames}\n\nThese show his structured capability to train, host, and monitor models in production cloud environments.`;
    }

    // Check posture project
    if (q.includes('posture') || q.includes('physio') || q.includes('cv') || q.includes('computer vision')) {
      const proj = aiKnowledgeBase.projects.find(p => p.id === 'posture-analysis');
      if (proj) {
        return `Saksham built the **${proj.title}** using **${proj.tech.join(', ')}**.\n\n**Metrics**: ${proj.metrics.join('\n')}\n\n**Description**: ${proj.solution}\n\nIt features an interactive real-time telemetry component tracking joint angles via MediaPipe and a local LLM GPT4All chatbot interface with tool calling to log session history directly to Notion API databases.`;
      }
    }

    // Check equity analyst project
    if (q.includes('equity') || q.includes('financial') || q.includes('analyst') || q.includes('claude') || q.includes('anthropic')) {
      const proj = aiKnowledgeBase.projects.find(p => p.id === 'equity-analyst');
      if (proj) {
        return `He built **${proj.title}** using **${proj.tech.join(', ')}**.\n\nIt parses long, unstructured company earnings releases into strict, validated JSON matching schemas, rendering analyst summaries on a React dashboard. It solves the key challenge of LLM hallucination and mathematical discrepancies.`;
      }
    }

    // Check crypto project
    if (q.includes('crypto') || q.includes('bitcoin') || q.includes('price') || q.includes('market') || q.includes('regression')) {
      const proj = aiKnowledgeBase.projects.find(p => p.id === 'crypto-analysis');
      if (proj) {
        return `He engineered the **${proj.title}** using **${proj.tech.join(', ')}**.\n\nThis project conducts exploratory data analysis on historical crypto volatility spreads and trains regression models. It improves Bitcoin price-direction predictions by ~60-75% and forecast stability by ~20%.`;
      }
    }

    // Check hackathons
    if (q.includes('hackathon') || q.includes('winner') || q.includes('prize') || q.includes('chandigarh') || q.includes('iiit')) {
      return `Saksham has a strong record under time pressure:\n\n1. **Winner (1st out of 600+ Teams)** at Chandigarh University's Zero-to-One National Hackathon for building an AI-driven automation feed (covered by ANI News).\n2. **Runner-Up** at IIIT Delhi's HackLLM Hackathon for shipping a high-impact ML prototype within 24 hours.\n3. **Finalist** in 5+ other national AI/CV competitions.`;
    }

    // Check education
    if (q.includes('edu') || q.includes('cgpa') || q.includes('college') || q.includes('university') || q.includes('btech')) {
      const edu = aiKnowledgeBase.education[0];
      return `Saksham is pursuing his **${edu.degree}** at **${edu.institution}** (Expected ${edu.date}).\n\nHe has a highly competitive CGPA of **${edu.cgpa}/10** and specializes in Artificial Intelligence and Data Science coursework.`;
    }

    // Check skills
    if (q.includes('skill') || q.includes('tech') || q.includes('languages') || q.includes('python') || q.includes('stack')) {
      const skillGroups = aiKnowledgeBase.skills.map(s => `* **${s.category}**: ${s.items.map(i => i.name).join(', ')}`).join('\n');
      return `Here is a summary of Saksham's technology matrix:\n\n${skillGroups}`;
    }

    // Check internship/roles availability
    if (q.includes('job') || q.includes('hire') || q.includes('intern') || q.includes('hiring') || q.includes('open')) {
      return "Yes! Saksham is actively seeking AI Engineering, Machine Learning, or Full Stack AI Developer internship opportunities and junior associate positions starting immediately. He can work on RAG workflows, agentic tool integrations, and computer vision pipelines. You can drop an inquiry in the Contact Section!";
    }

    // Fallback general response
    return "I parsed your query but couldn't locate a exact match. Try asking about: 'Certifications', 'Zero-to-One Hackathon', 'Posture Analysis project', or 'Primary Skills'.";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsgText = inputVal;
    setInputVal('');
    
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsgText, timestamp: new Date() }
    ]);

    setIsTyping(true);

    // Simulate short network delay
    setTimeout(() => {
      const reply = getBotResponse(userMsgText);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: reply, timestamp: new Date() }
      ]);
    }, 800);
  };

  // ATS Matching Logic
  const handleAtsAnalysis = () => {
    if (!jdText.trim()) return;
    setIsAtsAnalyzing(true);
    setAtsResult(null);

    setTimeout(() => {
      const text = jdText.toLowerCase();
      
      // Keywords database
      const allSkills = aiKnowledgeBase.skills.flatMap(s => s.items.map(i => i.name));
      const matched: string[] = [];
      const missing: string[] = [];

      allSkills.forEach(skill => {
        const keyword = skill.toLowerCase();
        if (text.includes(keyword) || (keyword === 'python' && text.includes('py')) || (keyword.includes('api') && text.includes('api'))) {
          matched.push(skill);
        } else {
          missing.push(skill);
        }
      });

      // Simple Scoring Formula
      const baseScore = 60;
      const matchedFactor = Math.min((matched.length / Math.max(matched.length + 3, 5)) * 30, 30);
      const certificationBonus = (text.includes('azure') || text.includes('cloud')) ? 10 : 0;
      const calculatedScore = Math.min(Math.round(baseScore + matchedFactor + certificationBonus), 100);

      // Strengths & Verdict
      const strengths = [
        "Strong computer vision foundation (OpenCV, MediaPipe keypoint tracing)",
        "Official Microsoft Azure AI and Data Science credentials",
        "Agentic tool-use experience (Notion integration, JSON structured validation)"
      ];

      let verdict = "Excellent candidate! Saksham satisfies key technical criteria for this role, especially regarding python-based machine learning pipelines and modern LLM API architectures.";
      if (calculatedScore < 75) {
        verdict = "Moderate match. Saksham satisfies basic machine learning and python engineering requirements, but the job description highlights additional specialized requirements.";
      }

      setAtsResult({
        score: calculatedScore,
        matched: matched.slice(0, 8),
        missing: missing.slice(0, 4),
        strengths,
        verdict
      });

      setIsAtsAnalyzing(false);

      // Celebrate high matches!
      if (calculatedScore >= 85) {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.65 },
          colors: ['#06B6D4', '#8B5CF6']
        });
      }
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4"
        >
          {/* Side Drawer Console Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-full max-w-xl h-full max-h-[90vh] sm:max-h-none sm:h-[95vh] rounded-2xl sm:rounded-r-none border border-white/10 bg-slate-950 flex flex-col justify-between overflow-hidden shadow-2xl relative"
          >
            {/* Top Bar Header */}
            <div className="p-4 border-b border-white/5 bg-slate-900/50 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2 text-white">
                <Bot className="w-5 h-5 text-accent-cyan" />
                <h3 className="font-display font-bold text-sm sm:text-base">
                  Recruiter Agent Console v1.0
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-950/80 border border-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Feature Tabs Nav */}
            <div className="flex border-b border-white/5 bg-slate-950 relative z-10 px-4">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-3 px-4 text-xs uppercase font-bold tracking-wider transition-all border-b-2 ${
                  activeTab === 'chat'
                    ? 'border-accent-cyan text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-400'
                }`}
              >
                Resume Chat
              </button>
              <button
                onClick={() => setActiveTab('ats')}
                className={`py-3 px-4 text-xs uppercase font-bold tracking-wider transition-all border-b-2 ${
                  activeTab === 'ats'
                    ? 'border-accent-purple text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-400'
                }`}
              >
                ATS / JD Matcher
              </button>
            </div>

            {/* Scrollable Panel Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-950/40 relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

              {activeTab === 'chat' && (
                <div className="space-y-4 relative z-10">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-primary-blue/10 border border-primary-blue/20 text-slate-200'
                            : 'bg-slate-900 border border-white/5 text-slate-300'
                        }`}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-accent-cyan" />
                        <span>Querying knowledge matrices...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {activeTab === 'ats' && (
                <div className="space-y-6 relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-accent-purple" />
                      <span>ATS Resume Match Parser</span>
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Paste your target job description text below. The compiler maps it against Saksham's competencies and certificates.
                    </p>

                    <textarea
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      rows={5}
                      placeholder="Paste job description details here... (e.g. 'We are looking for a Machine Learning engineer with Python, PyTorch, Azure, OpenCV, and LLM experience...')"
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple transition-all resize-none font-mono"
                    />

                    {isAtsAnalyzing ? (
                      <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin text-accent-purple" />
                        <span className="text-xs">Evaluating parameters...</span>
                      </div>
                    ) : (
                      atsResult && (
                        <div className="mt-6 space-y-4">
                          {/* ATS Score Dial */}
                          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                              {/* Simple SVG Circle Meter */}
                              <svg width="64" height="64" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="rgba(255,255,255,0.05)"
                                  strokeWidth="2.5"
                                />
                                <path
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke={atsResult.score >= 85 ? "#10B981" : "#8B5CF6"}
                                  strokeWidth="2.5"
                                  strokeDasharray={`${atsResult.score}, 100`}
                                />
                              </svg>
                              <span className="absolute text-sm font-bold text-white font-display">
                                {atsResult.score}%
                              </span>
                            </div>
                            
                            <div>
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">Matched Score</span>
                              <h5 className="text-xs font-bold text-white mt-0.5">
                                {atsResult.score >= 85 ? 'Outstanding Match Fit!' : 'Compatible Core'}
                              </h5>
                              <p className="text-[10px] text-slate-400 mt-1 leading-snug">{atsResult.verdict}</p>
                            </div>
                          </div>

                          {/* Strengths */}
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                              Strengths Highlight
                            </span>
                            <ul className="space-y-1 text-xs">
                              {atsResult.strengths.map((str, idx) => (
                                <li key={idx} className="text-slate-300 flex items-start gap-1.5 leading-relaxed">
                                  <span className="text-success mt-0.5">✓</span>
                                  <span>{str}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Matched Keywords */}
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                              Matched Keywords
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {atsResult.matched.map(m => (
                                <span key={m} className="text-[9px] font-semibold text-slate-300 border border-success/20 bg-success/5 px-2 py-0.5 rounded">
                                  {m}
                                </span>
                              ))}
                              {atsResult.matched.length === 0 && (
                                <span className="text-[10px] text-slate-500">No matching keyword patterns parsed.</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {!atsResult && !isAtsAnalyzing && (
                    <div className="pt-4 border-t border-white/5">
                      <button
                        onClick={handleAtsAnalysis}
                        disabled={!jdText.trim()}
                        className="w-full bg-gradient-to-r from-accent-purple to-accent-cyan disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-md hover:shadow-accent-purple/20 transition-all"
                      >
                        Calculate Compatibility Index
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Form Box (Only for Chat Tab) */}
            {activeTab === 'chat' && (
              <form
                onSubmit={handleSendMessage}
                className="p-3 border-t border-white/5 bg-slate-900/30 flex gap-2 relative z-10"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask agent: 'Are you certified?' or 'Zero-to-one winner...'"
                  className="flex-1 bg-slate-950 border border-white/5 rounded-lg px-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-accent-cyan transition-all"
                />
                <button
                  type="submit"
                  className="bg-accent-cyan/15 hover:bg-accent-cyan/25 border border-accent-cyan/30 text-accent-cyan hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all"
                >
                  Send
                </button>
              </form>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default RecruiterAssistant;
