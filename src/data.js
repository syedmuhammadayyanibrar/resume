// src/data.js - Portfolio & Street Landmark Data for Syed Ayyan

export const DEVELOPER_PROFILE = {
  name: "Syed Ayyan",
  title: "Senior Full-Stack & Systems Engineer",
  tagline: "Building resilient distributed architectures with 16-bit retro craftsmanship.",
  location: "Neo-Tokyo Ave, Sector 7 (Remote / Worldwide)",
  status: "🟢 OPEN TO OPPORTUNITIES & ARCHITECTURAL CONSULTING",
  stats: {
    expYears: "6+",
    projectsShipped: "24+",
    linesOfCode: "450k+",
    coffeeConsumed: "1,840 ☕",
    uptime: "99.99%",
  },
  skills: {
    languages: ["TypeScript", "JavaScript", "Rust", "Go", "Python", "SQL", "C++"],
    frontend: ["React", "Vue", "Next.js", "WebGPU/WebGL", "TailwindCSS", "Canvas 2D", "Vite"],
    backend: ["Node.js", "Axum", "Express", "gRPC", "GraphQL", "WebSockets", "Kafka"],
    dataDevOps: ["PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS / GCP", "CI/CD", "Prometheus"],
  },
  socials: [
    { label: "GitHub", url: "https://github.com", icon: "github", handle: "@syedayyan" },
    { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", handle: "/in/syedayyan" },
    { label: "Twitter / X", url: "https://x.com", icon: "twitter", handle: "@syed_ayyan" },
    { label: "Email", url: "mailto:ayyan@resumepixel.dev", icon: "email", handle: "ayyan@resumepixel.dev" },
  ]
};

export const LANDMARKS = [
  {
    id: "kiosk",
    type: "kiosk",
    x: 480,
    width: 240,
    height: 190,
    label: "DAILY BYTES KIOSK",
    category: "About Me & Philosophy",
    interactionPrompt: "[E] READ NEWSPAPER",
    badge: "NEWS",
    signColor: "#ff7700",
    summary: "Newspaper kiosk featuring Syed Ayyan's background, engineering ethos, and core tech radar.",
    newspaperData: {
      issueNo: "VOL. XLIV - ISSUE #2026",
      date: "OCTOBER 2026 EDITION",
      headline: "SENIOR ARCHITECT HARNESSES DISTRIBUTED RESILIENCE & PIXEL CRAFTSMANSHIP",
      leadArticle: `Syed Ayyan is a Senior Full-Stack Engineer and Systems Architect dedicated to crafting ultra-reliable backends and silky-smooth interactive web experiences. With 6+ years at the bleeding edge of web performance, Syed treats software engineering like modern city planning: structural integrity deep under the pavement, and warm, luminous delight on the surface.`,
      philosophy: [
        "⚡ Latency is Respect: Treat every millisecond of user wait-time as a bug.",
        "🛡️ Zero-Trust Resilience: Build fault-tolerant, self-healing backends with observable telemetry.",
        "🎨 Craft Meets Function: High performance should never feel sterile—great engineering is an art form.",
        "🧩 Simplicity Over Complexity: The fastest code is code that was carefully architected not to exist."
      ],
      currentFocus: [
        "Autonomous Multi-Agent AI Orchestration & Vector Routers",
        "WebGPU Hardware-Accelerated High-Density Visualizations",
        "Zero-Egress P2P Data Meshes & Distributed CRDT Sync"
      ]
    }
  },
  {
    id: "metro",
    type: "metro",
    x: 1080,
    width: 320,
    height: 230,
    label: "NEO-CENTRAL RAIL",
    category: "Career & Experience",
    interactionPrompt: "[E] CHECK SCHEDULE",
    badge: "CAREER",
    signColor: "#00eeff",
    summary: "Neo-Central Rail Station showing Syed's chronological departure board and career history.",
    scheduleData: [
      {
        trainNo: "NC-801",
        platform: "PL-01",
        time: "2024 - PRESENT",
        role: "Lead Systems Architect",
        company: "NovaCloud Distributed Labs",
        status: "ON SCHEDULE",
        description: "Leading the core infrastructure team building distributed streaming microservices, lowering p99 system latency by 42% across 20M daily active requests.",
        highlights: [
          "Engineered multi-region active-active distributed vector sync gateway",
          "Mentored team of 11 engineers and standardized Rust & TypeScript microservices",
          "Automated zero-downtime canary deployment matrix with automated rollback"
        ],
        stack: ["Rust", "TypeScript", "Kubernetes", "Kafka", "AWS"]
      },
      {
        trainNo: "QP-412",
        platform: "PL-02",
        time: "2022 - 2024",
        role: "Senior Full-Stack Engineer",
        company: "QuantumPulse Analytics",
        status: "ARRIVED",
        description: "Spearheaded the real-time financial telemetry dashboard processing 150k live events/sec with WebGL spatial heatmaps.",
        highlights: [
          "Reduced client bundle size by 68% via modular code splitting and tree shaking",
          "Architected custom WebSockets multiplexer supporting 50k concurrent sockets per node",
          "Engineered sub-5ms indexed state cache using WebAssembly & SharedArrayBuffer"
        ],
        stack: ["React", "TypeScript", "Go", "Redis", "WebGL", "Docker"]
      },
      {
        trainNo: "RB-109",
        platform: "PL-03",
        time: "2020 - 2022",
        role: "Software Engineer",
        company: "RetroByte Interactive",
        status: "COMPLETED",
        description: "Engineered scalable web client applications, multiplayer state synchronization, and RESTful APIs serving 2M+ monthly players.",
        highlights: [
          "Developed resilient offline-first PWA sync mechanism with IndexedDB",
          "Achieved 100/100 Google Lighthouse across all corporate web properties"
        ],
        stack: ["JavaScript", "Node.js", "PostgreSQL", "WebSockets", "CSS3"]
      },
      {
        trainNo: "EDU-01",
        platform: "ACAD-4",
        time: "CLASS OF 2020",
        role: "B.S. in Computer Science",
        company: "State University of Technology",
        status: "GRADUATED",
        description: "Summa Cum Laude with honors focus on Distributed Operating Systems and Computer Graphics Algorithms.",
        highlights: [
          "Published research on P2P Distributed Hash Tables and Consensus Mechanisms",
          "Led University ACM Chapter & organized regional 48-hour hackathon"
        ],
        stack: ["Distributed Systems", "Algorithms", "C++", "Computer Networks"]
      }
    ]
  },
  {
    id: "datacenter",
    type: "datacenter",
    x: 1780,
    width: 340,
    height: 250,
    label: "NEURAL DATA LABS",
    category: "Featured Project 1",
    interactionPrompt: "[E] ACCESS SERVER",
    badge: "AI SYS",
    signColor: "#00ff88",
    project: {
      id: "neurostream",
      name: "NeuroStream Engine",
      subtitle: "High-Throughput Multi-Agent LLM Orchestration Gateway",
      tagline: "Sub-8ms token streaming with speculative caching and autonomous fallback hedging.",
      problem: "Enterprise multi-agent workflows suffer from cumulative LLM token latency, frequent upstream provider rate-limits, and uncontrolled API cost explosions.",
      solution: "Engineered an asynchronous high-performance routing reverse proxy in Rust. Features speculative semantic prompt caching, automated model fallback cascades, and real-time token budgeting with zero stall time.",
      metrics: [
        { label: "Time-to-First-Token", value: "6.8ms", rating: "99th %ile" },
        { label: "Daily Inferences", value: "350k+", rating: "Active" },
        { label: "Upstream Cost Saved", value: "34%", rating: "Optimized" },
        { label: "Service Uptime", value: "99.99%", rating: "Grade A" },
      ],
      stack: ["Rust", "Axum", "TypeScript", "Vector DB", "Redis", "Docker", "Prometheus"],
      architecture: [
        "Client Request ➔ TLS Termination ➔ Speculative Semantic Cache (Cosine Sim > 0.96)",
        "Cache Miss ➔ Multi-Provider Router (OpenAI / Anthropic / Local vLLM)",
        "Zero-Copy Streaming Byte Buffers ➔ SSE Chunk Compression ➔ Client Delivery"
      ],
      liveDemoUrl: "https://example.com/neurostream-demo",
      githubUrl: "https://github.com/syedayyan/neurostream",
      slides: [
        {
          title: "TTY01: SPECULATIVE TOKEN STREAM MONITOR",
          content: `
+----------------------------------------------------------------+
| [NEUROSTREAM ENGINE v2.4]  STATUS: ONLINE [99.99%]             |
| ACTIVE CHANNELS: 1,420      TOTAL INFERENCES: 350,192          |
| STREAM SPEED: 24.8 MB/s     AVG TTFT: 6.8ms (P99: 11.2ms)      |
+----------------------------------------------------------------+
| [ROUTER POOL]                                                  |
| ├─ [LLM-01: CLAUDE-3.5]  LOAD: 48%  TTFT: 14ms  TOK/S: 98.4    |
| ├─ [LLM-02: GPT-4o]      LOAD: 39%  TTFT: 18ms  TOK/S: 84.1    |
| └─ [LLM-03: LOCAL-QWEN]  LOAD: 12%  TTFT:  4ms  TOK/S: 142.0   |
| [CACHE MESH] COSINE THRESHOLD: 0.96 | HIT RATIO: 41.2%         |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: SUBSYSTEM TOPOLOGY & VECTOR MESH",
          content: `
[CLIENT REQUEST (SSE)] ──▶ [RUST AXUM PROXY]
                                │
               ┌────────────────┴────────────────┐
               ▼                                 ▼
    [SPECULATIVE SEMANTIC CACHE]       [MODEL CASCADE ROUTER]
    - Cosine Vector Sim (Qdrant)       - Dynamic Weight Hedging
    - Zero-Copy Ring Buffers           - Auto Upstream Fallbacks
               │                                 │
               └────────────────┬────────────────┘
                                ▼
                   [FAST CHUNK SSE STREAM] ──▶ [CLIENT]`
        },
        {
          title: "PERF03: LATENCY JITTER & UPSTREAM COST PROFILE",
          content: `
+----------------------------------------------------------------+
| BENCHMARK: 10,000 CONCURRENT CONVERSATIONAL SESSIONS           |
| MEMORY RESIDENT: 18.4 MB (ZERO MEMORY LEAKS DETECTED)          |
| UPSTREAM API BUDGET SAVED: $14,290 / MONTH VIA SMART ROUTING   |
| CPU UTILIZATION: 14.2% ON 4 vCPU CONTAINER INSTANCE            |
| AUTOMATED FAILOVER SWAPS: 12 (ZERO DROPPED PACKETS)            |
+----------------------------------------------------------------+`
        }
      ]
    }
  },
  {
    id: "bank",
    type: "bank",
    x: 2460,
    width: 360,
    height: 260,
    label: "QUANTUM VAULT BANK",
    category: "Featured Project 2",
    interactionPrompt: "[E] INSPECT VAULT",
    badge: "FINTECH",
    signColor: "#ffd700",
    project: {
      id: "aegispay",
      name: "AegisPay Ledger",
      subtitle: "Ultra Low-Latency Event-Sourced Clearing & Fraud Engine",
      tagline: "Handling 120,000 TPS with atomic double-entry verification and sub-4ms fraud evaluation.",
      problem: "Legacy financial clearing systems run in overnight batches, creating vulnerability windows for fraud, liquidity crunches, and reconciliation overhead.",
      solution: "Constructed an event-sourced distributed transaction engine in Go with Apache Kafka. Every ledger entry is mathematically verified against an append-only cryptographic merkle tree, evaluating real-time anomaly risk in 3.8ms.",
      metrics: [
        { label: "Peak Throughput", value: "124,000 TPS", rating: "Stress-Tested" },
        { label: "P99 Decisioning", value: "3.8ms", rating: "Real-time" },
        { label: "Reconciliation Error", value: "0.000%", rating: "Zero Delta" },
        { label: "Fraud Intercepted", value: "$4.8M+", rating: "Saved" },
      ],
      stack: ["Go (Golang)", "Apache Kafka", "PostgreSQL", "Redis Cluster", "Kubernetes", "Grafana"],
      architecture: [
        "Inbound Payment Payload ➔ In-Memory Merkle Balance Verification",
        "Kafka Partition Sharding ➔ Anomaly Evaluation Pipeline (<4ms)",
        "Immutable Write to Append-Only Ledger & Immediate Bi-Directional Webhook"
      ],
      liveDemoUrl: "https://example.com/aegispay-demo",
      githubUrl: "https://github.com/syedayyan/aegispay",
      slides: [
        {
          title: "TTY01: REAL-TIME TRANSACTION STREAM",
          content: `
+----------------------------------------------------------------+
| [AEGISPAY TRANSACTION STREAM]  TPS: 121,490                    |
| LEDGER STATUS: SYNCED          MERKLE ROOT: 0x9F4A2201         |
| TOTAL PROCESSED 24H: $84,210,000 | ANOMALIES INTERCEPTED: 142  |
+----------------------------------------------------------------+
| 10:41:02.148  TX#8992019  $4,200.00  APPROVED   [LATENCY: 1.1ms]
| 10:41:02.152  TX#8992020    $194.20  APPROVED   [LATENCY: 0.9ms]
| 10:41:02.155  TX#8992021  $8,900.00  FLAGGED    [RISK: 98% IP]  
| 10:41:02.158  TX#8992022     $42.50  APPROVED   [LATENCY: 0.8ms]
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: EVENT-SOURCED KAFKA PIPELINE",
          content: `
[CLIENT PAYMENT INGRESS]
       │
       ▼ (mTLS TLS 1.3)
[GO TRANSACTION INGESTION GATEWAY]
       │
       ├─▶ [IN-MEMORY REDIS MERKLE TREE CACHE] (<0.4ms)
       │
       ▼
[KAFKA PARTITION PARTITIONING (SHARDED BY ACCOUNT HASH)]
       │
       ├─▶ [GO ANOMALY DETECTOR (<2.5ms)]
       └─▶ [IMMUTABLE POSTGRES EVENT-STORE]
       │
       ▼
[BI-DIRECTIONAL WEBHOOK & RECONCILIATION BUS]`
        },
        {
          title: "PERF03: FAULT-TOLERANCE & CHAOS SIMULATION",
          content: `
+----------------------------------------------------------------+
| CHAOS TESTING: 2 OF 5 CLUSTER NODES SEVERED UNDER LOAD         |
| RECONCILIATION RESULT: 0.00000% BALANCE DISCREPANCY            |
| LEADER RE-ELECTION LATENCY: 120ms (RAFT CONSENSUS)             |
| TRANSACTION LOSS: ZERO TRANSACTIONS DROPPED                    |
| MAXIMUM OBSERVED GC PAUSE: 0.22ms (GO 1.22 MEMORY ARENA)       |
+----------------------------------------------------------------+`
        }
      ]
    }
  },
  {
    id: "broadcast",
    type: "broadcast",
    x: 3120,
    width: 320,
    height: 270,
    label: "ECHOSPHERE BROADCAST",
    category: "Featured Project 3",
    interactionPrompt: "[E] TUNE FREQUENCY",
    badge: "P2P MESH",
    signColor: "#ff0077",
    project: {
      id: "echosphere",
      name: "EchoSphere Mesh",
      subtitle: "Decentralized P2P Collaborative Spatial Audio & Infinite Canvas",
      tagline: "Zero-server egress cost with WebRTC mesh audio and CRDT state synchronization.",
      problem: "Traditional team collaboration tools require costly server media relays, adding transatlantic latency and privacy concerns for sensitive whiteboard sessions.",
      solution: "Built a fully browser-native decentralized collaborative canvas with WebRTC data channels and Yjs CRDTs. Incorporates positional Web Audio API spatialization so voices match cursor locations in real 3D acoustic space.",
      metrics: [
        { label: "Server Egress Cost", value: "$0.00", rating: "P2P Native" },
        { label: "Audio Mesh Latency", value: "<14ms", rating: "Sub-Perceptual" },
        { label: "Active Canvas Nodes", value: "10,000+", rating: "Smooth 60 FPS" },
        { label: "State Conflict Rate", value: "0.0%", rating: "Yjs CRDT" },
      ],
      stack: ["TypeScript", "WebRTC", "Yjs (CRDTs)", "Web Audio API", "Canvas 2D", "TailwindCSS"],
      architecture: [
        "Peer Signaling via Minimal STUN/TURN Discovery",
        "Direct Full-Mesh P2P Data Channels for Vector Geometry",
        "Spatial Audio Nodes: 3D PannerNode tied to Screen Coordinates"
      ],
      liveDemoUrl: "https://example.com/echosphere-demo",
      githubUrl: "https://github.com/syedayyan/echosphere",
      slides: [
        {
          title: "TTY01: SPATIAL AUDIO RADAR & ACTIVE PEERS",
          content: `
+----------------------------------------------------------------+
| [ECHOSPHERE SPATIAL RADAR]  PEERS CONNECTED: 8                 |
| ACTIVE ROOM: #SYSTEMS-ARCHITECTURE  ROOM BITRATE: 1.2 Mbps     |
+----------------------------------------------------------------+
| [P1: AYAN (HOST)]  X:420 Y:310  [MIC: ACTIVE -3dB] PAN: CENTER |
| [P2: SARAH]        X:120 Y:840  [MIC: ACTIVE -8dB] PAN: -0.6 L |
| [P3: KENJI]        X:650 Y:290  [MIC: MUTED]       PAN: +0.7 R |
| CRDT STATE HASH: 0xEE71A9       FRAME LATENCY: 16.4ms (60 FPS) |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: ZERO-SERVER EGRESS TOPOLOGY",
          content: `
       [PEER A: CANVAS HOST]
          ▲              ▲
      Data│              │Data
       RTC│              │RTC
          ▼              ▼
[PEER B: ARCHITECT] ◀──▶ [PEER C: DESIGNER]
      (Direct RTC Mesh Connection)

* Web Audio PannerNode calculates HRTF 3D sound vectors
* State vector synchronizes via Conflict-Free Replicated Data Types (Yjs)`
        },
        {
          title: "PERF03: BANDWIDTH & AUDIO LATENCY REPORT",
          content: `
+----------------------------------------------------------------+
| DIRECT PEER-TO-PEER PING: 12.4ms (US-EAST TO US-WEST)          |
| SERVER EGRESS SAVINGS: 100% ELIMINATED MEDIA RELAY BANDWIDTH   |
| CANVAS DRAWING JITTER: <0.2ms INTERPOLATION SMOOTHING          |
| CRYPTOGRAPHIC CIPHER: AES-GCM 256-BIT ENCRYPTION END-TO-END    |
+----------------------------------------------------------------+`
        }
      ]
    }
  },
  {
    id: "arcade",
    type: "arcade",
    x: 3740,
    width: 330,
    height: 240,
    label: "8-BIT FORGE ARCADE",
    category: "Featured Project 4",
    interactionPrompt: "[E] INSERT COIN",
    badge: "GAME TECH",
    signColor: "#9900ff",
    project: {
      id: "retroforge",
      name: "RetroForge Engine",
      subtitle: "Featherlight WebGPU & Wasm 2D/3D Retro Rendering Pipeline",
      tagline: "Ultra-fast 28KB runtime with hardware sprite instancing and CRT shader emulation.",
      problem: "Heavyweight game engines like Unity and Unreal produce 30MB+ web builds that take dozens of seconds to load on mobile and drain device batteries.",
      solution: "Architected a custom WebGPU/WGSL retro rendering runtime compiled with C++ and WebAssembly. Bundles instant cold boot, sprite batching of 100,000 simultaneous sprites at 120 FPS, and modular procedural audio synthesis.",
      metrics: [
        { label: "Bundle Size", value: "28.4 KB", rating: "Gzipped" },
        { label: "Max Sprites @ 60fps", value: "100,000+", rating: "Instanced" },
        { label: "Load Time", value: "45ms", rating: "Instantaneous" },
        { label: "GitHub Stars", value: "1,240 ★", rating: "Open Source" },
      ],
      stack: ["WebGPU", "WGSL Shaders", "C++ / Emscripten", "WebAssembly", "Web Audio"],
      architecture: [
        "WGSL Instanced Vertex Buffer ➔ Compute Shader Physics Pass",
        "Tilemap Chunk Streaming with Texture Array Cache",
        "Post-Processing Pass: CRT Curvature, Scanlines & Phosphor Bloom"
      ],
      liveDemoUrl: "https://example.com/retroforge-demo",
      githubUrl: "https://github.com/syedayyan/retroforge",
      slides: [
        {
          title: "TTY01: WEBGPU INSTANCED SPRITE BENCHMARK",
          content: `
+----------------------------------------------------------------+
| [RETROFORGE RUNTIME BENCHMARK]                                 |
| GPU: WEBGPU INSTANCED PASS  ACTIVE PARTICLES: 104,200          |
| DRAW CALLS: 1               FRAME TIME: 5.1ms (120 Hz SMOOTH)  |
| MEMORY ALLOC: 14.2 MB       VRAM ALLOCATED: 4.8 MB             |
| POST-FX: WGSL CRT SCANLINES + BLOOM PASS (0.3ms GPU TIME)      |
+----------------------------------------------------------------+`
        },
        {
          title: "ARCH02: WGSL RENDER PASS GRAPH",
          content: `
[CPU SPRITE STATE POOL]
       │ (Direct TypedArray Copy)
       ▼
[STORAGE BUFFER / INSTANCE BUFFER] ──▶ [WGSL VERTEX SHADER]
                                               │
                                               ▼
                                      [WGSL FRAGMENT SHADER]
                                               │
                                               ▼
[OFFSCREEN COLOR TEXTURE] ───────▶ [POST-PROCESSING PASS]
                                    - CRT Barrel Curvature
                                    - Scanline Alpha Multiplier
                                    - Phosphor Green/Cyan Bloom`
        },
        {
          title: "PERF03: RUNTIME FOOTPRINT VS CONVENTIONAL ENGINES",
          content: `
+----------------------------------------------------------------+
| RETROFORGE ENGINE:  28.4 KB GZIPPED   (45ms BOOT TO FIRST FRAME)|
| UNITY WEBGL:        32.4 MB GZIPPED   (14,200ms COLD DOWNLOAD) |
| UNREAL HTML5:       68.1 MB GZIPPED   (28,400ms COLD DOWNLOAD) |
| BATTERY CONSUMPTION: 88% LOWER PEAK POWER USAGE ON MOBILE      |
+----------------------------------------------------------------+`
        }
      ]
    }
  },
  {
    id: "cat",
    type: "cat",
    x: 4180,
    width: 90,
    height: 80,
    label: "MOCHI THE STREET CAT",
    category: "Secret Easter Egg",
    interactionPrompt: "[E] PET THE CAT",
    badge: "MOCHI",
    signColor: "#ff99bb",
    summary: "A warm calico stray cat sitting on the snow-dusted wooden fence next to a steaming heating vent.",
    quote: "Meow! (Mochi purrs warmly in the winter dusk, blessing your terminal with 0 compiler errors!)"
  },
  {
    id: "phonebooth",
    type: "phonebooth",
    x: 4380,
    width: 180,
    height: 220,
    label: "RED TELEPHONE & POST",
    category: "Get in Touch",
    interactionPrompt: "[E] USE TELEPHONE",
    badge: "CONTACT",
    signColor: "#ff2244",
    summary: "Classic glowing red telephone booth and royal post box for direct transmission.",
    contactData: {
      email: "ayyan@resumepixel.dev",
      discord: "@syedayyan#0001",
      location: "Neo-Tokyo Ave & Worldwide",
      availability: "Available for Senior/Lead Full-Stack roles, Distributed Systems Architecture, & High-Impact Consulting.",
      channels: [
        { name: "Direct Message Terminal", action: "form", desc: "Send an instant message directly to Syed" },
        { name: "Copy Email Address", action: "copy_email", desc: "ayyan@resumepixel.dev" },
        { name: "GitHub Profile", action: "link", url: "https://github.com", desc: "View repositories & open source code" },
        { name: "LinkedIn Network", action: "link", url: "https://linkedin.com", desc: "Professional trajectory & recommendations" },
        { name: "Twitter / X", action: "link", url: "https://x.com", desc: "Tech commentary & design prototypes" },
      ]
    }
  }
];

export const STREET_TOTAL_WIDTH = 4800;
