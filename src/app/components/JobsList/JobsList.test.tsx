import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { JobsList } from './JobsList';
import { getDictionary as mockGetDictionary } from '@/app/[lang]/dictionaries';
import { JobsResponse } from '@/store/types';

// Mock dependencies
jest.mock('../Job/Job', () => ({
  Job: ({ job }: any) => <div data-testid="job">{job.title}</div>,
}));
jest.mock('../Pagination/Pagination', () => ({
  Pagination: ({ totalRecords, pageSize }: any) => (
    <div data-testid="pagination">{`Total: ${totalRecords}, PageSize: ${pageSize}`}</div>
  ),
}));
jest.mock('@/app/[lang]/dictionaries', () => ({
  getDictionary: jest.fn(),
}));

const mockJobsResponse: JobsResponse = {
  results: [
    {
      id: 1,
      title: 'Frontend Developer',
      slug: 'frontend-developer',
      company: 'Company A',
      location: 'Athens',
      category: 'IT',
      tags: [],
      description: 'Frontend job description',
      postedAt: '2024-06-01',
    },
    {
      id: 2,
      title: 'Backend Developer',
      slug: 'backend-developer',
      company: 'Company B',
      location: 'Thessaloniki',
      category: 'IT',
      tags: [],
      description: 'Backend job description',
      postedAt: '2024-06-02',
    },
  ],
  total: 2,
  page: 1,
  pageSize: 10,
};

const mockNoJobsResponse = {
  results: [],
  total: 0,
};

global.fetch = jest.fn();

describe('JobsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mockGetDictionary as jest.Mock).mockResolvedValue({ noJobs: 'No jobs found' });
  });

  it('renders jobs when jobs are returned', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockJobsResponse,
    });

    render(
      await JobsList({ lang: 'en', page: 1, query: '', location: '', category: '', pageSize: 10 })
    );

    expect(await screen.findAllByTestId('job')).toHaveLength(2);
    expect(await screen.findAllByTestId('pagination')).toHaveLength(1);
  });

  it('renders no jobs message when no jobs are returned', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockNoJobsResponse,
    });

    // await render(<JobsList lang="en" page={1} query="" location="" category="" pageSize={10} />);
    render(
      await JobsList({ lang: 'en', page: 1, query: '', location: '', category: '', pageSize: 10 })
    );
    expect(await screen.findByText('No jobs found')).toBeDefined();
    expect(screen.queryByTestId('job')).toBe(null);
    expect(screen.queryByTestId('pagination')).toBe(null);
  });

  it('calls fetch with correct URL parameters', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockJobsResponse,
    });

    await render(
      <JobsList lang="en" page={2} query="react" location="Athens" category="IT" pageSize={5} />
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          'jobs?lang=en&page=1&q=react&location=Athens&category=IT&pageSize=5'
        )
      );
    });
  });
});
