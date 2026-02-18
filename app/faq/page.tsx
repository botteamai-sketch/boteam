import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import FAQSearch from "@/components/FAQSearch";

const canonicalUrl = "https://boteam.org/faq";
const title = "שאלות נפוצות – מחולל הבוטים לפריוריטי | Boteam";
const description =
  "שאלות נפוצות על מחולל הבוטים לפריוריטי: אוטומציה בוואטסאפ, אינטגרציה עם ERP, אבטחת מידע, שימושים עסקיים והטמעה בארגון.";

export const metadata: Metadata = {
  title: "שאלות נפוצות – מחולל הבוטים לפריוריטי",
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const faqs = [
  {
    category: "כללי",
    question: "מהו מחולל הבוטים לפריוריטי?",
    answer:
      "מחולל הבוטים הוא מנגנון המאפשר ליצור בוטים חכמים מתוך מערכת פריוריטי עצמה, המחוברים לוואטסאפ ואימייל. הבוטים יוזמים שיחות בעקבות אירועים עסקיים, מבינים שפה חופשית ומחזירים את המידע ישירות לשדות הנכונים במערכת.",
  },
  {
    category: "כללי",
    question: "האם מדובר בבוט אחד קבוע?",
    answer:
      "לא. ניתן להגדיר מספר בלתי מוגבל של בוטים, לכל תהליך, מחלקה או צורך ארגוני.",
  },
  {
    category: "כללי",
    question: "כמה זמן לוקח להגדיר בוט?",
    answer:
      "ברוב המקרים ניתן להגדיר בוט ראשון תוך דקות, כחלק מהתהליכים הקיימים בפריוריטי, ללא צורך בפיתוח.",
  },
  {
    category: "טכנולוגיה ואינטגרציה",
    question: "כיצד המערכת מתחברת לפריוריטי?",
    answer:
      "החיבור מתבצע באמצעות Web Services ו-API של פריוריטי. אין צורך בהחלפת מערכת או בשינוי תשתית קיימת.",
  },
  {
    category: "טכנולוגיה ואינטגרציה",
    question: "האם נדרש פיתוח מיוחד?",
    answer:
      "לא. ההגדרה מתבצעת מתוך המערכת, ללא כתיבת קוד. במקרים של שדות מותאמים או פיתוחים פרטיים – המערכת תומכת ומשתלבת גם בהם.",
  },
  {
    category: "טכנולוגיה ואינטגרציה",
    question: "האם הנתונים נשמרים מחוץ לארגון?",
    answer:
      "המערכת פועלת כהרחבה ל-ERP ואינה מחליפה אותו. הנתונים העסקיים ממשיכים להישמר בפריוריטי בהתאם למדיניות הארגון.",
  },
  {
    category: "טכנולוגיה ואינטגרציה",
    question: "האם ניתן לעבוד עם כמה בוטים במקביל?",
    answer:
      "כן. ניתן ליצור בוטים שונים למחלקות שונות ואף להעביר שיחות ביניהם לפי תהליך.",
  },
  {
    category: "אבטחת מידע",
    question: "כיצד נשמרת אבטחת המידע?",
    answer:
      "המערכת עושה שימוש בחיבורים מאובטחים ובהרשאות גישה מבוקרות. כל שיחה מתועדת וניתנת למעקב.",
  },
  {
    category: "אבטחת מידע",
    question: "האם קיימת הפרדת לקוחות?",
    answer: "כן. קיימת הפרדה מלאה בין ארגונים שונים.",
  },
  {
    category: "אבטחת מידע",
    question: "האם נשמרת היסטוריית שיחה?",
    answer:
      "כן. ניתן לשמור תיעוד מלא של השיחות כחלק מתהליך העבודה.",
  },
  {
    category: "שימושים עסקיים",
    question: "באילו תהליכים ניתן להשתמש במערכת?",
    answer:
      "מכירות, גבייה, תיאומים, אישורי הנהלה, לידים, עבודה מול ספקים, שירות לקוחות ועוד.",
  },
  {
    category: "שימושים עסקיים",
    question: "האם הבוט מבין שפה חופשית?",
    answer:
      "כן. המשתמש כותב באופן טבעי והמערכת מזהה את הכוונה, שואלת הבהרות במידת הצורך ומעדכנת שדות מדויקים.",
  },
  {
    category: "שימושים עסקיים",
    question: "מה קורה בסיום השיחה?",
    answer:
      "סטטוסים מתעדכנים, שדות מתמלאים, תאריכים נשמרים והתהליך נסגר במערכת.",
  },
  {
    category: "תפעול והטמעה",
    question: "האם נדרש צוות AI?",
    answer: "לא. כל ההגדרה מתבצעת מתוך פריוריטי עצמה.",
  },
  {
    category: "תפעול והטמעה",
    question: "כמה זמן לוקחת הטמעה מלאה בארגון?",
    answer:
      "משך ההטמעה תלוי בהיקף התהליכים, אך ברוב המקרים ניתן להתחיל בתהליך אחד ולהרחיב בהדרגה.",
  },
  {
    category: "תפעול והטמעה",
    question: "האם ניתן להתאים את הבוט לתהליכים ייחודיים?",
    answer:
      "כן. המערכת גמישה ומאפשרת התאמה מלאה לשדות, טפסים ותהליכים קיימים.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#243B53]">
      <Header />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-6 mt-6">
        <nav className="text-sm text-gray-500" aria-label="ניווט">
          <Link href="/" className="hover:text-[#3AA0D8] transition">
            בית
          </Link>
          <span className="mx-2">/</span>
          <span>שאלות נפוצות</span>
        </nav>
      </div>

      <section className="py-32 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#243B53]">
            שאלות נפוצות
          </h1>
          <p className="text-lg text-gray-600 text-center mb-14 max-w-2xl mx-auto leading-relaxed">
            כאן ריכזנו תשובות לשאלות המרכזיות בנוגע למחולל הבוטים לפריוריטי, החיבור לוואטסאפ והטמעה בארגון.
          </p>

          <FAQSearch faqs={faqs} />
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#3AA0D8] transition">
            מחולל הבוטים לפריוריטי
          </Link>
          <span className="mx-2">·</span>
          <span>© {new Date().getFullYear()} Boteam. כל הזכויות שמורות.</span>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
    </div>
  );
}
