
export default function StatsGrid() {
  
  

  const pendingDocs = 6
  const feePending = 6
  const totalFilled = 718
  const totalIntake = 3142

  const stats = [
  { label: "Total Intake", value: "3,142", sub: "Across all programs", accent: "#14b8a6" },
  { label: "Seats Filled", value: "718", badge: "Active", badgeType: "info",   sub: `${Math.round((totalFilled / totalIntake) * 100)}% of total intake`, accent: "#378add" },
  { label: "Confirmed Admissions", value: "524", badge: "↑ 9%", badgeType: "success", sub: "vs last year", accent: "#639922" },
  { label: "Pending Actions", value: pendingDocs + feePending, badge: "74%", badgeType: "warning", sub:pendingDocs + " docs And " +feePending  + " fees", accent: "#ef9f27" },
];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border border-gray-300 rounded-xl p-4 relative overflow-hidden"
        >
          {/* Left accent bar */}
          <div
            className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
            style={{ background: s.accent }}
          />
          <div className="pl-2">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-medium text-gray-900">{s.value}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs text-gray-400">{s.sub}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}