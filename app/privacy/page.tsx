import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

const canonicalUrl = "https://boteam.org/privacy";
const title = "מדיניות פרטיות | Boteam";
const description =
  "מדיניות הפרטיות של Boteam – מחולל הבוטים לפריוריטי. כיצד אנו אוספים, מעבדים ומאבטחים מידע במסגרת שירותי האוטומציה וחיבור Priority ERP לערוצי התקשורת.";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
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
    card: "summary",
    title,
    description,
  },
};

const privacyStyles = `
  @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap");

  .privacy-page {
    min-height: 100vh;
    background: #f9fafb;
    font-family: "Rubik", "Assistant", system-ui, -apple-system, sans-serif;
  }

  .privacy-breadcrumb {
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 0;
    font-size: 0.875rem;
    color: #6b7280;
    text-align: right;
  }

  .privacy-breadcrumb a {
    color: #3fa9f5;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .privacy-breadcrumb a:hover {
    color: #1f2f46;
  }

  .privacy-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }

  .privacy-document {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(31, 47, 70, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
    padding: clamp(1.75rem, 5vw, 3rem);
    text-align: right;
    color: #1f2937;
    line-height: 1.6;
  }

  .privacy-document h1 {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 700;
    color: #1f2f46;
    margin: 0 0 0.75rem;
    line-height: 1.3;
  }

  .privacy-document .last-updated {
    font-size: 0.9375rem;
    color: #6b7280;
    margin: 0 0 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .privacy-document h2 {
    font-size: clamp(1.125rem, 2.5vw, 1.375rem);
    font-weight: 600;
    color: #1f2f46;
    margin: 2rem 0 0.875rem;
    line-height: 1.4;
  }

  .privacy-document p {
    font-size: 1rem;
    color: #1f2937;
    margin: 0 0 1rem;
    line-height: 1.6;
  }

  .privacy-document ul {
    margin: 0 0 1rem;
    padding-right: 1.5rem;
    padding-left: 0;
    list-style-type: disc;
  }

  .privacy-document li {
    font-size: 1rem;
    color: #1f2937;
    margin-bottom: 0.625rem;
    line-height: 1.6;
  }

  .privacy-document li:last-child {
    margin-bottom: 0;
  }

  .privacy-document strong {
    font-weight: 600;
    color: #1f2f46;
  }

  @media (max-width: 640px) {
    .privacy-wrapper {
      padding: 1.25rem 1rem 3rem;
    }

    .privacy-document {
      padding: 1.5rem 1.25rem;
      border-radius: 8px;
    }

    .privacy-document ul {
      padding-right: 1.25rem;
    }
  }
`;

export default function PrivacyPage() {
  return (
    <div dir="rtl" className="privacy-page">
      <style dangerouslySetInnerHTML={{ __html: privacyStyles }} />
      <Header />

      <nav className="privacy-breadcrumb" aria-label="ניווט">
        <Link href="/">בית</Link>
        <span aria-hidden="true"> / </span>
        <span>מדיניות פרטיות</span>
      </nav>

      <main className="privacy-wrapper">
        <article className="privacy-document" aria-labelledby="privacy-title">
          <h1 id="privacy-title">מדיניות פרטיות - Boteam</h1>
          <p className="last-updated">עדכון אחרון: יוני 2026</p>

          <p>
            ברוכים הבאים למדיניות הפרטיות של <strong>Boteam</strong> (להלן:
            &quot;השירות&quot; או &quot;האפליקציה&quot;). אנו מכבדים את פרטיותך
            ומחויבים להגן על המידע האישי והעסקי של משתמשינו. מסמך זה מפרט כיצד
            השירות אוסף, מעבד ומאבטח את המידע במסגרת מתן שירותי האוטומציה וחיבור
            מערכת ה-Priority ERP לערוצי התקשורת ויישומוני המסרים (כגון WhatsApp
            Business Cloud API).
          </p>

          <h2>1. המידע שאנו מעבדים</h2>
          <p>
            במסגרת פעילותו התקינה של השירות, האפליקציה עשויה לקבל ולעבד את
            נתוני המידע הבאים:
          </p>
          <ul>
            <li>
              <strong>נתוני API ויישומונים:</strong> מזהי הודעות, מספרי טלפון
              של שולחים ומקבלים, ושמות פרופיל כפי שהם מתקבלים משרתי Meta במסגרת
              הרשאות ה-WhatsApp Business API.
            </li>
            <li>
              <strong>תוכן הודעות:</strong> טקסט ההודעות הנכנסות והיוצאות
              הנדרש לצורך ניתוב והפעלת אירועים עסקיים (Triggers) במערכת ה-ERP.
            </li>
            <li>
              <strong>פרטי הגדרה וחיבור:</strong> מפתחות גישה (Tokens), כתובות
              endpoint של שרתי הלקוח, ונתוני זיהוי של סביבת ה-Priority
              הרלוונטית.
            </li>
          </ul>

          <h2>2. כיצד אנו משתמשים במידע</h2>
          <p>השירות עושה שימוש במידע אך ורק למטרות הבאות:</p>
          <ul>
            <li>
              תפעול, תחזוקה ואספקת שירותי האוטומציה של פלטפורמת Boteam.
            </li>
            <li>
              ניתוב ועיבוד בזמן אמת של הודעות ואירועים עסקיים בין תשתיות
              המשתמש לבין מערכת ה-Priority ERP שלו.
            </li>
            <li>
              מניעת הונאות, אבטחת מידע ופתרון תקלות טכניות (Debugging).
            </li>
          </ul>

          <h2>3. שיתוף מידע עם צדדים שלישיים</h2>
          <p>
            אנו <strong>לא</strong> מוכרים, משכירים, סוחרים או מעבירים את
            המידע שלך לגורמים חיצוניים בשום אופן, למעט במקרים הבאים:
          </p>
          <ul>
            <li>
              <strong>ספקי תשתית חיוניים:</strong> העברת מידע מוצפן לתשתיות
              הליבה המפעילות את ה-API (כגון שרתי Meta המפעילים את ה-WhatsApp
              Cloud API) ושרתי האחסון המאובטחים של האפליקציה.
            </li>
            <li>
              <strong>דרישה משפטית:</strong> במידה ונדרש לכך על פי חוק, צו
              שיפוטי או במסגרת הליכים משפטיים מחייבים.
            </li>
          </ul>

          <h2>4. אבטחת מידע ותשתיות</h2>
          <p>
            אנו מיישמים אמצעי אבטחה טכנולוגיים וארגוניים מתקדמים כדי להגן על
            המידע שלך מפני גישה בלתי מורשית, שינוי, חשיפה או הרס. כל תעבורת
            הנתונים והתקשורת בין האפליקציה, שרתי Meta ומערכות ה-ERP של הלקוח
            מבוצעת בצורה מוצפנת ומאובטחת באמצעות פרוטוקולים תקניים (HTTPS /
            SSL).
          </p>

          <h2>5. שינויים במדיניות הפרטיות</h2>
          <p>
            אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו מעת לעת. במידה
            ויבוצעו שינויים מהותיים, נעדכן את תאריך העדכון האחרון המופיע בראש
            עמוד זה. המשך השימוש בשירות לאחר פרסום המדיניות המעודכנת מהווה
            הסכמה לתנאים החדשים.
          </p>

          <h2>6. יצירת קשר</h2>
          <p>
            לכל שאלה, הבהרה או פנייה בנושא פרטיות המידע בשירות, ניתן ליצור
            עמנו קשר באמצעות כתובת האימייל הרשמית של התמיכה באתר Boteam.
          </p>
        </article>
      </main>
    </div>
  );
}
