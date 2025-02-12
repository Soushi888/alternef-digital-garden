# **📄 Project Specification: Quartz-Powered Personal Wiki & AI Assistant**

## **📌 Project Overview**

This project aims to build a **Quartz-powered, AI-enhanced personal knowledge base** that integrates:  
✅ A **structured, interlinked wiki** for personal knowledge management.  
✅ A **static blog & portfolio** for publishing articles and projects.  
✅ An **AI chatbot assistant** that indexes the entire wiki and answers questions.  
✅ **SEO optimizations & multilingual support (English/French).**  
✅ A **cost-effective, fully open-source** setup deployed via **GitHub Pages/Netlify**.

---

## **1️⃣ Core Components & Features**

### **1.1 Knowledge Base (Quartz)**

- **Markdown-based, structured wiki** with categories:
  - `/knowledge/land-and-nature-stewardship`
  - `/knowledge/built-environment`
  - `/knowledge/tools-and-technology`
  - `/knowledge/culture-and-education`
  - `/knowledge/health-and-wellbeing`
  - `/knowledge/finance-and-economics`
  - `/knowledge/governance-and-community`
- **Graph View & Backlinks** to connect ideas dynamically.
- **Obsidian compatibility** (direct sync with an Obsidian vault).
- **Lightweight, fast static site** powered by Hugo & Quartz.

### **1.2 Blog & Portfolio**

- **Personal section (no `/personal/` prefix)** with:
  - `/about-me`
  - `/blog` (blog index)
  - `/portfolio`
- **Markdown-based blog posts & project showcases.**
- **Easy navigation with sidebar & search.**

### **1.3 AI Chatbot (Knowledge Assistant)**

- **Indexes all Markdown content from `/content/`.**
- **Embeds a chatbot on the site** (floating in the corner).
- **Answers user queries based on indexed content.**
- **Uses OpenAI (or local LLM like LlamaIndex) to generate responses.**
- **Deployed as a separate service, interacting via API.**

### **1.4 SEO & Performance**

- **Meta tags & structured data for each page.**
- **Automatic sitemap.xml generation.**
- **Canonical URLs & OpenGraph/Twitter previews.**
- **Lazy loading for images & optimized page structure.**
- **Full-text search integration.**

### **1.5 Multilingual Support (English & French)**

- **Two structured folders:**
  - `/en/` for English content.
  - `/fr/` for French translations.
- **Manual language switcher on each page.**
- **Separate metadata for each language version.**

---

## **2️⃣ Technical Stack**

| Component | Technology |
|-----------|------------|
| **Wiki Engine** | Quartz (Hugo-based) |
| **Content Format** | Markdown |
| **Frontend Framework** | HTML + SCSS |
| **Hosting** | GitHub Pages / Netlify |
| **AI Chatbot** | OpenAI API (or local LLM) + Langchain |
| **Database for AI Index** | FAISS / Pinecone / Weaviate |
| **Version Control** | Git + GitHub |
| **Image & Asset Hosting** | GitHub Repo (static images) |

---

## **3️⃣ Deployment & Workflow**

### **3.1 Content Management**

- **Obsidian for local editing**.
- **GitHub Desktop for version control**.
- **GitHub Actions / Netlify for auto-deployment.**

### **3.2 Chatbot Deployment**

- **Flask/FastAPI backend** for AI chat.
- **Deployed on a free-tier cloud service (Render, Railway, or Fly.io).**
- **Frontend chatbot embedded as an iframe in Quartz.**

---

## **4️⃣ Implementation Roadmap**

| Phase | Task | Status |
|-------|------|--------|
| **Phase 1** | Set up Quartz & migrate Obsidian vault | 🔄 In Progress |
| | Enable backlinks & graph view | ✅ Done |
| | Deploy initial version on GitHub Pages | ⏳ Pending |
| **Phase 2** | Customize theme & navigation | ⏳ Pending |
| | Improve SEO (meta tags, sitemap) | ⏳ Pending |
| | Implement manual multilingual structure | ⏳ Pending |
| **Phase 3** | Develop AI chatbot backend | ⏳ Pending |
| | Integrate chatbot with Quartz UI | ⏳ Pending |
| | Deploy chatbot API | ⏳ Pending |
| **Phase 4** | Testing & final optimizations | ⏳ Pending |

---

## **5️⃣ Potential Enhancements**

🔹 **Add interactive visualizations for the knowledge graph.**  
🔹 **Enable dynamic tag-based search inside the wiki.**  
🔹 **Introduce user-submitted questions & AI-assisted responses.**  
🔹 **Automate multilingual translation suggestions.**
