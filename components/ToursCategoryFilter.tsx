"use client";

import { useRouter, useSearchParams } from "next/navigation";

export type CategoryOption = {
  value: string;
  label: string;
};

type Props = {
  options: CategoryOption[];
  currentValue: string | null;
};

export function ToursCategoryFilter({ options, currentValue }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const next = new URLSearchParams(searchParams?.toString() ?? "");
    if (value) {
      next.set("category", value);
    } else {
      next.delete("category");
    }
    const query = next.toString();
    router.push(query ? `/tours-excursions?${query}` : "/tours-excursions");
  }

  return (
    <div className="relative inline-block min-w-[200px] sm:min-w-[220px]">
      <label htmlFor="tours-category-filter" className="sr-only">
        Category
      </label>
      <select
        id="tours-category-filter"
        value={currentValue ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full appearance-none rounded-xl border-2 border-slate-200 bg-white py-3 pl-4 pr-11 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:border-cur-blue/50 focus:border-cur-blue focus:outline-none focus:ring-2 focus:ring-cur-blue/20 cursor-pointer"
        aria-label="Category"
      >
        <option value="">All categories</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        aria-hidden
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  );
}
