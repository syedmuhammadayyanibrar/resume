// src/controls.js - Smooth Character Movement, Touch D-Pad & Konami Engine

export class Controls {
  constructor(canvas, onInteract, onQuickTravel, onThemeToggle, onCrtToggle, onAudioToggle, onKonami) {
    this.canvas = canvas;
    this.onInteract = onInteract;
    this.onQuickTravel = onQuickTravel;
    this.onThemeToggle = onThemeToggle;
    this.onCrtToggle = onCrtToggle;
    this.onAudioToggle = onAudioToggle;
    this.onKonami = onKonami;

    // Movement state
    this.left = false;
    this.right = false;
    this.jump = false;
    this.interactPressed = false;

    // Click-to-move target (world coordinate X)
    this.targetX = null;

    // Konami Code sequence tracker
    this.konamiSequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    this.konamiProgress = 0;

    this.bindKeyboard();
    this.bindMouseAndTouch();
    this.bindMobileDpad();
  }

  bindKeyboard() {
    window.addEventListener("keydown", (e) => {
      // If a modal input or textarea is active, don't hijack typing
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        if (e.key === "Escape") {
          e.target.blur();
        }
        return;
      }
      if ((e.target.tagName === "BUTTON" || e.target.tagName === "A") && (e.code === "Enter" || e.code === "Space")) {
        return;
      }

      // Check Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A (or W W S S A D A D B A)
      const konamiValidators = [
        (e) => e.code === "ArrowUp" || e.code === "KeyW" || e.key === "ArrowUp" || e.key === "w" || e.key === "W",
        (e) => e.code === "ArrowUp" || e.code === "KeyW" || e.key === "ArrowUp" || e.key === "w" || e.key === "W",
        (e) => e.code === "ArrowDown" || e.code === "KeyS" || e.key === "ArrowDown" || e.key === "s" || e.key === "S",
        (e) => e.code === "ArrowDown" || e.code === "KeyS" || e.key === "ArrowDown" || e.key === "s" || e.key === "S",
        (e) => e.code === "ArrowLeft" || e.code === "KeyA" || e.key === "ArrowLeft" || e.key === "a" || e.key === "A",
        (e) => e.code === "ArrowRight" || e.code === "KeyD" || e.key === "ArrowRight" || e.key === "d" || e.key === "D",
        (e) => e.code === "ArrowLeft" || e.code === "KeyA" || e.key === "ArrowLeft" || e.key === "a" || e.key === "A",
        (e) => e.code === "ArrowRight" || e.code === "KeyD" || e.key === "ArrowRight" || e.key === "d" || e.key === "D",
        (e) => e.code === "KeyB" || (e.key && e.key.toLowerCase() === "b"),
        (e) => e.code === "KeyA" || (e.key && e.key.toLowerCase() === "a"),
      ];

      if (konamiValidators[this.konamiProgress](e)) {
        this.konamiProgress++;
        if (this.konamiProgress === konamiValidators.length) {
          this.konamiProgress = 0;
          if (this.onKonami) this.onKonami();
        }
      } else {
        this.konamiProgress = konamiValidators[0](e) ? 1 : 0;
      }

      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
          this.left = true;
          this.targetX = null; // Manual control cancels click-to-move
          break;
        case "KeyD":
        case "ArrowRight":
          this.right = true;
          this.targetX = null;
          break;
        case "KeyW":
        case "ArrowUp":
        case "Space":
          e.preventDefault();
          this.jump = true;
          break;
        case "KeyE":
        case "Enter":
          e.preventDefault();
          this.interactPressed = true;
          if (this.onInteract) this.onInteract();
          break;
        case "KeyT":
          if (this.onThemeToggle) this.onThemeToggle();
          break;
        case "KeyC":
          if (this.onCrtToggle) this.onCrtToggle();
          break;
        case "KeyM":
          if (this.onAudioToggle) this.onAudioToggle();
          break;
        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
          const idx = parseInt(e.key, 10) - 1;
          if (this.onQuickTravel) this.onQuickTravel(idx);
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyA":
        case "ArrowLeft":
          this.left = false;
          break;
        case "KeyD":
        case "ArrowRight":
          this.right = false;
          break;
        case "KeyW":
        case "ArrowUp":
        case "Space":
          this.jump = false;
          break;
        case "KeyE":
        case "Enter":
          this.interactPressed = false;
          break;
      }
    });
  }

  bindMouseAndTouch() {
    this.canvas.addEventListener("pointerdown", (e) => {
      // Don't intercept clicks if clicking on modal or HUD elements
      if (e.target !== this.canvas) return;

      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Dispatch custom event for renderer to convert to world coordinate
      const clickEvent = new CustomEvent("streetclick", {
        detail: { clickX, clickY }
      });
      window.dispatchEvent(clickEvent);
    });

    this.canvas.addEventListener("pointermove", (e) => {
      if (e.target !== this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const moveEvent = new CustomEvent("streetmousemove", {
        detail: { mouseX, mouseY }
      });
      window.dispatchEvent(moveEvent);
    });
  }

  setTargetX(worldX) {
    this.targetX = worldX;
  }

  clearTargetX() {
    this.targetX = null;
  }

  bindMobileDpad() {
    // Touch event listeners for virtual buttons on screen
    const setupTouchBtn = (btnId, onDown, onUp) => {
      const el = document.getElementById(btnId);
      if (!el) return;

      const handleStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onDown();
      };
      const handleEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onUp();
      };

      el.addEventListener("touchstart", handleStart, { passive: false });
      el.addEventListener("touchend", handleEnd, { passive: false });
      el.addEventListener("mousedown", handleStart);
      el.addEventListener("mouseup", handleEnd);
      el.addEventListener("mouseleave", handleEnd);
    };

    // Delay binding until DOM HUD is created
    setTimeout(() => {
      setupTouchBtn("btn-dpad-left", () => { this.left = true; this.targetX = null; }, () => { this.left = false; });
      setupTouchBtn("btn-dpad-right", () => { this.right = true; this.targetX = null; }, () => { this.right = false; });
    }, 200);
  }
}
