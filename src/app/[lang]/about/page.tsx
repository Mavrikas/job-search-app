import React from 'react';
import { getDictionary } from '../dictionaries';

type JobDetailsProps = {
  params: Promise<{ slug: string; lang: string }>;
};

export default async function JobDetails({ params }: JobDetailsProps) {
  const { lang } = await params;

  const dic = await getDictionary(lang as 'en' | 'el');

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="border-solid border-3 rounded-lg p-5 bg-[#fafafa] max-w-[800px] min-w-[400px] m-1">
          <h1 className="text-2xl font-bold">{dic.aboutTitle}</h1>
          <p className="text-lg mt-3 max-w-[600px] mb-4">{dic.aboutDescription}</p>
        </div>
      </main>
    </div>
  );
}
