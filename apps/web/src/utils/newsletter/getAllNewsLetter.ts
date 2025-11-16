import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Newsletter = {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
  time: string;
  readTime: string;
  slug: string;
};


const newsletterDir = path.join(process.cwd(), "content/newsletters");

export function getAllNewsLetter(): Newsletter[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(newsletterDir)) {
      return [];
    }

    const files = fs.readdirSync(newsletterDir);

    return files
      .filter((file) => {
        // Skip files starting with "example"
        if (file.startsWith("example")) return false;
        // Only include .md files
        return file.endsWith(".md");
      })
      .map((filename) => {
        try {
          const filePath = path.join(newsletterDir, filename);
          const raw = fs.readFileSync(filePath, "utf8");
          const { data } = matter(raw);

          const slug = filename.replace(/\.md$/, "");

          const keywords = Array.isArray(data.keywords)
            ? data.keywords
            : typeof data.keywords === "string"
              ? data.keywords.split(",").map((k: string) => k.trim())
              : [];

          return {
            id: data.id ?? slug,
            title: data.title ?? "Untitled Newsletter",
            summary: data.summary ?? "",
            keywords,
            time: data.time ?? data.date ?? new Date().toISOString(),
            readTime: data.readTime ?? "1 min read",
            slug,
          } satisfies Newsletter;
        } catch (fileError) {
          // Silently skip failed files
          return null;
        }
      })
      .filter((newsletter): newsletter is Newsletter => newsletter !== null);
  } catch (error) {
    // Silently fail and return empty array
    return [];
  }
}