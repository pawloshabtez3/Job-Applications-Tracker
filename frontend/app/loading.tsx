export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 dark:bg-slate-950/90">
      <div className="flex flex-col items-center gap-4">
        <div className="logo-spin grid h-16 w-16 place-items-center rounded-full bg-blue-600 text-white shadow-lg">
          <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M12 40c2-10 12-18 24-18 10 0 18 4 22 11 2 4 1 9-3 12-5 3-12 5-20 5H28c-10 0-17-4-16-10Z"
              fill="white"
            />
            <path d="M36 18c-3-7-1-14 5-14 5 0 8 5 8 11 0 6-4 9-9 8" fill="white"/>
            <path d="M26 20c-5-6-12-6-15-1-3 5-1 10 4 12" fill="white"/>
            <circle cx="42" cy="30" r="2" fill="#1e3a8a"/>
            <path d="M14 50c4 1 10 1 16 0" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="text-lg font-semibold text-slate-900 dark:text-white">HireTrack</div>
      </div>
    </div>
  );
}
