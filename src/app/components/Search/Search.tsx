'use client';
import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useDictionary } from '@/hooks/useDictionary';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const dic = useDictionary();
  const [searchTerm, setSearchTerm] = useState<string | undefined>('');

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      setSearchTerm(query);
    } else {
      setSearchTerm('');
    }
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleInputChange = (term: string) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <IconField
      className="w-full sm:w-[350px] md:w-[400px] lg:w-[600px] xl:w-[800px]"
      iconPosition="right"
    >
      <InputText
        aria-label="Search"
        className={
          'w-full sm:w-[350px] md:w-[400px] lg:w-[600px] xl:w-[800px] peer block rounded-md border border-gray-200 py-[9px] pl-3 pr-[35px] text-sm outline-2 placeholder:text-gray-500'
        }
        placeholder={dic?.search ?? 'Search'}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
        value={searchTerm}
      />
      <InputIcon
        name-icon="pi pi-search"
        className={`pi pi-times hover:cursor-pointer transition-opacity duration-200 ${
          searchTerm ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => handleInputChange('')}
      />
    </IconField>
  );
}
