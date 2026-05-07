import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import api from "../api/axios.js";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const { email } = formData;

  // 🔥 TEMP ADMIN LOGIN (for testing only)
  if (email === "admin@ecocart.com") {
    const adminUser = {
      id: 1,
      email: "admin@ecocart.com",
      name: "Admin",
      role: "admin",
    };

    localStorage.setItem("user", JSON.stringify(adminUser));
    localStorage.setItem("token", "fake-admin-token");

    // optional: notify navbar / listeners
    window.dispatchEvent(
      new CustomEvent("user-logged-in", { detail: adminUser })
    );

    navigate("/admin");
    setLoading(false);
    return;
  }

  // 🔽 Normal login flow
  try {
    const response = await api.post("/login", formData);
    const { id, firstName, lastName, email, token, role } = response.data;

    const user = { id, firstName, lastName, email, role };

    window.dispatchEvent(
      new CustomEvent("user-logged-in", { detail: user })
    );

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (err) {
    setError(
      err.response?.data?.message || "Login failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-linear-to-br from-white to-green-800/20">
      {/* Header */}
      <header className="px-24 py-6 boarder-b">
        <Link to={"/"} className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full">
            <Leaf className="text-white" />
          </div>
          <span className="font-serif text-xl font-semibold">EcoCart</span>
        </Link>
      </header>

      <div className=" h-[91vh] px-24 flex items-center justify-center ">
        {/* Left side - Keep as before */}
        <div className="flex-1 pr-8">
          {" "}
          {/* Reduced from pr-16 to pr-8 */}
          <div className="max-w-lg">
            <div className="flex items-center gap-2 px-4 py-2 mb-6 text-sm rounded-2xl bg-green-900/15 w-fit">
              <Leaf className="w-4 h-4" />
              <span>Smart Sustainable Shopping</span>
            </div>

            <h1 className="mb-6 text-6xl font-serif font-semibold">
              Welcome back to{" "}
              <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
                EcoCart
              </span>
            </h1>

            <p className="mb-8 text-lg text-gray-600">
              Sign in to continue your sustainable shopping journey. Track your
              environmental impact, access personalized recommendations, and
              make greener choices.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Leaf className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-700">
                  Track your carbon footprint savings
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Leaf className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-700">
                  Access personalized eco-recommendations
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Leaf className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-700">
                  Save your favorite sustainable products
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="flex-1 max-w-md ml-8">
          {" "}
          {/* Added ml-8 to bring closer */}
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="mb-2 text-2xl font-semibold">
              Sign in to your account
            </h2>
            <p className="mb-8 text-gray-500">
              Enter your credentials to access your EcoCart dashboard
            </p>

            {error && (
              <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-700 hover:text-green-800"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Remember Me & Submit */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-8 py-3 text-white bg-green-800 rounded-xl hover:bg-green-900 disabled:opacity-50 transition"
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="flex items-center justify-center w-full gap-3 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-green-700 hover:text-green-800"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="px-24 py-6 mt-8 border-t border-gray-200">
        <div className="text-center text-gray-500">
          <p className="text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            © 2024 EcoCart. Making sustainable shopping accessible.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
