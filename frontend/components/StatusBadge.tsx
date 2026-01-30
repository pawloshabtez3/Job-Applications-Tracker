import type { JobStatus } from '../lib/types';

const colors: Record<JobStatus, string> = {
  Applied: 'badge bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200',
  Interview: 'badge bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200',
  Offer: 'badge bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
  Rejected: 'badge bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200'
};

export default function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span className={colors[status]}>{status}</span>
  );
}
