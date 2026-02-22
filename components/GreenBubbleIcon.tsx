/** אייקון בועה ירוקה ליד כותרות סקשן (22px, margin 12px) */
export default function GreenBubbleIcon() {
  return (
    <span className="shrink-0 w-[22px] h-[22px] me-3 inline-block text-[var(--accent-green)]" aria-hidden>
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full" stroke="currentColor" strokeWidth="0.5">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v12c0 1.1.9 2 2 2h2l2 3 2-3h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      </svg>
    </span>
  );
}
