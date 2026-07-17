'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getDbBlogBySlug } from '@/app/admin/actions';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  createdAt: Date;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      const dbPost = await getDbBlogBySlug(slug);
      if (dbPost) {
        setPost(dbPost as any);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center bg-grid-pattern">
        <span className="text-sm text-slate-500">Retrieving article content...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center bg-grid-pattern p-4">
        <span className="text-sm text-error font-semibold">Article Not Found</span>
        <Link href="/blog" className="text-xs text-slate-400 hover:text-white transition-colors mt-4">
          Return to Blog Landing
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-8 bg-grid-pattern">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
        </div>

        <article className="space-y-6">
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

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-slate-400 italic border-l-2 border-accent-purple pl-4 py-1 text-sm leading-relaxed">
            {post.excerpt}
          </p>

          <div
            className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-6 pt-6 border-t border-white/5"
            style={{ whiteSpace: 'pre-line' }}
          >
            {post.content}
          </div>
        </article>
      </div>
    </main>
  );
}
