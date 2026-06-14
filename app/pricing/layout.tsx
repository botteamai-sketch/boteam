import type { Metadata } from "next";

const canonicalUrl = "https://boteam.org/pricing";
const title = "מחיר | שכבת ה-AI של Priority | Boteam";
const description =
  "הקמה חד-פעמית ₪550, בוטים לפי מדרגות יורדות מ-₪290 לחודש. החודש הראשון חינם. לדוגמה: 3 בוטים - ₪730 לחודש (לפני מע״מ). ללא התחייבות.";

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
