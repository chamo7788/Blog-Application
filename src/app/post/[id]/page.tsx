import { notFound } from 'next/navigation';
import EditPostButton from '@/components/EditPostButton';
import DeletePostButton from '@/components/DeletePostButton';
import CommentSection from '@/components/CommentSection';
import Link from 'next/link';

function calculateReadingTime(text: string) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return time;
}

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  let post = null;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`, { cache: 'no-store' });
    if (res.ok) {
      post = await res.json();
      try {
        const commentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}/comments`, { cache: 'no-store' });
        if (commentsRes.ok) {
          post.comments = await commentsRes.json();
        } else {
          post.comments = [];
        }
      } catch (commentErr) {
        post.comments = [];
      }
    }
  } catch (err) {
    console.error('Failed to fetch post', err);
  }

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content.replace(/<[^>]+>/g, ''));

  return (
    <article className="max-w-3xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          {post.category ? (
            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs box-border">
              {post.category.name}
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">Uncategorized</span>
          )}
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y border-gray-100 dark:border-gray-800 gap-4 sm:gap-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-lg shadow-sm">
              {post.author.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 dark:text-gray-200">{post.author.name || 'Anonymous'}</span>
                <span className="text-blue-600 dark:text-blue-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <time>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                <span>·</span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <EditPostButton postId={post.id} authorId={post.authorId} />
            <DeletePostButton postId={post.id} authorId={post.authorId} />
          </div>
        </div>
      </header>

      <div 
        className="prose prose-lg sm:prose-xl max-w-none text-gray-800 prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-2xl prose-strong:text-gray-900 dark:prose-invert dark:text-gray-300 dark:prose-headings:text-gray-100 dark:prose-strong:text-gray-100" 
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      <CommentSection postId={post.id} comments={post.comments} />
    </article>
  );
}

