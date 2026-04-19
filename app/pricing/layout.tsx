import type { Metadata } from "next";

const canonicalUrl = "https://boteam.org/pricing";
const title = "מחיר | שכבת ה-AI של Priority | Boteam";
const description =
  "מחיר פשוט: ₪500 לחודש רישיון מערכת + ₪120 לחודש לכל בוט פעיל. ללא דמי הקמה. מנוי חודשי ללא התחייבות ארוכת טווח. דוגמה: בוט אחד ₪620, שלושה בוטים ₪860 (לפני מע״מ).";

export const metadata: Metadata = {
  title: "מחיר - שכבת ה-AI של Priority",
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

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
