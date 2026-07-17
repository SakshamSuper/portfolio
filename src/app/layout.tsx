import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Saksham Aggarwal | AI Engineer & Data Scientist Portfolio",
  description: "Portfolio of Saksham Aggarwal, a specialized AI Engineer and Data Scientist building production-grade computer vision, agentic AI tools, and predictive ML systems.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision Specialist",
    "Data Scientist",
    "Full Stack AI Developer",
    "Saksham Aggarwal",
    "Azure AI Engineer"
  ],
  authors: [{ name: "Saksham Aggarwal" }],
  openGraph: {
    title: "Saksham Aggarwal | AI Engineer & Data Scientist",
    description: "I build production-grade AI systems. Discover projects in computer vision, LLM agent tool-calling, and ML forecasting.",
    url: "https://sakshamaggarwal.vercel.app",
    siteName: "Saksham Aggarwal Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saksham Aggarwal | AI Engineer & Data Scientist",
    description: "I build production-grade AI systems. Discover projects in computer vision, LLM agent tool-calling, and ML forecasting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Saksham Aggarwal",
    "jobTitle": "AI Engineer & Data Scientist",
    "url": "https://sakshamaggarwal.vercel.app",
    "sameAs": [
      "https://github.com/SakshamSuper",
      "https://www.linkedin.com/in/saksham-aggarwal-1343b0219"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Guru Gobind Singh Indraprastha University"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Data Science",
      "Azure Cloud",
      "Natural Language Processing",
      "Large Language Models"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
