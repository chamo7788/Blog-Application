'use client';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Edit } from 'lucide-react';

export default function EditPostButton({ postId, authorId }: { postId: string, authorId: string }) {
  const { user } = useAuth();
  
  if (user?.id !== authorId) return null;
  
  return (
    <Link href={`/post/${postId}/edit`} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium text-sm transition-colors mt-6 mb-8">
      <Edit size={16} />
      <span>Edit Post</span>
    </Link>
  );
}
