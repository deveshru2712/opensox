import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const newsletterDir = path.join(process.cwd(), "content/newsletters");

export function getAllNewsletterSlugs(): string[] {
  return fs
    .readdirSync(newsletterDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getNewsletterBySlug(slug: string): Promise<{
  metadata: Record<string, any>;
  html: string;
}> {
  const fullPath = path.join(newsletterDir, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(file);

  const processed = await remark().use(gfm).use(html).process(content);

  return {
    metadata: data,
    html: processed.toString(),
  };
}
