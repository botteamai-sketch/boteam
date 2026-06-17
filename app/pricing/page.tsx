"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import CalendlyModal from "@/components/CalendlyModal";
import LeadModal from "@/components/LeadModal";
import SuccessToast from "@/components/SuccessToast";
import PromoPrice from "@/components/PromoPrice";
import {
  formatPrice,
  getEffectiveSetupBase,
  getEffectiveWhatsAppSetup,
  getSetupCost,
  isSetupPromoActive,
  PROMO_VALIDITY,
  PROMO_LABEL,
  SETUP_BASE_REGULAR,
  WHATSAPP_SETUP_REGULAR,
} from "@/lib/pricing";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const BOT_TIERS = [
  { label: "בוט 1 (הראשון)", price: 290 },
  { label: "בוט 2", price: 240 },
  { label: "בוט 3", price: 200 },
  { label: "בוט 4", price: 180 },
  { label: "בוט 5 ואילך", price: 160 },
] as const;

function calculateMonthlyCost(botCount: number): number {
  if (botCount <= 0) return 0;
  const tierPrices = [290, 240, 200, 180];
  let total = 0;
  for (let i = 0; i < botCount; i++) {
    total += i < tierPrices.length ? tierPrices[i] : 160;
  }
  return total;
}

const SETUP_INCLUDES = [
  "התקנת מודול מחולל הבוטים בסביבת ה-Priority של הארגון",
  "המודול מותקן כחלק אינטגרלי ומובנה ממערכת ה-ERP של הארגון",
  "קונפיגורציה מלאה והגדרת הרשאות למיישמי ה-Priority של החברה",
  "הדרכה מעשית על המערכת הכוללת ליווי צמוד בהקמת תהליך הבוט הראשון",
  "תמיכה מקצועית במייל ללא הגבלה",
] as const;

const HIGHLIGHTS = [
  {
    title: "ללא הגבלת שיחות מצד Boteam",
    text: "המערכת פתוחה ומאפשרת שימוש חופשי ללא הגבלת כמות הודעות או שיחות.",
  },
  {
    title: "פעיל במלואה מהיום הראשון",
    text: "כולל חיבור ישיר ומאובטח ל-Priority, הפעלת מנגנוני אירועים עסקיים (Triggers) מובנים, וביצוע אוטומציות מורכבות בזמן אמת.",
  },
  {
    title: "ללא התחייבות",
    text: "המנוי חודשי גמיש לחלוטין. ניתן להפסיק או לשנות את כמות הבוטים בכל עת ללא חוזים שנתיים מחייבים וללא קנסות יציאה.",
  },
] as const;

const INCLUDED = [
  "חיבור ישיר ל-Priority דו־כיווני",
  "תקשורת WhatsApp",
  "מנוע AI מתקדם",
  "אינדוקס מסמכים (PDF, קבצים)",
  "מנגנון RAG חכם",
  "ללא הגבלת שיחות מצד Boteam",
] as const;

const STEPS = [
  { n: "1", title: "חיבור והטמעה בסביבת Priority" },
  { n: "2", title: "הפעלת בוט ראשון" },
  { n: "3", title: "רישיון חודשי לפי מדרגות יורדות לפי כמות הבוטים הפעילים" },
] as const;

