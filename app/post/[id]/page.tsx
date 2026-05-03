import { notFound } from 'next/navigation';
import EditPostButton from '@/components/EditPostButton';
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`, { cache: 'no-store' });
  let post = null;
  if (res.ok) {
    post = await res.json();
    const commentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}/comments`, { cache: 'no-store' });
    if (commentsRes.ok) {
      post.comments = await commentsRes.json();
    } else {
      post.comments = [];
    }
  }

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content.replace(/<[^>]+>/g, ''));

  return (
    <article className="max-w-3xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 mb-6">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="text-gray-300">/</span>
          {post.category ? (
            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
              {post.category.name}
            </span>
          ) : (
            <span className="text-gray-500">Uncategorized</span>
          )}
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between py-6 border-y border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg shadow-sm">
              {post.author.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{post.author.name || 'Anonymous'}</span>
                <span className="text-blue-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <time>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                <span>·</span>
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
          <EditPostButton postId={post.id} authorId={post.authorId} />
        </div>
      </header>

      <div 
        className="prose prose-lg sm:prose-xl max-w-none text-gray-800 prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-2xl prose-strong:text-gray-900" 
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />

      <CommentSection comments={post.comments} />
    </article>
  );
}

