"use client";

import { CSSProperties, useMemo, useRef, useState } from "react";

type FlagConfig = {
  left: string;
  delay: number;
  scale: number;
  height: number;
  rotation: number;
  z: number;
};

const FLAG_CONFIG: FlagConfig[] = [
  { left: "2%", delay: 0, scale: 0.85, height: 10, rotation: -4, z: 6 },
  { left: "9%", delay: 0.6, scale: 0.9, height: 11, rotation: -2, z: 7 },
  { left: "16%", delay: 1.2, scale: 1, height: 12, rotation: 0, z: 8 },
  { left: "23%", delay: 1.8, scale: 1.05, height: 13, rotation: 2, z: 9 },
  { left: "30%", delay: 2.4, scale: 1.1, height: 14, rotation: -1, z: 10 },
  { left: "37%", delay: 1, scale: 0.95, height: 11.5, rotation: -3, z: 8 },
  { left: "44%", delay: 0.4, scale: 0.88, height: 11, rotation: 1, z: 7 },
  { left: "51%", delay: 2.1, scale: 1.08, height: 13.5, rotation: -2, z: 10 },
  { left: "58%", delay: 1.5, scale: 1.02, height: 12.5, rotation: 1, z: 9 },
  { left: "65%", delay: 0.8, scale: 0.94, height: 11, rotation: -1, z: 8 },
  { left: "72%", delay: 1.9, scale: 0.9, height: 10.5, rotation: 3, z: 7 },
  { left: "79%", delay: 0.3, scale: 0.88, height: 10, rotation: -2, z: 6 },
];

