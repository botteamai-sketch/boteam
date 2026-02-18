"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CalendlyModal from "@/components/CalendlyModal";

const DRAWER_LINKS = [
  { href: "/", label: "בית" },
  { href: "/demo", label: "הדגמה" },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/demo", label: "צור קשר" },
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
    } else {
      document.body.style.overflow = "";
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200 transition-shadow ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center">
        {/* לוגו / שם */}
        <div className="flex-1">
          <Link href="/" className="text-lg font-semibold">
            מחולל הבוטים לפריוריטי
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#how" className="text-gray-600 hover:text-black transition">
              איך זה עובד
            </a>
            <a href="#usecases" className="text-gray-600 hover:text-black transition">
              שימושים
            </a>
            <Link
              href="/faq"
              className={`transition ${pathname === "/faq" ? "text-black font-medium" : "text-gray-600 hover:text-black"}`}
            >
              שאלות נפוצות
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <CalendlyModal />
          </div>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center p-2 text-gray-600 hover:text-black transition"
            onClick={() => setMenuOpen(true)}
            aria-label={ARIA_OPEN_MENU}
            aria-expanded={menuOpen}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay — click closes */}
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer — RTL from right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transition-transform duration-200 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={ARIA_NAV_MENU}
      >
        <div className="flex flex-col h-full pt-16">
          {DRAWER_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="py-4 px-6 border-b border-gray-100 text-right text-[#243B53] hover:bg-gray-50 hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="p-4 mt-auto border-t border-gray-100">
            <CalendlyModal />
          </div>
        </div>
      </div>
    </header>
  );
}
