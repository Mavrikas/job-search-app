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

// Mock getDictionary
jest.mock('@/app/[lang]/dictionaries', () => ({
  getDictionary: jest.fn(async (lang: 'en' | 'el') => {
    if (lang === 'en') {
      return { home: 'Home', about: 'About' };
    }
    return { home: 'Αρχική', about: 'Σχετικά' };
  }),
}));

// Mock MenuItem
jest.mock('../MenuItem/MenuItem', () => ({
  MenuItem: ({ id, name, href, icon }: any) => (
    <div data-testid={`menu-item-${id}`}>
      <span>{name}</span>
      <span>{href}</span>
      <span>{icon}</span>
    </div>
  ),
}));

// Mock MobileMenu
jest.mock('../MobileMenu/MobileMenu', () => ({
  MobileMenu: ({ menuItems }: any) => (
    <div data-testid="mobile-menu">
      {menuItems.map((item: any) => (
        <span key={item.id}>{item.name}</span>
      ))}
    </div>
  ),
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
