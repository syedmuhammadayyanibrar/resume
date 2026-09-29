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

    // Listen for custom click-to-move events from canvas
    window.addEventListener("streetclick", (e) => {
      const clickX = e.detail.clickX;
      const worldX = Math.max(40, Math.min(STREET_TOTAL_WIDTH - 60, this.cameraX + clickX));
      this.controls.setTargetX(worldX);
      this.renderer.destinationMarker = { x: worldX, timer: 75 };
      audio.playClick(0.9);
    });

    // Window Resize listener
    window.addEventListener("resize", () => {
      this.renderer.resize();
    });

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
      if (this.activeLandmark.type === "cat") {
        audio.playCatMeow();
      }
      this.ui.openLandmarkModal(this.activeLandmark);
    }
  }

  handleKonamiCode() {
    this.renderer.triggerRaveMode();
    this.ui.openKonamiModal();
  }

  updatePhysics(dt) {
    const moveSpeed = 4.4;
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
