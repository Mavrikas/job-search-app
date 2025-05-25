'use client';
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from 'react';
import 'primeicons/primeicons.css';
import { Filter, JobFilters } from '@/store/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { ListBox, ListBoxChangeEvent } from 'primereact/listbox';

type ActionBarProps = {
  filters: JobFilters;
  lang: string;
};

export function ActionBar({ filters, lang }: ActionBarProps) {
  const [visible, setVisible] = useState(false);
  const searchParams = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<Filter | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Filter | null>(null);
  const pathname = usePathname();
  const { push } = useRouter();
  const [dic, setDic] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    async function fetchDictionary() {
      const lang = pathname.split('/')[1] || 'en';
      const dictionary = await getDictionary(lang as 'en' | 'el');
      setDic(dictionary);
    }
    fetchDictionary();
  }, [pathname]);

  useEffect(() => {
    const locationSlug = searchParams.get('location');
    const categorySlug = searchParams.get('category');

    if (locationSlug) {
      const location = filters.locations.find((loc) => loc.slug === locationSlug);
      setSelectedLocation(location || null);
    } else {
      setSelectedLocation(null);
    }

    if (categorySlug) {
      const category = filters.categories.find((cat) => cat.slug === categorySlug);
      setSelectedCategory(category || null);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams, filters.locations, filters.categories]);

  // const handleSelect = (
  //   event: CheckboxChangeEvent,
  //   type: 'location' | 'category',
  //   slug: string
  // ) => {
  //   console.log('handleSelect', event, type, slug);
  //   const params = new URLSearchParams(searchParams);
  //   params.set('page', '1');
  //   if (event.checked) {
  //     params.set(type, slug);
  //   } else {
  //     params.delete(type);
  //   }
  //   push(`${pathname}?${params.toString()}`);
  // };
  const handleSelect = (event: ListBoxChangeEvent, type: 'location' | 'category') => {
    if (type === 'location') {
      setSelectedLocation(event.value);
      console.log('Selected Location:', event.value);
    } else {
      setSelectedCategory(event.value);
    }
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (event.value) {
      params.set(type, event.value.slug);
    } else {
      params.delete(type);
    }
    push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.delete('location');
    params.delete('category');
    setSelectedLocation(null);
    setSelectedCategory(null);
    push(`${pathname}?${params.toString()}`);
    setVisible(false);
  };

  return (
    <div className="card flex justify-content-center">
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2>{dic?.filters}</h2>
          <button onClick={clearFilters}>{dic?.clearFilters}</button>
        </div>

        <h3>{dic?.location}</h3>
        <ListBox
          filter
          value={selectedLocation}
          onChange={(event) => handleSelect(event, 'location')}
          options={filters.locations}
          optionLabel={`label_${lang}`}
          className="w-full md:w-14rem"
          listStyle={{ maxHeight: '250px' }}
        />

        {/* <ul className="list-none p-0 m-0 max-h-48 overflow-y-auto">
          {filters.locations.map((location) => (
            <li
              key={location.slug}
              className="p-2 flex justify-between bg-gray-50 hover:bg-gray-200 cursor-pointer"
            >
              <label htmlFor="ingredient1" className="ml-2">
                {(location as Record<string, string>)[`label_${lang}`]}
              </label>
              <Checkbox
                inputId={location.slug}
                onChange={(event) => handleSelect(event, 'location', location.slug)}
                checked={searchParams.get('location') === location.slug}
                className="border-2 border-gray-400 rounded-md hover:border-blue-500 focus:ring-blue-500 focus:ring-2"
              />
            </li>
          ))}
        </ul> */}
        <h3>{dic?.categories}</h3>
        <ListBox
          filter
          value={selectedCategory}
          onChange={(event) => handleSelect(event, 'category')}
          options={filters.categories}
          optionLabel={`label_${lang}`}
          className="w-full md:w-14rem"
          listStyle={{ maxHeight: '250px' }}
        />
        {/* <ul className="list-none p-0 m-0 max-h-48 overflow-y-auto">
          {filters.categories.map((category) => (
            <li key={category.slug} className="p-2 hover:bg-gray-100 cursor-pointer">
              <label htmlFor="ingredient1" className="ml-2">
                {(category as Record<string, string>)[`label_${lang}`]}
              </label>
              <Checkbox
                inputId={category.slug}
                onChange={(event) => handleSelect(event, 'category', category.slug)}
                checked={searchParams.get('category') === category.slug}
                className="border-2 border-gray-400 rounded-md"
              />
            </li>
          ))}
        </ul> */}
      </Sidebar>
      <button
        className="pi pi-filter-fill bg-blue-600 text-white rounded-full fixed bottom-10 left-6 p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => setVisible(true)}
      />
    </div>
  );
}
