# Premium Portfolio Dashboard - Saksham Aggarwal

A state-of-the-art developer portfolio and database control panel built with **Next.js 16**, **React 19**, and **Prisma ORM**. The application features an interactive terminal interface, scroll-linked observer animations, and a secure administration panel backed by SQLite.

---

## 🚀 Key Features

* **Glassmorphic Interactive UI**: Fully responsive profile card deck, dynamic tech stack visualization, and custom inline concept SVGs (LLM, RAG, API).
* **Developer Terminal Console**: Interactive log simulation tracking viewport activity, scroll offsets, and system diagnostics.
* **Credentials Grid**: Squircle badges with active detail panel wrappers displaying Microsoft Azure, Fabric, and Databricks qualifications.
* **Inquiry Inbox & Email Forwarding**: Dual-purpose contact system that stores inquiry data directly in a local SQLite database and forwards emails via Web3Forms API.
* **Database Control Panel**: A password-protected `/admin` dashboard allowing management of projects, skills, certificates, blog posts, and user inquiries.

---

## 🛠 Tech Stack

* **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, GSAP, Lucide Icons, Canvas Confetti.
* **Database & ORM**: SQLite (`dev.db`), Prisma 7 (Rust-free compiler with `@prisma/adapter-better-sqlite3` and `better-sqlite3`).
* **Deployment & Integration**: Web3Forms API, Vercel platform optimization.

---

## 📦 Getting Started

### 1. Prerequisites
Ensure you have **Node.js v24.x** and **npm** installed on your system.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone <your-repository-url>
cd portfolio
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and define the following variables:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY="your-web3forms-access-key"
```

### 4. Database Setup
Synchronize the SQLite database and generate the Prisma Client:
```bash
npx prisma db push
npx prisma generate
```

### 5. Running the Application
Start the development server with Webpack compiler compatibility:
```bash
npm run dev -- --webpack
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 📂 Project Directory Structure

```text
├── prisma/
│   ├── schema.prisma      # Prisma schema (Inquiry, Project, Skill, etc.)
│   └── dev.db             # Local SQLite database instance (git-ignored)
├── public/
│   └── assets/            # Static assets and images
├── src/
│   ├── app/
│   │   ├── admin/         # Admin Control Dashboard and server actions
│   │   └── page.tsx       # Core portfolio client page with Scroll Observer
│   ├── components/
│   │   ├── sections/      # Portfolio sections (Hero, About, Experience, Contact)
│   │   └── ui/            # Glassmorphic wrappers and custom components
│   └── utils/
│       ├── db.ts          # Driver-adapter backed Prisma client constructor
│       └── ai-knowledge-base.ts # Structured curriculum resume data
```

---

## 🛡 License
This project is open-source and available under the [MIT License](LICENSE).
