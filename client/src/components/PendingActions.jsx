
import DocBadge from "./DocBadge"

const PendingActions = (    {pendingActions}) => {
    const { pendingDocs, feePending } = pendingActions;

    return (
        <>
            <div className="mb-5 p-5 border border-gray-300 rounded-lg">
                <div className="mb-5 font-semibold flex items-center ">Pending Actions</div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                    <div>
                        <div className="text-sm mb-2.5 uppercase" >Documents Pending</div>
                        {pendingDocs?.length > 0 && pendingDocs?.map(a => (
                            <div className=" text-sm flex items-center gap-2.5 p-2.5 rounded-md mb-2.5  bg-gray-300" key={a.id}>
                                <span>{a.name}</span>
                                <DocBadge status={a.docStatus} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="text-sm mb-2.5 uppercase">Fee Pending</div>
                        {feePending?.length > 0 && feePending?.map(a => (
                            <div className="bg-gray-300 text-sm flex items-center gap-2.5 p-2.5 rounded-md mb-2.5"  key={a.id}>
                                <span>{a.name}</span>
                                <span className="inline-flex items-center font-medium py-0.5 px-2  gap-2 bg-black text-amber-500 rounded-2xl text-xs"><span className="w-1.5 h-1.5 rounded-[50%] bg-current inline-block" />Fee Due</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PendingActions