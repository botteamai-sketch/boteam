"use client";

import { useState } from "react";
import Link from "next/link";
import LeadModal from "@/components/LeadModal";
import SuccessToast from "@/components/SuccessToast";

const currentYear = new Date().getFullYear();

const linkClass =
  "text-white/80 hover:text-white transition block py-1 text-right";

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  return (
    <footer
      className="bg-[var(--primary-dark)] text-white/80 py-20"
      role="contentinfo"
    >
      <div className="mx-auto w-full max-w-[100%] px-10 md:px-[4.25rem] lg:px-24">
        <div className="flex flex-wrap justify-between gap-x-12 gap-y-10 text-right">
          {/* Column 1 – המוצר */}
          <div>
            <h3 className="text-white font-semibold mb-4">המוצר</h3>
            <p className="text-white/80 mb-3 text-right">
              מחולל הבוטים לפריוריטי
            </p>
            <nav className="flex flex-col" aria-label="קישורי מוצר">
              <Link href="/#demo" className={linkClass}>
                הדגמה
              </Link>
              <Link href="/faq" className={linkClass}>
                שאלות נפוצות
              </Link>
              <a href="/#how" className={linkClass}>
                איך זה עובד
              </a>
            </nav>
          </div>

          {/* Column 2 – שימושים */}
          <div>
            <h3 className="text-white font-semibold mb-4">שימושים</h3>
            <nav className="flex flex-col" aria-label="שימושים">
              <a href="/#usecases" className={linkClass}>
                מכירות
              </a>
              <a href="/#usecases" className={linkClass}>
                תפעול
              </a>
              <a href="/#usecases" className={linkClass}>
                גבייה
              </a>
              <a href="/#usecases" className={linkClass}>
                הנהלה
              </a>
              <a href="/#usecases" className={linkClass}>
                לידים
              </a>
            </nav>
          </div>

          {/* Column 3 – משאבים */}
          <div>
            <h3 className="text-white font-semibold mb-4">משאבים</h3>
            <nav className="flex flex-col" aria-label="משאבים">
              <Link href="/#demo" className={linkClass}>
                דמו
              </Link>
              <Link href="/faq" className={linkClass}>
                שאלות נפוצות
              </Link>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className={linkClass + " cursor-pointer border-0 bg-transparent p-0 font-inherit text-right w-full"}
                aria-label="יצירת קשר – השארת פרטים"
              >
                יצירת קשר
              </button>
            </nav>
          </div>
        </div>

        <LeadModal
          open={contactOpen}
          onOpenChange={setContactOpen}
          hideTrigger
          variant="dark"
          onSuccess={() => setShowSuccessToast(true)}
        />

        <SuccessToast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
        />

        {/* Bottom section – זכויות יוצרים */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-white/80 text-right">
          <span className="inline-flex items-center gap-2 flex-wrap justify-end">
            <span>© {currentYear} Boteam. כל הזכויות שמורות.</span>
          </span>
          <span>מערכת אוטומציה מתקדמת לפריוריטי ERP</span>
        </div>
      </div>
    </footer>
  );
}
