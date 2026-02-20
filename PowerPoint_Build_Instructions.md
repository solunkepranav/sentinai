# SentinAI PowerPoint - Step-by-Step Build Guide
## Follow these exact steps in PowerPoint

---

# SETUP (Do This First)

1. **Open PowerPoint** → New Presentation
2. **Design Tab** → Click dropdown → Choose "Blank" 
3. **Design Tab** → Format Background → Fill: Gradient
   - Type: Linear
   - Direction: Diagonal up
   - Stops: 
     - 0%: #0B0F19 (obsidian — matches the live app)
     - 100%: #111827 (dark charcoal)
   - Apply to All

4. **Set Default Fonts:**
   - Home → Font dropdown → Set to "Inter" or "Segoe UI"
   - Default title: White, Bold, 44pt
   - Default body: White, Regular, 24pt

---

# SLIDE 1: TITLE SLIDE

**Layout:** Title Slide

**Elements:**
1. **Title Text Box** (center, top third):
   ```
   SentinAI
   ```
   - Font: 72pt, Bold, White
   - Add text shadow: Home → Text Effects → Shadow → Outer

2. **Subtitle** (below title):
   ```
   Privacy-First Multi-Agent SAR Narrative Generator
   with Sentence-Backed Forensics
   ```
   - Font: 28pt, Regular, #06B6D4 (cyan)

3. **Tagline** (below subtitle):
   ```
   "Transforming 6 Hours into 30 Minutes — With Full Transparency"
   ```
   - Font: 20pt, Italic, #94A3B8

