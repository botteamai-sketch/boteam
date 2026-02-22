"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { motion } from "framer-motion";
import CalendlyModal from "@/components/CalendlyModal";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const INCLUDED = [
  "חיבור ישיר ל-Priority (Web Services / XML)",
  "תקשורת WhatsApp דו־כיוונית",
  "מנוע AI מתקדם",
  "אינדוקס מסמכים (PDF, קבצים)",
  "מנגנון RAG חכם",
  "ניהול משתנים וטפסים דינמיים",
  "עד 1,000 שיחות בחודש",
  "תמיכה שוטפת",
] as const;

const STEPS = [
  { n: "1", title: "חיבור והטמעה" },
  { n: "2", title: "הפעלת בוט ראשון (חינם ל-3 חודשים)" },
  { n: "3", title: "הרחבה חכמה לפי צורך – ₪120 לכל בוט נוסף" },
] as const;

const FAQ = [
  {
    q: "מה זה בוט?",
    a: "תהליך אוטומציה חכם המחובר ל-Priority – מכירות, שירות, גבייה או כל תהליך עסקי.",
  },
  {
    q: "למה יש דמי הקמה?",
    a: "חיבור מלא ל-Priority, התאמה לתהליכים שלכם והטמעה מלאה. פעם אחת – ואז רק חודשי.",
  },
  {
    q: "האם יש התחייבות ארוכת טווח?",
    a: "לא. אנחנו מאמינים בתוצאות – לא בחוזים. החיוב חודשי וניתן להפסיק בכל עת.",
  },
  {
    q: "מה קורה אחרי 3 חודשים?",
    a: "הבוט הראשון מצטרף לתמחור הרגיל – ₪120 לחודש.",
  },
  {
    q: "אפשר להוסיף בוטים?",
    a: "כן. בכל שלב. לפי הצורך.",
  },
  {
    q: "יש מגבלת שימוש?",
    a: "עד 1,000 שיחות בחודש לכל בוט. ניתן להרחיב לפי דרישה.",
  },
] as const;

const WHO_IS_IT_FOR = [
  "חברות שעובדות עם Priority",
  "ארגונים עם צוות מכירות פעיל",
  "עסקים שרוצים להפוך WhatsApp לכלי תפעולי",
  "חברות שרוצות להוסיף שכבת AI אמיתית למערכת",
] as const;

