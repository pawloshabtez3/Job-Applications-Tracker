'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authApi } from '../lib/api';

const linkClasses = (active: boolean) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'} dark:${
    active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/10'
  }`;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      router.push('/login');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-white">
          Job Tracker
        </Link>
        <nav className="flex flex-wrap items-center gap-2">
          <Link href="/" className={linkClasses(pathname === '/')}>Dashboard</Link>
          <Link href="/add-job" className={linkClasses(pathname === '/add-job')}>Add Job</Link>
          <Link href="/login" className={linkClasses(pathname === '/login')}>Login</Link>
          <Link href="/register" className={linkClasses(pathname === '/register')}>Register</Link>
          <button type="button" onClick={toggleDarkMode} className="button-secondary">
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="button-secondary"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </nav>
      </div>
    </header>
  );
}