const FAQ_REGULAR = [
  {
    q: "מהו מחולל הבוטים?",
    a: "מחולל הבוטים הוא מודול מערכת המותקן בתוך Priority ומאפשר יצירת תהליכי Automation ו-Workflow חכמים המחוברים ישירות לנתוני הארגון.",
  },
  {
    q: "האם מדובר בשירות בניית בוטים?",
    a: "לא. מדובר בהתקנת פלטפורמה ליצירת בוטים בתוך מערכת Priority. אנו מתקינים את המודול ומבצעים Enablement ראשוני, אך הגדרת התהליכים מבוצעת על ידי מיישם ה-Priority של הארגון.",
  },
  {
    q: "מי אחראי על הגדרת הבוטים בארגון?",
    a: "הגדרת התהליכים והרחבתם מבוצעת על ידי מיישם ה-Priority של הארגון, בהתאם ללוגיקה ולמבנה העסקי הפנימי.",
  },
  {
    q: "מה כלול בעלות ההקמה החד-פעמית?",
    a: `עלות ההקמה (${formatPrice(SETUP_BASE_REGULAR)} לפני מע״מ) כוללת התקנת מודול מלא בסביבת Priority, קונפיגורציה והרשאות למיישמים, הדרכה מעשית עם ליווי צמוד בהקמת תהליך הבוט הראשון, ותמיכה מקצועית במייל ללא הגבלה.`,
  },
  {
    q: "מה כולל החודש הראשון?",
    a: "בחודש הראשון משלמים אך ורק את עלות ההקמה החד-פעמית. אין שום עלות חודשית שוטפת על הבוט או הבוטים שמוקמים במהלך החודש הראשון לפעילות - הבוטים פעילים בחינם.",
  },
  {
    q: "כיצד עובד המודל החודשי?",
    a: "התמחור החודשי מחושב אוטומטית לפי כמות הבוטים הפעילים בפועל, במודל מדרגות יורד: בוט ראשון ₪290, בוט שני ₪240, בוט שלישי ₪200, בוט רביעי ₪180, ובוט חמישי ואילך ₪160 לכל בוט. לדוגמה: 3 בוטים - ₪730 לחודש לפני מע״מ (290+240+200).",
  },
  {
    q: "האם יש התחייבות ארוכת טווח?",
    a: "לא. אין חוזה שנתי או תקופת מינימום מחייבת. החיוב הוא חודשי בלבד, וניתן להפסיק או לצמצם את הרישוי בהתאם לצורך הארגוני - בלי התחייבות ארוכת טווח מצד הלקוח.",
  },
  {
    q: "איך מבטלים או מפסיקים את הרישוי?",
    a: "מספיק לפנות אלינו לפני תחילת מחזור החיוב הבא. נעדכן את הרישוי בהתאם (הפסקה מלאה או הסרת בוטים) כך שלא תחויבו עבור מה שאינכם צריכים.",
  },
  {
    q: "האם קיימות מגבלות שימוש?",
    a: "לא. אין הגבלת כמות הודעות או שיחות מצד Boteam. המערכת פתוחה לשימוש חופשי.",
  },
  {
    q: "האם בוט רב-ערוצי נספר כמספר בוטים?",
    a: "לא. בוט שהוגדר לעבודה במספר ערוצים במקביל (למשל וואטסאפ ואימייל) נספר כבוט אחד בלבד, לפי התהליך העסקי מול מסך הפריוריטי.",
  },
  {
    q: "האם ניתן להוסיף בוטים נוספים?",
    a: "כן. ניתן להוסיף תהליכים פעילים בכל שלב. כל בוט נוסף מתומחר לפי מדרגת המיקום שלו - ככל שיש יותר בוטים, המחיר לבוט נוסף יורד.",
  },
  {
    q: "מה עלות חיבור WhatsApp?",
    a: `חיבור לערוץ הוואטסאפ הוא אופציונלי וכרוך בתוספת חד-פעמית של ${formatPrice(WHATSAPP_SETUP_REGULAR)} לסנכרון והגדרת ה-API מול Meta. סה״כ הקמה כולל וואטסאפ: ${formatPrice(SETUP_BASE_REGULAR + WHATSAPP_SETUP_REGULAR)} לפני מע״מ.`,
  },
  {
    q: "האם יש תמחור לפי משתמשים?",
    a: "לא. אין תמחור לפי מספר משתמשים במערכת.",
  },
] as const;

