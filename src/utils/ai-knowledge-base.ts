export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  tech: string[];
  metrics: string[];
  problem: string;
  solution: string;
  architecture: string[];
  workflow: string[];
  businessValue: string;
  futureScope: string;
  lessons: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface KnowledgeBase {
  personalInfo: {
    name: string;
    title: string;
    subtitles: string[];
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    summary: string;
  };
  education: {
    degree: string;
    institution: string;
    date: string;
    cgpa: string;
    details: string[];
  }[];
  skills: {
    category: string;
    items: { name: string; proficiency: number }[];
  }[];
  projects: ProjectDetail[];
  experience: {
    role: string;
    company: string;
    duration: string;
    points: string[];
  }[];
  certifications: {
    title: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
  achievements: {
    title: string;
    description: string;
    links?: { label: string; url: string }[];
  }[];
  faqs: FAQ[];
}

export const aiKnowledgeBase: KnowledgeBase = {
  personalInfo: {
    name: "Saksham Aggarwal",
    title: "AI Engineer & Data Scientist",
    subtitles: [
      "AI Engineer",
      "Multi-Agent LLM Developer",
      "Computer Vision Specialist",
      "Full Stack AI Developer"
    ],
    location: "New Delhi, India",
    email: "Sakshamaggarwal2475@gmail.com",
    phone: "+91 9354703751",
    github: "https://github.com/SakshamSuper",
    linkedin: "https://www.linkedin.com/in/saksham-aggarwal-1343b0219",
    summary: "AI Engineer and Data Science undergraduate (CGPA 8.98) with proven, production-grade experience building multi-agent LLM systems, RAG pipelines, and end-to-end AI applications. Deep expertise in Python, Scikit-learn, FAISS, LangGraph, OpenCV, SQL, and cloud platforms. Winner of a national hackathon (1st of 600+ teams); certified across Microsoft Azure AI, Data Science & Fabric Analytics and Oracle Cloud Infrastructure."
  },
  education: [
    {
      degree: "Bachelor of Technology in Artificial Intelligence & Data Science",
      institution: "Guru Gobind Singh Indraprastha University, Delhi",
      date: "Expected 2027",
      cgpa: "8.98",
      details: [
        "Specialization in Machine Learning, Neural Networks, Computer Vision, and Big Data Analytics",
        "Rigorous coursework in Data Structures, SQL Database Design, and Linear Algebra",
        "Consistent academic excellence with a CGPA of 8.98/10"
      ]
    },
    {
      degree: "Class XII (CBSE)",
      institution: "St. Michael's Sr. Sec. School, New Delhi",
      date: "Graduated 2023",
      cgpa: "76.2%",
      details: ["Focus on Science and Mathematics"]
    },
    {
      degree: "Class X (CBSE)",
      institution: "St. Michael's Sr. Sec. School, New Delhi",
      date: "Graduated 2021",
      cgpa: "96.8%",
      details: ["Academic Distinction, scored top percentile in school"]
    }
  ],
  skills: [
    {
      category: "LLM & Multi-Agent AI",
      items: [
        { name: "LangGraph", proficiency: 93 },
        { name: "LangChain", proficiency: 90 },
        { name: "RAG Architecture (FAISS)", proficiency: 92 },
        { name: "Prompt Engineering", proficiency: 90 },
        { name: "Multi-Agent Orchestration", proficiency: 88 },
        { name: "OpenAI / Claude / GPT4All", proficiency: 85 }
      ]
    },
    {
      category: "ML & Computer Vision",
      items: [
        { name: "Scikit-learn", proficiency: 92 },
        { name: "OpenCV", proficiency: 92 },
        { name: "MediaPipe", proficiency: 90 },
        { name: "PyTorch", proficiency: 82 },
        { name: "TensorFlow", proficiency: 75 },
        { name: "Statistical Analysis", proficiency: 88 }
      ]
    },
    {
      category: "Programming & Engineering",
      items: [
        { name: "Python", proficiency: 95 },
        { name: "SQL (PostgreSQL, MySQL)", proficiency: 90 },
        { name: "FastAPI", proficiency: 88 },
        { name: "Streamlit", proficiency: 87 },
        { name: "Docker", proficiency: 82 },
        { name: "Git / GitHub", proficiency: 92 },
        { name: "Pytest", proficiency: 85 }
      ]
    },
    {
      category: "Data & Cloud Platforms",
      items: [
        { name: "Microsoft Azure (AI/Data)", proficiency: 90 },
        { name: "Pandas & NumPy", proficiency: 94 },
        { name: "Power BI", proficiency: 88 },
        { name: "Oracle Cloud (OCI)", proficiency: 78 },
        { name: "Google Cloud Platform", proficiency: 75 }
      ]
    }
  ],
  projects: [
    {
      id: "multi-agent-rag",
      title: "Adaptive Multi-Agent & RAG Knowledge System",
      subtitle: "LangGraph · FAISS · Scikit-learn · FastAPI · Streamlit · Docker",
      tech: ["Python", "LangGraph", "FAISS", "Scikit-learn", "FastAPI", "Streamlit", "Docker"],
      metrics: [
        "100% Top-1 topic retrieval accuracy via FAISS vector pipeline",
        "96.7% Recall@3 and perfect 1.0 MRR on knowledge retrieval benchmarks",
        "97.92% cross-validated accuracy on candidate readiness classifier",
        "25-test automated Pytest suite for continuous pipeline integrity"
      ],
      problem: "Technical hiring processes lack adaptive, personalized evaluation. Static question banks fail to probe candidates based on their actual knowledge gaps, and manual interviews are inconsistent and expensive.",
      solution: "Engineered a production multi-agent LLM orchestration system using LangGraph with four specialized agents — Resume Parser, Question, Evaluation, and Feedback — conducting fully adaptive technical interviews grounded in a live FAISS RAG knowledge base.",
      architecture: [
        "LangGraph State Machine: Orchestrates four agents with conditional routing based on candidate responses.",
        "FAISS RAG Pipeline: Sentence-Transformers encode domain knowledge; FAISS retrieves top-k relevant chunks for each question.",
        "Scikit-learn Classifier: Trained on readiness signals to score candidates at 97.92% CV accuracy.",
        "FastAPI Backend: Exposes REST endpoints for interview sessions, scoring, and feedback retrieval.",
        "Streamlit UI: Clean, interactive front-end for the interview experience.",
        "Docker: Containerized full-stack application for reproducible deployment."
      ],
      workflow: [
        "Candidate uploads resume; Resume Parser agent extracts skills, experience, and gaps.",
        "Question agent queries FAISS knowledge base to select domain-appropriate questions.",
        "Evaluation agent scores answers using the Scikit-learn classifier and semantic similarity.",
        "Feedback agent synthesizes a structured report with gap analysis and improvement roadmap.",
        "25 automated Pytest tests run on each pipeline change to prevent regressions."
      ],
      businessValue: "End-to-end ownership from data ingestion to live deployment. Demonstrates production-grade multi-agent system design, vector retrieval, ML classification, and full-stack engineering in a single cohesive product.",
      futureScope: "Expand knowledge base to multiple engineering domains, add voice-based interview mode using Whisper, and integrate with ATS systems for automated candidate pipeline management.",
      lessons: "Designing robust agent state machines requires careful consideration of failure modes. LangGraph's conditional routing provides excellent control, but agent prompt schemas must be extremely precise for reliable tool-calling with smaller models.",
      githubUrl: "https://github.com/SakshamSuper"
    },
    {
      id: "posture-analysis",
      title: "AI Vision Telemetry & Local LLM Agent",
      subtitle: "Computer Vision + Tool-Calling LLM + Notion API Integration",
      tech: ["Python", "OpenCV", "MediaPipe", "GPT4All", "OCR", "Notion API", "REST APIs"],
      metrics: [
        "~90% pose-tracking accuracy across 10+ exercises",
        "~25-30% improvement in user form accuracy during test sessions",
        "Live rep counting with joint-angle feedback and real-time voice correction",
        "On-premise LLM with RAG-style OCR document grounding — zero cloud API dependency"
      ],
      problem: "Lack of immediate, affordable feedback for home-based physiotherapy exercises increases injury risk and slows recovery. Users have no simple way to log, retrieve, or query their session data naturally.",
      solution: "Developed a computer vision application that estimates joint angles in real time using MediaPipe. Extended with a local GPT4All LLM conversational assistant that queries session logs and syncs them to Notion via tool calling.",
      architecture: [
        "Frame Capture: OpenCV captures video from the webcam stream.",
        "Pose Estimation: MediaPipe computes 33 key coordinate points on the user's body.",
        "Angle Computation: Mathematical calculation of joint angles at critical joints.",
        "LLM Pipeline: Structured session metrics are exported; a local GPT4All instance ingests them.",
        "Notion Connector: LLM calls custom Python tools to insert, retrieve, or summarize rows in a Notion database."
      ],
      workflow: [
        "User stands in front of camera and performs a selected exercise.",
        "The CV model tracks joints, counts reps, checks angle parameters, and voices live correction.",
        "At session end, metrics are generated and the user interacts with the LLM agent.",
        "'Log this session to Notion' — the agent parses the request and calls the Notion API.",
        "'How was my form in my last three sessions?' — LLM retrieves logs from Notion and answers."
      ],
      businessValue: "Makes home-based physiotherapy safe and self-guided. Showcases full-stack integration of computer vision with generative AI agent patterns and live API tool-use — entirely on-premise.",
      futureScope: "Add multi-camera views for 3D depth estimation, medical report OCR to calibrate target angle ranges automatically, and host video pipeline on cloud for mobile access.",
      lessons: "Local LLM reasoning models are highly sensitive to prompt structure. Designing bulletproof function schemas for tool calling on sub-8B parameter models is extremely challenging but highly rewarding.",
      githubUrl: "https://github.com/SakshamSuper"
    },
    {
      id: "wealthcraft",
      title: "WealthCraft — AI Personal Finance Platform",
      subtitle: "LLM-Powered Financial Planning & Wealth Management Dashboard",
      tech: ["Python", "LangChain", "FastAPI", "React", "PostgreSQL", "Plaid API", "Anthropic Claude"],
      metrics: [
        "Automated budget categorization with ~94% accuracy using LLM classification",
        "Real-time financial health scoring across 8+ dimensions",
        "Personalized AI investment insights grounded in user's actual spending patterns",
        "End-to-end encrypted financial data pipeline"
      ],
      problem: "Personal finance management tools are either overly simplistic (basic budgeting) or inaccessibly complex (institutional-grade tools). Users lack personalized, actionable AI-driven guidance tailored to their actual financial behavior.",
      solution: "Built a full-stack AI financial platform that connects to user bank accounts via Plaid API, automatically categorizes transactions using LLM classification, generates personalized wealth-building recommendations, and tracks financial health scores in real time.",
      architecture: [
        "Plaid Integration: Securely fetches bank transactions, balances, and account metadata.",
        "LLM Transaction Classifier: Claude classifies and categorizes transactions with context-aware reasoning.",
        "Financial Health Engine: FastAPI backend computes 8-dimension health scores (savings rate, debt ratio, etc.).",
        "RAG Advisor: LangChain retrieves personal financial data to ground AI recommendations.",
        "React Dashboard: Interactive charts for spending trends, savings goals, and investment allocation."
      ],
      workflow: [
        "User connects bank account via Plaid's secure OAuth flow.",
        "Transactions are fetched and classified by the LLM categorization pipeline.",
        "Financial health score is computed and displayed across all dimensions.",
        "User asks: 'How can I save more this month?' — RAG advisor grounds response in actual spending data.",
        "Personalized investment and savings recommendations are surfaced based on risk profile and goals."
      ],
      businessValue: "Democratizes sophisticated financial planning by combining secure bank connectivity, LLM intelligence, and actionable dashboards. Demonstrates expertise in FinTech integration, RAG-grounded advice, and production security practices.",
      futureScope: "Add stock portfolio tracking, tax optimization recommendations, and predictive cash flow forecasting using time-series ML models.",
      lessons: "Financial AI requires extreme care around hallucination. RAG grounding with user's actual data is non-negotiable — the LLM must never invent numbers. Trust is built through transparency and verifiable data sourcing.",
      githubUrl: "https://github.com/SakshamSuper"
    },
  ],
  experience: [
    {
      role: "Microsoft Learn Student Ambassador",
      company: "Microsoft",
      duration: "Jun 2024 - Present",
      points: [
        "Advocate for Microsoft Azure cloud services and AI tooling within the university student community",
        "Lead technical workshops and peer learning groups covering Azure AI services, machine learning fundamentals, and Azure Fabric",
        "Engage in community building, helping students build their first cloud applications and acquire certifications"
      ]
    },
    {
      role: "Open Source Contributor",
      company: "GirlScript Summer of Code (GSSoC)",
      duration: "Oct 2024 - Nov 2024",
      points: [
        "Contributed to active open-source AI and software projects",
        "Tested, debugged, and documented REST APIs using Postman",
        "Collaborated with developers globally, managing PRs, resolving code issues, and styling UI dashboards"
      ]
    }
  ],
  certifications: [
    {
      title: "Microsoft Certified: Azure AI Engineer Associate",
      issuer: "Microsoft",
      date: "2024",
      url: "https://learn.microsoft.com/credentials"
    },
    {
      title: "Microsoft Certified: Azure Data Scientist Associate",
      issuer: "Microsoft",
      date: "2024",
      url: "https://learn.microsoft.com/credentials"
    },
    {
      title: "Microsoft Certified: Fabric Analytics Engineer Associate",
      issuer: "Microsoft",
      date: "2024",
      url: "https://learn.microsoft.com/credentials"
    },
    {
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      date: "2024",
      url: "https://credentials.postman.com"
    },
    {
      title: "Oracle Cloud Infrastructure Foundations Associate",
      issuer: "Oracle",
      date: "2024",
      url: "https://education.oracle.com"
    }
  ],
  achievements: [
    {
      title: "Winner - Zero-to-One National Hackathon",
      description: "Secured 1st Place out of 600+ teams nationwide at Chandigarh University. Developed an innovative AI-driven solution solving real-world challenges, covered by ANI News and LinkedIn.",
      links: [
        { label: "ANI News Feature", url: "https://www.aninews.in" },
        { label: "LinkedIn Post", url: "https://linkedin.com" }
      ]
    },
    {
      title: "Runner-Up - IIIT Delhi HackLLM Hackathon",
      description: "Secured 2nd Place at IIIT Delhi's HackLLM. Recognized for designing and coding a high-impact Machine Learning / LLM prototype under strict 24-hour time limits.",
      links: [
        { label: "LinkedIn Post", url: "https://linkedin.com" }
      ]
    },
    {
      title: "Finalist in 5+ National-Level Hackathons",
      description: "Consistently qualified as a finalist in national hackathons across tracks including Computer Vision, Generative AI, and predictive analytics."
    }
  ],
  faqs: [
    {
      question: "Are you open to internships or full-time roles?",
      answer: "Yes, I am actively looking for AI Engineering, Machine Learning, or Full Stack AI Developer internships and associate roles. I am excited to work on production-grade systems, RAG pipelines, and agent integrations.",
      category: "general"
    },
    {
      question: "What is your primary tech stack?",
      answer: "My core programming language is Python. For AI & ML, I use OpenCV, MediaPipe, Scikit-learn, and PyTorch. For agentic AI and applications, I build with Next.js, TypeScript, Tailwind, SQLite/PostgreSQL, and integrate LLM APIs (OpenAI, Anthropic) or local models (Llama, GPT4All).",
      category: "technical"
    },
    {
      question: "Can you tell me about the Zero-to-One Hackathon project?",
      answer: "At the Chandigarh University Zero-to-One Hackathon, our team won 1st place out of 600+ teams. We built an AI-driven prototype that solves actual operational workflows. The project combined computer vision and real-time analytical feeds, illustrating robust design and reliable engineering under strict time pressure.",
      category: "achievements"
    },
    {
      question: "How do your Azure certifications help in your engineering?",
      answer: "As an Azure Certified AI Engineer Associate and Data Scientist Associate, I have structured knowledge of production cloud architectures. I know how to train, deploy, and monitor ML models on Azure, manage cognitive search services, orchestrate pipelines with Azure Data Factory, and securely connect APIs in cloud environments.",
      category: "technical"
    }
  ]
};
