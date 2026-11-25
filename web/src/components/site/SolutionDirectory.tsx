"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { productCategories, products } from "@/lib/products";
import type { ProductCategory } from "@/lib/products";
import ProductCard from "./ProductCard";

type Category = "All" | ProductCategory;

export default function SolutionDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const searchable = [product.name, product.summary, product.description, product.category, product.audience]
        .join(" ").toLowerCase();
      return categoryMatch && searchable.includes(search);
    });
  }, [query, category]);

  const clear = () => { setQuery(""); setCategory("All"); };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-[480px]">
          <label htmlFor="solution-search" className="mb-3 block text-xs font-semibold uppercase tracking-[.16em] text-[#62483c]">Find your solution</label>
          <div className="relative">
            <Search size={19} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#985334]" />
            <input id="solution-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search AI products..."
              className="h-14 w-full rounded-2xl border border-[#ffcea2]/30 bg-gradient-to-br from-[#764b3e]/70 to-[#3f2d2a]/90 pl-12 pr-11 text-sm text-[#62483c] outline-none placeholder:text-[#62483c] transition focus:border-[#ffc58e]/75 focus:ring-2 focus:ring-[#ffb775]/15" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#62483c] transition hover:text-white"><X size={16} /></button>}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#62483c]">
          <SlidersHorizontal size={15} className="text-[#985334]" aria-hidden="true" />
          <span aria-live="polite">Showing {filteredProducts.length} of {products.length} solutions</span>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-2.5" aria-label="Filter AI products">
        {productCategories.map((item) => {
          const active = category === item;
          return <button key={item} type="button" aria-pressed={active} onClick={() => setCategory(item)}
            className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${active
              ? "border-[#ffd5a9]/65 bg-gradient-to-r from-[#ffdbb3]/25 to-[#ff9e64]/20 text-[#62483c] shadow-[0_8px_24px_rgba(108,56,38,.16)]"
              : "border-[#ffd2aa]/25 bg-[#ffcf9f]/[.07] text-[#62483c] hover:border-[#ffcf9a]/60 hover:bg-[#ffd1a4]/[.13] hover:text-white"}`}>{item}</button>;
        })}
      </div>

      {filteredProducts.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <div role="status" className="rounded-3xl border border-[#ffd6ac]/30 bg-gradient-to-br from-[#70483a]/75 to-[#352929]/90 px-8 py-20 text-center">
          <Search size={34} className="mx-auto text-[#985334]" />
          <h2 className="mt-6 text-2xl font-semibold text-[#62483c]">No matching solutions</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#62483c]">Try another keyword or remove the selected category filter.</p>
          <button type="button" onClick={clear} className="mt-7 rounded-xl border border-[#ffd5a3]/40 bg-gradient-to-r from-[#ffd7a1] to-[#f5a36c] px-5 py-3 text-sm font-bold text-[#38231d] transition hover:brightness-105">Clear all filters</button>
        </div>
      )}
    </div>
  );
}
