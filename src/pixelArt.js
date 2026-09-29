// src/pixelArt.js - Procedural 16-bit Sprites, Crisp Marquees, NPCs & Architectural Projects

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
  const h = 48;
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
  ctx.shadowBlur = 12 * flicker;
  ctx.strokeRect(x + 10, marqueeY, width - 20, h);

  // Marquee chasing corner dots
  const dotColor = (Math.floor(time * 0.005) % 2 === 0) ? "#ffffff" : neonColor;
  ctx.fillStyle = dotColor;
  ctx.fillRect(x + 13, marqueeY + 3, 4, 4);
  ctx.fillRect(x + width - 17, marqueeY + 3, 4, 4);
  ctx.fillRect(x + 13, marqueeY + h - 7, 4, 4);
  ctx.fillRect(x + width - 17, marqueeY + h - 7, 4, 4);

  // Row 1: Building Number Badge
  ctx.fillStyle = neonColor;
  ctx.font = "bold 9px 'Press Start 2P', monospace";
  ctx.textAlign = "left";
  ctx.fillText(`PROJECT ${number}`, x + 24, marqueeY + 18);

  // Row 2: Big Bold Readable Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 13px 'Silkscreen', 'Press Start 2P', sans-serif";
  ctx.fillText(name.toUpperCase(), x + 24, marqueeY + 34);

  // Row 3: Subtitle Pill
  ctx.fillStyle = "#94a3b8";
  ctx.font = "9px 'Silkscreen', monospace";
  ctx.textAlign = "right";
  ctx.fillText(subtitle.toUpperCase(), x + width - 24, marqueeY + 28);

  // Snow on top of marquee
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x + 8, marqueeY - 4, width - 16, 5);

  ctx.restore();
}

