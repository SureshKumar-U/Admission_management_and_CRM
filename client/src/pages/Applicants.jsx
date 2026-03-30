




import { useState, useEffect } from "react";
import axios from "axios";
import DocBadge from "../components/DocBadge";
import FeeBadge from "../components/FeedBadge";
import StatusBadge from "../components/StatusBadge";
import AddApplicantModal from "../components/AddApplicant";

const Applicants = () => {
    const [search, setSearch] = useState("");
    const [filterQuota, setFilterQuota] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isReadOnly = false; // adjust based on user role
    const userinfo = JSON.parse(localStorage.getItem("userInfo"))
    const token = userinfo?.data?.token

    // Fetch Programs & Applicants
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [progRes, appRes] = await Promise.all([
                    axios.get("http://localhost:8000/api/v1/programs", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // optional
                        },
                    }),
                    axios.get("http://localhost:8000/api/v1/applicants", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`, // optional
                        },
                    }),
                ]);
                console.log(appRes.data?.data)
                setPrograms(progRes.data?.data || []);
                setApplicants(appRes.data?.data?.applicants || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = applicants?.filter((a) => {
        const matchSearch =
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.email.toLowerCase().includes(search.toLowerCase());
        const matchQuota = filterQuota === "All" || a.quota === filterQuota;
        return matchSearch && matchQuota;
    });

    const handleAdd = async (newApplicant) => {
        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/v1/applicants",
                newApplicant,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setApplicants((prev) => [...prev, data]);
            setShowModal(false);
        } catch (err) {
            console.error("Error adding applicant:", err);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <div className="text-xl font-semibold">Applicants</div>
                    <div className="text-sm text-gray-500 mt-0.5">
                        {applicants?.length} total applicants registered
                    </div>
                </div>
                {!isReadOnly && (
                    <button
                        className="inline-flex items-center gap-1.5 text-sm font-medium px-2 py-2 rounded-lg cursor-pointer transition-all duration-150  bg-[#0c1e3c] text-white"
                        onClick={() => setShowModal(true)}
                    >
                        + New Applicant
                    </button>
                )}
            </div>

            <div className="border border-gray-400 rounded-lg overflow-hidden">
                <div className="flex items-center py-4 px-5 border-b border-gray-400 gap-3">
                    <div className="relative">
                        <span className="absolute left-2.5 top-[50%] translate-y-[-50%] text-gray-400 text-sm pointer-events-none">
                            ⌕
                        </span>
                        <input
                            className="border border-gray-400 pl-8 w-55 rounded-lg placeholder:text-sm"
                            placeholder="Search applicants..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="w-35 rounded-lg outline-none text-sm border border-gray-400"
                        value={filterQuota}
                        onChange={(e) => setFilterQuota(e.target.value)}
                    >
                        <option value="All">All Quotas</option>
                        <option>KCET</option>
                        <option>COMEDK</option>
                        <option>Management</option>
                    </select>
                    <span className="ml-auto text-sm">{filtered.length} results</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border border-collapse">
                        <thead>
                            <tr className="bg-black text-white">
                                <th className="text-xs font-semibold uppercase py-2.5 px-3 text-left border-b border-gray-400">
                                    Name
                                </th>
                                <th className="text-xs font-semibold uppercase py-2.5 px-4 text-left border-b border-gray-400">
                                    Program
                                </th>
                                <th className="text-xs font-semibold uppercase py-2.5 px-4 text-left border-b border-gray-400">
                                    Quota
                                </th>
                                <th className="text-xs font-semibold uppercase py-2.5 px-4 text-left border-b border-gray-400">
                                    Category
                                </th>
                                <th className="text-xs font-semibold uppercase py-2.5 px-3 text-left border-b border-gray-400">
                                    Documents
                                </th>
                                <th className="text-xs font-semibold uppercase py-2.5 px-4 text-left border-b border-gray-400">
                                    Fee
                                </th>
                                <th className="text-xs font-semibold uppercase py-2.5 px-4 text-left border-b border-gray-400">
                                    Status
                                </th>
                                <th className="text-xs font-semibold uppercase py-2.5 px-4 text-left border-b border-gray-400">
                                    Admission No.
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered?.map((a) => {
                              
                                const prog = programs.find((p) => p?._id === a?.program?._id);

                                return (
                                    <tr
                                        key={a.id}
                                        className="border-b last:border-none cursor-pointer"
                                        onClick={() => setSelected(a)}
                                    >
                                        <td className="p-2 border-b border-gray-400 uppercase align-middle">
                                            <div className="text-sm">{a.name}</div>
                                            <div className="text-xs text-gray-400">{a.email}</div>
                                        </td>
                                        <td className="p-2 border-b border-gray-400 uppercase align-middle">
                                            <span className="text-mono text-sm">{prog?.code}</span>
                                        </td>
                                        <td className="p-2 border-b border-gray-400 uppercase align-middle">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium py-0.5 px-2 rounded-2xl bg-blue-600 text-white">
                                                {a.quota}
                                            </span>
                                        </td>
                                        <td className="p-2 border-b border-gray-400 uppercase align-middle">
                                            <span className="inline-flex items-center gap-1 text-xs font-medium py-0.5 px-2 rounded-2xl bg-gray-400">
                                                {a.category}
                                            </span>
                                        </td>
                                        <td className="p-2 border-b border-gray-400 uppercase align-middle">
                                            <DocBadge status={a.docStatus} />
                                        </td>
                                        <td className="p-2 border-b border-gray-400 uppercase align-middle">
                                            <FeeBadge status={a.feeStatus} />
                                        </td>
                                        <td className="p-2 border-b border-gray-400 uppercase align-middle">
                                            <StatusBadge status={a.status} />
                                        </td>
                                        <td className="p-2 border-b border-gray-400 uppercase align-middle">
                                            {a.admissionNo ? (
                                                <span className="text-xs py-1 px-2 rounded-lg border border-[rgba(79,142,247,.2)]">
                                                    {a.admissionNo}
                                                </span>
                                            ) : (
                                                <span className="text-sm">—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <AddApplicantModal
                    programs={programs}    
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAdd}
                />
            )}
        </div>
    );
};

export default Applicants;