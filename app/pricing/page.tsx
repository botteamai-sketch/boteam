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
  { n: "1", title: "חיבור והטמעה - 3,500 ₪" },
  { n: "2", title: "הפעלת בוט ראשון (חינם ל-3 חודשים)" },
  { n: "3", title: "הרחבה חכמה לפי צורך – ₪120 לכל בוט נוסף" },
] as const;

const FAQ = [
  {
    q: "מהו מחולל הבוטים?",
    a: "מחולל הבוטים הוא מודול מערכת המותקן בתוך Priority ומאפשר יצירת תהליכי Automation ו-Workflow חכמים המחוברים ישירות לנתוני הארגון.",
  },
  {
    q: "האם מדובר בשירות בניית בוטים?",
    a: "לא. מדובר בהתקנת פלטפורמה ליצירת בוטים בתוך מערכת Priority. אנו מתקינים את המודול ומבצעים Enablement ראשוני, אך הגדרת התהליכים מבוצעת על ידי מיישם ה-Priority של הארגון.",
  },
  {
    q: "מי אחראי על הגדרת הבוטים בארגון?",
    a: "הגדרת התהליכים והרחבתם מבוצעת על ידי מיישם ה-Priority של הארגון, בהתאם ללוגיקה ולמבנה העסקי הפנימי.",
  },
  {
    q: "למה יש דמי הקמה?",
    a: "דמי ההקמה (₪3,500 חד-פעמי) כוללים התקנת מודול מלא בסביבת Priority, קונפיגורציה ראשונית, הרשאות למיישמים והדרכת Enablement הכוללת הקמת תהליך ראשון.",
  },
  {
    q: "כיצד עובד המודל החודשי?",
    a: "הרישוי הינו ₪120 לחודש לכל תהליך Bot פעיל. המודל מודולרי וניתן להרחבה בהתאם למספר התהליכים הפעילים בארגון.",
  },
  {
    q: "האם יש התחייבות ארוכת טווח?",
    a: "לא. החיוב הינו חודשי וניתן להפסיק את הרישוי בהתאם לצורך הארגוני.",
  },
  {
    q: "האם קיימות מגבלות שימוש?",
    a: "ברירת המחדל כוללת עד 1,000 שיחות חודשיות לכל בוט פעיל. ניתן להרחיב בהתאם לדרישות הארגון.",
  },
  {
    q: "האם ניתן להוסיף בוטים נוספים?",
    a: "כן. ניתן להוסיף תהליכים פעילים בכל שלב בהתאם לצורך הארגוני.",
  },
  {
    q: "האם יש תמחור לפי משתמשים?",
    a: "לא. אין תמחור לפי מספר משתמשים במערכת.",
  },
] as const;

