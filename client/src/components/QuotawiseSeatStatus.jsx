import { programs } from "../data/admissionData";

const QuotaWiseSeatStatus = ()=>{
    return (
        <>
           <div className=" border border-gray-300 rounded-lg p-5 mb-5">
          <div className="text-md font-semibold flex mb-4.5  items-center gap-2 ">Quota-wise Seat Status</div>
          {programs?.map(p => (
            <div key={p.id} className="mb-4">
              <div className="flex items-center mb-4 gap-2">
                <span className="font-semibold text-md" >{p.code}</span>
                <span className=" text-xs" >{p.name}</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {Object.entries(p.quotas).map(([q, v]) => {
                  const pct = Math.round((v.filled / v.total) * 100);
                  const color = pct >= 100 ? "red-600" : pct >= 70 ? "amber-500" : "green-800";
                  return (
                    <div className="border border-gray-300 px-3 py-5 rounded-lg " key={q}>
                      <div className="text-xs tw font-semibold uppercase">{q}</div>
                      <div className="flex gap-0.5 items-baseline my-2">
                        <span className={` text-${color} font-semibold text-sm`}>{v.filled}</span>
                        <span className=" text-sm">/{v.total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-300 rounded-sm overflow-hidden">
                        <div className= {`h-full transition-all duration-400 ease-in-out bg-${color}`} style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        </>
    )
}

export default QuotaWiseSeatStatus