"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

const EMBED_URL =
  "https://www.youtube.com/embed/ajluMwsHUY0?enablejsapi=1&playsinline=1";

export default function VideoSection() {
  const [hasStarted, setHasStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleOverlayPlay = () => {
    setHasStarted(true);
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: "playVideo",
      }),
      "*"
    );
    trackEvent("video_first_play", "engagement", "Demo Video");
  };

  return (
    <motion.section
      id="demo"
      className="section relative overflow-x-hidden bg-gradient-to-b from-white to-[var(--background-soft)] border-t border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--primary-light)]/10 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 text-right">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-2 justify-start text-right">
          <span className="shrink-0 w-[22px] h-[22px] inline-block" aria-hidden>
            <Image src="/brand/bubble-icon.svg" alt="" width={22} height={22} className="w-full h-full" />
          </span>
          <span>סרטון הדגמה מתוך פריוריטי</span>
        </h2>
        <p className="text-lg text-gray-600 mb-14 max-w-2xl me-auto ms-0 text-right">
          תהליך עסקי מלא – מהאירוע במערכת, דרך שיחת וואטסאפ חכמה ועד לעדכון אוטומטי של השדות הנכונים בפריוריטי.
        </p>

        <div className="rounded-3xl border border-gray-200 shadow-xl bg-white overflow-hidden">
          <div className="h-10 bg-gray-100 flex items-center justify-start px-4 gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-400/80" aria-hidden />
            <span className="w-3 h-3 rounded-full bg-gray-400/80" aria-hidden />
            <span className="w-3 h-3 rounded-full bg-gray-500/80" aria-hidden />
          </div>

          <div className="relative w-full aspect-video min-h-[200px] bg-black">
            <iframe
              ref={iframeRef}
              src={EMBED_URL}
              title="מחולל הבוטים לפריוריטי – הדגמה"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-b-2xl"
            />

            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer backdrop-blur-md bg-black/20 transition-opacity duration-300 ${
                hasStarted ? "opacity-0 pointer-events-none" : "opacity-100"
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
              <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-200">
                <svg
                  viewBox="0 0 24 24"
                  fill="var(--primary-light)"
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
      </div>
    </motion.section>
  );
}
