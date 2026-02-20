# SentinAI PowerPoint Presentation Content
# Copy each slide section into PowerPoint

---

## SLIDE 1: Title Slide

**Title:** SentinAI  
**Subtitle:** Privacy-First Multi-Agent SAR Narrative Generator with Sentence-Backed Forensics  
**Team:** [YOUR_TEAM_NAME]  
**Campus:** SPIT Mumbai  
**Date:** February 17, 2026  

**Tagline:** "Transforming 6 Hours into 30 Minutes — With Full Transparency"

---

## SLIDE 2: The Problem

### SAR Generation Crisis in Banking
- ⏱️ **5-6 hours** per report (manual writing)
- 📊 Thousands of SARs filed annually per institution
- ⚠️ Error-prone, inconsistent quality
- 🔍 Regulators demand **explainability** — "Why did the AI write this?"
- ❌ Black-box AI solutions fail audit requirements

### Real Example
> *A customer receives ₹50 lakhs from 47 accounts in one week, then transfers abroad immediately*  
> **Current Process:** Analyst manually drafts 2-page narrative, cross-references 48 transactions, looks up AML laws → **6 hours**

---

## SLIDE 3: Our Solution — SentinAI

### Key Innovation: Sentence-Backed Forensics (SBF)
**Every sentence links to the exact transactions that triggered it**

### Architecture: Privacy-First Multi-Agent System
1. **Investigator Agent** → Finds anomalies (Pandas + NetworkX graphs)
2. **Compliance Agent** → Maps to AML laws (RAG with PMLA/FATF/BSA)
3. **Scribe Agent** → Drafts narrative (Llama 3 via Ollama, with `[[TXN_ID||text]]` forensic markers)

### Why It's Different
✅ **Fully Offline** (Ollama local LLM — no cloud, no data leakage)  
✅ **Explainable** (Hover any sentence → see linked transactions)  
✅ **Human-in-the-Loop** (Analyst edits, approves & exports)  
✅ **90% Time Reduction** (6 hours → 30 minutes)  
✅ **Export-Ready** (Banking-standard PDF with CONFIDENTIAL banner & signature blocks)  

---

## SLIDE 4: System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Zone 1: The Vault                       │
│  Transaction Data (CSV/JSON) + KYC Data                     │
│              ↓                                              │
│  [PII Masking Module] → Names become USER_XXXXXXXX          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  Zone 2: The Agentic Core                   │
│                                                             │
│              ┌─────────────────────┐                        │
│              │    ORCHESTRATOR     │                        │
│              │  (State Machine)    │                        │
│              └─────────┬───────────┘                        │
│                        │                                    │
│        ┌───────────────┼───────────────┐                    │
│        ▼               ▼               ▼                    │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐               │
│  │Investigat│   │Compliance│   │  Scribe  │               │
│  │  Agent   │   │  Agent   │   │  Agent   │               │
│  ├──────────┤   ├──────────┤   ├──────────┤               │
│  │ Pandas + │   │ RAG with │   │ Llama 3  │               │
│  │ NetworkX │   │   Laws   │   │ (Ollama) │               │
│  └──────────┘   └──────────┘   └──────────┘               │
│       │               │               │                     │
│       └───────────────┴───────────────┘                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
        ┌─────────────────┴─────────────────┐
        ▼                                   ▼
┌──────────────────┐              ┌──────────────────────┐
│  Zone 3: Audit   │              │  Zone 4: Dashboard   │
│    (SQLite)      │◄────────────►│     (5-Page SPA)     │
│                  │              │                      │
│ • CoT Logs       │              │ • Dashboard + Charts │
│ • Agent Decisions│              │ • Data Ingestion     │
│ • Timestamps     │              │ • AI Pipeline Viz    │
│                  │              │ • SAR Report + SBF   │
│                  │              │ • Audit Timeline     │
│                  │              │ • Export PDF Report   │
└──────────────────┘              └──────────────────────┘
```

---

## SLIDE 5: The X-Factor — Sentence-Backed Forensics

### How It Works

**Backend (LLM Output):** Scribe Agent's system prompt instructs Llama 3 to embed forensic markers:
```
[[TXN_1006,TXN_1003||structured deposits below reporting threshold]]
```

**Frontend (Interactive Parsing):**
```html
<span class="interactive-evidence" data-txns="TXN_1006,TXN_1003">
  structured deposits below reporting threshold
