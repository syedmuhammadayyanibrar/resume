// src/pixelArt.js - Procedural 16-bit Pixel Sprites & Architectural Renderers

// Color Palettes for Themes
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
 * 16-Bit Player Character Renderer
 * Draws Syed Ayyan: dark jacket, fluttering emerald-teal scarf, beanie/hair, boots.
 * 8-frame walk cycle with realistic leg and arm swing, body bob, and wind physics on the scarf.
 */
export function drawCharacter(ctx, x, y, state) {
  // state: { facing: 1 | -1, isMoving: bool, isGrounded: bool, walkFrame: int, vy: float, breatheOffset: float }
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(state.facing, 1);

  const frame = state.isMoving && state.isGrounded ? Math.floor(state.walkFrame) % 8 : 0;
  const bob = state.isGrounded ? (state.isMoving ? (frame % 2 === 1 ? -1 : 0) : Math.round(state.breatheOffset)) : 0;

  // Jump leg tuck
  const jumpTuck = !state.isGrounded ? -2 : 0;

  // Colors
  const cHair = "#141419";
  const cSkin = "#e0a98b";
  const cSkinShadow = "#c2876b";
  const cCoat = "#1e2433";
  const cCoatHighlight = "#2d374d";
  const cCoatDark = "#131722";
  const cScarf = "#00d4a0";
  const cScarfDark = "#008f6b";
  const cPants = "#181d26";
  const cBoots = "#4a3528";
  const cBootTread = "#271c15";

  // Foot offsets for 8-frame walk cycle
  const legOffsets = [
    { leftX: -3, leftY: 0, rightX: 3, rightY: 0 },       // Frame 0: Passing
    { leftX: -5, leftY: -2, rightX: 4, rightY: 0 },      // Frame 1: Left high step
    { leftX: -6, leftY: 0, rightX: 5, rightY: 0 },       // Frame 2: Left stride max
    { leftX: -4, leftY: 0, rightX: 3, rightY: -1 },      // Frame 3: Left landing
    { leftX: 3, leftY: 0, rightX: -3, rightY: 0 },       // Frame 4: Passing opposite
    { leftX: 4, leftY: 0, rightX: -5, rightY: -2 },      // Frame 5: Right high step
    { leftX: 5, leftY: 0, rightX: -6, rightY: 0 },       // Frame 6: Right stride max
    { leftX: 3, leftY: -1, rightX: -4, rightY: 0 },      // Frame 7: Right landing
  ];

  const leg = state.isGrounded ? legOffsets[frame] : { leftX: -2, leftY: jumpTuck, rightX: 2, rightY: jumpTuck };

  // 1. Shadow underneath
  ctx.fillStyle = "rgba(10, 12, 20, 0.45)";
  const shadowWidth = state.isGrounded ? 18 : 12;
  ctx.beginPath();
  ctx.ellipse(0, 0, shadowWidth / 2, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Back Leg & Boot
  ctx.fillStyle = cPants;
  ctx.fillRect(leg.rightX - 2, -14 + leg.rightY, 4, 10);
  ctx.fillStyle = cBoots;
  ctx.fillRect(leg.rightX - 3, -4 + leg.rightY, 6, 4);
  ctx.fillStyle = cBootTread;
  ctx.fillRect(leg.rightX - 3, -1 + leg.rightY, 6, 1);

  // 3. Coat Body
  ctx.fillStyle = cCoatDark;
  ctx.fillRect(-6, -26 + bob, 11, 14);
  ctx.fillStyle = cCoat;
  ctx.fillRect(-5, -27 + bob, 10, 13);
  ctx.fillStyle = cCoatHighlight;
  ctx.fillRect(-4, -26 + bob, 2, 10);

  // Belt / Coat buttons
  ctx.fillStyle = "#ffaa00";
  ctx.fillRect(-1, -21 + bob, 2, 2);
  ctx.fillRect(-1, -17 + bob, 2, 2);

  // 4. Front Leg & Boot
  ctx.fillStyle = cPants;
  ctx.fillRect(leg.leftX - 2, -14 + leg.leftY, 4, 10);
  ctx.fillStyle = cBoots;
  ctx.fillRect(leg.leftX - 3, -4 + leg.leftY, 6, 4);
  ctx.fillStyle = cBootTread;
  ctx.fillRect(leg.leftX - 3, -1 + leg.leftY, 6, 1);

  // 5. Head & Face
  // Neck
  ctx.fillStyle = cSkinShadow;
  ctx.fillRect(-2, -30 + bob, 4, 3);
  // Face
  ctx.fillStyle = cSkin;
  ctx.fillRect(-4, -38 + bob, 8, 9);
  // Nose
  ctx.fillStyle = cSkinShadow;
  ctx.fillRect(3, -34 + bob, 2, 2);
  // Eye
  ctx.fillStyle = "#111";
  ctx.fillRect(1, -35 + bob, 2, 2);
  // Hair / Beanie
  ctx.fillStyle = cHair;
  ctx.fillRect(-5, -42 + bob, 10, 5);
  ctx.fillRect(-6, -39 + bob, 3, 5);
  ctx.fillRect(-2, -43 + bob, 6, 2);
  // Beanie fold
  ctx.fillStyle = "#333842";
  ctx.fillRect(-5, -39 + bob, 10, 2);

  // 6. Fluttering Scarf
  ctx.fillStyle = cScarf;
  ctx.fillRect(-5, -31 + bob, 10, 4);
  ctx.fillStyle = cScarfDark;
  ctx.fillRect(-4, -28 + bob, 8, 2);

  // Trailing scarf tail with wind flutter
  const windTail = Math.sin(Date.now() * 0.008) * 3;
  const runTail = state.isMoving ? -4 : 0;
  ctx.fillStyle = cScarf;
  ctx.fillRect(-8 + runTail, -29 + bob + windTail, 4, 8);
  ctx.fillRect(-11 + runTail, -26 + bob + windTail * 1.5, 4, 6);
  ctx.fillStyle = cScarfDark;
  ctx.fillRect(-12 + runTail, -21 + bob + windTail * 1.8, 3, 2);

  // 7. Front Arm
  const armSwing = state.isGrounded && state.isMoving ? Math.sin(state.walkFrame * Math.PI / 4) * 4 : 0;
  ctx.fillStyle = cCoat;
  ctx.fillRect(-1 + armSwing, -26 + bob, 4, 10);
  ctx.fillStyle = cSkin;
  ctx.fillRect(0 + armSwing, -16 + bob, 3, 3);

  ctx.restore();
}

/**
 * Stray Cat (Mochi) Pixel Sprite
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

  // Cat body (Warm calico/black & white)
  ctx.fillStyle = "#1e1e24"; // dark body
  ctx.fillRect(-10, -12 + breathe, 16, 12);
  ctx.fillStyle = "#e07a38"; // orange calico patch
  ctx.fillRect(-7, -12 + breathe, 6, 7);
  ctx.fillStyle = "#f5f5f5"; // white chest & paws
  ctx.fillRect(-2, -6 + breathe, 6, 6);
  ctx.fillRect(4, -3, 3, 3);
  ctx.fillRect(-9, -3, 3, 3);

  // Cat Head
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(3, -19 + breathe, 10, 9);
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(6, -19 + breathe, 4, 5);

  // Ears
  ctx.fillStyle = "#e07a38";
  ctx.fillRect(4, -22 + breathe, 3, 3);
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(10, -22 + breathe, 3, 3);
  ctx.fillStyle = "#ffb0b0";
  ctx.fillRect(5, -21 + breathe, 1, 2);

  // Eyes (Twinkling gold)
  const blink = (Math.floor(frameTick / 60) % 5 === 0) && (frameTick % 60 < 6);
  if (!blink) {
    ctx.fillStyle = "#ffdd44";
    ctx.fillRect(8, -16 + breathe, 2, 2);
    ctx.fillStyle = "#111";
    ctx.fillRect(9, -16 + breathe, 1, 2);
  } else {
    ctx.fillStyle = "#444";
    ctx.fillRect(8, -15 + breathe, 2, 1);
  }

  // Cute red collar with gold bell
  ctx.fillStyle = "#ff2244";
  ctx.fillRect(2, -10 + breathe, 3, 2);
  ctx.fillStyle = "#ffdd00";
  ctx.fillRect(3, -8 + breathe, 2, 2);

  // Tail
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(-13, -11 + breathe, 4, 4);
  ctx.fillRect(-16, -15 + breathe + tailWag, 4, 6);
  ctx.fillRect(-14, -18 + breathe + tailWag * 1.3, 4, 4);

  // Snow on fence
  ctx.fillStyle = "rgba(240, 245, 255, 0.9)";
  ctx.fillRect(-22, -2, 12, 3);
  ctx.fillRect(14, -2, 10, 3);

  ctx.restore();
}

/**
 * Architectural Building Renderers
 */

// 1. Cyber Kiosk / Newsstand (About Me)
export function drawKiosk(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Stall Main Frame
  ctx.fillStyle = "#2a1e17";
  ctx.fillRect(x, y + 40, w, h - 40);
  ctx.fillStyle = "#3e2c22";
  ctx.fillRect(x + 4, y + 44, w - 8, h - 48);

  // Slanted Striped Awning (Red & Cream)
  const stripes = 12;
  const stripeW = w / stripes;
  for (let i = 0; i < stripes; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#b32a2a" : "#eae0cf";
    ctx.fillRect(x + i * stripeW, y + 20, stripeW, 24);
  }
  // Snow piling on the awning roof
  ctx.fillStyle = "#e8eff7";
  ctx.fillRect(x - 4, y + 16, w + 8, 7);
  ctx.fillRect(x + 10, y + 13, w - 24, 4);

  // Glowing Neon Sign: "DAILY BYTES"
  const neonFlicker = Math.sin(time * 0.015) > -0.92 ? 1 : 0.4;
  ctx.save();
  ctx.shadowColor = "#ff7700";
  ctx.shadowBlur = 12 * neonFlicker;
  ctx.fillStyle = `rgba(255, 120, 20, ${neonFlicker})`;
  ctx.fillRect(x + 20, y + 2, w - 40, 14);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 9px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("DAILY BYTES", x + w / 2, y + 12);
  ctx.restore();

  // Newsstand Counter & Newspaper Racks
  ctx.fillStyle = "#1a120d";
  ctx.fillRect(x + 10, y + 70, w - 20, 50);

  // Newspaper stacks on counter
  for (let s = 0; s < 5; s++) {
    ctx.fillStyle = "#dfdacc";
    ctx.fillRect(x + 18 + s * 40, y + 80, 32, 38);
    // Newsprint lines
    ctx.fillStyle = "#222";
    ctx.fillRect(x + 22 + s * 40, y + 84, 24, 4);
    ctx.fillStyle = "#666";
    ctx.fillRect(x + 22 + s * 40, y + 92, 24, 2);
    ctx.fillRect(x + 22 + s * 40, y + 96, 20, 2);
    ctx.fillRect(x + 22 + s * 40, y + 100, 22, 2);
  }

  // Warm interior counter light
  const grad = ctx.createRadialGradient(x + w / 2, y + 75, 5, x + w / 2, y + 75, 80);
  grad.addColorStop(0, "rgba(255, 210, 130, 0.45)");
  grad.addColorStop(1, "rgba(255, 210, 130, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(x + 10, y + 60, w - 20, 65);

  // Steaming Coffee Cup on Counter
  ctx.fillStyle = "#eee";
  ctx.fillRect(x + w - 35, y + 76, 8, 8);
  ctx.fillStyle = "#5c3317";
  ctx.fillRect(x + w - 34, y + 75, 6, 2);
}

// 2. Neo-Central Rail Station (Experience)
export function drawMetro(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Station Brick Grand Structure
  ctx.fillStyle = "#2b2234";
  ctx.fillRect(x, y + 30, w, h - 30);
  ctx.fillStyle = "#3a2e47";
  ctx.fillRect(x + 8, y + 38, w - 16, h - 38);

  // Classic Brickwork Accents
  ctx.fillStyle = "#201729";
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 12; c++) {
      ctx.fillRect(x + 14 + c * 24 + (r % 2) * 12, y + 46 + r * 14, 18, 4);
    }
  }

  // Roof Cornice with Heavy Snowdrifts
  ctx.fillStyle = "#4a3b5a";
  ctx.fillRect(x - 8, y + 24, w + 16, 12);
  ctx.fillStyle = "#f0f5fc";
  ctx.fillRect(x - 12, y + 16, w + 24, 10);
  ctx.fillRect(x + 10, y + 10, w - 20, 7);

  // Illuminated Central Clock
  const clockX = x + w / 2;
  const clockY = y + 70;
  ctx.save();
  ctx.beginPath();
  ctx.arc(clockX, clockY, 20, 0, Math.PI * 2);
  ctx.fillStyle = "#fff8db";
  ctx.fill();
  ctx.strokeStyle = "#875f28";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Clock Hands (Tick slowly)
  const angle = (time * 0.0005) % (Math.PI * 2);
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(clockX, clockY);
  ctx.lineTo(clockX + Math.cos(angle) * 12, clockY + Math.sin(angle) * 12);
  ctx.stroke();
  ctx.restore();

  // Cyan Neon Header Sign: "NEO-CENTRAL STATION"
  ctx.save();
  ctx.shadowColor = "#00eeff";
  ctx.shadowBlur = 14;
  ctx.fillStyle = "#00eeff";
  ctx.font = "bold 9px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("NEO-CENTRAL STATION", x + w / 2, y + 115);
  ctx.restore();

  // Grand Arched Double Doors with Golden Interior Glow
  const doorX = x + w / 2 - 35;
  const doorY = y + 130;
  ctx.fillStyle = "#ffdd88";
  ctx.fillRect(doorX, doorY, 70, h - 130);
  ctx.fillStyle = "#472e1c"; // Door frame
  ctx.fillRect(doorX + 32, doorY, 6, h - 130);
  ctx.fillRect(doorX, doorY, 70, 5);

  // Warm light spill from the station entrance
  const lightSpill = ctx.createLinearGradient(doorX, doorY + 60, doorX, groundY + 20);
  lightSpill.addColorStop(0, "rgba(255, 220, 130, 0.45)");
  lightSpill.addColorStop(1, "rgba(255, 220, 130, 0)");
  ctx.fillStyle = lightSpill;
  ctx.fillRect(doorX - 25, doorY + 40, 120, groundY - (doorY + 40) + 15);
}

