import React from 'react';
import { render } from '@testing-library/react';
import JobDetails from './page';
import '@testing-library/jest-dom';

// Mocks
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: any) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});
jest.mock('primereact/chip', () => ({
  Chip: ({ label }: any) => <span>{label}</span>,
}));
jest.mock('@/app/components/ApplyButton/ApplyButton', () => ({
  ApplyButton: () => <button>Apply</button>,
}));
jest.mock('./styles.module.css', () => ({}));
jest.mock('@/store/uitls', () => ({
  formatDate: (date: string) => `formatted-${date}`,
}));
const mockDictionary = {
  somethingWrong: 'Something went wrong',
  jobNotFound: 'Job not found',
  returnHome: 'Return Home',
};
jest.mock('@/hooks/useDictionary', () => ({
  useDictionary: () => mockDictionary,
}));

const mockJob = {
  id: '1',
  slug: 'test-job',
  title: 'Test Job Title',
  company: 'Test Company',
  description: 'Test job description',
  location: 'Test Location',
  category: 'Test Category',
  tags: ['tag1', 'tag2'],
  postedAt: '2024-06-01',
};

const mockJobsResponse = {
  results: [mockJob],
};

global.fetch = jest.fn();

describe('JobDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders job details when job is found', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockJobsResponse,
    });
    const params = Promise.resolve({ slug: 'test-job', lang: 'en' });
    const { asFragment } = render(await JobDetails({ params }));
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders not found message when job is not found', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ results: [] }),
    });
    const params = Promise.resolve({ slug: 'not-exist', lang: 'en' });
    const { asFragment } = render(await JobDetails({ params }));
    expect(asFragment()).toMatchSnapshot();
  });
});
