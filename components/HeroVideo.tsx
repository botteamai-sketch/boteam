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

        {/* עומק – gradient כחול עדין מעל ה-overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 70% 30%, rgba(63, 169, 245, 0.08), transparent 60%)",
          }}
          aria-hidden
        />
        {/* Accent blur – ירוק עדין (עומק) */}
        <div
          className="absolute w-[500px] h-[500px] -top-[100px] -right-[100px] z-[2] pointer-events-none"
          style={{
            background: "rgba(71, 182, 73, 0.06)",
            filter: "blur(120px)",
          }}
          aria-hidden
        />

        {/* רמז מיתוגי – בועת דיבור ירוקה עדינה (opacity 6%) */}
        <div className="hero-accent absolute top-1/2 left-[12%] -translate-y-1/2 w-40 h-40 pointer-events-none z-[1]" aria-hidden>
          <svg viewBox="0 0 56 48" fill="none" className="w-full h-full opacity-[0.06]" style={{ color: "var(--accent-green)" }}>
            <path fill="currentColor" d="M44 4H12C6.5 4 2 8.5 2 14v14c0 5.5 4.5 10 10 10h2l4 6 4-6h22c5.5 0 10-4.5 10-10V14c0-5.5-4.5-10-10-10z" />
            <circle cx="20" cy="22" r="2.5" fill="white" className="dot" />
            <circle cx="28" cy="22" r="2.5" fill="white" className="dot" style={{ animationDelay: "0.5s" }} />
            <circle cx="36" cy="22" r="2.5" fill="white" className="dot" style={{ animationDelay: "1s" }} />
          </svg>
        </div>

        {/* Content: כניסה אחת fade-up, כפתור primary, טיפוגרפיה */}
        <div className="hero-content relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-20 opacity-0">
          {/* Play – כפתור primary מוצרי */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="hero-primary-button w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent mb-10 border-0"
            aria-label="הפעל סרטון"
          >
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 ml-0.5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </button>

          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-[800px] mx-auto text-right mb-6">
            AI שמדבר עם הלקוחות שלך
            <br />
            ומעדכן את Priority אוטומטית
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto text-right">
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
