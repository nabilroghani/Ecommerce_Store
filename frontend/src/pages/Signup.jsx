import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-repo-omega.vercel.app/api/register",
        formData,
      );
      alert("User Registered Successfully ✅");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Account
        </h2>

        <form onSubmit={handleFormData} className="space-y-5">
          {/* Username */}
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />

          {/* Email */}
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="text" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-yellow-50 focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Secret Admin Code (Optional)"
            value={formData.adminCode}
            onChange={(e) =>
              setFormData({ ...formData, adminCode: e.target.value })
            }
          />

          {/* Password */}
          <input
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
