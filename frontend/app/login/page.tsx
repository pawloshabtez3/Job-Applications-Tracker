import AuthForm from '../../components/AuthForm';

export default function LoginPage() {
  return (
    <div className="page">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Welcome back</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Log in to manage your applications.</p>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
