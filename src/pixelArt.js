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
export function drawStartBoard(ctx, lm, groundY, time, hoverX = null, hoverY = null) {
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
  ctx.shadowBlur = 0;

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

  // Three Distinct Vertical Panels (Directly Clickable from the Street Board!)
  const panelW = 82;
  const panelH = 100;
  const panels = [
    { title: "GITHUB", icon: "🐙", desc: "REPOS", color: "#ffffff", actionText: "OPEN ↗" },
    { title: "GMAIL", icon: "✉️", desc: "CONTACT", color: "#ff4444", actionText: "EMAIL ↗" },
    { title: "LINKEDIN", icon: "💼", desc: "PROFILE", color: "#0088ff", actionText: "CONNECT ↗" }
  ];

  panels.forEach((p, idx) => {
    const px = x + 16 + idx * 88;
    const py = y + 54;

    const isHovered = hoverX !== null && hoverY !== null &&
      hoverX >= px && hoverX <= px + panelW &&
      hoverY >= py && hoverY <= py + panelH;

    ctx.fillStyle = isHovered ? "#192438" : "#141c2b";
    ctx.fillRect(px, py, panelW, panelH);

    ctx.strokeStyle = isHovered ? "#00ffcc" : p.color;
    ctx.lineWidth = isHovered ? 2.5 : 1.5;
    if (isHovered) {
      ctx.shadowColor = "#00ffcc";
      ctx.shadowBlur = 12;
    }
    ctx.strokeRect(px, py, panelW, panelH);
    ctx.shadowBlur = 0;

    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(p.icon, px + panelW / 2, py + 34);

    ctx.fillStyle = isHovered ? "#00ffcc" : p.color;
    ctx.font = "bold 8px 'Press Start 2P', monospace";
    ctx.fillText(p.title, px + panelW / 2, py + 56);

    ctx.fillStyle = isHovered ? "#ffffff" : "#cbd5e1";
    ctx.font = "8px 'Silkscreen', monospace";
    ctx.fillText(p.desc, px + panelW / 2, py + 74);

    // Clickable button badge at bottom of panel
    const btnBoxW = panelW - 12;
    const btnBoxH = 16;
    const btnBoxX = px + 6;
    const btnBoxY = py + 79;
    ctx.fillStyle = isHovered ? "#00ffcc" : "rgba(0, 255, 204, 0.15)";
    ctx.fillRect(btnBoxX, btnBoxY, btnBoxW, btnBoxH);
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 1;
    ctx.strokeRect(btnBoxX, btnBoxY, btnBoxW, btnBoxH);

    ctx.fillStyle = isHovered ? "#0a0f18" : "#00ffcc";
    ctx.font = "bold 7px 'Press Start 2P', monospace";
    ctx.fillText(isHovered ? "CLICK ↗" : p.actionText, px + panelW / 2, btnBoxY + 11);
  });

  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x, y + 21, w, 5);
}

/**
 * Elevated Highway / Industrial Billboards
 */
