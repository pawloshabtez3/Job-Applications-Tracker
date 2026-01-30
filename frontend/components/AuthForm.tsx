'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ErrorBanner from './ErrorBanner';
import { authApi } from '../lib/api';
import { useToast } from './ToastProvider';

type AuthFormProps = {
  mode: 'login' | 'register';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { push } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      if (mode === 'login') {
        await authApi.login(email, password);
        window.localStorage.setItem('auth_state', 'logged_in');
        window.dispatchEvent(new Event('auth_state_change'));
        push({ message: 'Logged in successfully', type: 'success' });
        router.push('/');
        router.refresh();
      } else {
        await authApi.register(email, password);
        push({ message: 'Account created', type: 'success' });
        setSuccess('Account created. You can log in now.');
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      {error && <ErrorBanner message={error} />}
      {success && <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="input"
          required
          minLength={6}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="button"
      >
        {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
      </button>
      {mode === 'login' ? (
        <p className="text-xs text-slate-500">
          Your data is never shared with any third party.
        </p>
      ) : null}
      <p className="text-sm text-slate-600">
        {mode === 'login' ? (
          <>
            Don&apos;t have an account yet?{' '}
            <Link href="/register" className="font-semibold text-purple-600">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-purple-600">
              Log in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
