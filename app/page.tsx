"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { motion } from "framer-motion";
import LeadModal from "@/components/LeadModal";
import CalendlyModal from "@/components/CalendlyModal";
import ScrollTracker from "@/components/ScrollTracker";





export default function Home() {
  return (
    <div dir="rtl" className="bg-[#F8FAFC] text-[#243B53]">

      <Header />

      <main className="min-h-screen">
        <ScrollTracker />

        {/* HERO */}
        <section className="relative overflow-hidden py-32">

        {/* רקע גרדיאנט עדין */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] via-white to-[#eaf3f9] -z-10" />

        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* צד ימין – טקסט */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right space-y-8"
          >


            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              לו רק <span className="text-[#3AA0D8]">פריוריטי</span> היה יכול לדבר.
            </h1>

            <p className="text-2xl font-medium">
              עכשיו הוא יוזם, שואל, מאשר וסוגר מעגל —
              <span className="text-[#4CAF50]"> ישירות בוואטסאפ ובאימייל.</span>
            </p>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              מחולל הבוטים מחבר את ה־ERP ישירות לערוצי התקשורת,
              מאפשר למערכת ליזום שיחות, להבין שפה חופשית
              ולהחזיר מידע אוטומטית לשדות הנכונים.
            </p>

            <div className="flex gap-4 pt-4">
              <CalendlyModal />

              <button className="rounded-xl border border-[#3AA0D8] text-[#3AA0D8] hover:bg-[#3AA0D8]/10 transition px-8 py-3 text-lg">
                ראו איך זה עובד
              </button>
            </div>

          </motion.div>


          {/* צד שמאל – Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >


            {/* כרטיס ERP */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">

              <div className="text-sm text-gray-400 mb-4">
                אירוע במערכת
              </div>

              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>

              <div className="mt-6 text-sm text-[#3AA0D8] font-semibold">
                סטטוס: ממתין לאישור
              </div>
            </div>

            {/* בועת וואטסאפ */}
            <div className="absolute -bottom-10 -left-10 bg-[#4CAF50] text-white rounded-2xl shadow-xl px-6 py-4 max-w-xs">
              <div className="text-sm">
                שלום, ההזמנה מוכנה. ניתן לאשר?
              </div>
            </div>

          </motion.div>


        </div>
        </section>


        {/* HOW IT WORKS */}
        <section
          id="how"
          className="bg-white py-28 border-t border-gray-100"
        >
          <div className="mx-auto max-w-6xl px-6 text-right">

            <h2 className="text-3xl font-bold mb-16">
              כך זה עובד
            </h2>

            <div className="grid gap-14 md:grid-cols-2">

              <div className="space-y-3">
                <div className="text-sm text-[#3AA0D8] font-semibold">01</div>
                <h3 className="text-xl font-semibold">
                  אירוע עסקי מתרחש בפריוריטי
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הזמנה מוכנה, הצעת מחיר פתוחה, בקשת אישור או חוב פתוח —
                  כל טריגר עסקי יכול להפעיל את הבוט.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-[#3AA0D8] font-semibold">02</div>
                <h3 className="text-xl font-semibold">
                  הבוט יוזם שיחה אוטומטית
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  נשלחת הודעת וואטסאפ או אימייל יזומה ללא התערבות ידנית.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-[#3AA0D8] font-semibold">03</div>
                <h3 className="text-xl font-semibold">
                  שפה חופשית והבהרות חכמות
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הלקוח או העובד כותבים רגיל. הבוט מבין, שואל ומקדם את התהליך.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-[#3AA0D8] font-semibold">04</div>
                <h3 className="text-xl font-semibold">
                  סגירת מעגל מלאה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  סטטוסים מתעדכנים, תאריכים נקבעים והשדות מתמלאים אוטומטית ב־ERP.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* DIFFERENTIATION */}
        <section className="py-28 bg-[#F8FAFC] border-t border-gray-100">
          <div className="mx-auto max-w-6xl px-6 text-right">

            <h2 className="text-3xl font-bold mb-16">
              למה זה שונה מכל בוט אחר?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">

              {/* Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#3AA0D8]/10 flex items-center justify-center mb-6 text-[#3AA0D8] font-bold">
                  ERP
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  פריוריטי נשארת במרכז
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  לא מערכת חיצונית ולא כלי צדדי. הבוט הוא הרחבה טבעית של ה־ERP שלכם.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-6 text-[#4CAF50] font-bold">
                  AI
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  יוזם ולא רק מגיב
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  אירוע עסקי בפריוריטי מפעיל שיחה אוטומטית ללא צורך בפעולה ידנית.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#3AA0D8]/10 flex items-center justify-center mb-6 text-[#3AA0D8] font-bold">
                  💬
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  מבין שפה חופשית
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  המשתמש כותב רגיל. הבוט מבין, שואל הבהרות ומעדכן את השדות הנכונים.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-6 text-[#4CAF50] font-bold">
                  ✔
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  סגירת מעגל מלאה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  סטטוסים, תאריכים ואישורים מתעדכנים אוטומטית במערכת.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#3AA0D8]/10 flex items-center justify-center mb-6 text-[#3AA0D8] font-bold">
                  ⚙
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  גמיש לחלוטין
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  מתאים למכירות, שירות, גבייה, רכש, הנהלה, לוגיסטיקה ומשאבי אנוש.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mb-6 text-[#4CAF50] font-bold">
                  🚀
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  ללא צורך בתכנות
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  ההגדרה מתבצעת מתוך פריוריטי עצמה. אין צורך בצוות טכנולוגי.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section
          id="usecases"
          className="py-28 bg-white border-t border-gray-100"
        >
          <div className="mx-auto max-w-6xl px-6 text-right">

            <h2 className="text-3xl font-bold mb-16">
              איפה זה מייצר ערך מיידי?
            </h2>

            <div className="grid gap-8 md:grid-cols-2">

              {/* Use Case Card */}
              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 right-0 h-full w-1 bg-[#3AA0D8] rounded-r-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  מעקב הצעות מחיר
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הצעה פתוחה → הבוט יוזם בירור → התשובה חוזרת לשדה הנכון בפריוריטי.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 right-0 h-full w-1 bg-[#4CAF50] rounded-r-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  אישורי הנהלה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הזמנה מעל סכום מסוים → אישור בוואטסאפ → סטטוס מתעדכן אוטומטית.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 right-0 h-full w-1 bg-[#3AA0D8] rounded-r-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  גבייה חכמה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  תזכורת אוטומטית → תיאום תשלום → עדכון סטטוס במערכת.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 right-0 h-full w-1 bg-[#4CAF50] rounded-r-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  תיאום התקנות
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הזמנה מוכנה → תיאום תאריך מול הלקוח → קביעת מועד במערכת.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 right-0 h-full w-1 bg-[#3AA0D8] rounded-r-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  ספקים
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  בירור זמינות ומחיר ללא שרשראות מייל אינסופיות.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 right-0 h-full w-1 bg-[#4CAF50] rounded-r-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  לידים חדשים
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  תגובה אוטומטית לליד → איסוף מידע → רישום מלא בפריוריטי.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* BENEFITS / ROI */}
        <section className="py-28 bg-[#243B53] text-white">
          <div className="mx-auto max-w-6xl px-6 text-right">

            <h2 className="text-3xl font-bold mb-16">
              מה הארגון מרוויח?
            </h2>

            <div className="grid gap-12 md:grid-cols-3">

              <div>
                <div className="text-4xl font-extrabold text-[#3AA0D8] mb-4">
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
                <div className="text-4xl font-extrabold text-[#4CAF50] mb-4">
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
                <div className="text-4xl font-extrabold text-[#3AA0D8] mb-4">
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
                <div className="text-4xl font-extrabold text-[#4CAF50] mb-4">
                  💬
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  תקשורת בערוצים טבעיים
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  לקוחות ועובדים מתקשרים בדרך שנוחה להם —
                  בלי פורטלים מסובכים.
                </p>
              </div>

              <div>
                <div className="text-4xl font-extrabold text-[#3AA0D8] mb-4">
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
                <div className="text-4xl font-extrabold text-[#4CAF50] mb-4">
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
        <section className="py-28 bg-gradient-to-br from-[#3AA0D8] to-[#243B53] text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">

            <h2 className="text-4xl font-bold mb-6">
              המערכת כבר חכמה. עכשיו היא גם מתקשרת.
            </h2>

            <p className="text-xl text-gray-100 mb-10">
              הגדירו בוט ראשון תוך דקות ותנו לפריוריטי לנהל גם את השיחות שלכם.
            </p>

            <CalendlyModal />

            <div className="mt-6">
              <LeadModal />
            </div>


          </div>
        </section>

      </main>
    </div>
  );
}
