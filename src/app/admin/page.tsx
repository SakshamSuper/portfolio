'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import MagneticButton from '@/components/ui/MagneticButton';
import {
  createProject,
  deleteProject,
  getDbProjects,
  createSkill,
  deleteSkill,
  getDbSkills,
  createCertificate,
  deleteCertificate,
  getDbCertificates,
  createBlog,
  deleteBlog,
  getDbBlogs,
  getDbInquiries,
  deleteInquiry,
} from './actions';
import { Award, Code, FolderOpen, KeyRound, LayoutGrid, Plus, Trash2, ArrowLeft, BookOpen, Mail } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  workflow: string;
  techStack: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  docUrl?: string | null;
  metrics: string;
  businessValue: string;
  futureScope: string;
  lessons: string;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'skills' | 'certs' | 'blogs' | 'inquiries'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    problem: '',
    solution: '',
    architecture: '',
    workflow: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    metrics: '',
    businessValue: '',
    futureScope: '',
    lessons: '',
  });

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'LLM / Agentic AI',
    proficiency: 85,
  });

  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    url: '',
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
  });

  const loadDbData = async () => {
    const dbProjs = await getDbProjects();
    const dbSkills = await getDbSkills();
    const dbCerts = await getDbCertificates();
    const dbBlogs = await getDbBlogs();
    const dbInquiries = await getDbInquiries();
    
    setProjects(dbProjs as any);
    setSkills(dbSkills as any);
    setCerts(dbCerts as any);
    setBlogs(dbBlogs as any);
    setInquiries(dbInquiries as any);
  };

  const handleDeleteInquiry = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      const res = await deleteInquiry(id);
      if (res.success) {
        loadDbData();
      } else {
        alert("Failed to delete inquiry: " + res.error);
      }
    }
  };

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'saksham-admin') {
      setIsAuthenticated(true);
      setAuthError(false);
      loadDbData();
    } else {
      setAuthError(true);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createProject(projForm);
    if (res.success) {
      alert('Project successfully created in SQLite database!');
      setProjForm({
        title: '',
        description: '',
        problem: '',
        solution: '',
        architecture: '',
        workflow: '',
        techStack: '',
        githubUrl: '',
        liveUrl: '',
        metrics: '',
        businessValue: '',
        futureScope: '',
        lessons: '',
      });
      loadDbData();
    } else {
      alert(`Prisma Error: ${res.error}`);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createSkill({
      ...skillForm,
      proficiency: Number(skillForm.proficiency),
    });
    if (res.success) {
      alert('Skill created in SQLite!');
      setSkillForm({ name: '', category: 'LLM / Agentic AI', proficiency: 85 });
      loadDbData();
    } else {
      alert(`Prisma Error: ${res.error}`);
    }
  };

  const handleAddCert = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createCertificate(certForm);
    if (res.success) {
      alert('Certificate created in SQLite!');
      setCertForm({ title: '', issuer: '', issueDate: '', url: '' });
      loadDbData();
    } else {
      alert(`Prisma Error: ${res.error}`);
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createBlog(blogForm);
    if (res.success) {
      alert('Blog Post created in SQLite!');
      setBlogForm({ title: '', slug: '', excerpt: '', content: '', tags: '' });
      loadDbData();
    } else {
      alert(`Prisma Error: ${res.error}`);
    }
  };

  const handleDeleteProj = async (id: string) => {
    if (confirm('Delete project?')) {
      const res = await deleteProject(id);
      if (res.success) loadDbData();
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Delete skill?')) {
      const res = await deleteSkill(id);
      if (res.success) loadDbData();
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (confirm('Delete certificate?')) {
      const res = await deleteCertificate(id);
      if (res.success) loadDbData();
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm('Delete blog post?')) {
      const res = await deleteBlog(id);
      if (res.success) loadDbData();
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 bg-grid-pattern">
        <GlassCard className="p-8 w-full max-w-sm" glowColor="rgba(139, 92, 246, 0.12)">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="p-3 rounded-full bg-slate-900 border border-white/10 text-accent-purple mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-display font-bold text-white">Admin Dashboard Gate</h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter passcode to unlock local SQLite database editing dashboard.
            </p>
          </div>

          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode (e.g. saksham-admin)"
                className="w-full bg-slate-950 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple transition-all text-center"
              />
            </div>

            {authError && (
              <span className="text-[10px] text-error font-semibold text-center block">
                Invalid Passcode. Verify local keys.
              </span>
            )}

            <MagneticButton type="submit" className="w-full bg-gradient-to-r from-accent-purple to-primary-blue text-white font-bold py-2 text-xs uppercase tracking-wider">
              Verify Credentials
            </MagneticButton>
          </form>
          
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors mt-6 w-full justify-center">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </GlassCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-8 bg-grid-pattern">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Database Control Panel</h1>
            <p className="text-xs text-slate-500 mt-1">Prisma SQLite instance: `prisma/dev.db`</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/5 py-2 px-4 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Portfolio</span>
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 border-b border-white/5 mb-8">
          <button
            onClick={() => setActiveSubTab('projects')}
            className={`pb-3 px-2 font-display text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 ${
              activeSubTab === 'projects' ? 'border-accent-cyan text-white' : 'border-transparent text-slate-500 hover:text-slate-400'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => setActiveSubTab('skills')}
            className={`pb-3 px-2 font-display text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 ${
              activeSubTab === 'skills' ? 'border-accent-purple text-white' : 'border-transparent text-slate-500 hover:text-slate-400'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Skills</span>
          </button>
          <button
            onClick={() => setActiveSubTab('certs')}
            className={`pb-3 px-2 font-display text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 ${
              activeSubTab === 'certs' ? 'border-primary-blue text-white' : 'border-transparent text-slate-500 hover:text-slate-400'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certifications</span>
          </button>
          <button
            onClick={() => setActiveSubTab('blogs')}
            className={`pb-3 px-2 font-display text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 ${
              activeSubTab === 'blogs' ? 'border-accent-cyan text-white' : 'border-transparent text-slate-500 hover:text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blogs</span>
          </button>
          <button
            onClick={() => setActiveSubTab('inquiries')}
            className={`pb-3 px-2 font-display text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 ${
              activeSubTab === 'inquiries' ? 'border-accent-purple text-white' : 'border-transparent text-slate-500 hover:text-slate-400'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7">
            
            {activeSubTab === 'projects' && (
              <GlassCard className="p-6" glowColor="rgba(6, 182, 212, 0.08)">
                <h3 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-accent-cyan" />
                  <span>Register New Project</span>
                </h3>

                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Project Title</label>
                      <input
                        type="text"
                        required
                        value={projForm.title}
                        onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                        placeholder="AI Posture Analysis"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Subtitle</label>
                      <input
                        type="text"
                        required
                        value={projForm.description}
                        onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                        placeholder="Computer Vision Exercise Coach"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Problem Statement</label>
                    <textarea
                      required
                      value={projForm.problem}
                      onChange={(e) => setProjForm({ ...projForm, problem: e.target.value })}
                      placeholder="What specific issue does this system resolve?"
                      rows={2}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Solution Summary</label>
                    <textarea
                      required
                      value={projForm.solution}
                      onChange={(e) => setProjForm({ ...projForm, solution: e.target.value })}
                      placeholder="What is your engineered resolution?"
                      rows={2}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Architecture (comma-sep)</label>
                      <input
                        type="text"
                        required
                        value={projForm.architecture}
                        onChange={(e) => setProjForm({ ...projForm, architecture: e.target.value })}
                        placeholder="Step 1, Step 2, Step 3"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Workflow Steps (comma-sep)</label>
                      <input
                        type="text"
                        required
                        value={projForm.workflow}
                        onChange={(e) => setProjForm({ ...projForm, workflow: e.target.value })}
                        placeholder="Action A, Action B"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Tech Stack (comma-sep)</label>
                      <input
                        type="text"
                        required
                        value={projForm.techStack}
                        onChange={(e) => setProjForm({ ...projForm, techStack: e.target.value })}
                        placeholder="Python, OpenCV, MediaPipe"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Metrics (comma-sep)</label>
                      <input
                        type="text"
                        required
                        value={projForm.metrics}
                        onChange={(e) => setProjForm({ ...projForm, metrics: e.target.value })}
                        placeholder="90% Tracking Accuracy, +25% Improvement"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Business Value</label>
                      <input
                        type="text"
                        required
                        value={projForm.businessValue}
                        onChange={(e) => setProjForm({ ...projForm, businessValue: e.target.value })}
                        placeholder="Reduces injury risk"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Future Scope</label>
                      <input
                        type="text"
                        required
                        value={projForm.futureScope}
                        onChange={(e) => setProjForm({ ...projForm, futureScope: e.target.value })}
                        placeholder="Deploy to Azure App Service"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Lessons Learned</label>
                    <input
                      type="text"
                      required
                      value={projForm.lessons}
                      onChange={(e) => setProjForm({ ...projForm, lessons: e.target.value })}
                      placeholder="Prompt engineering local models is hard"
                      className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">GitHub Repo Link</label>
                      <input
                        type="url"
                        value={projForm.githubUrl}
                        onChange={(e) => setProjForm({ ...projForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Live Host Link</label>
                      <input
                        type="url"
                        value={projForm.liveUrl}
                        onChange={(e) => setProjForm({ ...projForm, liveUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <MagneticButton type="submit" className="w-full bg-accent-cyan text-slate-950 font-bold py-2.5 text-xs uppercase tracking-wider">
                      Write Project to Database
                    </MagneticButton>
                  </div>
                </form>
              </GlassCard>
            )}

            {activeSubTab === 'skills' && (
              <GlassCard className="p-6" glowColor="rgba(139, 92, 246, 0.08)">
                <h3 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-accent-purple" />
                  <span>Register New Skill Entry</span>
                </h3>

                <form onSubmit={handleAddSkill} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      placeholder="e.g. PyTorch"
                      className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-purple"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Skill Category</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
                    >
                      <option>LLM / Agentic AI</option>
                      <option>Computer Vision & ML</option>
                      <option>Languages & Databases</option>
                      <option>Cloud & Dev Tools</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Proficiency % (1-100)</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={skillForm.proficiency}
                      onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
                    />
                  </div>

                  <div className="pt-4">
                    <MagneticButton type="submit" className="w-full bg-accent-purple text-white font-bold py-2.5 text-xs uppercase tracking-wider">
                      Write Skill to Database
                    </MagneticButton>
                  </div>
                </form>
              </GlassCard>
            )}

            {activeSubTab === 'certs' && (
              <GlassCard className="p-6" glowColor="rgba(59, 130, 246, 0.08)">
                <h3 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary-blue" />
                  <span>Register Certification Credential</span>
                </h3>

                <form onSubmit={handleAddCert} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Credential Title</label>
                    <input
                      type="text"
                      required
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      placeholder="Azure AI Engineer Associate"
                      className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-primary-blue"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Issuer Agency</label>
                      <input
                        type="text"
                        required
                        value={certForm.issuer}
                        onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                        placeholder="Microsoft"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-primary-blue"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Issue Date / Year</label>
                      <input
                        type="text"
                        required
                        value={certForm.issueDate}
                        onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                        placeholder="2024"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-primary-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Credential Verify URL</label>
                    <input
                      type="url"
                      value={certForm.url}
                      onChange={(e) => setCertForm({ ...certForm, url: e.target.value })}
                      placeholder="https://learn.microsoft.com/credentials"
                      className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-primary-blue"
                    />
                  </div>

                  <div className="pt-4">
                    <MagneticButton type="submit" className="w-full bg-primary-blue text-white font-bold py-2.5 text-xs uppercase tracking-wider">
                      Write Certificate to Database
                    </MagneticButton>
                  </div>
                </form>
              </GlassCard>
            )}

            {activeSubTab === 'blogs' && (
              <GlassCard className="p-6" glowColor="rgba(6, 182, 212, 0.08)">
                <h3 className="text-lg font-display font-semibold text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-accent-cyan" />
                  <span>Write New Blog Post</span>
                </h3>

                <form onSubmit={handleAddBlog} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        placeholder="Structured LLM Generation"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Slug URL</label>
                      <input
                        type="text"
                        required
                        value={blogForm.slug}
                        onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                        placeholder="structured-llm-generation"
                        className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Summary / Excerpt</label>
                    <input
                      type="text"
                      required
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      placeholder="Bridging the gap between raw LLM string results and rigid programmatic inputs."
                      className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Tags (comma-sep)</label>
                    <input
                      type="text"
                      required
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      placeholder="LLMs, Agentic AI, JSON Schema"
                      className="w-full bg-slate-950 border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Post Content</label>
                    <textarea
                      required
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      placeholder="Write your article markdown/text content here..."
                      rows={8}
                      className="w-full bg-slate-950 border border-white/5 rounded-lg p-3 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-accent-cyan resize-none font-mono"
                    />
                  </div>

                  <div className="pt-4">
                    <MagneticButton type="submit" className="w-full bg-accent-cyan text-slate-950 font-bold py-2.5 text-xs uppercase tracking-wider">
                      Publish Blog Post
                    </MagneticButton>
                  </div>
                </form>
              </GlassCard>
            )}

            {activeSubTab === 'inquiries' && (
              <GlassCard className="p-8" glowColor="rgba(168, 85, 247, 0.08)">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                  <Mail className="w-6 h-6 text-accent-purple" />
                  <div>
                    <h3 className="text-xl font-display font-bold text-white">Inquiries Inbox</h3>
                    <p className="text-xs text-slate-500 mt-1">Submitted via portfolio contact form</p>
                  </div>
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-sm text-slate-500 italic block">No inquiries received yet.</span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="p-5 rounded-xl border border-white/5 bg-slate-950/40 hover:border-accent-purple/20 transition-all duration-300 relative group/inq">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3.5">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-white text-sm">{inq.name}</h4>
                            <a href={`mailto:${inq.email}`} className="text-xs text-accent-cyan hover:underline">{inq.email}</a>
                            {inq.company && (
                              <span className="text-[10px] text-slate-500 block mt-0.5 font-semibold uppercase tracking-wider">Org: {inq.company}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-[10px] text-slate-650 font-mono">
                              {new Date(inq.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded bg-white/5 hover:bg-white/10"
                              title="Delete Message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 bg-white/[0.01] border border-white/5 p-3 rounded-lg leading-relaxed whitespace-pre-wrap font-mono">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            )}

          </div>

          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="p-6" glowColor="rgba(255, 255, 255, 0.03)">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <h3 className="font-display font-semibold text-white text-sm flex items-center gap-2">
                  <LayoutGrid className="w-4.5 h-4.5 text-slate-400" />
                  <span>Existing DB Entries</span>
                </h3>
                <span className="text-[10px] bg-slate-900 border border-white/5 px-2 py-0.5 rounded text-slate-400">
                  SQLite
                </span>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                
                {activeSubTab === 'projects' && (
                  projects.length === 0 ? (
                    <span className="text-xs text-slate-500 italic block text-center py-6">No custom projects in database. Fallback configurations rendering on portfolio.</span>
                  ) : (
                    projects.map((p) => (
                      <div key={p.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-white/5">
                        <div className="flex-1 min-w-0 pr-4">
                          <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                          <span className="text-[10px] text-slate-500 truncate block">{p.description}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteProj(p.id)}
                          className="text-slate-500 hover:text-error transition-colors p-1.5"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )
                )}

                {activeSubTab === 'skills' && (
                  skills.length === 0 ? (
                    <span className="text-xs text-slate-500 italic block text-center py-6">No custom skills in database.</span>
                  ) : (
                    skills.map((s) => (
                      <div key={s.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-white/5">
                        <div>
                          <h4 className="text-xs font-bold text-white">{s.name}</h4>
                          <span className="text-[10px] text-slate-500">{s.category} ({s.proficiency}%)</span>
                        </div>
                        <button
                          onClick={() => handleDeleteSkill(s.id)}
                          className="text-slate-500 hover:text-error transition-colors p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )
                )}

                {activeSubTab === 'certs' && (
                  certs.length === 0 ? (
                    <span className="text-xs text-slate-500 italic block text-center py-6">No custom certificates in database.</span>
                  ) : (
                    certs.map((c) => (
                      <div key={c.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-white/5">
                        <div>
                          <h4 className="text-xs font-bold text-white">{c.title}</h4>
                          <span className="text-[10px] text-slate-500">{c.issuer} - {c.issueDate}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteCert(c.id)}
                          className="text-slate-500 hover:text-error transition-colors p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )
                )}

                {activeSubTab === 'blogs' && (
                  blogs.length === 0 ? (
                    <span className="text-xs text-slate-500 italic block text-center py-6">No custom articles in database.</span>
                  ) : (
                    blogs.map((b) => (
                      <div key={b.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-white/5">
                        <div className="flex-1 min-w-0 pr-4">
                          <h4 className="text-xs font-bold text-white truncate">{b.title}</h4>
                          <span className="text-[10px] text-slate-500 truncate block">slug: {b.slug}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteBlog(b.id)}
                          className="text-slate-500 hover:text-error transition-colors p-1.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )
                )}
                {activeSubTab === 'inquiries' && (
                  <div className="bg-slate-955 p-4 rounded-xl border border-white/5 space-y-4">
                    <div className="text-center py-2 border-b border-white/5">
                      <span className="text-3xl">📨</span>
                      <h4 className="text-xs font-bold text-white mt-2">Active Notifications</h4>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">Web3Forms status</p>
                    </div>
                    <div className="text-xs space-y-2.5 text-slate-400">
                      <div className="flex justify-between items-center bg-white/[0.01] p-2.5 rounded border border-white/5">
                        <span>Database Storage:</span>
                        <span className="text-emerald-400 font-bold font-mono">ENABLED</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/[0.01] p-2.5 rounded border border-white/5">
                        <span>Email Forwarding:</span>
                        <span className={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ? "text-emerald-400 font-bold font-mono" : "text-yellow-500 font-bold font-mono"}>
                          {process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ? "ACTIVE" : "PENDING KEY"}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal mt-2">
                        To enable instant email alerts to your address, add the key in your `.env` file as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </main>
  );
}
