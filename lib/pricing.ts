/** ── מבצע הקמה ──────────────────────────────────────
 *  לכיבוי מיידי: SETUP_PROMO_ENABLED = false
 *  לסיום אוטומטי: PROMO_END_DATE (עד סוף היום, שעון ישראל)
 */
export const SETUP_PROMO_ENABLED = true;

export const SETUP_BASE_REGULAR = 550;
export const WHATSAPP_SETUP_REGULAR = 400;

export const PROMO_END_DATE = "2026-07-10";
export const PROMO_LABEL = "מבצע: ללא עלות התקנה";
export const PROMO_VALIDITY = "בתוקף עד ל 10.7";

const ISRAEL_TZ = "Asia/Jerusalem";

function getIsraelDateString(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: ISRAEL_TZ }).format(date);
}

export function isSetupPromoActive(now = new Date()): boolean {
  if (!SETUP_PROMO_ENABLED) return false;
  return getIsraelDateString(now) <= PROMO_END_DATE;
}

export function getEffectiveSetupBase(): number {
  return isSetupPromoActive() ? 0 : SETUP_BASE_REGULAR;
}

export function getEffectiveWhatsAppSetup(): number {
  return isSetupPromoActive() ? 0 : WHATSAPP_SETUP_REGULAR;
}

export function getSetupCost(withWhatsApp: boolean): number {
  const promo = isSetupPromoActive();
  const base = getEffectiveSetupBase();
  const whatsapp = promo || withWhatsApp ? getEffectiveWhatsAppSetup() : 0;
  if (promo) return 0;
  return base + whatsapp;
}

export function formatPrice(amount: number): string {
  return `₪${amount.toLocaleString("he-IL")}`;
}
