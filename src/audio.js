// src/audio.js - Pure Web Audio API Sound Effects & Cozy 8-Bit Lofi Synth

class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.masterGain = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.isBgmPlaying = false;
    this.bgmStep = 0;
    this.bgmTimer = null;
    this.analyser = null;
    this.analyserData = new Uint8Array(16);
    this.lastFootstepTime = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 32;

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.6;
      this.sfxGain.connect(this.masterGain);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.35;
      this.bgmGain.connect(this.masterGain);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Web Audio not supported or failed to initialize", e);
    }
  }

  ensureContext() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.ensureContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0 : 0.7;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.05);
    }
    if (!this.isMuted && !this.isBgmPlaying) {
      this.startLofiBgm();
    }
    return !this.isMuted;
  }

  // 1. Crunchy pixel footstep in snow (Bandpass filtered white noise burst)
  playSnowFootstep() {
    if (this.isMuted) return;
    const now = performance.now();
    if (now - this.lastFootstepTime < 220) return; // Debounce footstep rhythm
    this.lastFootstepTime = now;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.09;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // High frequency white noise with fast decay
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Bandpass filter centered around 700-1100Hz gives authentic snow crunch texture
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(750 + Math.random() * 300, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      whiteNoise.start();
    } catch (_) {}
  }

  // 2. Jump whoosh
  playJump() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(380, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (_) {}
  }

  // 3. Landing thud in snow
  playLand() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch (_) {}
  }

  // 4. Mechanical UI click / Relay terminal beep
  playClick(pitch = 1.0) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(880 * pitch, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1320 * pitch, this.ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (_) {}
  }

  // 5. Modal open chime
  playOpenModal() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.04);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.04 + 0.18);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(this.ctx.currentTime + idx * 0.04);
        osc.stop(this.ctx.currentTime + idx * 0.04 + 0.19);
      } catch (_) {}
    });
  }

  // 6. Cat Meow Synth (Dual frequency glide with cute inflection)
  playCatMeow() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = "triangle";
      osc2.type = "sine";

      // "Mee-oww" pitch curve
      osc1.frequency.setValueAtTime(420, now);
      osc1.frequency.linearRampToValueAtTime(680, now + 0.12);
      osc1.frequency.exponentialRampToValueAtTime(360, now + 0.42);

      osc2.frequency.setValueAtTime(425, now);
      osc2.frequency.linearRampToValueAtTime(685, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(365, now + 0.42);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.linearRampToValueAtTime(2200, now + 0.15);
      filter.frequency.linearRampToValueAtTime(800, now + 0.45);

      gain.gain.setValueAtTime(0.0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.005, now + 0.44);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.46);
      osc2.stop(now + 0.46);
    } catch (_) {}
  }

  // 7. Konami Easter Egg Fanfare
  playKonamiFanfare() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const fanfare = [
      { f: 523.25, d: 0.1 },  // C5
      { f: 659.25, d: 0.1 },  // E5
      { f: 783.99, d: 0.1 },  // G5
      { f: 1046.50, d: 0.15 },// C6
      { f: 880.00, d: 0.1 },  // A5
      { f: 1046.50, d: 0.1 }, // C6
      { f: 1174.66, d: 0.1 }, // D6
      { f: 1318.51, d: 0.35 } // E6 (triumphant hold)
    ];

    let t = this.ctx.currentTime;
    fanfare.forEach((n) => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(n.f, t);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + n.d + 0.01);
      } catch (_) {}
      t += n.d * 1.05;
    });
  }

  // 8. Cozy 8-Bit Lofi Ambient Chiptune Synth Engine
  startLofiBgm() {
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    // Atmospheric warm pentatonic chord progression (Snowy dusk vibes)
    // Chords: Dm9 -> G13 -> Cmaj9 -> Am9
    const chordProgression = [
      [146.83, 220.00, 261.63, 329.63, 392.00], // Dm9 (D3, A3, C4, E4, G4)
      [196.00, 246.94, 293.66, 329.63, 440.00], // G13 (G3, B3, D4, E4, A4)
      [130.81, 196.00, 246.94, 329.63, 392.00], // Cmaj9 (C3, G3, B3, E4, G4)
      [110.00, 164.81, 220.00, 261.63, 329.63], // Am9 (A2, E3, A3, C4, E4)
    ];

    // Sparkle melody notes (twinkling star arpeggios)
    const melodyScale = [
      523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51
    ];

    let currentChordIndex = 0;
    const bpm = 68; // slow cozy lofi tempo
    const stepInterval = (60 / bpm) * 1000;

    const playChordStep = () => {
      if (!this.isBgmPlaying || !this.ctx) return;

      const now = this.ctx.currentTime;
      const chord = chordProgression[currentChordIndex];

      // Play soft warm chord pads
      chord.forEach((freq, i) => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = i === 0 ? "triangle" : "sine";
          osc.frequency.setValueAtTime(freq, now);

          // Subtle analog detuning for lush cozy warmth
          osc.detune.setValueAtTime((Math.random() - 0.5) * 6, now);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(520 + (i * 90), now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.045 / chord.length, now + 0.4);
          gain.gain.setValueAtTime(0.045 / chord.length, now + (stepInterval / 1000) * 1.8);
          gain.gain.exponentialRampToValueAtTime(0.0005, now + (stepInterval / 1000) * 2.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.bgmGain);

          osc.start(now);
          osc.stop(now + (stepInterval / 1000) * 2.3);
        } catch (_) {}
      });

      // Occasional gentle arpeggio bell notes (like snowflakes drifting)
      if (Math.random() > 0.15) {
        const noteCount = 3 + Math.floor(Math.random() * 3);
        for (let j = 0; j < noteCount; j++) {
          const noteFreq = melodyScale[Math.floor(Math.random() * melodyScale.length)];
          const noteTime = now + (j * 0.32) + 0.2;

          try {
            const bell = this.ctx.createOscillator();
            const bellGain = this.ctx.createGain();
            bell.type = "triangle";
            bell.frequency.setValueAtTime(noteFreq, noteTime);

            bellGain.gain.setValueAtTime(0.001, noteTime);
            bellGain.gain.linearRampToValueAtTime(0.025, noteTime + 0.04);
            bellGain.gain.exponentialRampToValueAtTime(0.0005, noteTime + 0.45);

            bell.connect(bellGain);
            bellGain.connect(this.bgmGain);

            bell.start(noteTime);
            bell.stop(noteTime + 0.48);
          } catch (_) {}
        }
      }

      currentChordIndex = (currentChordIndex + 1) % chordProgression.length;
      this.bgmTimer = setTimeout(playChordStep, stepInterval * 2);
    };

    playChordStep();
  }

  stopLofiBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  // Get frequency spectrum for HUD equalizer bars
  getVisualizerData() {
    if (!this.analyser || this.isMuted) {
      return [0, 0, 0, 0, 0, 0];
    }
    this.analyser.getByteFrequencyData(this.analyserData);
    const bars = [];
    for (let i = 0; i < 6; i++) {
      bars.push(this.analyserData[i * 2] / 255);
    }
    return bars;
  }
}

export const audio = new SoundController();
