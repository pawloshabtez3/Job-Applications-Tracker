'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { JobStatus } from '../lib/types';
import { jobsApi } from '../lib/api';
import { useToast } from './ToastProvider';
import ErrorBanner from './ErrorBanner';

const STATUS_OPTIONS: JobStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

export default function JobForm() {
  const router = useRouter();
  const { push } = useToast();
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<JobStatus>('Applied');
  const [applicationDate, setApplicationDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        company,
        role,
        status,
        ...(applicationDate ? { applicationDate } : {}),
        ...(notes ? { notes } : {})
      };
      await jobsApi.create(payload);
      push({ message: 'Job added successfully', type: 'success' });
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Failed to add job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      {error && <ErrorBanner message={error} />}
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="company">
          Company
        </label>
        <input
          id="company"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="role">
          Role
        </label>
        <input
          id="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as JobStatus)}
          className="input"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="date">
          Application Date
        </label>
        <input
          id="date"
          type="date"
          value={applicationDate}
          onChange={(event) => setApplicationDate(event.target.value)}
          className="input"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="input"
          rows={4}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="button"
      >
        {loading ? 'Saving...' : 'Save job'}
      </button>
    </form>
  );
}
