import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VantaBackground from "../components/VantaBackground";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    roll: "",
    department: "",
    email: "",
    password: "",
  });

  // Check if all fields are filled
  const isFormValid = Object.values(form).every(
    (value) => value.trim() !== ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <VantaBackground>
      <div className="flex items-center justify-center w-full px-4">
        <div
          className="w-full max-w-md backdrop-blur-xl bg-white/10
            border border-white/20 rounded-2xl shadow-2xl
            p-8 text-white"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Sign in to your account
          </h1>

          <form className="space-y-4">
            {/* Name */}
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-white/20
                placeholder-white/60 outline-none"
            />

            {/* Roll No */}
            <input
              name="roll"
              placeholder="Roll No"
              value={form.roll}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-white/20
                placeholder-white/60 outline-none"
            />

            {/* Department */}
            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-white/20
                placeholder-white/60 outline-none"
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-white/20
                placeholder-white/60 outline-none"
            />

            {/* Password */}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg bg-white/20
                placeholder-white/60 outline-none"
            />

            {/* Button */}
            <button
              type="button"
              disabled={!isFormValid}
              onClick={() => navigate("/dashboard")}
              className={`
                w-full py-3 rounded-xl font-semibold transition
                ${
                  isFormValid
                    ? "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
                    : "bg-gray-500/40 cursor-not-allowed"
                }
              `}
            >
              Sign in
            </button>

            {/* Privacy note */}
            <p className="text-xs text-white/60 text-center mt-2">
              All fields are required to continue
            </p>
          </form>
        </div>
      </div>
    </VantaBackground>
  );
};

export default Login;
