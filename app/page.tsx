import Link from 'next/link';
export const dynamic = 'force-dynamic';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, { cache: 'no-store' });
  let posts: any[] = [];
  if (res.ok) {
    posts = await res.json();
    posts = posts.filter((post: any) => post.published).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 animate-in fade-in zoom-in-95 duration-1000">
      <div className="py-24 md:py-32 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          The new standard in publishing
        </div>
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[1.1]">
          Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">impact.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl font-medium">
          Discover stories, thinking, and expertise from writers on any topic. 
          The world's most insightful platform for readers and creators.
        </p>
      </div>
      
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-4">
        {posts.map(post => (
          <article key={post.id} className="group relative flex flex-col bg-white/50 backdrop-blur-sm rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2">
            <Link href={`/post/${post.id}`} className="flex flex-col h-full p-8 border border-gray-100 rounded-[2rem] group-hover:border-blue-100 transition-colors bg-gradient-to-b from-transparent to-transparent group-hover:to-blue-50/50 z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${post.category ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                  {post.category?.name || 'Uncategorized'}
                </span>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 leading-snug tracking-tight line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-gray-500 tracking-wide mb-8 line-clamp-3 leading-relaxed text-sm font-medium">
                {post.content.replace(/<[^>]+>/g, '').substring(0, 180)}...
              </p>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between group-hover:border-blue-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-inner ring-2 ring-white">
                    {post.author.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">{post.author.name || 'Anonymous'}</span>
                    <span className="text-xs font-semibold text-gray-400">Author</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white text-gray-400 transition-all duration-300">
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </article>
        ))}
        
        {posts.length === 0 && (
          <div className="col-span-full py-32 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 text-gray-300">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-3xl font-black tracking-tight text-gray-900 mb-3">No stories yet</h3>
            <p className="text-lg text-gray-500 font-medium mb-8 max-w-sm">Be the first to share your perspective with the world.</p>
            <Link href="/create" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-black transition-all hover:scale-105 shadow-xl shadow-gray-900/20 active:scale-95">
              Start writing today
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

