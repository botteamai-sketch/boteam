import type { Metadata } from "next";
import CalendlyModal from "@/components/CalendlyModal";
import VideoSectionWithTracking from "@/components/VideoSectionWithTracking";

const canonicalUrl = "https://boteam.org/demo";
const title = "דמו מחולל בוטים לפריוריטי | הדגמה אוטומציה פריוריטי וואטסאפ | Boteam";
const description =
  "קבעו הדגמה חיה של מחולל הבוטים לפריוריטי. צפו באוטומציה בוואטסאפ שמחזירה נתונים ל-ERP, שאלות ותשובות טכניות והתאמה לתהליך בארגון שלכם.";

export const metadata: Metadata = {
  title: "דמו מחולל בוטים לפריוריטי",
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

export default function DemoPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#243B53]">
      <div className="mx-auto max-w-4xl px-6 py-20 text-right">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          דמו מחולל הבוטים לפריוריטי
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          צפו בהדגמה וקבעו שיחת היכרות. נציג את האוטומציה בין פריוריטי לוואטסאפ
          והתאמה לתהליכים בארגון שלכם.
        </p>

        <div className="mb-12">
          <VideoSectionWithTracking />
        </div>

        <div className="flex flex-col items-center gap-8 mb-14">
          <CalendlyModal />
        </div>

        <ul className="space-y-4 text-lg text-gray-700 border-t border-gray-200 pt-10">
          <li className="flex items-center gap-3">
            <span className="text-[#4CAF50]">✔</span>
            הדגמה חיה של תהליך אמיתי
          </li>
          <li className="flex items-center gap-3">
            <span className="text-[#4CAF50]">✔</span>
            שאלות ותשובות טכניות
          </li>
          <li className="flex items-center gap-3">
            <span className="text-[#4CAF50]">✔</span>
            התאמה לתהליך שלכם
          </li>
        </ul>
      </div>
    </div>
  );
}
