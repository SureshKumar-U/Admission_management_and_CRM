const TopNav = ()=> {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 flex-shrink-0">
      <div>
        <h1 className="text-base font-medium text-gray-900">Admissions Dashboard</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Academic Year 2024–25 &nbsp;·&nbsp; Last updated just now
        </p>
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-400">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Search students...
        </div>


        {/* CTA */}
        <button
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-white text-xs font-medium transition-opacity hover:opacity-90"
          style={{ background: "#0c1e3c" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          New Application
        </button>
      </div>
    </header>
  );
}

export default TopNav