"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import VideoModal from "@/components/VideoModal";

const THUMBNAIL_URL = "/trailer-thumbnail.png";

export default function HeroVideo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="hero relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background image + Ken Burns (slow zoom) */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${THUMBNAIL_URL})` }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        {/* Overlay: vignette + dark layer */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.75)_70%)]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />

        {/* Overlay כהה לקריאות – WCAG AA */}
        <div className="hero-overlay absolute inset-0 z-[1]" aria-hidden />

        {/* עומק – gradient כחול עדין מעל ה-overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 70% 30%, rgba(63, 169, 245, 0.08), transparent 60%)",
          }}
          aria-hidden
        />

        {/* Content: כניסה אחת fade-up, כפתור play, טיפוגרפיה */}
        <div className="hero-content relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-20 opacity-0">
          {/* Play – אינדיקציה ברורה לסרטון */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="hero-play w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent border-0 mb-10"
            aria-label="הפעל סרטון"
          >
            <svg
              className="hero-play-icon w-11 h-11 sm:w-14 sm:h-14 ml-0.5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </button>

          <h1 className="text-4xl md:text-6xl font-bold max-w-[800px] mx-auto text-right mb-6" style={{ color: "#ffffff" }}>
            AI שמדבר עם הלקוחות שלך
            <br />
            ומעדכן את Priority אוטומטית
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto text-right" style={{ color: "rgba(255,255,255,0.95)" }}>
            השכבה החכמה שמחברת WhatsApp ל-Priority בזמן אמת
          </p>
        </div>

        {/* Scroll indicator – fade-in after 2s, gentle bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-white/70"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <VideoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
