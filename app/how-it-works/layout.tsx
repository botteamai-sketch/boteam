import type { Metadata } from "next";

const canonicalUrl = "https://boteam.org/how-it-works";
const title = "איך המערכת בנויה - מחולל הבוטים לפריוריטי | Boteam";
const description =
  "מערכת בוטים חכמה: מרכזיה דיגיטלית, בוטים מתמחים לפי תהליך עסקי, יוזמות אוטומטיות. הסבר ברור על מודל הבוטים ללא שפה טכנית.";

export const metadata: Metadata = {
  title: "איך המערכת בנויה - מחולל הבוטים לפריוריטי",
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
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
