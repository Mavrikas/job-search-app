import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// Mocks for next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock for primereact/paginator
jest.mock('primereact/paginator', () => ({
  Paginator: (props: any) => (
    <div data-testid="paginator" {...props}>
      <button
        data-testid="next-page"
        onClick={() =>
          props.onPageChange &&
          props.onPageChange({ first: props.first + props.rows, rows: props.rows })
        }
      >
        Next
      </button>
      <button
        data-testid="change-rows"
        onClick={() => props.onPageChange && props.onPageChange({ first: 0, rows: 25 })}
      >
        Change Rows
      </button>
      <span data-testid="first">{props.first}</span>
      <span data-testid="rows">{props.rows}</span>
      <span data-testid="totalRecords">{props.totalRecords}</span>
    </div>
  ),
}));

describe('Pagination', () => {
  const mockReplace = jest.fn();
  const mockPathname = '/jobs';
  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  function setSearchParams(params: Record<string, string> = {}) {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => params[key] || null,
      toString: () =>
        Object.entries(params)
          .map(([k, v]) => `${k}=${v}`)
          .join('&'),
      [Symbol.iterator]: function* () {
        for (const [k, v] of Object.entries(params)) yield [k, v];
      },
    });
  }

  it('renders with correct props', () => {
    setSearchParams({ page: '2' });
    const { getByTestId } = render(<Pagination totalRecords={100} pageSize={10} />);
    expect(getByTestId('first').textContent).toBe('10');
    expect(getByTestId('rows').textContent).toBe('10');
    expect(getByTestId('totalRecords').textContent).toBe('100');
  });

  it('defaults to page 1 if no page param', () => {
    setSearchParams({});
    const { getByTestId } = render(<Pagination totalRecords={50} pageSize={10} />);
    expect(getByTestId('first').textContent).toBe('0');
  });

  it('calls replace with correct URL on page change', () => {
    setSearchParams({ page: '1' });
    const { getByTestId } = render(<Pagination totalRecords={100} pageSize={10} />);
    fireEvent.click(getByTestId('next-page'));
    expect(mockReplace).toHaveBeenCalledWith('/jobs?page=2');
  });

  it('sets pageSize param when rows is not 10', () => {
    setSearchParams({ page: '1' });
    const { getByTestId } = render(<Pagination totalRecords={100} pageSize={10} />);
    fireEvent.click(getByTestId('change-rows'));
    expect(mockReplace).toHaveBeenCalledWith('/jobs?page=1&pageSize=25');
  });

  it('removes pageSize param when rows is 10', () => {
    setSearchParams({ page: '1', pageSize: '25' });
    const { getByTestId } = render(<Pagination totalRecords={100} pageSize={10} />);
    fireEvent.click(getByTestId('next-page'));
    expect(mockReplace).toHaveBeenCalledWith('/jobs?page=2');
  });
});
