// src/ui.js - Retro HUD, Persistent CV Button, Feed Repo Links, Start Board & Connect Pavilion

import { DEVELOPER_PROFILE, LANDMARKS, STREET_TOTAL_WIDTH } from "./data.js";
import { audio } from "./audio.js";

export class UIManager {
  constructor(appContainer, callbacks) {
    this.container = appContainer;
    this.callbacks = callbacks;
    this.activeModal = null;
    this.activeTab = 0;
    this.isCrtEnabled = false; // CRT scanlines off by default as requested

    this.renderHUD();
    this.renderStartTutorialOverlay();
    this.renderMobileDpad();
    this.bindGlobalKeys();
  }

  renderHUD() {
    const hud = document.createElement("div");
    hud.id = "hud";
    hud.innerHTML = `
      <!-- Top Left: Identity & Telemetry -->
      <div class="hud-panel hud-profile">
        <div class="hud-avatar">
          <img src="${DEVELOPER_PROFILE.photoUrl || '/profile.jpg'}" alt="${DEVELOPER_PROFILE.name}" class="hud-avatar-img" />
        </div>
        <div class="hud-bio">
          <div class="hud-name">
            <span class="hud-name-full">${DEVELOPER_PROFILE.name}</span>
            <span class="hud-name-short">Syed Ayyan</span>
            <span class="hud-tag">AI/ML</span>
          </div>
          <div class="hud-title">${DEVELOPER_PROFILE.title}</div>
          <div class="hud-telemetry">
            <span class="hud-status-dot"></span>
            <span id="hud-pos">POS: X: 240px</span>
            <span class="hud-sep">|</span>
            <span id="hud-landmark">00: DEV DIRECTORY</span>
          </div>
        </div>
      </div>

      <!-- Top Right: Action Controls & Persistent CV Download Button -->
      <div class="hud-controls">
        <!-- CONSTANT TOP BUTTON: Download CV (PDF) -->
        <a href="${DEVELOPER_PROFILE.cvUrl}" download="Syed_Ayyan_CV.pdf" class="hud-btn hud-cv-btn" id="btn-top-cv" title="Download Syed's CV (PDF)">
          <span class="hud-icon">⬇</span>
          <span class="hud-btn-text">DOWNLOAD CV (PDF)</span>
          <span class="hud-btn-text-mobile">CV</span>
        </a>

        <!-- Weather / Time Toggle -->
        <button id="btn-weather" class="hud-btn" title="Toggle Weather / Time (Key: T)">
          <span class="hud-icon">🌆</span>
          <span id="txt-weather" class="hud-btn-text">Snowy Dusk</span>
        </button>

        <!-- CRT Filter Toggle (Off by default) -->
        <button id="btn-crt" class="hud-btn" title="Toggle Retro CRT Scanlines (Key: C)">
          <span class="hud-icon">📺</span>
          <span class="hud-btn-text">CRT: OFF</span>
        </button>

        <!-- Audio Music & SFX Toggle (Sound ON by default) -->
        <button id="btn-audio" class="hud-btn active" title="Toggle 8-Bit Lofi Music & SFX (Key: M)">
          <span class="hud-icon" id="audio-icon">🔊</span>
          <span class="hud-btn-text" id="audio-text">Audio: ON</span>
          <div class="hud-audio-bars" id="audio-visualizer">
            <div class="bar"></div><div class="bar"></div><div class="bar"></div>
            <div class="bar"></div><div class="bar"></div><div class="bar"></div>
          </div>
        </button>

        <!-- Help / Keybindings -->
        <button id="btn-help" class="hud-btn hud-btn-square" title="Controls Guide (Key: H or ?)">
          <span>?</span>
        </button>
      </div>
    `;

    this.container.appendChild(hud);

    // Bind HUD button listeners
    document.getElementById("btn-top-cv").addEventListener("click", () => {
      audio.playClick(1.6);
      this.showToast("✅ DOWNLOADING SYED_AYYAN_CV.PDF");
    });

    document.getElementById("btn-weather").addEventListener("click", () => {
      audio.playClick(1.2);
      if (this.callbacks.onThemeChange) this.callbacks.onThemeChange();
    });

    document.getElementById("btn-crt").addEventListener("click", () => {
      audio.playClick(1.0);
      this.toggleCrt();
    });

    document.getElementById("btn-audio").addEventListener("click", () => {
      const isUnmuted = audio.toggleMute();
      this.updateAudioButton(isUnmuted);
      if (isUnmuted) audio.playClick(1.5);
    });

    document.getElementById("btn-help").addEventListener("click", () => {
      audio.playClick(1.1);
      this.openHelpModal();
    });
  }

