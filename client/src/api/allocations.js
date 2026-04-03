import axios from "axios"
import { API_BASE_URL } from "../constants/constants"

export const getApplicants = async (token) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/applicants`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res.data

    } catch (err) {
        console.error("Error fetching applicants:", err);
        throw err.response?.data?.message || "Failed to fetch applicants"
    }

}

export const getPrograms = async (token) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/programs`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        return res.data
    } catch (err) {
        throw err.response?.data?.message || "Failed to fetch programs"
    }
}

export const updateApplicant = async (token, data, selectedApplicantId) => {
    await axios.put(`${API_BASE_URL}/applicants/${selectedApplicantId}`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const confirmAdmission = async (token, selectedApplicantId) => {
    try {
         await axios.post(
            `${API_BASE_URL}/allocations/confirm/${selectedApplicantId}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        if (!res.ok) throw new Error(data.message);
    } catch (err) {
        throw err.response?.data?.message || "Failed to confirm admission";
    }
};

