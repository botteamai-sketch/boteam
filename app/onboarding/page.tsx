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
    <div dir="rtl" className="min-h-screen bg-white text-[var(--text-primary)]">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-24">
        {/* HERO */}
        <section className="text-right">
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6"
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
        </section>

        {/* פתיח בעיה-פתרון */}
        <section className="mt-24 text-right border-t border-gray-100 pt-24">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-6"
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
        </section>

        {/* שלבי ההטמעה – כרטיסים */}
        <section className="mt-24 border-t border-gray-100 pt-24">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-4 text-center"
              {...fadeUp}
            >
              תהליך ברור. תוצאה מדידה.
            </motion.h2>
            <motion.p
              className="text-[var(--text-secondary)] leading-relaxed text-center mb-12 max-w-2xl mx-auto"
              {...fadeUp}
              transition={{ delay: 0.03 }}
            >
              חמישה שלבים פשוטים שמובילים לבוט פעיל שמחובר ל-Priority ומבצע פעולה עסקית אמיתית.
            </motion.p>
            <div className="space-y-8">
              {STEPS.map((step, i) => (
                <div key={step.id} className="space-y-8">
                  <motion.article
                    className="rounded-2xl border border-gray-200 shadow-sm bg-white p-8 text-right"
                    {...fadeUp}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div
                      className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-semibold text-sm mb-4"
                      aria-hidden
                    >
                      {String(step.id).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {step.body}
                    </p>
                  </motion.article>
                  {i === 2 && (
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      רוצים להבין לעומק איך המבנה עובד?{" "}
                      <Link href="/how-it-works" className="text-gray-600 hover:text-gray-800 underline">
                        קראו על מערכת הבוטים →
                      </Link>
                    </p>
                  )}
                </div>
              ))}
            </div>
            <motion.div
              className="mt-8 rounded-2xl bg-gray-50 p-6 text-center"
              {...fadeUp}
            >
              <p className="text-[var(--text-secondary)] leading-relaxed">
                ברוב הארגונים, התהליך כולו נמשך מספר ימי עבודה בלבד.
              </p>
            </motion.div>
            <motion.p
              className="mt-6 text-lg font-semibold text-[var(--text-primary)] text-center"
              {...fadeUp}
            >
              הבוט הראשון שלכם לא נשאר בפיילוט — הוא עולה לאוויר.
            </motion.p>
        </section>

        {/* יתרונות ברורים */}
        <section className="mt-24 border-t border-gray-100 pt-24 text-right">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-8"
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
              className="mt-12 pt-10 border-t border-gray-100 text-center"
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
        </section>

        {/* FAQ */}
        <section className="mt-24 border-t border-gray-100 pt-24">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-12 text-center"
              {...fadeUp}
            >
              שאלות נפוצות
            </motion.h2>
            <dl className="space-y-6">
              {FAQ_ITEMS.map((item, i) => (
                <motion.div
                  key={item.q}
                  className="rounded-2xl border border-gray-200 shadow-sm bg-white overflow-hidden"
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
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        <span className="text-[var(--accent-green)] font-bold">✔ </span>
                        {item.a}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </dl>
        </section>

        {/* חיבור לתמחור */}
        <motion.div
          className="mt-24 text-center"
          {...fadeUp}
        >
          <p className="text-[var(--text-secondary)] text-sm mb-2">
            התמחור מתבצע לפי בוט מתמחה אחד לכל תהליך עסקי.
          </p>
          <Link
            href="/pricing"
            className="text-[var(--primary-dark)] font-medium hover:underline"
          >
            צפו בתמחור
          </Link>
        </motion.div>

        {/* CTA סופי – כמו pricing */}
        <section className="mt-24 py-14 md:py-20 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary-light)] text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.p
              className="text-base md:text-lg font-medium !text-white mb-4"
              {...fadeUp}
            >
              נבחר תהליך אחד, נגדיר אותו נכון, ונעלה אותו לאוויר תוך ימים ספורים.
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-8"
              {...fadeUp}
            >
              מוכנים לראות את הבוט הראשון שלכם בפעולה?
            </motion.h2>
            <motion.div
              className="mb-6 flex flex-wrap gap-4 justify-center items-center"
              {...fadeUp}
            >
              <CalendlyModal size="lg" variant="outline" />
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center border border-white/80 text-white hover:bg-white/10 rounded-xl px-6 py-3 transition font-medium"
              >
                צפו בתמחור
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
