import { useState } from "react";
import API from "../utils/api";

function InstitutionForm() {
    const [form, setForm] = useState({
        name: "",
        code: "",
        city: "",
        state: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const set = (k, v) => setForm({ ...form, [k]: v });

    const validate = () => {
        const err = {};
        if (!form.name) err.name = "Name required";
        if (!form.code) err.code = "Code required";
        if (!form.city) err.city = "City required";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        const token = JSON.parse(localStorage.getItem("userInfo"))?.data?.token;
        try {
            setLoading(true);
            await axios.post("http://localhost:8000/api/v1/institutions", form, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Institution Created");
        } catch (e) {
            alert(e.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-3">
            <input placeholder="Institution Name" onChange={e => set("name", e.target.value)} />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            <input placeholder="Code" onChange={e => set("code", e.target.value)} />
            {errors.code && <p className="text-red-500 text-xs">{errors.code}</p>}

            <input placeholder="City" onChange={e => set("city", e.target.value)} />
            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}

            <button onClick={handleSubmit}>
                {loading ? "Saving..." : "Create"}
            </button>
        </div>
    );
}
export default InstitutionForm