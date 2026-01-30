import AuthForm from '../../components/AuthForm';

export default function LoginPage() {
  return (
    <div className="auth-shell">
      <section className="auth-panel">
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Welcome back</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">Pick up where you left off</h1>
          <p className="mt-4 text-base text-white/90">
            Your job hunt is waiting. Log in to review your pipeline, update statuses, and stay on top of follow‑ups.
          </p>

          <div className="auth-quote">
            “HireTrack keeps my applications organized so I can focus on preparing for interviews instead of chasing notes.”
            <div className="mt-4 flex items-center gap-3">
              <img
                src="/pawlos.jpg"
                alt="Pawlos H."
                className="h-10 w-10 rounded-full border border-white/40 object-cover"
              />
              <div>
                <div className="text-sm font-semibold">Pawlos H.</div>
                <div className="text-xs text-white/70">Product Designer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">Log in</p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Welcome back</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Sign in to continue tracking your applications with HireTrack.
          </p>
        </div>
        <div className="mt-6">
          <AuthForm mode="login" />
        </div>
      </section>
    </div>
  );
}
