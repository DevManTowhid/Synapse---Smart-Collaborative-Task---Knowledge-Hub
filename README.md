# Synapse — Smart Collaborative Task & Knowledge Hub

A full-stack project management tool (think Notion + Trello) with **real DSA-backed features** and **open-source AI integration**. Designed to be CV-worthy, interview-defensible, and finishable in 6–10 weeks by one person.

> **Why this project, not a generic CRUD app?**
> Recruiters have seen 500 to-do-list clones. This one has things you can actually *talk about* for 10 minutes in an interview: a custom task-scheduling algorithm, a real-time engine, a search ranking system, and a self-hosted AI feature you understand end-to-end (not just an API call you copy-pasted).

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + TypeScript + Tailwind | Industry standard, type safety looks senior |
| Backend | Node.js + Express (or NestJS if you want to flex architecture) | Most job postings want this |
| Database | PostgreSQL | Relational integrity matters here (tasks, users, dependencies) |
| Real-time | Socket.IO or native WebSockets | Live updates = "I understand event-driven systems" |
| Cache | Redis | Session store + rate limiting + leaderboard/ranking cache |
| Search | PostgreSQL full-text search → upgrade to Elasticsearch/Meilisearch (open source) | Shows you know search isn't just `LIKE %query%` |
| AI | Self-hosted **Ollama** running **Llama 3.1 8B** or **Mistral 7B** (both open source, run locally/free) | No API cost, full control, great talking point |
| Auth | JWT + bcrypt, refresh token rotation | Standard, but do it correctly |
| Deployment | Frontend → Vercel; Backend → Render/Railway; DB → Supabase/Neon (free tiers) | Live demo link >>> "clone my repo" |
| Containerization | Docker + docker-compose | Bonus DevOps signal |

---

## 2. Features & The DSA Behind Each One

This is the part most student projects get wrong — they bolt on DSA as a separate "algorithms" folder nobody asked about. Instead, each feature below **requires** a specific data structure or algorithm to work correctly. That's what makes the DSA defensible in an interview.

