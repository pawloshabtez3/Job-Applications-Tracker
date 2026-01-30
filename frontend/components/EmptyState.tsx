import Link from 'next/link';

export default function EmptyState() {
  return (
    <div className="card text-center">
      <h3 className="card-title">No job applications yet</h3>
      <p className="card-subtitle mt-2">Start tracking by adding your first application.</p>
      <Link
        href="/add-job"
        className="button mt-4"
      >
        Add Job
      </Link>
    </div>
  );
}
