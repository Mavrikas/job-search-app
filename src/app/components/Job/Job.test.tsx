import React from 'react';
import { render, screen } from '@testing-library/react';
import { Job } from './Job';
import { JobType } from '@/store/types';
import { expect, jest } from '@jest/globals';
// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock primereact/chip
jest.mock('primereact/chip', () => ({
  Chip: ({ label, icon, className }: any) => (
    <span data-testid="chip" className={className}>
      {icon && <i className={icon} />}
      {label}
    </span>
  ),
}));

const mockJob: JobType = {
  id: 1,
  title: 'Frontend Developer',
  company: 'Tech Corp',
  description: 'Develop cool UIs',
  tags: ['React', 'TypeScript'],
  location: 'Remote',
  category: 'Software Development',
  postedAt: '2025-04-24T10:34:29.547126',
  slug: 'frontend-developer',
};

describe('Job', () => {
  it('renders job details', () => {
    render(<Job job={mockJob} />);
    expect(screen.getByText('Frontend Developer')).toBeDefined();
    expect(screen.getByText('Tech Corp')).toBeDefined();
    expect(screen.getByText('Develop cool UIs')).toBeDefined();
  });

  it('renders tags as chips', () => {
    render(<Job job={mockJob} />);
    expect(screen.getByText('React')).toBeDefined();
    expect(screen.getByText('TypeScript')).toBeDefined();
  });

  it('renders location and formatted date as chips', () => {
    render(<Job job={mockJob} />);
    expect(screen.getByText('Remote')).toBeDefined();
    expect(screen.getByLabelText('24/04/2025')).toBeDefined();
  });

  it('renders link with correct href and lang', () => {
    render(<Job job={mockJob} lang="en" />);
    const link = screen.getByRole('link', { name: /job listing/i });
    expect(link).toHaveProperty('href', 'http://localhost/en/job/frontend-developer');
  });
});
