import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IPTV Suisse',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
