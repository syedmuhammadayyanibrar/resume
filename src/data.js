// src/data.js - Portfolio, AI/ML Projects & Street Landmark Data for Syed Ayyan

export const DEVELOPER_PROFILE = {
  name: "Syed Muhammad Ayyan Ibrar",
  shortName: "Syed Ayyan",
  title: "AI / ML Engineer",
  tagline: "Reliable data pipelines, deterministic multi-agent systems, & edge multimodal architectures.",
  location: "Neo-Tokyo Ave, Sector 7 (Remote / Worldwide)",
  email: "syedmuhammadayyanibrar@gmail.com",
  cvUrl: "/Syed_Ayyan_CV.pdf",
  status: "🟢 OPEN TO OPPORTUNITIES // AI/ML & MULTI-AGENT SYSTEMS",
  stats: {
    experience: "6+ Years",
    pipelinesShipped: "30+ Prod Pipelines",
    inferenceLatency: "<10ms P99",
    modelsFineTuned: "45+ Models",
    slaReliability: "99.99%",
  },
  skills: {
    coreAi: ["Deterministic Multi-Agent Systems", "RAG & Vector Search", "Edge Multimodal Perception", "LLM Fine-Tuning & Distillation"],
    pipelines: ["Apache Kafka", "Redis Feature Store", "Ray Distributed", "DuckDB", "PostgreSQL", "Airflow / Dagster"],
    languages: ["Python", "Rust", "TypeScript", "C++", "Go", "SQL"],
    frameworks: ["PyTorch", "vLLM", "TensorRT-LLM", "Hugging Face", "LangGraph", "FastAPI"],
  },
  socials: [
    { label: "GitHub", url: "https://github.com/syedmuhammadayyanibrar", icon: "github", handle: "@syedmuhammadayyanibrar" },
    { label: "LinkedIn", url: "https://linkedin.com/in/syedayyan", icon: "linkedin", handle: "/in/syedayyan" },
    { label: "Email", url: "mailto:syedmuhammadayyanibrar@gmail.com", icon: "email", handle: "syedmuhammadayyanibrar@gmail.com" },
  ]
};

// Street Billboards in between buildings
export const BILLBOARDS = [
  {
    id: "billboard_1",
    x: 1980,
    width: 290,
    height: 140,
    headline: "SYED AYYAN // AI & ML ENGINEER",
    sublines: [
      "★ RELIABLE DATA PIPELINES",
      "★ DETERMINISTIC MULTI-AGENT SYSTEMS",
      "★ EDGE MULTIMODAL ARCHITECTURES"
    ],
    tag: "NOW HIRING & CONSULTING"
  },
  {
    id: "billboard_2",
    x: 3780,
    width: 310,
    height: 140,
    headline: "PRODUCTION-GRADE AI SYSTEMS",
    sublines: [
      "⚡ SUB-10MS DETERMINISTIC INFERENCE",
      "🛡️ ZERO-HALLUCINATION GUARDRAILS",
      "🚀 FROM SOTA RESEARCH TO BULLETPROOF CODE"
    ],
    tag: "SCALE • RELIABILITY • SPEED"
  }
];

