import { JobType } from '@/store/types';
// import { formatDate } from '@/uitls';

type JobProps = {
  job: JobType;
};

export function Job({ job }: JobProps) {
  const tags = job.tags.map((tag) => '#' + tag);
  return (
    <div
      className="flex flex-col p-5 bg-[#fafafa] border border-solid border-3 rounded-lg m-1 cursor-pointer hover:shadow-md hover:shadow-black/10"
      aria-label="Job listing"
      key={job.id}
    >
      <h2 className="text-2xl font-bold">
        {job.title} @ {job.company}
      </h2>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-800">{job.description}</p>
      <div className="flex flex-row justify-between ">
        <span className="text-blue-500">{tags.join(' ')}</span> {job.postedAt}
      </div>
      <div className="flex flex-row items-center justify-end">
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-[150px] ">
          Apply Now
        </button>
      </div>
    </div>
  );
}