// 3. AI Data Center / Neural Labs (Project 1)
export function drawDataCenter(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Dark Slate Brutalist Concrete Blocks
  ctx.fillStyle = "#151821";
  ctx.fillRect(x, y + 25, w, h - 25);
  ctx.fillStyle = "#1e2230";
  ctx.fillRect(x + 6, y + 32, w - 12, h - 32);

  // Roof Snow Drift & Cooling Towers
  ctx.fillStyle = "#dce5f0";
  ctx.fillRect(x - 4, y + 18, w + 8, 9);

  // Rotating rooftop radar dish
  const dishAngle = Math.sin(time * 0.002) * 0.5;
  ctx.save();
  ctx.translate(x + 50, y + 16);
  ctx.rotate(dishAngle);
  ctx.fillStyle = "#7b889b";
  ctx.fillRect(-2, 0, 4, 12);
  ctx.beginPath();
  ctx.arc(0, 0, 14, Math.PI, 0, true);
  ctx.fillStyle = "#434e61";
  ctx.fill();
  ctx.restore();

  // Green Holographic Neon Sign: "NEURAL DATA LABS"
  ctx.save();
  ctx.shadowColor = "#00ff88";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#00ff88";
  ctx.font = "bold 9px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("NEURAL DATA LABS", x + w / 2, y + 54);
  ctx.restore();

  // Big Glass Server Rack Bay Windows
  const bayW = 75;
  const bayH = 120;
  for (let b = 0; b < 3; b++) {
    const bayX = x + 24 + b * 100;
    const bayY = y + 75;

    // Window frame
    ctx.fillStyle = "#0f1118";
    ctx.fillRect(bayX, bayY, bayW, bayH);
    ctx.fillStyle = "rgba(0, 255, 180, 0.08)";
    ctx.fillRect(bayX + 2, bayY + 2, bayW - 4, bayH - 4);

    // Server blade units inside
    for (let s = 0; s < 7; s++) {
      const rackY = bayY + 6 + s * 16;
      ctx.fillStyle = "#1b212c";
      ctx.fillRect(bayX + 6, rackY, bayW - 12, 12);

      // Flickering server activity LEDs
      const ledTick = Math.floor(time * 0.008 + b * 7 + s * 3);
      for (let l = 0; l < 4; l++) {
        const isGreen = (ledTick + l) % 3 === 0;
        ctx.fillStyle = isGreen ? "#00ff66" : ((ledTick + l) % 5 === 0 ? "#00ccff" : "#ffaa00");
        ctx.fillRect(bayX + 12 + l * 8, rackY + 4, 4, 4);
      }
    }
  }

  // Cyan fiber-optic glow conduit along the base
  ctx.fillStyle = "#00ddff";
  ctx.shadowColor = "#00ddff";
  ctx.shadowBlur = 8;
  ctx.fillRect(x + 10, groundY - 6, w - 20, 3);
}

