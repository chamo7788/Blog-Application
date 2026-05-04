'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`);
  };

  const clearSearch = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    params.delete('q');
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex items-center">
          <div className="absolute left-6 text-gray-400 group-focus-within:text-blue-600 dark:text-gray-500 dark:group-focus-within:text-blue-400 transition-colors">
            <Search size={20} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, topics, or authors..."
            className="w-full pl-16 pr-14 py-5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 rounded-3xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-50 dark:focus:ring-blue-900/30 focus:border-blue-200 dark:focus:border-blue-700 text-lg font-medium placeholder:text-gray-400 dark:text-gray-100 transition-all text-gray-900"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
