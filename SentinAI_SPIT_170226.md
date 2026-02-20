# SentinAI: A Privacy-First, Multi-Agent Ecosystem for Auditable SAR Narrative Generation

**Team Name:** [YOUR_TEAM_NAME]  
**Campus:** SPIT  
**Date:** 17/02/26  

---

## 1. Abstract

Financial institutions face a critical bottleneck in AML compliance: drafting Suspicious Activity Reports (SARs) takes analysts 5–6 hours per report, is error-prone, and lacks transparent decision trails. **SentinAI** addresses this with a **Privacy-First Multi-Agent Architecture** running entirely offline using locally hosted LLMs (Llama 3 via Ollama), ensuring zero data leakage.

SentinAI deploys three specialized AI agents through a state-machine orchestrator: an **Investigator** for anomaly extraction using Pandas and NetworkX graph analysis, a **Compliance Officer** for regulatory mapping via retrieval-augmented generation against PMLA/FATF/BSA laws, and a **Scribe** for narrative drafting with per-sentence citations using a proprietary `[[TXN_ID||text]]` forensic marker system. Its differentiator is **Sentence-Backed Forensics (SBF)** — every generated sentence links back to exact transaction rows through interactive hover-to-highlight, transforming AI from a black box into a transparent, defensible tool. The platform includes a **banking-standard report export** with CONFIDENTIAL classification, regulatory compliance mapping, and MLRO signature blocks. Combined with human-in-the-loop approval, chain-of-thought logging, and a premium Fintech-grade dashboard, SentinAI reduces SAR drafting time by up to **90%** while enhancing auditability and regulatory trust.

*(197 words)*

---

## 2. System Architecture

> *Refer to the attached architecture diagram.*

### Zone 1: Secure Data Ingestion (The Vault)
- **Input:** Raw transaction alerts (CSV/JSON), customer KYC data, account and transaction data
- **PII Masking Module (Python):** Anonymizes personally identifiable information — names become `USER_XXXXXXXX` (MD5 hash), account numbers are masked to last 4 digits
- **Output:** Anonymized, ingestion-ready dataset with a reversible mapping table (analyst-only access)
- **Why:** Ensures GDPR/DPDP compliance and prevents data leakage across domain boundaries (customer, transaction, fraud)

### Zone 2: The Agentic Core (The Brain)
- **Orchestrator:** Custom state-machine pipeline modeled after LangGraph  
  `INGEST → INVESTIGATE → COMPLY → WRITE → REVIEW`
- **Agent A — Investigator:**
  - Uses Pandas for statistical anomaly detection (structuring, velocity, threshold breaches)
  - Uses NetworkX for graph-based detection of circular trading patterns (A→B→C→A) that standard SQL misses
  - Outputs structured findings with exact transaction IDs
- **Agent B — Compliance Officer:**
  - Retrieval-Augmented Generation (RAG) against an embedded knowledge base of AML regulations (PMLA, FATF, BSA)
  - Maps each detected anomaly to specific legal sections with confidence scores
  - Ensures the AI references *actual laws*, not hallucinated ones
- **Agent C — Scribe:**
  - Drafts regulator-ready SAR narrative using Llama 3 (locally hosted via Ollama)
  - Embeds `[[TXN_ID_1,TXN_ID_2||text content]]` forensic markers into narratives
  - Frontend parses markers into interactive HTML spans for Sentence-Backed Forensics
  - System prompt enforces unbiased, on-topic, non-discriminatory output
  - Generates report sections: Executive Summary, Findings, Risk Assessment, Recommendations

### Zone 3: The Audit Layer (The Memory)
- **SQLite Database** with immutable, append-only audit logs:
  - `audit_logs` — Chain-of-thought: agent name, activity, details, timestamp
  - Agent-specific entries: graph traversal parameters, similarity scores, narrative generation metadata
- Enables full regulatory audit: which data points influenced the narrative, which rules/patterns were matched, and why specific language was chosen

