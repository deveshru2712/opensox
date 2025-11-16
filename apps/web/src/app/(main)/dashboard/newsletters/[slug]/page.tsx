import { notFound } from "next/navigation";
import {
  getAllNewsletterSlugs,
  getNewsletterBySlug,
} from "@/utils/newsletter/markdown";
import { ClockIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return getAllNewsletterSlugs().map((slug) => ({ slug }));
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/style="[^"]*width:\s*\d+px[^"]*"/gi, "")
    .replace(/style="[^"]*min-width:\s*\d+px[^"]*"/gi, "")
    .replace(/width="\d+"/gi, "")
    .replace(/min-width="\d+"/gi, "");
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let newsletter;
  try {
    newsletter = await getNewsletterBySlug(slug);
  } catch {
    return notFound();
  }

  const sanitizedHtml = sanitizeHtml(newsletter.html);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link
          href="/dashboard/newsletters"
          className="inline-flex items-center gap-0.5 text-sm mb-6 hover:text-ox-purple transition-all duration-300 group"
        >
          <ChevronLeft
            size={16}
            className="transition-transform duration-300 ease-out group-hover:-translate-x-1/2"
          />
          <span className="transition-colors duration-300">
            Back to newsletters
          </span>
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {newsletter.metadata.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm pb-6 border-b border-border-primary">
              {newsletter.metadata.date && (
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5 flex-shrink-0" />
                  <time dateTime={newsletter.metadata.date}>
                    {new Date(newsletter.metadata.date).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </time>
                </div>
              )}

              {newsletter.metadata.readTime && (
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 flex-shrink-0" />
                  <span>{newsletter.metadata.readTime}</span>
                </div>
              )}
            </div>
          </header>

          <section className="mb-12">
            <div
              className="prose prose-base sm:prose-lg lg:prose-xl max-w-none prose-invert
                         prose-img:max-w-full prose-img:h-auto
                         prose-table:overflow-x-auto prose-table:block
                         prose-pre:max-w-full prose-pre:overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </section>

          <footer className="border-t border-border-primary py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-center sm:text-left text-muted-foreground">
                Hope you enjoyed reading it.
              </p>

              <span className="text-xs text-muted-foreground/70">
                © {new Date().getFullYear()} OpenSox
              </span>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
