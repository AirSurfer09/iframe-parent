import { baseURL } from '@/app/resources';
import { buildTimeConfig, isClientMode } from '@/app/resources/runtimeConfig';

export async function generateMetadata() {
  if (isClientMode) {
    // Client deliverable: neutral title, no portfolio/OG branding, not indexable.
    return {
      title: buildTimeConfig.title,
      description: 'Convai pixel streaming embed',
      robots: { index: false, follow: false },
      icons: {
        icon: [{ url: '/favicon.ico', sizes: 'any' }],
        shortcut: '/favicon.ico',
      },
    };
  }

  const title = 'PixelStreaming | Convai';
  const description = 'Convai PixelStreaming bootstrap guide';
  const imageUrl = `/images/convai-logo.png`;

  return {
    title,
    description,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
        { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
      shortcut: '/favicon.ico',
    },
    manifest: '/manifest.json',
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}`,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
