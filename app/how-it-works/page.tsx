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

/* Architecture flow icons (Gateway, Specialist, Initiator) */
const IconGatewayBot = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500 shrink-0" aria-hidden>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" />
    <path d="M12 6V9M12 15V18M6 12H9M15 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconSpecialistBots = () => (
  <svg width="40" height="40" viewBox="-2 -1 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500 shrink-0" aria-hidden>
    <path d="M21 13V11C21 10.45 20.55 10 20 10H19.71C19.34 8.7 18.67 7.53 17.78 6.57L19.2 5.15C19.59 4.76 19.59 4.13 19.2 3.74L17.79 2.33C17.4 1.94 16.77 1.94 16.38 2.33L14.97 3.74C14.01 2.85 12.84 2.18 11.54 1.82V1C11.54 0.45 11.09 0 10.54 0H8.54C7.99 0 7.54 0.45 7.54 1V1.82C6.24 2.18 5.07 2.85 4.11 3.74L2.7 2.33C2.31 1.94 1.68 1.94 1.29 2.33L-0.12 3.74C-0.51 4.13 -0.51 4.76 -0.12 5.15L1.29 6.57C0.4 7.53 -0.27 8.7 -0.63 10H-0.92C-1.47 10 -1.92 10.45 -1.92 11V13C-1.92 13.55 -1.47 14 -0.92 14H-0.63C-0.28 15.25 0.35 16.39 1.19 17.36L-0.22 18.77C-0.61 19.16 -0.61 19.79 -0.22 20.18L1.19 21.59C1.58 21.98 2.21 21.98 2.6 21.59L4.01 20.18C5.02 21.04 6.22 21.64 7.54 21.93V23C7.54 23.55 7.99 24 8.54 24H10.54C11.09 24 11.54 23.55 11.54 23V21.93C12.82 21.64 14 21.04 14.97 20.18L16.38 21.59C16.77 21.98 17.4 21.98 17.79 21.59L19.2 20.18C19.59 19.79 19.59 19.16 19.2 18.77L17.78 17.36C18.65 16.39 19.31 15.25 19.71 14H20C20.55 14 21 13.55 21 13Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M9.54 17C12.8537 17 15.54 14.3137 15.54 11C15.54 7.68629 12.8537 5 9.54 5C6.22629 5 3.54 7.68629 3.54 11C3.54 14.3137 6.22629 17 9.54 17Z" stroke="currentColor" strokeWidth="2" />
    <rect x="7.54" y="9" width="2" height="2" rx="1" fill="currentColor" />
    <rect x="11.54" y="9" width="2" height="2" rx="1" fill="currentColor" />
  </svg>
);
const IconInitiatorBot = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600 shrink-0" aria-hidden>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
    <path d="M14 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

