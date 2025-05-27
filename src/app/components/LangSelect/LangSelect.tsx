'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import { useSearchParams } from 'next/navigation';

type LangSelectProps = {
  lang: string;
};

export function LangSelect({ lang }: LangSelectProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const items = [
    { name: 'English', code: 'en' },
    { name: 'Ελληνικά', code: 'el' },
  ];
  const selectedItem = items.find((item) => item.code === lang);

  return (
    <Dropdown
      value={selectedItem}
      onChange={(e) => {
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length > 0) {
          segments[0] = e.value.code;
        } else {
          segments.push(e.value.code);
        }
        const newPath = '/' + segments.join('/');
        push(`${newPath}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
      }}
      options={items}
      optionLabel="name"
      className="w-[150px] md:w-14rem"
    />
  );
}
