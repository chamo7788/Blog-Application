'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const handleCategoryClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    if (id === activeCategory) {
      params.delete('category');
    } else {
      params.set('category', id);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
      <button
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete('page');
          params.delete('category');
          router.push(`/?${params.toString()}`);
        }}
        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
          !activeCategory 
            ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg shadow-gray-900/20 dark:shadow-white/10 scale-105' 
            : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
      >
        All Stories
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
            activeCategory === category.id
              ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-500/20 scale-105'
              : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-50 dark:hover:border-gray-600 hover:text-blue-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
