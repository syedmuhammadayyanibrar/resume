// src/pixelArt.js - Procedural 16-bit Sprites, Crisp Marquees, NPCs & Real Project Buildings

export const PALETTES = {
  dusk: {
    name: "Snowy Dusk",
    skyTop: "#120a2a",
    skyMid: "#311847",
    skyBottom: "#873e5c",
    skyGaze: "#d66853",
    skyHaze: "rgba(214, 104, 83, 0.25)",
    farSkyline: "#180d2b",
    midSkyline: "#22133d",
    nearSkyline: "#2f1b4e",
    ambientLight: "rgba(255, 180, 120, 0.08)",
    lampColor: "rgba(255, 205, 120, 0.35)",
    lampGlow: "rgba(255, 220, 140, 0.85)",
    snowSidewalk: "#b0b8d0",
    snowSidewalkDrift: "#dbe3f5",
    curbColor: "#454b60",
    snowParticle: "rgba(240, 245, 255, 0.9)",
    steamColor: "rgba(210, 215, 235, 0.35)",
    puddleReflectAlpha: 0.45,
  },
  cyberpunk: {
    name: "Midnight Cyberpunk",
    skyTop: "#050512",
    skyMid: "#0d0b28",
    skyBottom: "#1f0d38",
    skyGaze: "#3a094a",
    skyHaze: "rgba(255, 0, 128, 0.22)",
    farSkyline: "#09081a",
    midSkyline: "#110e2e",
    nearSkyline: "#1a123f",
    ambientLight: "rgba(0, 240, 255, 0.09)",
    lampColor: "rgba(0, 255, 230, 0.32)",
    lampGlow: "rgba(0, 255, 240, 0.9)",
    snowSidewalk: "#69728e",
    snowSidewalkDrift: "#9ba8c8",
    curbColor: "#2a2d3d",
    snowParticle: "rgba(200, 240, 255, 0.85)",
    steamColor: "rgba(180, 140, 220, 0.4)",
    puddleReflectAlpha: 0.65,
  },
  fog: {
    name: "Morning Fog",
    skyTop: "#1c2c3e",
    skyMid: "#334d5c",
    skyBottom: "#5f797b",
    skyGaze: "#c9b79c",
    skyHaze: "rgba(201, 183, 156, 0.35)",
    farSkyline: "#2a3b47",
    midSkyline: "#3b4f5d",
    nearSkyline: "#4b616e",
    ambientLight: "rgba(255, 240, 200, 0.12)",
    lampColor: "rgba(255, 230, 160, 0.25)",
    lampGlow: "rgba(255, 240, 180, 0.75)",
    snowSidewalk: "#cfd6db",
    snowSidewalkDrift: "#eff4f7",
    curbColor: "#626b70",
    snowParticle: "rgba(250, 250, 250, 0.75)",
    steamColor: "rgba(230, 235, 240, 0.5)",
    puddleReflectAlpha: 0.3,
  }
};

/**
 * High-Contrast, Crystal-Clear Marquee Name Sign
 * Fixes legibility: bold lettering, dark high-contrast backing plate, neon borders.
 */
export function drawBuildingMarquee(ctx, x, y, width, number, name, subtitle, neonColor, time) {
  const h = 50;
  const marqueeY = y - h - 14;

  ctx.save();
  // Support struts
  ctx.fillStyle = "#1e2230";
  ctx.fillRect(x + 25, marqueeY + h, 6, 14);
  ctx.fillRect(x + width - 31, marqueeY + h, 6, 14);

  // Dark backing plate with drop shadow
  ctx.fillStyle = "#090d15";
  ctx.fillRect(x + 10, marqueeY, width - 20, h);

  // Vibrant Neon Border with Glow
  const flicker = Math.sin(time * 0.01 + x) > -0.95 ? 1 : 0.6;
  ctx.strokeStyle = neonColor;
  ctx.lineWidth = 3;
  ctx.shadowColor = neonColor;
  ctx.shadowBlur = 14 * flicker;
  ctx.strokeRect(x + 10, marqueeY, width - 20, h);

  // Marquee corner indicator dots
  ctx.fillStyle = neonColor;
  ctx.fillRect(x + 14, marqueeY + 4, 4, 4);
  ctx.fillRect(x + width - 18, marqueeY + 4, 4, 4);
  ctx.fillRect(x + 14, marqueeY + h - 8, 4, 4);
  ctx.fillRect(x + width - 18, marqueeY + h - 8, 4, 4);

  // Row 1: Building Number Badge
  ctx.fillStyle = neonColor;
  ctx.font = "bold 9px 'Press Start 2P', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`PROJECT ${number}`, x + 24, marqueeY + 18);

  // Row 2: Big Bold Readable Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px 'Silkscreen', 'Press Start 2P', sans-serif";
  ctx.fillText(name.toUpperCase(), x + 24, marqueeY + 35);

  // Row 3: Subtitle
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "9px 'Silkscreen', monospace";
  ctx.textAlign = "right";
  ctx.fillText(subtitle.toUpperCase(), x + width - 24, marqueeY + 28);

  // Snow on top of marquee
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x + 8, marqueeY - 4, width - 16, 5);

  ctx.restore();
}

