

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


