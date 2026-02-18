"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
};

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      trackEvent("submit_lead", "conversion", "Lead Form");
      setForm(initialForm);
      setOpen(false);
      alert("הפרטים נשלחו בהצלחה!");
    } catch {
      alert("אירעה שגיאה. נסו שוב.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
  };

  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setForm(initialForm);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-white px-8 py-3 text-lg"
      >
        השאירו פרטים, נדבר בטלפון
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-md text-right shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 left-4 w-8 h-8 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center text-lg"
              aria-label="סגור"
            >
              ✕
            </button>

            <h3 id="lead-modal-title" className="text-2xl font-bold mb-6 pr-0">
              השאירו פרטים ונחזור אליכם
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  שם מלא *
                </label>
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="הכנס את שמך המלא"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3AA0D8] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lead-company" className="block text-sm font-medium text-gray-700 mb-1.5">
                  שם החברה
                </label>
                <input
                  id="lead-company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="שם הארגון או החברה"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3AA0D8] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  אימייל *
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="example@company.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3AA0D8] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  טלפון
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="050-0000000"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3AA0D8] focus:border-transparent"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#243B53] text-white rounded-xl py-3 font-medium hover:bg-[#1b2c3e] transition"
                >
                  שליחה
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  ביטול
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
