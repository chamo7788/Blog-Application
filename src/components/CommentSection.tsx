"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string | null;
  } | null;
  createdAt: string;
}

type CommentSectionProps = {
  postId: string;
  comments: Comment[];
};

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent || isSubmitting || !user || !token) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: trimmedContent }),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseData?.error || 'Failed to post comment');
      }

      if (responseData?.id) {
        setLocalComments((currentComments) => [responseData, ...currentComments]);
      } else {
        router.refresh();
      }

      setContent('');
    } catch (submissionError: any) {
      setError(submissionError?.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleComments = localComments;

  return (
    <section className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Responses <span className="text-gray-400 dark:text-gray-500 font-normal ml-2">{visibleComments.length}</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-12">
        <div className="bg-gray-50 dark:bg-gray-800/30 rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
          {user ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{user.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Join the discussion</p>
                </div>
              </div>

              <label className="sr-only" htmlFor="comment-content">
                Write a comment
              </label>
              <textarea
                id="comment-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/60 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-gray-100/10 resize-none"
              />

              {error && (
                <div className="mt-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-end mt-4">
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting || !content.trim()}
                  className="bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-black dark:hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting...' : 'Respond'}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Sign in to respond</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your comment will be linked to your account.</p>
              </div>
              <Link href="/login" className="inline-flex items-center justify-center bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-black dark:hover:bg-white transition-colors">
                Log in
              </Link>
            </div>
          )}
        </div>
      </form>

      {visibleComments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No responses yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {visibleComments.map((comment) => (
            <article key={comment.id} className="group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-1 ring-white/10">
                    {comment.author?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                </div>
                <div className="flex-1 pb-8 border-b border-gray-50 dark:border-gray-800/50 group-last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-200">{comment.author?.name || 'Anonymous'}</span>
                    <span className="text-gray-300 dark:text-gray-600 text-xs">&bull;</span>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </time>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
