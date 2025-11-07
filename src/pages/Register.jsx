// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser, resetAuthState, loginUser } from "../redux/authSlice";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast } from "react-toastify"

// function Register({ isOpen, onClose, onLoginClick }) {
//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector((state) => state.auth);
//   const [imagePreview, setImagePreview] = useState(null);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     password: "",
//     role: "learner", // Default role
//     phoneNumber: "",
//     gender: "",
//     dateOfBirth: "",
//     qualification: "",
//     degree: "",
//     qualificationStatus: "",
//     profession: "",
//     organization: "",
//     interests: "",
//     professionalTitle: "",
//     totalExperience: "",
//     socialLinks: {
//       linkedIn: "",
//       github: "",
//       youtube: "",
//       twitter: "",
//     },
//     careerDescription: "",
//     accessLevel: "",
//     canEnrollCourses: false,
//     profilePicture: "",
//   });

//   useEffect(() => {
//     if (success) {
//       toast.success("User Registered successfully!");
//       // Auto-login after successful registration
//       dispatch(loginUser({ email: formData.email, password: formData.password }));
//       onClose();
//       dispatch(resetAuthState());
//     }
//   }, [success, dispatch, onClose]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.includes("socialLinks")) {
//       setFormData((prev) => ({
//         ...prev,
//         socialLinks: { ...prev.socialLinks, [name.split(".")[1]]: value },
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };
//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("upload_preset", "my_preset");

//       try {
//         const res = await fetch("https://api.cloudinary.com/v1_1/drhk6uycr/image/upload", {
//           method: "POST",
//           body: formData,
//         });

//         const data = await res.json();
//         setFormData((prev) => ({ ...prev, profilePicture: data.secure_url })); // Cloudinary image URL
//         setImagePreview(data.secure_url);
//       } catch (error) {
//         console.error("Image upload error:", error);
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser(formData))
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -50, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-2xl font-bold">Register</h2>
//               <button
//                 onClick={onClose}
//                 className="text-gray-500 hover:text-gray-700 text-xl"
//               >
//                 &times;
//               </button>
//             </div>

//             {error && <p className="text-red-500">{error.message}</p>}

//             <form onSubmit={handleSubmit}>
//               {(
//                 <>

//                   {/* Full Name */}

//                   {/* Username */}
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium">
//                       Username
//                     </label>
//                     <input
//                       type="text"
//                       name="username"
//                       className="w-full p-2 border rounded-md"
//                       placeholder="Enter your username"
//                       value={formData.username}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Role Selection */}
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium">Role</label>
//                     <select
//                       name="role"
//                       className="w-full p-2 border rounded-md"
//                       value={formData.role}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="learner">Learner</option>
//                       <option value="examinee">Examinee</option>
//                       <option value="trainer">Trainer</option>
//                     </select>
//                   </div>

//                   {/* Email */}
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       className="w-full p-2 border rounded-md"
//                       placeholder="Enter your email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   {/* Password */}
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       className="w-full p-2 border rounded-md"
//                       placeholder="Enter password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>

//                   <div className="flex justify-center">
//                     <button
//                       type="submit"
//                       className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
//                     >
//                       {loading ? "Registering..." : "Register"}
//                     </button>
//                   </div>

//                 </>
//               )}
//             </form>

//             <p className="text-center text-sm mt-3">
//               Already have an account?{" "}
//               <button
//                 onClick={onLoginClick}
//                 className="text-blue-600 hover:underline"
//               >
//                 Login here
//               </button>
//             </p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// export default Register;

// -----------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState, loginUser } from "../redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaGraduationCap,
  FaBriefcase,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiUserPlus, FiUser } from "react-icons/fi";

