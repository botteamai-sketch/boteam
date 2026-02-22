import Link from "next/link";
import Image from "next/image";

const currentYear = new Date().getFullYear();

const linkClass =
  "text-white/80 hover:text-white transition block py-1 text-right";

export default function Footer() {
  return (
    <footer
      className="bg-[var(--primary-dark)] text-white/80 py-20"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex justify-end">
          <Link href="/" className="inline-block opacity-85 hover:opacity-100 transition-opacity" aria-label="Boteam – דף הבית">
            <Image src="/logo-boteam.png" alt="Boteam" width={112} height={28} className="h-7 w-auto object-contain bg-transparent" priority />
          </Link>
        </div>
        <div className="grid gap-12 md:grid-cols-4 text-right">
          {/* Column 1 – המוצר */}
          <div>
            <h3 className="text-white font-semibold mb-4">המוצר</h3>
            <p className="text-white/80 mb-3 text-right">
              מחולל הבוטים לפריוריטי
            </p>
            <nav className="flex flex-col" aria-label="קישורי מוצר">
              <Link href="/demo" className={linkClass}>
                הדגמה
              </Link>
              <Link href="/faq" className={linkClass}>
                שאלות נפוצות
              </Link>
              <a href="/#how" className={linkClass}>
                איך זה עובד
              </a>
            </nav>
          </div>

          {/* Column 2 – שימושים */}
          <div>
            <h3 className="text-white font-semibold mb-4">שימושים</h3>
            <nav className="flex flex-col" aria-label="שימושים">
              <a href="/#usecases" className={linkClass}>
                מכירות
              </a>
              <a href="/#usecases" className={linkClass}>
                תפעול
              </a>
              <a href="/#usecases" className={linkClass}>
                גבייה
              </a>
              <a href="/#usecases" className={linkClass}>
                הנהלה
              </a>
              <a href="/#usecases" className={linkClass}>
                לידים
              </a>
            </nav>
          </div>

          {/* Column 3 – משאבים */}
          <div>
            <h3 className="text-white font-semibold mb-4">משאבים</h3>
            <nav className="flex flex-col" aria-label="משאבים">
              <Link href="/demo" className={linkClass}>
                דמו
              </Link>
              <Link href="/faq" className={linkClass}>
                שאלות נפוצות
              </Link>
              <Link href="/demo" className={linkClass}>
                יצירת קשר
              </Link>
            </nav>
          </div>

          {/* Column 4 – חברה */}
          <div>
            <h3 className="text-white font-semibold mb-4">חברה</h3>
            <nav className="flex flex-col" aria-label="חברה">
              <a href="#" className={linkClass}>
                אודות
              </a>
              <a href="#" className={linkClass}>
                פרטיות
              </a>
              <a href="#" className={linkClass}>
                תנאי שימוש
              </a>
            </nav>
            <p className="mt-4 pt-4 border-t border-white/10 text-white/80 text-sm text-right">
              <a
                href="https://boteam.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                boteam.org
              </a>
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm text-white/80 text-right">
          <span>© {currentYear} Boteam. כל הזכויות שמורות.</span>
          <span>מערכת אוטומציה מתקדמת לפריוריטי ERP</span>
        </div>
      </div>
    </footer>
  );
}
