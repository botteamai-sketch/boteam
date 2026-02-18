import type { Metadata } from "next";

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

const faqData: { question: string; answer: string }[] = [
  {
    question: "מהו מחולל הבוטים לפריוריטי?",
    answer:
      "מחולל הבוטים הוא מנגנון המאפשר ליצור בוטים חכמים מתוך מערכת פריוריטי עצמה, המחוברים לוואטסאפ ואימייל. הבוטים יוזמים שיחות בעקבות אירועים עסקיים, מבינים שפה חופשית ומחזירים את המידע ישירות לשדות הנכונים במערכת.",
  },
  {
    question: "האם מדובר בבוט אחד קבוע?",
    answer:
      "לא. ניתן להגדיר מספר בלתי מוגבל של בוטים, לכל תהליך, מחלקה או צורך ארגוני.",
  },
  {
    question: "כמה זמן לוקח להגדיר בוט?",
    answer:
      "ברוב המקרים ניתן להגדיר בוט ראשון תוך דקות, כחלק מהתהליכים הקיימים בפריוריטי, ללא צורך בפיתוח.",
  },
  {
    question: "כיצד המערכת מתחברת לפריוריטי?",
    answer:
      "החיבור מתבצע באמצעות Web Services ו-API של פריוריטי. אין צורך בהחלפת מערכת או בשינוי תשתית קיימת.",
  },
  {
    question: "האם נדרש פיתוח מיוחד?",
    answer:
      "לא. ההגדרה מתבצעת מתוך המערכת, ללא כתיבת קוד. במקרים של שדות מותאמים או פיתוחים פרטיים – המערכת תומכת ומשתלבת גם בהם.",
  },
  {
    question: "האם הנתונים נשמרים מחוץ לארגון?",
    answer:
      "המערכת פועלת כהרחבה ל-ERP ואינה מחליפה אותו. הנתונים העסקיים ממשיכים להישמר בפריוריטי בהתאם למדיניות הארגון.",
  },
  {
    question: "האם ניתן לעבוד עם כמה בוטים במקביל?",
    answer:
      "כן. ניתן ליצור בוטים שונים למחלקות שונות ואף להעביר שיחות ביניהם לפי תהליך.",
  },
  {
    question: "כיצד נשמרת אבטחת המידע?",
    answer:
      "המערכת עושה שימוש בחיבורים מאובטחים ובהרשאות גישה מבוקרות. כל שיחה מתועדת וניתנת למעקב.",
  },
  {
    question: "האם קיימת הפרדת לקוחות?",
    answer: "כן. קיימת הפרדה מלאה בין ארגונים שונים.",
  },
  {
    question: "האם נשמרת היסטוריית שיחה?",
    answer:
      "כן. ניתן לשמור תיעוד מלא של השיחות כחלק מתהליך העבודה.",
  },
  {
    question: "באילו תהליכים ניתן להשתמש במערכת?",
    answer:
      "מכירות, גבייה, תיאומים, אישורי הנהלה, לידים, עבודה מול ספקים, שירות לקוחות ועוד.",
  },
  {
    question: "האם הבוט מבין שפה חופשית?",
    answer:
      "כן. המשתמש כותב באופן טבעי והמערכת מזהה את הכוונה, שואלת הבהרות במידת הצורך ומעדכנת שדות מדויקים.",
  },
  {
    question: "מה קורה בסיום השיחה?",
    answer:
      "סטטוסים מתעדכנים, שדות מתמלאים, תאריכים נשמרים והתהליך נסגר במערכת.",
  },
  {
    question: "האם נדרש צוות AI?",
    answer: "לא. כל ההגדרה מתבצעת מתוך פריוריטי עצמה.",
  },
  {
    question: "כמה זמן לוקחת הטמעה מלאה בארגון?",
    answer:
      "משך ההטמעה תלוי בהיקף התהליכים, אך ברוב המקרים ניתן להתחיל בתהליך אחד ולהרחיב בהדרגה.",
  },
  {
    question: "האם ניתן להתאים את הבוט לתהליכים ייחודיים?",
    answer:
      "כן. המערכת גמישה ומאפשרת התאמה מלאה לשדות, טפסים ותהליכים קיימים.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

const categories: { name: string; indices: number[] }[] = [
  { name: "כללי", indices: [0, 1, 2] },
  { name: "טכנולוגיה ואינטגרציה", indices: [3, 4, 5, 6] },
  { name: "אבטחת מידע", indices: [7, 8, 9] },
  { name: "שימושים עסקיים", indices: [10, 11, 12] },
  { name: "תפעול והטמעה", indices: [13, 14, 15] },
];

export default function FAQPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#243B53]">
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#243B53]">
            שאלות נפוצות
          </h1>
          <p className="text-lg text-gray-600 text-center mb-14 max-w-2xl mx-auto leading-relaxed">
            תשובות לשאלות נפוצות על מחולל הבוטים לפריוריטי – אוטומציה בוואטסאפ ואימייל
            המחוברת ישירות ל-ERP.
          </p>

          <div className="space-y-0 border-b border-gray-200">
            {categories.map((cat) => (
              <div key={cat.name}>
                <h2 className="text-lg font-semibold text-[#3AA0D8] mb-4 mt-10 first:mt-0">
                  {cat.name}
                </h2>
                <ul className="space-y-0" role="list">
                  {cat.indices.map((i) => {
                    const item = faqData[i];
                    return (
                      <li key={i} className="border-b border-gray-100 last:border-b-0">
                        <details className="group">
                          <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-right font-medium text-[#243B53] hover:text-[#3AA0D8] transition-colors">
                            <span className="flex-1">{item.question}</span>
                            <span className="shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-open:bg-[#3AA0D8]/10 group-open:text-[#3AA0D8] transition-colors">
                              <span className="group-open:rotate-180 transition-transform duration-200 inline-block" aria-hidden>
                                ▼
                              </span>
                            </span>
                          </summary>
                          <div className="pb-5 pr-8 text-gray-600 leading-relaxed">
                            {item.answer}
                          </div>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
    </div>
  );
}
