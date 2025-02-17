'use client'

import { notFound, redirect, usePathname } from 'next/navigation'
import paths from "@/paths";

// redirect back to the topic page
export default function TopicPostsPage() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const slug = segments[segments.length - 2];

  if (slug) {
    redirect(paths.topicShow(slug));
  }

  return notFound();
}