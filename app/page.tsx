"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LeadModal from "@/components/LeadModal";
import CalendlyModal from "@/components/CalendlyModal";
import SuccessToast from "@/components/SuccessToast";
import ScrollTracker from "@/components/ScrollTracker";
import VideoSection from "@/components/VideoSection";
import HeroVideo from "@/components/HeroVideo";
import DemoCTASection from "@/components/DemoCTASection";
import HowItWorksSection from "@/components/HowItWorksSection";

/** Intersection Observer - הופעת סקשנים בעת גלילה (חד־פעמי) */
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
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
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
      const obs = observer;
      if (obs) observed.forEach((el) => obs.unobserve(el));
    };
  }, []);
}

export default function Home() {
  useRevealOnScroll();
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  return (
    <div dir="rtl" className="bg-[var(--background-soft)] text-[var(--text-primary)]">

      <Header />

      <main className="min-h-screen">
        <ScrollTracker />

        {/* Hero קולנועי - לא לשנות */}
        <HeroVideo />

        {/* Funnel: CTA להדגמה */}
        <DemoCTASection />

        {/* הסבר טכני - איך עובד בוט AI */}
        <HowItWorksSection />

        <VideoSection />

        {/* HOW IT WORKS */}
        <section
          id="how"
          className="section reveal bg-white border-t border-gray-100"
        >
          <div className="mx-auto max-w-6xl px-6 text-right">
            {/* כותרת + תמונה - ימין: כותרת, שמאל: תמונה */}
            <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center mb-16">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2 justify-start text-right">
                  <span className="shrink-0 w-[22px] h-[22px] inline-block" aria-hidden>
                    <Image src="/brand/bubble-icon.svg" alt="" width={22} height={22} className="w-full h-full" />
                  </span>
                  <span>כך זה עובד</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  שיחה ב-WhatsApp מתעדכנת ישירות ב-Priority - בלי העתקה, בלי טעויות.
                </p>
              </div>
              <div className="order-1 md:order-2 relative overflow-hidden rounded-2xl shadow-medium border border-gray-100 bg-gray-50">
                <Image
                  src="/whatsapp-erp-sync.png"
                  alt="סנכרון וואטסאפ ל-ERP: שיחה בוואטסאפ מתעדכנת במערכת Priority"
                  width={640}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority={false}
                />
              </div>
            </div>

            <div className="grid gap-14 md:grid-cols-2">

              <div className="space-y-3">
                <div className="text-sm text-[var(--primary-light)] font-semibold">01</div>
                <h3 className="text-xl font-semibold">
                  אירוע עסקי מתרחש בפריוריטי
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הזמנה מוכנה, הצעת מחיר פתוחה, בקשת אישור או חוב פתוח -
                  כל טריגר עסקי יכול להפעיל את הבוט.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-[var(--primary-light)] font-semibold">02</div>
                <h3 className="text-xl font-semibold">
                  הבוט יוזם שיחה אוטומטית
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  נשלחת הודעת וואטסאפ או אימייל יזומה ללא התערבות ידנית.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-[var(--primary-light)] font-semibold">03</div>
                <h3 className="text-xl font-semibold">
                  שפה חופשית והבהרות חכמות
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הלקוח או העובד כותבים כרגיל. הבוט מבין, שואל ומקדם את התהליך.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-[var(--primary-light)] font-semibold">04</div>
                <h3 className="text-xl font-semibold">
                  סגירת מעגל מלאה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  סטטוסים מתעדכנים, תאריכים נקבעים והשדות מתמלאים אוטומטית בפריוריטי.
                </p>
              </div>

            </div>

            <div className="final-cta-buttons grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mt-16">
              <Link
                href="/#demo"
                className="button-primary flex-col"
              >
                <span className="text-base font-medium">לתיאום שיחת הדגמה</span>
                <span className="text-sm opacity-90">ללא עלות</span>
              </Link>
              <LeadModal variant="light" size="lg" />
            </div>
          </div>
        </section>

        {/* INCOMING FLOW - בוט מגיב (הרחבה, לא החלפת המסר המרכזי) */}
        <section className="section reveal bg-[var(--background-soft)] border-t border-gray-100">
          <div className="mx-auto max-w-6xl px-6 text-right">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2 justify-start text-right">
              <span className="shrink-0 w-[22px] h-[22px] inline-block" aria-hidden>
                <Image src="/brand/bubble-icon.svg" alt="" width={22} height={22} className="w-full h-full" />
              </span>
              <span>ומה קורה כשמישהו פונה אליכם ראשון?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              הבוט לא רק יוזם שיחות מתוך אירוע במערכת - הוא גם יודע לנהל באופן חכם שיחות נכנסות.
            </p>
            <div className="space-y-6 text-gray-600 leading-relaxed max-w-3xl mb-10">
              <p>
                כאשר לקוח, ספק או עובד שולח הודעה ב-WhatsApp או באימייל - הבוט מזהה את הפנייה, מבין את הכוונה, ושואל שאלות הבהרה במידת הצורך.
              </p>
              <p>
                הוא מחלץ את הנתונים הרלוונטיים מתוך השיחה, מזין אותם לשדות שהוגדרו מראש במחולל הבוטים, ומעדכן את מערכת Priority כחלק מתהליך עסקי מסודר.
              </p>
              <p>
                לא מדובר במענה אוטומטי כללי - אלא בשכבת תקשורת חכמה שמחוברת ישירות לפריוריטי שלכם.
              </p>
            </div>
            <p className="text-lg font-semibold text-[var(--text-primary)] mb-16 max-w-3xl">
              כל שיחה - בין אם יזומה על ידי המערכת ובין אם נפתחה על ידי אדם - הופכת לחלק מתהליך עסקי מובנה בתוך Priority.
            </p>

            {/* שני מסלולים - ויזואל מינימלי (me-auto ב-RTL מיישב לימין עם שאר הטקסט) */}
            <div className="grid gap-6 md:grid-cols-2 mb-20 max-w-3xl me-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6 pb-2 border-b border-gray-200">
                  בוט יוזם
                </h3>
                <div className="flex flex-col gap-4 text-gray-600 text-right">
                  <span>אירוע ב-Priority</span>
                  <span className="text-[var(--primary-light)]">↓</span>
                  <span>הבוט יוזם שיחה</span>
                  <span className="text-[var(--primary-light)]">↓</span>
                  <span>מתקבלת תשובה</span>
                  <span className="text-[var(--primary-light)]">↓</span>
                  <span className="font-medium text-[var(--text-primary)]">Priority מתעדכן</span>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-6 pb-2 border-b border-gray-200">
                  בוט מגיב
                </h3>
                <div className="flex flex-col gap-4 text-gray-600 text-right">
                  <span>הודעה נכנסת ב-WhatsApp / אימייל</span>
                  <span className="text-[var(--accent-green)]">↓</span>
                  <span>הבוט מזהה ומבין</span>
                  <span className="text-[var(--accent-green)]">↓</span>
                  <span>מחלץ נתונים</span>
                  <span className="text-[var(--accent-green)]">↓</span>
                  <span className="font-medium text-[var(--text-primary)]">Priority מתעדכן</span>
                </div>
              </div>
            </div>

            {/* שימושים לבוט מגיב */}
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">שימושים לבוט מגיב</h3>
            <ul className="space-y-2 text-gray-600 mb-6 list-disc list-inside max-w-3xl">
              <li>פניות שירות לקוחות נכנסות</li>
              <li>ליד חדש שמתחיל שיחה ביוזמתו</li>
              <li>שאלות של סוכני מכירות על מחירים או מלאי זמין</li>
              <li>מועמדים לעבודה ששולחים פרטים</li>
              <li>עובדים ששואלים על נהלי עבודה</li>
              <li>בקשות סטטוס להזמנה</li>
              <li>פניות אחריות או החזרות</li>
              <li>עדכוני אספקה מספקים</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              כל הנתונים מתועדים ומוזנים אוטומטית לשדות הרלוונטיים ב-Priority.
            </p>
          </div>
        </section>

        {/* DIFFERENTIATION */}
        <section className="reveal py-28 bg-[var(--background-soft)] border-t border-gray-100">
          <div className="mx-auto max-w-6xl px-6 text-right">

            <h2 className="text-3xl font-bold mb-16 flex items-center gap-2 justify-start text-right text-[var(--text-primary)]">
              <span className="shrink-0 w-[22px] h-[22px] inline-block" aria-hidden>
                <Image src="/brand/bubble-icon.svg" alt="" width={22} height={22} className="w-full h-full" />
              </span>
              <span>למה זה שונה מכל בוט אחר?</span>
            </h2>

            <div className="max-w-4xl mb-14 text-gray-600 leading-relaxed space-y-4">
              <p>
                מוצר זה אינו כלי חיצוני
                אלא מודול מערכת המותקן כחלק אינטגרלי מפריוריטי,
                ומרחיב את יכולות ה-ERP, בהתאם להתליכים העסקיים הקיימים.
              </p>
              <p>
                בניגוד לבוטים מבוססי פלטפורמות חיצוניות,
                מחולל הבוטים פועל מתוך סביבת המערכת עצמה,
                ומחובר ישירות לנתונים, לתהליכים וללוגיקה העסקית של הארגון.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">

              {/* Card */}
              <div className="feature-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="feature-card-icon w-12 h-12 rounded-full bg-[var(--primary-light)]/10 flex items-center justify-center mb-6 text-[var(--primary-light)] font-bold">
                  ERP
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  פריוריטי נשארת במרכז
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  לא מערכת חיצונית ולא כלי צדדי. מחולל הבוטים הינו מסך נוסף כחלק מתפריט פריוריטי.
                </p>
              </div>

              <div className="feature-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="feature-card-icon w-12 h-12 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center mb-6 text-[var(--accent-green)] font-bold">
                  AI
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  יוזם ולא רק מגיב
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  אירוע עסקי בפריוריטי מפעיל שיחה אוטומטית ללא צורך בפעולה ידנית.
                </p>
              </div>

              <div className="feature-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="feature-card-icon w-12 h-12 rounded-full bg-[var(--primary-light)]/10 flex items-center justify-center mb-6 text-[var(--primary-light)] font-bold">
                  💬
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  מבין שפה חופשית
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  המשתמש כותב רגיל. הבוט בתוך Priority מבין, שואל הבהרות ומעדכן את השדות הנכונים.
                </p>
              </div>

              <div className="feature-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="feature-card-icon w-12 h-12 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center mb-6 text-[var(--accent-green)] font-bold">
                  ✔
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  סגירת מעגל מלאה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  סטטוסים, תאריכים ואישורים מתעדכנים אוטומטית במערכת.
                </p>
              </div>

              <div className="feature-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="feature-card-icon w-12 h-12 rounded-full bg-[var(--primary-light)]/10 flex items-center justify-center mb-6 text-[var(--primary-light)] font-bold">
                  ⚙
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  גמיש לחלוטין
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  מתאים למכירות, שירות, גבייה, רכש, הנהלה, לוגיסטיקה ומשאבי אנוש.
                </p>
              </div>

              <div className="feature-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="feature-card-icon w-12 h-12 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center mb-6 text-[var(--accent-green)]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M18 6v12H6" />
                    <path d="M8 16l-2 2 2 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  מגיב לפניות נכנסות
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  מנתח פניות נכנסות כחלק מתהליך עסקי מובנה.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section
          id="usecases"
          className="section reveal bg-white border-t border-gray-100"
        >
          <div className="mx-auto max-w-6xl px-6 text-right">

            <h2 className="text-3xl font-bold mb-16 flex items-center gap-2 justify-start text-right">
              <span className="shrink-0 w-[22px] h-[22px] inline-block" aria-hidden>
                <Image src="/brand/bubble-icon.svg" alt="" width={22} height={22} className="w-full h-full" />
              </span>
              <span>איפה זה מייצר ערך מיידי?</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-2">

              {/* Use Case Card */}
              <div className="relative bg-[var(--background-soft)] p-8 rounded-2xl border border-gray-100 hover:shadow-medium transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[var(--primary-light)] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  מעקב הצעות מחיר
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הצעה פתוחה ← הבוט יוזם בירור ← התשובה חוזרת לשדה הנכון בפריוריטי.
                </p>
              </div>

              <div className="relative bg-[var(--background-soft)] p-8 rounded-2xl border border-gray-100 hover:shadow-medium transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[var(--accent-green)] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  אישורי הנהלה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הזמנה מעל סכום מסוים ← אישור בוואטסאפ ← סטטוס מתעדכן אוטומטית.
                </p>
              </div>

              <div className="relative bg-[var(--background-soft)] p-8 rounded-2xl border border-gray-100 hover:shadow-medium transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[var(--primary-light)] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  גבייה חכמה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  תזכורת אוטומטית ← תיאום תשלום ← עדכון סטטוס במערכת.
                </p>
              </div>

              <div className="relative bg-[var(--background-soft)] p-8 rounded-2xl border border-gray-100 hover:shadow-medium transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[var(--accent-green)] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  תיאום התקנות
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הזמנה מוכנה ← תיאום תאריך מול הלקוח ← קביעת מועד במערכת.
                </p>
              </div>

              <div className="relative bg-[var(--background-soft)] p-8 rounded-2xl border border-gray-100 hover:shadow-medium transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[var(--primary-light)] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  ספקים
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  בירור זמינות ומחיר ללא שרשראות מייל אינסופיות.
                </p>
              </div>

              <div className="relative bg-[var(--background-soft)] p-8 rounded-2xl border border-gray-100 hover:shadow-medium transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[var(--accent-green)] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  לידים חדשים
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  תגובה אוטומטית לליד ← איסוף מידע ← רישום מלא בפריוריטי.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* BENEFITS / ROI */}
        <section className="py-28 bg-[var(--primary-dark)] text-white">
          <div className="mx-auto max-w-6xl px-6 text-right">

            <h2 className="text-3xl font-bold mb-16 flex items-center gap-2 justify-start text-right text-white">
              <span className="shrink-0 w-[22px] h-[22px] inline-block" aria-hidden>
                <Image src="/brand/bubble-icon.svg" alt="" width={22} height={22} className="w-full h-full" />
              </span>
              <span>מה הארגון מרוויח?</span>
            </h2>

            <div className="grid gap-12 md:grid-cols-3">

              <div>
                <div className="text-4xl font-extrabold text-[var(--primary-light)] mb-4">
                  ⏱
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  חיסכון משמעותי בזמן
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  פחות טלפונים, פחות מיילים, פחות מעקבים ידניים.
                  תהליכים מתקדמים אוטומטית.
                </p>
              </div>

              <div>
                <div className="text-4xl font-extrabold text-[var(--accent-green)] mb-4">
                  📉
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  פחות טעויות אנוש
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  אין העתקות כפולות ואין עדכונים ידניים.
                  הכל חוזר אוטומטית למערכת.
                </p>
              </div>

              <div>
                <div className="text-4xl font-extrabold text-[var(--primary-light)] mb-4">
                  📊
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  נתונים בזמן אמת
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  סטטוסים מתעדכנים מיד עם סיום השיחה.
                  הנהלה רואה תמונת מצב עדכנית.
                </p>
              </div>

              <div>
                <div className="text-4xl font-extrabold text-[var(--accent-green)] mb-4">
                  💬
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  תקשורת בערוצים טבעיים
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  לקוחות ועובדים מתקשרים בדרך שנוחה להם -
                  בלי פורטלים מסובכים.
                </p>
              </div>

              <div>
                <div className="text-4xl font-extrabold text-[var(--primary-light)] mb-4">
                  🔁
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  תהליכים שנסגרים באמת
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  לא נשארים "בטיפול".
                  כל שיחה מובילה לסגירת מעגל.
                </p>
              </div>

              <div>
                <div className="text-4xl font-extrabold text-[var(--accent-green)] mb-4">
                  🚀
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  גמישות מלאה לארגון
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  ניתן להגדיר בוט לכל מחלקה, תהליך או צורך משתנה.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section reveal bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-dark)] text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">

            <h2 className="text-4xl font-bold mb-6">
              המערכת כבר חכמה. עכשיו היא גם מתקשרת.
            </h2>

            <p className="text-xl mb-10" style={{ color: "#ffffff" }}>
              הגדירו בוט תוך דקות ותנו לפריוריטי לנהל גם את השיחות שלכם.
            </p>

            <p className="text-base mb-8 opacity-95 max-w-xl mx-auto" style={{ color: "#ffffff" }}>
              מנוי חודשי — ללא התחייבות ארוכת טווח. ניתן להפסיק את הרישוי בהתאם לצורך הארגוני.
            </p>

            <div className="final-cta-buttons grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <CalendlyModal size="lg" variant="outline" />
              <LeadModal size="lg" onSuccess={() => setShowSuccessToast(true)} />
            </div>
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
