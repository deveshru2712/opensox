import { Clock2Icon } from "lucide-react";
import { redirect } from "next/navigation";

interface NewsletterItemProps {
  title: string;
  time: string;
  readTime?: string;
  summary?: string;
  keywords?: string[];
  slug: string;
}

export default function NewsletterItem({
  time,
  title,
  summary,
  keywords,
  readTime,
  slug,
}: NewsletterItemProps) {
  return (
    <div
      className="
        w-full cursor-pointer group
        border border-white/10
        rounded-lg
        p-4
        hover:border-purple-400/40
        transition-all duration-200
      "
      onClick={() => redirect(`/dashboard/newsletters/${slug}`)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
          <span className="text-white font-medium text-base sm:text-lg group-hover:text-purple-300 transition-colors">
            {title}
          </span>

          <div className="flex flex-col text-xs text-gray-400 sm:items-end leading-tight">
            <span>
              {new Date(time).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            {readTime && (
              <span className="mt-2 flex items-center gap-1 text-gray-500">
                <Clock2Icon size={12} className="opacity-70" />
                {readTime}
              </span>
            )}
          </div>
        </div>

        {summary && (
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            {summary}
          </p>
        )}

        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="
                  text-xs px-2 py-0.5 rounded-full
                  bg-white/5 text-gray-300 border border-white/10
                  transition-all duration-200
                  hover:bg-purple-500/20 hover:border-purple-400/50
                  hover:text-purple-200 hover:shadow
                  hover:shadow-purple-500/20
                "
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
