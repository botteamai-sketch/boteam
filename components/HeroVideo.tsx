"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import VideoModal from "@/components/VideoModal";

const THUMBNAIL_URL = "/trailer-thumbnail.png";

export default function HeroVideo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">
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

        {/* Content: Play first, then title, then subtitle */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-20">
          {/* Play – central, dominant */}
          <motion.button
            type="button"
            onClick={() => setModalOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              boxShadow: [
                "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)",
                "0 30px 60px -12px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.15)",
                "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08)",
              ],
            }}
            transition={{
              opacity: { duration: 0.8, ease: "easeOut" },
              y: { duration: 0.8, ease: "easeOut" },
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-sm border border-white/40 flex items-center justify-center text-[#243B53] shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent mb-10"
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
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto text-right mb-4"
          >
            AI שמדבר עם הלקוחות שלך
            <br />
            ומעדכן את Priority אוטומטית
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto text-right"
          >
            השכבה החכמה שמחברת WhatsApp ל-Priority בזמן אמת
          </motion.p>
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
