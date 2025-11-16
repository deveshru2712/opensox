import { useState, useMemo } from "react";
import { Newsletter } from "@/utils/newsletter/getAllNewsLetter";

type SortOrder = "newest" | "oldest";

export function useNewsletterFilters(initialData: Newsletter[]) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Generate month options from the data
  const monthOptions = useMemo(() => {
    const months = new Set<string>();
    initialData.forEach((item) => {
      const date = new Date(item.time);
      const monthYear = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      months.add(monthYear);
    });

    return [
      { label: "All Months", value: "all" },
      ...Array.from(months)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .map((month) => ({ label: month, value: month })),
    ];
  }, [initialData]);

  // Filter and sort newsletters
  const filteredAndSorted = useMemo(() => {
    // Filter by search
    const filtered = initialData.filter((item) => {
      const searchLower = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchLower) ||
        item.summary.toLowerCase().includes(searchLower) ||
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchLower)
        )
      );
    });

    // Filter by month
    const filteredByMonth =
      selectedMonth === "all"
        ? filtered
        : filtered.filter((item) => {
            const date = new Date(item.time);
            const monthYear = date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            });
            return monthYear === selectedMonth;
          });

    return [...filteredByMonth].sort((a, b) => {
      const dateA = new Date(a.time).getTime();
      const dateB = new Date(b.time).getTime();

      // Handle invalid dates
      if (isNaN(dateA) || isNaN(dateB)) {
        return 0;
      }

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [initialData, search, selectedMonth, sortOrder]);

  const clearFilters = () => {
    setSearch("");
    setSelectedMonth("all");
    setSortOrder("newest");
  };

  const hasActiveFilters = search !== "" || selectedMonth !== "all";
  const resultCount = filteredAndSorted.length;

  return {
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
  };
}
