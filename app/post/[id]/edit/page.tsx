'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter, useParams } from 'next/navigation';
import Editor from '@/components/Editor';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditPost() {
  const { user, token } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
      .then(r => r.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      });
  }, [id]);

  if (!user) return <div className="p-8 text-center mt-8">Please log in to edit.</div>;
  if (loading) return <div className="p-8 text-center mt-8 text-gray-500">Loading story...</div>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title || !content || isPublishing) return;
    setIsPublishing(true);
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, content, published: true }),
    });
    router.push(`/post/${id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-12">
          <Link href={`/post/${id}`} className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
            <ChevronLeft size={20} />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <button 
            type="submit" 
            disabled={!title || !content || isPublishing}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white px-5 py-2 rounded-full font-medium text-sm transition-colors"
          >
            {isPublishing ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
        
        <div>
          <input 
            required 
            className="w-full text-4xl sm:text-5xl font-bold text-gray-900 placeholder:text-gray-300 focus:outline-none bg-transparent" 
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
