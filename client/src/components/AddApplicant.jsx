import { useState } from "react";
import axios from "axios";

function AddApplicantModal({ programs, institutionId, academicYear, onClose, onSubmit }) {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "Male",
        category: "GM",
        entryType: "Regular",
        admissionMode: "Government",
        quota: "KCET",
        marks: "",
        program: programs[0]?._id || programs[0]?.id || "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

    // Basic validation
    const validateForm = () => {
        if (!form.name || !form.program || !form.quota) {
            setError("Please fill all required fields (*)");
            return false;
        }

        if (form.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form.email)) {
                setError("Invalid email format");
                return false;
            }
        }
        if (form.phone && form.phone.length !== 10) {
            setError("Phone number must be 10 digits");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async () => {

        if (!validateForm()) return;

        setLoading(true);

        try {
            const token = JSON.parse(localStorage.getItem("userInfo"))?.data?.token;
            const { _id, academicYear } = programs.find((p) => p?.institution?._id)
            // Construct payload
            const payload = {
                name: form.name,
                email: form.email,
                phone: form.phone,
                dob: form.dob,
                gender: form.gender,
                category: form.category,
                address: form.address,
                program: form.program,
                institution: _id,
                academicYear: academicYear,
                entryType: form.entryType,
                admissionMode: form.admissionMode,
                quota: form.quota,
                marks: form.marks,
            };

            const response = await axios.post(
                "http://localhost:8000/api/v1/applicants",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Call parent callback to refresh list
            onSubmit(response.data);
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to add applicant");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="w-full bg-white max-w-140 max-h-[85vh] overflow-y-auto rounded-lg">
                <div className="px-5 pt-5 pb-4 border-b flex items-center justify-between">
                    <div className="font-semibold text-base">New Applicant</div>
                    <button className="text-xs border-0 cursor-pointer" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="text-sm p-3">
                    {error && <div className="text-red-500 mb-3">{error}</div>}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label>Full Name *</label>
                            <input
                                className="w-full border rounded-lg p-1.5"
                                value={form.name}
                                onChange={(e) => set("name", e.target.value)}
                                placeholder="Student full name"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label>Email</label>
                            <input
                                type="email"
                                className="w-full border rounded-lg p-1.5"
                                value={form.email}
                                onChange={(e) => set("email", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label>Phone</label>
                            <input
                                className="w-full border rounded-lg p-1.5"
                                value={form.phone}
                                onChange={(e) => set("phone", e.target.value)}
                                maxLength={10}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                className="w-full border rounded-lg p-1.5"
                                value={form.dob}
                                onChange={(e) => set("dob", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label>Program *</label>
                            <select
                                className="w-full border rounded-lg p-1.5"
                                value={form.program}
                                onChange={(e) => set("program", e.target.value)}
                            >
                                {programs.map((p) => (
                                    <option key={p._id || p.id} value={p._id || p.id}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label>Quota *</label>
                            <select
                                className="w-full border rounded-lg p-1.5"
                                value={form.quota}
                                onChange={(e) => set("quota", e.target.value)}
                            >
                                <option>KCET</option>
                                <option>COMEDK</option>
                                <option>Management</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label>Entry Type</label>
                            <select
                                className="w-full border rounded-lg p-1.5"
                                value={form.entryType}
                                onChange={(e) => set("entryType", e.target.value)}
                            >
                                <option>Regular</option>
                                <option>Lateral</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label>Admission Mode</label>
                            <select
                                className="w-full border rounded-lg p-1.5"
                                value={form.admissionMode}
                                onChange={(e) => set("admissionMode", e.target.value)}
                            >
                                <option>Government</option>
                                <option>Management</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5 col-span-full">
                            <label>Address</label>
                            <input
                                className="w-full border rounded-lg p-1.5"
                                value={form.address}
                                onChange={(e) => set("address", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label>Marks / Score</label>
                            <input
                                type="number"
                                className="w-full border rounded-lg p-1.5"
                                value={form.marks}
                                onChange={(e) => set("marks", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2.5 py-4 px-5 border-t border-gray-400">
                    <button
                        className="border py-1 px-2 text-sm"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="cursor-pointer bg-[#0c1e3c] text-white py-1 px-2 rounded"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Applicant"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddApplicantModal;