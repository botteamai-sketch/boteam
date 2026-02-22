"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CalendlyModal from "@/components/CalendlyModal";

/* קישורים זהים לדסקטופ – איך זה עובד, שימושים, שאלות נפוצות */
const DRAWER_LINKS = [
  { href: "/#how", label: "איך זה עובד" },
  { href: "/#usecases", label: "שימושים" },
  { href: "/faq", label: "שאלות נפוצות" },
] as const;

const ARIA_OPEN_MENU = "פתח תפריט";
const ARIA_NAV_MENU = "תפריט ניווט";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open; close on Escape
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <header
      className={`navbar sticky top-0 z-50 border-b border-gray-200 ${scrolled ? "scrolled" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center w-full gap-6">
        {/* סדר מימין לשמאל: כותרת → כפתור הדגמה → איך זה עובד → שימושים → שאלות נפוצות → לוגו */}
        <Link href="/" className="header-title flex-shrink-0">
          מחולל בוטים לפריוריטי
        </Link>
        <div className="hidden md:block flex-shrink-0">
          <CalendlyModal />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm flex-shrink-0">
          <a href="/#how" className="text-gray-600 hover:text-black transition whitespace-nowrap">
            איך זה עובד
          </a>
          <a href="/#usecases" className="text-gray-600 hover:text-black transition whitespace-nowrap">
            שימושים
          </a>
          <Link
            href="/faq"
            className={`transition whitespace-nowrap ${pathname === "/faq" ? "text-black font-medium" : "text-gray-600 hover:text-black"}`}
          >
            שאלות נפוצות
          </Link>
        </nav>
        <Link
          href="/"
          className="header-logo-wrap flex-shrink-0 md:ms-auto flex items-center transition-opacity duration-200 hover:opacity-85"
          aria-label="Boteam – דף הבית"
        >
          <Image
            src="/logo-boteam.png"
            alt="Boteam"
            width={120}
            height={36}
            className="h-9 w-auto object-contain header-logo-img"
            priority
          />
        </Link>
        {/* במובייל RTL: ms-auto דוחף את ההמבורגר לקצה הימני; 3 קווים → X באנימציה */}
        <div className="md:hidden flex-shrink-0 ms-auto">
          <button
            type="button"
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "סגור תפריט" : ARIA_OPEN_MENU}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Overlay — רק במובייל, לחיצה סוגרת */}
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        className={`mobile-menu-overlay fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* תפריט מובייל — רקע מלא, אנימציה, CTA בולט */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-full max-w-sm z-[60] ${
          menuOpen ? "open" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={ARIA_NAV_MENU}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-6 bg-white">
          <nav className="flex flex-col flex-1">
            {DRAWER_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="mobile-menu-link py-4 px-0 border-b border-gray-100 text-right text-[var(--text-primary)] hover:bg-gray-50 hover:text-black transition"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-cta pt-4 mt-auto border-t border-gray-200">
            <CalendlyModal size="lg" />
          </div>
        </div>
      </div>
    </header>
  );
}
