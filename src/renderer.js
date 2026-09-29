// src/renderer.js - 60FPS Multi-Layer Parallax & Atmospheric 16-Bit Engine

import { PALETTES, drawCharacter, drawCat, drawKiosk, drawMetro, drawDataCenter, drawBank, drawBroadcast, drawArcade, drawPhoneBooth } from "./pixelArt.js";
import { LANDMARKS, STREET_TOTAL_WIDTH } from "./data.js";

export class WorldRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.currentThemeKey = "dusk";
    this.theme = PALETTES.dusk;

    // Ground level baseline (relative to screen height)
    this.groundY = Math.round(this.height * 0.72);

    // Initialize atmospheric simulation elements
    this.initStars();
    this.initClouds();
    this.initSnowflakes();
    this.initUtilityPoles();
    this.initTrees();
    this.initSteamVents();

    // Decals & Dynamic Particles
    this.footsteps = []; // { x, y, opacity, facing, createdAt }
    this.steamParticles = [];
    this.breathParticles = [];
    this.footPoofs = [];
    this.raveParticles = [];

    // Passing Train Animation state
    this.train = {
      active: true,
      x: -600,
      speed: 14,
      intervalTimer: 0,
    };

    // Click-to-move destination marker
    this.destinationMarker = null; // { x, timer }

    // Easter Egg Konami Rave mode
    this.isRaveMode = false;
    this.raveHue = 0;

    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.imageSmoothingEnabled = false; // Authentic crisp 16-bit pixel aesthetics

    this.groundY = Math.round(this.height * 0.72);
  }

  setTheme(themeKey) {
    if (PALETTES[themeKey]) {
      this.currentThemeKey = themeKey;
      this.theme = PALETTES[themeKey];
    }
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 110; i++) {
      this.stars.push({
        x: Math.random() * 3200,
        y: Math.random() * (this.height * 0.45),
        size: Math.random() > 0.8 ? 2 : 1,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinkleOffset: Math.random() * Math.PI * 2,
        brightness: 0.4 + Math.random() * 0.6,
      });
    }
  }

  initClouds() {
    this.clouds = [];
    for (let i = 0; i < 9; i++) {
      this.clouds.push({
        x: i * 400 + Math.random() * 200,
        y: 20 + Math.random() * (this.height * 0.3),
        w: 140 + Math.random() * 120,
        h: 24 + Math.random() * 16,
        speed: 0.12 + Math.random() * 0.18,
        alpha: 0.15 + Math.random() * 0.18,
      });
    }
  }

  initSnowflakes() {
    // Layer 1: Background small micro flakes (180 particles)
    this.bgSnow = [];
    for (let i = 0; i < 180; i++) {
      this.bgSnow.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() > 0.7 ? 2 : 1,
        speedY: 0.8 + Math.random() * 1.2,
        speedX: -0.4 + Math.random() * 0.8,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    // Layer 2: Foreground chunky swirling flakes (90 particles)
    this.fgSnow = [];
    for (let i = 0; i < 90; i++) {
      this.fgSnow.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 2.2 + Math.random() * 1.8,
        speedY: 1.8 + Math.random() * 2.2,
        speedX: -1.2 + Math.random() * 1.8,
        wobble: Math.random() * Math.PI * 2,
      });
    }
  }

  initUtilityPoles() {
    this.utilityPoles = [];
    for (let x = 200; x < STREET_TOTAL_WIDTH; x += 550) {
      this.utilityPoles.push({ x, height: 180 });
    }
  }

  initTrees() {
    this.trees = [];
    for (let x = 320; x < STREET_TOTAL_WIDTH; x += 680) {
      this.trees.push({
        x,
        h: 120 + Math.random() * 30,
        seed: Math.random(),
      });
    }
  }

  initSteamVents() {
    this.steamVents = [
      { x: 380, width: 28 },
      { x: 1540, width: 32 },
      { x: 2280, width: 30 },
      { x: 2920, width: 28 },
      { x: 3560, width: 34 },
      { x: 4120, width: 30 },
    ];
  }

  addFootstep(x, y, facing) {
    this.footsteps.push({
      x,
      y,
      opacity: 1.0,
      facing,
      createdAt: performance.now(),
    });
    if (this.footsteps.length > 70) {
      this.footsteps.shift();
    }
  }

  addFootPoof(x, y) {
    for (let i = 0; i < 4; i++) {
      this.footPoofs.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y - 2,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -0.8 - Math.random() * 1.0,
        size: 2 + Math.random() * 2,
        alpha: 0.8,
      });
    }
  }

  addBreathPuff(x, y, facing) {
    for (let i = 0; i < 5; i++) {
      this.breathParticles.push({
        x: x + facing * 8,
        y: y - 34,
        vx: facing * (0.6 + Math.random() * 0.8),
        vy: -0.3 - Math.random() * 0.4,
        size: 2.5 + Math.random() * 2,
        alpha: 0.7,
      });
    }
  }

  triggerRaveMode() {
    this.isRaveMode = true;
    for (let i = 0; i < 80; i++) {
      this.raveParticles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        size: 3 + Math.random() * 4,
        hue: Math.random() * 360,
        alpha: 1,
      });
    }
  }

  // 1. Far Sky & Celestial Layer
  drawSky(time) {
    const ctx = this.ctx;
    const t = this.theme;

    // Dusky vertical gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, this.groundY);
    skyGrad.addColorStop(0, t.skyTop);
    skyGrad.addColorStop(0.45, t.skyMid);
    skyGrad.addColorStop(0.85, t.skyBottom);
    skyGrad.addColorStop(1, t.skyGaze);

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Drifting smog / cloud bands
    ctx.save();
    for (const c of this.clouds) {
      c.x += c.speed;
      if (c.x > 3600) c.x = -200;

      const scrX = ((c.x - time * 0.02) % (this.width + 400)) - 100;
      ctx.fillStyle = t.skyHaze;
      ctx.beginPath();
      ctx.ellipse(scrX, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Twinkling Pixel Stars
    ctx.save();
    for (const s of this.stars) {
      const alpha = s.brightness * (0.6 + 0.4 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset));
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fillRect(s.x % this.width, s.y, s.size, s.size);
    }

    // Crescent Moon with Atmospheric Halo
    const moonX = this.width * 0.82;
    const moonY = this.height * 0.16;

    // Soft Halo
    const halo = ctx.createRadialGradient(moonX, moonY, 12, moonX, moonY, 48);
    halo.addColorStop(0, "rgba(255, 245, 220, 0.28)");
    halo.addColorStop(1, "rgba(255, 245, 220, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 48, 0, Math.PI * 2);
    ctx.fill();

    // Pixel Moon Arc
    ctx.fillStyle = "#fff8db";
    ctx.beginPath();
    ctx.arc(moonX, moonY, 14, 0, Math.PI * 2);
    ctx.fill();
    // Mask out crescent shadow
    ctx.fillStyle = t.skyTop;
    ctx.beginPath();
    ctx.arc(moonX - 5, moonY - 3, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 2. Far Skyline Silhouettes (Parallax Factor: 0.14)
  drawFarSkyline(cameraX, time) {
    const ctx = this.ctx;
    const t = this.theme;
    const parallax = cameraX * 0.12;

    ctx.save();
    ctx.fillStyle = t.farSkyline;

    // Distant Skyscrapers & Towers
    const numBuildings = 36;
    for (let i = 0; i < numBuildings; i++) {
      const bx = (i * 130 - parallax) % (this.width + 300) - 150;
      const bw = 85 + (i * 37) % 55;
      const bh = 140 + (i * 83) % 190;
      const by = this.groundY - bh - 40;

      ctx.fillRect(bx, by, bw, bh + 50);

      // Distant blinking antenna masts on top
      if (i % 3 === 0) {
        const mastX = bx + bw / 2;
        ctx.fillRect(mastX - 1, by - 35, 2, 35);
        // Beacon light
        const blink = Math.sin(time * 0.005 + i) > 0;
        ctx.fillStyle = blink ? "#ff2244" : "#440011";
        ctx.fillRect(mastX - 2, by - 37, 4, 3);
        ctx.fillStyle = t.farSkyline;
      }

      // Lit Windows grid
      if (i % 2 === 0) {
        for (let wy = by + 20; wy < this.groundY - 50; wy += 14) {
          for (let wx = bx + 12; wx < bx + bw - 12; wx += 14) {
            const lit = ((i * 31 + wx * 7 + wy * 13) % 11) > 4;
            if (lit) {
              const winColor = (i + wx) % 7 === 0 ? "rgba(0, 240, 255, 0.45)" : "rgba(255, 225, 140, 0.45)";
              ctx.fillStyle = winColor;
              ctx.fillRect(wx, wy, 4, 6);
            }
          }
        }
        ctx.fillStyle = t.farSkyline;
      }
    }

    // Suspension Bridge Truss in Distance
    const bridgeX = (2400 - parallax) % (this.width + 1200) - 600;
    ctx.strokeStyle = t.farSkyline;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bridgeX, this.groundY - 40);
    ctx.lineTo(bridgeX + 200, this.groundY - 140);
    ctx.lineTo(bridgeX + 400, this.groundY - 40);
    ctx.stroke();

    ctx.restore();
  }

  // 3. Midground Skyline & Elevated Rail (Parallax Factor: 0.28)
  drawMidSkyline(cameraX, time) {
    const ctx = this.ctx;
    const t = this.theme;
    const parallax = cameraX * 0.28;

    ctx.save();
    ctx.fillStyle = t.midSkyline;

    // Mid-tier industrial rooftops, water towers, HVAC units
    const numBlocks = 28;
    for (let i = 0; i < numBlocks; i++) {
      const bx = (i * 190 - parallax) % (this.width + 400) - 200;
      const bw = 120 + (i * 29) % 70;
      const bh = 90 + (i * 53) % 110;
      const by = this.groundY - bh - 20;

      ctx.fillRect(bx, by, bw, bh + 30);

      // Water tower on roof
      if (i % 4 === 1) {
        const twX = bx + 25;
        const twY = by - 30;
        ctx.fillRect(twX, twY, 26, 22);
        ctx.fillRect(twX + 2, twY + 22, 4, 9);
        ctx.fillRect(twX + 20, twY + 22, 4, 9);
      }
    }

    // Elevated Railway Trestle spanning the city
    const railY = this.groundY - 110;
    ctx.fillStyle = "#1e142e";
    ctx.fillRect(0, railY, this.width, 10);
    // Steel truss pillars
    for (let px = (0 - parallax) % 300 - 100; px < this.width + 100; px += 300) {
      ctx.fillRect(px, railY + 10, 16, this.groundY - (railY + 10));
    }

    // High-Speed 8-Bit Bullet Train passing occasionally
    this.train.intervalTimer += 1;
    if (this.train.intervalTimer > 420) {
      this.train.x += this.train.speed;
      const trainScreenX = this.train.x - parallax;

      if (trainScreenX > -400 && trainScreenX < this.width + 400) {
        // Train Body
        ctx.fillStyle = "#e0e6ed";
        ctx.fillRect(trainScreenX, railY - 18, 380, 18);
        ctx.fillStyle = "#00bbff";
        ctx.fillRect(trainScreenX, railY - 10, 380, 3);

        // Lit Passenger Windows
        for (let w = 0; w < 16; w++) {
          ctx.fillStyle = "rgba(255, 230, 130, 0.85)";
          ctx.fillRect(trainScreenX + 16 + w * 22, railY - 16, 12, 5);
        }
      }

      if (this.train.x > STREET_TOTAL_WIDTH + 800) {
        this.train.x = -600;
        this.train.intervalTimer = 0;
      }
    }

    ctx.restore();
  }

  // 4. Midground Props: Bare Winter Trees & Utility Poles with Sagging Wires
  drawMidgroundProps(cameraX, time) {
    const ctx = this.ctx;

    // Bare Winter Trees
    ctx.save();
    for (const tree of this.trees) {
      const scrX = tree.x - cameraX;
      if (scrX < -80 || scrX > this.width + 80) continue;

      const treeY = this.groundY;
      ctx.fillStyle = "#2c211a";
      // Trunk
      ctx.fillRect(scrX - 3, treeY - tree.h, 6, tree.h);

      // Main branches with snow
      const bAngles = [-0.6, 0.5, -0.4, 0.7, -0.8];
      bAngles.forEach((ang, idx) => {
        const branchStartY = treeY - tree.h + 20 + idx * 16;
        const bLen = 28 + (idx % 2) * 12;
        const bx = scrX + Math.cos(ang) * bLen;
        const by = branchStartY + Math.sin(ang) * bLen;

        ctx.strokeStyle = "#2c211a";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(scrX, branchStartY);
        ctx.lineTo(bx, by);
        ctx.stroke();

        // Snow along the top of each branch
        ctx.strokeStyle = "#edf3fa";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(scrX, branchStartY - 2);
        ctx.lineTo(bx, by - 2);
        ctx.stroke();
      });
    }

    // Utility Poles & Dangling Catenary Power Cables
    for (let i = 0; i < this.utilityPoles.length; i++) {
      const pole = this.utilityPoles[i];
      const scrX = pole.x - cameraX;
      if (scrX < -150 || scrX > this.width + 150) continue;

      const poleTopY = this.groundY - pole.height;

      // Wooden Pole Mast
      ctx.fillStyle = "#221710";
      ctx.fillRect(scrX - 3, poleTopY, 6, pole.height);

      // Crossarms with ceramic insulators
      ctx.fillRect(scrX - 22, poleTopY + 12, 44, 4);
      ctx.fillRect(scrX - 16, poleTopY + 28, 32, 4);

      // Transformer cylinder
      ctx.fillStyle = "#3e4450";
      ctx.fillRect(scrX + 5, poleTopY + 36, 14, 22);

      // Connect catenary wires to next pole
      if (i < this.utilityPoles.length - 1) {
        const nextPole = this.utilityPoles[i + 1];
        const nextScrX = nextPole.x - cameraX;

        ctx.strokeStyle = "rgba(20, 20, 30, 0.85)";
        ctx.lineWidth = 1.2;

        // Wire 1
        ctx.beginPath();
        ctx.moveTo(scrX - 20, poleTopY + 12);
        ctx.quadraticCurveTo(
          (scrX + nextScrX) / 2,
          poleTopY + 12 + 35,
          nextScrX - 20,
          poleTopY + 12
        );
        ctx.stroke();

        // Wire 2
        ctx.beginPath();
        ctx.moveTo(scrX + 20, poleTopY + 12);
        ctx.quadraticCurveTo(
          (scrX + nextScrX) / 2,
          poleTopY + 12 + 28,
          nextScrX + 20,
          poleTopY + 12
        );
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // 5. Steam Vents & Animated Pixel Steam
  drawSteamVents(cameraX, time) {
    const ctx = this.ctx;
    const t = this.theme;

    // Emit new steam particles periodically
    for (const v of this.steamVents) {
      if (Math.random() > 0.4) {
        this.steamParticles.push({
          x: v.x + (Math.random() - 0.5) * v.width,
          y: this.groundY - 2,
          vx: 0.15 + (Math.random() - 0.5) * 0.35,
          vy: -0.8 - Math.random() * 0.9,
          size: 3 + Math.random() * 4,
          maxSize: 16 + Math.random() * 12,
          alpha: 0.45,
          life: 0,
          maxLife: 60 + Math.random() * 40,
        });
      }

      // Draw sidewalk manhole grate
      const scrX = v.x - cameraX;
      if (scrX > -50 && scrX < this.width + 50) {
        ctx.fillStyle = "#1e2129";
        ctx.fillRect(scrX - v.width / 2, this.groundY - 2, v.width, 4);
        ctx.fillStyle = "#454d5e";
        for (let g = 0; g < 4; g++) {
          ctx.fillRect(scrX - v.width / 2 + 3 + g * 7, this.groundY - 2, 3, 4);
        }
      }
    }

    // Update and render steam particles
    ctx.save();
    for (let i = this.steamParticles.length - 1; i >= 0; i--) {
      const p = this.steamParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.size += (p.maxSize - p.size) * 0.04;
      p.life += 1;
      p.alpha = Math.max(0, 0.45 * (1 - p.life / p.maxLife));

      const scrX = p.x - cameraX;
      if (scrX > -40 && scrX < this.width + 40 && p.alpha > 0.01) {
        ctx.fillStyle = t.steamColor.replace(/[\d\.]+\)$/, `${p.alpha})`);
        ctx.beginPath();
        ctx.arc(scrX, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (p.life >= p.maxLife) {
        this.steamParticles.splice(i, 1);
      }
    }
    ctx.restore();
  }

  // 6. Landmark Buildings Dispatcher
  drawLandmarks(cameraX, time) {
    const ctx = this.ctx;
    for (const lm of LANDMARKS) {
      const scrX = lm.x - cameraX;
      // Frustum culling: only draw if in view
      if (scrX + lm.width < -100 || scrX > this.width + 100) continue;

      ctx.save();
      ctx.translate(-cameraX, 0);

      switch (lm.type) {
        case "kiosk":
          drawKiosk(ctx, lm, this.groundY, time);
          break;
        case "metro":
          drawMetro(ctx, lm, this.groundY, time);
          break;
        case "datacenter":
          drawDataCenter(ctx, lm, this.groundY, time);
          break;
        case "bank":
          drawBank(ctx, lm, this.groundY, time);
          break;
        case "broadcast":
          drawBroadcast(ctx, lm, this.groundY, time);
          break;
        case "arcade":
          drawArcade(ctx, lm, this.groundY, time);
          break;
        case "cat":
          drawCat(ctx, lm.x, this.groundY, time * 0.06);
          break;
        case "phonebooth":
          drawPhoneBooth(ctx, lm, this.groundY, time);
          break;
      }
      ctx.restore();
    }
  }

  // 7. Foreground Sidewalk, Snow Footsteps, Neon Puddles & Streetlamps
  drawSidewalk(cameraX, time) {
    const ctx = this.ctx;
    const t = this.theme;
    const groundY = this.groundY;

    // Sidewalk Slab & Snow Surface
    ctx.fillStyle = t.snowSidewalk;
    ctx.fillRect(0, groundY, this.width, this.height - groundY);

    // Curb edge line
    ctx.fillStyle = t.curbColor;
    ctx.fillRect(0, groundY + 45, this.width, 6);
    // Lower asphalt street line
    ctx.fillStyle = "#161922";
    ctx.fillRect(0, groundY + 51, this.width, this.height - (groundY + 51));

    // Snowdrifts along the building edges
    ctx.fillStyle = t.snowSidewalkDrift;
    for (let x = - (cameraX % 40); x < this.width + 40; x += 40) {
      ctx.beginPath();
      ctx.ellipse(x, groundY + 2, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Footstep Imprints in the Snow (with gradual decay)
    ctx.save();
    for (let i = this.footsteps.length - 1; i >= 0; i--) {
      const step = this.footsteps[i];
      // Slow fade over 35 seconds
      const age = (performance.now() - step.createdAt) / 1000;
      step.opacity = Math.max(0, 1 - age / 35);

      const scrX = step.x - cameraX;
      if (scrX > -20 && scrX < this.width + 20 && step.opacity > 0.05) {
        ctx.fillStyle = `rgba(30, 36, 50, ${step.opacity * 0.45})`;
        ctx.fillRect(scrX - 3, step.y, 6, 2);
        ctx.fillRect(scrX + step.facing * 1, step.y - 1, 3, 2);
      }

      if (step.opacity <= 0.05) {
        this.footsteps.splice(i, 1);
      }
    }
    ctx.restore();

    // Neon-Reflecting Puddles with Shimmering Ripples
    const puddles = [
      { x: 580, w: 90, color: "rgba(255, 120, 20, " }, // reflects Kiosk neon
      { x: 1220, w: 120, color: "rgba(0, 238, 255, " }, // reflects Metro neon
      { x: 1940, w: 110, color: "rgba(0, 255, 136, " }, // reflects Data Center
      { x: 2620, w: 130, color: "rgba(255, 215, 0, " }, // reflects Bank
      { x: 3280, w: 100, color: "rgba(255, 0, 119, " }, // reflects Broadcast
      { x: 3900, w: 115, color: "rgba(153, 0, 255, " }, // reflects Arcade
      { x: 4460, w: 75, color: "rgba(255, 34, 68, " },   // reflects Phonebooth
    ];

    ctx.save();
    for (const pud of puddles) {
      const scrX = pud.x - cameraX;
      if (scrX < -150 || scrX > this.width + 150) continue;

      const pudY = groundY + 18;
      // Dark puddle base
      ctx.fillStyle = "#181c26";
      ctx.beginPath();
      ctx.ellipse(scrX, pudY, pud.w / 2, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Neon Reflection with animated ripple waves
      const ripple = Math.sin(time * 0.005 + pud.x * 0.01) * 2;
      const refAlpha = t.puddleReflectAlpha;
      ctx.fillStyle = `${pud.color}${refAlpha})`;
      ctx.beginPath();
      ctx.ellipse(scrX, pudY + ripple * 0.5, (pud.w / 2) - 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Shimmer lines
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.fillRect(scrX - 15, pudY - 1, 30, 1);
    }
    ctx.restore();

    // Glowing Streetlamps with Volumetric Light Cones
    const lampSpacing = 420;
    ctx.save();
    for (let lx = 140; lx < STREET_TOTAL_WIDTH; lx += lampSpacing) {
      const scrX = lx - cameraX;
      if (scrX < -120 || scrX > this.width + 120) continue;

      const lampH = 145;
      const lampY = groundY - lampH;

      // Ornate Cast-Iron Lamp Post
      ctx.fillStyle = "#1e1e24";
      ctx.fillRect(scrX - 3, lampY, 6, lampH);
      ctx.fillRect(scrX - 8, groundY - 6, 16, 6); // Base

      // Arched lantern head
      ctx.fillRect(scrX - 12, lampY, 24, 4);
      ctx.fillRect(scrX - 8, lampY + 4, 16, 14);

      // Lantern Glass & Warm Core
      ctx.fillStyle = t.lampGlow;
      ctx.fillRect(scrX - 6, lampY + 6, 12, 10);

      // Volumetric Radial Light Cone onto the sidewalk
      const cone = ctx.createRadialGradient(scrX, lampY + 12, 10, scrX, groundY + 15, 140);
      cone.addColorStop(0, t.lampColor);
      cone.addColorStop(0.7, t.lampColor.replace(/[\d\.]+\)$/, "0.08)"));
      cone.addColorStop(1, "rgba(255, 220, 140, 0)");

      ctx.fillStyle = cone;
      ctx.beginPath();
      ctx.moveTo(scrX - 8, lampY + 14);
      ctx.lineTo(scrX - 110, groundY + 40);
      ctx.lineTo(scrX + 110, groundY + 40);
      ctx.lineTo(scrX + 8, lampY + 14);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  // 8. Dynamic Snowfall Particles (Two Multi-Speed Layers)
  drawSnowfall(time) {
    const ctx = this.ctx;
    const t = this.theme;

    // Wind gust calculation
    const wind = Math.sin(time * 0.001) * 0.8 + 0.3;

    // Layer 1: Background Fine Micro Flakes
    ctx.save();
    ctx.fillStyle = t.snowParticle;
    for (const f of this.bgSnow) {
      f.y += f.speedY;
      f.x += f.speedX + wind * 0.4;
      f.wobble += 0.04;
      const wx = f.x + Math.sin(f.wobble) * 1.5;

      if (f.y > this.height) {
        f.y = -10;
        f.x = Math.random() * this.width;
      }
      if (f.x > this.width + 20) f.x = -10;
      if (f.x < -20) f.x = this.width + 10;

      ctx.fillRect(Math.round(wx), Math.round(f.y), f.size, f.size);
    }

    // Layer 2: Foreground Chunky Swirling Flakes
    for (const f of this.fgSnow) {
      f.y += f.speedY;
      f.x += f.speedX + wind * 0.9;
      f.wobble += 0.06;
      const wx = f.x + Math.sin(f.wobble) * 3;

      if (f.y > this.height) {
        f.y = -10;
        f.x = Math.random() * this.width;
      }
      if (f.x > this.width + 30) f.x = -10;
      if (f.x < -30) f.x = this.width + 10;

      ctx.fillRect(Math.round(wx), Math.round(f.y), Math.round(f.size), Math.round(f.size));
    }
    ctx.restore();
  }

  // 9. Foot Poofs & Cold Breath Particles
  drawCharacterParticles(cameraX) {
    const ctx = this.ctx;

    // Foot Snow Poofs
    ctx.save();
    for (let i = this.footPoofs.length - 1; i >= 0; i--) {
      const p = this.footPoofs[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.05;

      const scrX = p.x - cameraX;
      if (scrX > -20 && scrX < this.width + 20 && p.alpha > 0.01) {
        ctx.fillStyle = `rgba(235, 245, 255, ${p.alpha})`;
        ctx.fillRect(Math.round(scrX), Math.round(p.y), Math.round(p.size), Math.round(p.size));
      }
      if (p.alpha <= 0.01) this.footPoofs.splice(i, 1);
    }

    // Winter Breath Condensation Puffs
    for (let i = this.breathParticles.length - 1; i >= 0; i--) {
      const p = this.breathParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.size += 0.12;
      p.alpha -= 0.025;

      const scrX = p.x - cameraX;
      if (scrX > -20 && scrX < this.width + 20 && p.alpha > 0.01) {
        ctx.fillStyle = `rgba(240, 248, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(scrX, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      if (p.alpha <= 0.01) this.breathParticles.splice(i, 1);
    }
    ctx.restore();
  }

  // 10. Floating Interactive Prompt: [E] INSPECT / READ / ACCESS
  drawInteractionPrompt(promptText, charScreenX, charScreenY, time) {
    const ctx = this.ctx;
    const bounce = Math.sin(time * 0.008) * 3;
    const py = charScreenY - 60 + bounce;

    ctx.save();
    ctx.font = "bold 9px 'Press Start 2P', monospace";
    const textWidth = ctx.measureText(promptText).width;
    const padX = 10;
    const boxW = textWidth + padX * 2;
    const boxH = 22;
    const boxX = charScreenX - boxW / 2;

    // Glowing Neon Badge Box
    ctx.fillStyle = "#12141d";
    ctx.fillRect(boxX, py, boxW, boxH);
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00ffcc";
    ctx.shadowBlur = 8;
    ctx.strokeRect(boxX, py, boxW, boxH);

    // Downward pixel arrow pointer
    ctx.fillStyle = "#00ffcc";
    ctx.beginPath();
    ctx.moveTo(charScreenX - 5, py + boxH);
    ctx.lineTo(charScreenX + 5, py + boxH);
    ctx.lineTo(charScreenX, py + boxH + 6);
    ctx.closePath();
    ctx.fill();

    // Text with pulse
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(promptText, charScreenX, py + boxH / 2 + 1);

    ctx.restore();
  }

  // 11. Click-to-Move Target Reticle
  drawDestinationMarker(cameraX, time) {
    if (!this.destinationMarker) return;
    const scrX = this.destinationMarker.x - cameraX;
    const groundY = this.groundY;

    this.destinationMarker.timer -= 1;
    if (this.destinationMarker.timer <= 0) {
      this.destinationMarker = null;
      return;
    }

    const ctx = this.ctx;
    const pulse = Math.abs(Math.sin(time * 0.015)) * 4;

    ctx.save();
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(scrX, groundY + 2, 14 + pulse, 6 + pulse * 0.4, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Target crosshairs
    ctx.fillStyle = "#00ffcc";
    ctx.fillRect(scrX - 1, groundY - 6, 2, 16);
    ctx.fillRect(scrX - 8, groundY + 1, 16, 2);
    ctx.restore();
  }

  // 12. Konami Cyber Rave Fireworks Mode
  drawRaveEffects(time) {
    if (!this.isRaveMode) return;
    const ctx = this.ctx;
    this.raveHue = (this.raveHue + 4) % 360;

    // Rainbow Aurora Borealis ribbon across sky
    const ribbonGrad = ctx.createLinearGradient(0, 0, this.width, 0);
    ribbonGrad.addColorStop(0, `hsla(${this.raveHue}, 100%, 50%, 0.15)`);
    ribbonGrad.addColorStop(0.5, `hsla(${(this.raveHue + 120) % 360}, 100%, 50%, 0.25)`);
    ribbonGrad.addColorStop(1, `hsla(${(this.raveHue + 240) % 360}, 100%, 50%, 0.15)`);
    ctx.fillStyle = ribbonGrad;
    ctx.fillRect(0, 0, this.width, this.height * 0.5);

    // Rave spark particles
    for (let i = this.raveParticles.length - 1; i >= 0; i--) {
      const p = this.raveParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.012;

      ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
      ctx.fillRect(p.x, p.y, p.size, p.size);

      if (p.alpha <= 0) this.raveParticles.splice(i, 1);
    }
  }

  // Master Render Frame
  render(player, cameraX, activeLandmark, time) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Far Sky & Moon
    this.drawSky(time);

    // 2. Far Skyline (Parallax factor: 0.12)
    this.drawFarSkyline(cameraX, time);

    // 3. Mid Skyline & Overhead Rail (Parallax factor: 0.28)
    this.drawMidSkyline(cameraX, time);

    // 4. Midground Trees & Utility Poles
    this.drawMidgroundProps(cameraX, time);

    // 5. Steam Vents
    this.drawSteamVents(cameraX, time);

    // 6. Landmark Buildings
    this.drawLandmarks(cameraX, time);

    // 7. Sidewalk, Snow Footsteps, Neon Puddles & Streetlamps
    this.drawSidewalk(cameraX, time);

    // 8. Click Destination Reticle
    this.drawDestinationMarker(cameraX, time);

    // 9. Character Particles (Foot poofs, breath condensation)
    this.drawCharacterParticles(cameraX);

    // 10. Player Character
    const charScreenX = player.x - cameraX;
    const charScreenY = this.groundY - player.y; // player.y is jump height
    drawCharacter(this.ctx, charScreenX, charScreenY, {
      facing: player.facing,
      isMoving: player.isMoving,
      isGrounded: player.isGrounded,
      walkFrame: player.walkFrame,
      vy: player.vy,
      breatheOffset: player.breatheOffset,
    });

    // 11. Interactive Prompt above Character Head
    if (activeLandmark) {
      this.drawInteractionPrompt(activeLandmark.interactionPrompt, charScreenX, charScreenY, time);
    }

    // 12. Foreground Snowfall Particles (Chunky swirling flakes)
    this.drawSnowfall(time);

    // 13. Konami Rave Mode Overlay
    this.drawRaveEffects(time);
  }
}
