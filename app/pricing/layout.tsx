import type { Metadata } from "next";

const canonicalUrl = "https://boteam.org/pricing";
const title = "תמחור | שכבת ה-AI של Priority | Boteam";
const description =
  "תמחור פשוט וברור: ₪120 לחודש לכל בוט פעיל. דמי הקמה חד פעמיים. בוט ראשון ללא עלות ל-3 חודשים. מערכת מלאה מהיום הראשון.";

export const metadata: Metadata = {
  title: "תמחור – שכבת ה-AI של Priority",
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
