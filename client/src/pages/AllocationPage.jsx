import { useEffect, useState } from "react";
import axios from "axios"
function AllocationPage() {
  const [applicants, setApplicants] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("userInfo"))?.data?.token;

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [appRes, progRes] = await Promise.all([
        axios.get("http://localhost:8000/api/v1/applicants", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/v1/programs", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setApplicants(appRes?.data?.data?.applicants || []);
      setPrograms(progRes?.data?.data || []);

      setSelectedId(appRes?.data?.applicants?.[0]?._id);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= DERIVED =================
  const appl = applicants?.find(a => a._id === selectedId);
  const prog = programs?.find(p => p._id === appl?.program._id);

  // ================= ACTIONS =================

  const updateApplicant = async (data) => {
    await fetch(`http://localhost:8000/api/v1/applicants/${appl._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    fetchData();
  };

  const handleDocUpdate = (status) => {
    updateApplicant({ docStatus: status });
  };

  const handleFeeUpdate = (status) => {
    updateApplicant({ feeStatus: status });
  };

  const handleConfirm = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/allocations/confirm/${appl._id}`,
          {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Admission Confirmed: " + data.data.admissionNo);
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // ================= UI =================
  if (loading) return <div className="p-5">Loading...</div>;


  return (
    <div className="grid grid-cols-[260px_1fr] gap-5 p-5">

      {/* ================= LEFT ================= */}
      <div>
        <div className="text-xs text-gray-500 mb-3 uppercase">
          Applicants ({applicants?.length})
        </div>

        {applicants.map(a => (
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

      {/* ================= RIGHT ================= */}
      {appl && prog && (
        <div className="bg-white border rounded-lg p-5">

          <h2 className="text-lg font-semibold mb-4">
            👤 {appl.name}
          </h2>

          {/* INFO */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div>
              <p className="text-gray-500">Program</p>
              <p className="font-medium">{prog.name}</p>
            </div>

            <div>
              <p className="text-gray-500">Quota</p>
              <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs">
                {appl.quota}
              </span>
            </div>

            <div>
              <p className="text-gray-500">Category</p>
              <span className="bg-gray-400 text-white px-2 py-0.5 rounded text-xs">
                {appl.category}
              </span>
            </div>
          </div>

          {/* SEAT AVAILABILITY */}
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p className="text-xs text-gray-500 mb-2 uppercase">
              Seat Availability
            </p>

            {(() => {
              const q = prog.quotas?.find(q => q.name === appl.quota);
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
              <p className="mb-2">{appl.docStatus}</p>

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
              <p className="mb-2">{appl.feeStatus}</p>

              <button
                onClick={() => handleFeeUpdate("Paid")}
                className="px-2 py-1 bg-green-600 text-white rounded text-xs"
              >
                Mark Paid
              </button>
            </div>
          </div>

          {/* CONFIRM */}
          {appl.status === "Confirmed" ? (
            <div className="bg-green-100 border border-green-300 p-4 rounded">
              <p className="text-green-700 font-semibold">
                Admission Confirmed
              </p>
              <p className="text-sm mt-1">{appl.admissionNo}</p>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm mb-2">
                Confirm after document verification & fee payment
              </p>

              <button
                onClick={handleConfirm}
                disabled={
                  appl.docStatus !== "Verified" ||
                  appl.feeStatus !== "Paid"
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