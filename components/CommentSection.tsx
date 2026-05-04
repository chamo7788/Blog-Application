import React from 'react';

interface Comment {
  id: string;
  content: string;
  author: {
    name: string | null;
  };
  createdAt: string;
}

export default function CommentSection({ comments }: { comments: Comment[] }) {
  return (
    <section className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Responses <span className="text-gray-400 dark:text-gray-500 font-normal ml-2">{comments.length}</span>
        </h2>
      </div>

      <div className="mb-12">
        <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 border border-gray-100 dark:border-gray-700/50">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Share your thoughts...</p>
          <div className="flex justify-end">
            <button className="bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-black dark:hover:bg-white transition-colors disabled:opacity-50">
              Respond
            </button>
          </div>
        </div>
      </div>
      
      {comments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No responses yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {comments.map((comment) => (
            <article key={comment.id} className="group">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-1 ring-white/10">
                    {comment.author.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                </div>
                <div className="flex-1 pb-8 border-b border-gray-50 dark:border-gray-800/50 group-last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-gray-200">{comment.author.name || 'Anonymous'}</span>
                    <span className="text-gray-300 dark:text-gray-600 text-xs">â€¢</span>
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