function Register({ isOpen, onClose, onLoginClick }) {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "learner",
    phoneNumber: "",
    qualification: "",
    interests: "",
    profilePicture: "",
  });

  // Prevent background scrolling when modal is open
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

  useEffect(() => {
    if (success) {
      toast.success(
        "🎉 Account created successfully! Welcome to Rehbar Online!"
      );
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
      onClose();
      dispatch(resetAuthState());
    }
  }, [success, dispatch, onClose, formData]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
      setFormData((prev) => ({ ...prev, profilePicture: localUrl }));
      toast.info("Profile picture uploaded successfully!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }

    if (!formData.username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    await dispatch(registerUser(formData));
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    nextStep();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Register Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[95vw] xs:max-w-[90vw] sm:max-w-md mx-auto"
            onClick={handleModalClick}
          >
            <div className="relative bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-h-[85vh] sm:max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="relative p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 flex-shrink-0">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Join Our Community
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-base sm:text-lg" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="flex items-center">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                            currentStep >= step
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step}
                        </div>
                        {step < 3 && (
                          <div
                            className={`w-4 sm:w-6 h-1 mx-1 sm:mx-2 transition-all ${
                              currentStep > step
                                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                                : "bg-gray-200"
                            }`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mx-3 sm:mx-4 md:mx-6 mb-3 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm flex-shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    {error.message || "Registration failed. Please try again."}
                  </div>
                </motion.div>
              )}

              {/* Form Content - Scrollable Area */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 pb-4 sm:pb-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Role Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-3 sm:mb-4">
                        Choose Your Role
                      </h3>

                      <div className="grid grid-cols-1 gap-2 sm:gap-3">
                        {/* Learner Card */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRoleSelect("learner")}
                          className={`p-3 border-2 rounded-lg text-center transition-all ${
                            formData.role === "learner"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <FiUser className="text-white text-sm sm:text-base" />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">
                            Learner
                          </h4>
                          <p className="text-xs text-gray-600 leading-tight">
                            Learn courses and enhance skills
                          </p>
                        </motion.button>

                        {/* Examinee Card */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRoleSelect("examinee")}
                          className={`p-3 border-2 rounded-lg text-center transition-all ${
                            formData.role === "examinee"
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <FaGraduationCap className="text-white text-sm sm:text-base" />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">
                            Examinee
                          </h4>
                          <p className="text-xs text-gray-600 leading-tight">
                            Prepare for competitive exams
                          </p>
                        </motion.button>

                        {/* Trainer Card */}
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRoleSelect("trainer")}
                          className={`p-3 border-2 rounded-lg text-center transition-all ${
                            formData.role === "trainer"
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <FaBriefcase className="text-white text-sm sm:text-base" />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">
                            Trainer
                          </h4>
                          <p className="text-xs text-gray-600 leading-tight">
                            Teach and create educational content
                          </p>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Basic Information */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-3 sm:mb-4">
                        Basic Information
                      </h3>

                      <div className="space-y-3">
                        {/* Profile Picture Upload */}
                        <div className="text-center mb-3">
                          <div className="relative inline-block">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center border-2 border-white shadow">
                              {imagePreview ? (
                                <img
                                  src={imagePreview}
                                  alt="Profile Preview"
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <FiUser className="text-gray-400 text-lg sm:text-xl" />
                              )}
                            </div>
                            <label
                              htmlFor="profile-upload"
                              className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow text-xs"
                            >
                              <FiUserPlus className="text-xs" />
                            </label>
                            <input
                              id="profile-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            Add profile picture (optional)
                          </p>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          {/* Full Name */}
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="text-gray-400 text-xs sm:text-sm" />
                            </div>
                            <input
                              type="text"
                              name="fullName"
                              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                              placeholder="Full Name"
                              value={formData.fullName}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Username */}
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="text-gray-400 text-xs sm:text-sm" />
                            </div>
                            <input
                              type="text"
                              name="username"
                              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                              placeholder="Username *"
                              value={formData.username}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          {/* Email */}
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaEnvelope className="text-gray-400 text-xs sm:text-sm" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                              placeholder="Email Address *"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          {/* Password */}
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaLock className="text-gray-400 text-xs sm:text-sm" />
                            </div>
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              className="w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                              placeholder="Password *"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showPassword ? (
                                <FaEyeSlash className="text-xs sm:text-sm" />
                              ) : (
                                <FaEye className="text-xs sm:text-sm" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-3">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs sm:text-sm flex items-center gap-1"
                          >
                            <FaChevronLeft className="text-xs" />
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-xs sm:text-sm flex items-center gap-1"
                          >
                            Continue
                            <FaChevronRight className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Additional Information & Submit */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-3 sm:mb-4">
                        Additional Information
                      </h3>

                      <div className="space-y-3">
                        <div className="space-y-2 sm:space-y-3">
                          {/* Phone Number */}
                          <div className="relative">
                            <input
                              type="tel"
                              name="phoneNumber"
                              className="w-full px-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                              placeholder="Phone Number"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Qualification */}
                          <div className="relative">
                            <input
                              type="text"
                              name="qualification"
                              className="w-full px-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                              placeholder="Highest Qualification"
                              value={formData.qualification}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Interests */}
                          <div className="relative">
                            <input
                              type="text"
                              name="interests"
                              className="w-full px-3 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-xs sm:text-sm"
                              placeholder="Your Interests"
                              value={formData.interests}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <input
                            type="checkbox"
                            id="terms"
                            className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5 sm:mt-1 flex-shrink-0"
                            required
                          />
                          <label
                            htmlFor="terms"
                            className="text-xs text-gray-700"
                          >
                            I agree to the{" "}
                            <button
                              type="button"
                              className="text-blue-600 hover:underline"
                            >
                              Terms of Service
                            </button>{" "}
                            and{" "}
                            <button
                              type="button"
                              className="text-blue-600 hover:underline"
                            >
                              Privacy Policy
                            </button>
                          </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                          type="submit"
                          onClick={handleSubmit}
                          disabled={isLoading}
                          whileHover={{ scale: isLoading ? 1 : 1.02 }}
                          whileTap={{ scale: isLoading ? 1 : 0.98 }}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs sm:text-sm"
                        >
                          {isLoading ? (
                            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FiUserPlus className="text-sm" />
                          )}
                          {isLoading ? "Creating Account..." : "Create Account"}
                        </motion.button>

                        {/* Back Button */}
                        <button
                          type="button"
                          onClick={prevStep}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs sm:text-sm flex items-center justify-center gap-1"
                        >
                          <FaChevronLeft className="text-xs" />
                          Back
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Link */}
                <div className="text-center mt-3 sm:mt-4">
                  <p className="text-xs text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={onLoginClick}
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Register;
