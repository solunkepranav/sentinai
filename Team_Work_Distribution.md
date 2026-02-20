# SentinAI Team Work Distribution — FINAL SUBMISSION
**Deadline:** Feb 17, 2026 (Final Submission)  
**Team Size:** 5 People  
**Last Updated:** Feb 14, 2026

---

## ✅ Completed Work

The following has been **fully built and tested**:

### Backend (100% Complete)
- ✅ FastAPI server with Uvicorn (`main.py`)
- ✅ State-machine orchestrator (`orchestrator.py`)
- ✅ Investigator Agent — Pandas + NetworkX anomaly detection (`investigator.py`)
- ✅ Compliance Agent — RAG keyword matching against AML laws (`compliance.py`)
- ✅ Scribe Agent — Llama 3 narrative generation via Ollama (`writer.py`)
- ✅ PII Masking — MD5 hash names, last-4 accounts (`pii_masking.py`)
- ✅ Audit Logger — SQLite chain-of-thought logging (`audit_logger.py`)
- ✅ Report Exporter — Banking-standard HTML report generator (`report_exporter.py`)
- ✅ API Routes — health, analyze, transactions, audit logs, export (`routes.py`)
- ✅ Sample data — CSV + JSON laws database (`data/`)

### Frontend (100% Complete)
- ✅ 5-Page SPA with sidebar navigation (`index.html`)
- ✅ Obsidian banking theme with glassmorphism (`index.css`)
- ✅ Dashboard — Stats grid + Chart.js visualizations
- ✅ Data Ingestion — Drag-drop upload + demo dataset loader
- ✅ AI Analysis — Animated pipeline + risk cards
- ✅ SAR Report — Split-screen with Sentence-Backed Forensics hover-to-highlight
- ✅ Audit Trail — Filterable agent timeline
- ✅ Report Export — Opens banking-standard PDF in new tab (`app.js`)

### One-Click Launch
- ✅ `run_sentinai.bat` — Installs deps + starts server

---

## 🎯 Remaining Tasks (Feb 15-17)

### **Person 1: Documentation Lead**
**Time:** 4-6 hours | **Priority:** HIGH

#### Tasks:
- [ ] Fill in `[YOUR_TEAM_NAME]` in ALL documents:
  - `SentinAI_SPIT_170226.md`
  - `SentinAI_Slides_Content.md`
  - `PowerPoint_Build_Instructions.md`
- [ ] Convert `SentinAI_SPIT_170226.md` to Word document (.doc):
  - Format headings, page numbers, proper layout
  - Ensure file size < 45 MB
  - Save as: `[TeamName]_SPIT_170226.doc`
- [ ] Proofread abstract (must be 100-200 words)
- [ ] Final grammar + clarity review

**Deliverables:**
- ✅ Final Word document ready for submission

---

### **Person 2: PowerPoint Designer**
**Time:** 6-8 hours | **Priority:** HIGH

#### Tasks:
- [ ] Build PowerPoint following `PowerPoint_Build_Instructions.md`
  - 16 slides — all content is in `SentinAI_Slides_Content.md`
- [ ] Take screenshots of the LIVE dashboard for slides:
  1. Start `run_sentinai.bat`
  2. Open `http://localhost:8000`
  3. Screenshot: Dashboard page (with charts)
  4. Screenshot: Data Ingestion (after "Load Demo Dataset")
  5. Screenshot: AI Analysis (during/after pipeline)
  6. Screenshot: SAR Report (with hover-to-highlight active)
  7. Screenshot: Exported report (click Export button)
- [ ] Add transitions (Fade, 0.5s)
- [ ] Save as: `[TeamName]_SPIT_170226.pptx`

**Deliverables:**
- ✅ 16-slide PowerPoint with live screenshots

---

### **Person 3: Demo Prep & Testing**
**Time:** 3-4 hours | **Priority:** MEDIUM

#### Tasks:
- [ ] Run full demo flow and verify:
  1. Double-click `run_sentinai.bat`
  2. Open `http://localhost:8000`
  3. Dashboard → Charts load correctly
  4. Data Ingestion → "Load Demo Dataset" → Preview table
  5. AI Analysis → "Run AI Analysis" → Animated pipeline
  6. SAR Report → Hover cyan phrases → Evidence rows glow
  7. SAR Report → Click "Export" → Report opens in new tab
  8. Exported report → Click "Print / Save as PDF"
  9. Audit Trail → Filter by agent type
