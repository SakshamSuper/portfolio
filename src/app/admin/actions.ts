'use server';

import prisma from '@/utils/db';
import { revalidatePath } from 'next/cache';

// Projects
export async function getDbProjects() {
  try {
    return await prisma.project.findMany({ orderBy: { order: 'asc' } });
  } catch (e) {
    console.error("Prisma projects fetch failed, fallback active:", e);
    return [];
  }
}

export async function createProject(data: {
  title: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string;
  workflow: string;
  techStack: string;
  githubUrl?: string;
  liveUrl?: string;
  docUrl?: string;
  metrics: string;
  businessValue: string;
  futureScope: string;
  lessons: string;
}) {
  try {
    const res = await prisma.project.create({ data });
    revalidatePath('/');
    return { success: true, project: res };
  } catch (e) {
    console.error("Prisma project creation failed:", e);
    return { success: false, error: String(e) };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath('/');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// Skills
export async function getDbSkills() {
  try {
    return await prisma.skill.findMany({ orderBy: { order: 'asc' } });
  } catch (e) {
    return [];
  }
}

export async function createSkill(data: {
  name: string;
  category: string;
  proficiency: number;
}) {
  try {
    const res = await prisma.skill.create({ data });
    revalidatePath('/');
    return { success: true, skill: res };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({ where: { id } });
    revalidatePath('/');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// Certificates
export async function getDbCertificates() {
  try {
    return await prisma.certificate.findMany({ orderBy: { order: 'asc' } });
  } catch (e) {
    return [];
  }
}

export async function createCertificate(data: {
  title: string;
  issuer: string;
  issueDate: string;
  url?: string;
  imageUrl?: string;
}) {
  try {
    const res = await prisma.certificate.create({ data });
    revalidatePath('/');
    return { success: true, certificate: res };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function deleteCertificate(id: string) {
  try {
    await prisma.certificate.delete({ where: { id } });
    revalidatePath('/');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// Blogs
export async function getDbBlogs() {
  try {
    return await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (e) {
    return [];
  }
}

export async function getDbBlogBySlug(slug: string) {
  try {
    return await prisma.blog.findUnique({ where: { slug } });
  } catch (e) {
    return null;
  }
}

export async function createBlog(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
}) {
  try {
    const res = await prisma.blog.create({ data });
    revalidatePath('/blog');
    return { success: true, blog: res };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

export async function deleteBlog(id: string) {
  try {
    await prisma.blog.delete({ where: { id } });
    revalidatePath('/blog');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

// Inquiries
export async function getDbInquiries() {
  try {
    return await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (e) {
    console.error("Prisma fetch inquiries failed:", e);
    return [];
  }
}

export async function createDbInquiry(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  try {
    const res = await prisma.inquiry.create({ data });
    revalidatePath('/admin');
    return { success: true, inquiry: res };
  } catch (e) {
    console.error("Prisma inquiry creation failed:", e);
    return { success: false, error: String(e) };
  }
}

export async function deleteInquiry(id: string) {
  try {
    await prisma.inquiry.delete({ where: { id } });
    revalidatePath('/admin');
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}

