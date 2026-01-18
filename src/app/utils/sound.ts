class SoundManager {
    private ctx: AudioContext | null = null;
    private muted: boolean = false;

    constructor() {
        // Try to load mute state from local storage
        if (typeof window !== 'undefined') {
            const savedMute = localStorage.getItem('drrm-game-muted');
            this.muted = savedMute === 'true';
        }
    }

    private getContext() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            this.ctx = new AudioContext();
        }
        return this.ctx;
    }

    setMuted(muted: boolean) {
        this.muted = muted;
        if (typeof window !== 'undefined') {
            localStorage.setItem('drrm-game-muted', String(muted));
        }
    }

    getMuted() {
        return this.muted;
    }

    play(type: 'click' | 'success' | 'error' | 'alert' | 'start' | 'hover') {
        if (this.muted) return;
        const ctx = this.getContext();
        if (!ctx) return;

        if (ctx.state === 'suspended') ctx.resume().catch(() => { });

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'click':
                // Short high blip
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;

            case 'hover':
                // Very subtle tick
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, now);
                gain.gain.setValueAtTime(0.02, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
                break;

            case 'success':
                // Major chord arpeggio
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now); // A
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);

                // Harmony
                const osc2 = ctx.createOscillator();
                const gain2 = ctx.createGain();
                osc2.connect(gain2);
                gain2.connect(ctx.destination);
                osc2.type = 'triangle';
                osc2.frequency.setValueAtTime(554.37, now + 0.1); // C#
                gain2.gain.setValueAtTime(0, now);
                gain2.gain.setValueAtTime(0.05, now + 0.1);
                gain2.gain.linearRampToValueAtTime(0, now + 0.5);
                osc2.start(now);
                osc2.stop(now + 0.5);
                break;

            case 'error':
                // Low distorted buzz
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.linearRampToValueAtTime(100, now + 0.3);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
                break;

            case 'alert':
                // Siren-like
                osc.type = 'square';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.linearRampToValueAtTime(800, now + 0.2);
                osc.frequency.linearRampToValueAtTime(600, now + 0.4);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.6);
                osc.start(now);
                osc.stop(now + 0.6);
                break;

            case 'start':
                // Rising powerup sound
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.5);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 1.0);
                osc.start(now);
                osc.stop(now + 1.0);
                break;
        }
    }
}

export const soundManager = new SoundManager();