/**
 * 16-Bit Player Character Renderer (Ayyan Ibrar)
 */
export function drawCharacter(ctx, x, y, state) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(state.facing, 1);

  const frame = state.isMoving && state.isGrounded ? Math.floor(state.walkFrame) % 8 : 0;
  const bob = state.isGrounded ? (state.isMoving ? (frame % 2 === 1 ? -1 : 0) : Math.round(state.breatheOffset)) : 0;
  const jumpTuck = !state.isGrounded ? -2 : 0;

  const cHair = "#111116";
  const cSkin = "#dfa98b";
  const cSkinShadow = "#be8468";
  const cCoat = "#1c2333";
  const cCoatDark = "#121724";
  const cCoatHighlight = "#2c3850";
  const cScarf = "#00e6a8";
  const cScarfDark = "#009970";
  const cPants = "#181d26";
  const cBoots = "#423023";
  const cBootTread = "#241a13";

  const legOffsets = [
    { leftX: -3, leftY: 0, rightX: 3, rightY: 0 },
    { leftX: -5, leftY: -2, rightX: 4, rightY: 0 },
    { leftX: -6, leftY: 0, rightX: 5, rightY: 0 },
    { leftX: -4, leftY: 0, rightX: 3, rightY: -1 },
    { leftX: 3, leftY: 0, rightX: -3, rightY: 0 },
    { leftX: 4, leftY: 0, rightX: -5, rightY: -2 },
    { leftX: 5, leftY: 0, rightX: -6, rightY: 0 },
    { leftX: 3, leftY: -1, rightX: -4, rightY: 0 },
  ];

  const leg = state.isGrounded ? legOffsets[frame] : { leftX: -2, leftY: jumpTuck, rightX: 2, rightY: jumpTuck };

  // Shadow underneath
  ctx.fillStyle = "rgba(10, 12, 20, 0.45)";
  const shadowWidth = state.isGrounded ? 18 : 12;
  ctx.beginPath();
  ctx.ellipse(0, 0, shadowWidth / 2, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Back Leg & Boot
  ctx.fillStyle = cPants;
  ctx.fillRect(leg.rightX - 2, -14 + leg.rightY, 4, 10);
  ctx.fillStyle = cBoots;
  ctx.fillRect(leg.rightX - 3, -4 + leg.rightY, 6, 4);
  ctx.fillStyle = cBootTread;
  ctx.fillRect(leg.rightX - 3, -1 + leg.rightY, 6, 1);

  // Coat Body
  ctx.fillStyle = cCoatDark;
  ctx.fillRect(-6, -26 + bob, 11, 14);
  ctx.fillStyle = cCoat;
  ctx.fillRect(-5, -27 + bob, 10, 13);
  ctx.fillStyle = cCoatHighlight;
  ctx.fillRect(-4, -26 + bob, 2, 10);

  // Front Leg & Boot
  ctx.fillStyle = cPants;
  ctx.fillRect(leg.leftX - 2, -14 + leg.leftY, 4, 10);
  ctx.fillStyle = cBoots;
  ctx.fillRect(leg.leftX - 3, -4 + leg.leftY, 6, 4);
  ctx.fillStyle = cBootTread;
  ctx.fillRect(leg.leftX - 3, -1 + leg.leftY, 6, 1);

  // Head & Face
  ctx.fillStyle = cSkinShadow;
  ctx.fillRect(-2, -30 + bob, 4, 3);
  ctx.fillStyle = cSkin;
  ctx.fillRect(-4, -38 + bob, 8, 9);
  ctx.fillStyle = cSkinShadow;
  ctx.fillRect(3, -34 + bob, 2, 2);
  ctx.fillStyle = "#111";
  ctx.fillRect(1, -35 + bob, 2, 2);

  // Hair & Beanie
  ctx.fillStyle = cHair;
  ctx.fillRect(-5, -42 + bob, 10, 5);
  ctx.fillRect(-6, -39 + bob, 3, 5);
  ctx.fillRect(-2, -43 + bob, 6, 2);
  ctx.fillStyle = "#2a3242";
  ctx.fillRect(-5, -39 + bob, 10, 2);

  // Scarf with Flutter
  ctx.fillStyle = cScarf;
  ctx.fillRect(-5, -31 + bob, 10, 4);
  ctx.fillStyle = cScarfDark;
  ctx.fillRect(-4, -28 + bob, 8, 2);

  const windTail = Math.sin(Date.now() * 0.008) * 3;
  const runTail = state.isMoving ? -4 : 0;
  ctx.fillStyle = cScarf;
  ctx.fillRect(-8 + runTail, -29 + bob + windTail, 4, 8);
  ctx.fillRect(-11 + runTail, -26 + bob + windTail * 1.5, 4, 6);
  ctx.fillStyle = cScarfDark;
  ctx.fillRect(-12 + runTail, -21 + bob + windTail * 1.8, 3, 2);

  // Front Arm
  const armSwing = state.isGrounded && state.isMoving ? Math.sin(state.walkFrame * Math.PI / 4) * 4 : 0;
  ctx.fillStyle = cCoat;
  ctx.fillRect(-1 + armSwing, -26 + bob, 4, 10);
  ctx.fillStyle = cSkin;
  ctx.fillRect(0 + armSwing, -16 + bob, 3, 3);

  ctx.restore();
}

