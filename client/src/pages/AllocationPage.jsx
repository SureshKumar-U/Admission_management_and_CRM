import { useEffect, useState } from "react";
import axios from "axios"
import { confirmAdmission, getApplicants, getPrograms, updateApplicant } from "../api/allocations";
function AllocationPage() {
  const [applicants, setApplicants] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("userInfo"))?.data?.token;

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appRes, progRes] = await Promise.all([
        getApplicants(token),
        getPrograms(token)
      ]);
      setApplicants(appRes?.data?.applicants || []);
      setPrograms(progRes?.data || []);
      setSelectedId(appRes?.data?.applicants?.[0]?._id);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedId) return
    const appl = applicants?.find(a => a._id === selectedId);
    const prog = programs?.find(p => p._id === appl?.program._id);
    if (appl) setSelectedApplicant(appl);
    if (prog) setSelectedProgram(prog);
  }, [selectedId])

  const handleDocUpdate = (status) => {
    updateApplicant(token, { docStatus: status }, selectedApplicant._id);
    fetchData();
  };

  const handleFeeUpdate = (status) => {
    updateApplicant(token, { feeStatus: status }, selectedApplicant._id);
    fetchData();
  };

  const handleConfirm = async () => {
    try {

      await confirmAdmission(token, selectedApplicant._id);
      fetchData();
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <div className="p-5">Loading...</div>;


  return (
    <div className="grid grid-cols-[260px_1fr] gap-5 p-5">

      <div>
        <div className="text-xs text-gray-500 mb-3 uppercase">
          Applicants ({applicants?.length})
        </div>

        {applicants?.map(a => (
          <div
            key={a._id}
            onClick={() => setSelectedId(a._id)}
            className={`p-3 rounded-lg border mb-2 cursor-pointer transition
              ${selectedId === a._id
                ? "bg-blue-50 border-blue-400"
                : "bg-white border-gray-300"}`}
          >
            <div className="font-medium text-sm">{a.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {a.quota}
            </div>
          </div>
        ))}
      </div>

      {selectedApplicant && selectedProgram && (
        <div id="right_container" className="bg-white border rounded-lg p-5">

          <h2 className="text-lg font-semibold mb-4">
            👤 {selectedApplicant?.name}
          </h2>

          {/* INFO */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div>
              <p className="text-gray-500">Program</p>
              <p className="font-medium">{selectedProgram?.name}</p>
            </div>

            <div>
              <p className="text-gray-500">Quota</p>
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs">
                {selectedApplicant.quota}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Category</p>
              <span className="bg-gray-400 text-white px-2 py-0.5 rounded text-xs">
                {selectedApplicant.category}
              </span>
            </div>
          </div>

          {/* SEAT AVAILABILITY */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-xs text-gray-500 mb-2 uppercase">
              Seat Availability
            </p>

            {(() => {
              const q = selectedProgram.quotas?.find(q => q.name === selectedApplicant.quota);
              if (!q) return <p>No quota found</p>;

              const remaining = q.total - q.filled;
              const percent = (q.filled / q.total) * 100;

              return (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-2xl font-bold ${remaining === 0 ? "text-red-600" : "text-green-600"}`}>
                      {remaining}
                    </span>
                    <span className="text-sm text-gray-500">
                      remaining / {q.total}
                    </span>
                  </div>

                  <div className="w-full bg-gray-300 h-2 rounded">
                    <div
                      className={`h-2 rounded ${remaining === 0 ? "bg-red-500" : "bg-green-500"}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </>
              );
            })()}
          </div>

          {/* DOC + FEE */}
          <div className="grid grid-cols-2 gap-4 mb-4">

            {/* DOC */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Documents</p>
              <p className="mb-2">{selectedApplicant.docStatus}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDocUpdate("Submitted")}
                  className="px-2 py-1 border rounded text-xs"
                >
                  Submit
                </button>

                <button
                  onClick={() => handleDocUpdate("Verified")}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                >
                  Verify
                </button>
              </div>
            </div>

            {/* FEE */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Fee</p>
              <p className="mb-2">{selectedApplicant.feeStatus}</p>

              <button
                onClick={() => handleFeeUpdate("Paid")}
                className="px-2 py-1 bg-green-600 text-white rounded text-xs"
              >
                Mark Paid
              </button>
            </div>
          </div>

          {/* CONFIRM */}
          {selectedApplicant.status === "Confirmed" ? (
            <div className="bg-green-100 border border-green-300 p-4 rounded">
              <p className="text-green-700 font-semibold">
                Admission Confirmed
              </p>
              <p className="text-sm mt-1">{selectedApplicant.admissionNo}</p>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm mb-2">
                Confirm after document verification & fee payment
              </p>

              <button
                onClick={handleConfirm}
                disabled={
                  selectedApplicant.docStatus !== "Verified" ||
                  selectedApplicant.feeStatus !== "Paid"
                }
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                Confirm Admission
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default AllocationPage;