export function drawStreetBillboard(ctx, b, groundY, time) {
  const x = b.x;
  const y = groundY - b.height - 65; // Elevated cleanly above player & sidewalk!
  const w = b.width;
  const h = b.height;

  ctx.save();
  // Steel Lattice Scaffolding Legs
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 24, y + h);
  ctx.lineTo(x + 24, groundY);
  ctx.moveTo(x + 48, y + h);
  ctx.lineTo(x + 48, groundY);
  ctx.moveTo(x + 24, y + h + 15);
  ctx.lineTo(x + 48, groundY - 10);
  ctx.moveTo(x + 48, y + h + 15);
  ctx.lineTo(x + 24, groundY - 10);

  ctx.moveTo(x + w - 48, y + h);
  ctx.lineTo(x + w - 48, groundY);
  ctx.moveTo(x + w - 24, y + h);
  ctx.lineTo(x + w - 24, groundY);
  ctx.moveTo(x + w - 48, y + h + 15);
  ctx.lineTo(x + w - 24, groundY - 10);
  ctx.moveTo(x + w - 24, y + h + 15);
  ctx.lineTo(x + w - 48, groundY - 10);
  ctx.stroke();

  // Billboard Body
  ctx.fillStyle = "#080c14";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#00ffcc";
  ctx.shadowBlur = 12;
  ctx.strokeRect(x, y, w, h);

  // Spotlights at bottom pointing up
  for (let s = 0; s < 4; s++) {
    const sx = x + 35 + s * Math.floor((w - 70) / 3);
    ctx.fillStyle = "#334155";
    ctx.fillRect(sx - 8, y + h, 16, 6);
    ctx.fillStyle = "#ffdd88";
    ctx.fillRect(sx - 6, y + h + 1, 12, 4);

    const cone = ctx.createLinearGradient(sx, y + h, sx, y + h - 45);
    cone.addColorStop(0, "rgba(255, 230, 140, 0.25)");
    cone.addColorStop(1, "rgba(255, 230, 140, 0)");
    ctx.fillStyle = cone;
    ctx.beginPath();
    ctx.moveTo(sx - 4, y + h);
    ctx.lineTo(sx - 24, y + h - 45);
    ctx.lineTo(sx + 24, y + h - 45);
    ctx.lineTo(sx + 4, y + h);
    ctx.closePath();
    ctx.fill();
  }

  // Neon Tag in Top Corner
  ctx.fillStyle = "#ff0077";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(b.tag, x + 16, y + 16);

  // Main Headline
  ctx.fillStyle = "#00ffcc";
  ctx.font = "bold 10px 'Press Start 2P', monospace";
  ctx.fillText(b.headline, x + 16, y + 36);

  // Sublines
  ctx.fillStyle = "#f8fafc";
  ctx.font = "bold 10px 'Silkscreen', monospace";
  b.sublines.forEach((line, idx) => {
    ctx.fillText(line, x + 16, y + 60 + idx * 22);
  });

  // Snow on top of billboard
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y - 5, w + 8, 6);
  ctx.restore();
}

/**
 * Architectural Pixel Window Helpers
 */
function drawPixelWindow(ctx, wx, wy, ww, wh, isLit, glowColor, showSnow = true) {
  // Recessed window frame
  ctx.fillStyle = "#0a0e17";
  ctx.fillRect(wx - 2, wy - 2, ww + 4, wh + 4);

  // Glass Pane
  if (isLit) {
    ctx.fillStyle = glowColor || "#ffd778";
    ctx.fillRect(wx, wy, ww, wh);
    // Warm pane top sheen
    ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
    ctx.fillRect(wx, wy, ww, 3);
  } else {
    // Unlit cozy nighttime pane
    ctx.fillStyle = "#151d2a";
    ctx.fillRect(wx, wy, ww, wh);
  }

  // Cross mullions (classic 4-pane window grid)
  ctx.fillStyle = "#0a0e17";
  ctx.fillRect(wx + Math.floor(ww / 2) - 1, wy, 2, wh);
  ctx.fillRect(wx, wy + Math.floor(wh / 2) - 1, ww, 2);

  // Snow on window sill and lintel
  if (showSnow) {
    ctx.fillStyle = "#edf3fa";
    ctx.fillRect(wx - 3, wy - 3, ww + 6, 2);
    ctx.fillRect(wx - 2, wy + wh, ww + 4, 3);
  }
}

function drawArchedWindow(ctx, wx, wy, ww, wh, isLit, glowColor) {
  ctx.save();
  // Arched Header & Frame
  ctx.fillStyle = "#0c0812";
  ctx.fillRect(wx - 2, wy + 6, ww + 4, wh - 6);
  ctx.beginPath();
  ctx.arc(wx + ww / 2, wy + 6, ww / 2 + 2, Math.PI, 0);
  ctx.fill();

  // Glass area
  if (isLit) {
    ctx.fillStyle = glowColor || "#ffbe3b";
    ctx.fillRect(wx, wy + 6, ww, wh - 6);
    ctx.beginPath();
    ctx.arc(wx + ww / 2, wy + 6, ww / 2, Math.PI, 0);
    ctx.fill();
    // Glass highlight
    ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
    ctx.fillRect(wx, wy + 6, ww, 3);
  } else {
    ctx.fillStyle = "#171221";
    ctx.fillRect(wx, wy + 6, ww, wh - 6);
    ctx.beginPath();
    ctx.arc(wx + ww / 2, wy + 6, ww / 2, Math.PI, 0);
    ctx.fill();
  }

  // Window mullions (vertical and horizontal cross)
  ctx.fillStyle = "#0c0812";
  ctx.fillRect(wx + Math.floor(ww / 2) - 1, wy, 2, wh);
  ctx.fillRect(wx, wy + Math.floor(wh / 2), ww, 2);

  // Snow on top of arch and sill
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(wx - 2, wy + wh, ww + 4, 3);
  ctx.restore();
}

