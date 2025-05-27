import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ApplyButton } from './ApplyButton';
import { useDictionary } from '@/hooks/useDictionary';

// Mock useDictionary hook
jest.mock('@/hooks/useDictionary', () => ({
  useDictionary: jest.fn(),
}));

describe('ApplyButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default text when dictionary is undefined', () => {
    (useDictionary as jest.Mock).mockReturnValue(undefined);
    render(<ApplyButton />);
    expect(screen.getByTestId('apply-button')).toBeDefined();
  });

  it('renders with dictionary text when available', () => {
    (useDictionary as jest.Mock).mockReturnValue({ apply: 'Αίτηση' });
    render(<ApplyButton />);
    expect(screen.getByTestId('apply-button')).toBeDefined();
  });

  it('calls alert with "Good luck!" when clicked', () => {
    (useDictionary as jest.Mock).mockReturnValue(undefined);
    window.alert = jest.fn();
    render(<ApplyButton />);
    fireEvent.click(screen.getByTestId('apply-button'));
    expect(window.alert).toHaveBeenCalledWith('Good luck!');
  });
});
