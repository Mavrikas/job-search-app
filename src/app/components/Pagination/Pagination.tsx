'use client';
import { Paginator } from 'primereact/paginator';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './styles.module.css';

type PaginationProps = {
  totalRecords: number;
  pageSize: number;
};

export function Pagination({ totalRecords, pageSize }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (event: { first: number; rows: number }) => {
    createPageURL(event.first / pageSize + 1, event.rows);
  };

  const createPageURL = (pageNumber: number | string, rows: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    if (rows !== 10) {
      params.set('pageSize', rows.toString());
    } else {
      params.delete('pageSize');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Paginator
      className={styles['p-highlight'] + ' max-w-[800px]'}
      aria-label="Pagination"
      first={(currentPage - 1) * pageSize}
      rows={pageSize}
      totalRecords={totalRecords}
      onPageChange={handlePageChange}
      rowsPerPageOptions={[10, 25, 50, 100]}
    />
  );
}
