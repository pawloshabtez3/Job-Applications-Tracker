import { cookies } from 'next/headers';
import type { Job } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchJobs = async () => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${API_URL}/jobs`, {
    headers: cookieHeader ? { cookie: cookieHeader } : {},
    credentials: 'include',
    cache: 'no-store'
  });

  if (res.status === 401) {
    return { jobs: [] as Job[], unauthorized: true };
  }

  if (!res.ok) {
    return { jobs: [] as Job[], unauthorized: false, error: 'Failed to load jobs' };
  }

  const data = await res.json();
  return { jobs: data.jobs as Job[], unauthorized: false };
};
