import Link from 'next/link';
import { fetchJobs } from '../lib/serverApi';
import JobList from '../components/JobList';
import EmptyState from '../components/EmptyState';
import ErrorBanner from '../components/ErrorBanner';

export default async function DashboardPage() {
  const { jobs, unauthorized, error } = await fetchJobs();

  if (unauthorized) {
    return (
      <div className="page">
        <section className="hero">
          <div className="glow" />
          <div className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-300">
              Organize your search
            </p>
            <h1 className="hero-title mt-3">Stay organized on your job hunt</h1>
            <p className="hero-subtitle">
              Track applications, interviews, and offers in one clean workspace. HireTrack keeps your search focused and stress-free.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/register" className="button rounded-full">
                Get started
              </Link>
              <Link href="/login" className="button-secondary rounded-full">
                Login
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="card">
            <h3 className="card-title">Track everything</h3>
            <p className="card-subtitle">See every application, role, and status at a glance.</p>
          </div>
          <div className="card">
            <h3 className="card-title">Update fast</h3>
            <p className="card-subtitle">Edit in place, change status, and keep notes tidy.</p>
          </div>
          <div className="card">
            <h3 className="card-title">Stay focused</h3>
            <p className="card-subtitle">Filter and sort to prioritize what matters today.</p>
          </div>
        </section>
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
        <Link href="/add-job" className="button rounded-full">
          Add job
        </Link>
      </div>
      {error && <ErrorBanner message={error} />}
      {!error && jobs.length === 0 && <EmptyState />}
      {jobs.length > 0 && <JobList initialJobs={jobs} />}
    </div>
  );
}