4. **Team Info** (bottom):
   ```
   Team: [YOUR_TEAM_NAME] | SPIT Mumbai | Feb 17, 2026
   ```
   - Font: 18pt, Light Gray (#CBD5E1)

5. **Accent line:**
   - Insert → Shapes → Rectangle
   - Size: Full width × 4px height
   - Fill: Gradient (#06B6D4 to transparent)

---

# SLIDE 2: THE PROBLEM

**Title:**
```
The SAR Generation Crisis
```

**Content - Left Column:**
5 Rounded Rectangles (stacked), fill dark blue (#1E3A5F, 30% transparency):

**Box 1:** ⏱️ "5-6 hours per report"
**Box 2:** 📊 "Thousands of SARs annually"
**Box 3:** ⚠️ "Error-prone, inconsistent"
**Box 4:** 🔍 "Regulators demand explainability"
**Box 5:** ❌ "Black-box AI fails audits"

**Content - Right Column:**
Text box with amber background (#F59E0B, 20%):
```
Real Example:
A customer receives ₹50 lakhs from 47 accounts 
in one week, then transfers abroad.

Current Process: 6 HOURS of manual work
```

---

# SLIDE 3: OUR SOLUTION

**Title:**
```
SentinAI: The Solution
```

**Top Banner (Cyan #06B6D4):**
```
🎯 Sentence-Backed Forensics (SBF)
Every sentence links to exact transaction data
```

**3 Agent Circles (Purple #8B5CF6):**
- Circle 1: 🔍 "Investigator Agent" / "Pandas + NetworkX"
- Circle 2: ⚖️ "Compliance Agent" / "RAG + AML Laws"
- Circle 3: ✍️ "Scribe Agent" / "Llama 3 (Ollama)"

**Benefits:**
```
✅ Fully Offline (Ollama local LLM — no cloud)
✅ Explainable (hover sentence → see evidence)
✅ Human-in-the-Loop (edit, approve, export)
✅ 90% Time Reduction (6h → 30min)
✅ Export-Ready (banking-standard PDF)
```

---

# SLIDE 4: ARCHITECTURE DIAGRAM

Follow `Architecture_Diagram_Guide.md` for detailed instructions.

4 zones: Data Vault (blue) → Agentic Core (purple) → Audit (cyan) → Dashboard (dark)
Connect with white glowing arrows.

---

# SLIDE 5: THE X-FACTOR (SENTENCE-BACKED FORENSICS)

**Title:**
```
The X-Factor: Sentence-Backed Forensics
```

**Top — How it works:**
```
LLM Output: [[TXN_1006,TXN_1003||structured deposits below threshold]]
              ↓ parsed by frontend ↓
HTML: <span class="interactive-evidence">
        structured deposits below reporting threshold
      </span>
```

**Visual Demo:**

**Left Side (60%):** Dark panel with SAR text, one phrase underlined cyan
**Right Side (40%):** Table with 3 flagged rows highlighted cyan
**Connector:** Curved cyan line with glow effect

---

# SLIDE 6: MULTI-AGENT SYSTEM

**Title:**
```
How Agents Collaborate
```

SmartArt → Process → Vertical Process

**Step 1:** 🔍 Investigator → "Detects patterns" → Output: Transaction IDs
**Step 2:** ⚖️ Compliance → "Maps to AML laws" → Output: Legal citations
**Step 3:** ✍️ Scribe → "Drafts narrative via Llama 3" → Output: SAR draft
**Step 4:** 👤 Human Analyst → "Reviews, approves" → Output: Filed report

---

# SLIDE 7: THE 5-PAGE DASHBOARD

**Title:**
```
Premium Fintech Dashboard
```

5 panels showing each page:
- Dashboard (stats + charts)
- Data Ingestion (upload + preview)
- AI Analysis (animated pipeline)
- SAR Report (split-screen + SBF)
- Audit Trail (filterable timeline)

**Best approach:** Insert ACTUAL SCREENSHOTS from the live app!

---

# SLIDE 8: REPORT EXPORT

**Title:**
```
Banking-Standard Report Export
```

Show mockup/screenshot of exported report:
- 🔴 CONFIDENTIAL banner
- 6 numbered sections
- Transaction table with CRITICAL badges
- Signature blocks at bottom
- 🖨️ Print / Save as PDF button

---

# SLIDE 9: METHODOLOGY

**Title:**
```
Scalability • Performance • Security
```

**Column 1: Scalability**
```
✓ Horizontal Scaling (stateless)
✓ Async Pipeline  
✓ Docker-ready
✓ Environment-aware
```

**Column 2: Performance**
```
⚡ 6 hours → 30 min (90%)
⚡ Batch processing
⚡ GPU optimized (Ollama)
⚡ No network latency
```

**Column 3: Security**
```
🔒 Fully offline
🔒 PII masking
🔒 RBAC roles
🔒 Audit immutable
```

**Bottom banner (Cyan):**
```
100% Open Source • Zero Cloud Dependencies
```

---

# SLIDE 10: TECH STACK

Table: 8 rows × 3 columns

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Backend | Python 3.11 + FastAPI | Async API server |
| LLM | Ollama (Llama 3 / Mistral) | Local narrative generation |
| Detection | Pandas + NetworkX | Anomaly & graph analysis |
| Knowledge | JSON + keyword RAG | AML regulations |
| Database | SQLite | Audit logs |
| Frontend | HTML + CSS + JS + Chart.js | Banking dashboard |
| Export | Self-contained HTML/CSS | A4-printable report |
| Explainability | Custom SBF System | Sentence traceability |

---

# SLIDE 11: REAL-WORLD WALKTHROUGH

**Title:**
```
Real Example: ₹50L from 47 Accounts
```

5-step flow:
1. Input → CSV uploaded
2. Investigator → Detects fan-in (47→1)
3. Compliance → Maps to PMLA Sec 12
4. Scribe → Generates SAR via Llama 3 with forensic markers
5. Analyst → Reviews, approves, exports PDF

**Before/After:**
- Red: "6 HOURS ⏱️"
- Green: "30 MINUTES ✅"

---

# SLIDE 12: FUTURE SCOPE

10 items with icons (2 columns × 5 rows):
1. 📥 Multi-Format Ingestion (SWIFT, ISO 20022)
2. 🌐 Advanced Graph Analytics (Louvain)
3. 🎯 Fine-Tuned Domain LLM
4. 🌍 Multi-Language SARs
5. ⚡ Real-Time Streaming (Kafka)
6. 📡 Regulatory Auto-Updates
7. 👥 Collaborative Review
8. 📊 Dashboard Analytics
9. 🔄 LangGraph Upgrade
10. ☁️ Cloud Deployment Option

---

# SLIDE 13: WHY WE WIN

**Innovation:**
```
🏆 Sentence-Backed Forensics — sentence-level audit trail
🏆 Privacy-First — fully offline architecture
🏆 Multi-Agent — reduces hallucination
🏆 Banking-Standard Export — CONFIDENTIAL + MLRO signatures
```

**Regulatory Impact:**
```
✅ Answers "Why did AI write this?"
✅ Complete chain-of-thought
✅ Human oversight built-in
```

**Business Impact:**
```
📈 90% time reduction
📈 Consistent quality
📈 Scalable
```

---

# SLIDE 14: ETHICAL AI

3 columns:

**Bias Prevention:** Unbiased prompts, no demographic profiling, on-topic only
**Auditability:** Full CoT logging, every decision traceable
**Human Control:** AI drafts, humans decide, approve required

---

# SLIDE 15: LIVE DEMO

**Title:** Live Demo

5 numbered steps with screenshots:
1. Dashboard → Stats + charts
2. Data Ingestion → "Load Demo Dataset"
3. AI Analysis → Animated pipeline
4. SAR Report → Hover phrases → Evidence glows → Export
5. Exported Report → CONFIDENTIAL → Print/PDF

```
URL: http://localhost:8000
One-click: run_sentinai.bat
```

---

# SLIDE 16: THANK YOU

```
SentinAI
```
80pt, Bold, Gradient (White → Cyan)

```
Privacy-First Multi-Agent SAR Generation
```
32pt, Cyan

Contact + Team info + Mentors

```
Questions?
```
40pt, White

---

# FINAL TOUCHES

1. **Slide numbers:** Insert → Slide Number → Apply to All
2. **Transitions:** Fade → Apply to All (0.5s)
3. **Review:** Slide Show → From Beginning (F5)
4. **Save:** `[TeamName]_SPIT_170226.pptx`

**Estimated build time:** 60-90 minutes for all 16 slides

---

# TIPS

- Take LIVE SCREENSHOTS from the running app — more impressive than mockups:
  1. Start `run_sentinai.bat`
  2. Open `http://localhost:8000`
  3. Win+Shift+S to capture
  4. Paste into slides
- Use alignment guides (View → Guides)
- Group elements (Select → Right-click → Group)
- Test slideshow frequently (F5)

Good luck! 🚀
