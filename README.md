
# SentinAI — Privacy-First Compliance Intelligence Platform



> Multi-Agent SAR Narrative Generator with Sentence-Backed Forensics

---

## Quick Start

```
1. Ensure Python 3.10+ is installed
2. Run  run_sentinai.bat  (double-click)
3. Open browser:  http://localhost:8000
```

No external cloud dependencies. Runs 100% offline.

---

## 🧠 Enable Real AI (Recommended)

SentinAI supports local AI narrative generation via Ollama:
1. Download [Ollama](https://ollama.com/)
2. Open terminal and run: `ollama pull llama3`
3. Restart `run_sentinai.bat`

The app will automatically detect Ollama and use Llama 3 to generate **real** SAR narratives.

---

## What SentinAI Does

SentinAI automates Suspicious Activity Report (SAR) generation for AML compliance. It replaces 5–6 hours of manual analyst work with a **3-agent AI pipeline** that detects anomalies, maps regulations, and drafts regulator-ready narratives — all in under 30 minutes.

---

## 5-Page Dashboard

| Page | Features |
|------|----------|
| **Dashboard** | Stats grid, Chart.js risk/volume/anomaly charts, live agent feed |
| **Data Ingestion** | Drag-drop CSV/JSON upload, PII masking, demo dataset |
| **AI Analysis** | Animated pipeline (Data Vault → Investigator → Compliance → Scribe), risk cards |
| **SAR Report** | Split-view: AI-generated narrative ↔ evidence table with hover-to-highlight |
| **Audit Trail** | Filterable timeline of every agent decision with timestamps |

---

## X-Factor: Sentence-Backed Forensics

Hover over any cyan-underlined phrase in the SAR narrative → the exact transaction rows glow in the evidence table. Every claim links to ground truth.

**How it works:**
- The Scribe Agent embeds `[[TXN_ID||text]]` markers in the LLM-generated narrative
- The frontend parses these into interactive `<span>` elements
- Hovering triggers row highlighting with smooth scroll-to-view

---

## Report Export

Click **Export** on the SAR Report page to open a **banking-standard regulatory report** in a new tab:
- CONFIDENTIAL classification banner
- 6 numbered sections (Summary, Findings, Narrative, Evidence, Compliance, Audit)
- Transaction evidence table with CRITICAL/CLEAR badges
- Signature lines for Reviewing Officer and MLRO
- Print / Save as PDF button (A4 optimized)

---

## Project Structure

```
sentinai/
├── backend/
│   ├── agents/
│   │   ├── orchestrator.py      # State-machine pipeline
│   │   ├── investigator.py      # Graph-based anomaly detection (Pandas + NetworkX)
│   │   ├── compliance.py        # RAG-style AML law mapping (PMLA, FATF, BSA)
│   │   └── writer.py            # SAR narrative generation (Llama 3 via Ollama)
│   ├── modules/
│   │   ├── pii_masking.py       # Names → USER_XXXXXXXX, accounts masked
│   │   ├── anomaly_detector.py  # Structuring, circular trading, fan-in/out
│   │   ├── audit_logger.py      # SQLite chain-of-thought logging
│   │   └── report_exporter.py   # Banking-standard HTML report generator
│   ├── api/
│   │   └── routes.py            # FastAPI endpoints (analyze, export, audit)
│   ├── data/
│   │   ├── sample_transactions.csv
│   │   └── aml_laws.json
│   ├── main.py                  # Uvicorn entry point + static file serving
│   └── requirements.txt
├── frontend/
│   ├── index.html               # 5-page SPA (sidebar navigation)
│   ├── index.css                # Obsidian banking theme + glassmorphism
│   └── app.js                   # Chart.js, pipeline animation, evidence linking
├── run_sentinai.bat             # One-click launcher
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Service health check |
| `POST` | `/api/analyze` | Run full multi-agent pipeline |
| `GET` | `/api/transactions` | Get PII-masked transaction data |
| `GET` | `/api/audit/logs` | Fetch chain-of-thought audit trail |
| `GET` | `/api/export/report` | Generate printable SAR report (HTML) |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Backend | Python 3.11 + FastAPI | Async API, agent orchestration |
| LLM | Ollama (Llama 3 / Mistral) | Local narrative generation — fully offline |
| Detection | Pandas + NetworkX | Statistical + graph anomaly detection |
| Compliance | JSON + keyword RAG | AML law mapping (PMLA, FATF, BSA) |
| Audit | SQLite | Immutable chain-of-thought logs |
| Frontend | HTML5 + CSS3 + JS + Chart.js | Obsidian banking dashboard |
| Explainability | Custom SBF System | Sentence-to-transaction traceability |
| Export | Self-contained HTML | A4-printable regulatory report |

**100% open-source. Zero cloud. Runs fully offline.**

---

## Demo Flow

1. **Data Ingestion** → Click "Load Demo Dataset" → Preview PII-masked table
2. **AI Analysis** → Click "Run AI Analysis" → Watch animated pipeline
3. **SAR Report** → Hover cyan phrases → Evidence rows glow → Click **Export**
4. **Audit Trail** → Filter by agent → See timestamped decision logs

---

*Built for Barclays Hack-o-Hire 2026 — SentinAI Team, SPIT Mumbai*