function drawEntrancePortico(ctx, ex, ey, ew, eh, accentColor) {
  // Heavy outer entryway architrave
  ctx.fillStyle = "#090d15";
  ctx.fillRect(ex - 4, ey - 6, ew + 8, eh + 6);

  // Doorway
  ctx.fillStyle = "#182030";
  ctx.fillRect(ex, ey, ew, eh);

  // Left & right door leaves with illuminated warm glass panels
  const doorW = Math.floor(ew / 2) - 2;
  const glassH = eh - 16;
  ctx.fillStyle = "#ffe082";
  ctx.fillRect(ex + 2, ey + 4, doorW - 1, glassH);
  ctx.fillRect(ex + doorW + 2, ey + 4, doorW - 1, glassH);

  // Center seam and handles
  ctx.fillStyle = "#090d15";
  ctx.fillRect(ex + doorW, ey, 2, eh);
  ctx.fillStyle = accentColor || "#00ffcc";
  ctx.fillRect(ex + doorW - 3, ey + Math.floor(eh / 2) - 2, 2, 6);
  ctx.fillRect(ex + doorW + 3, ey + Math.floor(eh / 2) - 2, 2, 6);

  // Transom glass on top
  ctx.fillStyle = "rgba(255, 235, 160, 0.85)";
  ctx.fillRect(ex + 2, ey - 5, ew - 4, 3);

  // Overhanging awning with snow blanket
  ctx.fillStyle = "#2d3748";
  ctx.fillRect(ex - 8, ey - 10, ew + 16, 5);
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(ex - 10, ey - 13, ew + 20, 4);

  // Entrance lights (sconces on left and right)
  ctx.fillStyle = "#ffdd88";
  ctx.fillRect(ex - 12, ey + 8, 4, 6);
  ctx.fillRect(ex + ew + 8, ey + 8, 4, 6);
}

/**
 * 4 Real Enterprise Project Buildings with Authentic Windows
 */

// 1. CAS (Contract Agentic Society)
export function drawCAS(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "CAS", "CONTRACT AGENTIC SOCIETY", lm.signColor, time);

  // Modern Slate Corporate Headquarters Facade
  ctx.fillStyle = "#151c28";
  ctx.fillRect(x, y + 25, w, h - 25);
  ctx.fillStyle = "#1c2538";
  ctx.fillRect(x + 8, y + 33, w - 16, h - 33);

  // Decorative cyan architectural pilasters
  ctx.fillStyle = "#25334d";
  ctx.fillRect(x + 12, y + 33, 8, h - 33);
  ctx.fillRect(x + w - 20, y + 33, 8, h - 33);
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(x + 14, y + 35, 4, h - 37);
  ctx.fillRect(x + w - 18, y + 35, 4, h - 37);

  // 3 Upper Floors of Glowing Pixel Windows (4 windows per floor)
  const cols = 4;
  const rows = 3;
  const winW = 54;
  const winH = 34;
  const startX = x + 34;
  const spacingX = 80;
  const startY = y + 54;
  const spacingY = 50;

  const glowColors = ["#ffeaa7", "#00f0ff", "#fef08a", "#67e8f9", "#ffd166"];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = startX + c * spacingX;
      const wy = startY + r * spacingY;
      const seed = (r * cols + c);
      const isLit = seed % 5 !== 3;
      const glow = glowColors[(seed + 1) % glowColors.length];
      drawPixelWindow(ctx, wx, wy, winW, winH, isLit, glow, true);
    }
  }

  // Ground Floor Entrance Portico
  const doorW = 56;
  const doorH = 46;
  const doorX = x + w / 2 - doorW / 2;
  const doorY = groundY - doorH;
  drawEntrancePortico(ctx, doorX, doorY, doorW, doorH, "#00ffcc");

  // Snow on facade cornice
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y + 21, w + 8, 6);
}

