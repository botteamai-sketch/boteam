"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import CalendlyModal from "@/components/CalendlyModal";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

type StepCard = {
  id: number;
  title: string;
  body: string;
};

const STEPS: StepCard[] = [
  {
    id: 1,
    title: "שלב 1 – שיחת אפיון",
    body: "נגדיר יחד תהליך אחד ממוקד (למשל: הצעת מחיר, סטטוס הזמנה, גבייה). המטרה: לבחור תהליך ברור שניתן למדידה.",
  },
  {
    id: 2,
    title: "שלב 2 – הגדרת מבנה הבוט",
    body: "נגדיר את המסך הרלוונטי ב-Priority, את השדות הנדרשים, ואת התוצאה העסקית הצפויה.",
  },
  {
    id: 3,
    title: "שלב 3 – חיבור לסביבת WhatsApp או אימייל",
    body: "נגדיר את נקודת הקשר שמול הלקוח, ונבצע בדיקות ראשוניות בסביבה מבוקרת.",
  },
  {
    id: 4,
    title: "שלב 4 – בדיקות ואישור",
    body: "נבצע בדיקות תרחישים, נאשר ניסוחים, ונוודא שהכל פועל בהתאם להגדרות.",
  },
  {
    id: 5,
    title: "שלב 5 – העלאה לאוויר",
    body: "הבוט עובר לפעילות מלאה. מתחילים למדוד תוצאות.",
  },
];

const FAQ_ITEMS = [
  {
    q: "כמה זמן לוקח עד שהבוט הראשון פעיל?",
    a: "לרוב בין 3 ל-5 ימי עבודה, כולל בדיקות ואישור.",
  },
  {
    q: "האם נדרש פיתוח מצדנו?",
    a: "לא. המערכת בנויה כך שאין צורך בפיתוח פנימי.",
  },
  {
    q: "מה קורה אחרי העלייה לאוויר?",
    a: "ניתן למדוד תוצאות, לשפר ניסוחים ולהוסיף תהליכים נוספים.",
  },
  {
    q: "האם נדרש ידע טכני מצד הלקוח?",
    a: "לא. אתם מספקים הרשאות בסיסיות ומענים על שאלות. את ההתקנה, ההגדרה והחיבור עושים אנחנו.",
  },
  {
    q: "מה קורה אם אין לנו דף פייסבוק?",
    a: "נדרש דף פייסבוק מאומת לחיבור WhatsApp Business. אנחנו מדריכים אתכם בתהליך האימות מול Meta.",
  },
  {
    q: "האם אפשר להוסיף בוטים או תהליכים אחרי ה-Go Live?",
    a: "כן. אחרי שהבוט הראשון עובד, אפשר להרחיב לתהליכים נוספים ולהוסיף בוטים לפי הצורך.",
  },
] as const;

