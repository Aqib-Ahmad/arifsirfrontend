// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, resetAuthState } from "../redux/authSlice";
// import { toast } from "react-toastify";

// function Login({ isOpen, onClose, onRegisterClick }) {
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (success) {
//       if (error?.includes("banned")) {
//         toast.warning("Your account is banned. Please contact support.");
//         return;
//       }
//       toast.success("Login successfully!");
//       onClose(); // ✅ Close modal
//       dispatch(resetAuthState()); // ✅ Reset auth state
//     }
//   }, [success, dispatch, onClose]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(loginUser(formData));
//   };

//   if (!isOpen) return null; // ✅ Ensure modal doesn't render when `isOpen` is false

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -50 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">Login</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">
//             &times;
//           </button>
//         </div>

//         {error && <p className="text-red-500">{error.message}</p>}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="w-full p-2 border rounded-md bg-white/50 backdrop-blur-md"
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3, delay: 0.2 }}
//           className="mt-4 text-center text-sm"
//         >
//           <p>
//             Don't have an account?{" "}
//             <button onClick={onRegisterClick} className="text-blue-600 underline">
//               Register
//             </button>
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;

// ---------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../redux/authSlice";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaGoogle,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

function Login({ isOpen, onClose, onRegisterClick }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      toast.success("Welcome back! Login successful.");
      onClose();
      dispatch(resetAuthState());
    }
  }, [success, dispatch, onClose]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflow = "hidden";

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    await dispatch(loginUser(formData));
    setIsLoading(false);
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login coming soon!`);
  };

  const handleForgotPassword = () => {
    toast.info("Password reset feature coming soon!");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Login Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[95vw] sm:max-w-md mx-auto"
          >
            {/* Background Design Elements - Hidden on mobile for better performance */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-xl opacity-20 hidden sm:block"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl opacity-20 hidden sm:block"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header */}
              <div className="relative p-4 sm:p-6 md:p-8 pb-4 sm:pb-6">
                <div className="flex justify-end mb-4 sm:mb-6">
                  <button
                    onClick={onClose}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-base sm:text-lg" />
                  </button>
                </div>

                <div className="text-center mb-2">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Continue your learning journey with us
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-4 sm:mx-6 md:mx-8 mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl text-red-700 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {error.message || "Invalid email or password"}
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8"
              >
                <div className="space-y-3 sm:space-y-4">
                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-base sm:text-lg" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-base sm:text-lg" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-base" />
                      ) : (
                        <FaEye className="text-base" />
                      )}
                    </button>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <FiLogIn className="text-base sm:text-lg" />
                    )}
                    {isLoading ? "Signing In..." : "Sign In"}
                  </motion.button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center my-4 sm:my-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm">
                    or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Google")}
                    className="p-2 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center group"
                  >
                    <FaGoogle className="text-red-500 text-base sm:text-lg group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("Facebook")}
                    className="p-2 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center group"
                  >
                    <FaFacebook className="text-blue-600 text-base sm:text-lg group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("GitHub")}
                    className="p-2 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center group"
                  >
                    <FaGithub className="text-gray-800 text-base sm:text-lg group-hover:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={onRegisterClick}
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Create account
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Login;
