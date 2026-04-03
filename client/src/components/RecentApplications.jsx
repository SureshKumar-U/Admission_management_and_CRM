// import { applicants, programs } from "../data/admissionData";
import PendingActions from "./PendingActions";
import StatusBadge from "./StatusBadge";

const RecentApplications = ({ recentapplications }) => {



  return <>
    <div>


      <div className="border border-gray-300 rounded-lg p-5 mb-5">
        <div className="text-md font-semibold flex mb-4.5  items-center gap-2"> Recent Applicants</div>
        <table className="w-full border-collapse ">
          <thead className="bg-[#1c2030]  text-white"><tr className="rounded-l-sm"><th className=" py-2 px-4 text-sm text-left">Name</th><th className="py-2 px-4 text-sm text-left">Program</th><th className="py-2 px-4 text-sm text-left">Status</th></tr></thead>
          <tbody>
            {recentapplications?.length > 0 && recentapplications?.map(a => {
              const { program } = a;
              return (
                <tr className="border-b border-gray-300 last:border-b-0" key={a.id}>
                  <td className="py-3 px-4 text-sm">{a.name}</td>
                  <td className="py-3 px-4 text-sm "><span className="text-sm" >{program?.code}</span></td>
                  <td className="py-3 px-4  text-sm "><StatusBadge status={a.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
      {/* <PendingActions /> */}
    </div>
  </>
}

export default RecentApplications