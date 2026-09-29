// src/data.js - Real Portfolio & Project Data for Syed Muhammad Ayyan Ibrar

export const DEVELOPER_PROFILE = {
  name: "Syed Muhammad Ayyan Ibrar",
  shortName: "Ayyan Ibrar",
  title: "Enterprise AI Systems Engineer",
  tagline: "Deterministic multi-agent federations, automated regulatory governance, & edge multimodal architectures.",
  location: "Lahore, Pakistan (Open to Remote Worldwide)",
  phone: "+92 322 0621975",
  email: "syedmuhammadayyanibrar@gmail.com",
  cvUrl: "/Syed_Ayyan_CV.pdf",
  photoUrl: "/profile.jpg",
  status: "🟢 OPEN TO OPPORTUNITIES // AI SYSTEMS & AGENTIC ARCHITECTURES",
  stats: {
    experience: "Freelance AI Engineer",
    turnaroundReduction: "75%",
    defenseGrounding: "100%",
    evidenceAccuracy: "99.3%",
    education: "BS Artificial Intelligence (CGPA 3.76)",
  },
  skills: {
    agentOrchestration: ["Multi-Agent Federations", "LangGraph", "State Machines", "Google Gemini API", "Fastn MCP", "Adversarial Verification"],
    backendInfra: ["Python 3.12 (AsyncIO)", "FastAPI", "PostgreSQL", "asyncpg", "Redis", "Qdrant", "ChromaDB", "Docker"],
    governanceSafety: ["EU AI Act Compliance", "Dual-Key HITL Authorization", "Expected Calibration Error (ECE)", "Behavioral Trust Modeling"],
    edgeMobileAi: ["On-Device Whisper ONNX", "Gemma 4 Multimodal", "CameraX", "Kotlin", "Jetpack Compose", "SQLite / Room"],
  },
  socials: [
    { label: "GitHub", url: "https://github.com/syedmuhammadayyanibrar", icon: "github", handle: "@syedmuhammadayyanibrar" },
    { label: "LinkedIn", url: "https://linkedin.com/in/ayyan-ibrar", icon: "linkedin", handle: "/in/ayyan-ibrar" },
    { label: "Email", url: "mailto:syedmuhammadayyanibrar@gmail.com", icon: "email", handle: "syedmuhammadayyanibrar@gmail.com" },
  ]
};

// Highway Billboards in between buildings
export const BILLBOARDS = [
  {
    id: "billboard_1",
    x: 1850,
    width: 350,
    height: 140,
    headline: "SYED AYYAN // AI SYSTEMS ENGINEER",
    sublines: [
      "★ AI/ML ENGINEER & SYSTEMS ARCHITECT",
      "★ DETERMINISTIC MULTI-AGENT FEDERATIONS",
      "★ EU AI ACT DETERMINISTIC GOVERNANCE"
    ],
    tag: "PRODUCTION AI ARCHITECT"
  },
  {
    id: "billboard_2",
    x: 3500,
    width: 360,
    height: 140,
    headline: "ZERO-HALLUCINATION ENTERPRISE AI",
    sublines: [
      "⚡ FASTN MCP WORKFLOW NERVOUS SYSTEM",
      "🛡️ DUAL-KEY HITL HUMAN SAFETY GATES",
      "🎙️ ON-DEVICE WHISPER ONNX & GEMMA EDGE"
    ],
    tag: "SAFETY • DETERMINISM • SCALE"
  }
];

