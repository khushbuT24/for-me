import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FORME — Your personal style',
  description: 'Your wardrobe. Your world. Your style. A thoughtfully curated personal styling experience.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return <html lang="en"><body>{children}</body></html>;
}
