import axios from "axios";
import { API_BASE_URL } from "../constants/constants";


export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Login failed. Try again.";
  }
}

export const register = async (name, email, password) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  }
  catch (err) {
    throw err.response?.data?.message || "Registration failed. Try again.";
  }
}


export const logout = () => {
  localStorage.removeItem("userInfo");
}


export const getToken = () => {
  return JSON.parse(localStorage.getItem("userInfo"))?.data?.token || null;
}   