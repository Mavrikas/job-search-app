'use client';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import { useSearchParams } from 'next/navigation';

type LangSelectProps = {
  lang: string;
};

export function LangSelect({ lang }: LangSelectProps) {
  const { push } = useRouter();
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
        push(`${e.value.code}?${searchParams.toString()}`);
      }}
      options={items}
      optionLabel="name"
      className="w-[150px] md:w-14rem"
    />
  );
}
