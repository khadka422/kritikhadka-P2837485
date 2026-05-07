import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Leaf,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Check,
} from "lucide-react";
import api from "../api/axios.js";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess("");

    try {
      const response = await api.post("/register", formData);
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      // localStorage.setItem("token", response.data.user.token);
      // window.dispatchEvent(
      //   new CustomEvent("user-logged-in", {
      //     detail: response.data.user,
      //   }),
      // );
      alert("Registration Successful. You can login now.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration Failed. Please try again.");
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

      <div className="flex items-center justify-center min-h-[80vh] px-24">
        {/* Left side - Registration Info */}
        <div className="flex-1 pr-8">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 px-4 py-2 mb-6 text-sm rounded-2xl bg-green-900/15 w-fit">
              <Leaf className="w-4 h-4" />
              <span>Start Your Sustainable Journey</span>
            </div>

            <h1 className="mb-6 text-6xl font-serif font-semibold">
              Join{" "}
              <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
                EcoCart
              </span>{" "}
              Today
            </h1>

            <p className="mb-8 text-lg text-gray-600">
              Create an account to unlock personalized eco-recommendations,
              track your environmental impact, and join a community of conscious
              shoppers.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-700">
                  Personalized carbon footprint tracking
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-700">
                  AI-powered sustainable recommendations
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-700">
                  Exclusive access to eco-friendly deals
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-700">
                  Join a community of like-minded shoppers
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-8">
              <div className="text-center">
                <div className="font-serif text-2xl font-semibold text-green-800">
                  10K+
                </div>
                <div className="text-sm text-gray-600">Eco Products</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl font-semibold text-green-800">
                  50K+
                </div>
                <div className="text-sm text-gray-600">Happy Members</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl font-semibold text-green-800">
                  100T
                </div>
                <div className="text-sm text-gray-600">CO₂ Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Registration Form */}
        <div className="flex-1 max-w-md ml-8">
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="mb-2 text-2xl font-semibold">Create Your Account</h2>
            <p className="mb-8 text-gray-500">
              Fill in your details to start shopping sustainably
            </p>

            {error && (
              <div className="p-3 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 mb-6 text-sm text-green-700 bg-green-100 rounded-lg">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>

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
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 mt-1 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-green-700 hover:text-green-800 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-green-700 hover:text-green-800 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 px-8 py-3 text-white bg-green-800 rounded-xl hover:bg-green-900 disabled:opacity-50 transition"
              >
                {loading ? "Creating Account..." : "Create Account"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">
                Or sign up with
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

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-green-700 hover:text-green-800"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Demo note */}
          <div className="p-4 mt-6 text-sm text-gray-600 bg-green-50 rounded-xl">
            <p className="font-medium">Already have demo credentials?</p>
            <p>
              Use the demo account to test the app: demo@ecocart.com / demo123
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-24 py-8 mt-12 border-t border-gray-200">
        <div className="text-center text-gray-500">
          <p>Creating an eco-friendly future, one purchase at a time.</p>
          <p className="mt-2">© 2024 EcoCart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Register;
