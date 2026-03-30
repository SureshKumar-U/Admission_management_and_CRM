function DocBadge({ status }) {
  const map = { Verified: "text-green-500", Submitted: "text-blue-500", Pending: "text-amber-500" };
  return <span className={`bg-black rounded-2xl px-2.5 py-0.5 text-xs inline-flex items-center gap-1 font-medium ${map[status] || "gray"}`}>{status}</span>;
}

export default DocBadge