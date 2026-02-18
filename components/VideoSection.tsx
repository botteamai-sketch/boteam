"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent, trackVideoProgress } from "@/lib/analytics";

const VIDEO_ID = "ajluMwsHUY0";
const PLAYER_CONTAINER_ID = "video-section-yt-player";
const MILESTONES = [25, 50, 75, 100] as const;
const YT_PLAYING = 1;
const POLL_INTERVAL_MS = 500;
const INTERSECTION_THRESHOLD = 0.4;

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        opts: {
          videoId: string;
          events?: { onStateChange?: (e: { data: number }) => void };
        }
      ) => {
        getCurrentTime: () => number;
        getDuration: () => number;
        getPlayerState: () => number;
        playVideo?: () => void;
        pauseVideo?: () => void;
        destroy?: () => void;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function VideoSection() {
  const [progress, setProgress] = useState(0);
  const [apiReady, setApiReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<ReturnType<NonNullable<typeof window.YT>>["Player"] | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const firedMilestonesRef = useRef<Set<number>>(new Set());

  // —— YouTube IFrame API: register global callback (called once when API is ready) ——
  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  // —— YouTube API: create player when ready; poll progress when playing; cleanup on unmount ——
  useEffect(() => {
    if (!apiReady || typeof window.YT?.Player !== "function") return;

    const container = document.getElementById(PLAYER_CONTAINER_ID);
    if (!container) return;

    const player = new window.YT!.Player(PLAYER_CONTAINER_ID, {
      videoId: VIDEO_ID,
      events: {
        onStateChange(e: { data: number }) {
          if (e.data === YT_PLAYING) {
            intervalRef.current = setInterval(() => {
              const currentTime = player.getCurrentTime();
              const duration = player.getDuration();
              if (duration <= 0) return;
              const percent = Math.min(100, (currentTime / duration) * 100);
              setProgress(percent);

              MILESTONES.forEach((m) => {
                if (percent >= m && !firedMilestonesRef.current.has(m)) {
                  firedMilestonesRef.current.add(m);
                  trackVideoProgress(m);
                }
              });
            }, POLL_INTERVAL_MS);
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        },
      },
    });
    playerRef.current = player;

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      firedMilestonesRef.current.clear();
      if (playerRef.current?.destroy) playerRef.current.destroy();
      playerRef.current = null;
    };
  }, [apiReady]);

  // —— IntersectionObserver: pause video when section leaves viewport (single observer, no re-renders) ——
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) return;

        const player = playerRef.current;
        if (player?.getPlayerState?.() === YT_PLAYING && typeof player.pauseVideo === "function") {
          player.pauseVideo();
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleOverlayPlay = () => {
    setHasStarted(true);
    if (typeof playerRef.current?.playVideo === "function") {
      playerRef.current.playVideo();
    }
    trackEvent("video_first_play", "engagement", "Demo Video");
  };

  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="afterInteractive"
      />

      <motion.section
        ref={sectionRef}
        id="demo"
        className="relative overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC] py-32 border-t border-gray-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Decorative background blur */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#3AA0D8]/10 blur-3xl pointer-events-none"
          aria-hidden
        />

        <div className="relative mx-auto max-w-6xl px-6 text-right">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#243B53]">
            הדגמה אמיתית מתוך פריוריטי
          </h2>
          <p className="text-lg text-gray-600 mb-14 max-w-2xl mx-auto">
            תהליך עסקי מלא – מהאירוע במערכת, דרך שיחת וואטסאפ חכמה ועד לעדכון אוטומטי של השדות הנכונים ב-ERP.
          </p>

          {/* Product Window Frame */}
          <div className="rounded-3xl border border-gray-200 shadow-xl bg-white overflow-hidden mb-6">
            {/* Top Bar */}
            <div className="h-10 bg-gray-100 flex items-center justify-start px-4 gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400/80" aria-hidden />
              <span className="w-3 h-3 rounded-full bg-gray-400/80" aria-hidden />
              <span className="w-3 h-3 rounded-full bg-gray-500/80" aria-hidden />
            </div>

            {/* Iframe container (relative for overlay positioning) */}
            <div className="relative aspect-video w-full bg-black">
              <div id={PLAYER_CONTAINER_ID} className="h-full w-full" />

              {/* Blur overlay: fades out after first play, does not unmount player or reload iframe */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer backdrop-blur-md bg-black/20 transition-opacity duration-300 ${
                  hasStarted ? "opacity-0 pointer-events-none" : ""
                }`}
                onClick={handleOverlayPlay}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOverlayPlay();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="הפעלת ההדגמה"
              >
                {/* Large circular play button with subtle hover scale */}
                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="#3AA0D8"
                    className="w-10 h-10"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </div>
                <span className="text-white text-sm font-medium drop-shadow-sm">
                  לחצו לצפייה בהדגמה
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar and label */}
          <div className="mb-14">
            <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-[#3AA0D8] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 text-right">
              צפיתם ב-{Math.round(progress)}% מההדגמה
            </p>
          </div>

          {/* Value bullets */}
          <ul className="grid gap-8 md:grid-cols-3 text-right mb-12" role="list">
            <li className="flex flex-col items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-[#3AA0D8]/10 flex items-center justify-center shrink-0">
                <span className="text-[#3AA0D8] font-bold text-lg" aria-hidden>1</span>
              </div>
              <h3 className="font-bold text-[#243B53]">יוזם תהליך</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                אירוע עסקי בפריוריטי מפעיל שיחה אוטומטית
              </p>
            </li>
            <li className="flex flex-col items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-[#3AA0D8]/10 flex items-center justify-center shrink-0">
                <span className="text-[#3AA0D8] font-bold text-lg" aria-hidden>2</span>
              </div>
              <h3 className="font-bold text-[#243B53]">מבין שפה חופשית</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                המערכת שואלת, מבהירה ומעדכנת שדות מדויקים
              </p>
            </li>
            <li className="flex flex-col items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-[#3AA0D8]/10 flex items-center justify-center shrink-0">
                <span className="text-[#3AA0D8] font-bold text-lg" aria-hidden>3</span>
              </div>
              <h3 className="font-bold text-[#243B53]">סוגר מעגל</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                סטטוסים, תאריכים ואישורים נשמרים אוטומטית
              </p>
            </li>
          </ul>

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-xl bg-[#243B53] hover:bg-[#1b2c3e] transition px-8 py-3 text-white font-medium shadow-lg"
            >
              לצפייה בהדגמה מלאה ותיאום פגישה
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}