/**
 * Animated Pedestrian / Visitor NPC Renderer
 */
export function drawNPC(ctx, npc, groundY, time) {
  ctx.save();
  ctx.translate(Math.round(npc.x), groundY);
  ctx.scale(npc.facing, 1);

  const frame = Math.floor(npc.walkFrame) % 6;
  const bob = frame % 2 === 1 ? -1 : 0;

  const legX1 = frame === 0 ? -3 : (frame === 1 ? -5 : (frame === 2 ? -2 : 3));
  const legX2 = -legX1;

  ctx.fillStyle = "rgba(10, 12, 20, 0.4)";
  ctx.beginPath();
  ctx.ellipse(0, 0, 8, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = npc.cBottom;
  ctx.fillRect(legX1 - 2, -12, 3, 9);
  ctx.fillRect(legX2 - 2, -12, 3, 9);
  ctx.fillStyle = "#221c17";
  ctx.fillRect(legX1 - 3, -3, 5, 3);
  ctx.fillRect(legX2 - 3, -3, 5, 3);

  ctx.fillStyle = npc.cTop;
  ctx.fillRect(-4, -23 + bob, 9, 12);

  if (npc.prop === "backpack") {
    ctx.fillStyle = "#e07a38";
    ctx.fillRect(-7, -22 + bob, 4, 9);
  } else if (npc.prop === "coffee") {
    ctx.fillStyle = "#fff";
    ctx.fillRect(4, -18 + bob, 3, 4);
    ctx.fillStyle = "#8b4513";
    ctx.fillRect(4, -19 + bob, 3, 1);
  } else if (npc.prop === "camera") {
    ctx.fillStyle = "#333";
    ctx.fillRect(3, -20 + bob, 5, 4);
    if (Math.floor(time * 0.003 + npc.x) % 15 === 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.arc(8, -18 + bob, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.fillStyle = "#e8b898";
  ctx.fillRect(-3, -32 + bob, 7, 9);
  ctx.fillStyle = npc.cHair;
  ctx.fillRect(-4, -36 + bob, 9, 5);
  ctx.fillRect(-4, -33 + bob, 3, 4);

  if (npc.prop === "headphones") {
    ctx.fillStyle = "#00ffcc";
    ctx.fillRect(-5, -34 + bob, 2, 4);
    ctx.fillRect(3, -34 + bob, 2, 4);
    ctx.fillRect(-4, -36 + bob, 8, 2);
  }

  ctx.restore();

  // Speech bubble if player is nearby
  if (npc.bubbleText && npc.isSpeaking) {
    ctx.save();
    ctx.font = "9px 'Silkscreen', monospace";
    const textW = ctx.measureText(npc.bubbleText).width;
    const bx = npc.x - textW / 2 - 10;
    const by = groundY - 52;

    ctx.fillStyle = "rgba(10, 15, 25, 0.94)";
    ctx.fillRect(bx, by, textW + 20, 20);
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, by, textW + 20, 20);

    ctx.fillStyle = "#00ffcc";
    ctx.beginPath();
    ctx.moveTo(npc.x - 4, by + 20);
    ctx.lineTo(npc.x + 4, by + 20);
    ctx.lineTo(npc.x, by + 25);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.fillText(npc.bubbleText, bx + 10, by + 14);
    ctx.restore();
  }
}

/**
 * 3-Panel Street Board (At Very Start: GitHub, Gmail, LinkedIn)
 */
export function drawStartBoard(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Framework & Scaffolding Posts
  ctx.fillStyle = "#1e2230";
  ctx.fillRect(x + 15, y, 10, h);
  ctx.fillRect(x + w - 25, y, 10, h);

  // Main Dark Backboard
  ctx.fillStyle = "#0c101a";
  ctx.fillRect(x + 5, y + 25, w - 10, h - 25);
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 2.5;
  ctx.shadowColor = "#00ffcc";
  ctx.shadowBlur = 10;
  ctx.strokeRect(x + 5, y + 25, w - 10, h - 25);

  // Overhead Spotlight Lamps
  for (let s = 0; s < 3; s++) {
    const sx = x + 35 + s * 95;
    ctx.fillStyle = "#334155";
    ctx.fillRect(sx - 8, y + 10, 16, 8);
    ctx.fillStyle = "#ffdd88";
    ctx.fillRect(sx - 6, y + 18, 12, 4);

    const cone = ctx.createLinearGradient(sx, y + 22, sx, y + 80);
    cone.addColorStop(0, "rgba(255, 220, 130, 0.35)");
    cone.addColorStop(1, "rgba(255, 220, 130, 0)");
    ctx.fillStyle = cone;
    ctx.beginPath();
    ctx.moveTo(sx - 4, y + 22);
    ctx.lineTo(sx - 35, y + 90);
    ctx.lineTo(sx + 35, y + 90);
    ctx.lineTo(sx + 4, y + 22);
    ctx.closePath();
    ctx.fill();
  }

  // Header Title
  ctx.fillStyle = "#00ffcc";
  ctx.font = "bold 9px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("DEV DIRECTORY & SOCIALS", x + w / 2, y + 42);

  // Three Distinct Vertical Panels
  const panelW = 82;
  const panelH = 100;
  const panels = [
    { title: "GITHUB", icon: "🐙", desc: "REPOS", color: "#ffffff" },
    { title: "GMAIL", icon: "✉️", desc: "CONTACT", color: "#ff4444" },
    { title: "LINKEDIN", icon: "💼", desc: "PROFILE", color: "#0088ff" }
  ];

  panels.forEach((p, idx) => {
    const px = x + 16 + idx * 88;
    const py = y + 54;

    ctx.fillStyle = "#141c2b";
    ctx.fillRect(px, py, panelW, panelH);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(px, py, panelW, panelH);

    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(p.icon, px + panelW / 2, py + 34);

    ctx.fillStyle = p.color;
    ctx.font = "bold 8px 'Press Start 2P', monospace";
    ctx.fillText(p.title, px + panelW / 2, py + 56);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "8px 'Silkscreen', monospace";
    ctx.fillText(p.desc, px + panelW / 2, py + 74);

    ctx.fillStyle = "#00ffcc";
    ctx.font = "7px 'Press Start 2P', monospace";
    ctx.fillText("[OPEN]", px + panelW / 2, py + 90);
  });

  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x, y + 21, w, 5);
}

/**
 * Elevated Highway / Industrial Billboards
 */
export function drawStreetBillboard(ctx, b, groundY, time) {
  const x = b.x;
  const y = groundY - b.height - 40;
  const w = b.width;
  const h = b.height;

  // Steel Lattice Scaffolding Legs
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 20, y + h);
  ctx.lineTo(x + 20, groundY);
  ctx.moveTo(x + 40, y + h);
  ctx.lineTo(x + 40, groundY);
  ctx.moveTo(x + 20, y + h + 10);
  ctx.lineTo(x + 40, groundY - 10);
  ctx.moveTo(x + 40, y + h + 10);
  ctx.lineTo(x + 20, groundY - 10);

  ctx.moveTo(x + w - 40, y + h);
  ctx.lineTo(x + w - 40, groundY);
  ctx.moveTo(x + w - 20, y + h);
  ctx.lineTo(x + w - 20, groundY);
  ctx.moveTo(x + w - 40, y + h + 10);
  ctx.lineTo(x + w - 20, groundY - 10);
  ctx.moveTo(x + w - 20, y + h + 10);
  ctx.lineTo(x + w - 40, groundY - 10);
  ctx.stroke();

  // Billboard Body
  ctx.fillStyle = "#080c14";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#00ffcc";
  ctx.shadowBlur = 10;
  ctx.strokeRect(x, y, w, h);

  for (let s = 0; s < 4; s++) {
    const sx = x + 35 + s * 80;
    ctx.fillStyle = "#ffdd88";
    ctx.fillRect(sx - 6, y + h, 12, 6);
  }

  // Neon Tag in Top Corner
  ctx.fillStyle = "#ff0077";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.textAlign = "left";
  ctx.fillText(b.tag, x + 16, y + 22);

  // Main Headline
  ctx.fillStyle = "#00ffcc";
  ctx.font = "bold 11px 'Press Start 2P', monospace";
  ctx.fillText(b.headline, x + 16, y + 44);

  // Sublines
  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 10px 'Silkscreen', monospace";
  b.sublines.forEach((line, idx) => {
    ctx.fillText(line, x + 16, y + 68 + idx * 20);
  });

  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y - 5, w + 8, 6);
}

