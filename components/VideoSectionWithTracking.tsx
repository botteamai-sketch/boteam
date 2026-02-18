"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { trackVideoProgress } from "@/lib/analytics";

const VIDEO_ID = "ajluMwsHUY0";
const DURATION_SEC = 84; // PT1M24S
const MILESTONES = [25, 50, 75, 100];

declare global {
  interface Window {
    YT?: { Player: new (el: string | HTMLElement, opts: { videoId: string; events?: { onStateChange?: (e: { data: number }) => void } }) => { getCurrentTime: () => number; getPlayerState: () => number } };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YT_PLAYING = 1;

export default function VideoSectionWithTracking() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReturnType<NonNullable<typeof window.YT>>["Player"] | null>(null);
  const firedRef = useRef<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [apiReady, setApiReady] = useState(false);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    if (window.YT) setApiReady(true);
    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  useEffect(() => {
    if (!apiReady || !window.YT) return;

    const el = document.getElementById("demo-video-player");
    if (!el) return;

    const player = new window.YT!.Player("demo-video-player", {
      videoId: VIDEO_ID,
      events: {
        onStateChange(e: { data: number }) {
          if (e.data === YT_PLAYING) {
            intervalRef.current = setInterval(() => {
              const currentTime = player.getCurrentTime();
              const percent = Math.min(100, Math.floor((currentTime / DURATION_SEC) * 100));
              MILESTONES.forEach((m) => {
                if (percent >= m && !firedRef.current.has(m)) {
                  firedRef.current.add(m);
                  trackVideoProgress(m);
                }
              });
            }, 500);
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
      firedRef.current.clear();
      if (playerRef.current?.destroy) playerRef.current.destroy();
      playerRef.current = null;
    };
  }, [apiReady]);

  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.YT) setApiReady(true);
        }}
      />
      <div ref={containerRef} className="w-full">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-lg">
          <div id="demo-video-player" className="h-full w-full" />
        </div>
      </div>
    </>
  );
}