### Zone 4: Analyst Dashboard (The UI)
- **5-Page Fintech-Grade SPA:**
  - **Dashboard:** Stats grid, Chart.js visualizations (risk doughnut, volume bar, anomaly breakdown)
  - **Data Ingestion:** Drag-drop upload, PII-masked preview table, demo dataset loader
  - **AI Analysis:** Animated pipeline with progress bars, risk cards, anomaly findings grid
  - **SAR Report:** Split-screen narrative ↔ evidence table with Sentence-Backed Forensics
  - **Audit Trail:** Filterable timeline by agent type with detailed technical logs
- **Sentence-Backed Forensics (X-Factor):**
  - Hover over cyan-underlined phrases → corresponding transaction rows glow with cyan inset border
  - Smooth scroll-to-view for highlighted evidence
  - Proves the AI isn't hallucinating — links *Text to Truth*
- **Report Export:** Banking-standard HTML report with CONFIDENTIAL banner, signature blocks, Print/PDF button
- **Human-in-the-Loop:** Analysts can directly edit the generated narrative, add comments, and approve/reject

### Component Interaction Flow
```
Transaction Data (CSV/JSON) + KYC Data
        │
        ▼
┌─────────────────────────────┐
│  Zone 1: PII Masking        │──── Anonymized Data
│  (Names → USER_XXXXXXXX)    │         │
└─────────────────────────────┘         ▼
                              ┌──────────────────────────────────┐
                              │  Zone 2: Agentic Core            │
                              │                                  │
                              │  ┌────────────┐  Anomalies &     │
                              │  │ Investigator│──Patterns───┐    │
                              │  │ (Pandas +   │             │    │
                              │  │  NetworkX)  │             ▼    │
                              │  └────────────┘     ┌────────────┐│
                              │       ▲             │Orchestrator││
                              │       │             │(State      ││
                              │  ┌────────────┐     │ Machine)   ││
                              │  │ Compliance │◄────┤            ││
                              │  │ Officer    │     │            ││
                              │  │ (RAG + AML │     └────────────┘│
                              │  │  Laws)     │          │        │
                              │  └────────────┘          ▼        │
                              │                   ┌────────────┐  │
                              │                   │  Scribe    │  │
                              │                   │ (Llama 3 + │  │
                              │                   │  Ollama)   │  │
                              │                   └────────────┘  │
                              └──────────┬───────────────────────-┘
                                         │
                    ┌────────────────────┐│┌────────────────────────┐
                    │ Zone 3: Audit Log  │││ Zone 4: Dashboard      │
                    │ (SQLite)           ◄┤► (5-Page Web UI)        │
                    │ • CoT Logs         │││ • Charts & Stats       │
                    │ • Agent Decisions  │││ • Hover-to-Highlight   │
                    │ • Timestamps       │││ • Export PDF Report    │
                    └────────────────────┘│└────────────────────────┘
                                         │
                                         ▼
                              Human Analyst Review
                              (Edit → Approve → Export → File)
```

---

## 3. Methodology / Proposed System

### 3.1 Agentic Decomposition
*Ref: "Co-Investigator AI" (2025)*

Rather than asking a single LLM to perform all tasks (which increases hallucination risk), we decompose the SAR generation into three specialized agents:
- **Investigator (High Precision):** Focuses solely on fact extraction and anomaly detection. No creative generation — just data analysis.
- **Compliance Officer (High Accuracy):** Focuses solely on mapping facts to laws. Uses RAG to ground responses in real regulations.
- **Scribe (High Creativity, Controlled):** Generates narrative text but is constrained by the structured inputs from the other two agents, minimizing hallucination.

This follows the principle of *Separation of Concerns* — each agent has a narrow scope with verifiable outputs.

### 3.2 Retrieval-Augmented Generation (RAG)
*Ref: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (Lewis et al., 2020)*

