import { URL } from '@/store/constants';
import { JobsResponse } from '@/store/types';
import { Chip } from 'primereact/chip';
import styles from './styles.module.css';
import { formatDate } from '@/store/uitls';
import { ApplyButton } from '@/app/components/ApplyButton/ApplyButton';
import Link from 'next/link';
import { getDictionary } from '../dictionaries';

type JobDetailsProps = {
  params: Promise<{ slug: string; lang: string }>;
};

export default async function JobDetails({ params }: JobDetailsProps) {
  const { slug, lang } = await params;
  const res = await fetch(`${URL}jobs?lang=${lang}`);
  const jobs: JobsResponse = await res.json();
  const selectedJob = jobs.results.find((job) => job.slug === slug);
  const dic = await getDictionary(lang as 'en' | 'el');
  let body;
  if (!selectedJob) {
    body = (
      <>
        <h1 className="text-2xl font-bold">{dic.somethingWrong}</h1>
        <p className="text-lg mt-3 max-w-[600px] mb-4">{dic.jobNotFound}</p>
        <Link
          className="px-6 py-2 bg-[#7254f3] text-white rounded hover:bg-[#6647f1] transition-colors w-[150px]"
          href={`/${lang}`}
        >
          {dic.returnHome}
        </Link>
      </>
    );
  } else {
    const { id, title, company, description, location, category, tags, postedAt } = selectedJob;
    body = (
      <>
        <h1 className="text-2xl font-bold">{title}</h1>
        <h3 className="text-lg font-medium">{company}</h3>
        <div className="flex flex-row justify-start items-center gap-2 mt-2">
          <Chip
            label={location}
            icon={'pi pi-map-marker'}
            className={styles['p-chip-text'] + ' size-fit'}
          />
          <Chip
            label={formatDate(postedAt)}
            icon={'pi pi-calendar'}
            className={styles['p-chip-text'] + ' size-fit'}
          />
        </div>
        <Chip
          label={category}
          icon={'pi pi-tag'}
          className={styles['p-chip-text'] + ' size-fit mt-5'}
        />
        <p className="text-lg mt-3 max-w-[600px]">{description}</p>
        <div className="flex flex-row justify-start items-center gap-2 mt-10">
          {tags.map((tag: string) => (
            <Chip
              key={id + tag}
              label={tag}
              icon={'pi pi-hashtag'}
              className={styles['p-chip-text'] + ' size-fit'}
            />
          ))}
        </div>
        <div className="flex flex-row items-center justify-end">
          <ApplyButton />
        </div>
      </>
    );
  }
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <div className="border-solid border-3 rounded-lg p-5 bg-[#fafafa] max-w-[800px] min-w-[400px] m-1">
          {body}
        </div>
      </main>
    </div>
  );
}