  showToast(msg) {
    const existing = document.getElementById("hud-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "hud-toast";
    toast.className = "hud-toast";
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      if (toast) toast.remove();
    }, 2800);
  }

  updateAudioButton(isUnmuted) {
    const btn = document.getElementById("btn-audio");
    const icon = document.getElementById("audio-icon");
    const text = document.getElementById("audio-text");
    if (!btn) return;

    if (isUnmuted) {
      btn.classList.add("active");
      icon.textContent = "🔊";
      text.textContent = "Audio: ON";
    } else {
      btn.classList.remove("active");
      icon.textContent = "🔇";
      text.textContent = "Audio: OFF";
    }
  }

  toggleCrt() {
    this.isCrtEnabled = !this.isCrtEnabled;
    const crtOverlay = document.getElementById("crt-overlay");
    const btnCrt = document.getElementById("btn-crt");
    if (crtOverlay) {
      if (this.isCrtEnabled) {
        crtOverlay.classList.remove("disabled");
        btnCrt.classList.add("active");
        btnCrt.querySelector(".hud-btn-text").textContent = "CRT: ON";
      } else {
        crtOverlay.classList.add("disabled");
        btnCrt.classList.remove("active");
        btnCrt.querySelector(".hud-btn-text").textContent = "CRT: OFF";
      }
    }
  }

  renderStartTutorialOverlay() {
    const banner = document.createElement("div");
    banner.id = "start-tutorial-banner";
    banner.className = "start-tutorial-banner";
    banner.innerHTML = `
      <div class="tutorial-arrow">👉</div>
      <div class="tutorial-content">
        <div class="tutorial-text desktop-tutorial">PRESS [D] OR [→] TO MOVE FORWARD</div>
        <div class="tutorial-text mobile-tutorial">TAP [▶] OR TAP STREET TO WALK</div>
        <div class="tutorial-sub">(OR CLICK ANYWHERE ON THE STREET AHEAD)</div>
      </div>
    `;
    this.container.appendChild(banner);
  }

  renderMobileDpad() {
    const dpad = document.createElement("div");
    dpad.id = "mobile-controls";
    dpad.className = "mobile-controls";
    dpad.innerHTML = `
      <div class="dpad-cluster">
        <button id="btn-dpad-left" class="dpad-btn" title="Walk Left">◀</button>
        <button id="btn-dpad-right" class="dpad-btn" title="Walk Right">▶</button>
      </div>
    `;
    this.container.appendChild(dpad);

    // Floating Touch Interaction Button (Compact, appears when near any building/board)
    const tapBtn = document.createElement("button");
    tapBtn.id = "btn-mobile-interact";
    tapBtn.className = "mobile-interact-btn hidden";
    tapBtn.innerHTML = `
      <span class="interact-icon">👆</span>
      <span class="interact-text">TAP TO OPEN</span>
    `;
    tapBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      audio.playClick(1.2);
      if (this.callbacks.onInteract) this.callbacks.onInteract();
    });
    this.container.appendChild(tapBtn);
  }

  updatePlayerPosition(playerX, activeLandmark) {
    const posEl = document.getElementById("hud-pos");
    const lmEl = document.getElementById("hud-landmark");
    if (posEl) posEl.textContent = `POS: X: ${Math.round(playerX)}px`;
    if (lmEl) {
      lmEl.textContent = activeLandmark ? activeLandmark.label : "AI SYSTEMS AVENUE";
    }

    // Toggle start tutorial overlay based on player progress
    const tutorialBanner = document.getElementById("start-tutorial-banner");
    if (tutorialBanner) {
      if (playerX > 400) {
        tutorialBanner.classList.add("hidden");
      } else {
        tutorialBanner.classList.remove("hidden");
      }
    }

    // Toggle Mobile Tap-to-Open Button
    const tapBtn = document.getElementById("btn-mobile-interact");
    if (tapBtn) {
      if (activeLandmark) {
        tapBtn.classList.remove("hidden");
        tapBtn.querySelector(".interact-text").textContent =
          activeLandmark.type === "cat" ? "PET CAT" : "TAP TO OPEN";
      } else {
        tapBtn.classList.add("hidden");
      }
    }

    const bars = audio.getVisualizerData();
    const barEls = document.querySelectorAll("#audio-visualizer .bar");
    barEls.forEach((el, idx) => {
      const val = bars[idx] || 0.1;
      el.style.height = `${Math.max(2, Math.round(val * 14))}px`;
    });
  }

  updateWeatherButtonText(name, icon) {
    const txt = document.getElementById("txt-weather");
    const btn = document.getElementById("btn-weather");
    if (txt) txt.textContent = name;
    if (btn) btn.querySelector(".hud-icon").textContent = icon;
  }

  openLandmarkModal(landmark) {
    audio.playOpenModal();
    this.activeTab = 0;

    let contentHtml = "";
    if (landmark.id === "start_board") {
      contentHtml = this.getStartBoardHtml(landmark);
    } else if (landmark.id === "connect_pavilion") {
      contentHtml = this.getConnectPavilionHtml(landmark);
    } else {
      contentHtml = this.getProjectHtml(landmark);
    }

    const modal = document.createElement("div");
    modal.className = "crt-modal-backdrop";
    modal.id = "active-modal";
    modal.innerHTML = `
      <div class="crt-terminal-frame">
        <div class="crt-terminal-header">
          <div class="terminal-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="terminal-title">${landmark.label} // ${landmark.badge}</div>
          <button class="terminal-close" id="btn-modal-close" title="Close [ESC]">✕</button>
        </div>
        <div class="crt-terminal-body">
          ${contentHtml}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.activeModal = modal;

    document.getElementById("btn-modal-close").addEventListener("click", () => this.closeModal());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) this.closeModal();
    });

    this.bindModalInteractions(landmark);
  }

  // 1. Start Board Modal (3 Panels: GitHub, Gmail, LinkedIn)
  getStartBoardHtml(landmark) {
    const panels = landmark.panels;
    return `
      <div class="start-board-modal">
        <div class="start-board-profile-row">
          <div class="modal-avatar-box">
            <img src="${DEVELOPER_PROFILE.photoUrl || '/profile.jpg'}" alt="${DEVELOPER_PROFILE.name}" class="modal-profile-img" />
          </div>
          <div class="start-board-header">
            <h2>DEVELOPER DIRECTORY & SOCIAL FREQUENCIES</h2>
            <div class="start-board-subtitle">${DEVELOPER_PROFILE.name} — ${DEVELOPER_PROFILE.title}</div>
            <p>Connect directly across verified engineering channels or explore projects ahead:</p>
          </div>
        </div>

        <div class="three-panels-grid">
          <!-- Panel 1: GitHub -->
          <div class="directory-card github">
            <div class="dir-icon">🐙</div>
            <h3>GITHUB REPOSITORIES</h3>
            <p>Access source code, model checkpoints, vector routing algorithms, and multi-agent systems.</p>
            <div class="dir-handle">@syedmuhammadayyanibrar</div>
            <a href="https://github.com/syedmuhammadayyanibrar" target="_blank" class="dir-btn github-btn">
              VIEW GITHUB CODE ↗
            </a>
          </div>

          <!-- Panel 2: Gmail -->
          <div class="directory-card gmail">
            <div class="dir-icon">✉️</div>
            <h3>DIRECT GMAIL INBOX</h3>
            <p>Direct communication for AI engineering roles, technical architecture, & consulting.</p>
            <div class="dir-handle">syedmuhammadayyanibrar@gmail.com</div>
            <div class="dir-btn-group">
              <a href="mailto:syedmuhammadayyanibrar@gmail.com" class="dir-btn gmail-btn">
                COMPOSE EMAIL ↗
              </a>
              <button class="dir-btn copy-btn" id="btn-copy-gmail-dir">
                COPY EMAIL
              </button>
            </div>
          </div>

            <!-- Panel 3: LinkedIn -->
          <div class="directory-card linkedin">
            <div class="dir-icon">💼</div>
            <h3>LINKEDIN NETWORK</h3>
            <p>Verified professional trajectory, peer endorsements, architecture case studies.</p>
            <div class="dir-handle">/in/ayyan-ibrar</div>
            <a href="https://linkedin.com/in/ayyan-ibrar" target="_blank" class="dir-btn linkedin-btn">
              CONNECT ON LINKEDIN ↗
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Project Dossier (Minimal, high-impact, single clean view)
  getProjectHtml(landmark) {
    const p = landmark.project;
    return `
      <div class="project-dossier-minimal">
        <!-- Minimal Top Header: Title, Category Badge & Direct Repo Link -->
        <div class="mini-header">
          <div class="mini-title-row">
            <div class="mini-title-group">
              <h2 class="mini-title">${p.name}</h2>
              <span class="mini-badge">${landmark.badge || 'AI SYSTEM'}</span>
            </div>
            <a href="${p.repoUrl}" target="_blank" class="mini-repo-btn" title="View Source Code on GitHub">
              <span>🐙 GITHUB</span> ↗
            </a>
          </div>
          <p class="mini-tagline">${p.tagline}</p>
        </div>

        <!-- Key Highlight Metrics -->
        <div class="mini-metrics-strip">
          ${p.metrics.map(m => `
            <div class="mini-metric-cell">
              <div class="mini-metric-val">${m.value}</div>
              <div class="mini-metric-lbl">${m.label}</div>
            </div>
          `).join("")}
        </div>

        <!-- Problem & Solution (Side-by-side cards) -->
        <div class="mini-core-grid">
          <div class="mini-card problem-card">
            <div class="mini-card-head">
              <span class="mini-card-icon">🎯</span>
              <span class="mini-card-label">PROBLEM STATEMENT</span>
            </div>
            <p class="mini-card-body">${p.problem}</p>
          </div>
          <div class="mini-card solution-card">
            <div class="mini-card-head">
              <span class="mini-card-icon">⚡</span>
              <span class="mini-card-label">ENGINEERED SOLUTION</span>
            </div>
            <p class="mini-card-body">${p.solution}</p>
          </div>
        </div>

        <!-- Core Engineering Pipeline -->
        <div class="mini-pipeline-box">
          <div class="mini-sec-heading">CORE DATAFLOW PIPELINE</div>
          <div class="mini-steps-list">
            ${p.architecture.map((step, idx) => `
              <div class="mini-step-item">
                <span class="mini-step-num">0${idx + 1}</span>
                <span class="mini-step-text">${step}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Tech Stack Pills -->
        <div class="mini-tech-wrap">
          <span class="mini-tech-label">STACK:</span>
          <div class="mini-pills">
            ${p.stack.map(s => `<span class="tech-pill">${s}</span>`).join("")}
          </div>
        </div>

        <!-- Minimal Action Footer -->
        <div class="mini-actions">
          <a href="${p.repoUrl}" target="_blank" class="mini-btn-primary">
            📦 VIEW SOURCE REPOSITORY ↗
          </a>
          <button class="mini-btn-secondary" id="btn-copy-clone" data-cmd="${p.cloneCmd}">
            📋 COPY CLONE CMD
          </button>
        </div>
      </div>
    `;
  }

  // 3. Finale Board: "Let's build together" (Exact replica of attached picture)
  getConnectPavilionHtml(landmark) {
    const card = landmark.connectCard;
    return `
      <div class="connect-pavilion-modal">
        <div class="finale-card">
          <div class="finale-avatar-wrap">
            <img src="${card.photoUrl || '/profile.jpg'}" alt="Syed Muhammad Ayyan Ibrar" class="finale-avatar-img" />
          </div>
          <div class="finale-eyebrow">${card.eyebrow}</div>
          <h1 class="finale-title">${card.title}</h1>
          <p class="finale-desc">${card.description}</p>

          <!-- 3 Replicated Buttons -->
          <div class="finale-buttons-row">
            <a href="mailto:${card.email}" class="btn-finale send-email" id="btn-finale-email">
              Send Email ✉
            </a>
            <a href="${card.cvUrl}" download="Syed_Ayyan_CV.pdf" class="btn-finale download-cv" id="btn-finale-cv">
              ⬇ Download CV (PDF)
            </a>
            <button class="btn-finale copy-email" id="btn-finale-copy">
              Copy Email
            </button>
          </div>

          <!-- Bottom Footer Row -->
          <div class="finale-footer-row">
            <a href="https://github.com/syedmuhammadayyanibrar" target="_blank" class="finale-foot-link">
              <span class="foot-icon">🐙</span> GitHub
            </a>
            <span class="dot-sep">•</span>
            <a href="https://linkedin.com/in/ayyan-ibrar" target="_blank" class="finale-foot-link">
              <span class="foot-icon">💼</span> LinkedIn
            </a>
            <span class="dot-sep">•</span>
            <span class="finale-foot-email">${card.email}</span>
          </div>
        </div>
      </div>
    `;
  }

  openHelpModal() {
    audio.playOpenModal();
    const modal = document.createElement("div");
    modal.className = "crt-modal-backdrop";
    modal.id = "active-modal";
    modal.innerHTML = `
      <div class="crt-terminal-frame" style="max-width: 620px;">
        <div class="crt-terminal-header">
          <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
          <div class="terminal-title">OPERATIONS MANUAL // CONTROLS & SECRETS</div>
          <button class="terminal-close" id="btn-modal-close">✕</button>
        </div>
        <div class="crt-terminal-body">
          <div class="help-manual">
            <h3>🕹️ NAVIGATION & CONTROLS</h3>
            <div class="help-table">
              <div class="help-row"><span>WALK HORIZONTALLY</span><span>[A] / [D] or [←] / [→] or CLICK ANYWHERE</span></div>
              <div class="help-row"><span>JUMP OVER SNOW</span><span>[SPACE] or [W] or [↑]</span></div>
              <div class="help-row"><span>INSPECT PROJECT / BOARD</span><span>[E] or [ENTER] when prompt appears</span></div>
              <div class="help-row"><span>DOWNLOAD CV</span><span>Top HUD Button or [E] on Finale Board</span></div>
              <div class="help-row"><span>WEATHER / TIME</span><span>[T] (Snowy Dusk / Midnight Cyber / Fog)</span></div>
              <div class="help-row"><span>CRT SCANLINES</span><span>[C] Toggle retro screen overlay</span></div>
              <div class="help-row"><span>8-BIT SYNTH MUSIC</span><span>[M] Toggle cozy lofi synth audio</span></div>
              <div class="help-row"><span>QUICK TRAVEL</span><span>Keys [1] through [6]</span></div>
            </div>

            <h3 style="margin-top: 20px;">🌟 EASTER EGGS</h3>
            <p>• <strong>Mochi the Cat:</strong> Located at the end next to the "Let's build together" pavilion! Walk up and pet Mochi!</p>
            <p>• <strong>Retro Konami Code:</strong> Press <kbd>↑</kbd> <kbd>↑</kbd> <kbd>↓</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>B</kbd> <kbd>A</kbd> anywhere on street for Cyber Rave Mode!</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.activeModal = modal;
    document.getElementById("btn-modal-close").addEventListener("click", () => this.closeModal());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) this.closeModal();
    });
  }

  openKonamiModal() {
    audio.playOpenModal();
    const modal = document.createElement("div");
    modal.className = "crt-modal-backdrop";
    modal.id = "active-modal";
    modal.innerHTML = `
      <div class="crt-terminal-frame" style="max-width: 540px; text-align: center; border-color: #00ffcc; box-shadow: 0 0 35px rgba(0, 255, 204, 0.4);">
        <div class="crt-terminal-header" style="background: rgba(0, 255, 204, 0.2);">
          <div class="terminal-dots"><span class="dot green"></span><span class="dot yellow"></span><span class="dot red"></span></div>
          <div class="terminal-title" style="color: #00ffcc;">SECRET UNLOCKED: CYBER RAVE MODE ACTIVATED!</div>
          <button class="terminal-close" id="btn-modal-close">✕</button>
        </div>
        <div class="crt-terminal-body" style="padding: 24px;">
          <div style="font-size: 36px; margin-bottom: 12px;">🎉 👾 ⚡ 🎶</div>
          <h2 style="font-family: 'Press Start 2P', monospace; font-size: 12px; color: #ff007f; margin-bottom: 14px; line-height: 1.6;">
            KONAMI CODE RECOGNIZED!
          </h2>
          <p style="font-size: 12px; color: #a0aec0; margin-bottom: 20px; line-height: 1.8;">
            You have unlocked maximum retro neon lighting and strobe effects on the street of AI Systems Avenue!
          </p>
          <button class="terminal-action-btn primary" id="btn-konami-close" style="background: #00ffcc; color: #0a0e17; font-weight: bold; padding: 10px 20px;">
            ROCK ON! 🚀
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    this.activeModal = modal;
    const closer = () => this.closeModal();
    document.getElementById("btn-modal-close").addEventListener("click", closer);
    const btnKonami = document.getElementById("btn-konami-close");
    if (btnKonami) btnKonami.addEventListener("click", closer);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closer();
    });
  }

  bindModalInteractions(landmark) {
    // Tab switching in project dossier
    const tabs = document.querySelectorAll(".dossier-tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        audio.playClick(1.2);
        const idx = tab.getAttribute("data-tab");
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        document.querySelectorAll(".dossier-page").forEach((page, pIdx) => {
          if (pIdx.toString() === idx) page.classList.add("active");
          else page.classList.remove("active");
        });
      });
    });

    // Carousel slides in Tab 4
    if (landmark.project && landmark.project.slides) {
      let curSlide = 0;
      const slides = landmark.project.slides;
      const btnPrev = document.getElementById("btn-slide-prev");
      const btnNext = document.getElementById("btn-slide-next");
      const slideTitle = document.getElementById("carousel-slide-title");
      const slideContent = document.getElementById("carousel-slide-content");
      const counter = document.getElementById("carousel-counter");

      const updateSlide = () => {
        if (slideTitle) slideTitle.textContent = slides[curSlide].title;
        if (slideContent) slideContent.textContent = slides[curSlide].content;
        if (counter) counter.textContent = `${curSlide + 1} / ${slides.length}`;
      };

      if (btnPrev) {
        btnPrev.addEventListener("click", () => {
          audio.playClick(1.1);
          curSlide = (curSlide - 1 + slides.length) % slides.length;
          updateSlide();
        });
      }
      if (btnNext) {
        btnNext.addEventListener("click", () => {
          audio.playClick(1.2);
          curSlide = (curSlide + 1) % slides.length;
          updateSlide();
        });
      }
    }

    // Copy Git Clone command in feed header
    const btnClone = document.getElementById("btn-copy-clone");
    if (btnClone) {
      btnClone.addEventListener("click", () => {
        audio.playClick(1.4);
        const cmd = btnClone.getAttribute("data-cmd");
        navigator.clipboard.writeText(cmd);
        btnClone.textContent = "✅ CLONE COMMAND COPIED!";
        setTimeout(() => {
          btnClone.textContent = `📋 ${cmd}`;
        }, 2200);
      });
    }

    // Copy Project Link
    const btnCopyLink = document.getElementById("btn-copy-link");
    if (btnCopyLink) {
      btnCopyLink.addEventListener("click", () => {
        audio.playClick(1.4);
        navigator.clipboard.writeText(window.location.origin + "#" + landmark.id);
        btnCopyLink.textContent = "✅ LINK COPIED!";
        setTimeout(() => { btnCopyLink.textContent = "🔗 COPY PROJECT LINK"; }, 2000);
      });
    }

    // Launch Live Demo button simulation
    const btnDemo = document.getElementById("btn-live-demo");
    if (btnDemo) {
      btnDemo.addEventListener("click", (e) => {
        e.preventDefault();
        audio.playClick(1.5);
        btnDemo.textContent = "⚡ CONNECTING CLOUD RUNTIME...";
        setTimeout(() => {
          audio.playClick(2.0);
          btnDemo.textContent = "🟢 SOTA INFERENCE CONTAINER ONLINE";
          setTimeout(() => {
            btnDemo.textContent = "🚀 LAUNCH LIVE BENCHMARK";
          }, 2400);
        }, 800);
      });
    }

    // Start Board Copy Gmail
    const btnCopyGmail = document.getElementById("btn-copy-gmail-dir");
    if (btnCopyGmail) {
      btnCopyGmail.addEventListener("click", () => {
        audio.playClick(1.4);
        navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
        btnCopyGmail.textContent = "✅ COPIED!";
        setTimeout(() => { btnCopyGmail.textContent = "COPY EMAIL"; }, 2000);
      });
    }

    // Finale Board Copy Email
    const btnFinaleCopy = document.getElementById("btn-finale-copy");
    if (btnFinaleCopy) {
      btnFinaleCopy.addEventListener("click", () => {
        audio.playClick(1.4);
        navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
        btnFinaleCopy.textContent = "✅ Copied!";
        setTimeout(() => { btnFinaleCopy.textContent = "Copy Email"; }, 2000);
      });
    }

    // Finale Board CV Download
    const btnFinaleCv = document.getElementById("btn-finale-cv");
    if (btnFinaleCv) {
      btnFinaleCv.addEventListener("click", () => {
        audio.playClick(1.6);
        this.showToast("✅ DOWNLOADING SYED_AYYAN_CV.PDF");
      });
    }
  }

  closeModal() {
    if (this.activeModal) {
      audio.playClick(0.9);
      this.activeModal.remove();
      this.activeModal = null;
    }
  }

  bindGlobalKeys() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.activeModal) {
        this.closeModal();
      }
    });
  }
}
