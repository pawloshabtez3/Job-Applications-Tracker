'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authApi } from '../lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const AUTH_EVENT = 'auth_state_change';

const linkClasses = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'} dark:${
    active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/10'
  }`;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const savedState = window.localStorage.getItem('auth_state');
    setIsAuthenticated(savedState === 'logged_in');

    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
        setIsAuthenticated(res.ok);
        window.localStorage.setItem('auth_state', res.ok ? 'logged_in' : 'logged_out');
      } catch {
        setIsAuthenticated(false);
        window.localStorage.setItem('auth_state', 'logged_out');
      }
    };

    checkAuth();
    const onAuthChange = () => {
      const state = window.localStorage.getItem('auth_state');
      setIsAuthenticated(state === 'logged_in');
    };
    window.addEventListener(AUTH_EVENT, onAuthChange);

    return () => {
      window.removeEventListener(AUTH_EVENT, onAuthChange);
    };
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
      setIsAuthenticated(false);
      window.localStorage.setItem('auth_state', 'logged_out');
      window.dispatchEvent(new Event(AUTH_EVENT));
      router.push('/login');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="shell py-5">
        <div className="nav-shell flex flex-wrap items-center justify-between gap-4 overflow-visible">
          <Link href="/" className="flex items-center gap-3 text-black dark:text-white">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-white shadow-md">
              <svg width="22" height="22" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M12 40c2-10 12-18 24-18 10 0 18 4 22 11 2 4 1 9-3 12-5 3-12 5-20 5H28c-10 0-17-4-16-10Z"
                  fill="white"
                />
                <path d="M36 18c-3-7-1-14 5-14 5 0 8 5 8 11 0 6-4 9-9 8" fill="white"/>
                <path d="M26 20c-5-6-12-6-15-1-3 5-1 10 4 12" fill="white"/>
                <circle cx="42" cy="30" r="2" fill="#1e3a8a"/>
                <path d="M14 50c4 1 10 1 16 0" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-black/50 dark:text-white">HireTrack</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            <Link href="/" className={linkClasses(pathname === '/')}>Dashboard</Link>
            <Link href="/add-job" className={linkClasses(pathname === '/add-job')}>Add Job</Link>
            {!isAuthenticated && (
              <>
                <Link href="/login" className={linkClasses(pathname === '/login')}>Login</Link>
                <Link href="/register" className={linkClasses(pathname === '/register')}>Register</Link>
              </>
            )}
            <button type="button" onClick={toggleDarkMode} className="button-secondary rounded-full">
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="button-secondary rounded-full"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