function getFaqItems() {
  if (!isSetupPromoActive()) return FAQ_REGULAR;

  return FAQ_REGULAR.map((item) => {
    if (item.q === "מה כלול בעלות ההקמה החד-פעמית?") {
      return {
        ...item,
        a: `${PROMO_LABEL} (${PROMO_VALIDITY}): עלות ההקמה ${formatPrice(0)} לפני מע״מ, במקום ${formatPrice(SETUP_BASE_REGULAR)}. כולל התקנת מודול מלא בסביבת Priority, קונפיגורציה והרשאות למיישמים, הדרכה מעשית עם ליווי צמוד בהקמת תהליך הבוט הראשון, ותמיכה מקצועית במייל ללא הגבלה.`,
      };
    }
    if (item.q === "מה עלות חיבור WhatsApp?") {
      return {
        ...item,
        a: `${PROMO_LABEL} (${PROMO_VALIDITY}): חיבור WhatsApp כלול ללא תוספת. לאחר המבצע, חיבור לערוץ הוואטסאפ הוא אופציונלי וכרוך בתוספת חד-פעמית של ${formatPrice(WHATSAPP_SETUP_REGULAR)} לסנכרון והגדרת ה-API מול Meta.`,
      };
    }
    return item;
  });
}

const WHO_IS_IT_FOR = [
  "חברות שעובדות עם Priority (לא zoom)",
  "עסקים שרוצים להפוך WhatsApp לכלי תפעולי",
  "חברות שרוצות להוסיף שכבת AI אמיתית למערכת",
] as const;

