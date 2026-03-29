const StatusBadge =({ status })=> {
  const map = {
    Confirmed: "bg-green-700",
    Pending: "bg-amber-500",
    Rejected: "bg-red-500",
  };

  return <span className={`inline-flex ${map[status]} items-center gap-2 px-1.5 py-1 rounded-xl`}><span className="w-1.5 h-1.5 rounded-[50%]  bg-current inline-block" />{status}</span>;
}

export default StatusBadge