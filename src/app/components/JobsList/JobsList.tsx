import { JobsResponse, JobType } from '@/store/types';
import { Job } from '../Job/Job';
import { Pagination } from '../Pagination/Pagination';
import { URL } from '@/store/constants';
import { getDictionary } from '@/app/[lang]/dictionaries';

type JobsListProps = {
  lang: string;
  page: number;
  pageSize: number;
  query: string;
  location: string;
  category: string;
};

export async function JobsList({ lang, page, query, location, category, pageSize }: JobsListProps) {
  const dic = await getDictionary(lang as 'en' | 'el');
  const pageNumber = page && page > 0 ? page - 1 : 0;
  const pageParameter = pageNumber > 0 ? `&page=${pageNumber}` : '';
  const q = query ? `&q=${encodeURIComponent(query)}` : '';
  const locationQuery = location ? `&location=${encodeURIComponent(location)}` : '';
  const categoryQuery = category ? `&category=${encodeURIComponent(category)}` : '';
  const pageSizeQuery = pageSize ? `&pageSize=${encodeURIComponent(pageSize)}` : '';
  const res = await fetch(
    `${URL}jobs?lang=${lang}${pageParameter}${q}${locationQuery}${categoryQuery}${pageSizeQuery}`
  );
  const jobs: JobsResponse = await res.json();

  return (
    <>
      {jobs && jobs.results.length ? (
        jobs.results.map((job: JobType) => {
          return <Job job={job} key={job.id} lang={lang} />;
        })
      ) : (
        <p>{dic.noJobs}</p>
      )}
      {jobs && jobs.results.length > 0 && (
        <Pagination totalRecords={jobs.total} pageSize={pageSize} />
      )}
    </>
  );
}
