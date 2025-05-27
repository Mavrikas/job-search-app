import React from 'react';
import { JobsList } from '../components/JobsList/JobsList';
import { Suspense } from 'react';
import { Search } from '../components/Search/Search';
import { ActionBar } from '../components/ActionBar/ActionBar';
import { URL } from '@/store/constants';
import { JobFilters } from '@/store/types';

type HomeProps = {
  params: Promise<{ lang: string; page: number }>;
  searchParams?: Promise<{
    query?: string;
    page?: string;
    pageSize?: string;
    location?: string;
    category?: string;
  }>;
};

export default async function Home({ params, searchParams }: HomeProps) {
  const { lang } = await params;
  const searchParameters = await searchParams;
  const query = searchParameters?.query || '';
  const location = searchParameters?.location || '';
  const category = searchParameters?.category || '';
  const page = Number(searchParameters?.page) || 1;
  const pageSize = Number(searchParameters?.pageSize) || 10;
  const res = await fetch(`${URL}jobs/filters`);
  const filters: JobFilters = await res.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ActionBar filters={filters} lang={lang} />
      <main className="min-h-screen flex flex-col items-center justify-start w-full max-w-[800px] gap-1">
        <Search />
        <Suspense
          key={query + page}
          fallback={<i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>}
        >
          <JobsList
            lang={lang}
            page={page}
            query={query}
            location={location}
            category={category}
            pageSize={pageSize}
          />
        </Suspense>
      </main>
    </div>
  );
}
