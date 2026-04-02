import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const validateForm = () => {
    if (!email || !password || !role || !name) {
      setError("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    setError("");
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate("/");
    } catch (err) {

      setError(
        err|| "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#141720] text-white border border-[#252a3a] rounded-lg p-9 w-95">
        <div className="text-2xl mb-4">🎓</div>
        <div className="text-xl font-semibold mb-1">EduMerge CRM</div>
        <div className="text-[#555d7a] text-sm mb-7">
          Admission Management System
        </div>

        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}


        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm">Enter Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 border border-[#252a3a] focus:border-gray-500 focus:outline-none focus:ring-0 rounded-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm">Enter Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-1 border border-[#252a3a] focus:border-gray-500 focus:outline-none focus:ring-0 rounded-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm">Enter Your Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-1 border border-[#252a3a] focus:border-gray-500 focus:outline-none focus:ring-0 rounded-sm "
          />
        </div>

        <div className="flex flex-col gap-1.5 mb-5">
          <label className="text-sm">Select Your Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-1 border border-[#252a3a] focus:border-gray-500 focus:outline-none focus:ring-0 rounded-sm bg-[#141720] text-white"
          >
            <option value="">-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="Admission Officer">Admission Officer</option>
            <option value="Management">Management</option>
          </select>
        </div>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="cursor-pointer bg-[#4f8ef7] py-2 rounded-md w-full font-medium disabled:opacity-50"
        >
          {loading ? "Signing Up..." : "Sign Up →"}
        </button>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link className="text-[#4f8ef7]" to={"/signin"}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;