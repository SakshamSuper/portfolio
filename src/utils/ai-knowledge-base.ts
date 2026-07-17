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
      "Machine Learning Engineer",
      "Computer Vision Specialist",
      "Full Stack AI Developer"
    ],
    location: "New Delhi, India",
    email: "Sakshamaggarwal2475@gmail.com",
    phone: "+91 9354703751",
    github: "https://github.com/SakshamSuper",
    linkedin: "https://www.linkedin.com/in/saksham-aggarwal-1343b0219",
    summary: "AI & Data Science student with hands-on experience building LLM-powered applications, local agentic workflows, and computer vision systems. Azure-certified across AI Engineering, Data Science, and Fabric Analytics. Proven track record of shipping under pressure (1st place out of 600+ teams in national hackathons)."
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
      category: "ML/AI",
      items: [
        { name: "OpenCV", proficiency: 92 },
        { name: "MediaPipe", proficiency: 90 },
        { name: "PyTorch", proficiency: 82 },
        { name: "TensorFlow", proficiency: 75 },
        { name: "Scikit-Learn", proficiency: 88 }
      ]
    },
    {
      category: "Data Analytics",
      items: [
        { name: "Pandas", proficiency: 94 },
        { name: "NumPy", proficiency: 92 },
        { name: "Matplotlib & Seaborn", proficiency: 90 },
        { name: "Power BI", proficiency: 88 },
        { name: "Tableau", proficiency: 80 }
      ]
    },
    {
      category: "Languages & Tools",
      items: [
        { name: "Python", proficiency: 95 },
        { name: "SQL (MySQL)", proficiency: 90 },
        { name: "Advanced Excel", proficiency: 85 },
        { name: "Git / GitHub", proficiency: 92 },
        { name: "Postman API Testing", proficiency: 90 },
        { name: "Jupyter Notebook", proficiency: 95 }
      ]
    },
    {
      category: "Platforms",
      items: [
        { name: "Microsoft Azure (AI/Data)", proficiency: 90 },
        { name: "Google Cloud Platform", proficiency: 75 },
        { name: "Kaggle", proficiency: 85 },
        { name: "Vercel", proficiency: 80 }
      ]
    }
  ],
  projects: [
    {
      id: "posture-analysis",
      title: "AI Posture Analysis & Physiotherapy System",
      subtitle: "Computer Vision + Local Agentic LLM Chatbot + Notion Tool Use",
      tech: ["Python", "OpenCV", "MediaPipe", "GPT4All", "OCR", "Notion API", "REST APIs"],
      metrics: [
        "~90% pose-tracking accuracy in controlled environments",
        "~25-30% improvement in user form accuracy during test sessions",
        "Supports 10+ exercises with live repetition counting and joint angle feedback"
      ],
      problem: "Lack of immediate, affordable feedback for home-based physiotherapy exercises increases the risk of injury and slows recovery. Users have no simple way to log, retrieve, or query their session logs naturally.",
      solution: "Developed a computer vision application that estimates joint angles in real time. Extended this with a local GPT4All LLM conversational assistant that queries the session logs and logs them directly to users' Notion accounts via tool calling.",
      architecture: [
        "Frame Capture: OpenCV captures video from the webcam stream.",
        "Pose Estimation: MediaPipe computes 33 key coordinate points on the user's body.",
        "Angle Computation: Mathematical calculation of joint angles (e.g. elbow, knee) at critical joints.",
        "LLM Pipeline: Structured session metrics are exported, and a local GPT4All instance ingests them.",
        "Notion Connector: LLM calls custom Python tools to insert, retrieve, or summarize rows in a Notion database."
      ],
      workflow: [
        "User stands in front of camera and performs a selected exercise.",
        "The CV model tracks joints, counts reps, checks if angles meet target parameters, and voices live correction.",
        "At the end of the session, metrics are generated.",
        "The user talks to the chatbot: 'Log this session to Notion.' The agent parses the request and makes the Notion API call.",
        "The user can also ask: 'How was my form in my last three bicep curl sessions?' The LLM retrieves logs from Notion and answers."
      ],
      businessValue: "Makes home-based physiotherapy safe and self-guided. Showcases complete full-stack integration of computer vision (low-level logic) with generative AI agent patterns (high-level reasoning and API tool-use).",
      futureScope: "Incorporate multi-camera views for 3D depth estimation, add medical report OCR extraction to calibrate target angle ranges automatically, and host the video pipeline on a fast cloud server.",
      lessons: "Local LLM reasoning models are highly sensitive to prompt structure. Designing solid, bulletproof function schemas for tool calling on models with under 8B parameters is extremely challenging but highly rewarding."
    },
    {
      id: "equity-analyst",
      title: "Equity Analyst Pro",
      subtitle: "LLM-Powered Financial Analysis Dashboard",
      tech: ["Python", "Anthropic API", "React", "Prompt Engineering", "Structured JSON Schema"],
      metrics: [
        "100% parse success rate through strict JSON validation schema",
        "Generates multi-company structured comparison matrices in under 5 seconds",
        "Identifies and flags anomalous quarterly reports with ~85% precision"
      ],
      problem: "Company earnings releases are long, complex, and unstandardized. Financial analysts spend hours manually copying details to spreadsheets and comparing metrics.",
      solution: "An automated dashboard that passes raw text earnings transcripts to the Anthropic API using structured prompt schemas. The model returns verified JSON containing key performance indicators, summaries, and flags, rendered on a clean interactive React interface.",
      architecture: [
        "Text Ingestion: The user inputs PDF or raw text earnings reports.",
        "JSON Schema Engine: Defines a strict structural schema (summary, revenue, margins, flags, guidance).",
        "LLM Query: Prompts Anthropic Claude using XML tags to output JSON matching the exact schema.",
        "Validation: A parser verifies keys, types, and mathematical consistency before saving to SQLite.",
        "UI Rendering: A React app visualizes the financial indicators, charts historical performance, and highlights flagged risks."
      ],
      workflow: [
        "User uploads the PDF of a company's quarterly earnings statement.",
        "The backend cleans the text and queries Claude with structured prompt rules.",
        "Claude parses the balance sheet, cash flows, and notes, returning a clean JSON object.",
        "The dashboard visualizes the findings: key KPIs, a quick executive summary, and flagged operational risks.",
        "The analyst compares multiple quarters side-by-side inside the interactive matrix."
      ],
      businessValue: "Reduces financial report parsing times by over 90%. Demonstrates prompt engineering capability, structured text extraction, and bridging LLM outputs to rigid, user-friendly frontend dashboards.",
      futureScope: "Integrate vector embeddings for semantic search over historical transcript databases and connect live web scraping to fetch earnings calls as soon as they release.",
      lessons: "LLMs can struggle with calculations. It is better to extract the raw figures via LLM and perform calculations (like margins or percentage growth) in code than to rely on the model for arithmetic."
    },
    {
      id: "crypto-analysis",
      title: "Cryptocurrency Market Analysis Engine",
      subtitle: "Machine Learning & Price Direction Forecasting",
      tech: ["Python", "Machine Learning", "Regression", "Exploratory Data Analysis", "Power BI", "Tableau", "Pandas"],
      metrics: [
        "~60-75% accuracy in short-term price direction forecasting",
        "~20% forecast stability improvement relative to simple moving average baselines",
        "Analyzes historical volatility trends across 15+ major coins simultaneously"
      ],
      problem: "Crypto markets are highly volatile and driven by sentiment, making forecasting extremely unstable with basic technical indicators alone.",
      solution: "Conducted exhaustive exploratory data analysis (EDA) on historical prices, volumes, and volatility indicators. Trained multiple regression and classification models to predict short-term price direction, visualizing findings in interactive Power BI dashboards.",
      architecture: [
        "Data Collection: Fetched historical daily/hourly price, volume, and volatility data.",
        "Feature Engineering: Created lagging indicators, volatility spreads, and volume momentum scores.",
        "Model Training: Evaluated Linear, Ridge, and Lasso Regressions along with Random Forests.",
        "Dashboard Design: Built Power BI dashboards connecting SQLite predictions and metrics to active charts."
      ],
      workflow: [
        "Fetch data and compute technical features (MACD, RSI, Volatility bands).",
        "Train and tune models on a rolling cross-validation window to prevent lookahead bias.",
        "Export forecasts to SQLite and update the Power BI reporting dashboard.",
        "The dashboard displays predicted trend directions, model confidence scores, and historical indicators."
      ],
      businessValue: "Assists traders in identifying high-impact price indicators, improving risk management, and structuring stable trading portfolios.",
      futureScope: "Incorporate social media sentiment analysis (from Twitter and Reddit) as a feature, and test deep learning models (LSTM, GRU) for time-series forecasting.",
      lessons: "Overfitting is a massive risk in financial data. Simple regression models with strong L1/L2 regularization frequently outperform complex, deep neural networks on highly noisy financial datasets."
    }
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