The Compliance Officer agent doesn't rely on the LLM's training data for legal knowledge. Instead, we embed AML regulations (FATF 40 Recommendations, PMLA Act 2002, BSA/AML guidelines) into a local knowledge base. At query time, the agent retrieves the most relevant law sections based on the detected anomaly type, ensuring:
- **Accuracy:** References actual law text, not hallucinated regulations
- **Updatability:** New regulations can be added without retraining
- **Auditability:** Every citation can be verified against the source

### 3.3 Graph-Based Anomaly Detection
*Ref: NetworkX graph algorithms*

Standard SQL queries detect simple threshold breaches (e.g., transactions > ₹10 lakh). But sophisticated money laundering uses **layering** — complex transaction chains designed to obscure the money trail. By modeling transactions as a directed graph (sender → receiver), we use cycle detection algorithms to find:
- **Circular Trading:** A→B→C→A (round-tripping funds)
- **Fan-In/Fan-Out:** Many-to-one or one-to-many patterns (smurfing)
- **Velocity Anomalies:** Unusually rapid sequences between connected nodes

### 3.4 Sentence-Backed Forensics (SBF) — The X-Factor
*Proprietary implementation*

Every sentence in the generated SAR narrative is tagged with the exact transaction IDs that support it:
- **Backend:** The Scribe Agent embeds `[[TXN_1006,TXN_1003||structured deposits below threshold]]` markers in LLM output via system prompt instructions
- **Frontend:** A regex parser converts markers into interactive `<span class="interactive-evidence">` elements
- **Interaction:** Hovering highlights the linked rows in the evidence table with a cyan glow + inset border
- **Result:** Complete sentence-level traceability from narrative text to raw transaction data

### 3.5 Banking-Standard Report Export
The platform generates a self-contained HTML report optimized for A4 printing/PDF export:
- CONFIDENTIAL classification banner
- 6 numbered sections: Report Summary, Anomaly Findings, SAR Narrative, Transaction Evidence, Regulatory Compliance Mapping, Agent Decision Audit Trail
- Risk summary grid with Critical/Elevated/Standard counts
- Flagged transactions highlighted with CRITICAL badges
- Signature blocks for Reviewing Officer and MLRO Approval
- Legal disclaimer

### 3.6 Scalability
- **Horizontal Scaling:** The FastAPI backend is stateless — multiple instances can run behind a load balancer using the same SQLite/PostgreSQL data source
- **Async Pipeline:** All agent calls are asynchronous, enabling concurrent report generation
- **Containerizable:** The entire stack (Python backend + Ollama + frontend) can be Docker-containerized for consistent deployment
- **Environment-Aware:** The system prompt instructs the LLM to adapt its narrative based on deployment constraints

### 3.7 Performance
- **5–6 hours → ~30 minutes:** Multi-agent pipeline processes data and generates draft SAR in minutes
- **Batch Processing:** Supports uploading multiple transaction files for sequential analysis
- **Local LLM Inference:** Ollama runs on-device GPU (if available) or CPU, removing network latency

### 3.8 Security
- **Zero Data Leakage:** All processing is local — no data leaves the machine. No external API calls.
- **PII Masking:** All personal data is anonymized (MD5 hash for names, last-4 for accounts) before entering the AI pipeline
- **Role-Based Access Control (RBAC):**
  - **Analyst:** Can upload data, view reports, edit and approve SARs
  - **Auditor:** Read-only access to audit trails and decision logs
  - **Admin:** Full access including configuration and user management
- **Domain Isolation:** Data boundaries between customer, transaction, and fraud domains are enforced at the module level
- **Audit Immutability:** Decision logs are append-only — no deletion or modification allowed

---