/**
 * 16-Bit Player Character Renderer (Syed Ayyan)
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

  // Fluttering Scarf
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

  // Leg offsets for 6-frame cycle
  const legX1 = frame === 0 ? -3 : (frame === 1 ? -5 : (frame === 2 ? -2 : 3));
  const legX2 = -legX1;

  // Shadow
  ctx.fillStyle = "rgba(10, 12, 20, 0.4)";
  ctx.beginPath();
  ctx.ellipse(0, 0, 8, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pants & Shoes
  ctx.fillStyle = npc.cBottom;
  ctx.fillRect(legX1 - 2, -12, 3, 9);
  ctx.fillRect(legX2 - 2, -12, 3, 9);
  ctx.fillStyle = "#221c17";
  ctx.fillRect(legX1 - 3, -3, 5, 3);
  ctx.fillRect(legX2 - 3, -3, 5, 3);

  // Torso / Jacket
  ctx.fillStyle = npc.cTop;
  ctx.fillRect(-4, -23 + bob, 9, 12);

  // Accessory / Prop
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
    // Occasional camera flash!
    if (Math.floor(time * 0.003 + npc.x) % 15 === 0) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.arc(8, -18 + bob, 14, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Head & Hair
  ctx.fillStyle = "#e8b898";
  ctx.fillRect(-3, -32 + bob, 7, 9);
  ctx.fillStyle = npc.cHair;
  ctx.fillRect(-4, -36 + bob, 9, 5);
  ctx.fillRect(-4, -33 + bob, 3, 4);

  // Headphones
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
    ctx.font = "8px 'Silkscreen', monospace";
    const textW = ctx.measureText(npc.bubbleText).width;
    const bx = npc.x - textW / 2 - 8;
    const by = groundY - 48;

    ctx.fillStyle = "rgba(10, 15, 25, 0.9)";
    ctx.fillRect(bx, by, textW + 16, 18);
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, textW + 16, 18);

    ctx.fillStyle = "#fff";
    ctx.fillText(npc.bubbleText, bx + 8, by + 12);
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
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 5, y + 25, w - 10, h - 25);

  // Overhead Spotlight Lamps
  for (let s = 0; s < 3; s++) {
    const sx = x + 35 + s * 95;
    ctx.fillStyle = "#334155";
    ctx.fillRect(sx - 8, y + 10, 16, 8);
    ctx.fillStyle = "#ffdd88";
    ctx.fillRect(sx - 6, y + 18, 12, 4);

    // Warm light cone down onto panel
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
  const panelW = 78;
  const panelH = 95;
  const panels = [
    { title: "GITHUB", icon: "🐙", desc: "REPOS", color: "#ffffff" },
    { title: "GMAIL", icon: "✉️", desc: "CONTACT", color: "#ff4444" },
    { title: "LINKEDIN", icon: "💼", desc: "PROFILE", color: "#0088ff" }
  ];

  panels.forEach((p, idx) => {
    const px = x + 16 + idx * 86;
    const py = y + 54;

    ctx.fillStyle = "#141c2b";
    ctx.fillRect(px, py, panelW, panelH);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(px, py, panelW, panelH);

    // Icon
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(p.icon, px + panelW / 2, py + 34);

    // Title
    ctx.fillStyle = p.color;
    ctx.font = "bold 8px 'Press Start 2P', monospace";
    ctx.fillText(p.title, px + panelW / 2, py + 56);

    // Desc
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "8px 'Silkscreen', monospace";
    ctx.fillText(p.desc, px + panelW / 2, py + 72);

    // Action indicator
    ctx.fillStyle = "#00ffcc";
    ctx.font = "7px 'Press Start 2P', monospace";
    ctx.fillText("[OPEN]", px + panelW / 2, py + 86);
  });

  // Snow on top
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
  // Left leg
  ctx.moveTo(x + 20, y + h);
  ctx.lineTo(x + 20, groundY);
  ctx.moveTo(x + 40, y + h);
  ctx.lineTo(x + 40, groundY);
  // Cross bracing
  ctx.moveTo(x + 20, y + h + 10);
  ctx.lineTo(x + 40, groundY - 10);
  ctx.moveTo(x + 40, y + h + 10);
  ctx.lineTo(x + 20, groundY - 10);
  // Right leg
  ctx.moveTo(x + w - 40, y + h);
  ctx.lineTo(x + w - 40, groundY);
  ctx.moveTo(x + w - 20, y + h);
  ctx.lineTo(x + w - 20, groundY);
  // Cross bracing
  ctx.moveTo(x + w - 40, y + h + 10);
  ctx.lineTo(x + w - 20, groundY - 10);
  ctx.moveTo(x + w - 20, y + h + 10);
  ctx.lineTo(x + w - 40, groundY - 10);
  ctx.stroke();

  // Billboard Frame
  ctx.fillStyle = "#080c14";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, w, h);

  // Spotlights shining upwards
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

  // Snow on top
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y - 5, w + 8, 6);
}

/**
 * 6 AI/ML Architectural Project Buildings
 */

// 1. NeuroStream (AI Multi-Agent Gateway)
export function drawNeuroStream(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Crisp Marquee Sign above building
  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "NEUROSTREAM", "MULTI-AGENT GATEWAY", lm.signColor, time);

  // Brutalist Neural Facility Base
  ctx.fillStyle = "#151a24";
  ctx.fillRect(x, y + 25, w, h - 25);
  ctx.fillStyle = "#1e2536";
  ctx.fillRect(x + 8, y + 33, w - 16, h - 33);

  // Server rack bay windows with flickering LEDs
  for (let b = 0; b < 3; b++) {
    const bx = x + 24 + b * 105;
    const by = y + 70;
    ctx.fillStyle = "#0d111a";
    ctx.fillRect(bx, by, 85, 115);
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 1;
    ctx.strokeRect(bx, by, 85, 115);

    // Glowing server units
    for (let r = 0; r < 6; r++) {
      ctx.fillStyle = "#1a2233";
      ctx.fillRect(bx + 6, by + 8 + r * 17, 73, 13);
      for (let l = 0; l < 4; l++) {
        const blink = (Math.floor(time * 0.008 + b * 3 + r * 2 + l) % 3 === 0);
        ctx.fillStyle = blink ? "#00ff88" : "#00aaff";
        ctx.fillRect(bx + 14 + l * 12, by + 12 + r * 17, 4, 5);
      }
    }
  }

  // Cyan fiber-optic conduits
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(x + 10, groundY - 6, w - 20, 3);
  // Snow on roof
  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 20, w + 8, 8);
}

