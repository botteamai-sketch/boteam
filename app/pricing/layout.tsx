import type { Metadata } from "next";

const canonicalUrl = "https://boteam.org/pricing";
const title = "מחיר | שכבת ה-AI של Priority | Boteam";
const description =
  "מחיר פשוט וברור: ₪120 לחודש לכל בוט פעיל. דמי הקמה חד פעמיים. מערכת מלאה מהיום הראשון.";

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
