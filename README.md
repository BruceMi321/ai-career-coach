## 🌐 Languages  
[![English](https://img.shields.io/badge/Language-English-blue.svg)](README.md)
[![中文](https://img.shields.io/badge/语言-中文-red.svg)](README_zh.md)


# 🧭 AI Career Coach (YourWayCareer)

An ultra-premium, modern AI-powered Career Path Planner & Interview Prep Coach built with **React, TypeScript, Vite, Tailwind CSS, and Supabase Edge Functions (Deno)**. 

Designed under a rigorous **McKinsey-inspired aesthetic system**, it features a fully-functional Client-Key model (BYOK - Bring Your Own Key) which allows developers to host a comprehensive AI SaaS platform with **zero operational API expenses**.

---

## 🌟 Core Features

### 🔍 1. Smart Resume Evaluation & scoring matrix
* **5-Dimensional Assessment**: Evaluates match, career pathway quality, professional presentation, soft skills, and competitive edge.
* **WOW-Factor Radial SVG Gauge**: A beautifully styled, animated gradient radial gauge that draws itself on render.
* **McKinsey-style Quote Blocks**: Present AI summaries in a luxurious, italicized card with custom quote markings.
* **Copy-to-Clipboard Actions**: Easily copy optimized summaries or project achievements with smooth dynamic checkmark state feedback.

### 🤖 2. Immersive Mock Interview Coach
* **Server-Sent Events (SSE) Stream**: Low-latency, real-time streaming chatbot mapped from Claude, Gemini, or OpenAI to a standard unified format.
* **Animated Bubble Dialogues**: GPU-accelerated chat entry animations (`animate-card-enter`) with modern frosted glassmorphic styles (`backdrop-blur`).
* **Pulse-Glow Reminders**: Breathing light alerts that prompt users to fill in job details before interviewing.

### 🧭 3. Interactive Career Roadmaps
* **Vertical Node Timeline Tree**: A gorgeous chronological roadmap displaying step-by-step career milestones.
* **Gamified Skills Checklists**: Interactive hard and soft skill badges that users can check off to track learning.
* **Resume Autofill Utility**: Parses current resume inputs to auto-extract and prefill current job titles with a single click.

### 🔑 4. Multi-Provider BYOK Client Secrets
* Client-side local key management for **OpenAI, Anthropic Claude, Google Gemini, Azure AI, and OpenRouter**.
* Eliminates operational token expenses, making open-source hosting incredibly practical.

---

## 🛠️ Technology Stack

* **Frontend Core**: React 18, TypeScript, Vite, Tailwind CSS
* **UI Components**: Radix UI, shadcn/ui, Lucide Icons
* **Data Flow & Routing**: React Router v6, TanStack React Query v5
* **Backend Services**: Supabase (Auth, RLS Policies, PostgreSQL Database)
* **FaaS Runtime**: Supabase Edge Functions (Deno Runtime Environment)
* **Notifications**: Resend API Integration

---

## 📁 Repository Structure

```bash
ai-career-coach/
├── src/
│   ├── components/       # Visual components (Timeline Roadmap, Gauge score, settings, Chat)
│   ├── hooks/            # Custom states (BYOK api keys, Multi-language translation, Auth)
│   ├── pages/            # Page layouts (About, Admin dashboard, Help center, Auth)
│   ├── integrations/     # Supabase client instantiation
│   └── index.css         # Main styles & Dark mode configurations
├── supabase/
│   ├── config.toml       # Supabase service overrides (Disable Edge Functions JWT validation)
│   ├── functions/        # Deno Serverless Edge Functions
│   │   ├── analyze-resume/      # Multi-provider JSON evaluator
│   │   ├── mock-interview/      # SSE streaming mock interviewer
│   │   └── generate-roadmap/    # Career roadmap milestone planner
│   └── migrations/       # SQL schemas (Profiles, RLS, user_roles, career_roadmaps)
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/)

### Installation & Run

1. Clone the repository:
   ```sh
   git clone https://github.com/BruceMi321/ai-career-coach.git
   cd ai-career-coach
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Launch development server:
   ```sh
   npm run dev
   ```

4. Code Quality & Lint Validation:
   ```sh
   # TypeScript Type-Safety Check
   npx tsc --noEmit
   
   # ESLint Compliance Audit
   npm run lint
   ```

---

## 📄 License

This project is licensed under the MIT License.
