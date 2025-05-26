import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from './Search';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Mock next/navigation hooks
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock getDictionary
jest.mock('@/app/[lang]/dictionaries', () => ({
  getDictionary: jest.fn(),
}));

// Mock primereact components
jest.mock('primereact/iconfield', () => ({
  IconField: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('primereact/inputicon', () => ({
  InputIcon: (props: any) => <button data-testid="clear-btn" {...props} />,
}));
jest.mock('primereact/inputtext', () => ({
  InputText: (props: any) => <input {...props} />,
}));

describe('Search', () => {
  const mockReplace = jest.fn();
  const mockUseRouter = () => ({ replace: mockReplace });

  // Import the mocked hooks at the top of the file

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockUseRouter());
    (usePathname as jest.Mock).mockReturnValue('/en/jobs');
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'query' ? '' : null),
      toString: () => '',
      entries: () => [],
      forEach: () => {},
      has: () => false,
      keys: () => [],
      values: () => [],
      append: () => {},
      delete: () => {},
      set: () => {},
    });
    (getDictionary as jest.Mock).mockResolvedValue({ search: 'Αναζήτηση' });
  });

  it('renders input with placeholder from dictionary', async () => {
    render(<Search />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Αναζήτηση')).toBeInTheDocument();
    });
  });

  it('updates input value and calls replace on change', async () => {
    render(<Search />);
    const input = await screen.findByPlaceholderText('Αναζήτηση');
    fireEvent.change(input, { target: { value: 'developer' } });
    await waitFor(() => {
      expect(input).toHaveValue('developer');
      expect(mockReplace).toHaveBeenCalled();
    });
  });

  it('clears input when clear button is clicked', async () => {
    render(<Search />);
    const input = await screen.findByPlaceholderText('Αναζήτηση');
    fireEvent.change(input, { target: { value: 'test' } });
    await waitFor(() => expect(input).toHaveValue('test'));
    const clearBtn = screen.getByTestId('clear-btn');
    fireEvent.click(clearBtn);
    await waitFor(() => expect(input).toHaveValue(''));
  });

  it('shows default placeholder if dictionary not loaded', async () => {
    (getDictionary as jest.Mock).mockResolvedValue({});
    render(<Search />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });
  });
});
