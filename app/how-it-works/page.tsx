"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

export default function HowItWorksPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white text-[var(--text-primary)]">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-24">
        {/* סקשן פתיחה רגשי */}
        <section className="mb-24 text-right">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
            {...fadeUp}
          >
            כשהכל עובר דרך בוט אחד – הכל מתערבב
          </motion.h2>
          <motion.div
            className="text-[var(--text-secondary)] leading-relaxed space-y-4"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
            <p>
              מכירות, שירות, גבייה, תזכורות, הצעות מחיר.
              <br />
              כשהכל מתנהל דרך בוט אחד – הגבולות מטשטשים.
            </p>
            <p>קשה להגדיר הרשאות.</p>
            <p>קשה לבצע שינוי נקודתי.</p>
            <p>קשה להתרחב בלי לגעת בכל המערכת.</p>
            <p>זו הסיבה שמערכות פשוטות נשברות כשהעסק גדל.</p>
          </motion.div>
        </section>

        {/* HERO */}
        <section className="mb-24 mt-12 text-right">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
            {...fadeUp}
          >
            לא עוד בוט. מערכת בוטים חכמה.
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-semibold text-[var(--text-primary)] mb-6"
            {...fadeUp}
            transition={{ delay: 0.03 }}
          >
            מערכת עם חלוקת תפקידים ברורה ו<span className="text-[var(--primary-dark)]">שליטה מלאה</span>.
          </motion.p>
          <motion.p
            className="text-xl md:text-2xl text-[var(--text-secondary)] mb-6"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
            מאחורי כל שיחה עומדת חלוקת תפקידים מדויקת.
          </motion.p>
          <motion.p
            className="text-[var(--text-secondary)] leading-relaxed max-w-2xl"
            {...fadeUp}
            transition={{ delay: 0.1 }}
          >
            הלקוח מדבר עם העסק כרגיל.
            <br />
            מאחורי הקלעים פועלת מערכת שיודעת לנתב את השיחה למומחה המתאים, לעבוד מול Priority, ולהחזיר נתונים בצורה מסודרת ומבוקרת.
          </motion.p>
        </section>

        {/* SECTION 1 – הבוט הראשי */}
        <section className="mb-24 text-right border-t border-gray-100 pt-24">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
            {...fadeUp}
          >
            הבוט הראשי – המרכזיה הדיגיטלית
          </motion.h2>
          <motion.div
            className="text-[var(--text-secondary)] leading-relaxed space-y-4"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
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
          </motion.div>
        </section>

        {/* SECTION 2 – בוטים מתמחים */}
        <section className="mb-24 text-right">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
            {...fadeUp}
          >
            בוטים מתמחים לפי תהליך עסקי
          </motion.h2>
          <motion.div
            className="text-[var(--text-secondary)] leading-relaxed space-y-4"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
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
              <li className="flex items-center gap-2">
                <span className="text-[var(--accent-green)] font-bold">✔</span>
                גמישות מלאה
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[var(--accent-green)] font-bold">✔</span>
                שינוי נקודתי בלי לפגוע בתהליכים אחרים
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[var(--accent-green)] font-bold">✔</span>
                בקרה מדויקת לפי <span className="text-[var(--primary-dark)] font-medium">הרשאות</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[var(--accent-green)] font-bold">✔</span>
                תחזוקה פשוטה לאורך זמן
              </li>
            </ul>
            <p>
              בכל רגע נתון רק בוט אחד מנהל את השיחה –
              <br />
              והמעבר ביניהם שקוף לחלוטין למשתמש.
            </p>
          </motion.div>
          <motion.div
            className="mt-8 p-5 md:p-6 rounded-xl border border-[var(--border-soft)] bg-white text-right"
            {...fadeUp}
            transition={{ delay: 0.08 }}
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">
              כל בוט עובד מול מסך אחד ב-Priority
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
              החלוקה הזו מבטיחה דיוק.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
              כל בוט מחובר למסך ייעודי, עם מיפוי שדות ברור ותוצאה מוגדרת מראש.
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              זו לא רק שיחה – זו פעולה עסקית מתועדת.
            </p>
          </motion.div>
        </section>

        {/* שאלה רטורית – למה המבנה ככה */}
        <section className="mb-24 text-right border-t border-gray-100 pt-24">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4"
            {...fadeUp}
          >
            למה בחרנו במבנה של מרכזיה ומומחים?
          </motion.h2>
          <motion.p
            className="text-[var(--text-secondary)] leading-relaxed max-w-2xl"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
            כי מערכת שנבנית נכון מההתחלה —
            <br />
            לא צריכה להיבנות מחדש כשהעסק גדל.
          </motion.p>
        </section>

        {/* סקשן אסטרטגי – למה מחלקים לכמה בוטים */}
        <section className="mb-24 border-t border-gray-100 pt-24">
          <motion.div
            className="bg-gray-50 rounded-xl p-6 md:p-8 text-right"
            {...fadeUp}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">
              למה מחלקים לכמה בוטים?
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              ייתכן שתשאלו —
              <br />
              למה לא בוט אחד שעושה הכל?
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              כי כאשר כל תהליך מופרד לבוט ייעודי:
            </p>
            <ul className="space-y-2 mb-6">
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
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              המבנה <span className="text-[var(--primary-dark)] font-semibold">המודולרי</span> הוא זה שמאפשר יציבות לאורך זמן וגמישות לצמיחה.
            </p>
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              גמישות היום חוסכת שכתוב מחר.
            </p>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-8 mb-3">
              מבנה מודולרי שמאפשר צמיחה
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
              רוצים להוסיף תהליך חדש?
              <br />
              מגדירים בוט נוסף.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
              רוצים לשנות תהליך קיים?
              <br />
              משנים רק את הבוט הרלוונטי.
            </p>
            <p className="text-[var(--text-primary)] font-medium mb-2">
              המערכת נשארת יציבה – גם כשהעסק משתנה.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              רוב הארגונים מתחילים מתהליך אחד,
              <br />
              ומוסיפים תהליכים נוספים לפי הצורך.
            </p>
          </motion.div>
        </section>

        {/* Diagram */}
        <section className="mb-24 border-t border-gray-100 pt-24" id="system-diagram">
          <motion.h3
            className="text-lg font-semibold text-[var(--text-secondary)] mb-12 text-right"
            {...fadeUp}
          >
            כך זה נראה מאחורי הקלעים
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full flex justify-center mb-12 mt-8"
          >
            <div className="w-full max-w-5xl group">
              <div className="relative rounded-2xl border border-[var(--border-soft)] shadow-soft overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                <Image
                  src="/system-diagram.jpg"
                  alt="תרשים מערכת הבוטים – הבוט הראשי כמרכזיה, בוטים מתמחים מחוברים ל-Priority, ובוט יוזם לפי חוק עסקי"
                  width={1600}
                  height={1000}
                  className="w-full h-auto"
                  placeholder="blur"
                  blurDataURL="/system-diagram.jpg"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>
          <motion.p
            className="text-sm text-[var(--text-secondary)] text-center mt-4"
            {...fadeUp}
          >
            המרכזיה מנתבת לבוטים מורשים בלבד, וכל בוט פועל מול מסך ייעודי ב-Priority.
          </motion.p>

          {/* Use Case אמיתי */}
          <motion.div
            className="mt-12 p-6 rounded-xl border border-[var(--border-soft)] bg-white text-right"
            {...fadeUp}
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
              דוגמה אמיתית
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
              לקוח מבקש סטטוס הזמנה.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
              המרכזיה מזהה שמדובר בפנייה שירותית.
              <br />
              הבוט הייעודי להזמנות פתוחות נבחר.
              <br />
              הוא פונה למסך המתאים ב-Priority, מחלץ את הנתונים, ומחזיר תשובה מדויקת.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
              מבחינת הלקוח — זו שיחה רגילה.
              <br />
              מבחינת הארגון — זו שליפה מבוקרת ממערכת הליבה.
            </p>
          </motion.div>

          {/* חיזוק ביטחון טכנולוגי */}
          <motion.p
            className="mt-6 text-[var(--text-secondary)] leading-relaxed text-right"
            {...fadeUp}
          >
            המערכת אינה פועלת באופן פתוח או אקראי.
            <br />
            כל תוצאה מבוססת על אפשרויות שהוגדרו מראש בתהליך.
          </motion.p>
        </section>

        {/* SECTION 3 – בוט יוזם */}
        <section className="mb-24 text-right border-t border-gray-100 pt-24">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
            {...fadeUp}
          >
            לא רק מגיב. גם יוזם.
          </motion.h2>
          <motion.div
            className="text-[var(--text-secondary)] leading-relaxed space-y-4"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
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
          </motion.div>
        </section>

        {/* SECTION 4 – איך זה עובד בפועל */}
        <section className="mb-24 text-right">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
            {...fadeUp}
          >
            איך זה עובד בפועל?
          </motion.h2>
          <motion.div
            className="text-[var(--text-secondary)] leading-relaxed space-y-4"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
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
          </motion.div>
        </section>

        {/* SECTION 5 – בלוק בידול */}
        <motion.section
          className="bg-gray-50 rounded-2xl p-8 md:p-12 text-right"
          {...fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">
            זו מערכת עם <span className="text-[var(--primary-dark)]">שליטה מלאה</span>
          </h2>
          <ul className="space-y-3 mb-6">
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
        </motion.section>

        {/* למי זה מתאים במיוחד */}
        <section className="border-t border-gray-100 pt-24 mb-24 text-right">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
            {...fadeUp}
          >
            למי המערכת מתאימה במיוחד?
          </motion.h2>
          <motion.ul
            className="space-y-3 mb-6"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
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
          </motion.ul>
          <motion.p
            className="text-lg font-semibold text-[var(--text-primary)]"
            {...fadeUp}
            transition={{ delay: 0.1 }}
          >
            ככל שהארגון מורכב יותר — כך היתרון של המבנה הזה משמעותי יותר.
          </motion.p>
        </section>

        {/* מה זה לא */}
        <section className="mb-24">
          <motion.div
            className="bg-gray-50 rounded-xl p-6 md:p-8 text-right"
            {...fadeUp}
          >
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4">
              זו לא מערכת של תשובות אוטומטיות
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
              זו לא מערכת שמחזירה טקסטים כלליים.
              <br />
              זו מערכת שמבצעת פעולות עסקיות בפועל.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
              כל בוט מחובר למסך ייעודי, עם תוצאה מוגדרת מראש.
              <br />
              המערכת אינה פועלת מחוץ למה שהוגדר לה.
            </p>
            <p className="text-[var(--text-primary)] font-semibold">
              <span className="text-[var(--primary-dark)]">שליטה מלאה.</span> ללא הפתעות.
            </p>
          </motion.div>
        </section>

        {/* סקשן סיום – Product Narrative */}
        <section className="mt-24 mb-12 text-right border-t border-gray-100 pt-24">
          <motion.p
            className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl"
            {...fadeUp}
          >
            המערכת בנויה כך שתוכל לנהל 2 תהליכים או 20 —
            <br />
            בלי שינוי בתשתית.
          </motion.p>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6"
            {...fadeUp}
          >
            זו תשתית דיגיטלית לעסק, לא רק אוטומציה.
          </motion.h2>
          <motion.div
            className="text-[var(--text-secondary)] leading-relaxed space-y-3 mb-6"
            {...fadeUp}
            transition={{ delay: 0.05 }}
          >
            <p>מערכת אחת.</p>
            <p>חלוקת תפקידים ברורה.</p>
            <p>שליטה ב<span className="text-[var(--primary-dark)] font-medium">הרשאות</span>.</p>
            <p>חיבור עמוק ל-Priority.</p>
            <p>וגמישות שמאפשרת לכם לגדול בלי לבנות מחדש.</p>
          </motion.div>
          <motion.p
            className="text-lg font-semibold text-[var(--text-primary)]"
            {...fadeUp}
            transition={{ delay: 0.1 }}
          >
            ככה בונים אוטומציה שמחזיקה לאורך זמן.
          </motion.p>
        </section>
      </main>
    </div>
  );
}