// 2. OmniVision (Edge Multimodal Vision & OCR)
export function drawOmniVision(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "OMNIVISION", "EDGE MULTIMODAL", lm.signColor, time);

  // High-Tech Optical Perception Lab
  ctx.fillStyle = "#1f1424";
  ctx.fillRect(x, y + 30, w, h - 30);
  ctx.fillStyle = "#2c1c33";
  ctx.fillRect(x + 8, y + 38, w - 16, h - 38);

  // Giant Glowing Camera Aperture / Multimodal Optical Sensor
  const lensX = x + w / 2;
  const lensY = y + 90;
  ctx.beginPath();
  ctx.arc(lensX, lensY, 32, 0, Math.PI * 2);
  ctx.fillStyle = "#0f0714";
  ctx.fill();
  ctx.strokeStyle = "#ff0077";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Cyan & Magenta Scanning Laser Rings
  const laserAngle = (time * 0.004) % (Math.PI * 2);
  ctx.beginPath();
  ctx.arc(lensX, lensY, 22, 0, Math.PI * 2);
  ctx.strokeStyle = "#00eeff";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 0, 119, 0.45)";
  ctx.beginPath();
  ctx.arc(lensX, lensY, 12, 0, Math.PI * 2);
  ctx.fill();

  // Glass Frame Panels below
  ctx.fillStyle = "#120a17";
  ctx.fillRect(x + 20, y + 145, w - 40, h - 155);
  ctx.strokeStyle = "#ff0077";
  ctx.strokeRect(x + 20, y + 145, w - 40, h - 155);

  // Live Multimodal Waveform
  ctx.fillStyle = "#ff0077";
  for (let bar = 0; bar < 18; bar++) {
    const barH = 8 + Math.abs(Math.sin(time * 0.01 + bar * 0.7)) * 28;
    ctx.fillRect(x + 32 + bar * 16, groundY - 14 - barH, 9, barH);
  }

  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 25, w + 8, 8);
}

// 3. SynapseFlow (Reliable AI Data Pipelines)
export function drawSynapseFlow(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "SYNAPSEFLOW", "STREAMING PIPELINES", lm.signColor, time);

  // Industrial Matrix Data Silos
  ctx.fillStyle = "#222016";
  ctx.fillRect(x, y + 30, w, h - 30);
  ctx.fillStyle = "#332f1e";
  ctx.fillRect(x + 8, y + 38, w - 16, h - 38);

  // 3 Vertical Data Pipeline Columns
  for (let c = 0; c < 3; c++) {
    const cx = x + 28 + c * 105;
    ctx.fillStyle = "#17150e";
    ctx.fillRect(cx, y + 65, 80, 125);
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx, y + 65, 80, 125);

    // Streaming Data Particles flowing down
    const pOffset = (time * 0.08 + c * 40) % 110;
    ctx.fillStyle = "#00ff88";
    ctx.fillRect(cx + 15, y + 70 + pOffset, 50, 4);
  }

  // Golden Ticker Line across building
  ctx.fillStyle = "#000";
  ctx.fillRect(x + 12, groundY - 32, w - 24, 18);
  ctx.fillStyle = "#ffd700";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.fillText("280k EPS // ZERO-LOSS STREAM // 2.4ms P99", x + 24, groundY - 20);

  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 25, w + 8, 8);
}

// 4. AegisGuard AI (Deterministic Safety & Guardrails)
export function drawAegisGuard(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "AEGISGUARD AI", "SAFETY SHIELD", lm.signColor, time);

  // Armored Cyber Shield Base
  ctx.fillStyle = "#121f18";
  ctx.fillRect(x, y + 28, w, h - 28);
  ctx.fillStyle = "#1a2e24";
  ctx.fillRect(x + 8, y + 36, w - 16, h - 36);

  // Giant Electromagnetic Security Grid at Center
  const gridX = x + w / 2 - 50;
  const gridY = y + 75;
  ctx.fillStyle = "#09120e";
  ctx.fillRect(gridX, gridY, 100, 110);
  ctx.strokeStyle = "#00ff88";
  ctx.lineWidth = 3;
  ctx.strokeRect(gridX, gridY, 100, 110);

  // Pulsing Hexagon Shield Icon
  ctx.save();
  ctx.strokeStyle = "#00ff88";
  ctx.lineWidth = 2;
  const pulse = Math.sin(time * 0.008) * 3;
  ctx.beginPath();
  ctx.arc(gridX + 50, gridY + 55, 30 + pulse, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(0, 255, 136, 0.25)";
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("🛡️", gridX + 50, gridY + 62);
  ctx.restore();

  // Green fiber conduits
  ctx.fillStyle = "#00ff88";
  ctx.fillRect(x + 10, groundY - 6, w - 20, 3);
  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 22, w + 8, 8);
}

