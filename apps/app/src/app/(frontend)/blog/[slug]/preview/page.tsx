'use client';

import { useEffect, useState } from 'react';
import { useLivePreview } from '@payloadcms/live-preview-react';

interface Props {
  params: { slug: string };
}

export default function PostPreviewPage({ params }: Props) {
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/posts?where[slug][equals]=${params.slug}&draft=true`, {
      credentials: 'include',
    })
      .then((r) => r.json())
      .then((data) => setInitialData(data.docs?.[0] || null))
      .catch(() => {});
  }, [params.slug]);

  const { data } = useLivePreview({
    initialData,
    serverURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    depth: 2,
  });

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading preview…</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-4 py-2 rounded mb-8">
        🔍 <strong>Preview Mode</strong> — Changes update in real-time. Requires authentication.
      </div>
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      {data.excerpt && (
        <p className="text-lg text-muted-foreground mb-6">{data.excerpt}</p>
      )}
      <div className="text-sm text-muted-foreground mb-8">
        {data.publishedDate && new Date(data.publishedDate).toLocaleDateString()}
      </div>
    </div>
  );
}
