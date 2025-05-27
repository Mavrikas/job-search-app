import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { expect } from '@jest/globals';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = (props: any) => <img {...props} alt={props.alt || ''} />;
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock LangSelect
jest.mock('../LangSelect/LangSelect', () => ({
  LangSelect: ({ lang }: { lang: string }) => <div data-testid="lang-select">{lang}</div>,
}));

describe('Header', () => {
  it('renders the logo with correct src and alt and the link with correct href', async () => {
    render(await Header({ lang: 'en' }));
    const logo = await screen.findByAltText('Hired');
    expect(logo).toBeDefined();
    expect(logo).toHaveProperty('src', 'http://localhost/logo5.png');
    const link = await screen.findByRole('link');
    expect(link).toHaveProperty('href', 'http://localhost/en');
  });

  it('renders the LangSelect component', async () => {
    render(await Header({ lang: 'el' }));
    const langSelect = await screen.findByTestId('lang-select');
    expect(langSelect).toBeDefined();
  });
});
