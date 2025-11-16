import { useState, useMemo } from "react";

interface NewsletterItem {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  time: string;
  readTime: string;
  slug: string;
}

export function useNewsletterFilters(initialData: NewsletterItem[]) {
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

  const monthOptions = useMemo(
    () => [
      { label: "All Months", value: "all" },
      ...availableMonths.map((month) => ({
        label: month,
        value: month,
      })),
    ],
    [availableMonths]
  );

  const filteredAndSorted = useMemo(() => {
    // Filter by search
    const filtered = initialData.filter((item) => {
      const text =
        `${item.title} ${item.summary} ${item.keywords.join(" ")}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });

    // Filter by month
    const filteredByMonth = filtered.filter((item) => {
      if (selectedMonth === "all") return true;
      const itemDate = new Date(item.time);
      const itemMonthYear = itemDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
      return itemMonthYear === selectedMonth;
    });

    // Sort
    return [...filteredByMonth].sort((a, b) => {
      const dateA = new Date(a.time).getTime();
      const dateB = new Date(b.time).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [initialData, search, selectedMonth, sortOrder]);

  const clearFilters = () => {
    setSearch("");
    setSelectedMonth("all");
  };

  const hasActiveFilters = search !== "" || selectedMonth !== "all";

  return {
    search,
    setSearch,
    sortOrder,
    setSortOrder,
    selectedMonth,
    setSelectedMonth,
    availableMonths,
    monthOptions,
    filteredAndSorted,
    clearFilters,
    hasActiveFilters,
    resultCount: filteredAndSorted.length,
  };
}
