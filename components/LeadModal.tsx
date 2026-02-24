"use client";

import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
};

type LeadModalProps = {
  size?: "default" | "lg";
  variant?: "light" | "dark";
  /** כשמועבר – המודל נשלט מבחוץ (open/onOpenChange) */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** כשמופעל – לא מציג את כפתור ההפעלה (לפתיחה מקישור/כפתור אחר) */
  hideTrigger?: boolean;
  /** נקרא לאחר שליחה מוצלחת (לפני סגירת המודל) */
  onSuccess?: () => void;
};

export default function LeadModal({
  size = "default",
  variant = "dark",
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
  onSuccess,
}: LeadModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const isLarge = size === "lg";
  const isLight = variant === "light";
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("company") ?? "",
      company_website: formData.get("company_website"),
    };

    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      trackEvent("submit_lead", "conversion", "Lead Form");
      setError("");
      setSuccess(true);
      setForm(initialForm);
      e.currentTarget.reset();
      setTimeout(() => {
        handleClose();
        onSuccess?.();
      }, 800);
    } catch {
      setSuccess(false);
      setError("אירעה שגיאה בשליחה. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setSuccess(false);
    setError("");
  };

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (open) {
      setSuccess(false);
      setError("");
    }
  }, [open]);

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
      {!hideTrigger && (
        <button
          type="button"
          onClick={handleOpen}
          className={`button-secondary flex-col text-center leading-tight ${
          isLarge ? "px-6 py-3" : "px-5 py-2"
        } ${
          isLight
            ? ""
            : "!border-white !bg-transparent !text-white hover:!bg-white/10"
        }`}
      >
        <span className={isLarge ? "text-base font-medium" : "text-sm font-medium"}>השאירו פרטים</span>
        <span className={`${isLarge ? "text-sm" : "text-xs"} ${isLight ? "opacity-80" : "opacity-90"}`}>ונדבר בטלפון</span>
      </button>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4 md:p-6"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div
            className="modal-panel bg-white w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[22rem] md:max-w-[25.5rem] p-4 sm:p-5 md:p-6 text-right relative max-h-[calc(100vh-2rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-7 h-7 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center text-base"
              aria-label="סגור"
            >
              ✕
            </button>

            <h3 id="lead-modal-title" className="text-lg sm:text-xl font-bold mb-3 sm:mb-5 pr-0">
              השאירו פרטים ונחזור אליכם
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lead-company" className="block text-sm font-medium text-gray-700 mb-1">
                  שם החברה
                </label>
                <input
                  id="lead-company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="שם הארגון או החברה"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  טלפון
                </label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="050-0000000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3FA9F5] focus:border-transparent"
                />
              </div>

              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  opacity: 0,
                  height: 0,
                  width: 0,
                }}
              />
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--primary-dark)] text-white rounded-lg py-2 sm:py-2.5 font-medium hover:opacity-90 transition text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "שולח..." : "שליחה"}
                </button>
                {success && !error && (
                  <p className="text-green-600 mt-2 text-right">
                    הפרטים נשלחו בהצלחה! ניצור איתך קשר בהקדם 🚀
                  </p>
                )}
                {error && !success && (
                  <p className="text-red-600 mt-2 text-right">
                    {error}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