const WHO_IS_IT_FOR = [
  "חברות שעובדות עם Priority (לא zoom)",
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
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--background-soft)] to-white pt-10 pb-14 md:pt-14 md:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(63,169,245,0.12),transparent)]" />
          <div className="relative mx-auto max-w-2xl px-6 flex flex-col items-center">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-8 text-center w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              dir="rtl"
            >
              מחולל הבוטים לפריוריטי
            </motion.h1>
            <p className="text-xs text-[var(--text-secondary)] opacity-80 text-center w-full mb-3" dir="rtl">
              מיועד לארגונים המשתמשים ב-Priority
            </p>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
            <motion.div
              className="w-full max-w-xl mx-auto rounded-2xl border-2 border-[var(--border-soft)] bg-white p-8 md:p-10 shadow-[var(--shadow-medium)] text-right"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* התקנה חד־פעמית – עלות ראשית */}
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                הטמעה ראשונית
              </p>
              <p className="flex flex-wrap items-baseline gap-x-2 mb-4">
                <span className="text-2xl md:text-3xl font-bold text-[var(--primary-dark)]">₪3,500</span>
                <span className="text-base text-[var(--text-secondary)]">חד פעמי</span>
              </p>
              <ul className="mt-3 space-y-2.5 mb-6">
                {[
                  "התקנת מודול מחולל הבוטים בסביבת Priority",
                  "המודול מותקן כחלק אינטגרלי ממערכת ה-ERP של הארגון",
                  "קונפיגורציה והרשאות למיישמים",
                  "שעתיים הדרכה על המערכת הכוללים ליווי בהקמת תהליך בוט ראשון",
                  "תמיכה מקצועית במייל ללא הגבלה",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 justify-start">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">
                      ✔
                    </span>
                    <span className="text-[var(--text-primary)] text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <hr className="border-t border-[var(--border-soft)] my-6" />

              {/* רישוי חודשי */}
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                רישיון חודשי לתהליך Bot פעיל
              </p>
              <p className="flex flex-wrap items-baseline gap-x-2 mb-2">
                <span className="text-2xl md:text-3xl font-bold text-[var(--primary-dark)]">₪120</span>
                <span className="text-base text-[var(--text-secondary)]">לחודש</span>
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                מודל רישוי מודולרי בהתאם להיקף הפעילות ולמספר התהליכים הפעילים.
              </p>

              <p className="text-xs text-[var(--text-secondary)] border-t border-[var(--border-soft)] pt-4 leading-relaxed">
                אין הגבלה על כמות הבוטים.<br />
                אין הגבלה על כמות המשתמשים.<br />
                הניהול והשליטה מתבצעים מתוך Priority.
              </p>
              <p className="text-sm text-[var(--text-secondary)] pt-4 leading-relaxed">
                אין אותיות קטנות.<br />
                המערכת פעילה במלואה מהיום הראשון – כולל חיבור ישיר ל-Priority, מנגנוני טריגרים עסקיים וביצוע אוטומציה בזמן אמת.
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                אתם משלמים רק לפי הצורך התפעולי בפועל.
              </p>
            </motion.div>
            </motion.div>
          </div>
        </section>

        {/* פלטפורמת Automation ארגונית – Native ל-Priority */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="text-right"
            >
              <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6">
                פלטפורמת Automation מובנית בתוך פריוריטי
              </h2>
              <div className="text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed space-y-3">
                <p>מחולל הבוטים הוא מודול מערכת מלא המותקן כחלק אינטגרלי מפריוריטי.<br />לא מערכת חיצונית, אלא תפריט חדש בתוך פריוריטי –<br />כלומר שכבת יכולות חדשות בתוך ה-ERP הארגוני.</p>
                <p>הוא מרחיב את Priority ביכולת ליזום, לנהל ולהשלים תהליכי Workflow-Bot,<br />תוך גישה מלאה לנתונים, ללוגיקה העסקית ולמבנה המערכת.</p>
              </div>
              <ul className="mt-6 space-y-2 max-w-2xl mx-auto text-[var(--text-primary)] text-sm">
                <li className="flex items-center gap-2 justify-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                  <span>מותקן בתוך סביבת ה-Priority של הארגון</span>
                </li>
                <li className="flex items-center gap-2 justify-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                  <span>מנוהל על ידי מיישם ה-Priority</span>
                </li>
                <li className="flex items-center gap-2 justify-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                  <span>ללא פיצול מערכות</span>
                </li>
                <li className="flex items-center gap-2 justify-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                  <span>ללא תלות בפלטפורמות חיצוניות</span>
                </li>
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
              <p>ניתן להזמין הדרכות עומק נוספות בהתאם לצורך הארגוני.<br />עלות: 400 ₪ + מע״מ לשעה.</p>
              <p>ההדרכות מבוצעות יחד עם מיישם ה-Priority של הארגון, ומטרתן להרחיב ולהעמיק את היכולת הפנימית בשימוש בפלטפורמה.</p>
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
              <p>אנחנו מספקים את התשתית.<br />הארגון מגדיר, שולט ומפתח תהליכי Bot באופן עצמאי - באמצעות מיישם הפריוריטי של הארגון ועל גבי המערכת הקיימת.</p>
              <p>המטרה היא לבסס שליטה מלאה של הארגון בפלטפורמה,<br />כך שמיישם ה-Priority יוכל להגדיר, להרחיב ולהתאים באופן עצמאי<br />את יכולות מחולל הבוטים לתהליכים העסקיים של הארגון.</p>
              <p>הערך אינו בבוט אחד.<br />הערך הוא ביכולת מערכתית מתמשכת להרחבת תהליכים עסקיים ללא תלות בספק חיצוני.</p>
            </motion.div>
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
            <motion.div
              className="mt-8 rounded-2xl border border-[var(--border-soft)] bg-white p-6 md:p-8 shadow-sm text-right"
              {...fadeUp}
              transition={{ delay: INCLUDED.length * 0.05 }}
            >
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                מה זה בעצם בוט?
              </h3>
              <p className="text-[var(--text-primary)] font-medium mb-2">
                בוט אחד = תהליך עסקי אחד אוטומטי.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                כל בוט יודע לעבוד מול מסך אחד ב-Priority.
                <br />
                לעבודה מול מסך נוסף – מגדירים בוט נוסף.
              </p>
              <p className="text-[var(--text-secondary)] font-medium mb-2">לדוגמה:</p>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-4 pr-2">
                <li>בוט שירות להזמנות פתוחות</li>
                <li>בוט שירות לחשבוניות</li>
                <li>בוט הצעות מחיר</li>
                <li>בוט גבייה</li>
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                ללקוח זו שיחה אחת רציפה.
                <br />
                מאחורי הקלעים – כל תהליך מנוהל בנפרד.
              </p>
              <p className="text-[var(--text-primary)] font-medium mb-3">כל בוט כולל:</p>
              <ul className="space-y-2 mb-6">
                {[
                  "ניהול שיחה חכם",
                  "חיבור למסך ייעודי ב-Priority",
                  "שמירת היסטוריה מלאה",
                  "החזרת נתונים אוטומטית למערכת",
                  "אפשרות ליזום שיחות לפי אירועים עסקיים",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[var(--text-primary)] text-sm">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                הבוט הראשי (המרכזיה) אינו מחויב ברישוי חודשי.
                <br />
                הרישוי מתייחס לבוטים המתמחים בלבד.
              </p>
              <p className="text-[var(--text-primary)] font-semibold">
                רישוי בוט (₪120 לחודש) הוא רישוי לתהליך עסקי אחד מלא.
              </p>
            </motion.div>
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

        {/* מודל תמחור */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]" aria-labelledby="pricing-heading">
          <div className="mx-auto max-w-3xl px-6 text-right">
            <motion.h2
              id="pricing-heading"
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 text-center"
              {...fadeUp}
            >
              מודל תמחור
            </motion.h2>
            <motion.p
              className="text-sm text-[var(--text-secondary)] text-center mb-8"
              {...fadeUp}
            >
              מבנה תמחור ברור, שקוף וללא תלות נסתרת.
            </motion.p>
            <div className="space-y-6">
              <motion.div
                className="rounded-2xl border border-slate-300 bg-[var(--background-soft)] p-6 md:p-8"
                {...fadeUp}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">התקנת מודול מערכת</h3>
                <p className="text-base font-semibold text-[var(--primary-dark)] mb-3">₪3,500 חד־פעמי</p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                  כולל התקנת מחולל הבוטים כחלק אינטגרלי ממערכת Priority, קונפיגורציה ראשונית, הרשאות למיישמים והדרכת Enablement הכוללת הקמת תהליך ראשון.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  תשלום חד־פעמי להטמעת שכבת ה-Automation בארגון.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-slate-300 bg-[var(--background-soft)] p-6 md:p-8"
                {...fadeUp}
                transition={{ delay: 0.05 }}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">רישיון חודשי לתהליך Bot פעיל</h3>
                <p className="text-base font-semibold text-[var(--primary-dark)] mb-3">₪120 לחודש לכל תהליך פעיל</p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                  מודל רישוי מודולרי הניתן להרחבה בהתאם למספר התהליכים הפעילים בארגון.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  ללא תמחור לפי משתמשים.<br />ללא תמחור לפי נפח הודעות.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-slate-300 bg-[var(--background-soft)] p-6 md:p-8"
                {...fadeUp}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">עלויות תשתית WhatsApp Business (Meta)</h3>
                <div className="text-[var(--text-secondary)] leading-relaxed space-y-2">
                  <p>הודעות נשלחות באמצעות תשתית WhatsApp Business של Meta. עלויות השימוש נקבעות על ידי Meta ומשולמות ישירות אליה.</p>
                  <p>במרבית הארגונים, העלות החודשית בפועל מסתכמת בסכומים נמוכים מאוד. Meta גובה תשלום מזערי עבור פתיחת שיחה יזומה על ידי הבוט, כאשר תגובות במסגרת חלון שיחה פעיל או הודעות נכנסות אינן כרוכות בעלות נוספת מצדנו.</p>
                  <p>המערכת אינה מוסיפה מרווח על עלויות Meta.</p>
                </div>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 md:p-8"
                {...fadeUp}
                transition={{ delay: 0.15 }}
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">תמיכה והדרכות נוספות (אופציונלי)</h3>
                <p className="text-base font-semibold text-[var(--text-primary)] mb-3">₪400 + מע״מ לשעה</p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                  מיועד לארגונים המבקשים להרחיב את היקף השימוש ולהעמיק את השליטה הפנימית בפלטפורמה.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  העבודה מתבצעת יחד עם מיישם ה-Priority של הארגון.
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

        {/* למי זה מתאים */}
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

        {/* שאלות נפוצות */}
        <section className="py-14 md:py-20 bg-[var(--background-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-right">
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

        {/* CTA סופי */}
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