/**
 * 4 Real Enterprise Project Buildings
 */

// 1. CAS (Contract Agentic Society - 6 Agent Societies & Fastn MCP)
export function drawCAS(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "CAS", "CONTRACT AGENTIC SOCIETY", lm.signColor, time);

  // Legal/Risk Neural Facility Base
  ctx.fillStyle = "#151c28";
  ctx.fillRect(x, y + 25, w, h - 25);
  ctx.fillStyle = "#1e283b";
  ctx.fillRect(x + 8, y + 33, w - 16, h - 33);

  // 6 Illuminated Agent Society Pods (Contract, Risk, Negotiation, Compliance, Obligation, Dispute)
  const podW = 50;
  const podH = 65;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const px = x + 24 + c * 115;
      const py = y + 70 + r * 75;
      ctx.fillStyle = "#0d131f";
      ctx.fillRect(px, py, podW, podH);
      ctx.strokeStyle = "#00ffcc";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(px, py, podW, podH);

      // Society Hexagon Symbol
      ctx.fillStyle = (r * 3 + c) % 2 === 0 ? "#00ffcc" : "#00ff88";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("⚖️", px + podW / 2, py + 28);

      ctx.fillStyle = "#fff";
      ctx.font = "bold 7px 'Press Start 2P', monospace";
      const names = ["CONTRACT", "RISK", "NEGOTIATE", "COMPLY", "OBLIGATE", "DISPUTE"];
      ctx.fillText(names[r * 3 + c], px + podW / 2, py + 48);
    }
  }

  // Fastn MCP Workflow Bus Line
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(x + 10, groundY - 6, w - 20, 3);
  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 20, w + 8, 8);
}