// 2. ComplianceOps (EU AI Act Auditor)
export function drawComplianceOps(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "COMPLIANCEOPS", "EU AI ACT AUDITOR", lm.signColor, time);

  // Regulatory Governance Center Facade (Deep Slate/Plum Brick)
  ctx.fillStyle = "#1b1424";
  ctx.fillRect(x, y + 25, w, h - 25);
  ctx.fillStyle = "#271c33";
  ctx.fillRect(x + 8, y + 33, w - 16, h - 33);

  // Architectural stone quoins on edges
  ctx.fillStyle = "#3b2b4d";
  for (let b = 0; b < 10; b++) {
    const qy = y + 35 + b * 20;
    const qw = b % 2 === 0 ? 14 : 10;
    ctx.fillRect(x + 8, qy, qw, 14);
    ctx.fillRect(x + w - 8 - qw, qy, qw, 14);
  }

  // 3 Floors of Elegant Arched Institutional Windows
  const cols = 4;
  const rows = 3;
  const winW = 50;
  const winH = 38;
  const startX = x + 38;
  const spacingX = 80;
  const startY = y + 54;
  const spacingY = 52;

  const glowColors = ["#ffd166", "#c084fc", "#fde047", "#ffbe3b", "#e9d5ff"];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = startX + c * spacingX;
      const wy = startY + r * spacingY;
      const seed = (r * cols + c);
      const isLit = seed % 4 !== 2;
      const glow = glowColors[seed % glowColors.length];
      drawArchedWindow(ctx, wx, wy, winW, winH, isLit, glow);
    }
  }

  // Grand Portico Entrance on Ground Floor
  const doorW = 60;
  const doorH = 48;
  const doorX = x + w / 2 - doorW / 2;
  const doorY = groundY - doorH;
  drawEntrancePortico(ctx, doorX, doorY, doorW, doorH, "#ff0077");

  // Snow on roof cornice
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y + 21, w + 8, 6);
}

// 3. Negotiation Agent Engine (B2B Bargaining Mesh)
export function drawNegotiationAgent(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "NEGOTIATION AGENT", "B2B BARGAINING", lm.signColor, time);

  // Grand Exchange / Commercial Facade (Charcoal & Bronze)
  ctx.fillStyle = "#221d15";
  ctx.fillRect(x, y + 25, w, h - 25);
  ctx.fillStyle = "#31281c";
  ctx.fillRect(x + 8, y + 33, w - 16, h - 33);

  // Bronze cornice divider bands between floors
  ctx.fillStyle = "#b45309";
  ctx.fillRect(x + 10, y + 96, w - 20, 3);
  ctx.fillRect(x + 10, y + 152, w - 20, 3);

  // 3 Floors of Warm Industrial/Exchange Windows (4 windows per floor)
  const cols = 4;
  const rows = 3;
  const winW = 52;
  const winH = 34;
  const startX = x + 36;
  const spacingX = 80;
  const startY = y + 54;
  const spacingY = 52;

  const glowColors = ["#f59e0b", "#fde047", "#fef08a", "#d97706", "#ffedd5"];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = startX + c * spacingX;
      const wy = startY + r * spacingY;
      const seed = (r * cols + c);
      const isLit = seed % 6 !== 4;
      const glow = glowColors[seed % glowColors.length];
      drawPixelWindow(ctx, wx, wy, winW, winH, isLit, glow, true);
    }
  }

  // Grand Double Doors
  const doorW = 58;
  const doorH = 46;
  const doorX = x + w / 2 - doorW / 2;
  const doorY = groundY - doorH;
  drawEntrancePortico(ctx, doorX, doorY, doorW, doorH, "#fbbf24");

  // Snow on cornice
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y + 21, w + 8, 6);
}

