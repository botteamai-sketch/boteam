import { formatPrice } from "@/lib/pricing";

type PromoPriceSize = "sm" | "md" | "lg";

const sizeClasses: Record<PromoPriceSize, { current: string; original: string }> = {
  sm: { current: "text-base font-bold", original: "text-sm" },
  md: { current: "text-lg font-bold", original: "text-base" },
  lg: { current: "text-2xl md:text-3xl font-bold", original: "text-lg md:text-xl" },
};

interface PromoPriceProps {
  amount: number;
  original?: number;
  size?: PromoPriceSize;
  className?: string;
  currentClassName?: string;
}

export default function PromoPrice({
  amount,
  original,
  size = "md",
  className = "",
  currentClassName = "text-[var(--primary-dark)]",
}: PromoPriceProps) {
  const showStrike = original !== undefined && original > amount;
  const sizes = sizeClasses[size];

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span className={`${sizes.current} ${currentClassName}`}>
        {formatPrice(amount)}
      </span>
      {showStrike && (
        <span
          className={`${sizes.original} text-[var(--text-secondary)] line-through opacity-70`}
          aria-label={`מחיר רגיל: ${formatPrice(original)}`}
        >
          {formatPrice(original)}
        </span>
      )}
    </span>
  );
}
