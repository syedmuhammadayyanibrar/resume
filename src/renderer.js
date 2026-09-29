// src/renderer.js - Multi-Layer Parallax Engine with NPCs, Billboards & AI Project Buildings

import {
  PALETTES,
  drawCharacter,
  drawNPC,
  drawCat,
  drawStartBoard,
  drawStreetBillboard,
  drawCAS,
  drawComplianceOps,
  drawNegotiationAgent,
  drawAuraSight,
  drawConnectPavilion
} from "./pixelArt.js";
import { LANDMARKS, BILLBOARDS, STREET_TOTAL_WIDTH } from "./data.js";

export class WorldRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.currentThemeKey = "dusk";
    this.theme = PALETTES.dusk;
    this.groundY = Math.round(this.height * 0.72);

    this.initStars();
    this.initClouds();
    this.initSnowflakes();
    this.initUtilityPoles();
    this.initTrees();
    this.initSteamVents();
    this.initNPCVisitors();

    this.footsteps = [];
    this.steamParticles = [];
    this.breathParticles = [];
    this.footPoofs = [];
    this.raveParticles = [];

    this.train = {
      active: true,
      x: -600,
      speed: 15,
      intervalTimer: 0,
    };

    this.destinationMarker = null;
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
    this.ctx.imageSmoothingEnabled = false;

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
    for (let i = 0; i < 130; i++) {
      this.stars.push({
        x: Math.random() * 3600,
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
    for (let i = 0; i < 11; i++) {
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
    this.bgSnow = [];
    for (let i = 0; i < 190; i++) {
      this.bgSnow.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() > 0.7 ? 2 : 1,
        speedY: 0.8 + Math.random() * 1.2,
        speedX: -0.4 + Math.random() * 0.8,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    this.fgSnow = [];
    for (let i = 0; i < 95; i++) {
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
    for (let x = 180; x < STREET_TOTAL_WIDTH; x += 520) {
      this.utilityPoles.push({ x, height: 180 });
    }
  }

  initTrees() {
    this.trees = [];
    for (let x = 320; x < STREET_TOTAL_WIDTH; x += 640) {
      this.trees.push({
        x,
        h: 120 + Math.random() * 30,
        seed: Math.random(),
      });
    }
  }

  initSteamVents() {
    this.steamVents = [
      { x: 420, width: 30 },
      { x: 1120, width: 32 },
      { x: 1820, width: 30 },
      { x: 2840, width: 28 },
      { x: 3580, width: 34 },
      { x: 4620, width: 30 },
      { x: 5320, width: 32 },
    ];
  }

  /**
   * Initialize Walking Visitors & Pedestrians (NPCs)
   */
  initNPCVisitors() {
    this.npcs = [
      {
        id: "npc1",
        x: 500,
        minX: 340,
        maxX: 680,
        speed: 1.1,
        facing: 1,
        walkFrame: 0,
        cTop: "#3b82f6",
        cBottom: "#1e293b",
        cHair: "#0f172a",
        prop: "headphones",
        bubbleText: "CAS federates 6 contract societies with Fastn MCP nervous system!",
        isSpeaking: false,
      },
      {
        id: "npc2",
        x: 1200,
        minX: 1120,
        maxX: 1320,
        speed: 0.9,
        facing: -1,
        walkFrame: 0,
        cTop: "#ec4899",
        cBottom: "#334155",
        cHair: "#78350f",
        prop: "camera",
        bubbleText: "ComplianceOps uses Dual-Key HITL safety gates under EU AI Act!",
        isSpeaking: false,
      },
      {
        id: "npc3",
        x: 1980,
        minX: 1860,
        maxX: 2180,
        speed: 1.2,
        facing: 1,
        walkFrame: 0,
        cTop: "#10b981",
        cBottom: "#1e293b",
        cHair: "#1e293b",
        prop: "backpack",
        bubbleText: "Check Syed's highway billboard above! Production AI Architect.",
        isSpeaking: false,
      },
      {
        id: "npc4",
        x: 2450,
        minX: 2340,
        maxX: 2680,
        speed: 0.8,
        facing: -1,
        walkFrame: 0,
        cTop: "#f59e0b",
        cBottom: "#475569",
        cHair: "#451a03",
        prop: "coffee",
        bubbleText: "Negotiation Agent ran 17-message state machines with 98.4% convergence!",
        isSpeaking: false,
      },
      {
        id: "npc5",
        x: 3100,
        minX: 2990,
        maxX: 3340,
        speed: 1.0,
        facing: 1,
        walkFrame: 0,
        cTop: "#8b5cf6",
        cBottom: "#0f172a",
        cHair: "#0284c7",
        prop: "headphones",
        bubbleText: "AuraSight runs on-device Whisper ONNX with 0% arithmetic errors!",
        isSpeaking: false,
      },
      {
        id: "npc6",
        x: 3650,
        minX: 3510,
        maxX: 3840,
        speed: 1.1,
        facing: -1,
        walkFrame: 0,
        cTop: "#06b6d4",
        cBottom: "#1e293b",
        cHair: "#111827",
        prop: "backpack",
        bubbleText: "All 4 projects have open-source GitHub repositories you can clone!",
        isSpeaking: false,
      },
      {
        id: "npc7",
        x: 4200,
        minX: 4060,
        maxX: 4400,
        speed: 0.9,
        facing: 1,
        walkFrame: 0,
        cTop: "#e11d48",
        cBottom: "#334155",
        cHair: "#713f12",
        prop: "coffee",
        bubbleText: "Finale pavilion ahead: 'Let's build together' — grab Syed's CV!",
        isSpeaking: false,
      }
    ];
  }

  updateNPCs(playerX) {
    for (const npc of this.npcs) {
      npc.x += npc.speed * npc.facing;
      npc.walkFrame += 0.16;

      // Reverse direction at patrol edges
      if (npc.x > npc.maxX) {
        npc.x = npc.maxX;
        npc.facing = -1;
      } else if (npc.x < npc.minX) {
        npc.x = npc.minX;
        npc.facing = 1;
      }

      // Check distance to player for speech bubbles
      const dist = Math.abs(npc.x - playerX);
      npc.isSpeaking = dist < 75;
    }
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

  // 1. Far Sky & Moon
  drawSky(time) {
    const ctx = this.ctx;
    const t = this.theme;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, this.groundY);
    skyGrad.addColorStop(0, t.skyTop);
    skyGrad.addColorStop(0.45, t.skyMid);
    skyGrad.addColorStop(0.85, t.skyBottom);
    skyGrad.addColorStop(1, t.skyGaze);

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Drifting smog
    ctx.save();
    for (const c of this.clouds) {
      c.x += c.speed;
      if (c.x > 3800) c.x = -200;

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

    // Crescent Moon
    const moonX = this.width * 0.82;
    const moonY = this.height * 0.16;
    const halo = ctx.createRadialGradient(moonX, moonY, 12, moonX, moonY, 48);
    halo.addColorStop(0, "rgba(255, 245, 220, 0.28)");
    halo.addColorStop(1, "rgba(255, 245, 220, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 48, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff8db";
    ctx.beginPath();
    ctx.arc(moonX, moonY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = t.skyTop;
    ctx.beginPath();
    ctx.arc(moonX - 5, moonY - 3, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 2. Far Skyline Silhouettes (Parallax Factor: 0.12)
  drawFarSkyline(cameraX, time) {
    const ctx = this.ctx;
    const t = this.theme;
    const parallax = cameraX * 0.12;

    ctx.save();
    ctx.fillStyle = t.farSkyline;

    const numBuildings = 36;
    for (let i = 0; i < numBuildings; i++) {
      const bx = (i * 130 - parallax) % (this.width + 300) - 150;
      const bw = 85 + (i * 37) % 55;
      const bh = 140 + (i * 83) % 190;
      const by = this.groundY - bh - 40;

      ctx.fillRect(bx, by, bw, bh + 50);

      if (i % 3 === 0) {
        const mastX = bx + bw / 2;
        ctx.fillRect(mastX - 1, by - 35, 2, 35);
        const blink = Math.sin(time * 0.005 + i) > 0;
        ctx.fillStyle = blink ? "#ff2244" : "#440011";
        ctx.fillRect(mastX - 2, by - 37, 4, 3);
        ctx.fillStyle = t.farSkyline;
      }

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
    ctx.restore();
  }

  // 3. Mid Skyline & Overhead Train (Parallax Factor: 0.28)
  drawMidSkyline(cameraX, time) {
    const ctx = this.ctx;
    const t = this.theme;
    const parallax = cameraX * 0.28;

    ctx.save();
    ctx.fillStyle = t.midSkyline;

    const numBlocks = 28;
    for (let i = 0; i < numBlocks; i++) {
      const bx = (i * 190 - parallax) % (this.width + 400) - 200;
      const bw = 120 + (i * 29) % 70;
      const bh = 90 + (i * 53) % 110;
      const by = this.groundY - bh - 20;

      ctx.fillRect(bx, by, bw, bh + 30);

      if (i % 4 === 1) {
        const twX = bx + 25;
        const twY = by - 30;
        ctx.fillRect(twX, twY, 26, 22);
        ctx.fillRect(twX + 2, twY + 22, 4, 9);
        ctx.fillRect(twX + 20, twY + 22, 4, 9);
      }
    }

    const railY = this.groundY - 110;
    ctx.fillStyle = "#1e142e";
    ctx.fillRect(0, railY, this.width, 10);
    for (let px = (0 - parallax) % 300 - 100; px < this.width + 100; px += 300) {
      ctx.fillRect(px, railY + 10, 16, this.groundY - (railY + 10));
    }

    this.train.intervalTimer += 1;
    if (this.train.intervalTimer > 400) {
      this.train.x += this.train.speed;
      const trainScreenX = this.train.x - parallax;

      if (trainScreenX > -400 && trainScreenX < this.width + 400) {
        ctx.fillStyle = "#e0e6ed";
        ctx.fillRect(trainScreenX, railY - 18, 380, 18);
        ctx.fillStyle = "#00bbff";
        ctx.fillRect(trainScreenX, railY - 10, 380, 3);

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

  // 4. Bare Winter Trees & Utility Poles with Sagging Wires
  drawMidgroundProps(cameraX, time) {
    const ctx = this.ctx;
    ctx.save();

    for (const tree of this.trees) {
      const scrX = tree.x - cameraX;
      if (scrX < -80 || scrX > this.width + 80) continue;

      const treeY = this.groundY;
      ctx.fillStyle = "#2c211a";
      ctx.fillRect(scrX - 3, treeY - tree.h, 6, tree.h);

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

        ctx.strokeStyle = "#edf3fa";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(scrX, branchStartY - 2);
        ctx.lineTo(bx, by - 2);
        ctx.stroke();
      });
    }

    for (let i = 0; i < this.utilityPoles.length; i++) {
      const pole = this.utilityPoles[i];
      const scrX = pole.x - cameraX;
      if (scrX < -150 || scrX > this.width + 150) continue;

      const poleTopY = this.groundY - pole.height;
      ctx.fillStyle = "#221710";
      ctx.fillRect(scrX - 3, poleTopY, 6, pole.height);

      ctx.fillRect(scrX - 22, poleTopY + 12, 44, 4);
      ctx.fillRect(scrX - 16, poleTopY + 28, 32, 4);

      ctx.fillStyle = "#3e4450";
      ctx.fillRect(scrX + 5, poleTopY + 36, 14, 22);

      if (i < this.utilityPoles.length - 1) {
        const nextPole = this.utilityPoles[i + 1];
        const nextScrX = nextPole.x - cameraX;

        ctx.strokeStyle = "rgba(20, 20, 30, 0.85)";
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(scrX - 20, poleTopY + 12);
        ctx.quadraticCurveTo((scrX + nextScrX) / 2, poleTopY + 12 + 35, nextScrX - 20, poleTopY + 12);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(scrX + 20, poleTopY + 12);
        ctx.quadraticCurveTo((scrX + nextScrX) / 2, poleTopY + 12 + 28, nextScrX + 20, poleTopY + 12);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // 5. Elevated Highway Billboards
  drawBillboards(cameraX, time) {
    const ctx = this.ctx;
    for (const b of BILLBOARDS) {
      const scrX = b.x - cameraX;
      if (scrX + b.width < -100 || scrX > this.width + 100) continue;

      ctx.save();
      ctx.translate(-cameraX, 0);
      drawStreetBillboard(ctx, b, this.groundY, time);
      ctx.restore();
    }
  }

  // 6. Steam Vents
  drawSteamVents(cameraX, time) {
    const ctx = this.ctx;
    const t = this.theme;

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

  // 7. Landmark Buildings (All Projects + Start Board + Finale Board)
  drawLandmarks(cameraX, time) {
    const ctx = this.ctx;
    for (const lm of LANDMARKS) {
      const scrX = lm.x - cameraX;
      if (scrX + lm.width < -100 || scrX > this.width + 100) continue;

      ctx.save();
      ctx.translate(-cameraX, 0);

      switch (lm.id) {
        case "start_board":
          drawStartBoard(ctx, lm, this.groundY, time);
          break;
        case "cas":
          drawCAS(ctx, lm, this.groundY, time);
          break;
        case "complianceops":
          drawComplianceOps(ctx, lm, this.groundY, time);
          break;
        case "negotiation_agent":
          drawNegotiationAgent(ctx, lm, this.groundY, time);
          break;
        case "aurasight":
          drawAuraSight(ctx, lm, this.groundY, time);
          break;
        case "connect_pavilion":
          drawConnectPavilion(ctx, lm, this.groundY, time);
          // Draw Mochi the cat perched right beside the connect pavilion
          drawCat(ctx, lm.x + lm.width + 45, this.groundY, time * 0.06);
          break;
      }
      ctx.restore();
    }
  }

  // 8. Sidewalk, Snow Footsteps, Neon Puddles & Streetlamps
  drawSidewalk(cameraX, time) {
    const ctx = this.ctx;
    const t = this.theme;
    const groundY = this.groundY;

    ctx.fillStyle = t.snowSidewalk;
    ctx.fillRect(0, groundY, this.width, this.height - groundY);

    ctx.fillStyle = t.curbColor;
    ctx.fillRect(0, groundY + 45, this.width, 6);
    ctx.fillStyle = "#161922";
    ctx.fillRect(0, groundY + 51, this.width, this.height - (groundY + 51));

    ctx.fillStyle = t.snowSidewalkDrift;
    for (let x = - (cameraX % 40); x < this.width + 40; x += 40) {
      ctx.beginPath();
      ctx.ellipse(x, groundY + 2, 28, 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.save();
    for (let i = this.footsteps.length - 1; i >= 0; i--) {
      const step = this.footsteps[i];
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

    // Puddles reflecting Project neons
    const puddles = [
      { x: 420, w: 90, color: "rgba(0, 255, 204, " },
      { x: 920, w: 120, color: "rgba(0, 255, 204, " },
      { x: 1570, w: 120, color: "rgba(255, 0, 119, " },
      { x: 2470, w: 130, color: "rgba(255, 215, 0, " },
      { x: 3170, w: 120, color: "rgba(0, 255, 136, " },
      { x: 4170, w: 140, color: "rgba(0, 170, 255, " }
    ];

    ctx.save();
    for (const pud of puddles) {
      const scrX = pud.x - cameraX;
      if (scrX < -150 || scrX > this.width + 150) continue;

      const pudY = groundY + 18;
      ctx.fillStyle = "#181c26";
      ctx.beginPath();
      ctx.ellipse(scrX, pudY, pud.w / 2, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      const ripple = Math.sin(time * 0.005 + pud.x * 0.01) * 2;
      ctx.fillStyle = `${pud.color}${t.puddleReflectAlpha})`;
      ctx.beginPath();
      ctx.ellipse(scrX, pudY + ripple * 0.5, (pud.w / 2) - 10, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 9. Draw Walking Visitors (NPCs)
  drawNPCs(cameraX, time) {
    const ctx = this.ctx;
    for (const npc of this.npcs) {
      const scrX = npc.x - cameraX;
      if (scrX < -80 || scrX > this.width + 80) continue;
      drawNPC(ctx, { ...npc, x: scrX }, this.groundY, time);
    }
  }

  // 10. Snowfall Particles
  drawSnowfall(time) {
    const ctx = this.ctx;
    const t = this.theme;
    const wind = Math.sin(time * 0.001) * 0.8 + 0.3;

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

  // 11. Foot Poofs & Cold Breath Particles
  drawCharacterParticles(cameraX) {
    const ctx = this.ctx;

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

  // 12. Floating Prompt: [E] INSPECT ...
  drawInteractionPrompt(promptText, charScreenX, charScreenY, time) {
    const ctx = this.ctx;
    const bounce = Math.sin(time * 0.008) * 3;
    const py = charScreenY - 60 + bounce;

    ctx.save();
    ctx.font = "bold 9px 'Press Start 2P', monospace";
    const textWidth = ctx.measureText(promptText).width;
    const padX = 12;
    const boxW = textWidth + padX * 2;
    const boxH = 24;
    const boxX = charScreenX - boxW / 2;

    ctx.fillStyle = "#0c101a";
    ctx.fillRect(boxX, py, boxW, boxH);
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00ffcc";
    ctx.shadowBlur = 10;
    ctx.strokeRect(boxX, py, boxW, boxH);

    ctx.fillStyle = "#00ffcc";
    ctx.beginPath();
    ctx.moveTo(charScreenX - 6, py + boxH);
    ctx.lineTo(charScreenX + 6, py + boxH);
    ctx.lineTo(charScreenX, py + boxH + 6);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(promptText, charScreenX, py + boxH / 2 + 1);

    ctx.restore();
  }

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

    ctx.fillStyle = "#00ffcc";
    ctx.fillRect(scrX - 1, groundY - 6, 2, 16);
    ctx.fillRect(scrX - 8, groundY + 1, 16, 2);
    ctx.restore();
  }

  drawRaveEffects(time) {
    if (!this.isRaveMode) return;
    const ctx = this.ctx;
    this.raveHue = (this.raveHue + 4) % 360;

    const ribbonGrad = ctx.createLinearGradient(0, 0, this.width, 0);
    ribbonGrad.addColorStop(0, `hsla(${this.raveHue}, 100%, 50%, 0.15)`);
    ribbonGrad.addColorStop(0.5, `hsla(${(this.raveHue + 120) % 360}, 100%, 50%, 0.25)`);
    ribbonGrad.addColorStop(1, `hsla(${(this.raveHue + 240) % 360}, 100%, 50%, 0.15)`);
    ctx.fillStyle = ribbonGrad;
    ctx.fillRect(0, 0, this.width, this.height * 0.5);

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

  render(player, cameraX, activeLandmark, time) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawSky(time);
    this.drawFarSkyline(cameraX, time);
    this.drawMidSkyline(cameraX, time);
    this.drawMidgroundProps(cameraX, time);
    this.drawBillboards(cameraX, time);
    this.drawSteamVents(cameraX, time);
    this.drawLandmarks(cameraX, time);
    this.drawSidewalk(cameraX, time);

    // Update & Draw Visitors (NPCs)
    this.updateNPCs(player.x);
    this.drawNPCs(cameraX, time);

    this.drawDestinationMarker(cameraX, time);
    this.drawCharacterParticles(cameraX);

    // Player
    const charScreenX = player.x - cameraX;
    const charScreenY = this.groundY - player.y;
    drawCharacter(this.ctx, charScreenX, charScreenY, {
      facing: player.facing,
      isMoving: player.isMoving,
      isGrounded: player.isGrounded,
      walkFrame: player.walkFrame,
      vy: player.vy,
      breatheOffset: player.breatheOffset,
    });

    if (activeLandmark) {
      this.drawInteractionPrompt(activeLandmark.interactionPrompt, charScreenX, charScreenY, time);
    }

    this.drawSnowfall(time);
    this.drawRaveEffects(time);
  }
}