## 4. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------| 
| **Backend** | Python 3.11 + FastAPI | Async API server, agent orchestration |
| **LLM** | Ollama (Llama 3 / Mistral) | Local narrative generation — fully offline |
| **Anomaly Detection** | Pandas + NetworkX | Statistical analysis + graph-based pattern detection |
| **Knowledge Base** | JSON + keyword matching (RAG pattern) | Embedded AML regulations (FATF, PMLA, BSA) |
| **Audit Database** | SQLite | Chain-of-thought logs, sentence-source mappings, alerts |
| **Frontend** | HTML5 + CSS3 + JavaScript + Chart.js | Premium dark-mode Fintech dashboard (5 pages) |
| **Report Export** | Self-contained HTML + CSS | Banking-standard regulatory report (A4/PDF) |
| **Explainability** | Custom SBF (Sentence-Backed Forensics) | Per-sentence audit trail linking text → raw data |

> **Note:** Entire stack is open-source and runs offline. Zero dependency on cloud APIs or proprietary services. No `OPENAI_API_KEY` anywhere in the codebase.

---

## 5. Future Scope

1. **Multi-Format Ingestion:** Support for SWIFT MT messages, XML (ISO 20022), and direct integration with core banking APIs (via adapters, not hard-coded coupling)
2. **Advanced Graph Analytics:** Implement community detection (Louvain algorithm) across the full transaction network to identify organized laundering rings
3. **Fine-Tuned Domain LLM:** Fine-tune Llama 3 on a corpus of redacted, approved SARs for even more accurate regulatory language
4. **Multi-Language SARs:** Generate narratives in multiple languages for cross-border filings (leveraging multilingual LLMs)
5. **Real-Time Streaming:** Integrate with Apache Kafka for real-time transaction monitoring and automatic alert generation
6. **Regulatory Updates Pipeline:** Automated ingestion of new regulations from FATF/FinCEN RSS feeds into the knowledge base
7. **Collaborative Review:** Multi-analyst review workflows with comments, versioning, and approval chains
8. **Dashboard Analytics:** Trend analysis across historical SARs — typology distribution, filing velocity, common patterns
9. **LangGraph Migration:** Upgrade the custom state machine to full LangGraph for production-grade agent orchestration with built-in persistence and fault tolerance
10. **Cloud Deployment Option:** AWS/Azure deployment with encryption at rest and in transit, for institutions that prefer managed infrastructure

---

## 6. Additional Comments

### Why This Solution Wins
- **Sentence-Backed Forensics** is the differentiator no other solution offers. It directly addresses the #1 regulatory concern: *"Can you explain why the AI wrote this?"* — and answers it at the sentence level with interactive hover-to-highlight.
- The multi-agent architecture isn't just a buzzword — it materially reduces hallucination by constraining each agent's scope.
- Running fully offline demonstrates that AI compliance tools don't need to compromise data security.
- **Banking-standard report export** with CONFIDENTIAL banners, signature blocks, and A4 PDF output mirrors real-world SAR filing workflows.

### Real-World Applicability
Consider the example from the problem statement: *A customer receives ₹50 lakhs from 47 different accounts in one week, then immediately transfers it abroad.* SentinAI would:
1. **Investigator Agent:** Flag the fan-in pattern (47→1) and the rapid outbound transfer as anomalies, tagging all transaction IDs
2. **Compliance Agent:** Map this to PMLA Section 12 (suspicious transaction reporting), FATF Recommendation 20, and structuring regulations under BSA
3. **Scribe Agent:** Generate a structured SAR narrative with `[[TXN_ID||text]]` forensic markers linking every claim to specific transactions
4. **Analyst:** Reviews, hovers sentences to verify evidence, clicks "Approve" → exports banking-standard PDF → filed in minutes, not hours

### Ethical AI Commitment
The LLM system prompt explicitly instructs the model to be unbiased, non-discriminatory, and limited to on-topic AML analysis. The audit trail ensures any bias can be detected and corrected. All PII is masked before processing.

---

*Document prepared for Barclays Hack-o-Hire 2026 Submission | SentinAI Team, SPIT Mumbai*
