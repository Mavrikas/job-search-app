import { getDictionary } from '@/app/[lang]/dictionaries';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useDictionary() {
  const pathname = usePathname();
  const [dic, setDic] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    async function fetchDictionary() {
      const lang = pathname.split('/')[1] || 'en';
      const dictionary = await getDictionary(lang as 'en' | 'el');
      setDic(dictionary);
    }
    fetchDictionary();
  }, [pathname]);

  return dic;
}
