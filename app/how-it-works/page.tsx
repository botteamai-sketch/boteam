"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CalendlyModal from "@/components/CalendlyModal";
import LeadModal from "@/components/LeadModal";

function useRevealOnScroll() {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let observed: Element[] = [];
    const t = setTimeout(() => {
      const els = document.querySelectorAll(".reveal");
      if (els.length === 0) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("active");
          });
        },
        { threshold: 0, rootMargin: "50px 0px 50px 0px" }
      );
      els.forEach((el) => {
        observer!.observe(el);
        observed.push(el);
      });
    }, 0);
    return () => {
      clearTimeout(t);
      if (observer) observed.forEach((el) => observer!.unobserve(el));
    };
  }, []);
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

const sectionClass = "py-10 md:py-14";
const cardClass =
  "rounded-[20px] border border-gray-100 bg-white p-6 md:p-8 text-right shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(31,47,70,0.08)] transition-shadow duration-300";
const cardTextClass = "text-[var(--text-secondary)] leading-[1.75]";

/* Inline SVG icons – neutral, RTL-friendly */
const IconServer = () => (
  <svg className="w-10 h-10 text-[var(--primary-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 6h.01M6 18h.01" />
  </svg>
);
const IconBot = () => (
  <svg className="w-10 h-10 text-[var(--primary-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M8 16h.01M16 16h.01" />
  </svg>
);
const IconDatabase = () => (
  <svg className="w-10 h-10 text-[var(--primary-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const IconX = () => (
  <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-8 h-8 text-[var(--accent-green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
const IconFileText = () => (
  <svg className="w-6 h-6 text-[var(--primary-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);
const IconCircleCheck = () => (
  <svg className="w-6 h-6 text-[var(--primary-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
const IconWallet = () => (
  <svg className="w-6 h-6 text-[var(--primary-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <path d="M1 10h22M6 15h.01M10 15h4" />
  </svg>
);
const IconBell = () => (
  <svg className="w-6 h-6 text-[var(--primary-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13 21a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2" />
  </svg>
);
const IconClipboard = () => (
  <svg className="w-6 h-6 text-[var(--primary-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M8 12h8M8 16h8" />
  </svg>
);
const ArrowRight = () => (
  <span className="shrink-0 text-gray-300" aria-hidden>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="scale-x-[-1]">
      <path d="M9 18l6-6-6-6" />
    </svg>
  </span>
);
const ChevronDown = ({ open }: { open: boolean }) => (
  <span className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="scale-x-[-1]">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </span>
);

export default function HowItWorksPage() {
  useRevealOnScroll();
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[var(--text-primary)]">
      <Header />

      <main className="mx-auto max-w-5xl px-6">
        {/* ——— HERO ——— */}
        <section className={`${sectionClass} border-b border-gray-100`}>
          <div className="max-w-3xl">
            <motion.h1
              className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4"
              {...fadeUp}
            >
              לא עוד בוט. מערכת בוטים חכמה.
            </motion.h1>
            <motion.p
              className="text-xl text-[var(--text-primary)] font-semibold mb-4"
              {...fadeUp}
              transition={{ delay: 0.04 }}
            >
              מערכת עם חלוקת תפקידים ברורה ו<span className="text-[var(--primary-dark)]">שליטה מלאה</span>.
            </motion.p>
            <motion.p className={`text-lg ${cardTextClass} mb-4`} {...fadeUp} transition={{ delay: 0.06 }}>
              מאחורי כל שיחה עומדת חלוקת תפקידים מדויקת.
            </motion.p>
            <motion.p className={`text-base ${cardTextClass} mb-8`} {...fadeUp} transition={{ delay: 0.08 }}>
              הלקוח מדבר עם העסק כרגיל.
              <br />
              מאחורי הקלעים פועלת מערכת שיודעת לנתב את השיחה למומחה המתאים, לעבוד מול Priority, ולהחזיר נתונים בצורה מסודרת ומבוקרת.
            </motion.p>
          </div>
        </section>

        {/* ——— SECTION 1: The Process (Step-by-Step Flow) ——— */}
        <section className={sectionClass}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 md:mb-8 text-right"
            {...fadeUp}
          >
            התהליך
          </motion.h2>
          <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-2">
            {[
              { icon: <IconServer />, title: "הבוט הראשי (המרכזיה)", desc: "מזהה שיחה, שומר הקשר, ומנתב לבוט המתאים. לא דורש רישוי." },
              { icon: <IconBot />, title: "בוטים מתמחים", desc: "כל בוט אחראי על תהליך עסקי אחד ומסך אחד ב-Priority." },
              { icon: <IconDatabase />, title: "Priority ERP", desc: "ביצוע פעולה עסקית, תיעוד ושליפת נתונים בזמן אמת." },
            ].map((step, i) => (
              <div key={i} className="flex flex-1 flex-col md:flex-row md:items-center gap-2 min-w-0">
                <motion.div
                  className={`reveal flex-1 flex flex-col md:flex-row md:items-center gap-4 min-w-0 ${cardClass}`}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--background-soft)] shrink-0">
                    {step.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                    <p className={`text-sm ${cardTextClass}`}>{step.desc}</p>
                  </div>
                </motion.div>
                {i < 2 && (
                  <div className="hidden md:flex items-center shrink-0 self-center">
                    <ArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Diagram */}
        <section className={sectionClass}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 md:mb-8 text-right"
            {...fadeUp}
          >
            כך זה נראה מאחורי הקלעים
          </motion.h2>
          <motion.div
            className="rounded-[20px] border border-gray-100 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/system-diagram.jpg"
              alt="תרשים מערכת הבוטים – הבוט הראשי כמרכזיה, בוטים מתמחים מחוברים ל-Priority"
              width={1600}
              height={1000}
              className="w-full h-auto"
              priority={false}
            />
          </motion.div>
          <p className={`text-sm ${cardTextClass} text-center mt-4`}>
            המרכזיה מנתבת לבוטים מורשים בלבד, וכל בוט פועל מול מסך ייעודי ב-Priority.
          </p>
        </section>

        {/* ——— SECTION 3: Key Benefits (2x2 Grid) ——— */}
        <section className={sectionClass}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 md:mb-8 text-right"
            {...fadeUp}
          >
            יתרונות מרכזיים
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "גמישות מלאה",
                text: "שינוי נקודתי בתהליך אחד אינו פוגע בתהליכים אחרים.",
              },
              {
                title: "מנגנון הרשאות",
                text: "בוטים רגישים (כמו עלויות) חשופים רק למורשים.",
              },
              {
                title: "דיוק בנתונים",
                text: "כל בוט עובד מול מסך ייעודי ב-Priority עם מיפוי שדות ברור.",
              },
              {
                title: "צמיחה קלה",
                text: "הוספת תהליכים חדשים ללא צורך בבנייה מחדש של המערכת.",
              },
            ].map((item, i) => (
              <motion.article key={i} className={`reveal ${cardClass}`} {...fadeUp} transition={{ delay: i * 0.05 }}>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{item.title}</h3>
                <p className={cardTextClass}>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ——— למה בחרנו במבנה הזה? (Comparison Card) ——— */}
        <section className={sectionClass}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 md:mb-8 text-right"
            {...fadeUp}
          >
            למה בחרנו במבנה הזה?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className={`reveal ${cardClass} border-red-100 bg-red-50/30`}
              {...fadeUp}
            >
              <div className="flex items-center gap-3 mb-4">
                <IconX />
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">בוט אחד שעושה הכל</h3>
              </div>
              <ul className={`space-y-2 ${cardTextClass} text-sm`}>
                <li>• הכל מתערבב</li>
                <li>• קשה לנהל הרשאות</li>
                <li>• שינוי אחד שובר את המערכת</li>
              </ul>
            </motion.div>
            <motion.div
              className={`reveal ${cardClass} border-[var(--accent-green)]/30 bg-[var(--accent-green)]/5`}
              {...fadeUp}
            >
              <div className="flex items-center gap-3 mb-4">
                <IconCheck />
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">חלוקה למומחים (Boteam)</h3>
              </div>
              <ul className={`space-y-2 ${cardTextClass} text-sm`}>
                <li>• גמישות מלאה</li>
                <li>• שליטה בהרשאות</li>
                <li>• יציבות לאורך זמן</li>
                <li>• תחזוקה פשוטה</li>
              </ul>
            </motion.div>
          </div>
          <motion.p className={`mt-6 text-center ${cardTextClass} max-w-2xl mx-auto`} {...fadeUp}>
            כי מערכת שנבנית נכון מההתחלה — לא צריכה להיבנות מחדש כשהעסק גדל. גמישות היום חוסכת שכתוב מחר.
          </motion.p>
        </section>

        {/* ——— SECTION 4: Active Capabilities (Icon Bar) ——— */}
        <section className={sectionClass}>
          <motion.div {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2 text-right">
              לא רק מגיב. גם יוזם.
            </h2>
            <p className={`text-lg ${cardTextClass} mb-8`}>
              הבוט יודע ליזום שיחה בעקבות אירוע עסקי:
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {[
              { icon: <IconFileText />, label: "שליחת הצעת מחיר" },
              { icon: <IconCircleCheck />, label: "בקשת אישור" },
              { icon: <IconWallet />, label: "גבייה ותשלום" },
              { icon: <IconBell />, label: "תזכורות אוטומטיות" },
              { icon: <IconClipboard />, label: "איסוף מידע" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="reveal flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(31,47,70,0.08)] transition-shadow min-w-0"
                {...fadeUp}
                transition={{ delay: i * 0.05 }}
              >
                <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--background-soft)]">
                  {item.icon}
                </span>
                <span className="text-sm font-medium text-[var(--text-primary)]">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <p className={`mt-6 ${cardTextClass} text-sm max-w-2xl`}>
            ברגע שהבוט יוזם – הוא מנהל את התהליך עד סיומו. בסיום, הנתונים חוזרים בצורה מסודרת ל-Priority לפי אחת התוצאות שהוגדרו לו מראש.
          </p>
        </section>

        {/* Supporting cards: איך זה עובד בפועל + זו לא מערכת */}
        <section className={sectionClass}>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">איך זה עובד בפועל?</h3>
              <div className={`space-y-3 ${cardTextClass} text-sm`}>
                <p>הלקוח רואה נקודת קשר אחת עם העסק. מאחורי הקלעים פועלת מערכת עם חלוקת תפקידים.</p>
                <p>כאשר אדם כותב – המרכזיה הדיגיטלית בוחרת את הבוט המתאים. כאשר מתקיים אירוע עסקי – הבוט הרלוונטי יוזם שיחה בעצמו.</p>
                <p>זו לא תגובה אוטומטית פשוטה. זו מערכת ניהול שיחה שמחוברת ישירות לתהליכים שלכם.</p>
              </div>
            </motion.article>
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">זו לא מערכת של תשובות אוטומטיות</h3>
              <div className={`space-y-2 ${cardTextClass} text-sm`}>
                <p>זו מערכת שמבצעת פעולות עסקיות בפועל. כל בוט מחובר למסך ייעודי, עם תוצאה מוגדרת מראש. המערכת אינה פועלת מחוץ למה שהוגדר לה.</p>
                <p className="font-semibold text-[var(--text-primary)]"><span className="text-[var(--primary-dark)]">שליטה מלאה.</span> ללא הפתעות.</p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* ——— SECTION 5: Target Audience (Accordion) ——— */}
        <section className={sectionClass}>
          <motion.button
            type="button"
            className={`reveal w-full flex items-center justify-between gap-4 rounded-[20px] border border-gray-100 bg-white p-6 text-right shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(31,47,70,0.08)] transition-shadow duration-300 ${accordionOpen ? "rounded-b-none border-b-0" : ""}`}
            onClick={() => setAccordionOpen((o) => !o)}
            aria-expanded={accordionOpen}
            {...fadeUp}
          >
            <span className="text-xl font-semibold text-[var(--text-primary)]">
              למי המערכת מתאימה במיוחד? (לחץ לפתיחה)
            </span>
            <ChevronDown open={accordionOpen} />
          </motion.button>
          <motion.div
            initial={false}
            animate={{ height: accordionOpen ? "auto" : 0, opacity: accordionOpen ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className={`rounded-b-[20px] border border-gray-100 bg-white px-6 pb-6 pt-2 ${cardTextClass}`}>
              <ul className="space-y-3 pr-4 list-disc">
                <li>ארגונים שמנהלים מספר תהליכים עסקיים במקביל.</li>
                <li>חברות שדורשות שליטה בהרשאות לפי תפקיד.</li>
                <li>עסקים שרוצים להתרחב בלי לבנות תשתיות מחדש.</li>
                <li>צוותים שעובדים ישירות מול Priority.</li>
              </ul>
              <p className="mt-4 font-semibold text-[var(--text-primary)]">
                ככל שהארגון מורכב יותר — כך היתרון של המבנה הזה משמעותי יותר.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ——— SUMMARY & CTA ——— */}
        <section className={`${sectionClass} pb-12`}>
          <motion.div className={`reveal rounded-[20px] border border-gray-100 bg-white p-8 md:p-10 ${cardTextClass}`} {...fadeUp}>
            <p className="mb-6">המערכת בנויה כך שתוכל לנהל 2 תהליכים או 20 — בלי שינוי בתשתית.</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-5">זו תשתית דיגיטלית לעסק, לא רק אוטומציה.</h2>
            <div className="space-y-2 mb-6">
              <p>מערכת אחת. חלוקת תפקידים ברורה. שליטה ב<span className="text-[var(--primary-dark)] font-medium">הרשאות</span>. חיבור עמוק ל-Priority. וגמישות שמאפשרת לכם לגדול בלי לבנות מחדש.</p>
            </div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">ככה בונים אוטומציה שמחזיקה לאורך זמן.</p>
          </motion.div>

          <motion.div className={`reveal rounded-[20px] border border-gray-100 bg-white p-8 md:p-10 mt-8 text-center`} {...fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 flex items-center justify-center gap-2 text-right">
              <span className="shrink-0 w-[20px] h-[20px]">
                <Image src="/brand/bubble-icon.svg" alt="" width={20} height={20} className="w-full h-full" />
              </span>
              הבנתם איך המערכת בנויה. עכשיו איך מתחילים?
            </h2>
            <p className={`${cardTextClass} mb-6 max-w-xl mx-auto`}>
              המבנה מאפשר שליטה וגמישות. תהליך ההטמעה בנוי כך שתוך ימים ספורים תראו בוט ראשון פעיל.
            </p>
            <div className="final-cta-buttons grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link href="/onboarding" className="button-primary flex-col">
                <span className="text-base font-medium">תהליך ההטמעה</span>
              </Link>
              <Link href="/pricing" className="button-primary flex-col">
                <span className="text-base font-medium">עברו למחיר</span>
              </Link>
            </div>
          </motion.div>

          <motion.section
            className="cta-blue-bg reveal rounded-[20px] mt-12 bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-dark)] p-10 md:p-14 text-center"
            {...fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              רוצים לראות איך זה עובד אצלכם?
            </h2>
            <div className="final-cta-buttons grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <CalendlyModal size="lg" variant="outline" />
              <LeadModal size="lg" variant="dark" />
            </div>
          </motion.section>
        </section>
      </main>
    </div>
  );
}
