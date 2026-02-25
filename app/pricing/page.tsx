"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import CalendlyModal from "@/components/CalendlyModal";
import LeadModal from "@/components/LeadModal";
import SuccessToast from "@/components/SuccessToast";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const INCLUDED = [
  "חיבור ישיר ל-Priority",
  "תקשורת WhatsApp דו־כיוונית",
  "מנוע AI מתקדם",
  "אינדוקס מסמכים (PDF, קבצים)",
  "מנגנון RAG חכם",
  "ניהול משתנים וטפסים דינמיים",
  "עד 1,000 שיחות בחודש",
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
    a: "דמי הקמה (₪2,500, חד-פעמי) כוללים חיבור מלא ל-Priority, התאמה לתהליכים שלכם והטמעה מלאה. תשלום אחד – ואז רק חודשי.",
  },
  {
    q: "האם יש התחייבות ארוכת טווח?",
    a: "לא. אנחנו מאמינים בתוצאות – לא בחוזים. החיוב חודשי וניתן להפסיק בכל עת.",
  },
  {
    q: "מה קורה אחרי 3 חודשים?",
    a: "הבוט הראשון מצטרף למחיר הרגיל – ₪120 לחודש.",
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
  "עסקים שרוצים להפוך WhatsApp לכלי תפעולי",
  "חברות שרוצות להוסיף שכבת AI אמיתית למערכת",
] as const;

