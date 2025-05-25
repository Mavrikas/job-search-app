import Image from 'next/image';
import { JobsList } from '../components/JobsList/JobsList';
import { Suspense } from 'react';
import { Search } from '../components/Search/Search';
import { ActionBar } from '../components/ActionBar/ActionBar';
import { URL } from '@/store/constants';
import { JobFilters } from '@/store/types';

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; page: number }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
    location?: string;
    category?: string;
  }>;
}) {
  const { lang } = await params;
  const searchParameters = await searchParams;
  const query = searchParameters?.query || '';
  const location = searchParameters?.location || '';
  const category = searchParameters?.category || '';
  const page = Number(searchParameters?.page) || 1;
  const res = await fetch(`${URL}jobs/filters`);
  const filters: JobFilters = await res.json();

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ActionBar filters={filters} lang={lang} />
      <main>
        <Search />
        <Suspense key={query + page} fallback={<p>Loading jobs...</p>}>
          <JobsList lang={lang} page={page} query={query} location={location} category={category} />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src={'../globe.svg'} alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
