"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { trackEvent } from "@/lib/analytics";

export default function CalendlyModal() {
  const [open, setOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setPanelVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setPanelVisible(false);
    }
  }, [open]);

  const portalContent =
    open &&
    mounted &&
    typeof document !== "undefined" ? (
      <div
        className="fixed inset-0 z-[9999] bg-black/50"
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
            panelVisible ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/90 hover:bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center shadow-sm"
            aria-label="סגור"
          >
            ✕
          </button>

          <div className="flex-1 min-h-0 pt-16">
            <iframe
              src="https://calendly.com/bot-team-ai/30min?hide_gdpr_banner=1"
              className="w-full h-full"
              style={{ border: "0" }}
              title="תיאום פגישה"
            />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        onClick={() => {
          trackEvent("click_demo", "engagement", "Hero Demo Button");
          trackEvent("open_calendly", "engagement", "Calendly Modal");
          setOpen(true);
        }}
        className="rounded-xl bg-[#243B53] hover:bg-[#1b2c3e] transition px-8 py-3 text-white text-lg shadow-lg"
      >
        לתיאום שיחת הדגמה ללא עלות
      </button>

      {mounted &&
        typeof document !== "undefined" &&
        createPortal(portalContent, document.body)}
    </>
  );
}