export default function PricingPage() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-white text-[var(--text-primary)]">
      <Header />

      <main>
        {/* מחיר מרכזי – מסלול יחיד במסגרת */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--background-soft)] to-white pt-20 pb-14 md:pt-24 md:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(63,169,245,0.12),transparent)]" />
          <div className="relative mx-auto max-w-2xl px-6 flex flex-col items-center">
            <motion.div
              className="w-full text-center mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-4xl font-bold text-[var(--text-primary)]" dir="rtl">
                שכבת ה-AI של Priority
              </h1>
            </motion.div>
            <motion.div
              className="w-full max-w-xl rounded-2xl border-2 border-[var(--border-soft)] bg-white p-8 md:p-10 shadow-[var(--shadow-medium)] text-right"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2 flex flex-wrap items-baseline gap-x-2">
                <span className="text-[6rem] md:text-[2.0rem] font-bold text-[var(--primary-dark)] leading-none">₪120</span>
                <span className="text-xl md:text-2xl font-semibold text-[var(--text-secondary)]">לחודש לבוט</span>
              </p>
              <p className="text-lg text-[var(--text-secondary)] mb-4">
                בוטים לפי צורך
              </p>
              <p className="text-[var(--text-secondary)] text-base mb-8">
                דמי הקמה: ₪2,500 חד-פעמי
              </p>
              <ul className="space-y-3">
                {[
                  "ללא צורך בכתיבת קוד",
                  "חיבור ישיר ל-Priority",
                  "תמיכה מלאה ב-WhatsApp ואימייל",
                  "יצירת בוטים עתידיים באופן עצמאי",
                  "עד 1,000 שיחות לחודש לבוט (ניתן להרחיב)",
                  "ליווי והטמעה מותאמת",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 justify-start">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs">
                      ✔
                    </span>
                    <span className="text-right">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* בלוק: זו פלטפורמה, לא בוט מוכן */}
        <section className="py-14 md:py-20 bg-gray-50 border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6">
                פלטפורמת Automation ארגונית – Native ל-Priority
              </h2>
              <div className="text-[var(--text-secondary)] text-right max-w-2xl mx-auto leading-relaxed space-y-3">
                <p>מחולל הבוטים הוא מודול מערכת מלא המותקן כחלק אינטגרלי ממערכת Priority.<br />לא מערכת חיצונית, לא שירות צד ג׳, ולא אינטגרציה זמנית.</p>
                <p>הארגון מקבל שכבת יכולת חדשה בתוך המערכת הקיימת –<br />פלטפורמה ליצירת תהליכי Bot ו-Workflow על גבי תשתית ה-ERP.</p>
                <p>הגדרת התהליכים מבוצעת על ידי מיישם ה-Priority של הארגון,<br />תוך שליטה מלאה במבנה, בלוגיקה ובהתאמה העסקית.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* מה כלול בהתקנה החד פעמית */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-10 text-center"
              {...fadeUp}
            >
              מה כלול בהתקנה החד פעמית (₪2,500)
            </motion.h2>
            <motion.div
              className="rounded-2xl border border-[var(--border-soft)] bg-white p-6 md:p-8 shadow-sm"
              {...fadeUp}
            >
              <ul className="space-y-4">
                {[
                  "התקנת מודול מחולל הבוטים בסביבת ה-Priority של הארגון",
                  "קונפיגורציה ראשונית והרשאות למיישמים רלוונטיים",
                  "שעתיים הדרכת Enablement למיישם הארגוני ולצוות התפעולי",
                  "ליווי בהקמת תהליך הבוט הראשון בסביבת העבודה",
                  "ערוץ תמיכה במייל לשאלות המשך והתייעצות מקצועית",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-right">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] font-bold text-sm">
                      ✔
                    </span>
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* הדרכה ותמיכה נוספת */}
        <section className="py-14 md:py-20 bg-[var(--background-soft)] border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-right">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-center"
              {...fadeUp}
            >
              הדרכה ותמיכה נוספת
            </motion.h2>
            <motion.div
              className="text-[var(--text-secondary)] leading-relaxed space-y-3"
              {...fadeUp}
            >
              <p>ניתן להזמין הדרכות נוספות לפי צורך.</p>
              <p>עלות: 400 ₪ + מע״מ לשעה.</p>
              <p>מומלץ לבצע יחד עם מיישם הפריוריטי.</p>
            </motion.div>
          </div>
        </section>

        {/* השליטה נשארת אצלכם */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-right">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-center"
              {...fadeUp}
            >
              שליטה מלאה. ללא תלות חיצונית.
            </motion.h2>
            <motion.div
              className="text-[var(--text-secondary)] leading-relaxed text-lg space-y-3"
              {...fadeUp}
            >
              <p>אנחנו מספקים את התשתית.<br />הארגון מגדיר, שולט ומפתח תהליכי Bot באופן עצמאי –<br />באמצעות מיישם ה-Priority שלו ועל גבי המערכת הקיימת.</p>
              <p>הערך אינו בבוט אחד.<br />הערך הוא ביכולת מערכתית מתמשכת ליצירת תהליכים חדשים לפי צורך עסקי.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2 – הצהרה */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight"
              {...fadeUp}
            >
               אין אותיות קטנות.
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
        <section className="py-14 md:py-20 bg-[var(--background-soft)]">
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
              <span className="text-[var(--text-primary)]"> אתם מקבלים את היכולות המלאות.</span>
            </motion.p>
          </div>
        </section>

        {/* שקיפות בעלויות – דמי הקמה + Meta */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]" aria-labelledby="transparency-heading">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              id="transparency-heading"
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center"
              {...fadeUp}
            >
              שקיפות בעלויות
            </motion.h2>
            <div className="space-y-6">
              <motion.div
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--background-soft)] p-6 md:p-8"
                {...fadeUp}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">דמי הקמה / הטמעה (חד-פעמי)</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-semibold text-[var(--text-primary)]">₪2,500</span> חד-פעמי – כולל חיבור מלא ל-Priority, התאמה לתהליכים שלכם והפעלה מלאה. תשלום אחד, ולאחר מכן רק תשלום חודשי קבוע לבוטים פעילים.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-[var(--border-soft)] bg-[var(--background-soft)] p-6 md:p-8"
                {...fadeUp}
                transition={{ delay: 0.05 }}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2"> Meta (WhatsApp Business רשמי)</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  הודעות שיוזם הבוט נשלחות דרך WhatsApp Business של Meta. עלויות ה-API (לפי מדיניות Meta) אינן כלולות במנוי – הן מחויבות ישירות מול Meta בהתאם לנפח ההודעות. בדרך כלל מדובר בדולרים בודדים. נעזור בהגדרה ובחיבור.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4 – איך זה עובד */}
        <section className="py-14 md:py-20 bg-white">
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
        <section className="py-14 md:py-20 bg-[var(--background-soft)]">
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
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]">
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
              אם Priority הוא הליבה – מחולל הבוטים הוא שכבת ה-AI שמעליו.
            </motion.p>
          </div>
        </section>

        {/* SECTION 6 – CTA סופי */}
        <section className="py-14 md:py-20 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary-light)] text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.p
              className="text-base md:text-lg font-medium !text-white mb-6"
              {...fadeUp}
            >
              נבנה במיוחד עבור ארגונים שעובדים עם Priority.
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-8"
              {...fadeUp}
            >
              רוצים לראות את Priority עובד עם AI אמיתי?
            </motion.h2>
            <motion.div
              className="mb-6 flex flex-wrap gap-4 justify-center items-center"
              {...fadeUp}
            >
              <CalendlyModal size="lg" variant="outline" />
              <LeadModal size="lg" variant="dark" />
            </motion.div>
            <motion.p
              className="!text-white text-sm md:text-base"
              {...fadeUp}
            >
              מחולל הבוטים הוא לא תוסף. הוא שכבה חדשה במערכת שלכם.
            </motion.p>
          </div>
        </section>

        <SuccessToast
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
        />
      </main>
    </div>
  );
}
