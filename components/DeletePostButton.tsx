'use client';
import { useAuth } from '@/lib/auth-context';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeletePostButton({ postId, authorId }: { postId: string, authorId: string }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  
  if (user?.id !== authorId) return null;
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full font-medium text-sm transition-colors mb-0 disabled:opacity-50"
    >
      <Trash2 size={16} />
      <span>{isDeleting ? 'Deleting...' : 'Delete Post'}</span>
    </button>
  );
}
