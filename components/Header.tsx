"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
      className={`navbar sticky top-0 z-50 border-b border-gray-200 ${scrolled ? "scrolled" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center">
        {/* לוגו אופקי – 36px, hover עדין */}
        <div className="flex-1 flex justify-end">
          <Link href="/" className="inline-block transition-opacity duration-200 ease-out hover:opacity-85 me-6" aria-label="Boteam – דף הבית">
            <Image src="/logo-boteam.png" alt="Boteam" width={120} height={36} className="h-9 w-auto object-contain bg-transparent" priority />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* Hamburger — mobile only; ראשון כדי שיופיע בצד ימין ב-RTL */}
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

          {/* Desktop nav – /#... כדי שיעבדו גם מעמודים אחרים */}
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="/#how" className="text-gray-600 hover:text-black transition">
              איך זה עובד
            </a>
            <a href="/#usecases" className="text-gray-600 hover:text-black transition">
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
        </div>
      </div>

      {/* Overlay — כהה יותר כדי שהתפריט יבלוט; לחיצה סוגרת */}
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-200 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer — RTL מימין; רקע לבן אטום (#fff) ללא שקיפות */}
      <div
        className={`fixed top-0 right-0 h-full w-64 shadow-2xl border-r border-gray-200 z-[60] transition-transform duration-200 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#ffffff" }}
        role="dialog"
        aria-modal="true"
        aria-label={ARIA_NAV_MENU}
      >
        <div className="flex flex-col h-full pt-16 min-h-full bg-[#ffffff]">
          {DRAWER_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="py-4 px-6 border-b border-gray-100 text-right text-[var(--text-primary)] hover:bg-gray-50 hover:text-black transition"
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
