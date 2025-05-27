import React from 'react';
import { render } from '@testing-library/react';
import Home from './page';

// Mock child components
jest.mock('../components/JobsList/JobsList', () => ({
  JobsList: (props: any) => <div data-testid="jobs-list">{JSON.stringify(props)}</div>,
}));
jest.mock('../components/Search/Search', () => ({
  Search: () => <div data-testid="search" />,
}));
jest.mock('../components/ActionBar/ActionBar', () => ({
  ActionBar: (props: any) => <div data-testid="action-bar">{JSON.stringify(props)}</div>,
}));

// Mock constants and types
jest.mock('@/store/constants', () => ({
  URL: 'http://mocked-url/',
}));
type JobFilters = { categories: string[]; locations: string[] };
jest.mock('@/store/types', () => ({}));

// Mock fetch
global.fetch = jest.fn();

const mockFilters: JobFilters = {
  categories: ['Engineering', 'Design'],
  locations: ['Remote', 'Onsite'],
};

describe('Home', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockFilters),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default parameters', async () => {
    const params = Promise.resolve({ lang: 'en', page: 1 });
    const searchParams = Promise.resolve({});
    const { asFragment } = render(await Home({ params, searchParams }));
    expect(asFragment()).toMatchSnapshot();
  });

  it('passes search parameters to JobsList', async () => {
    const params = Promise.resolve({ lang: 'el', page: 2 });
    const searchParams = Promise.resolve({
      query: 'react',
      location: 'Remote',
      category: 'Engineering',
      page: '3',
      pageSize: '20',
    });
    const { asFragment } = render(await Home({ params, searchParams }));
    expect(asFragment()).toMatchSnapshot();
  });

  it('fetches filters from the correct URL', async () => {
    const params = Promise.resolve({ lang: 'en', page: 1 });
    const searchParams = Promise.resolve({});
    await Home({ params, searchParams });
    expect(fetch).toHaveBeenCalledWith('http://mocked-url/jobs/filters');
  });
});