- [ ] Test on different computers (borrow a friend's laptop)
- [ ] Test on different browsers (Chrome, Edge, Firefox)
- [ ] Record a 2-minute screen recording of demo flow (optional but impressive)

**Deliverables:**
- ✅ Verified demo flow on multiple machines
- ✅ Bug list (if any)

---

### **Person 4: Pitch Script & Q&A Prep**
**Time:** 3-4 hours | **Priority:** MEDIUM

#### Tasks:
- [ ] Write a 5-minute pitch script covering:
  - Problem (1 min): SAR crisis, 6 hours, black-box AI
  - Solution (2 min): 3 agents, SBF, local LLM, offline
  - Demo (1.5 min): Live walkthrough of hover-to-highlight + export
  - Impact (0.5 min): 90% reduction, regulatory trust
- [ ] Prepare answers to judge questions:
  - "How do you handle LLM hallucination?" → "Three safeguards: (1) multi-agent decomposition constrains each agent's scope, (2) Sentence-Backed Forensics links every claim to evidence so hallucinations are immediately visible, (3) human-in-the-loop review before filing."
  - "How scalable is SQLite?" → "SQLite handles millions of rows. For production, swap to PostgreSQL — backend is already stateless."
  - "What makes this different from other solutions?" → "Sentence-Backed Forensics — hover any sentence and see exact evidence. No other tool does sentence-level audit trails."
  - "What if the LLM generates biased content?" → "System prompt enforces unbiased, non-discriminatory analysis. The audit trail provides full transparency and the human analyst reviews every draft."
  - "Can this handle real-world data volumes?" → "Currently optimized for demo. Production path: swap CSV to streaming API, SQLite to PostgreSQL, add Docker containerization."
- [ ] Practice pitch with timer

**Deliverables:**
- ✅ Pitch script document
- ✅ FAQ document for judges

---

### **Person 5: Final Polish & Submission**
**Time:** 2-3 hours | **Priority:** HIGH (on submission day)

#### Tasks:
- [ ] Final review of Word doc + PowerPoint with team
- [ ] Ensure consistency across all documents:
  - Team name everywhere
  - No `[YOUR_TEAM_NAME]` or `[YOUR_EMAIL]` placeholders
  - Tech stack matches between doc and slides
- [ ] File naming: `[TeamName]_SPIT_170226.doc` and `.pptx`
- [ ] File size check: Both < 45 MB
- [ ] Submit to portal
- [ ] Take screenshot of submission confirmation
- [ ] Keep 3 backup copies (USB + Google Drive + email)

**Deliverables:**
- ✅ Successfully submitted

---

## 📅 Schedule (Feb 15-17)

### Feb 15 — Build Slides + Polish Docs (8 hours)
- **Person 1:** Convert MD to Word, proofread
- **Person 2:** Build slides 1-8 in PowerPoint
- **Person 3:** Full demo testing on 2+ machines
- **Person 4:** Write pitch script
- **Person 5:** Help Person 1 proofread

### Feb 16 — Finalize + Screenshots (6 hours)
- **Person 1:** Final Word doc review
- **Person 2:** Build slides 9-16, take live screenshots
- **Person 3:** Record demo video (if time permits)
- **Person 4:** Practice pitch, prepare FAQ
- **Person 5:** Review all files for consistency

### Feb 17 — Submit (2 hours)
- **All:** Final review meeting (30 min)
- **Person 5:** Submit documents
- **Person 4:** Final pitch rehearsal

---

## ✅ Final Checklist (Feb 17, before submission)

- [ ] Word document: `[TeamName]_SPIT_170226.doc` exists
- [ ] PowerPoint: `[TeamName]_SPIT_170226.pptx` exists
- [ ] Both files open without errors
- [ ] Both files < 45 MB each
- [ ] Team name filled in everywhere (no placeholders)
- [ ] Live demo runs on `run_sentinai.bat`
- [ ] All 5 pages of dashboard work
- [ ] Export button generates report
- [ ] Spell-check done on both documents
- [ ] Backup copies saved in 3 locations

---

**The hard part is done! 🚀 Backend + Frontend are complete. Focus on docs, slides, and practice!**
