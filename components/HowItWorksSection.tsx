"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Trigger",
    label: "טריגר",
    description: "אירוע במערכת Priority (הזמנה, תשלום, אישור) מפעיל את הבוט.",
  },
  {
    title: "Conversation",
    label: "שיחה",
    description: "הבוט פותח אוטומטית שיחת WhatsApp או אימייל ומנתח שפה טבעית. שואל הבהרות במקרה של חוסר מידע.",
  },
  {
    title: "Update",
    label: "עדכון",
    description: "המידע מתורגם לעדכון שדות ושליחה חזרה ל-Priority.",
  },
] as const;

export default function HowItWorksSection() {
  return (
    <section className="section bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-6 text-right">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          שליטה מלאה בתהליכים – בלי לרדוף אחרי אנשים
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mb-16">
          הבוט מתחבר ל-Priority ומנהל עבורכם את התהליך מול הלקוח: הוא יוזם שיחה, משלים מידע חסר, מוודא אישורים ומעדכן את השדות הרלוונטית בפריוריטי באופן אוטומטי.
        </p>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-gray-800/60 border border-gray-700 p-6 text-right"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--primary-light)]/20 flex items-center justify-center text-[var(--primary-light)] font-bold text-lg mb-4">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.label}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
