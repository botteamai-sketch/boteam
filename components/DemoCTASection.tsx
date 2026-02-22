"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const bullets = [
  { text: "קיצור זמני תגובה ללקוחות", icon: "✔" },
  { text: "פחות תלות במעקב ידני", icon: "✔" },
  { text: "תהליך אוטומטי מקצה לקצה", icon: "✔" },
] as const;

const microTrust = [
  "חיבור ישיר ל-Priority",
  "ללא צורך בפיתוח נוסף",
  "הקמה מהירה ופשוטה",
] as const;

type DemoCTASectionProps = {
  demoHref?: string;
};

export default function DemoCTASection({ demoHref = "/demo" }: DemoCTASectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="section bg-white"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 text-right md:whitespace-nowrap">
          הגיע הזמן ש-Priority יעבוד בשבילך – לא להפך
        </h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed text-right">
          מחולל הבוטים מאפשר לקצר תהליכים באמצעות AI , להגדיל סגירות ולהחזיר שליטה ניהולית – בלי לשנות את המערכת הקיימת.
        </p>

        <div className="flex flex-col items-start mb-12" dir="rtl">
          <ul className="flex flex-col gap-3 text-right max-w-md list-none">
            {bullets.map(({ icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-2 text-[var(--text-primary)] font-medium"
              >
                <span className="text-[var(--primary-light)]" aria-hidden>✔</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={demoHref}
          className="button-primary flex-col text-center leading-tight inline-flex px-6 py-3"
        >
          <span className="text-base font-medium">לתיאום שיחת הדגמה</span>
          <span className="text-sm opacity-90">ללא עלות</span>
        </Link>

        <p className="mt-6 text-sm text-[var(--text-primary)] opacity-60 text-right flex flex-wrap justify-center gap-x-6 gap-y-1">
          {microTrust.map((t) => (
            <span key={t} className="flex items-center gap-1">
              <span className="text-[var(--primary-light)]" aria-hidden>✔</span>
              {t}
            </span>
          ))}
        </p>
      </div>
    </motion.section>
  );
}
