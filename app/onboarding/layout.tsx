import type { Metadata } from "next";

const canonicalUrl = "https://boteam.org/onboarding";
const title = "תהליך ההטמעה | הדרך לבוט הראשון בפריוריטי | Boteam";
const description =
  "תהליך הטמעה פשוט ומהיר: משלב האפיון ועד שהבוט הראשון עובד. אפס קוד, מקסימום תוצאות. מחולל הבוטים לפריוריטי.";

export const metadata: Metadata = {
  title: "תהליך ההטמעה - הדרך לבוט הראשון",
  description,
  alternates: { canonical: canonicalUrl },
  openGraph: { title, description, url: canonicalUrl, type: "website" },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
