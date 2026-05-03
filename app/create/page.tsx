'use client';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Editor from '@/components/Editor';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreatePost() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  
  if (!user) return <div className="p-8 text-center mt-8">Please log in to write a story.</div>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title || !content || isPublishing) return;
    setIsPublishing(true);
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content, published: true }),
    });
    router.push('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <button 
            type="submit" 
            disabled={!title || !content || isPublishing}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white px-5 py-2 rounded-full font-medium text-sm transition-colors"
          >
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
        
        <div className="mb-2">
          <input 
            required 
            className="w-full text-4xl sm:text-5xl font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none bg-transparent leading-tight" 
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
