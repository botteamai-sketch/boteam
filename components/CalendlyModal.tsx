"use client";

import { useState } from "react";

export default function CalendlyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#243B53] hover:bg-[#1b2c3e] transition px-8 py-3 text-white text-lg shadow-lg"
      >
        לתיאום שיחת הדגמה ללא עלות
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              width: "min(1100px, 100%)",
              height: "min(90vh, 900px)",
              minHeight: "700px",
            }}
          >
            {/* כפתור סגירה */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-gray-100 text-gray-500 hover:text-black flex items-center justify-center shadow-sm"
              aria-label="סגור"
            >
              ✕
            </button>

            <iframe
              src="https://calendly.com/bot-team-ai/30min"
              className="w-full flex-1 min-h-0"
              style={{ minHeight: "650px" }}
              title="תיאום פגישה"
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </>
  );
}
