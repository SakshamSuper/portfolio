'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { getDbBlogs } from '@/app/admin/actions';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, Tag } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags: string;
  createdAt: Date;
}

export default function BlogLanding() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const posts = await getDbBlogs();
      setBlogs(posts as any);
    };
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground p-8 bg-grid-pattern flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full flex-1">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-6 mb-12">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">The AI Synthesis Blog</h1>
            <p className="text-xs text-slate-500 mt-1">Empirical thoughts on AI engineering, agent patterns, and computer vision.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/5 py-2 px-4 rounded-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Blog Post List */}
        <div className="space-y-6">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500 text-sm">No blog posts have been added to the database yet.</p>
              <Link href="/admin" className="text-accent-cyan hover:underline text-xs mt-2 inline-block">
                Open Admin Panel to Write Post
              </Link>
            </div>
          ) : (
            blogs.map((post) => (
              <GlassCard key={post.id} className="p-6" glowColor="rgba(139, 92, 246, 0.06)">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>{post.tags}</span>
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg sm:text-xl font-display font-bold text-white hover:text-accent-cyan transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-accent-purple hover:text-white transition-colors mt-4 inline-block"
                  >
                    Read Article →
                  </Link>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
