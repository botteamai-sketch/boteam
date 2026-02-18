import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "מחולל הבוטים לפריוריטי | Boteam",
  description:
    "מחולל הבוטים לפריוריטי מאפשר ל-ERP ליזום שיחות בוואטסאפ ובאימייל, לאסוף מידע ולעדכן שדות אוטומטית במערכת.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${heebo.className} bg-[#F8FAFC] text-[#243B53] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
