import { formatDate } from './uitls';

describe('formatDate', () => {
  it('formats a valid ISO date string correctly', () => {
    expect(formatDate('2024-06-01')).toBe('01/06/2024');
    expect(formatDate('1999-12-31')).toBe('31/12/1999');
  });

  it('pads single-digit days and months with zero', () => {
    expect(formatDate('2024-01-05')).toBe('05/01/2024');
    expect(formatDate('2024-11-09')).toBe('09/11/2024');
  });

  it('handles date-time strings', () => {
    expect(formatDate('2024-06-01T15:30:00Z')).toBe('01/06/2024');
  });

  it('returns "NaN/NaN/NaN" for invalid date strings', () => {
    expect(formatDate('invalid-date')).toBe('NaN/NaN/NaN');
  });
});