export default function HowItWorksPage() {
  useRevealOnScroll();
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[var(--text-primary)]">
      <Header />

      <main className="mx-auto max-w-5xl px-6">
        {/* ——— HERO (title above, then text + image) ——— */}
        <section className={`${sectionClass} border-b border-gray-100`}>
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-8 md:mb-10 text-right"
            {...fadeUp}
          >
             ארכיטקטורה שלמה שעובדת בשבילך.
          </motion.h1>
          <div className="grid grid-cols-1 lg:grid-cols-[0.55fr_1.45fr] gap-10 lg:gap-12 items-start">
            {/* Left: Subtitle — aligned to top */}
            <div className="order-2 lg:order-1 flex flex-col justify-start min-h-0">
              <motion.p
                className={`text-lg md:text-xl ${cardTextClass} leading-relaxed max-w-xl`}
                {...fadeUp}
                transition={{ delay: 0.04 }}
              >
                הלקוח שולח הודעה אחת לווטסאפ. מאחורי הקלעים, המערכת מנתבת את השיחה למומחה הנכון, קוראת וכותבת נתונים ב-Priority, ומנהלת תהליכים עסקיים שלמים – באפס מאמץ מצד הצוות שלך.
              </motion.p>
            </div>
            {/* Right: Hero image — larger column */}
            <motion.div
              className="order-1 lg:order-2 rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(31,47,70,0.08)] flex items-stretch min-h-[260px] md:min-h-[380px] lg:min-h-[420px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Image
                src="/how-it-works.png"
                alt="תרשים ארכיטקטורת המערכת – איך זה עובד"
                width={1400}
                height={1000}
                className="w-full h-full object-contain object-center"
              />
            </motion.div>
          </div>
        </section>

        {/* ——— Architecture: Inbound + Outbound flows ——— */}
        <section id="architecture" className={sectionClass}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4 md:mb-5 text-right"
            {...fadeUp}
          >
            מערכת ארכיטקטונית שלמה, לא סתם בוט.
          </motion.h2>
          <motion.p
            className={`${cardTextClass} mb-8 md:mb-10 text-right max-w-3xl ms-0 me-auto`}
            {...fadeUp}
            transition={{ delay: 0.04 }}
          >
            <strong className="text-[var(--text-primary)]">הפלטפורמה – הפנים של העסק</strong>
            <br />
            הלקוח מדבר איתכם דרך הפלטפורמה שנוחה לו (WhatsApp או אימייל). הפלטפורמה היא רק נקודת הקצה – ה&quot;פנים&quot; של המערכת. היא אינה מקבלת החלטות בעצמה, אלא מחוברת ישירות למערך בוטים חכם שפועל מאחורי הקלעים ומנהל שני תהליכים מרכזיים:
          </motion.p>

          {/* Flow 1: Inbound */}
          <motion.h3
            className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 text-right"
            {...fadeUp}
            transition={{ delay: 0.06 }}
          >
            תהליך 1: הלקוח פונה אליכם (Inbound)
          </motion.h3>
          <motion.p
            className={`${cardTextClass} mb-6 text-right`}
            {...fadeUp}
            transition={{ delay: 0.07 }}
          >
            כאשר הלקוח שולח הודעה לפלטפורמה, המערכת מנתבת את השיחה למומחה הנכון.
          </motion.p>
          <div className="grid md:grid-cols-2 gap-6 mb-12 md:mb-14">
            <motion.article
              className={`reveal ${cardClass} border-t-4 border-green-500 bg-green-50/30`}
              {...fadeUp}
              transition={{ delay: 0.08 }}
            >
              <div className="flex flex-col text-right">
                <div className="mb-4">
                  <IconGatewayBot />
                </div>
                <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                  🟢 הבוט הראשי (Gateway Bot) – המרכזייה החכמה
                </h4>
                <div className={`text-sm ${cardTextClass} space-y-2`}>
                  <p><strong className="text-[var(--text-primary)]">תפקיד:</strong> הבעלים של הפלטפורמה ושל השיחה.</p>
                  <p><strong className="text-[var(--text-primary)]">איך זה עובד?</strong> תמיד קיים בוט ראשי אחד לכל פלטפורמה. ברגע שנכנסת הודעה, הוא מזהה את ההקשר ומנתב את השיחה לבוט המתמחה המתאים ביותר מתוך רשימת הבוטים המורשים.</p>
                </div>
              </div>
            </motion.article>
            <motion.article
              className={`reveal ${cardClass} border-t-4 border-blue-500 bg-blue-50/30 border-t-blue-500`}
              {...fadeUp}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-col text-right">
                <div className="mb-4">
                  <IconSpecialistBots />
                </div>
                <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                  🔵 בוטים מגיבים (Specialist Bots) – צוות המומחים
                </h4>
                <div className={`text-sm ${cardTextClass} space-y-2`}>
                  <p><strong className="text-[var(--text-primary)]">תפקיד:</strong> מומחים לתהליך עסקי מוגדר (לידים, הזמנות, תמיכה, גבייה).</p>
                  <p><strong className="text-[var(--text-primary)]">איך זה עובד?</strong> הבוט משיג את המידע הדרוש בזמן אמת, קורא וכותב נתונים למסך ייעודי בפריוריטי, ומייצר תשובה מותאמת אישית ללקוח. המערכת רודפת אחרי התשובות, כדי שהצוות שלכם לא יצטרך. נבחר רק מומחה אחד בכל רגע נתון כדי לשמור על מיקוד השיחה.</p>
                </div>
              </div>
            </motion.article>
          </div>

          {/* Visual divider */}
          <div className="border-t border-gray-200 my-10 md:my-12" aria-hidden />

          {/* Flow 2: Outbound */}
          <motion.h3
            className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-2 text-right md:text-center"
            {...fadeUp}
            transition={{ delay: 0.06 }}
          >
            תהליך 2: המערכת יוזמת פנייה (Outbound)
          </motion.h3>
          <motion.p
            className={`${cardTextClass} mb-6 text-right md:text-center`}
            {...fadeUp}
            transition={{ delay: 0.07 }}
          >
            המערכת לא רק מגיבה, אלא פועלת אקטיבית בהתאם לאירועים בעסק.
          </motion.p>
          <div className="flex justify-center">
            <motion.article
              className={`reveal ${cardClass} w-full max-w-3xl border-t-4 border-purple-600 bg-purple-50/30`}
              {...fadeUp}
              transition={{ delay: 0.08 }}
            >
              <div className="flex flex-col text-right">
                <div className="mb-4">
                  <IconInitiatorBot />
                </div>
                <h4 className="text-lg font-bold text-[var(--text-primary)] mb-3">
                  🟣 הבוט היוזם (Initiator Bot) – הפעולה האקטיבית
                </h4>
                <div className={`text-sm ${cardTextClass} space-y-2`}>
                  <p><strong className="text-[var(--text-primary)]">תפקיד:</strong> פתיחת שיחות יזומות מול הלקוח מתוך ה-Priority.</p>
                  <p><strong className="text-[var(--text-primary)]">איך זה עובד?</strong> הבוט הזה לא מחכה להודעה. הוא מופעל אוטומטית בעקבות אירוע בפריוריטי (למשל, הפקת הצעת מחיר או תזכורת חוב). מרגע שהוא יוזם את הפנייה, הוא &quot;נועל&quot; את עצמו כמנהל השיחה הבלעדי עד לסיום התהליך, אוסף את התשובות ומחזיר את הנתונים בדיוק לשדות הנכונים בפריוריטי.</p>
                </div>
              </div>
            </motion.article>
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
            id="demo"
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
