function FeeBadge({ status }) {
  return <span className={`bg-black rounded-2xl px-2.5 py-0.5 text-xs inline-flex items-center gap-1 font-medium ${status === "Paid" ? "text-green-500" : "text-amber-500"}`}>{status === "Paid" ? "✓ Paid" : "Pending"}</span>;
}

export default FeeBadge