// 2. ComplianceOps (EU AI Act Auditor)
export function drawComplianceOps(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "COMPLIANCEOPS", "EU AI ACT AUDITOR", lm.signColor, time);

  // Governance Audit Center
  ctx.fillStyle = "#1e1425";
  ctx.fillRect(x, y + 28, w, h - 28);
  ctx.fillStyle = "#2c1c36";
  ctx.fillRect(x + 8, y + 36, w - 16, h - 36);

  // Dual-Key Human Approval Gate at Center
  const gateX = x + w / 2 - 45;
  const gateY = y + 75;
  ctx.fillStyle = "#100917";
  ctx.fillRect(gateX, gateY, 90, 105);
  ctx.strokeStyle = "#ff0077";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(gateX, gateY, 90, 105);

  // Two Golden Security Keys (Dual-Key HITL)
  ctx.fillStyle = "#ffdd00";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🔑 🔑", gateX + 45, gateY + 40);

  ctx.fillStyle = "#00ff88";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.fillText("DUAL-KEY", gateX + 45, gateY + 68);
  ctx.fillText("HITL GATE", gateX + 45, gateY + 84);

  // Evidence Stream Waveforms on sides
  ctx.fillStyle = "#ff0077";
  for (let b = 0; b < 12; b++) {
    const barH = 10 + Math.abs(Math.sin(time * 0.008 + b * 0.7)) * 32;
    ctx.fillRect(x + 22 + b * 10, groundY - 14 - barH, 6, barH);
    ctx.fillRect(x + w - 135 + b * 10, groundY - 14 - barH, 6, barH);
  }

  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 23, w + 8, 8);
}