function PricingCalculator() {
  const promoActive = isSetupPromoActive();
  const [botCount, setBotCount] = useState(1);
  const [withWhatsApp, setWithWhatsApp] = useState(false);

  const setupCost = getSetupCost(withWhatsApp);
  const setupCostOriginal = promoActive
    ? SETUP_BASE_REGULAR + WHATSAPP_SETUP_REGULAR
    : SETUP_BASE_REGULAR + (withWhatsApp ? WHATSAPP_SETUP_REGULAR : 0);
  const monthlyCost = calculateMonthlyCost(botCount);
  const firstMonthTotal = setupCost;

  return (
    <div className="rounded-2xl border-2 border-[var(--primary-dark)]/20 bg-white p-6 md:p-8 shadow-[var(--shadow-medium)]">
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">
        מחשבון עלויות
      </h3>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="bot-count"
            className="block text-sm font-semibold text-[var(--text-primary)] mb-2"
          >
            כמות בוטים פעילים: <span className="text-[var(--primary-dark)]">{botCount}</span>
          </label>
          <input
            id="bot-count"
            type="range"
            min={1}
            max={10}
            value={botCount}
            onChange={(e) => setBotCount(Number(e.target.value))}
            className="w-full accent-[var(--primary-dark)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        {promoActive ? (
          <p className="text-sm text-[var(--text-primary)] rounded-xl bg-[var(--accent-green)]/10 px-4 py-3 border border-[var(--accent-green)]/30">
            חיבור WhatsApp - כלול במבצע, ללא תוספת
          </p>
        ) : (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={withWhatsApp}
              onChange={(e) => setWithWhatsApp(e.target.checked)}
              className="w-5 h-5 accent-[var(--primary-dark)] rounded"
            />
            <span className="text-sm text-[var(--text-primary)]">
              כולל חיבור WhatsApp (+{formatPrice(WHATSAPP_SETUP_REGULAR)} חד-פעמי)
            </span>
          </label>
        )}

        <div className="rounded-xl bg-[var(--background-soft)] border border-[var(--border-soft)] p-5 space-y-4">
          <div className="flex justify-between items-baseline gap-4">
            <span className="text-sm text-[var(--text-secondary)]">עלות הקמה (חד-פעמי)</span>
            <PromoPrice
              amount={setupCost}
              original={promoActive ? setupCostOriginal : undefined}
              size="md"
            />
          </div>
          <div className="flex justify-between items-baseline gap-4 border-t border-[var(--border-soft)] pt-4">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              חודש ראשון (בוטים בחינם)
            </span>
            <span className="text-lg font-bold text-[var(--accent-green)]">
              <PromoPrice
                amount={firstMonthTotal}
                original={promoActive && monthlyCost > 0 ? monthlyCost : undefined}
                size="md"
                currentClassName="text-[var(--accent-green)]"
              />
            </span>
          </div>
          <div className="flex justify-between items-baseline gap-4 border-t border-[var(--border-soft)] pt-4">
            <span className="text-sm text-[var(--text-secondary)]">
              מחודש שני ואילך (חודשי)
            </span>
            <span className="text-lg font-bold text-[var(--primary-dark)]">
              {formatPrice(monthlyCost)}
            </span>
          </div>
          {botCount > 1 && (
            <p className="text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-soft)]">
              פירוט:{" "}
              {Array.from({ length: botCount }, (_, i) => {
                const price = i < 4 ? [290, 240, 200, 180][i] : 160;
                return `בוט ${i + 1} - ${formatPrice(price)}`;
              }).join(" · ")}
            </p>
          )}
        </div>

        <p className="text-xs text-[var(--text-secondary)]">
          * כל המחירים לפני מע״מ. בחודש הראשון אין עלות חודשית שוטפת על הבוטים.
        </p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const promoActive = isSetupPromoActive();
  const setupBase = getEffectiveSetupBase();
  const whatsappSetup = getEffectiveWhatsAppSetup();
  const setupWithWhatsappTotal = setupBase + whatsappSetup;
  const setupWithWhatsappOriginal = SETUP_BASE_REGULAR + WHATSAPP_SETUP_REGULAR;
  const faqItems = getFaqItems();

  return (
    <div dir="rtl" className="min-h-screen bg-white text-[var(--text-primary)]">
      <Header />

      <main>
        {/* מחיר מרכזי */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[var(--background-soft)] to-white pt-10 pb-14 md:pt-14 md:pb-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(63,169,245,0.12),transparent)]" />
          <div className="relative mx-auto max-w-2xl px-6 flex flex-col items-center">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-8 text-center w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              dir="rtl"
            >
              מחולל הבוטים לפריוריטי
            </motion.h1>
            <p className="text-xs text-[var(--text-secondary)] opacity-80 text-center w-full mb-3" dir="rtl">
              מיועד לארגונים המשתמשים ב-Priority
            </p>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-full max-w-xl mx-auto rounded-2xl border-2 border-[var(--border-soft)] bg-white p-8 md:p-10 shadow-[var(--shadow-medium)] text-right"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* עלות הקמה */}
                {promoActive && (
                  <p className="text-sm font-semibold text-[var(--accent-green)] mb-3 rounded-xl bg-[var(--accent-green)]/10 px-4 py-2 border border-[var(--accent-green)]/30">
                    {PROMO_LABEL} — {PROMO_VALIDITY}
                  </p>
                )}
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  עלות הקמה (חד-פעמי)
                </p>
                <p className="mb-4">
                  <PromoPrice
                    amount={setupBase}
                    original={promoActive ? SETUP_BASE_REGULAR : undefined}
                    size="lg"
                  />
                </p>
                <ul className="mt-3 space-y-2.5 mb-6">
                  {SETUP_INCLUDES.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 justify-start">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">
                        ✔
                      </span>
                      <span className="text-[var(--text-primary)] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-[var(--text-secondary)] mb-6 rounded-xl bg-[var(--background-soft)] px-4 py-3 border border-[var(--border-soft)]">
                  <span className="font-medium text-[var(--text-primary)]">תוספת חיבור WhatsApp (אופציונלי):</span>{" "}
                  {promoActive ? (
                    <>חיבור WhatsApp - כלול במבצע, ללא תוספת.</>
                  ) : (
                    <>
                      {formatPrice(WHATSAPP_SETUP_REGULAR)} חד-פעמי לסנכרון והגדרת ה-API מול Meta.
                    </>
                  )}
                  <span className="block mt-2 font-medium text-[var(--text-primary)]">
                    סה״כ הקמה כולל וואטסאפ:{" "}
                    <PromoPrice
                      amount={setupWithWhatsappTotal}
                      original={promoActive ? setupWithWhatsappOriginal : undefined}
                      size="sm"
                    />
                  </span>
                </p>

                <hr className="border-t border-[var(--border-soft)] my-6" />

                {/* עלות חודשית */}
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  עלות חודשית שוטפת (לפי בוטים פעילים)
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  התמחור מחושב מדי חודש לפי כמות הבוטים הפעילים בפועל, במודל מדרגות יורד:
                </p>
                <ul className="space-y-2 mb-6">
                  {BOT_TIERS.map((tier) => (
                    <li
                      key={tier.label}
                      className="flex justify-between items-center text-sm bg-[var(--background-soft)] rounded-lg px-4 py-2.5 border border-[var(--border-soft)]"
                    >
                      <span className="text-[var(--text-primary)]">{tier.label}</span>
                      <span className="font-bold text-[var(--primary-dark)]">
                        {formatPrice(tier.price)} לחודש
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-[var(--text-primary)] font-medium mb-6 rounded-xl bg-[var(--accent-green)]/10 px-4 py-3 border border-[var(--accent-green)]/30">
                  הטבה לחודש הראשון: החודש הראשון של הבוטים - חינם!
                  <span className="block mt-2 font-normal text-[var(--text-secondary)]">
                    בחודש הראשון משלמים אך ורק את עלות ההקמה. אין עלות חודשית שוטפת על הבוטים שמוקמים במהלך החודש הראשון.
                  </span>
                  <span className="block mt-2 font-normal text-[var(--text-secondary)]">
                    דוגמה: 3 בוטים מחודש שני - {formatPrice(calculateMonthlyCost(3))} לחודש לפני מע״מ (290+240+200)
                  </span>
                </p>

                <div className="space-y-3 pt-2">
                  {HIGHLIGHTS.map((item) => (
                    <p key={item.title} className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      <span className="font-medium text-[var(--text-primary)]">{item.title}:</span>{" "}
                      {item.text}
                    </p>
                  ))}
                </div>

                <p className="text-xs text-[var(--text-secondary)] opacity-80 mt-6 pt-4 border-t border-[var(--border-soft)]" dir="rtl">
                  * כל המחירים לפני מע״מ
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* פלטפורמת Automation ארגונית - Native ל-Priority */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="text-right"
            >
              <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6">
                פלטפורמת Automation מובנית בתוך פריוריטי
              </h2>
              <div className="text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed space-y-3">
                <p>מחולל הבוטים הוא מודול מערכת מלא המותקן כחלק אינטגרלי מפריוריטי.<br />לא מערכת חיצונית, אלא תפריט חדש בתוך פריוריטי -<br />כלומר שכבת יכולות חדשות בתוך ה-ERP הארגוני.</p>
                <p>הוא מרחיב את Priority ביכולת ליזום, לנהל ולהשלים תהליכי Workflow-Bot,<br />תוך גישה לנתונים, ללוגיקה העסקית ולמבנה המערכת.</p>
              </div>
              <ul className="mt-6 space-y-2 max-w-2xl mx-auto text-[var(--text-primary)] text-sm">
                <li className="flex items-center gap-2 justify-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                  <span>מותקן בתוך סביבת ה-Priority של הארגון</span>
                </li>
                <li className="flex items-center gap-2 justify-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                  <span>מנוהל על ידי מיישם ה-Priority</span>
                </li>
                <li className="flex items-center gap-2 justify-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                  <span>ללא פיצול מערכות</span>
                </li>
                <li className="flex items-center gap-2 justify-start">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                  <span>ללא תלות בפלטפורמות חיצוניות</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* הדרכה ותמיכה נוספת */}
        <section className="py-14 md:py-20 bg-[var(--background-soft)] border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-right">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-center"
              {...fadeUp}
            >
              הדרכה ותמיכה נוספת
            </motion.h2>
            <motion.div
              className="text-[var(--text-secondary)] leading-relaxed space-y-3"
              {...fadeUp}
            >
              <p>ניתן להזמין הדרכות עומק נוספות בהתאם לצורך הארגוני.<br />עלות: 400 ₪ לשעה.</p>
              <p>ההדרכות מבוצעות יחד עם מיישם ה-Priority של הארגון, ומטרתן להרחיב ולהעמיק את היכולת הפנימית בשימוש בפלטפורמה.</p>
            </motion.div>
          </div>
        </section>

        {/* השליטה נשארת אצלכם */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-right">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6 text-center"
              {...fadeUp}
            >
              שליטה מלאה. ללא תלות חיצונית.
            </motion.h2>
            <motion.div
              className="text-[var(--text-secondary)] leading-relaxed text-lg space-y-3"
              {...fadeUp}
            >
              <p>אנחנו מספקים את התשתית.<br />הארגון מגדיר, שולט ומפתח תהליכי Bot באופן עצמאי - באמצעות מיישם הפריוריטי של הארגון ועל גבי המערכת הקיימת.</p>
              <p>המטרה היא לבסס שליטה מלאה של הארגון בפלטפורמת מחולל הבוטים,<br />כך שמיישם ה-Priority יוכל להגדיר, להרחיב ולהתאים באופן עצמאי<br />את יכולות מחולל הבוטים לתהליכים העסקיים של הארגון אשר משתנים עם הזמן.</p>
              <p>הערך אינו בבוט אחד.<br />הערך הוא ביכולת מערכתית מתמשכת להרחבת תהליכים עסקיים ללא תלות בספק חיצוני.</p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3 - מה כלול */}
        <section className="py-14 md:py-20 bg-[var(--background-soft)]">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center"
              {...fadeUp}
            >
              מה מקבלים בכל בוט?
            </motion.h2>
            <ul className="space-y-4">
              {INCLUDED.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-lg text-[var(--text-primary)] bg-white rounded-xl px-5 py-4 shadow-soft border border-[var(--border-soft)]"
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] font-bold text-sm">
                    ✔
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-8 rounded-2xl border border-[var(--border-soft)] bg-white p-6 md:p-8 shadow-sm text-right"
              {...fadeUp}
              transition={{ delay: INCLUDED.length * 0.05 }}
            >
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                מה זה בעצם בוט?
              </h3>
              <p className="text-[var(--text-primary)] font-medium mb-2">
                בוט אחד = תהליך עסקי אחד אוטומטי.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                כל בוט יודע לעבוד מול מסך אחד ב-Priority.
                <br />
                לעבודה מול מסך נוסף - מגדירים בוט נוסף.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4 rounded-xl bg-[var(--background-soft)] px-4 py-3 border border-[var(--border-soft)]">
                <span className="font-medium text-[var(--text-primary)]">בוט רב-ערוצי נחשב כבוט אחד:</span>{" "}
                בוט שעובד במספר ערוצים במקביל (וואטסאפ, אימייל ועוד) נספר כבוט אחד בלבד לפי התהליך העסקי מול מסך הפריוריטי.
              </p>
              <p className="text-[var(--text-secondary)] font-medium mb-2">לדוגמה:</p>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-4 pr-2">
                <li>בוט שירות להזמנות פתוחות</li>
                <li>בוט שירות לחשבוניות</li>
                <li>בוט הצעות מחיר</li>
                <li>בוט גבייה</li>
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                הלקוח מרגיש שיחה אחת רציפה.
                <br />
                מאחורי הקלעים - כל תהליך מנוהל בנפרד.
              </p>
              <p className="text-[var(--text-primary)] font-medium mb-3">כל בוט כולל:</p>
              <ul className="space-y-2 mb-6">
                {[
                  "ניהול שיחה חכם",
                  "חיבור למסך ייעודי ב-Priority",
                  "שמירת היסטוריה מלאה",
                  "תיעוד ותמלול השיחה שבוצעה בנספחי התעודה הרלוונטית",
                  "החזרת נתונים אוטומטית למערכת",
                  "אפשרות ליזום שיחות לפי אירועים עסקיים",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[var(--text-primary)] text-sm">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] text-xs font-bold">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                כל בוט פעיל מתומחר לפי מדרגת המיקום שלו במודל המדרגות היורד - החל מ-{formatPrice(290)} לבוט הראשון, ועד {formatPrice(160)} לבוט חמישי ואילך.
              </p>
              <p className="text-[var(--text-primary)] font-semibold">
                רישוי בוט הוא רישוי לתהליך עסקי אחד מלא - ללא הגבלת שיחות.
              </p>
            </motion.div>
            <motion.p
              className="mt-10 text-center text-[var(--text-secondary)] font-medium"
              {...fadeUp}
            >
              אין גרסת Lite. אין שדרוגים בתשלום.
              <br />
              <span className="text-[var(--text-primary)]"> אתם מקבלים את היכולות המלאות.</span>
            </motion.p>
          </div>
        </section>

        {/* מודל תמחור */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]" aria-labelledby="pricing-heading">
          <div className="mx-auto max-w-3xl px-6 text-right">
            <motion.h2
              id="pricing-heading"
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 text-center"
              {...fadeUp}
            >
              מודל תמחור
            </motion.h2>
            <motion.p
              className="text-sm text-[var(--text-secondary)] text-center mb-8"
              {...fadeUp}
            >
              מבנה תמחור ברור, שקוף וללא אותיות קטנות.
              <br />
              <span className="text-[var(--text-primary)] font-medium">המנוי חודשי - ניתן להפסיק בלי התחייבות.</span>
            </motion.p>

            <motion.div className="mb-8" {...fadeUp}>
              <PricingCalculator />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                className="rounded-2xl border border-slate-300 bg-[var(--background-soft)] p-6 md:p-8"
                {...fadeUp}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">עלות הקמה (חד-פעמי)</h3>
                <p className="mb-3">
                  <PromoPrice
                    amount={setupBase}
                    original={promoActive ? SETUP_BASE_REGULAR : undefined}
                    size="md"
                  />
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                  כולל התקנת מחולל הבוטים כחלק אינטגרלי ממערכת Priority, קונפיגורציה מלאה, הרשאות למיישמים, הדרכה מעשית עם ליווי צמוד בהקמת תהליך הבוט הראשון, ותמיכה מקצועית במייל ללא הגבלה.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {promoActive ? (
                    <>
                      חיבור WhatsApp - כלול במבצע, ללא תוספת (סה״כ הקמה כולל וואטסאפ:{" "}
                      <PromoPrice
                        amount={setupWithWhatsappTotal}
                        original={setupWithWhatsappOriginal}
                        size="sm"
                      />
                      ).
                    </>
                  ) : (
                    <>
                      תוספת אופציונלית לחיבור WhatsApp: {formatPrice(WHATSAPP_SETUP_REGULAR)} (סה״כ {formatPrice(SETUP_BASE_REGULAR + WHATSAPP_SETUP_REGULAR)} כולל וואטסאפ).
                    </>
                  )}
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-slate-300 bg-[var(--background-soft)] p-6 md:p-8"
                {...fadeUp}
                transition={{ delay: 0.05 }}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">עלות חודשית שוטפת</h3>
                <p className="text-base font-semibold text-[var(--primary-dark)] mb-3">מדרגות יורדות לפי בוטים פעילים</p>
                <ul className="space-y-2 mb-4">
                  {BOT_TIERS.map((tier) => (
                    <li key={tier.label} className="flex justify-between text-sm text-[var(--text-secondary)]">
                      <span>{tier.label}</span>
                      <span className="font-semibold text-[var(--text-primary)]">{formatPrice(tier.price)} לחודש</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                  דוגמאות לפני מע״מ: בוט אחד - {formatPrice(290)} לחודש; שלושה בוטים - {formatPrice(730)} לחודש; חמישה בוטים - {formatPrice(calculateMonthlyCost(5))} לחודש.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  התמחור אינו לפי משתמשים. התמחור אינו לפי נפח הודעות. אין הגבלת שיחות מצד Boteam.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border-2 border-[var(--accent-green)]/40 bg-[var(--accent-green)]/5 p-6 md:p-8"
                {...fadeUp}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">הטבה לחודש הראשון</h3>
                <p className="text-base font-semibold text-[var(--accent-green)] mb-3">החודש הראשון של הבוטים - חינם!</p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  בחודש הראשון הלקוח משלם אך ורק את עלות ההקמה החד-פעמית. אין שום עלות חודשית שוטפת על הבוט או הבוטים שמוקמים במהלך החודש הראשון לפעילות.
                </p>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-slate-300 bg-[var(--background-soft)] p-6 md:p-8"
                {...fadeUp}
                transition={{ delay: 0.15 }}
              >
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">עלויות תשתית WhatsApp Business (Meta)</h3>
                <div className="text-[var(--text-secondary)] leading-relaxed space-y-2">
                  <p>הודעות נשלחות באמצעות תשתית WhatsApp Business של Meta. עלויות השימוש נקבעות על ידי Meta ומשולמות ישירות אליה.</p>
                  <p>במרבית הארגונים, העלות החודשית בפועל מסתכמת בסכומים נמוכים מאוד. Meta גובה תשלום מזערי עבור פתיחת שיחה יזומה על ידי הבוט, כאשר תגובות במסגרת חלון שיחה פעיל או הודעות נכנסות אינן כרוכות בעלות נוספת מצדנו.</p>
                  <p>המערכת אינה מוסיפה מרווח על עלויות Meta.</p>
                </div>
              </motion.div>
              <motion.div
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 md:p-8"
                {...fadeUp}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">תמיכה והדרכות נוספות (אופציונלי)</h3>
                <p className="text-base font-semibold text-[var(--text-primary)] mb-3">₪400 לשעה</p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-2">
                  מיועד לארגונים המבקשים להרחיב את היקף השימוש ולהעמיק את השליטה הפנימית בפלטפורמה.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  העבודה מתבצעת יחד עם מיישם ה-Priority של הארגון.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4 - איך זה עובד */}
        <section className="py-14 md:py-20 bg-white">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-16 text-center"
              {...fadeUp}
            >
              3 שלבים ל-AI פעיל בתוך Priority
            </motion.h2>
            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  className="flex gap-6 items-start"
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex flex-col items-center shrink-0">
                    <span className="w-12 h-12 rounded-full bg-[var(--primary-dark)] text-white flex items-center justify-center font-bold text-lg">
                      {step.n}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className="w-0.5 flex-1 min-h-[40px] bg-gradient-to-b from-[var(--primary-dark)] to-[var(--primary-light)]/40 my-1" />
                    )}
                  </div>
                  <div className="pb-12">
                    <p className="text-xl font-semibold text-[var(--text-primary)]">
                      {step.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* למי זה מתאים */}
        <section className="py-14 md:py-20 bg-white border-t border-[var(--border-soft)]">
          <div className="mx-auto max-w-3xl px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center"
              {...fadeUp}
            >
              למי זה מתאים?
            </motion.h2>
            <ul className="space-y-5">
              {WHO_IS_IT_FOR.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-lg text-[var(--text-primary)]"
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center text-[var(--accent-green)] font-bold text-sm">
                    ✔
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <motion.p
              className="mt-12 text-center text-xl font-semibold text-[var(--primary-dark)]"
              {...fadeUp}
            >
              אם Priority הוא הליבה - מחולל הבוטים הוא שכבת ה-AI שמעליו.
            </motion.p>
          </div>
        </section>

        {/* שאלות נפוצות */}
        <section className="py-14 md:py-20 bg-[var(--background-soft)]">
          <div className="mx-auto max-w-3xl px-6 text-right">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-14 text-center"
              {...fadeUp}
            >
              שאלות נפוצות
            </motion.h2>
            <dl className="space-y-6">
              {faqItems.map((item, i) => (
                <motion.div
                  key={item.q}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-[var(--border-soft)]"
                  {...fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <dt className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {item.q}
                  </dt>
                  <dd className="text-[var(--text-secondary)] leading-relaxed">
                    {item.a}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA סופי */}
        <section className="py-14 md:py-20 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary-light)] text-white">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <motion.p
              className="text-base md:text-lg font-medium !text-white mb-6"
              {...fadeUp}
            >
              נבנה במיוחד עבור ארגונים שעובדים עם Priority.
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-8"
              {...fadeUp}
            >
              רוצים לראות את Priority עובד עם AI אמיתי?
            </motion.h2>
            <motion.div
              className="mb-6 flex flex-wrap gap-4 justify-center items-center"
              {...fadeUp}
            >
              <CalendlyModal size="lg" variant="outline" />
              <LeadModal size="lg" variant="dark" />
            </motion.div>
            <motion.p
              className="!text-white text-sm md:text-base"
              {...fadeUp}
            >
              מחולל הבוטים הוא לא תוסף. הוא שכבה חדשה במערכת שלכם.
            </motion.p>
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
