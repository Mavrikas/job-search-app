import { JobsResponse, JobType } from '@/store/types';
import { Job } from '../Job/Job';
import { Pagination } from '../Pagination/Pagination';
import { URL } from '@/store/constants';

type JobsListProps = {
  lang: string;
  page: number;
  query: string;
  location: string;
  category: string;
};

export async function JobsList({ lang, page, query, location, category }: JobsListProps) {
  const pageNumber = page && page > 0 ? page - 1 : 0;
  const pageParameter = pageNumber > 0 ? `&page=${pageNumber}` : '';
  const q = query ? `&q=${encodeURIComponent(query)}` : '';
  const locationQuery = location ? `&location=${encodeURIComponent(location)}` : '';
  const categoryQuery = category ? `&category=${encodeURIComponent(category)}` : '';
  const res = await fetch(
    `${URL}jobs?lang=${lang}${pageParameter}${q}${locationQuery}${categoryQuery}`
  );
  const jobs: JobsResponse = await res.json();

  return (
    <>
      {jobs && jobs.results ? (
        jobs.results.map((job: JobType) => {
          return <Job job={job} key={job.id} />;
        })
      ) : (
        <p>No jobs found.</p>
      )}
      <Pagination totalRecords={jobs.total} pageSize={jobs.pageSize} />
    </>
  );
}
