import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) navigate("/", { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email,
        password
      });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-[#141720] text-white border border-[#252a3a] rounded-lg p-9 w-95">
        <div className="text-2xl mb-4">🎓</div>
        <div className="text-xl font-semibold mb-1">EduMerge CRM</div>
        <div className="text-[#555d7a] text-sm mb-7">Admission Management System</div>

        {error && (
          <div className="text-red-500 text-sm mb-2">{error}</div>
        )}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="p-1 border border-[#252a3a] focus:border-gray-500 focus:outline-none focus:ring-0 rounded-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm">Password</label>
            <input
              type="password"
              className="p-1 border border-[#252a3a] focus:border-gray-500 focus:outline-none focus:ring-0 rounded-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer bg-[#4f8ef7] text-center px-1.5 py-2 font-medium border rounded-md w-full text-white border-none"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link className="text-[#4f8ef7]" to={"/signup"}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;