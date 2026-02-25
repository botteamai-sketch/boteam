"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CalendlyModal from "@/components/CalendlyModal";

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
  transition: { duration: 0.45, ease: "easeOut" },
};

const sectionClass = "py-16 md:py-24";
const cardClass =
  "rounded-[20px] border border-gray-100 bg-white p-6 md:p-8 text-right shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(31,47,70,0.08)] transition-shadow duration-300";
const cardTextClass = "text-[var(--text-secondary)] leading-[1.75]";

export default function HowItWorksPage() {
  useRevealOnScroll();
  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[var(--text-primary)]">
      <Header />

      <main className="mx-auto max-w-5xl px-6">
        {/* ——— 1. HERO ——— */}
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
            <motion.p
              className={`text-lg ${cardTextClass} mb-4`}
              {...fadeUp}
              transition={{ delay: 0.06 }}
            >
              מאחורי כל שיחה עומדת חלוקת תפקידים מדויקת.
            </motion.p>
            <motion.p
              className={`text-base ${cardTextClass} mb-8`}
              {...fadeUp}
              transition={{ delay: 0.08 }}
            >
              הלקוח מדבר עם העסק כרגיל.
              <br />
              מאחורי הקלעים פועלת מערכת שיודעת לנתב את השיחה למומחה המתאים, לעבוד מול Priority, ולהחזיר נתונים בצורה מסודרת ומבוקרת.
            </motion.p>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <CalendlyModal size="lg" variant="solid" />
            </motion.div>
          </div>
        </section>

        {/* ——— 2. PROCESS – Step Cards ——— */}
        <section className={sectionClass}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-10 md:mb-14 text-right"
            {...fadeUp}
          >
            התהליך והמבנה
          </motion.h2>

          <div className="space-y-8">
            {/* Card: הבוט הראשי */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                <span className="shrink-0 w-[20px] h-[20px]">
                  <Image src="/brand/bubble-icon.svg" alt="" width={20} height={20} className="w-full h-full" />
                </span>
                הבוט הראשי – המרכזיה הדיגיטלית
              </h3>
              <div className={`space-y-4 ${cardTextClass}`}>
                <p>לכל מספר WhatsApp או כתובת אימייל מחובר בוט ראשי אחד.</p>
                <p>
                  הבוט הראשי הוא הפנים של העסק מול הלקוח.
                  <br />
                  אפשר להקביל אותו למרכזיה חכמה.
                </p>
                <p className="font-medium text-[var(--text-primary)]">התפקיד שלו:</p>
                <ul className="list-disc list-inside space-y-2 pr-2">
                  <li>לזהות שיחה חדשה</li>
                  <li>לשמור הקשר שיחה</li>
                  <li>לנתב את הפנייה לבוט המתאים</li>
                  <li>לפעול כברירת מחדל כשאין התאמה אחרת</li>
                </ul>
                <p>הבוט הראשי עצמו אינו דורש רישוי חודשי – הוא חלק מהמערכת.</p>
                <p className="font-medium text-[var(--text-primary)]">חשוב:</p>
                <p>הוא מנתב רק לבוטים שהוגדרו כמורשים.</p>
                <p>
                  לדוגמה:
                  <br />
                  אם יש בוט שמספק מידע על עלויות – ניתן להגדיר שהוא יפעל רק מול עובדים בכירים בארגון.
                </p>
                <p>מנגנון <span className="text-[var(--primary-dark)] font-medium">הרשאות</span> הוא חלק מהשליטה והבקרה של המערכת.</p>
                <p className="text-lg font-semibold text-[var(--text-primary)] mt-6">
                  המרכזיה לא מבצעת את העבודה – היא דואגת שהעבודה תבוצע נכון.
                </p>
              </div>
            </motion.article>

            {/* Card: בוטים מתמחים */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-5 flex items-center gap-2">
                <span className="shrink-0 w-[20px] h-[20px]">
                  <Image src="/brand/bubble-icon.svg" alt="" width={20} height={20} className="w-full h-full" />
                </span>
                בוטים מתמחים לפי תהליך עסקי
              </h3>
              <div className={`space-y-4 ${cardTextClass}`}>
                <p>
                  במקום בוט אחד שעושה הכל –
                  <br />
                  כל תהליך עסקי מקבל בוט ייעודי.
                </p>
                <p>כל בוט יודע לעבוד מול מסך אחד ב-Priority.</p>
                <p>כדי לעבוד מול מסך נוסף – נדרש בוט נוסף.</p>
                <p className="font-medium text-[var(--text-primary)]">לדוגמה:</p>
                <ul className="list-disc list-inside space-y-2 pr-2">
                  <li>בוט שירות להזמנות פתוחות</li>
                  <li>ובוט שירות לחשבוניות</li>
                </ul>
                <p>
                  מבחינת המשתמש זו אותה שיחה רציפה –
                  <br />
                  אבל מאחורי הקלעים מדובר בשני בוטים שונים.
                </p>
                <p className="font-medium text-[var(--text-primary)]">למה זה חשוב?</p>
                <p>כי חלוקה כזו מאפשרת:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-green)] font-bold">✔</span>
                    גמישות מלאה
                  </li>
                  <li className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-green)] font-bold">✔</span>
                    שינוי נקודתי בלי לפגוע בתהליכים אחרים
                  </li>
                  <li className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-green)] font-bold">✔</span>
                    בקרה מדויקת לפי <span className="text-[var(--primary-dark)] font-medium">הרשאות</span>
                  </li>
                  <li className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-green)] font-bold">✔</span>
                    תחזוקה פשוטה לאורך זמן
                  </li>
                </ul>
                <p>
                  בכל רגע נתון רק בוט אחד מנהל את השיחה –
                  <br />
                  והמעבר ביניהם שקוף לחלוטין למשתמש.
                </p>
              </div>
            </motion.article>

            {/* Card: כל בוט עובד מול מסך אחד */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                כל בוט עובד מול מסך אחד ב-Priority
              </h3>
              <div className={`space-y-3 ${cardTextClass}`}>
                <p>החלוקה הזו מבטיחה דיוק.</p>
                <p>כל בוט מחובר למסך ייעודי, עם מיפוי שדות ברור ותוצאה מוגדרת מראש.</p>
                <p className="text-[var(--text-primary)] font-medium">זו לא רק שיחה – זו פעולה עסקית מתועדת.</p>
              </div>
            </motion.article>

            {/* Card: למה בחרנו במבנה */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                למה בחרנו במבנה של מרכזיה ומומחים?
              </h3>
              <p className={cardTextClass}>
                כי מערכת שנבנית נכון מההתחלה —
                <br />
                לא צריכה להיבנות מחדש כשהעסק גדל.
              </p>
            </motion.article>

            {/* Card: כשהכל עובר דרך בוט אחד */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                כשהכל עובר דרך בוט אחד – הכל מתערבב
              </h3>
              <div className={`space-y-3 ${cardTextClass}`}>
                <p>
                  מכירות, שירות, גבייה, תזכורות, הצעות מחיר.
                  <br />
                  כשהכל מתנהל דרך בוט אחד – הגבולות מטשטשים.
                </p>
                <p>קשה להגדיר הרשאות.</p>
                <p>קשה לבצע שינוי נקודתי.</p>
                <p>קשה להתרחב בלי לגעת בכל המערכת.</p>
                <p>זו הסיבה שמערכות פשוטות נשברות כשהעסק גדל.</p>
              </div>
            </motion.article>

            {/* Card: למה מחלקים לכמה בוטים */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] mb-5">
                למה מחלקים לכמה בוטים?
              </h3>
              <div className={`space-y-4 ${cardTextClass}`}>
                <p>
                  ייתכן שתשאלו —
                  <br />
                  למה לא בוט אחד שעושה הכל?
                </p>
                <p>כי כאשר כל תהליך מופרד לבוט ייעודי:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-green)] font-bold">✔</span>
                    אפשר לבצע שינוי נקודתי בלי לפגוע בתהליכים אחרים
                  </li>
                  <li className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-green)] font-bold">✔</span>
                    ניתן להחליף או לשדרג תהליך מסוים בלי לגעת במערכת כולה
                  </li>
                  <li className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-green)] font-bold">✔</span>
                    אפשר להגדיר הרשאות מדויקות לפי תפקיד
                  </li>
                  <li className="flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="text-[var(--accent-green)] font-bold">✔</span>
                    קל יותר לתחזק, להרחיב ולהתאים בעתיד
                  </li>
                </ul>
                <p>
                  המבנה <span className="text-[var(--primary-dark)] font-semibold">המודולרי</span> הוא זה שמאפשר יציבות לאורך זמן וגמישות לצמיחה.
                </p>
                <p className="text-lg font-semibold text-[var(--text-primary)]">
                  גמישות היום חוסכת שכתוב מחר.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* ——— 3. TECHNICAL – Feature Grid + Diagram ——— */}
        <section className={sectionClass}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-10 md:mb-14 text-right"
            {...fadeUp}
          >
            איך זה עובד מאחורי הקלעים
          </motion.h2>

          {/* Diagram */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-[20px] border border-gray-100 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <Image
                src="/system-diagram.jpg"
                alt="תרשים מערכת הבוטים – הבוט הראשי כמרכזיה, בוטים מתמחים מחוברים ל-Priority"
                width={1600}
                height={1000}
                className="w-full h-auto"
                priority={false}
              />
            </div>
            <p className={`text-sm ${cardTextClass} text-center mt-4`}>
              המרכזיה מנתבת לבוטים מורשים בלבד, וכל בוט פועל מול מסך ייעודי ב-Priority.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card: לא רק מגיב. גם יוזם */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                לא רק מגיב. גם יוזם.
              </h3>
              <div className={`space-y-3 ${cardTextClass}`}>
                <p>
                  כאשר מתקיים אירוע עסקי במערכת
                  <br />
                  (למשל חוק עסקי שהוגדר מראש)
                </p>
                <p>הבוט יכול ליזום שיחה חדשה בעצמו.</p>
                <ul className="list-disc list-inside space-y-2 pr-2">
                  <li>שליחת הצעת מחיר</li>
                  <li>בקשת אישור</li>
                  <li>גבייה</li>
                  <li>תזכורת</li>
                  <li>איסוף מידע</li>
                </ul>
                <p>ברגע שהבוט יוזם – הוא מנהל את התהליך עד סיומו.</p>
                <p>
                  בסיום, הנתונים חוזרים בצורה מסודרת ל-Priority לפי אחת התוצאות שהוגדרו לו מראש.
                </p>
              </div>
            </motion.article>

            {/* Card: איך זה עובד בפועל */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                איך זה עובד בפועל?
              </h3>
              <div className={`space-y-3 ${cardTextClass}`}>
                <p>הלקוח רואה נקודת קשר אחת עם העסק.</p>
                <p>מאחורי הקלעים פועלת מערכת עם חלוקת תפקידים.</p>
                <p>
                  כאשר אדם כותב –
                  <br />
                  המרכזיה הדיגיטלית בוחרת את הבוט המתאים.
                </p>
                <p>
                  כאשר מתקיים אירוע עסקי –
                  <br />
                  הבוט הרלוונטי יוזם שיחה בעצמו.
                </p>
                <p>
                  זו לא תגובה אוטומטית פשוטה.
                  <br />
                  זו מערכת ניהול שיחה שמחוברת ישירות לתהליכים שלכם.
                </p>
              </div>
            </motion.article>

            {/* Card: זו לא מערכת של תשובות אוטומטיות */}
            <motion.article className={`reveal ${cardClass} md:col-span-2`} {...fadeUp}>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                זו לא מערכת של תשובות אוטומטיות
              </h3>
              <div className={`space-y-3 ${cardTextClass}`}>
                <p>
                  זו לא מערכת שמחזירה טקסטים כלליים.
                  <br />
                  זו מערכת שמבצעת פעולות עסקיות בפועל.
                </p>
                <p>
                  כל בוט מחובר למסך ייעודי, עם תוצאה מוגדרת מראש.
                  <br />
                  המערכת אינה פועלת מחוץ למה שהוגדר לה.
                </p>
                <p className="text-[var(--text-primary)] font-semibold">
                  <span className="text-[var(--primary-dark)]">שליטה מלאה.</span> ללא הפתעות.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* ——— 4. BUSINESS VALUE – Benefit Cards ——— */}
        <section className={sectionClass}>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-10 md:mb-14 text-right"
            {...fadeUp}
          >
            ערך לארגון
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card: שליטה מלאה */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-5">
                זו מערכת עם <span className="text-[var(--primary-dark)]">שליטה מלאה</span>
              </h3>
              <ul className="space-y-3 mb-5">
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  מרכזיה דיגיטלית חכמה
                </li>
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  בוטים מתמחים לפי מסך ב-Priority
                </li>
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  מנגנון הרשאות מובנה
                </li>
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  יוזמות אוטומטיות לפי אירועים עסקיים
                </li>
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  גמישות מלאה לשינויים עתידיים
                </li>
              </ul>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                כל בוט הוא יחידת אוטומציה עצמאית שמנהלת תהליך עסקי אחד.
              </p>
            </motion.article>

            {/* Card: למי מתאימה */}
            <motion.article className={`reveal ${cardClass}`} {...fadeUp}>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-5">
                למי המערכת מתאימה במיוחד?
              </h3>
              <ul className="space-y-3 mb-5">
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  ארגונים שמנהלים כמה תהליכים עסקיים במקביל
                </li>
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  חברות שדורשות שליטה בהרשאות לפי תפקיד
                </li>
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  עסקים שרוצים להתרחב בלי לבנות הכל מחדש
                </li>
                <li className="flex items-center gap-2 text-[var(--text-primary)]">
                  <span className="text-[var(--accent-green)] font-bold">✔</span>
                  צוותים שעובדים ישירות מול Priority ורוצים בקרה מלאה
                </li>
              </ul>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                ככל שהארגון מורכב יותר — כך היתרון של המבנה הזה משמעותי יותר.
              </p>
            </motion.article>
          </div>
        </section>

        {/* ——— 5. SUMMARY & CTA ——— */}
        <section className={`${sectionClass} pb-20`}>
          <motion.div
            className={`reveal rounded-[20px] border border-gray-100 bg-white p-8 md:p-10 ${cardTextClass}`}
            {...fadeUp}
          >
            <p className="mb-6">
              המערכת בנויה כך שתוכל לנהל 2 תהליכים או 20 —
              <br />
              בלי שינוי בתשתית.
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-5">
              זו תשתית דיגיטלית לעסק, לא רק אוטומציה.
            </h2>
            <div className="space-y-2 mb-6">
              <p>מערכת אחת.</p>
              <p>חלוקת תפקידים ברורה.</p>
              <p>שליטה ב<span className="text-[var(--primary-dark)] font-medium">הרשאות</span>.</p>
              <p>חיבור עמוק ל-Priority.</p>
              <p>וגמישות שמאפשרת לכם לגדול בלי לבנות מחדש.</p>
            </div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              ככה בונים אוטומציה שמחזיקה לאורך זמן.
            </p>
          </motion.div>

          {/* CTA – הבנתם איך */}
          <motion.div
            className={`reveal rounded-[20px] border border-gray-100 bg-white p-8 md:p-10 mt-8 text-center`}
            {...fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3 flex items-center justify-center gap-2 text-right">
              <span className="shrink-0 w-[20px] h-[20px]">
                <Image src="/brand/bubble-icon.svg" alt="" width={20} height={20} className="w-full h-full" />
              </span>
              הבנתם איך המערכת בנויה. עכשיו איך מתחילים?
            </h2>
            <p className={`${cardTextClass} mb-6 max-w-xl mx-auto`}>
              המבנה מאפשר שליטה וגמישות.
              <br />
              תהליך ההטמעה בנוי כך שתוך ימים ספורים תראו בוט ראשון פעיל.
            </p>
            <div className="final-cta-buttons grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link href="/onboarding" className="button-primary flex-col">
                <span className="text-base font-medium">תהליך ההטמעה</span>
              </Link>
              <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-700 transition flex items-center justify-center">
                או עברו למחיר
              </Link>
            </div>
          </motion.div>

          {/* CTA סופי – רקע accent */}
          <motion.section
            className="reveal rounded-[20px] mt-12 bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary-dark)] text-white p-10 md:p-14 text-center"
            {...fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              רוצים לראות איך זה עובד אצלכם?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              מוכנים לראות את המערכת בפעולה? תאמו שיחת הדגמה או צפו בתמחור.
            </p>
            <div className="final-cta-buttons grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <CalendlyModal size="lg" variant="outline" />
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center border border-white/80 text-white hover:bg-white/10 rounded-xl px-6 py-3 transition font-medium"
              >
                צפו במחיר
              </Link>
            </div>
          </motion.section>
        </section>
      </main>
    </div>
  );
}
