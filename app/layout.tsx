import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const canonicalUrl = "https://boteam.org";
const youtubeEmbedUrl = "https://www.youtube.com/embed/ajluMwsHUY0";
const youtubeWatchUrl = "https://youtu.be/ajluMwsHUY0";
const youtubeThumbnailUrl = "https://img.youtube.com/vi/ajluMwsHUY0/maxresdefault.jpg";

const siteTitle = "מחולל הבוטים לפריוריטי | Boteam";
const siteDescription =
  "מחולל הבוטים לפריוריטי מחבר את פריוריטי ERP לוואטסאפ ואימייל: אוטומציה שמקדמת תהליכים, סוגרת משימות ומעדכנת שדות בזמן אמת. פתרון enterprise לארגונים.";

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: {
    default: siteTitle,
    template: "%s | Boteam",
  },
  description: siteDescription,
  keywords: [
    "פריוריטי",
    "ERP",
    "וואטסאפ",
    "אוטומציה",
    "מחולל בוטים",
    "Boteam",
    "אינטגרציה",
    "מערכות ניהול",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  icons: {
    icon: "/logo-boteam.png",
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: "/og-boteam.jpg", width: 1200, height: 630, alt: siteTitle }],
    videos: [
      {
        url: youtubeEmbedUrl,
        type: "text/html",
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-boteam.jpg"],
  },
};

const videoStructuredData = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "מחולל הבוטים לפריוריטי – אוטומציה בוואטסאפ שמחזירה נתונים ל-ERP",
  description:
    "דמו מוצר: איך מחולל הבוטים של Boteam מחבר את פריוריטי ERP לוואטסאפ, מאפשר למערכת ליזום שיחות, לאסוף מידע ולעדכן שדות אוטומטית. פתרון enterprise לארגונים.",
  thumbnailUrl: youtubeThumbnailUrl,
  uploadDate: "2025-02-18T00:00:00.000Z",
  duration: "PT1M24S",
  contentUrl: youtubeWatchUrl,
  embedUrl: youtubeEmbedUrl,
  publisher: {
    "@type": "Organization",
    name: "Boteam",
    url: canonicalUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${inter.className} antialiased`}
        style={{ background: "var(--background-soft)", color: "var(--text-primary)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoStructuredData),
          }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-6232ZJTFVF`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6232ZJTFVF');
          `}
        </Script>

        {children}
        <Footer />
      </body>
    </html>
  );
}
