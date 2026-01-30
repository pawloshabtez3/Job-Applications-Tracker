'use client';

import { useMemo, useState } from 'react';
import type { Job, JobStatus } from '../lib/types';
import JobCard from './JobCard';
import { jobsApi } from '../lib/api';
import { useToast } from './ToastProvider';
import ErrorBanner from './ErrorBanner';

const STATUS_OPTIONS: Array<JobStatus | 'All'> = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function JobList({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filter, setFilter] = useState<JobStatus | 'All'>('All');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [error, setError] = useState('');
  const { push } = useToast();

  const filteredJobs = useMemo(() => {
    const filtered = filter === 'All' ? jobs : jobs.filter((job) => job.status === filter);
    return [...filtered].sort((a, b) => {
      const aDate = new Date(a.applicationDate || a.createdAt || 0).getTime();
      const bDate = new Date(b.applicationDate || b.createdAt || 0).getTime();
      return sort === 'newest' ? bDate - aDate : aDate - bDate;
    });
  }, [jobs, filter, sort]);

  const handleUpdate = async (jobId: string, payload: Job) => {
    setError('');
    try {
      const updatePayload = {
        company: payload.company,
        role: payload.role,
        status: payload.status,
        ...(payload.applicationDate ? { applicationDate: payload.applicationDate } : {}),
        ...(payload.notes ? { notes: payload.notes } : {})
      };
      const { job } = await jobsApi.update(jobId, updatePayload);
      setJobs((prev) => prev.map((item) => (item._id === jobId ? job : item)));
      push({ message: 'Job updated', type: 'success' });
    } catch (err: any) {
      setError(err?.message || 'Failed to update job');
    }
  };

  const handleDelete = async (jobId: string) => {
    const confirmed = window.confirm('Delete this job application?');
    if (!confirmed) {
      return;
    }
    setError('');
    try {
      await jobsApi.remove(jobId);
      setJobs((prev) => prev.filter((item) => item._id !== jobId));
      push({ message: 'Job deleted', type: 'success' });
    } catch (err: any) {
      setError(err?.message || 'Failed to delete job');
    }
  };

  return (
    <section className="space-y-6">
      {error && <ErrorBanner message={error} />}
      <div className="card flex flex-wrap items-center gap-3">
        <label className="text-sm text-slate-600 dark:text-slate-300" htmlFor="status-filter">
          Filter by status
        </label>
        <select
          id="status-filter"
          value={filter}
          onChange={(event) => setFilter(event.target.value as JobStatus | 'All')}
          className="input max-w-[180px]"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <label className="text-sm text-slate-600 dark:text-slate-300" htmlFor="sort-filter">
          Sort by
        </label>
        <select
          id="sort-filter"
          value={sort}
          onChange={(event) => setSort(event.target.value as 'newest' | 'oldest')}
          className="input max-w-[180px]"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <span className="text-xs text-slate-500 dark:text-slate-400">{filteredJobs.length} result(s)</span>
      </div>
      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  );
}
