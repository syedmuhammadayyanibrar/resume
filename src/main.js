// src/main.js - Central Game Loop, Physics & Camera Tracking

import "./style.css";
import { LANDMARKS, STREET_TOTAL_WIDTH } from "./data.js";
import { WorldRenderer } from "./renderer.js";
import { Controls } from "./controls.js";
import { UIManager } from "./ui.js";
import { audio } from "./audio.js";

class App {
  constructor() {
    this.container = document.getElementById("app");
    this.setupDOM();

    this.canvas = document.getElementById("world-canvas");
    this.renderer = new WorldRenderer(this.canvas);

    // Weather Themes list
    this.themes = [
      { key: "dusk", name: "Snowy Dusk", icon: "🌆" },
      { key: "cyberpunk", name: "Midnight Cyberpunk", icon: "🌃" },
      { key: "fog", name: "Morning Fog", icon: "🌁" },
    ];
    this.themeIndex = 0;

    // Player State
    this.player = {
      x: 240, // Start in front of the 3-Panel Start Directory Board
      y: 0,   // Ground level
      vx: 0,
      vy: 0,
      facing: 1, // 1 = right, -1 = left
      isMoving: false,
      isGrounded: true,
      walkFrame: 0,
      breatheOffset: 0,
      breathTimer: 0,
      stepSoundTimer: 0,
    };

    // Camera State
    this.cameraX = 0;

    // Active Landmark near player
    this.activeLandmark = null;

    // Initialize UI Manager
    this.ui = new UIManager(this.container, {
      onThemeChange: () => this.cycleTheme(),
      onCrtToggle: () => this.ui.toggleCrt(),
      onAudioToggle: () => {
        const isUnmuted = audio.toggleMute();
        this.ui.updateAudioButton(isUnmuted);
      },
      onTravelTo: (idx) => this.fastTravelToLandmark(idx),
      onInteract: () => this.handleInteraction(),
    });

    // Initialize Controls
    this.controls = new Controls(
      this.canvas,
      () => this.handleInteraction(),
      (idx) => this.fastTravelToLandmark(idx),
      () => this.cycleTheme(),
      () => this.ui.toggleCrt(),
      () => {
        const isUnmuted = audio.toggleMute();
        this.ui.updateAudioButton(isUnmuted);
      },
      () => this.handleKonamiCode()
    );

    // Listen for custom click-to-move & board button clicks from canvas
    window.addEventListener("streetclick", (e) => {
      const clickX = e.detail.clickX;
      const clickY = e.detail.clickY;
      const worldX = Math.max(40, Math.min(STREET_TOTAL_WIDTH - 60, this.cameraX + clickX));

      // 1. Check if user clicked directly on any board buttons, links, Mochi, or buildings!
      const handled = this.handleCanvasClick(worldX, clickY);
      if (!handled) {
        // Otherwise, move player to clicked street spot
        this.controls.setTargetX(worldX);
        this.renderer.destinationMarker = { x: worldX, timer: 75 };
        audio.playClick(0.9);
      }
    });

    // Listen for mousemove on canvas to update pointer cursor & board hover states
    window.addEventListener("streetmousemove", (e) => {
      const worldX = this.cameraX + e.detail.mouseX;
      const worldY = e.detail.mouseY;
      this.renderer.hoverWorldX = worldX;
      this.renderer.hoverWorldY = worldY;

      const isInteractive = this.isInteractiveTarget(worldX, worldY);
      this.canvas.style.cursor = isInteractive ? "pointer" : "crosshair";
    });

    // Window Resize listener
    window.addEventListener("resize", () => {
      this.renderer.resize();
    });

    // Auto-start sound on first user gesture (touch, click, key) to satisfy browser autoplay policy
    const startAudioOnFirstGesture = () => {
      audio.ensureContext();
      if (!audio.isMuted && !audio.isBgmPlaying) {
        audio.startLofiBgm();
      }
      this.ui.updateAudioButton(!audio.isMuted);
    };
    window.addEventListener("pointerdown", startAudioOnFirstGesture, { once: true });
    window.addEventListener("touchstart", startAudioOnFirstGesture, { once: true });
    window.addEventListener("keydown", startAudioOnFirstGesture, { once: true });
    window.addEventListener("click", startAudioOnFirstGesture, { once: true });

    // Start 60FPS Game Loop
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  setupDOM() {
    this.container.innerHTML = `
      <canvas id="world-canvas"></canvas>
      <div id="crt-overlay" class="disabled"></div>
    `;
  }

  downloadCvDirect() {
    const link = document.createElement("a");
    link.href = "./Syed_Ayyan_CV.pdf";
    link.download = "Syed_Ayyan_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  isInteractiveTarget(worldX, worldY) {
    const groundY = this.renderer.groundY;

    // 1. Start Board panels
    if (worldY >= groundY - 135 && worldY <= groundY - 25) {
      if ((worldX >= 256 && worldX <= 338) ||
          (worldX >= 344 && worldX <= 426) ||
          (worldX >= 432 && worldX <= 514)) {
        return true;
      }
    }

    // 2. Connect Pavilion Buttons
    if (worldY >= groundY - 130 && worldY <= groundY - 80) {
      if ((worldX >= 4075 && worldX <= 4180) ||
          (worldX >= 4185 && worldX <= 4320) ||
          (worldX >= 4325 && worldX <= 4420)) {
        return true;
      }
    }

    // Connect Pavilion Footer Links
    if (worldY >= groundY - 45 && worldY <= groundY - 10) {
      if (worldX >= 4070 && worldX <= 4430) {
        return true;
      }
    }

    // 3. Mochi the Cat
    if (worldX >= 4455 && worldX <= 4535 && worldY >= groundY - 60 && worldY <= groundY + 10) {
      return true;
    }

    // 4. Any Landmark Building upper body
    for (const lm of LANDMARKS) {
      if (worldX >= lm.x && worldX <= lm.x + lm.width &&
          worldY >= groundY - lm.height && worldY < groundY - 15) {
        return true;
      }
    }

    return false;
  }

  handleCanvasClick(worldX, clickY) {
    const groundY = this.renderer.groundY;

    // 1. Start Board Panels (Directly Clickable Links!)
    if (clickY >= groundY - 135 && clickY <= groundY - 25) {
      // Panel 1: GitHub
      if (worldX >= 256 && worldX <= 338) {
        audio.playClick(1.4);
        window.open("https://github.com/syedmuhammadayyanibrar", "_blank");
        this.ui.showToast("🚀 OPENING GITHUB: syedmuhammadayyanibrar");
        return true;
      }
      // Panel 2: Gmail
      if (worldX >= 344 && worldX <= 426) {
        audio.playClick(1.4);
        window.location.href = "mailto:syedmuhammadayyanibrar@gmail.com";
        this.ui.showToast("✉️ OPENING EMAIL COMPOSER");
        return true;
      }
      // Panel 3: LinkedIn
      if (worldX >= 432 && worldX <= 514) {
        audio.playClick(1.4);
        window.open("https://linkedin.com/in/ayyan-ibrar", "_blank");
        this.ui.showToast("💼 OPENING LINKEDIN: ayyan-ibrar");
        return true;
      }
    }

    // 2. Connect Pavilion Buttons (Directly Clickable Links & CV Download!)
    if (clickY >= groundY - 130 && clickY <= groundY - 80) {
      // Button 1: Send Email
      if (worldX >= 4075 && worldX <= 4180) {
        audio.playClick(1.4);
        window.location.href = "mailto:syedmuhammadayyanibrar@gmail.com";
        this.ui.showToast("✉️ OPENING EMAIL COMPOSER");
        return true;
      }
      // Button 2: Download CV
      if (worldX >= 4185 && worldX <= 4320) {
        audio.playClick(1.4);
        this.downloadCvDirect();
        this.ui.showToast("⬇ DOWNLOADING SYED_AYYAN_CV.PDF");
        return true;
      }
      // Button 3: Copy Email
      if (worldX >= 4325 && worldX <= 4420) {
        audio.playClick(1.4);
        if (navigator.clipboard) {
          navigator.clipboard.writeText("syedmuhammadayyanibrar@gmail.com");
        }
        this.ui.showToast("📋 COPIED: syedmuhammadayyanibrar@gmail.com");
        return true;
      }
    }

    // Connect Pavilion Footer Links
    if (clickY >= groundY - 45 && clickY <= groundY - 10) {
      if (worldX >= 4070 && worldX < 4185) {
        audio.playClick(1.4);
        window.open("https://github.com/syedmuhammadayyanibrar", "_blank");
        this.ui.showToast("🚀 OPENING GITHUB: syedmuhammadayyanibrar");
        return true;
      }
      if (worldX >= 4185 && worldX < 4290) {
        audio.playClick(1.4);
        window.open("https://linkedin.com/in/ayyan-ibrar", "_blank");
        this.ui.showToast("💼 OPENING LINKEDIN: ayyan-ibrar");
        return true;
      }
      if (worldX >= 4290 && worldX <= 4430) {
        audio.playClick(1.4);
        window.location.href = "mailto:syedmuhammadayyanibrar@gmail.com";
        this.ui.showToast("✉️ OPENING EMAIL COMPOSER");
        return true;
      }
    }

    // 3. Mochi the Cat (Direct Petting via Canvas Click/Tap!)
    if (worldX >= 4455 && worldX <= 4535 && clickY >= groundY - 60 && clickY <= groundY + 10) {
      audio.playCatMeow();
      this.renderer.mochiPetTimer = 120;
      this.ui.showToast("🐱 MOCHI: *PURR* MEOW! ❤️ (PETTED)");
      return true;
    }

    // 4. Click directly on any Landmark Building upper body -> Open inspect modal
    for (const lm of LANDMARKS) {
      if (worldX >= lm.x && worldX <= lm.x + lm.width &&
          clickY >= groundY - lm.height && clickY < groundY - 15) {
        audio.playClick(1.3);
        if (lm.id === "mochi_cat") {
          audio.playCatMeow();
          this.renderer.mochiPetTimer = 120;
          this.ui.showToast("🐱 MOCHI: *PURR* MEOW! ❤️ (PETTED)");
        } else {
          this.ui.openLandmarkModal(lm);
        }
        return true;
      }
    }

    // 5. Normal street / sidewalk click -> Player walks there
    return false;
  }

  cycleTheme() {
    this.themeIndex = (this.themeIndex + 1) % this.themes.length;
    const current = this.themes[this.themeIndex];
    this.renderer.setTheme(current.key);
    this.ui.updateWeatherButtonText(current.name, current.icon);
  }

  fastTravelToLandmark(idx) {
    const lm = LANDMARKS[idx];
    if (!lm) return;

    // Target position center of landmark
    const targetX = lm.x + lm.width / 2;
    this.player.x = targetX;
    this.player.vx = 0;
    this.controls.clearTargetX();

    // Spawn teleporter spark particles
    this.renderer.addFootPoof(targetX, this.renderer.groundY);
    audio.playClick(1.6);
  }

  handleInteraction() {
    if (this.ui.activeModal) {
      this.ui.closeModal();
      return;
    }
    if (this.activeLandmark) {
      if (this.activeLandmark.id === "mochi_cat") {
        audio.playCatMeow();
        this.renderer.mochiPetTimer = 120;
        this.ui.showToast("🐱 MOCHI: *PURR* MEOW! ❤️ (PETTED)");
        return;
      }
      this.ui.openLandmarkModal(this.activeLandmark);
    }
  }

  handleKonamiCode() {
    const isRave = this.renderer.toggleRaveMode();
    if (isRave) {
      this.ui.openKonamiModal();
    } else {
      audio.playClick(0.8);
      this.ui.showToast("🌙 CYBER RAVE MODE: DEACTIVATED");
    }
  }

  updatePhysics(dt) {
    const moveSpeed = 5.8;
    const p = this.player;

    // 1. Horizontal Movement (Keyboard or Click-to-Move)
    if (this.controls.left) {
      p.vx = -moveSpeed;
      p.facing = -1;
      p.isMoving = true;
    } else if (this.controls.right) {
      p.vx = moveSpeed;
      p.facing = 1;
      p.isMoving = true;
    } else if (this.controls.targetX !== null) {
      // Auto-walk to clicked target
      const dist = this.controls.targetX - p.x;
      if (Math.abs(dist) > 5) {
        p.vx = Math.sign(dist) * moveSpeed;
        p.facing = Math.sign(dist);
        p.isMoving = true;
      } else {
        p.vx = 0;
        p.isMoving = false;
        this.controls.clearTargetX();
      }
    } else {
      p.vx = 0;
      p.isMoving = false;
    }

    p.x += p.vx;

    // Bound character within street limits
    if (p.x < 30) p.x = 30;
    if (p.x > STREET_TOTAL_WIDTH - 60) p.x = STREET_TOTAL_WIDTH - 60;

    // 2. Jump Physics
    const gravity = 0.52;
    if (this.controls.jump && p.isGrounded) {
      p.vy = 9.8;
      p.isGrounded = false;
      this.renderer.addFootPoof(p.x, this.renderer.groundY);
      audio.playJump();
    }

    if (!p.isGrounded) {
      p.y += p.vy;
      p.vy -= gravity;

      // Landing on ground
      if (p.y <= 0) {
        p.y = 0;
        p.vy = 0;
        p.isGrounded = true;
        this.renderer.addFootPoof(p.x, this.renderer.groundY);
        audio.playLand();
      }
    }

    // 3. Walk Cycle Animation & Crunchy Snow Footstep SFX
    if (p.isMoving && p.isGrounded) {
      p.walkFrame += 0.22;
      p.stepSoundTimer += 1;

      // Drop snow footprints and crunch SFX on alternate steps
      if (p.stepSoundTimer > 14) {
        p.stepSoundTimer = 0;
        this.renderer.addFootstep(p.x, this.renderer.groundY + 1, p.facing);
        this.renderer.addFootPoof(p.x, this.renderer.groundY);
        audio.playSnowFootstep();
      }
    } else {
      p.walkFrame = 0;
      p.stepSoundTimer = 10;
    }

    // 4. Idle Breathing & Winter Condensation Breath Puffs
    p.breatheOffset = Math.sin(Date.now() * 0.0035) * 1.5;
    p.breathTimer += 1;
    if (p.breathTimer > 180) { // every ~3 seconds
      p.breathTimer = 0;
      this.renderer.addBreathPuff(p.x, this.renderer.groundY - p.y, p.facing);
    }

    // 5. Proximity Detection with Landmarks
    let foundLandmark = null;
    for (const lm of LANDMARKS) {
      const margin = 50;
      if (p.x >= lm.x - margin && p.x <= lm.x + lm.width + margin) {
        foundLandmark = lm;
        break;
      }
    }
    this.activeLandmark = foundLandmark;

    // 6. Smooth Camera Tracking with World Boundary Clamping
    const targetCamX = p.x - this.renderer.width / 2;
    const maxCamX = Math.max(0, STREET_TOTAL_WIDTH - this.renderer.width);
    const clampedCamX = Math.max(0, Math.min(maxCamX, targetCamX));

    // Smooth Lerp (0.08 factor gives buttery cinema feel)
    this.cameraX += (clampedCamX - this.cameraX) * 0.08;
  }

  gameLoop(currentTime) {
    const dt = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Physics & Camera update
    this.updatePhysics(dt);

    // Render Canvas Scene
    this.renderer.render(this.player, this.cameraX, this.activeLandmark, currentTime);

    // Update HUD telemetry and Minimap blip
    this.ui.updatePlayerPosition(this.player.x, this.activeLandmark);

    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

// Start application when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  new App();
});
