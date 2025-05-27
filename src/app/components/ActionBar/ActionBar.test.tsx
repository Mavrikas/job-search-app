import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ActionBar } from './ActionBar';
import { useRouter, useSearchParams } from 'next/navigation';
const mockUseRouter = jest.mocked(useRouter);
const mockUseSearchParams = jest.mocked(useSearchParams);

// Mocks for next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/jobs'),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  useSearchParams: jest.fn(),
}));

// Mock for useDictionary
jest.mock('@/hooks/useDictionary', () => ({
  useDictionary: () => ({
    filters: 'Filters',
    clearFilters: 'Clear Filters',
    location: 'Location',
    categories: 'Categories',
    noResults: 'No results found',
  }),
}));

// Mock for primereact/sidebar
jest.mock('primereact/sidebar', () => ({
  Sidebar: ({ visible, onHide, children }: any) =>
    visible ? (
      <div data-testid="sidebar">
        <button onClick={onHide}>Hide</button>
        {children}
      </div>
    ) : null,
}));

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();
const mockForward = jest.fn();
const mockRefresh = jest.fn();
const mockPrefetch = jest.fn();

mockUseRouter.mockReturnValue({
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
  forward: mockForward,
  refresh: mockRefresh,
  prefetch: mockPrefetch,
});

const filters = {
  locations: [
    { slug: 'athens', label_en: 'Athens', label_el: 'Αθήνα' },
    { slug: 'thessaloniki', label_en: 'Thessaloniki', label_el: 'Θεσσαλονίκη' },
  ],
  categories: [
    { slug: 'it', label_en: 'IT', label_el: 'Πληροφορική' },
    { slug: 'finance', label_en: 'Finance', label_el: 'Οικονομικά' },
  ],
};

function setup(searchParamsObj: Record<string, string> = {}, lang = 'en') {
  mockUseSearchParams.mockReturnValue({
    get: (key: string) => searchParamsObj[key] || null,
    getAll: (key: string) => (searchParamsObj[key] ? [searchParamsObj[key]] : []),
    toString: () =>
      Object.entries(searchParamsObj)
        .map(([k, v]) => `${k}=${v}`)
        .join('&'),
    entries: () => Object.entries(searchParamsObj)[Symbol.iterator](),
    keys: () => Object.keys(searchParamsObj)[Symbol.iterator](),
    values: () => Object.values(searchParamsObj)[Symbol.iterator](),
    has: (key: string) => key in searchParamsObj,
    append: () => {
      throw new Error('Not implemented');
    },
    delete: () => {
      throw new Error('Not implemented');
    },
    set: () => {
      throw new Error('Not implemented');
    },
    sort: () => {
      throw new Error('Not implemented');
    },
    forEach: () => {
      throw new Error('Not implemented');
    },
    get size() {
      return Object.keys(searchParamsObj).length;
    },
    [Symbol.iterator]: function () {
      return Object.entries(searchParamsObj)[Symbol.iterator]();
    },
  });
  return render(<ActionBar filters={filters} lang={lang} />);
}

describe('ActionBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders open filters button', () => {
    setup();
    expect(screen.getByTestId('open-filters-button')).toBeDefined();
  });

  it('opens sidebar when open filters button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('open-filters-button'));
    expect(screen.getByTestId('sidebar')).toBeDefined();
    expect(screen.getByText('Filters')).toBeDefined();
  });

  it('shows correct filter options', () => {
    setup();
    fireEvent.click(screen.getByTestId('open-filters-button'));
    // Check for ListBox rendered options
    expect(screen.getByText('Athens')).toBeDefined();
    expect(screen.getByText('IT')).toBeDefined();
  });

  it('selects a location and updates URL', () => {
    setup();
    fireEvent.click(screen.getByTestId('open-filters-button'));
    // Find the ListBox for locations and select Athens
    const athensOption = screen.getByText('Athens');
    fireEvent.click(athensOption);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('location=athens'));
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=1'));
  });

  it('selects a category and updates URL', () => {
    setup();
    fireEvent.click(screen.getByTestId('open-filters-button'));
    const itOption = screen.getByText('IT');
    fireEvent.click(itOption);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('category=it'));
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=1'));
  });

  it('clears filters and resets state', () => {
    setup({ location: 'athens', category: 'it', page: '2' });
    fireEvent.click(screen.getByTestId('open-filters-button'));
    fireEvent.click(screen.getByTestId('clear-filters-button'));
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=1'));
    expect(mockPush).not.toHaveBeenCalledWith(expect.stringContaining('location=athens'));
    expect(mockPush).not.toHaveBeenCalledWith(expect.stringContaining('category=it'));
  });

  it('preselects location and category from search params', () => {
    setup({ location: 'athens', category: 'it' });
    fireEvent.click(screen.getByTestId('open-filters-button'));
    // Check that the selected options are present
    expect(screen.getByText('Athens')).toBeDefined();
    expect(screen.getByText('IT')).toBeDefined();
  });

  it('renders with different language labels', () => {
    setup({}, 'el');
    fireEvent.click(screen.getByTestId('open-filters-button'));
    expect(screen.getByText('Αθήνα')).toBeDefined();
    expect(screen.getByText('Πληροφορική')).toBeDefined();
  });

  it('hides sidebar when hide button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('open-filters-button'));
    expect(screen.getByTestId('sidebar')).toBeDefined();
    fireEvent.click(screen.getByText('Hide'));
    expect(screen.queryByTestId('sidebar')).toBeNull();
  });

  it('removes location filter when deselecting', () => {
    setup({ location: 'athens' });
    fireEvent.click(screen.getByTestId('open-filters-button'));
    // Deselect by clicking the selected option again (if ListBox supports it)
    const athensOption = screen.getByText('Athens');
    fireEvent.click(athensOption);
    expect(mockPush).toHaveBeenCalledWith(expect.not.stringContaining('location=athens'));
  });

  it('removes category filter when deselecting', () => {
    setup({ category: 'it' });
    fireEvent.click(screen.getByTestId('open-filters-button'));
    const itOption = screen.getByText('IT');
    fireEvent.click(itOption);
    expect(mockPush).toHaveBeenCalledWith(expect.not.stringContaining('category=it'));
  });

  it('does not crash if no filters are provided', () => {
    render(<ActionBar filters={{ locations: [], categories: [] }} lang="en" />);
    fireEvent.click(screen.getByTestId('open-filters-button'));
    // Should still render ListBox components
    expect(screen.getByText('Location')).toBeDefined();
    expect(screen.getByText('Categories')).toBeDefined();
  });
});
