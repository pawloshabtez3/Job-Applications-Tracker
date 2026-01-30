import AuthForm from '../../components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="page">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Create an account</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Start tracking your applications in minutes.</p>
      </div>
      <AuthForm mode="register" />
    </div>
  );
}