// 4. Quantum Vault / Fintech Bank (Project 2)
export function drawBank(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Classical Neo-Deco Stone Facade
  ctx.fillStyle = "#272a38";
  ctx.fillRect(x, y + 40, w, h - 40);

  // Pediment Roof Triangle & Snow
  ctx.fillStyle = "#3a3e52";
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 40);
  ctx.lineTo(x + w / 2, y + 8);
  ctx.lineTo(x + w + 10, y + 40);
  ctx.fill();
  ctx.fillStyle = "#e2eaf5";
  ctx.beginPath();
  ctx.moveTo(x - 14, y + 40);
  ctx.lineTo(x + w / 2, y + 4);
  ctx.lineTo(x + w + 14, y + 40);
  ctx.lineTo(x + w + 10, y + 45);
  ctx.lineTo(x + w / 2, y + 12);
  ctx.lineTo(x - 10, y + 45);
  ctx.fill();

  // Golden Deco Vault Medallion
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + w / 2, y + 28, 12, 0, Math.PI * 2);
  ctx.fillStyle = "#ffd700";
  ctx.shadowColor = "#ffd700";
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.fillStyle = "#222";
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("QV", x + w / 2, y + 28);
  ctx.restore();

  // Scrolling Financial LED Ticker Tape
  ctx.fillStyle = "#0f1118";
  ctx.fillRect(x + 10, y + 48, w - 20, 18);
  ctx.save();
  ctx.beginPath();
  ctx.rect(x + 10, y + 48, w - 20, 18);
  ctx.clip();
  const tickerText = "BTC +5.2%  ETH +3.8%  TPS: 124,000  P99: 3.8ms  RECON: 0 DELTA  AEGISPAY ONLINE  ";
  const tickerOffset = (time * 0.05) % 450;
  ctx.fillStyle = "#00ff88";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.fillText(tickerText, x + 20 - tickerOffset, y + 61);
  ctx.fillText(tickerText, x + 20 - tickerOffset + 450, y + 61);
  ctx.restore();

  // Fluted Classical Pillars (4 pillars)
  for (let p = 0; p < 4; p++) {
    const px = x + 30 + p * 85;
    ctx.fillStyle = "#4a4f66";
    ctx.fillRect(px, y + 74, 22, h - 80);
    ctx.fillStyle = "#656c8a";
    ctx.fillRect(px + 3, y + 74, 5, h - 80);
  }

  // Golden Vault Blast Door at Center
  const vX = x + w / 2 - 35;
  const vY = y + 105;
  ctx.fillStyle = "#1a1c24";
  ctx.fillRect(vX, vY, 70, h - 110);
  ctx.beginPath();
  ctx.arc(vX + 35, vY + 45, 26, 0, Math.PI * 2);
  ctx.fillStyle = "#d4af37";
  ctx.fill();
  ctx.strokeStyle = "#8c721f";
  ctx.lineWidth = 4;
  ctx.stroke();
  // Spokes
  for (let s = 0; s < 6; s++) {
    const spokeA = (s * Math.PI / 3) + (time * 0.001);
    ctx.beginPath();
    ctx.moveTo(vX + 35, vY + 45);
    ctx.lineTo(vX + 35 + Math.cos(spokeA) * 22, vY + 45 + Math.sin(spokeA) * 22);
    ctx.stroke();
  }
}

