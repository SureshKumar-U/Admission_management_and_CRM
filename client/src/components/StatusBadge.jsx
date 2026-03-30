const StatusBadge =({ status })=> {
  const map = {
    Confirmed: "bg-green-700",
    Pending: "bg-amber-500",
    Rejected: "bg-red-500",
  };

  return <span className={`inline-flex items-center gap-1 text-xs font-medium  py-0.5 px-2.5 rounded-2xl ${map[status]} items-center gap-1.5 px-1.5 py-0.5 rounded-xl`}><span className="w-1 h-1 rounded-full  bg-current inline-block p-0" />{status}</span>;
}

export default StatusBadge