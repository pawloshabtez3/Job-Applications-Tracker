import JobForm from '../../components/JobForm';

export default function AddJobPage() {
  return (
    <div className="page">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Add a job</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Track a new application with key details.</p>
      </div>
      <JobForm />
    </div>
  );
}