### Feature 1: Task Dependency Graph ("Task X can't start until Task Y finishes")
- **DSA used:** Directed Acyclic Graph (DAG) + Topological Sort (Kahn's algorithm or DFS-based)
- **Why it matters:** Detects circular dependencies before they're saved ("Task A depends on B depends on A" should be rejected). Topological sort also determines the *valid order* to display/execute tasks.
- **Depth needed:** Medium-high. You should be able to explain in/out-degree, cycle detection, and why BFS-based Kahn's is often preferred for explainability over recursive DFS.
- **Interview line:** *"I modeled tasks as nodes in a DAG and used Kahn's algorithm to detect cycles and compute valid execution order."*

### Feature 2: Smart Task Prioritization / Scheduler
- **DSA used:** Priority Queue (Min-Heap) based on a weighted score (deadline urgency + dependency count + user-assigned priority)
- **Why it matters:** "Show me what I should work on next" is a real scheduling problem, not a sort-by-date button.
- **Depth needed:** Medium. Implement or correctly use a heap; explain time complexity (O(log n) insert/extract) vs. just sorting an array every time (O(n log n) repeatedly).
- **Interview line:** *"I used a min-heap to avoid re-sorting the entire task list every time priorities changed."*

### Feature 3: Search & Autocomplete
- **DSA used:** Trie (prefix tree) for autocomplete; inverted index concept for full-text search
- **Why it matters:** Typing "proj" should instantly suggest "Project Alpha," "Project Timeline," etc. without scanning every record.
- **Depth needed:** Medium. Build a basic Trie yourself for autocomplete (don't just rely on Postgres for this one — it's a classic, clean DSA flex). Use Postgres `tsvector`/Meilisearch for the heavier full-text search.
- **Interview line:** *"Autocomplete uses a Trie I implemented for O(k) prefix lookups, k being the query length, instead of scanning all task titles."*

### Feature 4: Activity Feed / Notification System
- **DSA used:** Queue (for event processing) + sliding window (for rate-limiting notifications, e.g. "don't notify more than 5 times/min")
- **Why it matters:** Real-time systems need backpressure handling. This is also where Redis comes in (as a queue/cache).
- **Depth needed:** Medium-low, but pairs well with system design talking points (pub/sub pattern).

### Feature 5: "Related Tasks" / Recommendation Mini-feature
- **DSA used:** Cosine similarity over vector embeddings (this is also your AI integration point — see below)
- **Why it matters:** Recommends similar tasks/notes based on content, not just tags.
- **Depth needed:** You don't need to implement vector math from scratch, but you must understand *why* embeddings + cosine similarity work, since this bridges DSA and AI.

### Feature 6 (optional stretch): Activity heatmap / analytics dashboard
- **DSA used:** Frequency counting, prefix sums for range-queries ("tasks completed in last 7/30 days")
- Good if you want one more "easy win" feature for the resume bullet list.

---

## 3. AI Integration (Open Source, Free, Self-Explainable)

**Goal:** Use AI in a way you can fully explain — not a black-box API call. This is what separates "I used ChatGPT API" (red flag — anyone can do this in 10 minutes) from "I understand RAG and embeddings" (genuinely impressive for a fresh grad).

### Setup
- Run **Ollama** locally (free, open source) → pull `llama3.1:8b` or `mistral:7b`
- For embeddings: use `nomic-embed-text` (via Ollama) or `sentence-transformers` (Python, open source, via a small Flask microservice if you want polyglot bonus points)
- Store embeddings in Postgres using the **pgvector** extension (open source, free) — this alone is a great interview topic in 2026 since vector DBs are everywhere now

### AI Features to Build (pick 2, don't try all 4)
1. **AI Task Summarizer:** Summarize a long task description/comments thread into 2 lines. (Simple prompt → LLM call, good baseline feature.)
2. **Semantic Search ("Related Tasks"):** Embed every task description with `nomic-embed-text`, store vectors in `pgvector`, and on search, do cosine-similarity lookup instead of keyword match. **This directly reuses your DSA knowledge** (vector similarity is just a distance metric, conceptually close to the search/recommendation problem above).
3. **Natural-language task creation:** User types "Remind me to email the client every Friday at 5pm" → LLM extracts structured JSON (title, recurrence, due date) → you parse and insert it. This demonstrates **prompt engineering + structured output parsing**, a real skill companies want now.
4. **RAG-based "Ask your workspace" chatbot (stretch goal):** Embed all your notes/tasks, retrieve top-k relevant ones via vector similarity, feed into the LLM as context, answer questions like "what did I plan for the marketing project?" This is the single most resume-impressive AI feature you can build in 2026 — RAG is now a baseline expected skill, not a nice-to-have.

> **Important honesty note for your CV/interview:** Be precise about what you built vs. what the library/model did. You didn't train an LLM — you integrated one and built the retrieval/ranking pipeline around it. That's still a real, valuable skill; just don't overclaim "built an AI model from scratch."

---

## 4. Roadmap (6–10 Weeks, Solo)

### Week 1 — Foundations
- Set up monorepo (or separate frontend/backend repos), Docker Compose for Postgres + Redis
- Design DB schema: Users, Workspaces, Tasks, TaskDependencies, Comments, Notifications
- Implement auth (JWT + refresh tokens + bcrypt)

### Week 2 — Core Backend CRUD
- Tasks, Workspaces, Projects CRUD APIs
- Input validation (Zod/Joi), proper error handling middleware
- Write basic tests (Jest/Supertest) — even 10–15 tests shows discipline

### Week 3 — DSA Feature #1 & #2
- Implement DAG + topological sort for task dependencies (reject cycles on creation)
- Implement priority-queue based "what to do next" endpoint

### Week 4 — Frontend Core
- React app: auth pages, dashboard, task board (drag-and-drop with `dnd-kit` or `react-beautiful-dnd`)
- Connect to backend APIs

### Week 5 — Real-time + Search
- Socket.IO for live task updates across users in same workspace
- Implement Trie-based autocomplete (frontend can call a `/search/autocomplete` endpoint backed by your Trie)
- Set up Postgres full-text search or Meilisearch

### Week 6 — AI Integration Part 1
- Set up Ollama locally, integrate task summarizer feature
- Set up pgvector, generate embeddings for tasks on create/update

### Week 7 — AI Integration Part 2
- Build semantic "related tasks" feature using cosine similarity
- (Stretch) Build the natural-language task creation parser

### Week 8 — Polish & Deploy
- Notifications system, activity feed
- Deploy: frontend (Vercel), backend (Render/Railway), DB (Neon/Supabase with pgvector enabled)
- Write a genuinely good README (architecture diagram, screenshots, live demo link)

### Week 9–10 (buffer / stretch)
- RAG chatbot feature
- Analytics dashboard
- Polish UI with proper design system, loading states, error boundaries
- Record a 90-second demo video — embed it in your README and link it on LinkedIn

---

## 5. Installation (what your README should eventually say)

```bash
# Clone
git clone https://github.com/yourname/synapse.git
cd synapse

# Backend setup
cd backend
cp .env.example .env     # fill DATABASE_URL, JWT_SECRET, REDIS_URL, OLLAMA_HOST
npm install
npx prisma migrate dev   # or your ORM of choice
npm run dev

# Frontend setup
cd ../frontend
npm install
npm run dev

# AI (local)
# Install Ollama: https://ollama.com
ollama pull llama3.1:8b
ollama pull nomic-embed-text
ollama serve

# Or run everything via Docker
docker-compose up --build
```

Minimum `.env` variables you'll need:
```
DATABASE_URL=postgresql://user:pass@localhost:5432/synapse
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
OLLAMA_HOST=http://localhost:11434
```

---

## 6. How Deep Should Your DSA Knowledge Actually Be?

Be honest with yourself about depth — interviewers will probe.

| Topic | Depth needed | What you must be able to explain |
|---|---|---|
| Graphs (DAG, topological sort) | High | Cycle detection, Kahn's vs DFS, time/space complexity, why a cycle is a real bug not just a UX issue |
| Heaps / Priority Queues | Medium-high | Why O(log n) beats re-sorting, heapify, how your priority score is computed |
| Tries | Medium | Insert/search complexity, when a Trie beats a hash map (prefix queries) |
| Hashing | Medium | Used implicitly everywhere (DB indexes, JWT, Redis) — know big-O of hash map ops |
| Sliding window / two pointers | Low-medium | Used in rate limiting — simple but should be fluent |
| Vector similarity (cosine) | Conceptual, not implementation-deep | Know the formula, know why normalized dot product = cosine similarity, don't need to derive it live |

**The real signal you're sending:** not "I memorized 200 LeetCode problems" but "I know *when* to reach for which structure and *why*, on a real system." That's exactly what separates a fresh grad who can pass DSA rounds from one who can also build things.

---

## 7. Resume Bullet Points You'll Earn From This

- Built a full-stack collaborative task management platform with a custom DAG-based dependency resolver and topological sort to prevent circular task dependencies
- Implemented a priority-queue-based task scheduling system reducing recomputation from O(n log n) to O(log n) per update
- Designed and built a Trie-based autocomplete engine and integrated full-text search with [Postgres/Meilisearch]
- Self-hosted an open-source LLM (Llama 3.1 / Mistral) via Ollama and built a semantic search pipeline using pgvector and cosine similarity for content-based task recommendations
- Built a real-time collaboration layer using WebSockets supporting live multi-user updates across shared workspaces
- Containerized the full stack with Docker and deployed to production with CI/CD

---

## 8. Common Mistakes to Avoid

- Don't make the AI feature a thin wrapper around one prompt — at minimum, build the embeddings/vector search piece, since that's what shows real understanding
- Don't skip tests entirely — even minimal coverage signals maturity
- Don't leave it undeployed — a dead GitHub repo with no live demo is a huge missed opportunity
- Don't over-scope — cut Feature 6 and the RAG chatbot first if you're running out of time; a polished 70% is better than a broken 100%
- Do write a README with an architecture diagram (even a simple draw.io/excalidraw one) — interviewers and recruiters skim READMEs before code