const Flag = ({ config }: { config: FlagConfig }) => (
  <div
    className="flag absolute bottom-0 flex flex-col items-center"
    style={
      {
        left: config.left,
        animationDelay: `${config.delay}s`,
        zIndex: config.z,
        "--flag-scale": config.scale,
        "--flag-tilt": `${config.rotation}deg`,
      } as CSSProperties
    }
  >
    <div
      className="flag-pole"
      style={{ height: `${config.height}rem` }}
      aria-hidden
    />
    <div
      className="flag-cloth"
      style={{ height: `${config.height * 0.35}rem` }}
      aria-hidden
    >
      <span className="flag-band flag-band--white" />
      <span className="flag-band flag-band--red" />
    </div>
  </div>
);

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  const flags = useMemo(
    () => FLAG_CONFIG.map((config) => <Flag key={config.left} config={config} />),
    []
  );

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      void audio.play().catch(() => {
        /* Autoplay blocked; user can retry by pressing the button again. */
      });
    }
    const nextMuted = !muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <div className="scene">
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_1c3fb932ed.mp3?filename=epic-inspiring-orchestra-113441.mp3"
        autoPlay
        loop
        muted={muted}
        className="hidden"
      />

      <div className="scene__panorama">
        <div className="scene__sunrise" />
        <div className="scene__flare" />
        <svg
          className="scene__skyline"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="skylineGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#f2d9a1" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#cb9a60" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7f4e26" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0 300 L40 290 L60 230 L90 235 L110 200 L180 210 L210 110 L240 115 L260 210 L310 200 L350 125 L380 130 L400 90 L430 95 L460 150 L490 145 L520 180 L560 178 L620 120 L640 125 L660 210 L690 215 L720 180 L760 188 L780 230 L820 200 L840 210 L850 160 L880 162 L910 140 L940 150 L970 120 L990 130 L1010 200 L1060 210 L1120 190 L1160 200 L1200 190 L1200 400 L0 400 Z"
            fill="url(#skylineGradient)"
            opacity="0.9"
          />
          <path
            d="M0 320 L60 310 L120 320 L160 300 L210 310 L260 290 L320 300 L360 280 L420 300 L480 275 L540 290 L600 270 L660 290 L720 265 L780 285 L840 270 L900 280 L960 260 L1020 280 L1080 265 L1140 275 L1200 260 L1200 400 L0 400 Z"
            fill="#47301f"
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="scene__crowd">
        <div className="scene__crowd-base" />
        {flags}
      </div>

      <div className="scene__rider">
        <svg
          viewBox="0 0 1200 700"
          className="scene__rider-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <linearGradient id="riderGradient" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#1c0f0b" />
              <stop offset="35%" stopColor="#1f1410" />
              <stop offset="75%" stopColor="#2f1d17" />
              <stop offset="100%" stopColor="#422820" />
            </linearGradient>
            <linearGradient id="maneGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#3b251c" />
              <stop offset="100%" stopColor="#1f110c" />
            </linearGradient>
          </defs>
          <g className="scene__rider-group">
            <path
              d="M220 470 C300 360, 470 340, 600 410 C640 430, 670 470, 710 510 C730 530, 750 560, 700 580 C650 600, 540 610, 480 600 C410 590, 360 560, 300 520 C260 495, 230 490, 220 470 Z"
              fill="url(#riderGradient)"
            />
            <path
              d="M480 360 C520 310, 580 300, 650 320 C720 340, 780 380, 810 420 C840 460, 800 520, 780 540 C760 560, 720 520, 700 500 C680 480, 660 450, 640 430 C600 390, 540 380, 500 390 C470 400, 460 380, 480 360 Z"
              fill="url(#riderGradient)"
            />
            <path
              d="M640 320 C670 270, 720 250, 770 250 C830 250, 900 290, 930 340 C960 390, 920 420, 880 430 C840 440, 790 420, 770 400 C750 380, 730 350, 700 330 C680 320, 650 335, 640 320 Z"
              fill="url(#maneGradient)"
              className="scene__mane"
            />
            <path
              d="M370 420 C360 380, 360 330, 370 300 C380 270, 420 250, 460 250 C500 250, 520 270, 530 300 C540 330, 540 380, 530 410 C520 440, 480 460, 440 460 C400 460, 380 440, 370 420 Z"
              fill="url(#riderGradient)"
            />
            <path
              d="M450 260 C445 220, 470 200, 500 190 C530 180, 580 190, 590 210 C600 230, 580 250, 565 260 C550 270, 520 280, 500 280 C480 280, 455 290, 450 260 Z"
              fill="#22140f"
            />
            <path
              d="M370 540 C340 500, 310 470, 280 460 C260 455, 240 470, 240 500 C240 530, 260 570, 280 580 C300 590, 330 570, 350 560 C370 550, 380 565, 390 580 C400 595, 420 610, 430 600 C440 590, 420 560, 410 540 C400 520, 390 520, 370 540 Z"
              fill="url(#riderGradient)"
            />
            <path
              d="M620 540 C640 500, 660 470, 690 450 C720 430, 760 410, 780 430 C800 450, 780 490, 760 520 C740 550, 720 590, 690 610 C660 630, 630 620, 610 600 C590 580, 600 560, 620 540 Z"
              fill="url(#riderGradient)"
            />
            <path
              d="M520 420 C550 400, 600 410, 640 430 C680 450, 710 480, 720 510 C730 540, 710 560, 680 560 C650 560, 600 540, 570 520 C540 500, 500 450, 520 420 Z"
              fill="url(#riderGradient)"
            />
            <circle cx="490" cy="215" r="22" fill="#050302" className="scene__leader-face" />
          </g>
        </svg>
      </div>

      <div className="scene__lens-depth" aria-hidden />
      <div className="scene__grain" aria-hidden />

      <div className="scene__titles">
        <p className="scene__subtitle">Warsaw, 11 listopada 1918</p>
        <h1 className="scene__heading">Świt Odrodzenia</h1>
        <p className="scene__body">
          A proud Polish commander rides through streets reborn, the dawn ablaze
          with golden hope as the nation breathes freedom once more.
        </p>
        <button className="scene__audio-toggle" onClick={toggleMute}>
          {muted ? "Unmute the orchestral score" : "Mute the orchestral score"}
        </button>
      </div>
    </div>
  );
}
