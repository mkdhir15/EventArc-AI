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

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [rememberMe, setRememberMe] = useState(false);

  // 🔐 All fields must be filled
  const isFormValid = Object.values(form).every(
    (value) => value.trim() !== ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    // 🔒 Example usage of remember me
    if (rememberMe) {
      localStorage.setItem("rememberUser", "true");
    }

    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    // later you can connect Supabase reset here
    navigate("/forgot-password");
  };

  const inputClass = (field: string) =>
    `w-full p-2.5 rounded-lg outline-none transition
     bg-white/20 placeholder-white/60
     ${
       touched[field] && !form[field as keyof typeof form]
         ? "border border-red-400"
         : "border border-white/20"
     }`;

  return (
    <VantaBackground>
      <div className="flex items-center justify-center w-full px-4">
        <div
          className="
            w-full max-w-md
            backdrop-blur-xl bg-white/10
            border border-white/20
            rounded-2xl shadow-2xl
            p-8 text-white
          "
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Sign in to your account
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("name")}
            />

            <input
              name="roll"
              placeholder="Roll Number"
              value={form.roll}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("roll")}
            />

            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("department")}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("email")}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass("password")}
            />

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-indigo-500"
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-indigo-300 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`
                w-full py-3 rounded-xl font-semibold transition-all
                ${
                  isFormValid
                    ? "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
                    : "bg-gray-500/40 cursor-not-allowed opacity-60"
                }
              `}
            >
              Sign in
            </button>

            {!isFormValid && (
              <p className="text-xs text-white/60 text-center">
                Please fill all fields to continue
              </p>
            )}
          </form>
        </div>
      </div>
    </VantaBackground>
  );
};

export default Login;
