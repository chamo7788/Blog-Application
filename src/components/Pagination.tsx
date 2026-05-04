'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-16 pb-8">
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-6 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 transition-all shadow-sm"
        >
          Previous
        </Link>
      ) : (
        <div className="px-6 py-2.5 text-sm font-bold text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-full cursor-not-allowed">
          Previous
        </div>
      )}
      
      <div className="flex items-center gap-1">
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          Page <span className="text-gray-900 dark:text-gray-100">{currentPage}</span> of <span className="text-gray-900 dark:text-gray-100">{totalPages}</span>
        </span>
      </div>

      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-6 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 transition-all shadow-sm"
        >
          Next
        </Link>
      ) : (
        <div className="px-6 py-2.5 text-sm font-bold text-gray-300 dark:text-gray-600 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-full cursor-not-allowed">
          Next
        </div>
      )}
    </div>
  );
}
