import Link from 'next/link';
import { fetchJobs } from '../lib/serverApi';
import JobList from '../components/JobList';
import EmptyState from '../components/EmptyState';
import ErrorBanner from '../components/ErrorBanner';

export default async function DashboardPage() {
  const { jobs, unauthorized, error } = await fetchJobs();

  if (unauthorized) {
    return (
      <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">You must be logged in to view your jobs.</p>
        <Link
          href="/login"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Track and manage your applications.</p>
        </div>
        <Link href="/add-job" className="button">
          Add job
        </Link>
      </div>
      {error && <ErrorBanner message={error} />}
      {!error && jobs.length === 0 && <EmptyState />}
      {jobs.length > 0 && <JobList initialJobs={jobs} />}
    </div>
  );
}
