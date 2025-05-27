import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '../globals.css';
import { Header } from '../components/Header/Header';
import 'primereact/resources/themes/soho-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Job Search App',
  description: 'A simple job search application',
};

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
      <body className={`${roboto.variable} antialiased`}>
        <PrimeReactProvider>
          <Header lang={lang} />
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