export default function PricingPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white text-[var(--text-primary)]">
      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--background-soft)] to-white pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(63,169,245,0.12),transparent)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              שכבת ה-AI של Priority.
              <br />
              <span className="text-[var(--primary-dark)]">תמחור פשוט.</span>
            </motion.h1>

            <motion.div
              className="mt-12 mb-6"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-[var(--primary-dark)]">
                ₪120 <span className="text-2xl md:text-3xl font-semibold text-[var(--text-secondary)]">לחודש לכל בוט פעיל</span>
              </p>
            </motion.div>

            <motion.div
              className="max-w-xl mx-auto mb-10 px-5 py-4 rounded-xl bg-[var(--primary-dark)]/5 border border-[var(--primary-dark)]/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[var(--text-primary)] font-medium leading-relaxed text-right">
                ברוב הארגונים, בוט אחד מחזיר את העלות שלו כבר בחודש הראשון.
                <br />
                <span className="text-[var(--text-secondary)]">מעבר לכך – הוא מייצר חיסכון מתמשך בזמן ובמשאבים.</span>
              </p>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              דמי הקמה חד פעמיים: <strong className="text-[var(--text-primary)]">₪2,500</strong>
              <br />
              חיבור מלא ל-Priority. התאמה לתהליכים שלכם. הפעלה מלאה.
            </motion.p>

            <motion.div
              className="inline-flex flex-col items-center gap-1 rounded-2xl bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 px-6 py-4 mb-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-[var(--accent-green)] font-semibold text-lg">
                בוט ראשון עלינו.
              </span>
              <span className="text-[var(--text-primary)] font-medium">
                3 חודשים מלאים.
              </span>
              <span className="text-[var(--text-secondary)] text-sm">
                בלי התחייבות.
              </span>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-xl font-semibold text-[var(--text-primary)]">🚀 קבעו הדגמה</span>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <CalendlyModal size="lg" />
                <Link
                  href="/demo"
                  className="text-[var(--primary-light)] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:ring-offset-2 rounded-lg px-4 py-2"
                >
                  הפעילו בוט ראשון ללא עלות
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 – הצהרה */}
        <section className="py-20 md:py-28 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight"
              {...fadeUp}
            >
              לא חבילות. לא גרסאות.
              <br />
              <span className="text-[var(--primary-dark)]">מערכת מלאה מהיום הראשון.</span>
            </motion.h2>
            <motion.p
              className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6"
              {...fadeUp}
            >
              כל בוט הוא מנוע AI עצמאי שמתחבר ישירות ל-Priority,
              מבין תהליכים עסקיים ומבצע אוטומציה חכמה בזמן אמת.
            </motion.p>
            <motion.p
              className="text-lg font-semibold text-[var(--text-primary)]"
              {...fadeUp}
            >
              אתם משלמים רק על בוטים פעילים.
              <br />
              גדלים לפי הצורך.
            </motion.p>
          </div>
        </section>

        {/* SECTION 3 – מה כלול */}
        <section className="py-20 md:py-28 bg-[var(--background-soft)]">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center"
              {...fadeUp}
            >
              מה מקבלים בכל בוט?
            </motion.h2>
            <ul className="space-y-4">
              {INCLUDED.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-lg text-[var(--text-primary)] bg-white rounded-xl px-5 py-4 shadow-soft border border-[var(--border-soft)]"
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] font-bold text-sm">
                    ✔
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="mt-10 text-center text-[var(--text-secondary)] font-medium"
              {...fadeUp}
            >
              אין גרסת Lite. אין שדרוגים בתשלום.
              <br />
              <span className="text-[var(--text-primary)]">כל לקוח מקבל את היכולות המלאות.</span>
            </motion.p>
          </div>
        </section>

        {/* SECTION 4 – איך זה עובד */}
        <section className="py-20 md:py-28 bg-white">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-16 text-center"
              {...fadeUp}
            >
              3 שלבים ל-AI פעיל בתוך Priority
            </motion.h2>
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  className="flex gap-6 items-start"
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <span className="w-12 h-12 rounded-full bg-[var(--primary-dark)] text-white flex items-center justify-center font-bold text-lg">
                      {step.n}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className="w-0.5 flex-1 min-h-[40px] bg-gradient-to-b from-[var(--primary-dark)] to-[var(--primary-light)]/40 my-1" />
                    )}
                  </div>
                  <div className="pb-12">
                    <p className="text-xl font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 – FAQ */}
        <section className="py-20 md:py-28 bg-[var(--background-soft)]">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-14 text-center"
              {...fadeUp}
            >
              שאלות נפוצות
            </motion.h2>
            <dl className="space-y-6">
              {FAQ.map((item, i) => (
                <motion.div
                  key={item.q}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-[var(--border-soft)]"
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <dt className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {item.q}
                  </dt>
                  <dd className="text-[var(--text-secondary)] leading-relaxed">
                    {item.a}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* SECTION 5b – למי זה מתאים */}
        <section className="py-20 md:py-28 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center"
              {...fadeUp}
            >
              למי זה מתאים?
            </motion.h2>
            <ul className="space-y-5">
              {WHO_IS_IT_FOR.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-lg text-[var(--text-primary)]"
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] font-bold text-sm">
                    ✔
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="mt-12 text-center text-xl font-semibold text-[var(--primary-dark)]"
              {...fadeUp}
            >
              אם Priority הוא הליבה – Boteam הוא שכבת ה-AI שמעליו.
            </motion.p>
          </div>
        </section>

        {/* SECTION 6 – CTA סופי */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary-light)] text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.p
              className="text-base md:text-lg font-medium text-white/95 mb-6"
              {...fadeUp}
            >
              נבנה במיוחד עבור ארגונים שעובדים עם Priority.
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-8"
              {...fadeUp}
            >
              רוצים לראות את Priority עובד עם AI אמיתי?
            </motion.h2>
            <motion.div
              className="mb-6"
              {...fadeUp}
            >
              <CalendlyModal size="lg" variant="outline" />
            </motion.div>
            <motion.p
              className="text-white/90 text-sm md:text-base"
              {...fadeUp}
            >
              AI הוא לא תוסף. הוא שכבה חדשה במערכת שלכם.
            </motion.p>
          </div>
        </section>
      </main>
    </div>
  );
}
