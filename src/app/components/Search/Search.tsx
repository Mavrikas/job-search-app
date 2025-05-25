'use client';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [dic, setDic] = useState<Record<string, string> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    searchParams.get('query')?.toString()
  );

  useEffect(() => {
    async function fetchDictionary() {
      const lang = pathname.split('/')[1] || 'en';
      const dictionary = await getDictionary(lang as 'en' | 'el');
      setDic(dictionary);
    }
    fetchDictionary();
  }, [pathname]);

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
    <IconField className="w-[200px]">
      <InputText
        aria-label="Search"
        className="peer block rounded-md border border-gray-200 py-[9px] pl-3 pr-[35px] text-sm outline-2 placeholder:text-gray-500 w-[200px]"
        placeholder={dic?.search ?? 'Search'}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
        value={searchTerm}
      />
      <InputIcon
        className={`pi pi-times hover:cursor-pointer transition-opacity duration-200 ${
          searchTerm ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => handleInputChange('')}
      />
    </IconField>
  );
}
