import { Analytics } from '@vercel/analytics/react';
import './globals.css'

export const metadata = {
  title: 'pepy.tech',
  description: 'View download data',
}

export const runtime = 'edge';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Analytics />
    </html>
  )
}