// 5. VoiceSynapse (Sub-150ms Real-Time Voice Agent)
export function drawVoiceSynapse(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "VOICESYNAPSE", "SPEECH AGENT", lm.signColor, time);

  // Acoustic Studio Building Base
  ctx.fillStyle = "#121a24";
  ctx.fillRect(x, y + 30, w, h - 30);
  ctx.fillStyle = "#1b2636";
  ctx.fillRect(x + 8, y + 38, w - 16, h - 38);

  // Tall Broadcast Antenna
  const mastX = x + w / 2;
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(mastX - 12, y + 30);
  ctx.lineTo(mastX, y - 10);
  ctx.lineTo(mastX + 12, y + 30);
  ctx.stroke();

  // Blinking cyan antenna light
  const blink = Math.sin(time * 0.008) > 0;
  ctx.fillStyle = blink ? "#00eeff" : "#005577";
  ctx.fillRect(mastX - 3, y - 12, 6, 4);

  // Large Studio Window with HD Audio Waveforms
  const winX = x + 20;
  const winY = y + 75;
  const winW = w - 40;
  ctx.fillStyle = "#090d14";
  ctx.fillRect(winX, winY, winW, 95);
  ctx.strokeStyle = "#00eeff";
  ctx.lineWidth = 2;
  ctx.strokeRect(winX, winY, winW, 95);

  // Animated Sine Wave Audio Visualizer
  ctx.strokeStyle = "#00eeff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let px = 0; px < winW - 10; px += 4) {
    const py = winY + 48 + Math.sin(time * 0.01 + px * 0.08) * 26;
    if (px === 0) ctx.moveTo(winX + 5 + px, py);
    else ctx.lineTo(winX + 5 + px, py);
  }
  ctx.stroke();

  // Sub-150ms Label
  ctx.fillStyle = "#00eeff";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.fillText("FULL-DUPLEX // 142ms LATENCY", x + 30, groundY - 18);

  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 25, w + 8, 8);
}

// 6. PixelDiffusion (Neural Retro Graphics Engine)
export function drawPixelDiffusion(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "PIXELDIFFUSION", "GENERATIVE AI", lm.signColor, time);

  // Generative AI Art Studio Base
  ctx.fillStyle = "#1c1226";
  ctx.fillRect(x, y + 30, w, h - 30);
  ctx.fillStyle = "#291a38";
  ctx.fillRect(x + 8, y + 38, w - 16, h - 38);

  // Animated 16-Color Gradient Palette Display
  const palX = x + 24;
  const palY = y + 70;
  const palW = w - 48;
  ctx.fillStyle = "#0d0714";
  ctx.fillRect(palX, palY, palW, 45);
  ctx.strokeStyle = "#9900ff";
  ctx.strokeRect(palX, palY, palW, 45);

  const colors = ["#ff0055", "#ff5500", "#ffaa00", "#00ff66", "#00eeff", "#0066ff", "#9900ff", "#ff00aa"];
  for (let c = 0; c < colors.length; c++) {
    ctx.fillStyle = colors[c];
    ctx.fillRect(palX + 6 + c * 35, palY + 8, 30, 28);
  }

  // Pixel Sprite Canvas Sub-window
  const subY = y + 125;
  ctx.fillStyle = "#08040d";
  ctx.fillRect(palX, subY, palW, 60);

  // Animated mini pixel sword/crystal rotating
  const rot = time * 0.003;
  ctx.save();
  ctx.translate(palX + palW / 2, subY + 30);
  ctx.rotate(rot);
  ctx.fillStyle = "#00eeff";
  ctx.fillRect(-6, -16, 12, 32);
  ctx.fillStyle = "#ff0077";
  ctx.fillRect(-12, -4, 24, 8);
  ctx.restore();

  ctx.fillStyle = "#e0eaf5";
  ctx.fillRect(x - 4, y + 25, w + 8, 8);
}

