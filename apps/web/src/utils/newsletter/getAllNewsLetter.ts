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
            ? (data.keywords as string[])
            : typeof data.keywords === "string"
              ? (data.keywords as string).split(",").map((k) => k.trim())
              : [];

          return {
            id: (data.id as string | undefined) ?? slug,
            title: (data.title as string | undefined) ?? "Untitled Newsletter",
            summary: (data.summary as string | undefined) ?? "",
            keywords,
            time:
              (data.time as string | undefined) ??
              (data.date as string | undefined) ??
              new Date().toISOString(),
            readTime: (data.readTime as string | undefined) ?? "1 min read",
            slug,
          } satisfies Newsletter;
        } catch {
          return null;
        }
      })
      .filter((newsletter): newsletter is Newsletter => newsletter !== null);
  } catch {
    return [];
  }
}