// 3. Negotiation Agent Engine (B2B Bargaining Mesh)
export function drawNegotiationAgent(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "NEGOTIATION AGENT", "B2B BARGAINING", lm.signColor, time);

  // Game Theory Exchange Building
  ctx.fillStyle = "#221e14";
  ctx.fillRect(x, y + 30, w, h - 30);
  ctx.fillStyle = "#332c1d";
  ctx.fillRect(x + 8, y + 38, w - 16, h - 38);

  // Buyer vs. Vendor Protocol Chambers
  const chW = 100;
  const chH = 110;
  // Buyer Chamber
  ctx.fillStyle = "#14110b";
  ctx.fillRect(x + 25, y + 70, chW, chH);
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 25, y + 70, chW, chH);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("BUYER AGENT", x + 25 + chW / 2, y + 92);
  ctx.fillText("STRATEGY", x + 25 + chW / 2, y + 108);

  // Vendor Chamber
  ctx.fillStyle = "#14110b";
  ctx.fillRect(x + w - 125, y + 70, chW, chH);
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + w - 125, y + 70, chW, chH);

  ctx.fillStyle = "#fbbf24";
  ctx.fillText("VENDOR AGENT", x + w - 125 + chW / 2, y + 92);
  ctx.fillText("STRATEGY", x + w - 125 + chW / 2, y + 108);

  // Central State-Machine Channel (17-Message Bridge)
  const bridgeX = x + 130;
  const bridgeW = w - 260;
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.fillText("17-MSG STATE", bridgeX + bridgeW / 2, y + 115);
  ctx.fillText("PROTOCOL", bridgeX + bridgeW / 2, y + 132);

  // Animated pulse packets between buyer and vendor
  const pPos = (time * 0.08) % (w - 180);
  ctx.fillStyle = "#00ff88";
  ctx.beginPath();
  ctx.arc(x + 60 + pPos, y + 155, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 25, w + 8, 8);
}

// 4. AuraSight (Edge-Native Voice Transaction Assistant)
export function drawAuraSight(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "AURASIGHT", "EDGE VOICE ACCOUNTING", lm.signColor, time);

  // Edge Voice & Retail Hub Base
  ctx.fillStyle = "#121f18";
  ctx.fillRect(x, y + 28, w, h - 28);
  ctx.fillStyle = "#1b2e24";
  ctx.fillRect(x + 8, y + 36, w - 16, h - 36);

  // Giant Microphone & Multimodal Currency Scanner Window
  const winX = x + 30;
  const winY = y + 75;
  const winW = w - 60;
  ctx.fillStyle = "#08120d";
  ctx.fillRect(winX, winY, winW, 105);
  ctx.strokeStyle = "#00ff88";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(winX, winY, winW, 105);

  // Big Microphone Icon
  ctx.font = "26px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🎙️", winX + 45, winY + 50);

  ctx.fillStyle = "#00ff88";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.fillText("WHISPER ONNX", winX + winW / 2 + 30, winY + 38);
  ctx.fillText("URDU VOICE", winX + winW / 2 + 30, winY + 54);

  // Zero Arithmetic Error Badge
  ctx.fillStyle = "#ffdd00";
  ctx.fillText("0 ARITHMETIC ERROR", winX + winW / 2, winY + 84);

  // Green fiber conduit
  ctx.fillStyle = "#00ff88";
  ctx.fillRect(x + 10, groundY - 6, w - 20, 3);
  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 23, w + 8, 8);
}