/**
 * 7. Finale Pavilion: "Let's build together" (Matching Attached Image)
 */
export function drawConnectPavilion(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Modern Clean Rounded Pavilion Frame (As in attached picture)
  ctx.save();
  // Pillared background
  ctx.fillStyle = "#1e2433";
  ctx.fillRect(x, y + 10, w, h - 10);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 4;

  // Clean White/Light Board Body replicating the user's uploaded image
  const cardX = x + 12;
  const cardY = y + 22;
  const cardW = w - 24;
  const cardH = h - 32;

  ctx.fillStyle = "#f8fafc";
  ctx.beginPath();
  ctx.roundRect(cardX, cardY, cardW, cardH, 16);
  ctx.fill();
  ctx.stroke();

  // Eyebrow Tag: CONNECT (in vibrant blue uppercase)
  ctx.fillStyle = "#0284c7";
  ctx.font = "bold 10px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("CONNECT", cardX + cardW / 2, cardY + 34);

  // Main Heading: Let's build together (bold clean black text)
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 20px 'Silkscreen', 'Press Start 2P', sans-serif";
  ctx.fillText("Let's build together", cardX + cardW / 2, cardY + 68);

  // Subtitle / Prompt
  ctx.fillStyle = "#475569";
  ctx.font = "9px 'Silkscreen', sans-serif";
  ctx.fillText("AI/ML Engineer • Data Pipelines • Multi-Agent Systems", cardX + cardW / 2, cardY + 95);

  // 3 Action Buttons Replica
  // Button 1: Send Email
  const btnY = cardY + 115;
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.roundRect(cardX + 16, btnY, 95, 34, 8);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 8px 'Silkscreen', monospace";
  ctx.fillText("Send Email ✉", cardX + 16 + 47, btnY + 21);

  // Button 2: Download CV (PDF)
  ctx.fillStyle = "#e0f2fe";
  ctx.beginPath();
  ctx.roundRect(cardX + 120, btnY, 125, 34, 8);
  ctx.fill();
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#0284c7";
  ctx.fillText("⬇ Download CV", cardX + 120 + 62, btnY + 21);

  // Button 3: Copy Email
  ctx.fillStyle = "#f1f5f9";
  ctx.beginPath();
  ctx.roundRect(cardX + 254, btnY, 85, 34, 8);
  ctx.fill();
  ctx.fillStyle = "#334155";
  ctx.fillText("Copy Email", cardX + 254 + 42, btnY + 21);

  // Footer Row: GitHub • LinkedIn • syedmuhammadayyanibrar@gmail.com
  ctx.fillStyle = "#475569";
  ctx.font = "8px 'Silkscreen', monospace";
  ctx.fillText("GitHub   •   LinkedIn   •   syedmuhammadayyanibrar@gmail.com", cardX + cardW / 2, cardY + cardH - 18);

  // Snow on top of pavilion
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

  // Wooden fence perch
  ctx.fillStyle = "#3d2817";
  ctx.fillRect(-20, 0, 40, 6);
  ctx.fillStyle = "#27190e";
  ctx.fillRect(-18, 6, 6, 25);
  ctx.fillRect(12, 6, 6, 25);

  // Cat body
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(-10, -12 + breathe, 16, 12);
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(-7, -12 + breathe, 6, 7);
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(-2, -6 + breathe, 6, 6);

  // Head & Ears
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(3, -19 + breathe, 10, 9);
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(6, -19 + breathe, 4, 5);
  ctx.fillStyle = "#ffdd44";
  ctx.fillRect(8, -16 + breathe, 2, 2);

  // Collar
  ctx.fillStyle = "#ff2244";
  ctx.fillRect(2, -10 + breathe, 3, 2);

  // Tail
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(-16, -15 + breathe + tailWag, 4, 6);

  // Snow on fence
  ctx.fillStyle = "rgba(240, 245, 255, 0.9)";
  ctx.fillRect(-22, -2, 12, 3);
  ctx.fillRect(14, -2, 10, 3);

  ctx.restore();
}
