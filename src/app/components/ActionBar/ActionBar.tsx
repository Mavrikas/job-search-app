'use client';
import { Sidebar } from 'primereact/sidebar';
import { useEffect, useState } from 'react';
import 'primeicons/primeicons.css';
import { Filter, JobFilters } from '@/store/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ListBox, ListBoxChangeEvent } from 'primereact/listbox';
import { useDictionary } from '@/hooks/useDictionary';

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
  const dic = useDictionary();

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
          <button data-testid="clear-filters-button" name="clear-filters" onClick={clearFilters}>
            {dic?.clearFilters}
          </button>
        </div>

        <h3>{dic?.location}</h3>
        <ListBox
          data-testid="location-listbox"
          filter
          value={selectedLocation}
          onChange={(event) => handleSelect(event, 'location')}
          options={filters.locations}
          optionLabel={`label_${lang}`}
          className="w-full md:w-14rem"
          listStyle={{ maxHeight: '250px' }}
          emptyFilterMessage={dic?.noResults}
        />

        <h3>{dic?.categories}</h3>
        <ListBox
          data-testid="category-listbox"
          filter
          value={selectedCategory}
          onChange={(event) => handleSelect(event, 'category')}
          options={filters.categories}
          optionLabel={`label_${lang}`}
          className="w-full md:w-14rem"
          listStyle={{ maxHeight: '250px' }}
          emptyFilterMessage={dic?.noResults}
        />
      </Sidebar>
      <button
        data-testid="open-filters-button"
        role="button"
        name="open-filters"
        aria-label="Open Filters"
        className="pi pi-filter-fill bg-[#927eec] text-white rounded-full fixed bottom-10 left-6 p-4 shadow-lg hover:bg-[#6647f1] focus:outline-none "
        onClick={() => setVisible(true)}
      />
    </div>
  );
}
