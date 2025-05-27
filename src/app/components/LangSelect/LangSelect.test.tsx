import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LangSelect } from './LangSelect';

// Mocks for next/navigation
const pushMock = jest.fn();
const useRouter = jest.fn(() => ({ push: pushMock }));
const usePathname = jest.fn();
const useSearchParams = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => useRouter(),
  usePathname: () => usePathname(),
  useSearchParams: () => useSearchParams(),
}));

// Mock for primereact/dropdown
jest.mock('primereact/dropdown', () => ({
  Dropdown: ({ value, onChange, options, optionLabel, className }: any) => (
    <select
      data-testid="dropdown"
      value={value?.code}
      onChange={(e) => {
        const selected = options.find((opt: any) => opt.code === e.target.value);
        onChange({ value: selected });
      }}
      className={className}
    >
      {options.map((opt: any) => (
        <option key={opt.code} value={opt.code}>
          {opt[optionLabel]}
        </option>
      ))}
    </select>
  ),
}));

describe('LangSelect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the correct selected language', () => {
    usePathname.mockReturnValue('/en/somepage');
    useSearchParams.mockReturnValue({
      toString: () => '',
    });

    const { getByTestId } = render(<LangSelect lang="en" />);
    const dropdown = getByTestId('dropdown') as HTMLSelectElement;
    expect(dropdown.value).toBe('en');
  });

  it('changes language and updates the path', () => {
    usePathname.mockReturnValue('/en/somepage');
    useSearchParams.mockReturnValue({
      toString: () => '',
    });

    const { getByTestId } = render(<LangSelect lang="en" />);
    const dropdown = getByTestId('dropdown') as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: 'el' } });

    expect(pushMock).toHaveBeenCalledWith('/el/somepage');
  });

  it('preserves search params when changing language', () => {
    usePathname.mockReturnValue('/en/somepage');
    useSearchParams.mockReturnValue({
      toString: () => 'foo=bar&baz=qux',
    });

    const { getByTestId } = render(<LangSelect lang="en" />);
    const dropdown = getByTestId('dropdown') as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: 'el' } });

    expect(pushMock).toHaveBeenCalledWith('/el/somepage?foo=bar&baz=qux');
  });

  it('handles root path correctly', () => {
    usePathname.mockReturnValue('/');
    useSearchParams.mockReturnValue({
      toString: () => '',
    });

    const { getByTestId } = render(<LangSelect lang="en" />);
    const dropdown = getByTestId('dropdown') as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: 'el' } });

    expect(pushMock).toHaveBeenCalledWith('/el');
  });
});
