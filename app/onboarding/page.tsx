"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import CalendlyModal from "@/components/CalendlyModal";
import LeadModal from "@/components/LeadModal";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

const IconCode = () => (
  <svg className="w-8 h-8 text-[var(--primary-dark)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);
const IconServer = () => (
  <svg className="w-8 h-8 text-[var(--primary-dark)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);
const IconUsers = () => (
  <svg className="w-8 h-8 text-[var(--primary-dark)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const IconArrowUp = () => (
  <svg className="w-8 h-8 text-[var(--primary-dark)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const VALUE_ICONS: Record<string, () => JSX.Element> = {
  code: IconCode,
  server: IconServer,
  users: IconUsers,
  arrow: IconArrowUp,
};

type StepCard = {
  id: number;
  title: string;
  body: string;
};

const STEPS: StepCard[] = [
  {
    id: 1,
    title: "שלב 1 – שיחת התנעה ובחירת המומחה (Kick-off)",
    body: "נאפיין יחד תהליך עסקי ממוקד אחד שתרצו לאטמט (למשל: אישור הצעת מחיר, גבייה, בדיקת סטטוס). נגדיר מיהו ה\"בוט המומחה\" הנדרש ומה המטרה שלו.",
  },
  {
    id: 2,
    title: "שלב 2 – מיפוי מסכי ה-Priority",
    body: "נחבר את הבוט המומחה ישירות למסך הרלוונטי ב-Priority. נגדיר אילו שדות המערכת צריכה לקרוא ואילו נתונים היא צריכה להחזיר.",
  },
  {
    id: 3,
    title: "שלב 3 – הקמת הפלטפורמה והבוט הראשי",
    body: "נגדיר את הפלטפורמה שמול הלקוח (WhatsApp / דוא\"ל), נקים את ה\"בוט הראשי\" (המרכזייה) שיהווה את פני העסק, ונחבר אליו את הבוט המומחה שיצרנו.",
  },
  {
    id: 4,
    title: "שלב 4 – סימולציה ובדיקות איכות",
    body: "נריץ תרחישי שיחה בסביבה מבוקרת (Test), נאשר את ניסוחי השיחה, ונוודא שהנתונים הלוך-חזור מול ה-Priority זורמים בצורה חלקה ונועלים את התהליך.",
  },
  {
    id: 5,
    title: "שלב 5 – עולים לאוויר (Go-Live)",
    body: "מעבירים את המערכת לסביבת ייצור. הבוט יוצא לדרך ומתחיל לנהל שיחות, לחסוך זמן לצוות, ולייצר ROI מהיום הראשון.",
  },
];

const VALUE_CARDS = [
  {
    title: "0% פיתוח מצדכם",
    body: "אין צורך לכתוב שורת קוד אחת. אנחנו עושים את כל הקישוריות ל-Priority.",
    icon: "code",
  },
  {
    title: "אפס עומס על ה-IT",
    body: "המערכת מנוהלת בענן ומחוברת בצורה מאובטחת, ללא צורך בהקצאת משאבי מחשוב פנימיים.",
    icon: "server",
  },
  {
    title: "Plug & Play לצוות",
    body: "העובדים ממשיכים לעבוד ב-Priority בדיוק כפי שהם רגילים. הבוט פשוט עושה את העבודה השחורה בחוץ.",
    icon: "users",
  },
  {
    title: "מוכנות להרחבה (Scale)",
    body: "ברגע שהתשתית (הבוט הראשי) קיימת, הוספת בוטים מתמחים נוספים בעתיד היא תהליך של שעות, לא שבועות.",
    icon: "arrow",
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
            מהחלטה לבוט פעיל ב-Priority תוך ימים ספורים. 0% פיתוח.
          </motion.h1>
          <motion.p
            className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            תהליך ההטמעה שלנו בנוי כדי להוציא אתכם לדרך עם ניצחון מהיר (Quick Win). בלי פרויקטי תוכנה ארוכים, בלי להעמיס על ה-IT – פשוט בוחרים תהליך עסקי אחד, ואנחנו דואגים שהמומחה הדיגיטלי שלכם יעלה לאוויר.
          </motion.p>
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)]/15 text-[var(--primary-dark)] px-4 py-2 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <span aria-hidden>⏱</span>
            זמן הטמעה ממוצע לבוט מתמחה ראשון: 3-5 ימי עסקים
          </motion.span>
        </section>

        {/* הגישה שלנו – פילוסופיית הטמעה */}
        <section className="mt-24 text-right border-t border-gray-100 pt-24">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-6"
            {...fadeUp}
          >
            הגישה שלנו: מתחילים קטן, צומחים חכם
          </motion.h2>
          <motion.p
            className="text-[var(--text-secondary)] leading-relaxed max-w-3xl"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
            המתודולוגיה שלנו דוגלת בלא לנסות לאטמט את כל הארגון ביום אחד. אנחנו מקימים את התשתית (הבוט הראשי), בוחרים תהליך עסקי אחד שכואב לכם (בוט מומחה אחד), פותרים אותו ומקבלים ביטחון. משם – קל מאוד להוסיף עוד מומחים לאותה תשתית מוכנה.
          </motion.p>
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
                <br />
                ההגדרה עצמה של הבוט בתוך מחולל הבוטים בפריוריטי אורכת דקות בודדות.
              </p>
            </motion.div>
            <motion.p
              className="mt-6 text-lg font-semibold text-[var(--text-primary)] text-center"
              {...fadeUp}
            >
              הבוט הראשון שלכם לא נשאר בפיילוט — הוא עולה לאוויר.
            </motion.p>
        </section>

        {/* כרטיסי ערך – 4 כרטיסים */}
        <section className="mt-24 border-t border-gray-100 pt-24 text-right">
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-10"
            {...fadeUp}
          >
            למה זה עובד?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {VALUE_CARDS.map((card, i) => {
              const IconComponent = VALUE_ICONS[card.icon];
              return (
                <motion.article
                  key={card.title}
                  className="rounded-2xl border border-gray-200 shadow-sm bg-[var(--background-soft)]/50 p-6 text-right"
                  {...fadeUp}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-start gap-4">
                    {IconComponent && <IconComponent />}
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                        {card.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
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
              <div className="final-cta-buttons grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <CalendlyModal size="lg" variant="solid" />
                <LeadModal size="lg" variant="light" />
              </div>
            </motion.div>
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
