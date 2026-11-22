
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  productCategories,
  products,
} from "@/lib/products";

import type { ProductCategory } from "@/lib/products";
import ProductCard from "./ProductCard";

type Category = "All" | ProductCategory;

export default function SolutionDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();

    return products.filter((product) => {
      const categoryMatches =
        category === "All" ||
        product.category === category;

      const searchableText = [
        product.name,
        product.summary,
        product.description,
        product.category,
        product.audience,
      ]
        .join(" ")
        .toLowerCase();

      return categoryMatches && searchableText.includes(search);
    });
  }, [query, category]);

  function resetFilters() {
    setQuery("");
    setCategory("All");
  }

  return (
    <div>
      {/* Search and information bar */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-[480px]">
          <label
            htmlFor="solution-search"
            className="mb-3 block text-xs font-medium uppercase tracking-[0.16em] text-white/40"
          >
            Find your solution
          </label>

          <div className="relative">
            <Search
              size={19}
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300/70"
            />

            <input
              id="solution-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search AI products..."
              className="h-14 w-full rounded-2xl border border-white/[0.12] bg-white/[0.045] pl-12 pr-11 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-violet-400/70 focus:bg-white/[0.07]"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/40">
          <SlidersHorizontal
            size={15}
            className="text-violet-300"
            aria-hidden="true"
          />

          <span aria-live="polite">
            Showing {filteredProducts.length} of {products.length} solutions
          </span>
        </div>
      </div>

      {/* Category filters */}
      <div
        className="mb-10 flex flex-wrap gap-2.5"
        aria-label="Filter AI products"
      >
        {productCategories.map((item) => {
          const active = category === item;

          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(item)}
              className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition-all duration-200 ${
                active
                  ? "border-violet-400/60 bg-violet-500/20 text-violet-100 shadow-[0_0_20px_rgba(124,58,237,0.12)]"
                  : "border-white/10 bg-white/[0.035] text-white/50 hover:border-violet-400/30 hover:text-white"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Products */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div
          role="status"
          className="rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-20 text-center"
        >
          <Search
            size={34}
            className="mx-auto text-violet-300/70"
          />

          <h2 className="mt-6 text-2xl font-semibold text-white">
            No matching solutions
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/50">
            Try another keyword or remove the selected category filter.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-7 rounded-xl border border-violet-400/40 bg-violet-400/10 px-5 py-3 text-sm font-medium text-white hover:bg-violet-400/20"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
