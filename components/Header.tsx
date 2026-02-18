import CalendlyModal from "@/components/CalendlyModal";

export default function Header() {
    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          
          {/* לוגו / שם */}
          <div className="text-lg font-semibold">
            מחולל הבוטים לפריוריטי
          </div>
  
          {/* ניווט */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#how" className="hover:text-black transition">
              איך זה עובד
            </a>
            <a href="#usecases" className="hover:text-black transition">
              שימושים
            </a>
            <a href="#faq" className="hover:text-black transition">
              שאלות נפוצות
            </a>
          </nav>
  
          {/* כפתור CTA */}
          <CalendlyModal />
  
        </div>
      </header>
    );
  }
  