// 4. AuraSight (Edge-Native Voice Transaction Assistant)
export function drawAuraSight(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  drawBuildingMarquee(ctx, x, y, w, lm.projectNumber, "AURASIGHT", "EDGE VOICE ACCOUNTING", lm.signColor, time);

  // Modern Edge Multimodal Engineering Facility (Dark Slate & Emerald)
  ctx.fillStyle = "#111c16";
  ctx.fillRect(x, y + 25, w, h - 25);
  ctx.fillStyle = "#192b21";
  ctx.fillRect(x + 8, y + 33, w - 16, h - 33);

  // Rooftop Comms Mast with Pulsing Aircraft Warning Beacon
  ctx.fillStyle = "#475569";
  ctx.fillRect(x + 40, y + 4, 3, 22);
  ctx.fillRect(x + 36, y + 10, 11, 2);
  ctx.fillRect(x + 38, y + 16, 7, 2);
  const beaconBlink = Math.floor(time * 0.003) % 2 === 0;
  if (beaconBlink) {
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(x + 39, y + 2, 5, 5);
    ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
    ctx.beginPath();
    ctx.arc(x + 41, y + 4, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3 Floors of Sleek Ribbon Windows (Panoramic modern office/lab panes)
  const rows = 3;
  const ribbonYStarts = [y + 54, y + 104, y + 154];
  const ribbonW = w - 40;
  const ribbonH = 30;
  const ribbonX = x + 20;

  for (let r = 0; r < rows; r++) {
    const ry = ribbonYStarts[r];
    // Recessed horizontal ribbon band
    ctx.fillStyle = "#0c130f";
    ctx.fillRect(ribbonX - 2, ry - 2, ribbonW + 4, ribbonH + 4);

    // Multiple glazed segments in the ribbon
    const segments = 5;
    const segW = Math.floor(ribbonW / segments);
    for (let s = 0; s < segments; s++) {
      const sx = ribbonX + s * segW;
      const isLit = (r + s) % 4 !== 3;
      const glow = (r + s) % 2 === 0 ? "#00ff88" : "#5eead4";

      if (isLit) {
        ctx.fillStyle = glow;
        ctx.fillRect(sx, ry, segW - 2, ribbonH);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fillRect(sx, ry, segW - 2, 3);
      } else {
        ctx.fillStyle = "#112219";
        ctx.fillRect(sx, ry, segW - 2, ribbonH);
      }
    }

    // Snow on ribbon sill and lintel
    ctx.fillStyle = "#edf3fa";
    ctx.fillRect(ribbonX - 3, ry - 3, ribbonW + 6, 2);
    ctx.fillRect(ribbonX - 2, ry + ribbonH, ribbonW + 4, 3);
  }

  // Modern Security Glazed Entrance
  const doorW = 56;
  const doorH = 46;
  const doorX = x + w / 2 - doorW / 2;
  const doorY = groundY - doorH;
  drawEntrancePortico(ctx, doorX, doorY, doorW, doorH, "#00ff88");

  // Snow on cornice
  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y + 21, w + 8, 6);
}

/**
 * 5. Finale Pavilion: "Let's build together" (Matching Uploaded Image)
 */
export function drawConnectPavilion(ctx, lm, groundY, time, hoverX = null, hoverY = null) {
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

  // 3 Action Buttons Replica (Directly Clickable from the Street Board!)
  const btnY = cardY + 115;
  const btnH = 36;

  // Button 1: Send Email
  const btn1X = cardX + 16;
  const btn1W = 100;
  const isBtn1Hov = hoverX !== null && hoverY !== null &&
    hoverX >= btn1X && hoverX <= btn1X + btn1W && hoverY >= btnY && hoverY <= btnY + btnH;

  ctx.fillStyle = isBtn1Hov ? "#1e293b" : "#0f172a";
  ctx.beginPath();
  ctx.roundRect(btn1X, btnY, btn1W, btnH, 8);
  ctx.fill();
  if (isBtn1Hov) {
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.fillStyle = isBtn1Hov ? "#38bdf8" : "#ffffff";
  ctx.font = "bold 8px 'Silkscreen', monospace";
  ctx.fillText(isBtn1Hov ? "Compose ✉" : "Send Email ✉", btn1X + btn1W / 2, btnY + 22);

  // Button 2: Download CV (PDF)
  const btn2X = cardX + 126;
  const btn2W = 130;
  const isBtn2Hov = hoverX !== null && hoverY !== null &&
    hoverX >= btn2X && hoverX <= btn2X + btn2W && hoverY >= btnY && hoverY <= btnY + btnH;

  ctx.fillStyle = isBtn2Hov ? "#bae6fd" : "#e0f2fe";
  ctx.beginPath();
  ctx.roundRect(btn2X, btnY, btn2W, btnH, 8);
  ctx.fill();
  ctx.strokeStyle = isBtn2Hov ? "#0284c7" : "#38bdf8";
  ctx.lineWidth = isBtn2Hov ? 2.5 : 1.5;
  if (isBtn2Hov) {
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 10;
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = isBtn2Hov ? "#0369a1" : "#0284c7";
  ctx.fillText(isBtn2Hov ? "⬇ Get PDF CV" : "⬇ Download CV", btn2X + btn2W / 2, btnY + 22);

  // Button 3: Copy Email
  const btn3X = cardX + 266;
  const btn3W = 90;
  const isBtn3Hov = hoverX !== null && hoverY !== null &&
    hoverX >= btn3X && hoverX <= btn3X + btn3W && hoverY >= btnY && hoverY <= btnY + btnH;

  ctx.fillStyle = isBtn3Hov ? "#e2e8f0" : "#f1f5f9";
  ctx.beginPath();
  ctx.roundRect(btn3X, btnY, btn3W, btnH, 8);
  ctx.fill();
  if (isBtn3Hov) {
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.fillStyle = isBtn3Hov ? "#0f172a" : "#334155";
  ctx.fillText(isBtn3Hov ? "Copy 📋" : "Copy Email", btn3X + btn3W / 2, btnY + 22);

  // Footer: GitHub • LinkedIn • syedmuhammadayyanibrar@gmail.com
  const footY = cardY + cardH - 18;
  const isFootGh = hoverX !== null && hoverY !== null && hoverX >= cardX + 40 && hoverX <= cardX + 115 && Math.abs(hoverY - footY) < 14;
  const isFootLi = hoverX !== null && hoverY !== null && hoverX >= cardX + 130 && hoverX <= cardX + 220 && Math.abs(hoverY - footY) < 14;
  const isFootEm = hoverX !== null && hoverY !== null && hoverX >= cardX + 230 && hoverX <= cardX + 365 && Math.abs(hoverY - footY) < 14;

  ctx.font = "8px 'Silkscreen', monospace";
  ctx.fillStyle = isFootGh ? "#0284c7" : "#475569";
  ctx.fillText("GitHub", cardX + 75, footY);
  ctx.fillStyle = "#cbd5e1";
  ctx.fillText("•", cardX + 118, footY);
  ctx.fillStyle = isFootLi ? "#0284c7" : "#475569";
  ctx.fillText("LinkedIn", cardX + 165, footY);
  ctx.fillStyle = "#cbd5e1";
  ctx.fillText("•", cardX + 210, footY);
  ctx.fillStyle = isFootEm ? "#0284c7" : "#475569";
  ctx.fillText("syedmuhammadayyanibrar@gmail.com", cardX + 295, footY);

  ctx.fillStyle = "#edf3fa";
  ctx.fillRect(x - 4, y + 6, w + 8, 8);

  ctx.restore();
}

/**
 * Stray Cat (Mochi) on Fence with Detailed Animations, Paw Licking, & Meow Bubble
 */
export function drawCat(ctx, x, y, frameTick, isPlayerNear = false, petTimer = 0) {
  ctx.save();
  const t = frameTick;

  // Purr vibration when being petted
  const purrVibe = petTimer > 0 ? Math.sin(t * 0.9) * 0.8 : 0;
  ctx.translate(Math.round(x), Math.round(y + purrVibe));

  // Dynamic Tail Wag: faster & more excited when player is near or being petted
  const isExcited = isPlayerNear || petTimer > 0;
  const tailSpeed = isExcited ? 0.12 : 0.05;
  const tailAmp = isExcited ? 5.5 : 3.2;
  const tailWag = Math.sin(t * tailSpeed) * tailAmp;
  const breathe = Math.sin(t * 0.04) > 0.3 ? -1 : 0;

  // Licking paw cycle: happens every ~10 seconds (lasts ~3 seconds)
  const lickCycle = (t * 0.025) % 16;
  const isLicking = lickCycle > 6 && lickCycle < 11 && petTimer <= 0;
  const lickLick = Math.sin(t * 0.28);

  // Blinking: blink every ~4 seconds for brief moment
  const blinkCycle = (t * 0.03) % 12;
  const isBlinking = (blinkCycle > 5.7 && blinkCycle < 6.0) || petTimer > 0;

  // Ear twitch: twitches occasionally
  const earTwitch = Math.sin(t * 0.05) > 0.85 ? -1 : 0;

  // 1. Wooden Fence Perch underneath Mochi
  ctx.fillStyle = "#3d2817";
  ctx.fillRect(-22, 0, 46, 6);
  ctx.fillStyle = "#27190e";
  ctx.fillRect(-20, 6, 6, 26);
  ctx.fillRect(14, 6, 6, 26);
  // Snow caps on fence posts
  ctx.fillStyle = "rgba(240, 245, 255, 0.95)";
  ctx.fillRect(-23, -2, 12, 3);
  ctx.fillRect(13, -2, 12, 3);

  // 2. Multi-joint Swishing Tail
  const tailBaseX = -10;
  const tailBaseY = -6 + breathe;
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(tailBaseX - 3, tailBaseY - 2, 4, 6);
  ctx.fillRect(tailBaseX - 6 + tailWag * 0.4, tailBaseY - 7, 4, 6);
  ctx.fillStyle = "#e07a38"; // Calico orange tail patch
  ctx.fillRect(tailBaseX - 9 + tailWag * 0.8, tailBaseY - 12, 4, 6);
  ctx.fillStyle = "#ffffff"; // White tail tip
  ctx.fillRect(tailBaseX - 11 + tailWag * 1.2, tailBaseY - 16, 4, 5);

  // 3. Cat Body (Calico: dark charcoal, warm orange, soft white)
  // Back & Haunches
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(-12, -14 + breathe, 18, 14);
  // Calico orange patch on back
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(-8, -14 + breathe, 8, 9);
  // White fluffy chest & belly
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(-3, -8 + breathe, 9, 8);

  // 4. Back Paws & Front Paws
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-10, 0, 6, 3); // Left rear paw
  ctx.fillRect(-2, 0, 6, 3);  // Right rear paw

  if (isLicking) {
    // Left Front Paw: Lifted up to mouth / face to lick & clean face!
    const pawLickX = 3 + Math.cos(t * 0.3) * 1.5;
    const pawLickY = -15 + breathe + (lickLick > 0 ? -2 : 1);

    ctx.fillStyle = "#e07a38";
    ctx.fillRect(pawLickX - 2, pawLickY + 3, 3, 5); // Forearm

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(pawLickX, pawLickY, 4, 4); // Paw at cheek

    // Cute pink toe bean pad on the bottom of the lifted paw!
    ctx.fillStyle = "#ff88aa";
    ctx.fillRect(pawLickX + 1, pawLickY + 1, 2, 2);

    // Little pink tongue licking!
    if (lickLick > 0.15) {
      ctx.fillStyle = "#ff5588";
      ctx.fillRect(5, -16 + breathe, 2, 3);
    }
    // Right Front Paw: Resting calmly on fence
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(6, 0, 6, 3);
  } else {
    // Both front paws resting forward on the fence with cute little toe lines
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(4, 0, 5, 3);
    ctx.fillRect(10, 0, 5, 3);
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(6, 1, 1, 2);
    ctx.fillRect(12, 1, 1, 2);
  }

  // 5. Cat Head
  const headTilt = isLicking ? (lickLick > 0 ? 1 : 0) : 0;
  const headX = 4 + (isLicking ? -1 : 0);
  const headY = -20 + breathe + headTilt;

  // Head base (Dark Charcoal)
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(headX, headY, 12, 11);
  // Calico orange face marking (right side)
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(headX + 5, headY, 7, 8);
  // White muzzle
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(headX + 2, headY + 5, 7, 5);

  // Ears (Pointy cat ears with pink inner ear)
  // Left ear
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(headX + 1, headY - 4 + earTwitch, 4, 4);
  ctx.fillStyle = "#ff99bb";
  ctx.fillRect(headX + 2, headY - 2 + earTwitch, 2, 2);
  // Right ear
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(headX + 8, headY - 4, 4, 4);
  ctx.fillStyle = "#ff99bb";
  ctx.fillRect(headX + 9, headY - 2, 2, 2);

  // Pink nose
  ctx.fillStyle = "#ff5577";
  ctx.fillRect(headX + 5, headY + 6, 2, 2);

  // Whiskers (Delicate white pixel lines)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(headX - 3, headY + 6, 4, 1);
  ctx.fillRect(headX - 3, headY + 8, 4, 1);
  ctx.fillRect(headX + 10, headY + 6, 4, 1);
  ctx.fillRect(headX + 10, headY + 8, 4, 1);

  // Eyes
  if (isBlinking || petTimer > 0) {
    // Happy squinting eyes: `^  ^`
    ctx.fillStyle = "#1e1e24";
    ctx.fillRect(headX + 2, headY + 3, 3, 1);
    ctx.fillRect(headX + 7, headY + 3, 3, 1);
    ctx.fillRect(headX + 3, headY + 2, 1, 1);
    ctx.fillRect(headX + 8, headY + 2, 1, 1);
  } else {
    // Cute big emerald green feline eyes with dark slit pupils and reflections!
    ctx.fillStyle = "#00e699"; // Emerald green iris
    ctx.fillRect(headX + 2, headY + 2, 3, 3);
    ctx.fillRect(headX + 7, headY + 2, 3, 3);
    ctx.fillStyle = "#0a1017"; // Black slit pupil
    ctx.fillRect(headX + 3, headY + 2, 1, 3);
    ctx.fillRect(headX + 8, headY + 2, 1, 3);
    ctx.fillStyle = "#ffffff"; // Eye shine reflection
    ctx.fillRect(headX + 2, headY + 2, 1, 1);
    ctx.fillRect(headX + 7, headY + 2, 1, 1);
  }

  // Red Collar with golden bell
  ctx.fillStyle = "#ff2244";
  ctx.fillRect(headX + 1, headY + 10, 10, 2);
  ctx.fillStyle = "#ffcc00";
  ctx.fillRect(headX + 5, headY + 11, 2, 2);
  // Periodic golden bell sparkle
  if (Math.sin(t * 0.08) > 0.8) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(headX + 5, headY + 11, 1, 1);
  }

  // 6. Cute Pixel Speech Bubble: "MEOW!", "SLURP~", or "PURR~"
  const bubbleBob = Math.sin(t * 0.06) * 2;
  const bubbleY = headY - 26 + bubbleBob;
  let bubbleText = "MEOW!";
  if (petTimer > 0) {
    bubbleText = "PURR~ ❤️";
  } else if (isLicking) {
    bubbleText = "SLURP~ 🐾";
  } else if (isPlayerNear) {
    bubbleText = "MEOW! 🐾";
  }
  const bubbleColor = petTimer > 0 ? "#ff0077" : (isLicking ? "#ffaa00" : "#00ffcc");

  ctx.font = "bold 8px 'Press Start 2P', monospace";
  const bTextW = ctx.measureText(bubbleText).width;
  const bW = Math.max(48, bTextW + 12);
  const bH = 17;
  const bX = headX + 6 - bW / 2;

  // Bubble border & fill
  ctx.fillStyle = "#0b101c";
  ctx.fillRect(bX - 1, bubbleY - 1, bW + 2, bH + 2);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(bX, bubbleY, bW, bH);
  ctx.strokeStyle = bubbleColor;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(bX, bubbleY, bW, bH);

  // Speech bubble pointer down to Mochi's head
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(headX + 4, bubbleY + bH);
  ctx.lineTo(headX + 10, bubbleY + bH);
  ctx.lineTo(headX + 7, bubbleY + bH + 5);
  ctx.closePath();
  ctx.fill();

  // Speech bubble text
  ctx.fillStyle = petTimer > 0 ? "#ff0077" : "#0f172a";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(bubbleText, bX + bW / 2, bubbleY + bH / 2 + 1);

  // If petting, draw multiple floating hearts drifting up gracefully!
  if (petTimer > 0) {
    for (let h = 0; h < 4; h++) {
      const hProgress = ((t * 0.04 + h * 0.25) % 1);
      const hX = -6 + h * 9 + Math.sin(t * 0.09 + h * 1.5) * 5;
      const hY = headY - 18 - hProgress * 32;
      const hAlpha = 1 - hProgress;

      ctx.save();
      ctx.fillStyle = `rgba(255, 0, 119, ${hAlpha})`;
      ctx.font = "12px sans-serif";
      ctx.fillText("❤️", hX, hY);
      ctx.restore();
    }
  }

  ctx.restore();
}
