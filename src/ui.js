// src/ui.js - Retro HUD, Minimap, CRT Dossier Modals & Touch D-Pad

import { DEVELOPER_PROFILE, LANDMARKS, STREET_TOTAL_WIDTH } from "./data.js";
import { audio } from "./audio.js";

export class UIManager {
  constructor(appContainer, callbacks) {
    this.container = appContainer;
    this.callbacks = callbacks; // { onThemeChange, onCrtToggle, onAudioToggle, onTravelTo }
    this.activeModal = null;
    this.activeTab = 0;
    this.galleryIndex = 0;
    this.isCrtEnabled = true;

    this.renderHUD();
    this.renderMinimap();
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
          <div class="pixel-avatar-icon"></div>
        </div>
        <div class="hud-bio">
          <div class="hud-name">${DEVELOPER_PROFILE.name} <span class="hud-tag">LVL.99</span></div>
          <div class="hud-title">${DEVELOPER_PROFILE.title}</div>
          <div class="hud-telemetry">
            <span class="hud-status-dot"></span>
            <span id="hud-pos">POS: X: 480px</span>
            <span class="hud-sep">|</span>
            <span id="hud-landmark">DAILY BYTES KIOSK</span>
          </div>
        </div>
      </div>

      <!-- Top Right: Action Controls -->
      <div class="hud-controls">
        <!-- Weather / Time Toggle -->
        <button id="btn-weather" class="hud-btn" title="Toggle Weather / Time (Key: T)">
          <span class="hud-icon">🌆</span>
          <span id="txt-weather" class="hud-btn-text">Snowy Dusk</span>
        </button>

        <!-- CRT Filter Toggle -->
        <button id="btn-crt" class="hud-btn active" title="Toggle Retro CRT Scanlines (Key: C)">
          <span class="hud-icon">📺</span>
          <span class="hud-btn-text">CRT: ON</span>
        </button>

        <!-- Audio Music & SFX Toggle -->
        <button id="btn-audio" class="hud-btn" title="Toggle 8-Bit Lofi Music & SFX (Key: M)">
          <span class="hud-icon" id="audio-icon">🔇</span>
          <span class="hud-btn-text" id="audio-text">Audio: OFF</span>
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

  renderMinimap() {
    const minimap = document.createElement("div");
    minimap.id = "minimap-panel";
    minimap.className = "minimap-panel";

    let iconsHtml = "";
    LANDMARKS.forEach((lm, idx) => {
      const pct = (lm.x / STREET_TOTAL_WIDTH) * 100;
      let symbol = "📍";
      if (lm.type === "kiosk") symbol = "📰";
      else if (lm.type === "metro") symbol = "🚆";
      else if (lm.type === "datacenter") symbol = "🧠";
      else if (lm.type === "bank") symbol = "🏦";
      else if (lm.type === "broadcast") symbol = "📡";
      else if (lm.type === "arcade") symbol = "🕹️";
      else if (lm.type === "cat") symbol = "🐱";
      else if (lm.type === "phonebooth") symbol = "☎️";

      iconsHtml += `
        <button class="minimap-node" style="left: ${pct}%;" data-idx="${idx}" title="${lm.label} (Key: ${idx + 1})">
          <span class="minimap-node-icon">${symbol}</span>
          <span class="minimap-node-label">${lm.badge}</span>
        </button>
      `;
    });

    minimap.innerHTML = `
      <div class="minimap-header">
        <span class="minimap-title">STREET RADAR & FAST TRAVEL</span>
        <span class="minimap-hint">CLICK ICON TO TRAVEL</span>
      </div>
      <div class="minimap-track" id="minimap-track">
        <div class="minimap-road"></div>
        ${iconsHtml}
        <div class="minimap-player-blip" id="minimap-player-blip"></div>
      </div>
    `;

    this.container.appendChild(minimap);

    // Bind minimap click-to-travel
    minimap.querySelectorAll(".minimap-node").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute("data-idx"), 10);
        audio.playClick(1.3);
        if (this.callbacks.onTravelTo) this.callbacks.onTravelTo(idx);
      });
    });
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
      <div class="action-cluster">
        <button id="btn-dpad-jump" class="action-btn jump" title="Jump (W / Space)">B</button>
        <button id="btn-dpad-act" class="action-btn act" title="Interact (E)">A</button>
      </div>
    `;
    this.container.appendChild(dpad);
  }

  updatePlayerPosition(playerX, activeLandmark) {
    // Update HUD telemetry
    const posEl = document.getElementById("hud-pos");
    const lmEl = document.getElementById("hud-landmark");
    if (posEl) posEl.textContent = `POS: X: ${Math.round(playerX)}px`;
    if (lmEl) {
      lmEl.textContent = activeLandmark ? activeLandmark.label : "NEO-TOKYO AVE";
    }

    // Update Minimap blip
    const blip = document.getElementById("minimap-player-blip");
    if (blip) {
      const pct = (playerX / STREET_TOTAL_WIDTH) * 100;
      blip.style.left = `${Math.max(1, Math.min(99, pct))}%`;
    }

    // Update audio equalizer visualizer bars
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
    this.galleryIndex = 0;

    let contentHtml = "";
    if (landmark.type === "kiosk") {
      contentHtml = this.getKioskHtml(landmark);
    } else if (landmark.type === "metro") {
      contentHtml = this.getMetroHtml(landmark);
    } else if (landmark.type === "cat") {
      contentHtml = this.getCatHtml(landmark);
    } else if (landmark.type === "phonebooth") {
      contentHtml = this.getPhoneBoothHtml(landmark);
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

    // Close on backdrop or close button
    document.getElementById("btn-modal-close").addEventListener("click", () => this.closeModal());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) this.closeModal();
    });

    this.bindModalInteractions(landmark);
  }

  getKioskHtml(landmark) {
    const data = landmark.newspaperData;
    return `
      <div class="newspaper-container">
        <div class="newspaper-header">
          <div class="news-issue">${data.issueNo}</div>
          <div class="news-masthead">THE DAILY BYTES</div>
          <div class="news-date">${data.date}</div>
        </div>

        <div class="news-headline">${data.headline}</div>

        <div class="news-columns">
          <div class="news-col primary">
            <h3>EDITORIAL PROFILE</h3>
            <p>${data.leadArticle}</p>
            <div class="news-quote">
              "Great engineering is like classic city architecture: rock-solid infrastructure under the asphalt, with warm, radiant beauty on the surface."
            </div>
            <h3>CORE SKILL RADAR</h3>
            <div class="tech-radar-grid">
              ${DEVELOPER_PROFILE.skills.languages.map(s => `<span class="tech-pill lang">${s}</span>`).join("")}
              ${DEVELOPER_PROFILE.skills.backend.map(s => `<span class="tech-pill back">${s}</span>`).join("")}
              ${DEVELOPER_PROFILE.skills.frontend.map(s => `<span class="tech-pill front">${s}</span>`).join("")}
              ${DEVELOPER_PROFILE.skills.dataDevOps.map(s => `<span class="tech-pill devops">${s}</span>`).join("")}
            </div>
          </div>

          <div class="news-col secondary">
            <h3>ENGINEERING ETHOS</h3>
            <ul class="ethos-list">
              ${data.philosophy.map(p => `<li>${p}</li>`).join("")}
            </ul>

            <h3 style="margin-top: 18px;">CURRENT 2026 FOCUS</h3>
            <ul class="focus-list">
              ${data.currentFocus.map(f => `<li>⚡ ${f}</li>`).join("")}
            </ul>

            <div class="news-status-box">
              <div class="status-title">STATUS: ACTIVE</div>
              <div class="status-desc">${DEVELOPER_PROFILE.status}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getMetroHtml(landmark) {
    const schedule = landmark.scheduleData;
    return `
      <div class="metro-container">
        <div class="metro-board-header">
          <div class="metro-board-title">NEO-CENTRAL RAILWAY // CAREER DEPARTURE TIMELINE</div>
          <div class="metro-board-subtitle">CHRONOLOGICAL PROFESSIONAL MILESTONES & LEADERSHIP</div>
        </div>

        <div class="metro-schedule-table">
          ${schedule.map((item, idx) => `
            <div class="metro-row" style="animation-delay: ${idx * 0.08}s">
              <div class="metro-col-time">
                <span class="train-code">${item.trainNo}</span>
                <span class="train-time">${item.time}</span>
              </div>
              <div class="metro-col-main">
                <div class="metro-role-title">${item.role} <span class="metro-company">@ ${item.company}</span></div>
                <div class="metro-desc">${item.description}</div>
                <ul class="metro-bullets">
                  ${item.highlights.map(h => `<li>▹ ${h}</li>`).join("")}
                </ul>
                <div class="metro-tags">
                  ${item.stack.map(t => `<span class="metro-tag">${t}</span>`).join("")}
                </div>
              </div>
              <div class="metro-col-status">
                <span class="status-badge ${item.status.toLowerCase()}">${item.status}</span>
                <span class="platform-badge">${item.platform}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  getProjectHtml(landmark) {
    const p = landmark.project;
    return `
      <div class="project-dossier">
        <!-- Top Dossier Bar -->
        <div class="dossier-nav">
          <button class="dossier-tab active" data-tab="0">1. OVERVIEW & PROBLEM</button>
          <button class="dossier-tab" data-tab="1">2. ARCHITECTURE & STACK</button>
          <button class="dossier-tab" data-tab="2">3. LIVE TELEMETRY</button>
          <button class="dossier-tab" data-tab="3">4. CRT BLUEPRINT</button>
        </div>

        <!-- Tab 0: Overview & Problem -->
        <div class="dossier-page active" id="dossier-page-0">
          <div class="dossier-hero">
            <h2 class="project-title">${p.name}</h2>
            <div class="project-subtitle">${p.subtitle}</div>
            <div class="project-tagline">${p.tagline}</div>
          </div>

          <div class="dossier-grid">
            <div class="dossier-card challenge">
              <h3>⚠️ PROBLEM STATEMENT</h3>
              <p>${p.problem}</p>
            </div>
            <div class="dossier-card solution">
              <h3>🛡️ ENGINEERED SOLUTION</h3>
              <p>${p.solution}</p>
            </div>
          </div>

          <div class="metrics-row">
            ${p.metrics.map(m => `
              <div class="metric-box">
                <div class="metric-val">${m.value}</div>
                <div class="metric-lbl">${m.label}</div>
                <div class="metric-sub">${m.rating}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Tab 1: Architecture & Stack -->
        <div class="dossier-page" id="dossier-page-1">
          <h3>SYSTEM PIPELINE DATAFLOW</h3>
          <div class="architecture-flow">
            ${p.architecture.map((step, idx) => `
              <div class="arch-step">
                <span class="step-num">[STAGE 0${idx + 1}]</span>
                <span class="step-text">${step}</span>
              </div>
            `).join("")}
          </div>

          <h3 style="margin-top: 18px;">TECHNOLOGY STACK</h3>
          <div class="tech-radar-grid">
            ${p.stack.map(s => `<span class="tech-pill">${s}</span>`).join("")}
          </div>
        </div>

        <!-- Tab 2: Live Telemetry & Metrics -->
        <div class="dossier-page" id="dossier-page-2">
          <h3>REAL-TIME CLOUD TELEMETRY // PRODUCTION SLA</h3>
          <div class="telemetry-grid">
            <div class="telemetry-gauge">
              <div class="gauge-title">LIGHTHOUSE PERFORMANCE</div>
              <div class="gauge-bar-outer"><div class="gauge-bar-fill" style="width: 100%;"></div></div>
              <div class="gauge-value">100 / 100 (GRADE A+)</div>
            </div>
            <div class="telemetry-gauge">
              <div class="gauge-title">SYSTEM AVAILABILITY (SLA)</div>
              <div class="gauge-bar-outer"><div class="gauge-bar-fill" style="width: 99.99%;"></div></div>
              <div class="gauge-value">99.999% ZERO DOWNTIME</div>
            </div>
            <div class="telemetry-gauge">
              <div class="gauge-title">SPECULATIVE CACHE EFFICIENCY</div>
              <div class="gauge-bar-outer"><div class="gauge-bar-fill" style="width: 88%;"></div></div>
              <div class="gauge-value">88.4% HIT RATIO</div>
            </div>
            <div class="telemetry-gauge">
              <div class="gauge-title">TEST COVERAGE & INTEGRATION</div>
              <div class="gauge-bar-outer"><div class="gauge-bar-fill" style="width: 96%;"></div></div>
              <div class="gauge-value">96.8% AUTOMATED CI</div>
            </div>
          </div>
        </div>

        <!-- Tab 3: CRT Blueprint / Simulated Monitor Carousel -->
        <div class="dossier-page" id="dossier-page-3">
          <div class="ascii-monitor">
            <div class="ascii-monitor-topbar">
              <span class="ascii-monitor-header" id="carousel-slide-title">${p.slides[0].title}</span>
              <div class="carousel-nav-btns">
                <button class="carousel-btn" id="btn-slide-prev">◀ PREV</button>
                <span class="carousel-slide-counter" id="carousel-counter">1 / ${p.slides.length}</span>
                <button class="carousel-btn" id="btn-slide-next">NEXT ▶</button>
              </div>
            </div>
            <pre class="ascii-content" id="carousel-slide-content">${p.slides[0].content}</pre>
          </div>
        </div>

        <!-- Action Footer -->
        <div class="dossier-footer">
          <a href="${p.liveDemoUrl}" target="_blank" class="terminal-action-btn primary" id="btn-live-demo">
            🚀 LAUNCH LIVE DEMO
          </a>
          <a href="${p.githubUrl}" target="_blank" class="terminal-action-btn secondary">
            📦 VIEW SOURCE ON GITHUB
          </a>
          <button class="terminal-action-btn tertiary" id="btn-copy-link">
            🔗 COPY PROJECT LINK
          </button>
        </div>
      </div>
    `;
  }

  getCatHtml(landmark) {
    return `
      <div class="cat-dialogue-modal">
        <div class="cat-portrait-box">
          <div class="cat-portrait">🐱</div>
          <div class="cat-badge">MOCHI // ALLEY GUARDIAN</div>
        </div>
        <div class="cat-speech-bubble">
          <div class="cat-purr-title">*Purrrrrr... Meow!*</div>
          <p class="cat-quote">${landmark.quote}</p>
          <div class="cat-perks">
            <div class="perk">🐾 +50 Warmth in Cold Dusk</div>
            <div class="perk">✨ Secret Badge Unlocked: [STREET COMPANION]</div>
            <div class="perk">🛡️ 0 Runtime Exceptions Guarantee</div>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <button class="terminal-action-btn primary" id="btn-pet-again">💖 PET MOCHI AGAIN</button>
        </div>
      </div>
    `;
  }

  getPhoneBoothHtml(landmark) {
    const data = landmark.contactData;
    return `
      <div class="contact-terminal">
        <div class="contact-header">
          <div class="contact-title">TELE-POST CENTRAL // DIRECT TRANSMISSION</div>
          <div class="contact-subtitle">${data.availability}</div>
        </div>

        <div class="contact-grid">
          <!-- Direct Message Form -->
          <div class="contact-form-box">
            <h3>TRANSMIT DIRECT DISPATCH</h3>
            <form id="contact-form" onsubmit="return false;">
              <div class="form-row">
                <label>CALLSIGN / NAME:</label>
                <input type="text" id="msg-name" placeholder="e.g. Alex Vance" required />
              </div>
              <div class="form-row">
                <label>RETURN TRANSMISSION / EMAIL:</label>
                <input type="email" id="msg-email" placeholder="alex@company.com" required />
              </div>
              <div class="form-row">
                <label>MESSAGE PACKET:</label>
                <textarea id="msg-body" rows="4" placeholder="Hello Syed, I saw your work on high-throughput distributed systems..." required></textarea>
              </div>
              <button type="submit" class="terminal-action-btn primary" id="btn-send-dispatch">
                📡 TRANSMIT DISPATCH
              </button>
              <div id="dispatch-status" class="dispatch-status"></div>
            </form>
          </div>

          <!-- Quick Connect & Socials -->
          <div class="contact-channels">
            <h3>DIRECT FREQUENCIES</h3>
            <div class="channel-card">
              <div class="ch-label">DIRECT EMAIL</div>
              <div class="ch-val">${data.email}</div>
              <button class="terminal-action-btn secondary btn-copy" id="btn-copy-email">
                📋 COPY EMAIL
              </button>
            </div>

            <h3 style="margin-top: 16px;">NETWORKS</h3>
            <div class="social-links-grid">
              ${DEVELOPER_PROFILE.socials.map(s => `
                <a href="${s.url}" target="_blank" class="social-btn">
                  <span>${s.label}</span>
                  <span class="handle">${s.handle}</span>
                </a>
              `).join("")}
            </div>
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
              <div class="help-row"><span>INSPECT LANDMARK</span><span>[E] or [ENTER] when prompt appears</span></div>
              <div class="help-row"><span>CLOSE TERMINAL</span><span>[ESC] or click outside</span></div>
              <div class="help-row"><span>WEATHER / TIME</span><span>[T] (Snowy Dusk / Midnight Cyber / Fog)</span></div>
              <div class="help-row"><span>CRT SCANLINES</span><span>[C] Toggle retro screen overlay</span></div>
              <div class="help-row"><span>8-BIT SYNTH MUSIC</span><span>[M] Toggle cozy lofi synth audio</span></div>
              <div class="help-row"><span>QUICK TRAVEL</span><span>Keys [1] through [7]</span></div>
            </div>

            <h3 style="margin-top: 20px;">🌟 EASTER EGGS</h3>
            <p>• <strong>Mochi the Cat:</strong> Located at coordinate X: 4180px next to the steam vent. Walk up and pet Mochi!</p>
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
    audio.playKonamiFanfare();
    const modal = document.createElement("div");
    modal.className = "crt-modal-backdrop";
    modal.id = "active-modal";
    modal.innerHTML = `
      <div class="crt-terminal-frame" style="max-width: 580px; border-color: #ff00ff; box-shadow: 0 0 35px rgba(255, 0, 255, 0.6);">
        <div class="crt-terminal-header" style="background: #2a0033;">
          <div class="terminal-dots"><span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span></div>
          <div class="terminal-title" style="color: #00ffff;">★ SECRET UNLOCKED: CYBER RAVE 2026 ★</div>
          <button class="terminal-close" id="btn-modal-close">✕</button>
        </div>
        <div class="crt-terminal-body" style="text-align: center; padding: 30px;">
          <div style="font-size: 40px; margin-bottom: 15px;">🎆 🕹️ 🌈 🤖 🎆</div>
          <h2 style="font-family: 'Press Start 2P'; font-size: 14px; color: #ff0077; line-height: 1.8;">
            KONAMI CODE RECOGNIZED!
          </h2>
          <p style="font-size: 15px; color: #d0f0ff; margin-top: 15px; line-height: 1.6;">
            You have unlocked the Aurora Borealis Rainbow Sky & High-Frequency Synth Arpeggios!
          </p>
          <div style="margin-top: 25px;">
            <button class="terminal-action-btn primary" id="btn-rave-continue" style="background: #ff0077;">
              LET'S RAVE!
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.activeModal = modal;
    document.getElementById("btn-modal-close").addEventListener("click", () => this.closeModal());
    document.getElementById("btn-rave-continue").addEventListener("click", () => this.closeModal());
  }

  bindModalInteractions(landmark) {
    // Project dossier tabs
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

    // CRT Blueprint Carousel Slider handlers
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

    // Launch Live Demo button simulation
    const btnDemo = document.getElementById("btn-live-demo");
    if (btnDemo) {
      btnDemo.addEventListener("click", (e) => {
        e.preventDefault();
        audio.playClick(1.5);
        btnDemo.textContent = "⚡ CONNECTING SANDBOX...";
        setTimeout(() => {
          audio.playClick(2.0);
          btnDemo.textContent = "🟢 SANDBOX ONLINE (PORT 8080)";
          setTimeout(() => {
            btnDemo.textContent = "🚀 LAUNCH LIVE DEMO";
          }, 2400);
        }, 900);
      });
    }

    // Copy project link
    const btnCopyLink = document.getElementById("btn-copy-link");
    if (btnCopyLink) {
      btnCopyLink.addEventListener("click", () => {
        audio.playClick(1.4);
        navigator.clipboard.writeText(window.location.origin + "#" + landmark.id);
        btnCopyLink.textContent = "✅ LINK COPIED!";
        setTimeout(() => { btnCopyLink.textContent = "🔗 COPY PROJECT LINK"; }, 2000);
      });
    }

    // Pet Mochi Again button
    const btnPet = document.getElementById("btn-pet-again");
    if (btnPet) {
      btnPet.addEventListener("click", () => {
        audio.playCatMeow();
        btnPet.textContent = "🐾 MOCHI PURRED HAPPILY!";
        setTimeout(() => { btnPet.textContent = "💖 PET MOCHI AGAIN"; }, 1800);
      });
    }

    // Contact Form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        audio.playClick(1.6);
        const statusEl = document.getElementById("dispatch-status");
        statusEl.innerHTML = `<span style="color: #00ffcc;">[TRANSMITTING PACKET VIA RETRO TELE-POST...]</span>`;
        setTimeout(() => {
          audio.playClick(2.0);
          statusEl.innerHTML = `<span style="color: #00ff88;">✅ DISPATCH DELIVERED! Syed will transmit back shortly.</span>`;
          contactForm.reset();
        }, 1200);
      });
    }

    // Copy Email button
    const btnCopyEmail = document.getElementById("btn-copy-email");
    if (btnCopyEmail) {
      btnCopyEmail.addEventListener("click", () => {
        audio.playClick(1.4);
        navigator.clipboard.writeText(landmark.contactData.email);
        btnCopyEmail.textContent = "✅ COPIED TO CLIPBOARD!";
        setTimeout(() => { btnCopyEmail.textContent = "📋 COPY EMAIL"; }, 2000);
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
