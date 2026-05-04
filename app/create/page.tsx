'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Editor from '@/components/Editor';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
}

export default function CreatePost() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  if (!user) return <div className="p-8 text-center mt-8 text-gray-700 dark:text-gray-300">Please log in to write a story.</div>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title || !content || isPublishing) return;
    setIsPublishing(true);
    setError('');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          title, 
          content, 
          categoryId: categoryId || null, 
          published: true 
        }),
      });
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create post');
      }
      
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsPublishing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors flex items-center gap-1">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <button 
            type="submit" 
            disabled={!title || !content || isPublishing}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:bg-green-600/50 dark:disabled:bg-green-500/50 text-white px-5 py-2 rounded-full font-medium text-sm transition-colors"
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}
        
        <div className="mb-8">
          <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Select Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryId(categoryId === cat.id ? '' : cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${
                  categoryId === cat.id
                    ? 'bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-500 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <input 
            required 
            className="w-full text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 placeholder:text-gray-300 dark:placeholder:text-gray-700 focus:outline-none bg-transparent leading-tight" 
            placeholder="Title"
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />
        </div>
        <div>
          <Editor value={content} onChange={setContent} placeholder="Tell your story..." />
        </div>
      </form>
    </motion.div>
  );
}