// All Landmark Locations along the Avenue
export const LANDMARKS = [
  // 1. Street Entrance 3-Panel Directory Board
  {
    id: "start_board",
    type: "start_board",
    x: 240,
    width: 280,
    height: 180,
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
        desc: "Open source AI models, agent frameworks & pipelines",
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
        desc: "Professional trajectory, recommendations & updates",
        link: "https://linkedin.com/in/syedayyan",
        badge: "CONNECT",
        color: "#0088ff"
      }
    ]
  },

  // 2. Project Building 1: NeuroStream (Multi-Agent LLM Gateway)
  {
    id: "neurostream",
    type: "project",
    projectNumber: "01",
    x: 620,
    width: 350,
    height: 250,
    label: "01: NEUROSTREAM",
    marqueeName: "NEUROSTREAM // MULTI-AGENT GATEWAY",
    category: "Featured Project 1",
    interactionPrompt: "[E] INSPECT NEUROSTREAM",
    badge: "AGENTS",
    signColor: "#00ffcc",
    project: {
      id: "neurostream",
      name: "NeuroStream Engine",
      subtitle: "Deterministic Multi-Agent Orchestration & Vector Routing Gateway",
      tagline: "Sub-8ms token streaming with speculative caching and autonomous fallback hedging.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/neurostream",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/neurostream.git",
      problem: "Complex multi-agent enterprise workflows suffer from cumulative LLM token latency, upstream API rate-limits, and unpredictable non-deterministic state drifting.",
      solution: "Engineered a high-performance reverse proxy & agent coordinator in Rust. Features deterministic multi-agent state machines, speculative semantic prompt caching, and zero-downtime provider cascades.",
      metrics: [
        { label: "Time-to-First-Token", value: "6.8ms", rating: "99th %ile" },
        { label: "Daily Agent Runs", value: "450k+", rating: "Active" },
        { label: "Upstream Cost Saved", value: "38%", rating: "Optimized" },
        { label: "SLA Availability", value: "99.99%", rating: "Grade A" },
      ],
      stack: ["Python", "Rust", "vLLM", "Vector DB", "Docker", "Prometheus", "FastAPI"],
      architecture: [
        "Inbound Task ➔ Agentic DAG Planner (Deterministic State Evaluation)",
        "Semantic Cache Lookup (Cosine Similarity > 0.96) ➔ Sub-2ms Fast Return",
        "Cache Miss ➔ Distributed Worker Cascade (Claude 3.5 / GPT-4o / Local Qwen)",
        "Speculative Chunk Compression ➔ Real-time SSE Stream Delivery"
      ],
      liveDemoUrl: "https://example.com/neurostream-demo",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/neurostream",
      slides: [
        {
          title: "TTY01: SPECULATIVE TOKEN STREAM MONITOR",
          content: `
+----------------------------------------------------------------+
| [NEUROSTREAM ENGINE v2.4]  STATUS: ONLINE [99.99%]             |
| REPO: github.com/syedmuhammadayyanibrar/neurostream            |
| ACTIVE AGENT SWARMS: 1,420  AVG TTFT: 6.8ms (P99: 11.2ms)      |
+----------------------------------------------------------------+
| [ROUTER POOL]                                                  |
| ├─ [AGENT-01: RESEARCHER]  LOAD: 48%  TTFT: 14ms  TOK/S: 98.4  |
| ├─ [AGENT-02: SYNTHESIZER] LOAD: 39%  TTFT: 18ms  TOK/S: 84.1  |
| └─ [AGENT-03: CRITIC-LLM]  LOAD: 12%  TTFT:  4ms  TOK/S: 142.0 |
| [CACHE MESH] COSINE THRESHOLD: 0.96 | HIT RATIO: 41.2%         |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: MULTI-AGENT STATE GRAPH",
          content: `
[CLIENT PROMPT] ──▶ [DETERMINISTIC AGENT PLANNER]
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
    [SPECULATIVE VECTOR CACHE]    [MULTI-MODEL CASCADE]
    - Qdrant Cluster HNSW         - Dynamic Hedging Cascade
    - Zero-Copy Ring Buffers      - Automated Fallbacks
               │                             │
               └──────────────┬──────────────┘
                              ▼
                 [VALIDATED SSE STREAM CHUNKS]`
        },
        {
          title: "PERF03: STRESS-TEST BENCHMARK PROFILE",
          content: `
+----------------------------------------------------------------+
| CONCURRENT MULTI-AGENT PIPELINES: 12,000 CONCURRENT SESSIONS   |
| RESIDENT MEMORY USAGE: 24.6 MB (ZERO LEAKS IN RUST RUNTIME)    |
| RUNTIME JITTER: <0.8ms STANDARD DEVIATION ACROSS 1M TOKENS     |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 3. Project Building 2: OmniVision (Edge Multimodal Vision & Perception)
  {
    id: "omnivision",
    type: "project",
    projectNumber: "02",
    x: 1320,
    width: 360,
    height: 260,
    label: "02: OMNIVISION",
    marqueeName: "OMNIVISION // EDGE MULTIMODAL",
    category: "Featured Project 2",
    interactionPrompt: "[E] INSPECT OMNIVISION",
    badge: "VISION",
    signColor: "#ff0077",
    project: {
      id: "omnivision",
      name: "OmniVision Pipeline",
      subtitle: "Edge Multimodal Vision & Real-Time Video Understanding Engine",
      tagline: "Ultra-low-latency on-device multimodal perception running at 60 FPS on edge hardware.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/omnivision",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/omnivision.git",
      problem: "Transmitting 4K video feeds to centralized cloud LLMs introduces 500ms+ latency, massive egress bandwidth costs, and privacy vulnerabilities.",
      solution: "Developed an on-device edge multimodal inference pipeline utilizing quantized vision transformers (ViT) and TensorRT. Executes frame-level semantic segmentation, OCR, and reasoning at 60 FPS locally.",
      metrics: [
        { label: "Edge Frame Rate", value: "62 FPS", rating: "Real-Time" },
        { label: "Quantized Size", value: "1.4 GB", rating: "INT8 / FP8" },
        { label: "Inference Latency", value: "16.1ms", rating: "Sub-Frame" },
        { label: "Bandwidth Saved", value: "96.4%", rating: "Edge Local" },
      ],
      stack: ["PyTorch", "TensorRT", "CUDA / C++", "ONNX", "OpenCV", "Python"],
      architecture: [
        "Camera Ingress ➔ Zero-Copy Hardware Frame Buffer (NVMM)",
        "TensorRT Quantized Vision Transformer (ViT-H/14 INT8)",
        "Temporal Sliding Attention Window for Video Anomaly Detection",
        "Local Vector Synthesis ➔ Actionable Structured JSON Events"
      ],
      liveDemoUrl: "https://example.com/omnivision-demo",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/omnivision",
      slides: [
        {
          title: "TTY01: EDGE MULTIMODAL INFERENCE RADAR",
          content: `
+----------------------------------------------------------------+
| [OMNIVISION ENGINE v1.9]  HARDWARE: JETSON ORIN / RTX 4090     |
| REPO: github.com/syedmuhammadayyanibrar/omnivision             |
| RESOLUTION: 1920x1080@60FPS  MODEL: QUANTIZED MULTIMODAL VIT   |
+----------------------------------------------------------------+
| FRAME #104,912: DETECTED [3 OBJECTS, 1 TEXT EMBEDDING, 1 POSE]|
| LATENCY BREAKDOWN: PRE-PROC: 1.2ms | INFER: 12.8ms | POST: 2.1ms
| POWER ENVELOPE: 32 WATTS   VRAM: 2.1 GB ALLOCATED              |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: HARDWARE-ACCELERATED DATAFLOW",
          content: `
[CAMERA STREAM (RTSP)] ──▶ [ZERO-COPY DMA FRAME BUFFER]
                                    │
                                    ▼
                [TENSORRT QUANTIZED FP8/INT8 VIT]
                                    │
               ┌────────────────────┴────────────────────┐
               ▼                                         ▼
    [OBJECT / POSE TENSOR MAP]              [FAST OCR & KEYWORDS]
               │                                         │
               └────────────────────┬────────────────────┘
                                    ▼
                    [LOCAL MULTIMODAL EVENT BUS]`
        },
        {
          title: "PERF03: ON-DEVICE ACCELERATION BENCHMARKS",
          content: `
+----------------------------------------------------------------+
| FPS ON JETSON ORIN NANO: 58.4 FPS (CONTINUOUS 24/7)            |
| ACCURACY RETENTION: 99.1% OF FULL PRECISION FP32 BASELINE      |
| END-TO-END GLASS-TO-DECISION LATENCY: 16.1ms                   |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 4. Project Building 3: SynapseFlow (Reliable AI Data Pipelines)
  {
    id: "synapseflow",
    type: "project",
    projectNumber: "03",
    x: 2400,
    width: 360,
    height: 260,
    label: "03: SYNAPSEFLOW",
    marqueeName: "SYNAPSEFLOW // DATA PIPELINES",
    category: "Featured Project 3",
    interactionPrompt: "[E] INSPECT SYNAPSEFLOW",
    badge: "PIPELINES",
    signColor: "#ffd700",
    project: {
      id: "synapseflow",
      name: "SynapseFlow Matrix",
      subtitle: "High-Throughput Streaming AI Data Pipeline & Feature Store",
      tagline: "Handling 250,000 events/sec with zero-loss append-only validation and instant feature lookups.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/synapseflow",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/synapseflow.git",
      problem: "Training and serving multimodal LLMs requires massive continuous ingestion from heterogeneous sources without schema drift, data loss, or pipeline bottlenecks.",
      solution: "Engineered an event-driven distributed data pipeline with Apache Kafka, Ray, and DuckDB. Delivers automated schema validation, out-of-order deduplication, and sub-3ms online feature retrieval.",
      metrics: [
        { label: "Peak Ingestion", value: "280,000 EPS", rating: "Stress-Tested" },
        { label: "Feature Lookup", value: "2.4ms", rating: "Sub-Millisecond" },
        { label: "Data Integrity", value: "100.00%", rating: "Zero Dropped" },
        { label: "Dataset Processed", value: "140 TB+", rating: "In Production" },
      ],
      stack: ["Python", "Apache Kafka", "Ray", "DuckDB", "Redis Cluster", "Kubernetes"],
      architecture: [
        "Multi-Source Ingress (Webhooks, S3, Databases) ➔ Kafka Topic Partitions",
        "Distributed Ray Workers with Strict Pydantic Schema Validation",
        "Online Feature Cache (Redis Cluster) + Parquet Cold Archive (S3 / GCS)"
      ],
      liveDemoUrl: "https://example.com/synapseflow-demo",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/synapseflow",
      slides: [
        {
          title: "TTY01: STREAMING INGESTION THROUGHPUT",
          content: `
+----------------------------------------------------------------+
| [SYNAPSEFLOW DATA MATRIX]  ACTIVE TOPICS: 48                   |
| REPO: github.com/syedmuhammadayyanibrar/synapseflow            |
| INGESTION RATE: 274,800 EVENTS/SEC | PARTITION LAG: 0ms        |
+----------------------------------------------------------------+
| 07:41:02.102  CHUNK#90192  5,000 SAMPLES  VALIDATED [0.9ms]   |
| 07:41:02.106  CHUNK#90193  5,000 SAMPLES  VALIDATED [1.1ms]   |
| 07:41:02.110  CHUNK#90194  SCHEMA DRIFT DETECTED ➔ QUARANTINED |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: DISTRIBUTED DATA FLOW SCHEMATIC",
          content: `
[EVENT INGESTION SOURCES]
         │
         ▼
[APACHE KAFKA HIGH-THROUGHPUT CLUSTER]
         │
         ▼
[RAY DISTRIBUTED WORKERS (VALIDATION & EMBEDDING ENRICHMENT)]
         │
         ├─▶ [ONLINE STORE: REDIS CLUSTER (<2.5ms LOOKUP)]
         └─▶ [OFFLINE STORE: PARTITIONED PARQUET DATA LAKE]`
        },
        {
          title: "PERF03: FAULT-TOLERANCE & BACKPRESSURE REPORT",
          content: `
+----------------------------------------------------------------+
| BACKPRESSURE RECOVERY TEST: 500k EVENT BURST TESTED PASSED     |
| REPLICATION FACTOR: 3 (DISTRIBUTED ACROSS MULTI-AZ)            |
| END-TO-END PIPELINE PROCESSING LATENCY: 8.2ms                  |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 5. Project Building 4: AegisGuard AI (Deterministic Safety & Guardrails)
  {
    id: "aegisguard",
    type: "project",
    projectNumber: "04",
    x: 3120,
    width: 350,
    height: 270,
    label: "04: AEGISGUARD AI",
    marqueeName: "AEGISGUARD AI // SAFETY SHIELD",
    category: "Featured Project 4",
    interactionPrompt: "[E] INSPECT AEGISGUARD",
    badge: "GUARDRAIL",
    signColor: "#00ff88",
    project: {
      id: "aegisguard",
      name: "AegisGuard AI",
      subtitle: "Deterministic Hallucination Shield & Latency-Aware Guardrail Proxy",
      tagline: "Deterministic output verification and jailbreak defense with sub-5ms overhead.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/aegisguard-ai",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/aegisguard-ai.git",
      problem: "Generative AI applications in production face severe liabilities: prompt injections, toxic jailbreaks, PII leaks, and factual hallucinations.",
      solution: "Engineered an ultra-low-latency guardrail reverse proxy in Go and Rust. Utilizes deterministic regex token analyzers and small distilled SLMs to intercept threats in under 4ms.",
      metrics: [
        { label: "Inspection Overhead", value: "3.4ms", rating: "Sub-5ms" },
        { label: "Jailbreaks Blocked", value: "99.8%", rating: "Deterministic" },
        { label: "PII Masking Accuracy", value: "100.0%", rating: "Zero Leak" },
        { label: "False Positive Rate", value: "<0.04%", rating: "Calibrated" },
      ],
      stack: ["Go (Golang)", "Rust", "DistilBERT", "Regex Engines", "Redis", "Docker"],
      architecture: [
        "Inbound User Prompt ➔ Deterministic Regex Aho-Corasick Injection Scanner",
        "Lightweight Distilled Embedding Classifier (<2ms) ➔ Threat Scoring",
        "Model Response Ingress ➔ Real-time PII Redaction & Hallucination Cross-Check"
      ],
      liveDemoUrl: "https://example.com/aegisguard-demo",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/aegisguard-ai",
      slides: [
        {
          title: "TTY01: LIVE THREAT INTERCEPTION STREAM",
          content: `
+----------------------------------------------------------------+
| [AEGISGUARD PROXY v3.1]  STATUS: ARMED & DEFENDING             |
| REPO: github.com/syedmuhammadayyanibrar/aegisguard-ai          |
| TOTAL PROMPTS SCANNED 24H: 1,840,290 | THREATS DEFLECTED: 341  |
+----------------------------------------------------------------+
| 07:44:11.018  REQ#1841  JAILBREAK ATTEMPT (DAN)  BLOCKED [1.8ms]|
| 07:44:11.022  REQ#1842  PII (SSN/EMAIL) DETECTED REDACTED [2.1ms]|
| 07:44:11.028  REQ#1843  BENIGN SYSTEM QUERY      PASSED  [0.8ms]|
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: MULTI-LAYER SAFETY DEFENSE MATRIX",
          content: `
[USER PROMPT INPUT]
         │
         ▼
[LAYER 1: AHO-CORASICK DETERMINISTIC TOKEN FILTER (<0.4ms)]
         │
         ▼
[LAYER 2: DISTILLED EMBEDDING CLASSIFIER (<1.8ms)]
         │
         ├─▶ [THREAT DETECTED ➔ DROP & RETURN SYNTHETIC SAFE WARNING]
         │
         ▼ (PASSED)
[UPSTREAM LLM EXECUTION ENGINE]
         │
         ▼
[LAYER 3: PII REDACTION & FACTUAL CONSISTENCY MERKLE PROOF]`
        },
        {
          title: "PERF03: LATENCY BUDGET BENCHMARK",
          content: `
+----------------------------------------------------------------+
| ADDED P99 PROXY LATENCY: 3.4ms                                 |
| BENCHMARKED UNDER 25,000 CONCURRENT CLIENT CONNECTIONS         |
| ZERO EXTERNAL API DEPENDENCIES (FULLY AIR-GAPPED READY)        |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 6. Project Building 5: VoiceSynapse (Sub-150ms Real-Time Voice Agent)
  {
    id: "voicesynapse",
    type: "project",
    projectNumber: "05",
    x: 4180,
    width: 340,
    height: 250,
    label: "05: VOICESYNAPSE",
    marqueeName: "VOICESYNAPSE // SPEECH AGENT",
    category: "Featured Project 5",
    interactionPrompt: "[E] INSPECT VOICESYNAPSE",
    badge: "VOICE AI",
    signColor: "#00eeff",
    project: {
      id: "voicesynapse",
      name: "VoiceSynapse Agent",
      subtitle: "Sub-150ms Full-Duplex Voice-to-Voice Streaming Agent",
      tagline: "Ultra-low-latency real-time conversational agent with adaptive turn-taking and WebRTC.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/voicesynapse",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/voicesynapse.git",
      problem: "Traditional voice bots chain STT ➔ LLM ➔ TTS across separate servers, generating a frustrating 1.5 - 2.5 second awkward silence during live conversations.",
      solution: "Architected a full-duplex WebRTC streaming agent pipeline. Uses continuous streaming VAD (Voice Activity Detection), speculative LLM token generation, and neural streaming audio synthesis in sub-150ms.",
      metrics: [
        { label: "Mouth-to-Ear Latency", value: "142ms", rating: "Human-Speed" },
        { label: "Turn-Taking Accuracy", value: "98.7%", rating: "Adaptive VAD" },
        { label: "Audio Mesh Quality", value: "48 kHz", rating: "HD Opus" },
        { label: "Concurrent Calls", value: "1,200", rating: "Per Node" },
      ],
      stack: ["Python", "WebRTC", "Rust", "Whisper Streaming", "Kokoro TTS", "WebSockets"],
      architecture: [
        "Client Audio Chunk (20ms Opus via WebRTC) ➔ Streaming Silero VAD",
        "Whisper Streaming Chunk ASR ➔ Speculative Sentence Ingestion",
        "Streaming Neural LLM ➔ Kokoro TTS Byte Pipeline ➔ WebRTC Return"
      ],
      liveDemoUrl: "https://example.com/voicesynapse-demo",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/voicesynapse",
      slides: [
        {
          title: "TTY01: FULL-DUPLEX AUDIO STREAM TELEMETRY",
          content: `
+----------------------------------------------------------------+
| [VOICESYNAPSE ENGINE v2.1]  DUPLEX STATUS: STREAMING           |
| REPO: github.com/syedmuhammadayyanibrar/voicesynapse           |
| SAMPLE RATE: 48,000 Hz OPUS  END-TO-END LATENCY: 142ms         |
+----------------------------------------------------------------+
| USER SPEECH DETECTED ➔ VAD CONFIRMATION: 18ms                  |
| FIRST TOKEN STREAMED ➔ TTS AUDIO CHUNK GENERATED: 74ms         |
| TOTAL DURATION OF SILENCE: 142ms (HUMAN PARVERSATIONAL NORM)   |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: PIPELINED AUDIO STREAMING ARCHITECTURE",
          content: `
[CLIENT MICROPHONE]
       │ (WebRTC 20ms Frame)
       ▼
[STREAMING SILERO VAD & WHISPER CHUNK BUFFER]
       │ (Zero-Wait Sentence Boundary Detection)
       ▼
[SPECULATIVE STREAMING LLM RUNNER]
       │ (Immediate Token Stream)
       ▼
[NEURAL STREAMING TTS SYNTHESIS ENGINE]
       │ (WebRTC Audio Return)
       ▼
[CLIENT EARPHONE / SPEAKER]`
        },
        {
          title: "PERF03: INTERRUPT & BARGE-IN PERFORMANCE",
          content: `
+----------------------------------------------------------------+
| USER BARGE-IN INTERRUPT CUTOFF: <35ms                          |
| PACKET JITTER BUFFER BUFFERING DELAY: <8ms                     |
| NETWORK EGRESS SAVED VIA ADAPTIVE OPUS CODEC: 42%              |
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 7. Project Building 6: PixelDiffusion (Generative AI & Neural Retro Graphics)
  {
    id: "pixeldiffusion",
    type: "project",
    projectNumber: "06",
    x: 4860,
    width: 350,
    height: 260,
    label: "06: PIXELDIFFUSION",
    marqueeName: "PIXELDIFFUSION // GENERATIVE AI",
    category: "Featured Project 6",
    interactionPrompt: "[E] INSPECT PIXELDIFFUSION",
    badge: "GEN AI",
    signColor: "#9900ff",
    project: {
      id: "pixeldiffusion",
      name: "PixelDiffusion Engine",
      subtitle: "Real-Time 16-Bit Style Diffusion & Neural Game Asset Generator",
      tagline: "Generating palette-consistent 16-bit sprites and animated tilemaps in real time.",
      repoUrl: "https://github.com/syedmuhammadayyanibrar/pixeldiffusion",
      cloneCmd: "git clone https://github.com/syedmuhammadayyanibrar/pixeldiffusion.git",
      problem: "Standard diffusion models produce blurry, non-pixel-aligned images with millions of uncontrolled colors that break retro game engine constraints.",
      solution: "Trained a specialized latent diffusion model fine-tuned with custom LoRA adapters and a hard color-palette quantization loss function for authentic 16-bit pixel art at 120 FPS.",
      metrics: [
        { label: "Generation Latency", value: "85ms", rating: "SD-Turbo Latent" },
        { label: "Palette Adherence", value: "100%", rating: "Exact 16-Color" },
        { label: "Tile Seamlessness", value: "Zero Seam", rating: "Tiled Conv2d" },
        { label: "GitHub Stars", value: "2,400 ★", rating: "Open Source" },
      ],
      stack: ["Python", "PyTorch", "Diffusers", "LoRA", "WebGPU", "CUDA"],
      architecture: [
        "Prompt Embedding (CLIP) ➔ SD-Turbo Latent Step (<4 steps)",
        "Custom Palettization Quantizer Layer (Aseprite Compatible)",
        "Automated 8-Frame Sprite Sheet Slicing & Export"
      ],
      liveDemoUrl: "https://example.com/pixeldiffusion-demo",
      githubUrl: "https://github.com/syedmuhammadayyanibrar/pixeldiffusion",
      slides: [
        {
          title: "TTY01: NEURAL GENERATION STREAM",
          content: `
+----------------------------------------------------------------+
| [PIXELDIFFUSION GENERATOR v1.4]  STEPS: 4 (SD-TURBO)           |
| REPO: github.com/syedmuhammadayyanibrar/pixeldiffusion         |
| GENERATION TIME: 85ms  TARGET PALETTE: CYBERPUNK 16-COLOR      |
+----------------------------------------------------------------+
| PROMPT: "cyberpunk street vendor in winter dusk, 16-bit pixel" |
| STATUS: 8-FRAME WALK CYCLE GENERATED  SEAMLESS TILES: VERIFIED |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: PALETTE CONSTRAINED CONVOLUTION",
          content: `
[TEXT PROMPT] ──▶ [CLIP ENCODER]
                        │
                        ▼
      [LATENT DIFFUSION BACKBONE (4 INFERENCE STEPS)]
                        │
                        ▼
      [HARD COLOR QUANTIZATION LOSS & PALETTE CLAMP]
                        │
                        ▼
       [PIXEL-PERFECT SPRITESHEET & TILE EXPORT]`
        },
        {
          title: "PERF03: RESOLUTION & RUNTIME STATS",
          content: `
+----------------------------------------------------------------+
| PEAK VRAM USAGE: 1.8 GB (RUNS COMFORTABLY ON CONSUMER GPUS)    |
| GENERATION THROUGHPUT: 12 COMPLETE SPRITES / SECOND            |
| EXPORT FORMATS: ASEPRITE (.ase), PNG SPRITESHEET, JSON METADATA|
+----------------------------------------------------------------+`
        }
      ]
    }
  },

  // 8. Finale Pavilion: "Let's build together" (Matching Attached Image)
  {
    id: "connect_pavilion",
    type: "connect_pavilion",
    x: 5460,
    width: 380,
    height: 270,
    label: "FINALE: LET'S BUILD TOGETHER",
    buildingNumber: "07",
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
      socials: [
        { name: "GitHub", url: "https://github.com/syedmuhammadayyanibrar" },
        { name: "LinkedIn", url: "https://linkedin.com/in/syedayyan" },
        { name: "Email", url: "mailto:syedmuhammadayyanibrar@gmail.com", label: "syedmuhammadayyanibrar@gmail.com" },
      ]
    }
  }
];

export const STREET_TOTAL_WIDTH = 6000;
