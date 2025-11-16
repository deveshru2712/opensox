"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NewsletterSkeleton from "@/components/newsletter/NewsletterSkeleton";
import { useSubscription } from "@/hooks/useSubscription";

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoading, isPaidUser } = useSubscription();

  useEffect(() => {
    if (!isLoading && !isPaidUser) {
      router.replace("/pricing");
    }
  }, [isLoading, isPaidUser, router]);

  if (isLoading) {
    return <NewsletterSkeleton />;
  }

  if (!isPaidUser) {
    return null;
  }

  return <>{children}</>;
}
