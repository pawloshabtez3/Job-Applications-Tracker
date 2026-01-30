import AuthForm from '../../components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="auth-shell">
      <section className="auth-panel">
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Get organized faster</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">Make every application count</h1>
          <p className="mt-4 text-base text-white/90">
            HireTrack keeps your job hunt in one place so you can focus on the interviews, not the spreadsheets.
          </p>

          <div className="auth-quote">
            “Since switching to HireTrack, I stopped losing track of follow‑ups and finally felt in control of my search.
            The clarity alone is a game‑changer.”
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
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">Create your account</p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Let’s get you started</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Join HireTrack and track applications, interviews, and offers with confidence.
          </p>
        </div>
        <div className="mt-6">
          <AuthForm mode="register" />
        </div>
      </section>
    </div>
  );
}
