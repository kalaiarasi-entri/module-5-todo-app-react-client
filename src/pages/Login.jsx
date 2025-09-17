import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("authChange"));
      }
      navigate("/tasks");
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      {err && <div className="text-red-500 mb-2">{err}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <button className="btn bg-blue-600">Login</button>
          <Link to="/register" className="text-sm text-blue-400">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
