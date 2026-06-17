"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  isSetupPromoActive,
  PROMO_VALIDITY,
  PROMO_LABEL,
} from "@/lib/pricing";

export default function SetupPromoBanner() {
  const pathname = usePathname();

  if (!isSetupPromoActive() || pathname === "/privacy") {
    return null;
  }

  return (
    <div
      className="bg-gradient-to-l from-[var(--primary-dark)] to-[var(--primary-light)] text-white text-center py-2.5 px-4 text-sm md:text-base"
      role="status"
      aria-live="polite"
    >
      <span className="font-semibold">{PROMO_LABEL}</span>
      <span className="mx-2 opacity-90">—</span>
      <span>{PROMO_VALIDITY}</span>
      {pathname !== "/pricing" && (
        <>
          <span className="mx-2 opacity-70">|</span>
          <Link
            href="/pricing"
            className="underline underline-offset-2 font-medium hover:opacity-90 transition-opacity"
          >
            לפרטים
          </Link>
        </>
      )}
    </div>
  );
}
