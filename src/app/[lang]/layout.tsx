import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
// import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { Header } from '../components/Header/Header';
import 'primereact/resources/themes/soho-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Job Search App',
  description: 'A simple job search application',
};
// primereact/resources/themes/soho-light/theme.css
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PrimeReactProvider>
          <Header lang={lang} />
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