/**
 * 5. Finale Pavilion: "Let's build together" (Matching Uploaded Image)
 */
export function drawConnectPavilion(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  ctx.save();
  ctx.fillStyle = "#1e2433";
  ctx.fillRect(x, y + 10, w, h - 10);
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 4;

  const cardX = x + 12;
  const cardY = y + 22;
  const cardW = w - 24;
  const cardH = h - 32;

  ctx.fillStyle = "#f8fafc";
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 18);
  ctx.fill();
  ctx.stroke();

  // Eyebrow: CONNECT
  ctx.fillStyle = "#0284c7";
  ctx.font = "bold 10px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("CONNECT", cardX + cardW / 2, cardY + 34);

  // Heading: Let's build together
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 20px 'Silkscreen', 'Press Start 2P', sans-serif";
  ctx.fillText("Let's build together", cardX + cardW / 2, cardY + 68);

  ctx.fillStyle = "#475569";
  ctx.font = "9px 'Silkscreen', sans-serif";
  ctx.fillText("AI/ML Engineer • Multi-Agent Federations • Edge AI", cardX + cardW / 2, cardY + 95);

  // 3 Action Buttons Replica
  const btnY = cardY + 115;
  // Button 1: Send Email
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.roundRect(cardX + 16, btnY, 100, 36, 8);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 8px 'Silkscreen', monospace";
  ctx.fillText("Send Email ✉", cardX + 16 + 50, btnY + 22);

  // Button 2: Download CV (PDF)
  ctx.fillStyle = "#e0f2fe";
  ctx.beginPath();
  ctx.roundRect(cardX + 126, btnY, 130, 36, 8);
  ctx.fill();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#0284c7";
  ctx.fillText("⬇ Download CV", cardX + 126 + 65, btnY + 22);

  // Button 3: Copy Email
  ctx.fillStyle = "#f1f5f9";
  ctx.beginPath();
  ctx.roundRect(cardX + 266, btnY, 90, 36, 8);
  ctx.fill();
  ctx.fillStyle = "#334155";
  ctx.fillText("Copy Email", cardX + 266 + 45, btnY + 22);

  // Footer: GitHub • LinkedIn • syedmuhammadayyanibrar@gmail.com
  ctx.fillStyle = "#475569";
  ctx.font = "8px 'Silkscreen', monospace";
  ctx.fillText("GitHub   •   LinkedIn   •   syedmuhammadayyanibrar@gmail.com", cardX + cardW / 2, cardY + cardH - 18);

  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y + 6, w + 8, 8);

  ctx.restore();
}

/**
 * Stray Cat (Mochi) on Fence
 */
export function drawCat(ctx, x, y, frameTick) {
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));

  const tailWag = Math.sin(frameTick * 0.05) * 3;
  const breathe = Math.sin(frameTick * 0.03) > 0.5 ? -1 : 0;

  ctx.fillStyle = "#3d2817";
  ctx.fillRect(-20, 0, 40, 6);
  ctx.fillStyle = "#27190e";
  ctx.fillRect(-18, 6, 6, 25);
  ctx.fillRect(12, 6, 6, 25);

  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(-10, -12 + breathe, 16, 12);
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(-7, -12 + breathe, 6, 7);
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(-2, -6 + breathe, 6, 6);

  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(3, -19 + breathe, 10, 9);
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(6, -19 + breathe, 4, 5);
  ctx.fillStyle = "#ffdd44";
  ctx.fillRect(8, -16 + breathe, 2, 2);

  ctx.fillStyle = "#ff2244";
  ctx.fillRect(2, -10 + breathe, 3, 2);

  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(-16, -15 + breathe + tailWag, 4, 6);

  ctx.fillStyle = "rgba(240, 245, 255, 0.9)";
  ctx.fillRect(-22, -2, 12, 3);
  ctx.fillRect(14, -2, 10, 3);

  ctx.restore();
}