export default function OnboardingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div dir="rtl" className="min-h-screen bg-[var(--background-soft)] text-[var(--text-primary)]">
      <Header />

      <main>
        {/* HERO */}
        <section className="pt-24 pb-12 md:pt-28 md:pb-16 border-b border-[var(--border-soft)]">
          <div className="mx-auto max-w-4xl px-6 text-right">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              הטמעה מהירה של בוט ראשון שמייצר תוצאות עסקיות – בלי פיתוח
            </motion.h1>
            <motion.p
              className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              הבוט הראשון שלכם לא אמור להיות פרויקט מורכב.
              <br />
              התהליך בנוי כך שתוך ימים ספורים תוכלו לראות בוט פעיל שמחובר ל-Priority ומבצע פעולה עסקית אמיתית.
            </motion.p>
          </div>
        </section>

        {/* פתיח בעיה-פתרון */}
        <section className="pt-20 pb-14 md:pt-24 md:pb-20 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-4xl px-6 text-right">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
              {...fadeUp}
            >
              למה תהליך מסודר חשוב?
            </motion.h2>
            <motion.div
              className="text-[var(--text-secondary)] leading-relaxed space-y-4"
              {...fadeUp}
              transition={{ delay: 0.05 }}
            >
              <p>
                כאשר תהליכים מתנהלים ידנית –
                <br />
                שאלות נשארות פתוחות, אישורים מתעכבים, ומידע מתפזר בין שיחות.
              </p>
              <p>
                הטמעה מסודרת של בוט ראשון יוצרת תהליך ברור, מתועד ומבוקר כבר מהיום הראשון.
              </p>
            </motion.div>
          </div>
        </section>

        {/* שלבי ההטמעה – כרטיסים */}
        <section className="pt-20 pb-16 md:pt-24 md:pb-24 bg-[var(--background-soft)] border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-4xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center"
              {...fadeUp}
            >
              איך זה עובד – צעד אחר צעד
            </motion.h2>
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <motion.article
                  key={step.id}
                  className="rounded-xl border border-[var(--border-soft)] bg-white p-6 mb-6 last:mb-0 text-right"
                  {...fadeUp}
                  transition={{ delay: i * 0.06 }}
                >
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {step.body}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* תרשים תהליך – placeholder */}
        <section className="py-16 md:py-20 bg-white border-t border-[var(--border-soft)]" id="onboarding-diagram">
          <div className="mx-auto max-w-4xl px-6 text-right">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8"
              {...fadeUp}
            >
              כך נראה תהליך ההטמעה
            </motion.h2>
            <motion.div
              className="rounded-2xl border border-[var(--border-soft)] bg-[var(--background-soft)] h-64 flex items-center justify-center text-[var(--text-secondary)]"
              {...fadeUp}
            >
              התרשים יופיע כאן
            </motion.div>
          </div>
        </section>

        {/* יתרונות ברורים */}
        <section className="py-16 md:py-24 bg-[var(--background-soft)] border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-4xl px-6 text-right">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-8"
              {...fadeUp}
            >
              למה זה עובד?
            </motion.h2>
            <motion.ul
              className="space-y-3 mb-8"
              {...fadeUp}
              transition={{ delay: 0.05 }}
            >
              {["ללא פיתוח", "ללא תלות בצוות IT", "תהליך קצר וברור", "שליטה מלאה בתוצאה", "מוכנות להרחבה עתידית"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] font-bold text-sm">
                    ✔
                  </span>
                  <span className="text-[var(--text-primary)]">{item}</span>
                </li>
              ))}
            </motion.ul>
            <motion.p
              className="text-lg font-semibold text-[var(--text-primary)]"
              {...fadeUp}
              transition={{ delay: 0.1 }}
            >
              מתחילים מתהליך אחד. מתקדמים לפי הצורך.
            </motion.p>

            {/* CTA אמצע עמוד */}
            <motion.div
              className="mt-12 pt-10 border-t border-[var(--border-soft)] text-center"
              {...fadeUp}
            >
              <p className="text-lg font-semibold text-[var(--text-primary)] mb-6">
                רוצים להתחיל מתהליך אחד?
              </p>
              <CalendlyModal size="lg" variant="solid" />
            </motion.div>

            {/* Trust Booster */}
            <motion.p
              className="text-sm text-[var(--text-secondary)] text-center mt-6"
              {...fadeUp}
            >
              ברוב הארגונים, הבוט הראשון עולה לאוויר בתוך מספר ימי עבודה.
            </motion.p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-2xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center"
              {...fadeUp}
            >
              שאלות נפוצות
            </motion.h2>
            <dl className="space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div
                  key={item.q}
                  className="rounded-xl border border-[var(--border-soft)] overflow-hidden bg-[var(--background-soft)]/50"
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    type="button"
                    className="w-full px-5 py-4 text-right flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-[var(--text-primary)]">{item.q}</span>
                    <svg className="shrink-0 w-5 h-5 text-[var(--primary-light)] transition-transform duration-200" style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 pt-0">
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        <span className="text-[var(--accent-green)] font-bold">✔ </span>
                        {item.a}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA סופי מחוזק */}
        <section className="py-16 md:py-20 border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              className="bg-[var(--background-soft)] rounded-2xl p-10 text-center mt-24"
              {...fadeUp}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                מוכנים לראות את הבוט הראשון שלכם בפעולה?
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl mx-auto">
                נבחר תהליך אחד, נגדיר אותו נכון, ונעלה אותו לאוויר תוך ימים ספורים.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CalendlyModal size="lg" variant="solid" />
                <Link
                  href="/pricing"
                  className="button-secondary rounded-xl px-6 py-3"
                >
                  צפו בתמחור
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