// All Landmark Locations along the Avenue
export const LANDMARKS = [
  // 1. Street Entrance 3-Panel Directory Board
  {
    id: "start_board",
    type: "start_board",
    x: 240,
    width: 290,
    height: 185,
    label: "DEV DIRECTORY & SOCIALS",
    buildingNumber: "00",
    category: "Quick Connect Board",
    interactionPrompt: "[E] OPEN DIRECTORY",
    badge: "LINKS",
    signColor: "#00ffcc",
    summary: "Three illuminated directory panels for GitHub, Gmail, and LinkedIn.",
    panels: [
      {
        id: "github",
        title: "GITHUB REPOSITORIES",
        desc: "Access source code, multi-agent frameworks, Fastn MCP & evaluation harnesses.",
        link: "https://github.com/syedmuhammadayyanibrar",
        badge: "CODE",
        color: "#ffffff"
      },
      {
        id: "gmail",
        title: "DIRECT GMAIL INBOX",
        desc: "syedmuhammadayyanibrar@gmail.com",
        link: "mailto:syedmuhammadayyanibrar@gmail.com",
        badge: "MAIL",
        color: "#ff4444"
      },
      {
        id: "linkedin",
        title: "LINKEDIN NETWORK",
        desc: "Connect on LinkedIn with Syed Muhammad Ayyan Ibrar.",
        link: "https://linkedin.com/in/ayyan-ibrar",
        badge: "CONNECT",
        color: "#0088ff"
      }
    ]
  },

  // 2. Project 1: CAS (Contract Agentic Society)
  {
    id: "cas",
    type: "project",
    projectNumber: "01",
    x: 720,
    width: 380,
    height: 260,
    label: "01: CAS // CONTRACT MESH",
    marqueeName: "CAS // CONTRACT AGENTIC SOCIETY",
    category: "Featured Project 1",
    interactionPrompt: "[E] INSPECT CAS PROJECT",
    badge: "MULTI-AGENT",
    signColor: "#00ffcc",
    project: {
      id: "cas",
      name: "Contract Agentic Society (CAS)",
      subtitle: "Enterprise Contract Lifecycle Mesh with Fastn MCP Nervous System",
      tagline: "Federation of 6 autonomous agent societies automating B2B contract lifecycles and cutting review turnaround by 75%.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/CAS",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/CAS.git",
      problem: "Enterprise commercial contract turnaround takes weeks per agreement, suffering from clause ambiguity, overlooked SLA liabilities, and manual reviewer fatigue.",
      solution: "Architected a federation of 6 autonomous agent societies (Contract, Risk, Negotiation, Compliance, Obligation, Dispute) utilizing Google Gemini and FastAPI. Implemented an adversarial debate pipeline (Prosecution vs. Defense) that stress-tests clauses with 100% defense grounding.",
      metrics: [
        { label: "Review Speedup", value: "75%", rating: "Verified" },
        { label: "Defense Grounding", value: "100%", rating: "Adversarial" },
        { label: "Clause Extraction", value: "100%", rating: "Complete" },
        { label: "Agent Societies", value: "6 Swarms", rating: "Federated" },
      ],
      stack: ["Python 3.12", "FastAPI", "Google Gemini API", "Fastn MCP", "PostgreSQL", "asyncpg", "Docker", "React"],
      architecture: [
        "Inbound DocuSign Intake via Fastn MCP ➔ Contract Intake & Parsing Agent",
        "Adversarial Risk Intelligence Pipeline: Prosecution Agent vs. Defense Agent",
        "Negotiation & Compliance Validation against Corporate Policy Vectors",
        "Obligation Extraction ➔ Post-Signature Slack & Google Calendar Sync"
      ],
      liveDemoUrl: "https://github.com/syedmuhammadayyanibrar/CAS",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/CAS",
      slides: [
        {
          title: "TTY01: CAS AGENT FEDERATION TELEMETRY",
          content: `
+----------------------------------------------------------------+
| [CAS CONTRACT AGENTIC SOCIETY v3.2]  STATUS: ONLINE            |
| REPO: github.com/syedmuhammadayyanibrar/CAS                    |
| ACTIVE SOCIETIES: 6 (CONTRACT, RISK, NEGOTIATION, COMPLIANCE)   |
+----------------------------------------------------------------+
| INTAKE: MSA_ENTERPRISE_2026.PDF (48 CLAUSES EXTRACTED: 100%)   |
| ADVERSARIAL RISK DEBATE:                                       |
| ├─ [PROSECUTION]: CLAUSE 14.2 OVER-LIMITS INDEMNITY LIABILITY  |
| └─ [DEFENSE]: PROPOSED CAPPED CARVE-OUT (GROUNDED: 100%)       |
| FASTN MCP WORKFLOW: DOCUSIGN SIGNED ➔ SLACK ALERT DISPATCHED   |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: MULTI-AGENT SOCIETY FEDERATION",
          content: `
[DOCUSIGN / FASTN MCP] ──▶ [CONTRACT INTAKE AGENT]
                                   │
               ┌───────────────────┴───────────────────┐
               ▼                                       ▼
    [PROSECUTION RISK AGENT]               [DEFENSE RISK AGENT]
    (Uncovers Latent Liabilities)         (Grounds Valid Carve-Outs)
               │                                       │
               └───────────────────┬───────────────────┘
                                   ▼
                  [COMPLIANCE & OBLIGATION MESH]
                                   │
                 [SLACK & CALENDAR MCP AUTOMATION]`
        },
        {
          title: "PERF03: EVALUATION BENCHMARK METRICS",
          content: `
+----------------------------------------------------------------+
| REVIEW DURATION: 14 DAYS REDUCED TO 3.5 HOURS (75% SPEEDUP)    |
| CLAUSE EXTRACTION COMPLETENESS BENCHMARK: 100.0%               |
| POSTGRES ASYNCPG CONNECTION POOL LATENCY: 1.4ms                |
| ZERO UNGROUNDED RISK ALARMS GENERATED IN BENCHMARK HARNESS     |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 3. Project 2: ComplianceOps (EU AI Act Auditor)
  {
    id: "complianceops",
    type: "project",
    projectNumber: "02",
    x: 1360,
    width: 380,
    height: 260,
    label: "02: COMPLIANCEOPS",
    marqueeName: "COMPLIANCEOPS // EU AI ACT AUDITOR",
    category: "Featured Project 2",
    interactionPrompt: "[E] INSPECT COMPLIANCEOPS",
    badge: "GOVERNANCE",
    signColor: "#ff0077",
    project: {
      id: "complianceops",
      name: "ComplianceOps",
      subtitle: "Evidence-Driven AI Compliance Auditor under the EU AI Act",
      tagline: "Autonomous compliance auditing platform for enterprise AI systems with dual-key human authorization.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/compliance-ops",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/compliance-ops.git",
      problem: "Auditing enterprise AI systems against the EU AI Act requires weeks of manual evidence gathering across Git commits, technical specs, and model cards.",
      solution: "Developed an autonomous compliance auditing platform with LangGraph. Orchestrates stateful multi-step evidence gathering across GitHub repositories and Google Drive policies with 99.3% accuracy.",
      metrics: [
        { label: "Evidence Accuracy", value: "99.3%", rating: "Stateful RAG" },
        { label: "Gate Compliance", value: "100.0%", rating: "Dual-Key HITL" },
        { label: "Audit Turnaround", value: "Hours vs Weeks", rating: "Accelerated" },
        { label: "Eval Metrics", value: "8/8 Passed", rating: "Grade A" },
      ],
      stack: ["LangGraph", "Python", "FastAPI", "Next.js", "pgvector", "PostgreSQL", "Slack API", "Linear API"],
      architecture: [
        "Audit Trigger ➔ Stateful LangGraph Evidence Gathering Subgraphs",
        "Ingest Codebase AST + Google Drive Policy Documents ➔ pgvector Similarity",
        "Deterministic Safety Gate: Dual-Key Human Approval before Ticket Execution",
        "Linear Remediation Tickets & Automated Executive Audit PDF Generation"
      ],
      liveDemoUrl: "https://github.com/syedmuhammadayyanibrar/compliance-ops",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/compliance-ops",
      slides: [
        {
          title: "TTY01: LIVE COMPLIANCE AUDIT SESSION",
          content: `
+----------------------------------------------------------------+
| [COMPLIANCEOPS AUDITOR v2.1]  STANDARD: EU AI ACT (HIGH RISK)  |
| REPO: github.com/syedmuhammadayyanibrar/compliance-ops         |
| EVIDENCE ACCURACY: 99.3% | DUAL-KEY HITL STATUS: ENFORCED      |
+----------------------------------------------------------------+
| AUDIT CHECK #1: ARTICLE 10 (DATA GOVERNANCE) ➔ PASS (GIT LOGS) |
| AUDIT CHECK #2: ARTICLE 14 (HUMAN OVERSIGHT)  ➔ WARNING        |
| REMEDIATION ACTION: LINEAR TICKET #ENG-481 QUEUED              |
| SAFETY GATE: WAITING ON KEY 1 (LEAD) & KEY 2 (SECURITY)        |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: LANGGRAPH STATEFUL AUDIT WORKFLOW",
          content: `
[EVIDENCE SOURCES: GITHUB + DRIVE] ──▶ [LANGGRAPH AUDITOR GRAPH]
                                                 │
                                                 ▼
                             [DETERMINISTIC EVALUATION ENGINE]
                                                 │
                             ┌───────────────────┴───────────────────┐
                             ▼                                       ▼
                   [COMPLIANT (PASS)]                      [GAP DETECTED]
                             │                                       │
                             ▼                                       ▼
                 [AUDIT REPORT GENERATED]                [DUAL-KEY HITL GATE]
                                                                     │
                                                         [LINEAR REMEDIATION]`
        },
        {
          title: "PERF03: RIGOROUS SAFETY & POLICY BENCHMARKS",
          content: `
+----------------------------------------------------------------+
| EVALUATION PASS RATE: 100.0% ACROSS 8 CRITICAL METRICS         |
| ZERO UNAUTHORIZED LINEAR TICKET MUTATIONS DETECTED             |
| VECTOR RETRIEVAL PRECISION (PGVECTOR COSINE): 99.3%            |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 4. Project 3: Negotiation Agent Engine (B2B Bargaining Mesh)
  {
    id: "negotiation_agent",
    type: "project",
    projectNumber: "03",
    x: 2320,
    width: 380,
    height: 260,
    label: "03: NEGOTIATION AGENT",
    marqueeName: "NEGOTIATION AGENT // B2B BARGAINING",
    category: "Featured Project 3",
    interactionPrompt: "[E] INSPECT NEGOTIATION ENGINE",
    badge: "GAME THEORY",
    signColor: "#ffd700",
    project: {
      id: "negotiation_agent",
      name: "Autonomous B2B Deal & Procurement Negotiation Engine",
      subtitle: "Multi-Agent Bargaining Engine with Behavioral Trust Modeling",
      tagline: "Decentralized multi-agent bargaining engine where buyer and vendor agents autonomously negotiate agreements to prevent deadlocks.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/negotiation_agent",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/negotiation_agent.git",
      problem: "Commercial B2B vendor deals and SLA negotiations frequently stall in multi-party deadlocks, with counterparties making deceptive claims.",
      solution: "Engineered a decentralized multi-agent bargaining engine in LangGraph and FastAPI. Implemented an asynchronous 17-message state-machine protocol with behavioral trust modeling in Qdrant.",
      metrics: [
        { label: "Protocol Messages", value: "17 States", rating: "Deterministic" },
        { label: "Deadlocks Resolved", value: "100%", rating: "Coalitions" },
        { label: "Trust Vector Memory", value: "Qdrant", rating: "Real-time" },
        { label: "Inference Speed", value: "Groq LLM", rating: "<180ms" },
      ],
      stack: ["LangGraph", "Groq LLM", "FastAPI", "Redis Checkpoints", "Qdrant Vector DB", "PostgreSQL", "LangSmith"],
      architecture: [
        "Buyer & Vendor Agent Personas Ingress ➔ 17-Message State Protocol",
        "Concession Velocity Tracking & Behavioral Trust Modeling via Qdrant",
        "Adversarial Bluff Detection ➔ Automated Coalition Pareto Optimum Deal"
      ],
      liveDemoUrl: "https://github.com/syedmuhammadayyanibrar/negotiation_agent",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/negotiation_agent",
      slides: [
        {
          title: "TTY01: MULTI-AGENT BARGAINING TRANSCRIPT",
          content: `
+----------------------------------------------------------------+
| [NEGOTIATION ENGINE v2.0]  DEAL: CLOUD STORAGE INFRA SLA       |
| REPO: github.com/syedmuhammadayyanibrar/negotiation_agent      |
| STATE MACHINE: ROUND 4 OF 17  PARETO OPTIMUM CONVERGENCE: 94%  |
+----------------------------------------------------------------+
| [BUYER-AGENT]: "REQUEST 99.99% SLA AT $42k/MO (MAX BUDGET)"   |
| [VENDOR-AGENT]: "OFFER 99.95% AT $40k/MO OR 99.99% AT $44k/MO"|
| [TRUST-ENGINE]: VENDOR CONCESSION VELOCITY: 0.82 (HONEST CLAIM)|
| PROTOCOL ACTION: REACHED EQUILIBRIUM AT $41.8k/MO WITH 99.99% |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: 17-MESSAGE STATE MACHINE TOPOLOGY",
          content: `
[BUYER INTAKE]                                [VENDOR INTAKE]
       │                                             │
       ▼                                             ▼
[BUYER STRATEGY AGENT]                     [VENDOR STRATEGY AGENT]
       │                                             │
       └──────────────────────┬──────────────────────┘
                              ▼
            [17-MESSAGE DETERMINISTIC STATE MACHINE]
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
    [BEHAVIORAL TRUST MODEL]      [COALITION / PARETO ENGINE]
    (Qdrant Concession Vectors)   (Resolves Deadlocks)
               │                             │
               └──────────────┬──────────────┘
                              ▼
                 [EXECUTED DEAL MEMORANDUM]`
        },
        {
          title: "PERF03: PARETO EFFICIENCY REPORT",
          content: `
+----------------------------------------------------------------+
| CONVERGENCE SUCCESS RATE: 98.4% WITHIN PROTOCOL TIMEOUT LIMIT  |
| BAD-FAITH POSTURING IDENTIFICATION ACCURACY: 94.2%             |
| FASTAPI + REDIS CHECKPOINT RESTORATION LATENCY: 2.1ms          |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 5. Project 4: AuraSight (Edge-Native Voice Transaction Assistant)
  {
    id: "aurasight",
    type: "project",
    projectNumber: "04",
    x: 2980,
    width: 380,
    height: 260,
    label: "04: AURASIGHT",
    marqueeName: "AURASIGHT // EDGE VOICE ACCOUNTING",
    category: "Featured Project 4",
    interactionPrompt: "[E] INSPECT AURASIGHT",
    badge: "EDGE MULTIMODAL",
    signColor: "#00ff88",
    project: {
      id: "aurasight",
      name: "AuraSight",
      subtitle: "Edge-Native Voice Transaction & Accounting System",
      tagline: "Offline-first multimodal assistant enabling visually impaired shopkeepers to manage billing and ledgers in Urdu.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/AuraSight",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/AuraSight.git",
      problem: "Visually impaired micro-retailers in South Asia struggle to verify physical currency notes, track customer credit ledgers (Khata), and calculate change in busy, noisy stalls.",
      solution: "Engineered an offline-first multimodal Android assistant in Kotlin and Jetpack Compose. Pairs local Whisper ONNX speech-to-text with Gemma 4 multimodal vision and constrained function-calling.",
      metrics: [
        { label: "Arithmetic Error", value: "0.000%", rating: "Zero Hallucination" },
        { label: "Edge Dependency", value: "100% Offline", rating: "On-Device" },
        { label: "Speech Engine", value: "Whisper ONNX", rating: "Hardware Keyed" },
        { label: "Vision Model", value: "Gemma 4", rating: "Currency Detect" },
      ],
      stack: ["Kotlin", "Jetpack Compose", "Whisper ONNX", "Gemma 4", "CameraX", "SQLite / Room", "Android SDK"],
      architecture: [
        "Physical Hardware Volume Trigger ➔ Fast Wake Local Whisper ONNX ASR",
        "Constrained Grammar Function Calling ➔ Zero Arithmetic Hallucination Parser",
        "CameraX Currency Verification via Quantized Gemma 4 Multimodal",
        "Local Encrypted SQLite / Room Ledger (Khata) Storage"
      ],
      liveDemoUrl: "https://github.com/syedmuhammadayyanibrar/AuraSight",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/AuraSight",
      slides: [
        {
          title: "TTY01: ON-DEVICE RUNTIME TELEMETRY",
          content: `
+----------------------------------------------------------------+
| [AURASIGHT EDGE RUNTIME v1.8]  DEVICE: ANDROID ARM64           |
| REPO: github.com/syedmuhammadayyanibrar/AuraSight              |
| NETWORK: OFFLINE (AIR-GAPPED) | SPEECH ENGINE: WHISPER ONNX    |
+----------------------------------------------------------------+
| 11:20:04.120  HARDWARE VOL-DOWN TRIGGER ➔ LISTENING [URDU]     |
| 11:20:05.310  TRANSCRIBED: "احمد نے پانچ سو روپے ادھار لیے"    |
| PARSED INTENT: RECORD_DEBIT (NAME: AHMAD, AMOUNT: PKR 500)     |
| VERIFICATION: CONSTRAINED GRAMMAR CHECK ➔ ZERO ARITHMETIC DRIFT|
| LEDGER UPDATED IN ROOM SQLITE IN 4.2ms                         |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: OFFLINE FUNCTION-CALLING TOPOLOGY",
          content: `
[HARDWARE VOLUME BUTTON] ──▶ [WHISPER ONNX URDU STREAM]
                                       │
                                       ▼
                       [CONSTRAINED GRAMMAR PARSER]
                     (Guarantees Zero Arithmetic Error)
                                       │
               ┌───────────────────────┴───────────────────────┐
               ▼                                               ▼
    [ROOM SQLITE LEDGER / KHATA]                   [GEMMA 4 CURRENCY OCR]
    (Encrypted Local Storage)                      (CameraX Note Verification)
               │                                               │
               └───────────────────────┬───────────────────────┘
                                       ▼
                         [LOCAL TTS URDU AUDIO FEEDBACK]`
        },
        {
          title: "PERF03: ON-DEVICE RESOURCE ALLOCATION",
          content: `
+----------------------------------------------------------------+
| MEMORY RESIDENT FOOTPRINT: 180 MB ON ANDROID 14                |
| END-TO-END VOICE COMMAND TO LEDGER COMMIT: <420ms              |
| BATTERY DRAIN: <3.5% PER 8-HOUR CONTINUOUS RETAIL SHIFT        |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 6. Finale Board: "Let's build together" (Matching Attached Image)
  {
    id: "connect_pavilion",
    type: "connect_pavilion",
    x: 4050,
    width: 400,
    height: 275,
    label: "FINALE: LET'S BUILD TOGETHER",
    buildingNumber: "05",
    category: "Connect & Career",
    interactionPrompt: "[E] CONNECT & HIRE",
    badge: "CONNECT",
    signColor: "#00aaff",
    summary: "Civic finale board replicating Syed Ayyan's connection terminal.",
    connectCard: {
      eyebrow: "CONNECT",
      title: "Let's build together",
      description: "Looking for an AI/ML Engineer to build reliable data pipelines, deterministic multi-agent systems, or architect edge multimodal systems? Reach out directly or grab my resume:",
      email: "syedmuhammadayyanibrar@gmail.com",
      cvUrl: "/Syed_Ayyan_CV.pdf",
      photoUrl: "/profile.jpg",
      socials: [
        { name: "GitHub", url: "https://github.com/syedmuhammadayyanibrar" },
        { name: "LinkedIn", url: "https://linkedin.com/in/ayyan-ibrar" },
        { name: "Email", url: "mailto:syedmuhammadayyanibrar@gmail.com", label: "syedmuhammadayyanibrar@gmail.com" },
      ]
    }
  }
];

export const STREET_TOTAL_WIDTH = 4800;
