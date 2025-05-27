'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MenuItemProps } from '../MenuItem/MenuItem';

type MobileMenuProps = {
  menuItems: MenuItemProps[];
};

export function MobileMenu({ menuItems }: MobileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex md:hidden flex-grow ml-4 relative">
      <button
        className="p-2 rounded bg-[#927eec] border border-white"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Open menu"
      >
        <span className="pi pi-bars text-2xl" />
      </button>
      {menuOpen && (
        <div className="absolute top-12 left-0 bg-[#927eec] border border-white rounded shadow-lg z-50 min-w-[150px]">
          {menuItems.map((item: MenuItemProps) => (
            <Link
              key={item.id}
              aria-label={item.name}
              href={item.href}
              className="block px-4 py-2 hover:bg-[#5a3fd4]"
              onClick={() => setMenuOpen(false)}
            >
              <span className={`${item.icon} mr-2`} />
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