// 5. EchoSphere Broadcast Hub (Project 3)
export function drawBroadcast(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Station Building Base
  ctx.fillStyle = "#221929";
  ctx.fillRect(x, y + 60, w, h - 60);
  ctx.fillStyle = "#31233b";
  ctx.fillRect(x + 6, y + 68, w - 12, h - 68);

  // Roof Snow Drift
  ctx.fillStyle = "#e3ecf5";
  ctx.fillRect(x - 4, y + 54, w + 8, 8);

  // Huge Broadcast Lattice Antenna Mast
  const mastX = x + w / 2;
  const mastBaseY = y + 54;
  ctx.strokeStyle = "#725b82";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(mastX - 16, mastBaseY);
  ctx.lineTo(mastX, y - 45);
  ctx.lineTo(mastX + 16, mastBaseY);
  // Cross bracing
  for (let c = 0; c < 5; c++) {
    const cy = mastBaseY - c * 18;
    ctx.moveTo(mastX - 14 + c * 2, cy);
    ctx.lineTo(mastX + 14 - c * 2, cy);
  }
  ctx.stroke();

  // Blinking Red Aviation Beacon Light at the mast tip
  const beaconBlink = Math.sin(time * 0.006) > 0;
  ctx.save();
  ctx.beginPath();
  ctx.arc(mastX, y - 46, 4, 0, Math.PI * 2);
  ctx.fillStyle = beaconBlink ? "#ff0033" : "#660011";
  ctx.shadowColor = "#ff0033";
  ctx.shadowBlur = beaconBlink ? 14 : 0;
  ctx.fill();
  ctx.restore();

  // Pulsing Radio Waves radiating from mast
  const waveRadius = ((time * 0.04) % 60) + 10;
  const waveAlpha = Math.max(0, 1 - waveRadius / 70);
  ctx.strokeStyle = `rgba(255, 0, 119, ${waveAlpha * 0.7})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(mastX, y - 46, waveRadius, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();

  // Neon "ON AIR" Sign
  ctx.save();
  ctx.shadowColor = "#ff0055";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "#ff0055";
  ctx.fillRect(x + 24, y + 74, 52, 16);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 8px 'Press Start 2P', monospace";
  ctx.fillText("ON AIR", x + 30, y + 86);
  ctx.restore();

  // Studio Soundproof Window with Audio Waveform
  const winX = x + 24;
  const winY = y + 102;
  const winW = w - 48;
  const winH = 80;
  ctx.fillStyle = "#120917";
  ctx.fillRect(winX, winY, winW, winH);
  ctx.strokeStyle = "#4d2959";
  ctx.strokeRect(winX, winY, winW, winH);

  // Animated Audio Visualizer inside window
  ctx.fillStyle = "#ff0077";
  for (let b = 0; b < 16; b++) {
    const barH = 10 + Math.abs(Math.sin(time * 0.008 + b * 0.6)) * 45;
    ctx.fillRect(winX + 12 + b * 14, winY + winH - barH - 8, 8, barH);
  }
}

// 6. 8-Bit Forge Pixel Arcade (Project 4)
export function drawArcade(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Dark retro arcade building
  ctx.fillStyle = "#181024";
  ctx.fillRect(x, y + 36, w, h - 36);

  // Snow on roof
  ctx.fillStyle = "#e5eff8";
  ctx.fillRect(x - 6, y + 28, w + 12, 10);

  // Glowing Marquee Sign: "8-BIT FORGE"
  const colorShift = Math.floor(time * 0.003) % 3;
  const marqueeColor = colorShift === 0 ? "#ff00ff" : (colorShift === 1 ? "#00ffff" : "#ffea00");
  ctx.save();
  ctx.shadowColor = marqueeColor;
  ctx.shadowBlur = 16;
  ctx.fillStyle = marqueeColor;
  ctx.fillRect(x + 16, y + 45, w - 32, 26);
  ctx.fillStyle = "#110022";
  ctx.font = "bold 10px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("8-BIT FORGE", x + w / 2, y + 62);
  ctx.restore();

  // Glass Window with Arcade Cabinets inside
  const winX = x + 20;
  const winY = y + 85;
  const winW = w - 40;
  const winH = 105;
  ctx.fillStyle = "#0c0614";
  ctx.fillRect(winX, winY, winW, winH);

  // 3 Mini Arcade Cabinets in the window
  for (let c = 0; c < 3; c++) {
    const cabX = winX + 18 + c * 75;
    const cabY = winY + 15;
    ctx.fillStyle = c === 0 ? "#990033" : (c === 1 ? "#006699" : "#663399");
    ctx.fillRect(cabX, cabY, 45, 80);

    // Glowing CRT screen inside cabinet
    const scrFlicker = (time * 0.01 + c) % 2 > 1 ? "#00ffcc" : "#ff00aa";
    ctx.fillStyle = scrFlicker;
    ctx.fillRect(cabX + 6, cabY + 12, 33, 28);

    // Joystick & Buttons
    ctx.fillStyle = "#ffdd00";
    ctx.fillRect(cabX + 12, cabY + 48, 4, 6);
    ctx.fillStyle = "#ff0033";
    ctx.fillRect(cabX + 26, cabY + 50, 4, 4);
    ctx.fillRect(cabX + 32, cabY + 48, 4, 4);
  }

  // Neon "INSERT COIN" glowing sign
  const coinBlink = Math.floor(time * 0.002) % 2 === 0;
  if (coinBlink) {
    ctx.fillStyle = "#ffdd00";
    ctx.font = "7px 'Press Start 2P', monospace";
    ctx.fillText("INSERT COIN", x + w / 2, y + winH + 105);
  }
}

// 7. Red Telephone Booth & Post Box (Contact)
export function drawPhoneBooth(ctx, lm, groundY, time) {
  const x = lm.x;
  const y = groundY - lm.height;
  const w = lm.width;
  const h = lm.height;

  // Phone Booth Box (Classic British / Neo-Tokyo Red)
  const boothX = x + 25;
  const boothW = 75;
  const boothH = 175;
  const boothY = groundY - boothH;

  // Dome Roof with Snow
  ctx.fillStyle = "#b81d24";
  ctx.beginPath();
  ctx.arc(boothX + boothW / 2, boothY + 8, boothW / 2, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = "#f0f5fb";
  ctx.beginPath();
  ctx.arc(boothX + boothW / 2, boothY + 5, boothW / 2 + 3, Math.PI, 0);
  ctx.fill();

  // Outer Red Structure
  ctx.fillStyle = "#cc242c";
  ctx.fillRect(boothX, boothY + 8, boothW, boothH - 8);

  // Interior Yellow Glow
  ctx.fillStyle = "rgba(255, 230, 140, 0.75)";
  ctx.fillRect(boothX + 8, boothY + 24, boothW - 16, boothH - 34);

  // Glass Window Panes (3x4 grid)
  ctx.strokeStyle = "#8f1319";
  ctx.lineWidth = 3;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      ctx.strokeRect(boothX + 10 + c * 18, boothY + 30 + r * 28, 18, 28);
    }
  }

  // Phone Handset & Coin Box Silhouette
  ctx.fillStyle = "#1e1e24";
  ctx.fillRect(boothX + 28, boothY + 55, 18, 30);
  ctx.fillRect(boothX + 34, boothY + 50, 6, 40); // Handset

  // Royal Red Post Box next to Booth
  const boxX = x + 120;
  const boxW = 34;
  const boxH = 75;
  const boxY = groundY - boxH;

  // Dome & Snow
  ctx.fillStyle = "#a81920";
  ctx.beginPath();
  ctx.arc(boxX + boxW / 2, boxY + 8, boxW / 2, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = "#edf3fa";
  ctx.beginPath();
  ctx.arc(boxX + boxW / 2, boxY + 5, boxW / 2 + 2, Math.PI, 0);
  ctx.fill();

  // Cylindrical Body
  ctx.fillStyle = "#c41e25";
  ctx.fillRect(boxX, boxY + 8, boxW, boxH - 8);
  // Mail Slot
  ctx.fillStyle = "#111";
  ctx.fillRect(boxX + 6, boxY + 24, boxW - 12, 4);
  // Gold Royal Monogram / Emblem
  ctx.fillStyle = "#ffdd44";
  ctx.fillRect(boxX + boxW / 2 - 3, boxY + 38, 6, 8);
}
