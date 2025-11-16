"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import NewsletterItem from "@/components/newsletter/NewsletterItem";
import CustomDropdown from "@/components/newsletter/Dropdown";

export default function NewsletterPage({
  initialData,
}: {
  initialData: {
    id: string;
    title: string;
    summary: string;
    keywords: string[];
    time: string;
    readTime: string;
  }[];
}) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    initialData.forEach((item) => {
      const date = new Date(item.time);
      const monthYear = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
      months.add(monthYear);
    });
    return Array.from(months).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
  }, [initialData]);

  const monthOptions = [
    { label: "All Months", value: "all" },
    ...availableMonths.map((month) => ({
      label: month,
      value: month,
    })),
  ];

  const filtered = initialData.filter((item) => {
    const text =
      `${item.title} ${item.summary} ${item.keywords.join(" ")}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const filteredByMonth = filtered.filter((item) => {
    if (selectedMonth === "all") return true;

    const itemDate = new Date(item.time);
    const itemMonthYear = itemDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    return itemMonthYear === selectedMonth;
  });

  const sorted = [...filteredByMonth].sort((a, b) => {
    const dateA = new Date(a.time).getTime();
    const dateB = new Date(b.time).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="w-full py-6 px-4 sm:px-8">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Newsletter
          </h1>
        </div>

        <p className="mt-1 text-sm sm:text-base text-gray-300">
          Stay updated with our latest insights and stories
        </p>
      </div>

      <div className="mt-8 w-full flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3">
        {/* Search Input */}
        <div className="w-full flex-1 relative">
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

        <div className="flex w-full sm:w-auto gap-3">
          <div className="w-full sm:w-36">
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

      {(search || selectedMonth !== "all") && (
        <div className="text-sm text-gray-400 mt-2">
          {sorted.length} result{sorted.length !== 1 ? "s" : ""} found
        </div>
      )}

      <div className="mt-12 flex flex-col gap-5">
        {sorted.length > 0 ? (
          sorted.map((item) => (
            <NewsletterItem
              key={item.id}
              title={item.title}
              summary={item.summary}
              time={item.time}
              keywords={item.keywords}
              readTime={item.readTime}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No newsletters found.</p>
            {(search || selectedMonth !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedMonth("all");
                }}
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
