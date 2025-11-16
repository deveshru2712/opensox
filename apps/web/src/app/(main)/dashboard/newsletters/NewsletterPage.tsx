"use client";

import { Search } from "lucide-react";
import NewsletterItem from "@/components/newsletter/NewsletterItem";
import CustomDropdown from "@/components/newsletter/Dropdown";
import { useNewsletterFilters } from "@/hooks/useNewsletterFilters";
import { Newsletter } from "@/utils/newsletter/getAllNewsLetter";



export default function NewsletterPage({
  initialData,
}: {
  initialData: Newsletter[];
}) {
  const {
    search,
    setSearch,
    sortOrder,
    setSortOrder,
    selectedMonth,
    setSelectedMonth,
    monthOptions,
    filteredAndSorted,
    clearFilters,
    hasActiveFilters,
    resultCount,
  } = useNewsletterFilters(initialData);

  return (
    <div className="w-full py-6 px-4 sm:px-8">
      <div className="w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Newsletter
        </h1>
        <p className="mt-1 text-sm sm:text-base text-gray-300">
          Stay updated with our latest insights and stories
        </p>
      </div>

      <div className="mt-8 w-full flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative w-full flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search newsletter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full bg-white/5 border border-white/10 rounded-lg
              px-9 py-2 text-sm text-gray-200 placeholder-gray-400
              focus:outline-none focus:border-purple-400
              transition-all duration-200
            "
          />
        </div>

        <div className="flex flex-row w-full sm:w-auto gap-3">
          <div className="w-full sm:w-40">
            <CustomDropdown
              value={selectedMonth}
              onChange={setSelectedMonth}
              options={monthOptions}
            />
          </div>
          <div className="w-full sm:w-32">
            <CustomDropdown
              value={sortOrder}
              onChange={setSortOrder}
              options={[
                { label: "Newest First", value: "newest" },
                { label: "Oldest First", value: "oldest" },
              ]}
            />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="text-sm text-gray-400 mt-2">
          {resultCount} result{resultCount !== 1 ? "s" : ""} found
        </div>
      )}

      <div className="mt-12 flex flex-col gap-5">
        {filteredAndSorted.length > 0 ? (
          filteredAndSorted.map((item) => (
            <NewsletterItem
              key={item.id}
              title={item.title}
              summary={item.summary}
              time={item.time}
              keywords={item.keywords}
              readTime={item.readTime}
              slug={item.slug}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No newsletters found.</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 text-purple-400 hover:text-purple-300 text-sm underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
