'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white/70 backdrop-blur-xl px-6 py-4 border-b border-gray-100/50 sticky top-0 z-50 shadow-sm transition-all"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 tracking-tighter hover:opacity-80 transition-opacity">
          Scribe.
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Discover
          </Link>
          {user ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/create" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors bg-gray-50/50 px-4 py-2 flex items-center gap-2 rounded-full border border-gray-200 hover:border-gray-300 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Write a Story
                </Link>
              </motion.div>
              <div className="flex items-center gap-4 pl-4 relative before:absolute before:left-0 before:h-6 before:w-[1px] before:bg-gray-200">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-800 font-bold">
                    {user.name || 'User'}
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    {user.email}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-full transition-all"
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors">
                Log in
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="text-sm font-semibold bg-gray-900 text-white hover:bg-black px-6 py-2.5 rounded-full transition-all shadow-md shadow-gray-900/10">
                  Get Started
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
