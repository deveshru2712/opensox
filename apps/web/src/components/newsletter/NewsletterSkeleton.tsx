export default function NewsletterSkeleton() {
  return (
    <main className="min-h-screen overflow-x-hidden animate-pulse text-purple-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back link skeleton */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-4 h-4 rounded bg-opacity-60 bg-[#1a1a1a]" />
          <div className="w-32 h-4 rounded bg-opacity-60 bg-[#1a1a1a]" />
        </div>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            {/* Title skeleton */}
            <div className="space-y-3 mb-6">
              <div className="h-6 sm:h-8 lg:h-10 w-3/4 bg-[#1a1a1a] rounded bg-opacity-60" />
              <div className="h-6 sm:h-8 lg:h-10 w-1/2 bg-[#1a1a1a] rounded bg-opacity-60" />
            </div>

            {/* Meta info skeleton */}
            <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border-primary">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#1a1a1a] rounded bg-opacity-60" />
                <div className="w-24 h-4 bg-[#1a1a1a] rounded bg-opacity-60" />
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#1a1a1a] rounded bg-opacity-60" />
                <div className="w-16 h-4 bg-[#1a1a1a] rounded bg-opacity-60" />
              </div>
            </div>
          </header>

          {/* Body skeleton */}
          <section className="mb-12 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-4 bg-[#1a1a1a] rounded bg-opacity-60"
              />
            ))}
            <div className="w-2/3 h-4 bg-[#1a1a1a] rounded bg-opacity-60" />
          </section>

          <footer className="border-t border-border-primary py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-40 h-4 bg-[#1a1a1a] rounded bg-opacity-60" />
              <div className="w-24 h-3 bg-[#1a1a1a] rounded bg-opacity-60" />
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
