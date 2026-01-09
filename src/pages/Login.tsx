import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";

const Login = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [remember, setRemember] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    if (!vantaRef.current) return;

    const effect = CLOUDS({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      skyColor: 0x020617,
      cloudColor: 0x4f46e5,
      cloudShadowColor: 0x000000,
      sunColor: 0xffffff,
      speed: 0.6,
    });

    return () => effect.destroy();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.mobile.trim() !== "" &&
    form.password.trim() !== "";

  return (
    <section
      ref={vantaRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
          <h1 className="text-2xl font-bold text-center text-indigo-400 mb-6">
            Sign in to EventArc AI
          </h1>

          <div className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-black/40 border border-white/20 focus:border-indigo-400 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-black/40 border border-white/20 focus:border-indigo-400 outline-none"
            />

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-black/40 border border-white/20 focus:border-indigo-400 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-black/40 border border-white/20 focus:border-indigo-400 outline-none"
            />

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm text-white/70">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-indigo-500"
                />
                Remember me
              </label>
            </div>

            <button
              disabled={!isFormValid}
              onClick={() => navigate("/dashboard")}
              className={`w-full py-2 rounded-xl font-semibold transition
                ${
                  isFormValid
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105"
                    : "bg-white/20 cursor-not-allowed"
                }
              `}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
