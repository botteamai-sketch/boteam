"use client";

import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LeadModal from "@/components/LeadModal";
import CalendlyModal from "@/components/CalendlyModal";
import ScrollTracker from "@/components/ScrollTracker";
import VideoSection from "@/components/VideoSection";
import HeroVideo from "@/components/HeroVideo";
import DemoCTASection from "@/components/DemoCTASection";
import HowItWorksSection from "@/components/HowItWorksSection";





export default function Home() {
  return (
    <div dir="rtl" className="bg-[#F8FAFC] text-[#243B53]">

      <Header />

      <main className="min-h-screen">
        <ScrollTracker />

        {/* Hero קולנועי – לא לשנות */}
        <HeroVideo />

        {/* Funnel: CTA להדגמה */}
        <DemoCTASection />

        {/* הסבר טכני – איך עובד בוט AI */}
        <HowItWorksSection />

        <VideoSection />

        {/* HOW IT WORKS */}
        <section
          id="how"
          className="bg-white pt-16 pb-28 border-t border-gray-100"
        >
          <div className="mx-auto max-w-6xl px-6 text-right">
            {/* כותרת + תמונה – ימין: כותרת, שמאל: תמונה */}
            <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center mb-16">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#243B53] mb-3">
                  כך זה עובד
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  שיחה ב-WhatsApp מתעדכנת ישירות ב-Priority — בלי העתקה, בלי טעויות.
                </p>
              </div>
              <div className="order-1 md:order-2 relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-gray-50">
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
                  הלקוח או העובד כותבים כרגיל. הבוט מבין, שואל ומקדם את התהליך.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-[#3AA0D8] font-semibold">04</div>
                <h3 className="text-xl font-semibold">
                  סגירת מעגל מלאה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  סטטוסים מתעדכנים, תאריכים נקבעים והשדות מתמלאים אוטומטית בפריוריטי.
                </p>
              </div>

            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
              <Link
                href="/demo"
                className="inline-flex flex-col items-center justify-center text-center rounded-lg bg-[#243B53] hover:bg-[#1b2c3e] transition px-5 py-2 text-white shadow-md leading-tight"
              >
                <span className="text-sm font-medium">לתיאום שיחת הדגמה</span>
                <span className="text-xs opacity-90">ללא עלות</span>
              </Link>
              <LeadModal variant="light" />
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
                  לא מערכת חיצונית ולא כלי צדדי. מחולל הבוטים הינו מסך נוסף כחלק מתפריט פריוריטי.
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
                <div className="absolute top-0 left-0 h-full w-1 bg-[#3AA0D8] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  מעקב הצעות מחיר
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הצעה פתוחה ← הבוט יוזם בירור ← התשובה חוזרת לשדה הנכון בפריוריטי.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#4CAF50] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  אישורי הנהלה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הזמנה מעל סכום מסוים ← אישור בוואטסאפ ← סטטוס מתעדכן אוטומטית.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#3AA0D8] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  גבייה חכמה
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  תזכורת אוטומטית ← תיאום תשלום ← עדכון סטטוס במערכת.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#4CAF50] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  תיאום התקנות
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  הזמנה מוכנה ← תיאום תאריך מול הלקוח ← קביעת מועד במערכת.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#3AA0D8] rounded-l-2xl" />
                <h3 className="text-xl font-semibold mb-3">
                  ספקים
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  בירור זמינות ומחיר ללא שרשראות מייל אינסופיות.
                </p>
              </div>

              <div className="relative bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
                <div className="absolute top-0 left-0 h-full w-1 bg-[#4CAF50] rounded-l-2xl" />
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

            <div className="flex flex-wrap items-center justify-center gap-4">
              <CalendlyModal size="lg" />
              <LeadModal size="lg" />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