</span>
```

**Interaction:**
1. **Hover** over cyan-underlined phrase → linked rows glow in evidence table
2. **Cyan inset border** appears on flagged transaction rows
3. **Smooth scroll** brings evidence into view automatically

### Why This Wins
🎯 **Regulatory Trust** → Auditors can verify every claim at sentence level  
🎯 **Not a Black Box** → Full transparency into AI reasoning  
🎯 **Defensible** → Links text to ground truth transaction data  
🎯 **Interactive** → Not just a static report — a forensic investigation tool

---

## SLIDE 6: Multi-Agent System — How Agents Collaborate

### Agent A: Investigator
**Job:** Find suspicious patterns  
**Tools:** Pandas (statistical analysis) + NetworkX (graph analysis)  
**Output:** Structured findings with exact transaction IDs  

**Detections:**
- Circular Trading: A→B→C→A (graph cycle detection)
- Structuring: Multiple transactions < ₹10L threshold
- Fan-In/Fan-Out: Many-to-one concentrated deposits

---

### Agent B: Compliance Officer
**Job:** Map anomalies to AML laws  
**Tools:** RAG (Retrieval-Augmented Generation) with embedded regulations  
**Knowledge Base:** PMLA Act 2002, FATF 40 Recommendations, BSA/AML  
**Output:** Legal citations with confidence scores  

**Example Mapping:**
- Structuring → PMLA Section 12, FATF Rec 20
- Circular Trading → FATF Recommendation 20

---

### Agent C: Scribe
**Job:** Draft regulator-ready narrative  
**Tools:** Llama 3 (local LLM via Ollama)  
**Output:** SAR with `[[TXN_ID||text]]` forensic markers  

**Report Sections:**
- Executive Summary
- Transaction Structuring Findings
- Circular Fund Movement Findings
- Risk Assessment
- Recommended Actions (SAR filing, account freeze, MLRO escalation)

**Special Feature:** System prompt instructs LLM to embed `source_rows[]` in every sentence

---

## SLIDE 7: The Dashboard — 5 Professional Pages

### Page 1: Dashboard
Stats grid (transactions, flagged, time saved, agents) + Chart.js visualizations (risk doughnut, volume bar, anomaly polar area)

### Page 2: Data Ingestion
Drag-drop upload zone, PII masking indicator, demo dataset loader, preview table

### Page 3: AI Analysis
Animated pipeline (Data Vault → Investigator → Compliance → Scribe) with progress bars, risk summary cards, anomaly findings grid

### Page 4: SAR Report
Split-screen: AI narrative (left) ↔ Evidence table (right)
- Hover-to-highlight (SBF)
- Edit, Approve, Export buttons
- Connection line visual between panels

### Page 5: Audit Trail
Filterable timeline by agent type, timestamped decision logs

---

## SLIDE 8: Banking-Standard Report Export

### What Gets Exported (6 Sections):
1. **Report Summary** — Risk grid (Critical/Elevated/Standard counts)
2. **Anomaly Findings** — Red-bordered cards with flagged TXN IDs
3. **SAR Narrative** — Full text (Executive Summary through Recommendations)
4. **Transaction Evidence** — Complete table with CRITICAL/CLEAR badges
5. **Regulatory Compliance** — PMLA/FATF section mappings
6. **Agent Decision Audit Trail** — Timestamped log of all pipeline decisions

### Professional Features:
- 🔴 CONFIDENTIAL classification banner
- ✍️ Signature lines (Reviewing Officer + MLRO Approval)
- 📄 Legal disclaimer
- 🖨️ Print / Save as PDF (A4 optimized)

---

## SLIDE 9: Methodology — Scalability, Performance, Security

### Scalability
✅ **Horizontal Scaling** — Stateless FastAPI backend (run multiple instances)  
✅ **Async Pipeline** — Concurrent report generation  
✅ **Containerized** — Docker-ready (Python + Ollama + frontend)  
✅ **Environment-Aware** — Adapts to on-premises, cloud, multi-cloud  

### Performance
✅ **5-6 hours → 30 minutes** (90% reduction)  
✅ **Batch Processing** — Handle multiple CSV files sequentially  
✅ **Local Inference** — No network latency (GPU/CPU optimized)  

### Security
✅ **Zero Data Leakage** — Fully offline, no external API calls  
✅ **PII Masking** — All names/accounts anonymized before AI sees them  
✅ **RBAC** — Analyst / Auditor / Admin roles  
✅ **Audit Immutability** — Logs are append-only (tamper-proof)  
✅ **Domain Isolation** — Customer/Transaction/Fraud data boundaries enforced  

---

## SLIDE 10: Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------| 
| **Backend** | Python 3.11 + FastAPI | Async API server, agent orchestration |
| **LLM** | Ollama (Llama 3 / Mistral) | Local narrative generation (offline) |
| **Detection** | Pandas + NetworkX | Stats + graph anomaly detection |
| **Knowledge** | JSON + keyword RAG | AML regulations (PMLA/FATF/BSA) |
| **Database** | SQLite | Chain-of-thought audit logs |
| **Frontend** | HTML5 + CSS3 + JS + Chart.js | Obsidian banking dashboard |
| **Export** | Self-contained HTML/CSS | A4-printable regulatory report |
| **Explainability** | Custom SBF System | Sentence-to-transaction traceability |

**Key Point:** 100% open-source, zero cloud dependencies

---

## SLIDE 11: Real-World Example Walkthrough

### Scenario
Customer receives ₹50 lakhs from 47 accounts in 1 week → transfers abroad

### SentinAI in Action

**Step 1: Investigator Agent**
- Detects fan-in pattern (47→1)
- Flags rapid outbound transfer
- Tags all 48 transaction IDs

**Step 2: Compliance Agent**
- Maps to PMLA Section 12 (suspicious transaction reporting)
- References FATF Recommendation 20
- Cites BSA structuring regulations

**Step 3: Scribe Agent**
- Generates SAR narrative via Llama 3
- Embeds `[[TXN_ID||text]]` forensic markers for every claim
- Formats in regulatory-compliant structure

**Step 4: Human Analyst**
- Hovers sentences → verifies linked evidence (5 minutes)
- Edits if needed
- Clicks "Approve" → Clicks "Export"
- Banking-standard PDF with signature blocks → Filed

**Time:** 30 minutes vs. 6 hours ✅

---

## SLIDE 12: Future Scope

1. **Multi-Format Ingestion** → SWIFT MT, ISO 20022 XML, banking APIs
2. **Advanced Graph Analytics** → Louvain community detection for laundering rings
3. **Fine-Tuned Domain LLM** → Model trained on redacted SAR corpus
4. **Multi-Language SARs** → Cross-border filing in multiple languages
5. **Real-Time Streaming** → Kafka integration for live monitoring
6. **Regulatory Auto-Updates** → FATF/FinCEN RSS feed ingestion
7. **Collaborative Review** → Multi-analyst workflows with versioning
8. **Dashboard Analytics** → Historical trend analysis, typology distribution
9. **LangGraph Upgrade** → Production-grade agent orchestration with fault tolerance
10. **Cloud Deployment** → AWS/Azure option with encryption

---

## SLIDE 13: Why SentinAI Wins

### Innovation
🏆 **Sentence-Backed Forensics** — First solution to link AI output to raw data at sentence level  
🏆 **Privacy-First** — Proves AI compliance tools don't need cloud  
🏆 **Multi-Agent** — Reduces hallucination through specialized agents  
🏆 **Banking-Standard Export** — CONFIDENTIAL banner, MLRO signature blocks  

### Regulatory Impact
✅ Answers "Can you explain why the AI wrote this?" — at sentence level  
✅ Complete chain-of-thought audit trail  
✅ Human oversight (edit, approve, export workflow)  

### Business Impact
📈 **90% time reduction** → Frees analysts for complex investigations  
📈 **Consistent quality** → Eliminates narrative variability  
📈 **Scalable** → Handles thousands of SARs without bottlenecks  

---

## SLIDE 14: Ethical AI & Compliance

### Bias Prevention
- System prompt enforces **unbiased, non-discriminatory** analysis
- Limited to on-topic AML subjects only
- No demographic profiling

### Auditability
- Full chain-of-thought logged (SQLite)
- Every decision traceable to specific agent + timestamp
- Sentence-Backed Forensics links every claim to evidence

### Human-in-the-Loop
- AI generates **drafts**, not final filings
- Analysts retain full control (edit, approve, export)
- "Approve" button required before export
- Banking-standard report requires Reviewing Officer + MLRO signatures

---

## SLIDE 15: Live Demo

### Demo Flow (show on screen):
1. **Dashboard** → Stats + charts loading
2. **Data Ingestion** → "Load Demo Dataset" → PII-masked preview
3. **AI Analysis** → Animated pipeline → Risk cards
4. **SAR Report** → Hover cyan phrases → Evidence glows → **Export**
5. **Exported Report** → CONFIDENTIAL banner → Sections → Print/PDF

**URL:** `http://localhost:8000`  
**One-click start:** `run_sentinai.bat`

---

## SLIDE 16: Thank You

**SentinAI**  
*Privacy-First Multi-Agent SAR Generation*

**Contact:** [YOUR_EMAIL]  
**Team:** [YOUR_TEAM_NAME]

**Mentors:**
- Vinod Mahajan (Pune)
- Sandeep Vishwakarma (Pune)
- Aniket Patil (Pune)

---

**Questions?**
