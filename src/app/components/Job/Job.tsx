import React from 'react';
import { JobType } from '@/store/types';
import { formatDate } from '@/store/uitls';
import { Chip } from 'primereact/chip';
import styles from './styles.module.css';
import Link from 'next/link';

type JobProps = {
  job: JobType;
  lang?: string;
};

export function Job({ job, lang }: JobProps) {
  return (
    <Link
      href={`/${lang}/job/${job.slug}`}
      className="w-full sm:w-[350px] md:w-[400px] lg:w-[600px] xl:w-[800px] flex flex-col p-5 bg-[#fafafa] border-solid border-3 rounded-lg m-1 cursor-pointer hover:shadow-md hover:shadow-black/10 border-[3px] hover:border-[#927eec] transition-colors duration-200 box-border"
      aria-label="Job listing"
    >
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <h4> {job.company}</h4>
      <p className="text-gray-800">{job.description}</p>
      <div className="flex flex-row justify-between flex-wrap">
        <div className="flex flex-row justify-start items-center gap-2 flex-wrap mb-1 mt-2">
          {job.tags.map((tag) => (
            <Chip
              key={job.id + tag}
              label={tag}
              icon={'pi pi-hashtag'}
              className={styles['p-chip-text'] + ' size-fit'}
            />
          ))}
        </div>
        <div className="flex flex-row justify-start items-center gap-2 flex-wrap">
          <Chip
            label={job.location}
            icon={'pi pi-map-marker'}
            className={styles['p-chip-text'] + ' size-fit'}
          />
          <Chip
            label={formatDate(job.postedAt)}
            icon={'pi pi-calendar'}
            className={styles['p-chip-text'] + ' size-fit'}
          />
        </div>
      </div>
    </Link>
  );
}
