# SentinAI Architecture Diagram Guide
# Use this to create the visual diagram in PowerPoint

## Layout Instructions for PowerPoint

### Slide Background
- Use dark gradient background (#0B0F19 to #111827) — matches app theme
- Add subtle grid pattern for tech aesthetic

---

## ZONE 1: SECURE DATA INGESTION (Top of Slide)
**Background:** Blue gradient box (#2C5F9E to #1E4D7B)

**Elements (left to right):**
1. **Icon:** File/CSV icon
   **Label:** Transaction Data (CSV/JSON) + KYC Data

2. **Arrow →**

3. **Icon:** Shield with lock
   **Label:** PII Masking Module
   **Sub-text:** Names → USER_XXXXXXXX | Accounts → XXXX1234

4. **Arrow →**

5. **Icon:** Database with checkmark
   **Label:** Anonymized Data

**Note below:** "GDPR/DPDP Compliant • Zero Data Leakage"

---

## ZONE 2: AGENTIC CORE (Center of Slide)
**Background:** Purple gradient box (#6A4C93 to #4A3A6A)

**Central Element:**
- **Hexagon shape** (large, center)
- **Label:** Orchestrator
- **Sub-text:** State Machine
- **Inside:** INGEST → INVESTIGATE → COMPLY → WRITE → REVIEW

**Three Agent Circles Around Orchestrator:**

**Agent A (left):**
- **Circle with magnifying glass icon**
- **Label:** Investigator Agent
- **Tools:** Pandas + NetworkX
- **Arrow pointing to Orchestrator:** "Anomalies & Patterns"

**Agent B (top-right):**
- **Circle with scales/law icon**
- **Label:** Compliance Officer Agent  
- **Tools:** RAG + AML Laws
- **Arrow pointing to Orchestrator:** "Legal Citations"

**Agent C (bottom-right):**
- **Circle with pen/document icon**
- **Label:** Scribe Agent
- **Tools:** Llama 3 (Ollama)
- **Arrow pointing to Orchestrator:** "Draft SAR Narrative"

---

## ZONE 3: AUDIT LAYER (Bottom-left)
**Background:** Teal/Cyan gradient box (#06B6D4 to #0891B2)

**Elements:**
1. **Icon:** Database cylinder
2. **Label:** SQLite Audit Database
3. **Three bullet points:**
   - Chain-of-Thought Logs
   - Sentence → Source Mappings
   - Risk Alerts

**Note:** "Immutable • Tamper-Proof"

---

## ZONE 4: DASHBOARD + EXPORT (Bottom-right)
**Background:** Dark gradient box (#0B0F19 to #1E293B)

**Elements:**
1. **Icon:** Monitor/screen
2. **Label:** 5-Page Analyst Dashboard (Web UI)
3. **Mini mockup (5 tabs):**
   - Dashboard (charts)
   - Data Ingestion (upload)
   - AI Analysis (pipeline viz)
   - SAR Report (split-screen + SBF)
   - Audit Trail (timeline)
4. **Additional: Export icon (PDF)**
   - Label: "Banking-Standard Report Export"
   - Sub: "CONFIDENTIAL • Signatures • Print/PDF"

**Five bullet points below:**
- Dashboard with Charts
- Hover-to-Highlight (SBF)
- Edit & Approve Workflow
- Export PDF Report  
- Filterable Audit Timeline

---

## CONNECTING ARROWS

**Flow:**
1. Zone 1 → Zone 2 (thick arrow, label: "Anonymized Data")
2. Zone 2 → Zone 3 (bi-directional arrow, label: "Log Decisions")
3. Zone 2 → Zone 4 (thick arrow, label: "Generated SAR")
4. Zone 3 → Zone 4 (bi-directional arrow, label: "Audit Queries")

---

## COLOR PALETTE (Obsidian Theme — Matches Live App)

**Zone Colors:**
- Zone 1 (Vault): Blue (#3B82F6)
- Zone 2 (Brain): Purple (#8B5CF6)
- Zone 3 (Memory): Cyan (#06B6D4)
- Zone 4 (UI): Obsidian (#0B0F19)

**Accent Colors:**
- Arrows: White with glow effect
- Text: White (#FFFFFF)
- Icons: Cyan (#06B6D4) or White

**Effects:**
- Glassmorphism on all boxes (10% white overlay, blur)
- Drop shadows on all elements
- Subtle glow on connecting arrows

---

## TITLE AT TOP OF SLIDE
**"SentinAI System Architecture"**
**Subtitle:** "Privacy-First Multi-Agent SAR Generation"

---

## CALLOUT BOXES (Bottom)

**X-Factor Callout:**
🎯 **Sentence-Backed Forensics**
"Hover sentence → Evidence rows glow"
(Arrow pointing to Zone 4)

**Export Callout:**
📄 **Banking-Standard Export**
"CONFIDENTIAL banner • MLRO Signatures • A4 PDF"

---

# Alternative: Simple Text-Based Diagram for Slide

```
┌─────────────────────────────────────────────────────────────┐
│              ZONE 1: SECURE DATA INGESTION                  │
│   CSV/JSON Data → [🔒 PII Masking] → Anonymized Data       │
└──────────────────────┬──────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────────────┐
│              ZONE 2: AGENTIC CORE (Multi-Agent)              │
│                                                              │
│        🔍 Investigator          ⚖️ Compliance        ✍️ Scribe │
│        (Pandas+NetworkX)       (RAG+Laws)        (Llama 3)   │
│                 ↘               ↓               ↙              │
│              ┌─────────────────────────┐                     │
│              │     ORCHESTRATOR        │                     │
│              │    (State Machine)      │                     │
│              └──────────┬──────────────┘                     │
└─────────────────────────┼──────────────────────────────────-┘
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                   ↓
┌──────────────────┐              ┌──────────────────────┐
│  ZONE 3: AUDIT   │◄────────────►│  ZONE 4: DASHBOARD   │
│   (SQLite DB)    │              │   (5-Page Web SPA)   │
│                  │              │                      │
│ • CoT Logs       │              │  ┌────────┬────────┐ │
│ • Sentence IDs   │              │  │ Report │  Data  │ │
│ • Alerts         │              │  │  Panel │ Table  │ │
│                  │              │  └───┬────┴───┬────┘ │
│                  │              │      └────────┘      │
│                  │              │  Hover-to-Highlight  │
│                  │              │  + Export PDF Report  │
└──────────────────┘              └──────────────────────┘
```

---

# Tips for PowerPoint Design

1. **Use SmartArt** for the Zone 2 agent circles
2. **Use Shapes + Connectors** for arrows
3. **Group elements** by zone for easy alignment
4. **Add animations** (optional):
   - Fade in each zone sequentially
   - Arrow animations to show flow
5. **Use consistent fonts:** 
   - Header: Bold, 28pt
   - Labels: Regular, 18pt
   - Sub-text: 14pt
6. **Icons:** Use PowerPoint's built-in icon library or download from Flaticon

---

**Pro Tip:** Keep it clean! This architecture should fit on ONE slide. The obsidian (#0B0F19) background matches the actual app.
