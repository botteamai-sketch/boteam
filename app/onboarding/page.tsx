"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import CalendlyModal from "@/components/CalendlyModal";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

type StepItem = {
  id: number;
  title: string;
  desc: string;
  yours: string;
  ours: string;
};

const STEPS: StepItem[] = [
  {
    id: 1,
    title: "שיחת היכרות והדגמה",
    desc: "נבין את התהליכים שגוזלים זמן ונראה בלייב איך מחולל הבוטים פותר אותם.",
    yours: "לספר לנו על צווארי הבקבוק בארגון.",
    ours: "להציג פתרונות מדויקים לצרכים שלכם בפריוריטי.",
  },
  {
    id: 2,
    title: "בחירת מסלול",
    desc: "מתאימים את כמות רישיונות הבוטים לקצב הצמיחה שלכם.",
    yours: "חתימה על הסכם התקשרות והסדרת תשלום.",
    ours: "הקמת החשבון ושחרור הרישיונות.",
  },
  {
    id: 3,
    title: "מכינים את הקרקע (תשתית WhatsApp Business)",
    desc: "כדי שהבוט ישלח הודעות רשמיות, נדרש חיבור קצר לפייסבוק.",
    yours: "לוודא שיש לארגון דף פייסבוק פעיל ומאומת.",
    ours: "הדרכה וליווי צמוד בתהליך החיבור מול Meta.",
  },
  {
    id: 4,
    title: "התקנת המודול בפריוריטי",
    desc: "המודול מותקן כתוסף טבעי בפריוריטי שלכם, ללא כתיבת קוד.",
    yours: "מתן הרשאות גישה בסיסיות לצוות הטכני.",
    ours: "התקנה, הגדרה ווידאו חיבור חלק ומאובטח.",
  },
  {
    id: 5,
    title: "יוצאים לדרך!",
    desc: "מגדירים יחד את הבוט הראשון מתוך תבניות מוכנות.",
    yours: "לבחור את התהליך הראשון לאוטומציה.",
    ours: "הגדרת הבוט.",
  },
];

const BENEFITS = [
  {
    title: "בלי לכתוב שורת קוד",
    desc: "ממשק ידידותי, תבניות מוכנות. אפס פיתוח.",
    icon: "code",
  },
  {
    title: "שקיפות מלאה",
    desc: "מעקב ברור אחרי ההתקדמות בכל שלב.",
    icon: "eye",
  },
  {
    title: "ליווי אנושי",
    desc: "צוות ייעודי ללוות אתכם עד Go Live.",
    icon: "support",
  },
] as const;

const FAQ_ITEMS = [
  {
    q: "כמה זמן לוקח עד שהבוט הראשון עובד?",
    a: "בממוצע, מהשיחה הראשונה ועד בוט פעיל – בין שבועיים לארבעה, תלוי בזמינות הצדדים ובהשלמת חיבור WhatsApp Business.",
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
    q: "האם אפשר לשנות תהליך או להוסיף בוטים אחרי ה-Go Live?",
    a: "כן. אחרי שהבוט הראשון עובד, אפשר להרחיב לתהליכים נוספים ולהוסיף בוטים לפי הצורך.",
  },
] as const;

function IconCode() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}
function IconSupport() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

export default function OnboardingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div dir="rtl" className="min-h-screen bg-[var(--background-soft)] text-[var(--text-primary)]">
      <Header />

      <main>
        {/* Hero – כותרת ותגית */}
        <section className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-[var(--background-soft)]" />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4 leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              הדרך לבוט הראשון שלכם בפריוריטי – פשוטה, מהירה וללא פיתוח
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              מחולל הבוטים משיג את התשובות, כדי שהצוות שלכם לא יצטרך.
            </motion.p>
          </div>
        </section>

        {/* Timeline / Process */}
        <section className="py-16 md:py-24 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-4xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-14 text-center"
              {...fadeUp}
            >
              איך זה עובד – צעד אחר צעד
            </motion.h2>

            <div className="relative">
              <div className="absolute top-0 bottom-0 right-[19px] w-0.5 bg-[var(--primary-light)]/30 hidden md:block" />

              {STEPS.map((step, i) => (
                <motion.article
                  key={step.id}
                  className="relative flex gap-8 md:gap-10 pb-16 last:pb-0"
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-[var(--primary-dark)] text-white items-center justify-center font-bold text-lg z-10">
                    {step.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--primary-dark)] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                      {step.desc}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="rounded-xl bg-[var(--background-soft)] border border-[var(--border-soft)] p-4">
                        <span className="inline-block text-xs font-semibold text-[var(--primary-light)] uppercase tracking-wide mb-2">
                          החלק שלכם
                        </span>
                        <p className="text-[var(--text-primary)] text-sm leading-relaxed">{step.yours}</p>
                      </div>
                      <div className="rounded-xl bg-[var(--primary-dark)]/5 border border-[var(--primary-dark)]/10 p-4">
                        <span className="inline-block text-xs font-semibold text-[var(--primary-dark)] uppercase tracking-wide mb-2">
                          החלק שלנו
                        </span>
                        <p className="text-[var(--text-primary)] text-sm leading-relaxed">{step.ours}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 md:py-24 bg-[var(--background-soft)] border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-5xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-14 text-center"
              {...fadeUp}
            >
              למה התהליך שלנו כל כך פשוט?
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  className="bg-white rounded-2xl p-8 border border-[var(--border-soft)] shadow-soft text-center"
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--primary-light)]/10 text-[var(--primary-dark)] mb-4">
                    {b.icon === "code" && <IconCode />}
                    {b.icon === "eye" && <IconEye />}
                    {b.icon === "support" && <IconSupport />}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{b.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
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
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary-light)] text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.p
              className="text-lg font-medium text-white/95 mb-4"
              {...fadeUp}
            >
              מוכנים להתחיל?
            </motion.p>
            <motion.div {...fadeUp}>
              <CalendlyModal size="lg" variant="outline" />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
