"use client";

import React, { useMemo, useState } from "react";

export type FAQItem = {
  category: string;
  question: string;
  answer: string;
};

type Props = {
  faqs: FAQItem[];
};

// Hebrew nikud (vowel points) Unicode range – remove for normalized matching
const NIKUD_REGEX = /[\u0591-\u05BD\u05BF-\u05C7]/g;

/**
 * Normalize text for search: lowercase, trim, remove Hebrew nikud, collapse spaces.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(NIKUD_REGEX, "")
    .replace(/\s+/g, " ");
}

/**
 * Compute search score for one FAQ item.
 * +3 full phrase match, +2 per token exact (word) match, +1 per token partial (includes).
 */
function scoreFaq(
  faq: FAQItem,
  normQuery: string,
  tokens: string[]
): number {
  if (!normQuery) return 0;

  const normQ = normalize(faq.question);
  const normA = normalize(faq.answer);
  const fullPhrase =
    normQ.includes(normQuery) || normA.includes(normQuery) ? 3 : 0;

  const wordsQ = normQ.split(/\s+/);
  const wordsA = normA.split(/\s+/);
  let tokenScore = 0;
  for (const token of tokens) {
    if (!token) continue;
    const exactQ = wordsQ.includes(token);
    const exactA = wordsA.includes(token);
    const partialQ = normQ.includes(token);
    const partialA = normA.includes(token);
    if (exactQ || exactA) tokenScore += 2;
    else if (partialQ || partialA) tokenScore += 1;
  }

  return fullPhrase + tokenScore;
}

/**
 * Split text into segments and wrap matched parts in <mark>.
 * Uses case-insensitive token match; no dangerouslySetInnerHTML.
 */
function highlightText(text: string, query: string): React.ReactNode {
  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (tokens.length === 0) return text;

  const lower = text.toLowerCase();
  const ranges: [number, number][] = [];

  for (const token of tokens) {
    let pos = 0;
    while (true) {
      const i = lower.indexOf(token, pos);
      if (i < 0) break;
      ranges.push([i, i + token.length]);
      pos = i + 1;
    }
  }

  if (ranges.length === 0) return text;

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [ranges[0]];
  for (let i = 1; i < ranges.length; i++) {
    const [a, b] = merged[merged.length - 1];
    const [c, d] = ranges[i];
    if (c <= b) {
      merged[merged.length - 1] = [a, Math.max(b, d)];
    } else {
      merged.push([c, d]);
    }
  }

  const segments: { text: string; highlight: boolean }[] = [];
  let last = 0;
  for (const [start, end] of merged) {
    if (start > last) {
      segments.push({ text: text.slice(last, start), highlight: false });
    }
    segments.push({ text: text.slice(start, end), highlight: true });
    last = end;
  }
  if (last < text.length) {
    segments.push({ text: text.slice(last), highlight: false });
  }

  return (
    <>
      {segments.map((s, i) =>
        s.highlight ? (
          <mark
            key={i}
            className="bg-yellow-200 px-1 rounded-sm text-inherit"
          >
            {s.text}
          </mark>
        ) : (
          s.text
        )
      )}
    </>
  );
}

export default function FAQSearch({ faqs }: Props) {
  const [query, setQuery] = useState("");

  const trimmedQuery = query.trim();
  const normQuery = useMemo(
    () => (trimmedQuery ? normalize(trimmedQuery) : ""),
    [trimmedQuery]
  );
  const tokens = useMemo(
    () => (normQuery ? normQuery.split(/\s+/).filter(Boolean) : []),
    [normQuery]
  );

  // Score each item; keep all in DOM, use score for ordering and visibility
  const scoreByIndex = useMemo(() => {
    return faqs.map((faq, index) =>
      normQuery ? scoreFaq(faq, normQuery, tokens) : 0
    );
  }, [faqs, normQuery, tokens]);

  const matchByIndex = useMemo(
    () => scoreByIndex.map((score) => score > 0),
    [scoreByIndex]
  );

  const matchCount = useMemo(
    () => matchByIndex.filter(Boolean).length,
    [matchByIndex]
  );

  const hasQuery = normQuery.length > 0;
  const noResults = hasQuery && matchCount === 0;

  const byCategory = useMemo(() => {
    const map = new Map<string, { faq: FAQItem; index: number }[]>();
    faqs.forEach((faq, index) => {
      const list = map.get(faq.category) ?? [];
      list.push({ faq, index });
      map.set(faq.category, list);
    });
    return map;
  }, [faqs]);

  const categoryOrder = useMemo(
    () => Array.from(new Set(faqs.map((f) => f.category))),
    [faqs]
  );

  return (
    <div className="space-y-6">
      {/* Search input with clear button */}
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="חפשו שאלה או נושא..."
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pl-10 text-right focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)]/40 focus:border-[var(--primary-light)] transition-shadow"
          aria-label="חיפוש בשאלות נפוצות"
        />
        {hasQuery && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center text-sm"
            aria-label="נקה חיפוש"
          >
            ✕
          </button>
        )}
      </div>

      {/* Result counter and zero-state message */}
      {hasQuery && (
        <div className="text-sm text-gray-500 text-right space-y-1">
          {noResults ? (
            <>
              <p>לא נמצאו תוצאות תואמות</p>
              <p className="text-gray-400">
                נסו מילה כללית יותר כמו: פריוריטי, וואטסאפ, תהליך
              </p>
            </>
          ) : (
            <p>נמצאו {matchCount} תוצאות</p>
          )}
        </div>
      )}

      {/* FAQ list – all items remain in DOM; visibility and order via CSS for SEO */}
      <div className="space-y-0 border-b border-gray-200">
        {categoryOrder.map((cat) => {
          const items = byCategory.get(cat) ?? [];
          const anyMatch = items.some(({ index }) => matchByIndex[index]);
          if (!anyMatch && hasQuery) return null;

          return (
            <div key={cat} className="pt-6 first:pt-0">
              <h2 className="text-lg font-semibold text-[#3FA9F5] mb-4">
                {cat}
              </h2>
              <ul
                className="space-y-0 flex flex-col"
                role="list"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {items.map(({ faq, index }) => {
                  const score = scoreByIndex[index];
                  const show = !hasQuery || score > 0;
                  return (
                    <li
                      key={index}
                      className="border-b border-gray-100 last:border-b-0 transition-opacity duration-200"
                      style={{
                        order: hasQuery ? (show ? -score : 9999) : 0,
                        display: show ? "block" : "none",
                        opacity: show ? 1 : 0,
                      }}
                    >
                      <details className="group">
                        <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-right font-medium text-[var(--text-primary)] hover:text-[#3FA9F5] transition-colors">
                          <span className="flex-1">
                            {hasQuery && query.trim()
                              ? highlightText(faq.question, query)
                              : faq.question}
                          </span>
                          <span className="shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-open:bg-[var(--primary-light)]/10 group-open:text-[var(--primary-light)] transition-colors">
                            <span
                              className="group-open:rotate-180 transition-transform duration-200 inline-block"
                              aria-hidden
                            >
                              ▼
                            </span>
                          </span>
                        </summary>
                        <div className="pb-5 pr-8 text-gray-600 leading-relaxed">
                          {hasQuery && query.trim()
                            ? highlightText(faq.answer, query)
                            : faq.answer}
                        </div>
                      </details>
                    </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
