'use client';

import { useState } from 'react';
import type { Job, JobStatus } from '../lib/types';
import StatusBadge from './StatusBadge';

const STATUS_OPTIONS: JobStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

type JobCardProps = {
  job: Job;
  onUpdate: (jobId: string, payload: Job) => Promise<void>;
  onDelete: (jobId: string) => Promise<void>;
};

export default function JobCard({ job, onUpdate, onDelete }: JobCardProps) {
  const [status, setStatus] = useState<JobStatus>(job.status);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [company, setCompany] = useState(job.company);
  const [role, setRole] = useState(job.role);
  const [applicationDate, setApplicationDate] = useState(job.applicationDate ? job.applicationDate.slice(0, 10) : '');
  const [notes, setNotes] = useState(job.notes || '');

  const handleStatusChange = async (nextStatus: JobStatus) => {
    setStatus(nextStatus);
    setLoading(true);
    try {
      await onUpdate(job._id, { ...job, status: nextStatus });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onUpdate(job._id, {
        ...job,
        company,
        role,
        status,
        applicationDate: applicationDate || undefined,
        notes: notes || undefined
      });
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCompany(job.company);
    setRole(job.role);
    setApplicationDate(job.applicationDate ? job.applicationDate.slice(0, 10) : '');
    setNotes(job.notes || '');
    setEditing(false);
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          {editing ? (
            <div className="space-y-2">
              <input value={company} onChange={(event) => setCompany(event.target.value)} className="input" />
              <input value={role} onChange={(event) => setRole(event.target.value)} className="input" />
              <input type="date" value={applicationDate} onChange={(event) => setApplicationDate(event.target.value)} className="input" />
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{job.company}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{job.role}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Applied on {job.applicationDate ? new Date(job.applicationDate).toLocaleDateString() : 'N/A'}
              </p>
            </>
          )}
        </div>
        <StatusBadge status={status} />
      </div>
      {editing ? (
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="input mt-3"
          rows={3}
        />
      ) : (
        job.notes && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{job.notes}</p>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(event) => handleStatusChange(event.target.value as JobStatus)}
          className="input max-w-[180px]"
          disabled={loading}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {editing ? (
          <>
            <button type="button" onClick={handleSave} className="button" disabled={loading}>
              Save
            </button>
            <button type="button" onClick={handleCancel} className="button-secondary" disabled={loading}>
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="button-secondary"
          >
            Edit
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(job._id)}
          className="button-secondary"
          disabled={loading}
        >
          Delete
        </button>
        {loading && <span className="text-xs text-slate-500 dark:text-slate-400">Saving...</span>}
      </div>
    </div>
  );
}
