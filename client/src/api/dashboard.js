import axios from "axios";

import { API_BASE_URL } from "../constants/constants";


 export const getStats = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/stats?academicYear=2025-26`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
        return error.response?.data?.message || "Failed to fetch stats";    
    }
  }


  export   const getRecentApplications = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applicants/recent`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return error.response?.data?.message || "Failed to fetch recent applications";
    }
  }