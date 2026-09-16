import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sõnapilt — õpi eesti sõnu',
  description: 'Lihtne pildipõhine eesti keele sõnavaraharjutus.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <body>{children}</body>
    </html>
  );
}
