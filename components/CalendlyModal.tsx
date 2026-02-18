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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="relative bg-white rounded-2xl w-full max-w-4xl h-[80vh] shadow-2xl overflow-hidden">

            {/* כפתור סגירה */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <iframe
              src="https://calendly.com/bot-team-ai/30min"
              className="w-full h-full"
              frameBorder="0"
            />

          </div>

        </div>
      )}
    </>
  );
}
