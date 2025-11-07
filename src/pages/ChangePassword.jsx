// import { Dialog, Transition } from "@headlessui/react";
// import React, { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { changePassword, resetAuthState } from "../redux/authSlice";
// import toast, { Toaster } from "react-hot-toast";

// const ChangePasswordModal = () => {
//   const dispatch = useDispatch();
//   const { loading, success, error } = useSelector((state) => state.auth);
//   const [isOpen, setIsOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.newPassword !== formData.confirmPassword) {
//       toast.error("New password and confirm password do not match.");
//       return;
//     }

//     dispatch(changePassword({ currentPassword: formData.currentPassword, newPassword: formData.newPassword }));
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     dispatch(resetAuthState());
//     setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
//   };

//   useEffect(() => {
//     if (success) {
//       toast.success("Password changed successfully!");
//       closeModal();
//     } else if (error) {
//       toast.error(error.message || error.error || "Something went wrong.");
//     }
//   }, [success, error]);

//   return (
//     <>
//       <Toaster position="top-center" reverseOrder={false} />
//       <button
//         onClick={() => setIsOpen(true)}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Change Password
//       </button>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-50" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-200"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-150"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-transparent backdrop-blur-sm" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-full px-4 py-8">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
//                   <Dialog.Title className="text-lg font-semibold text-gray-800">
//                     Change Password
//                   </Dialog.Title>

//                   <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//                     <input
//                       type="password"
//                       name="currentPassword"
//                       placeholder="Current Password"
//                       value={formData.currentPassword}
//                       onChange={handleChange}
//                       className="border border-gray-300 rounded px-3 py-2 w-full"
//                       required
//                     />

//                     <input
//                       type="password"
//                       name="newPassword"
//                       placeholder="New Password"
//                       value={formData.newPassword}
//                       onChange={handleChange}
//                       className="border border-gray-300 rounded px-3 py-2 w-full"
//                       required
//                     />

//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       placeholder="Confirm New Password"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       className="border border-gray-300 rounded px-3 py-2 w-full"
//                       required
//                     />

//                     <div className="flex items-center justify-between">
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//                       >
//                         {loading ? "Updating..." : "Submit"}
//                       </button>
//                       <button
//                         type="button"
//                         className="text-gray-500 hover:underline"
//                         onClick={closeModal}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </form>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default ChangePasswordModal;

// ------------------------------------------------------
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetAuthState } from "../redux/authSlice";
import toast, { Toaster } from "react-hot-toast";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaKey,
  FaCheck,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";

const ChangePasswordModal = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });

  // Password strength checker
  const checkPasswordStrength = (password) => {
    const feedback = [];
    let score = 0;

    // Minimum length
    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push("At least 8 characters");
    }

    // Uppercase letter
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One uppercase letter");
    }

    // Lowercase letter
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One lowercase letter");
    }

    // Number
    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One number");
    }

    // Special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One special character");
    }

    return { score, feedback };
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Current password validation
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    } else if (formData.currentPassword.length < 6) {
      newErrors.currentPassword =
        "Current password must be at least 6 characters";
    }

    // New password validation
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (passwordStrength.score < 3) {
      newErrors.newPassword = "Password is too weak";
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check if new password is same as current
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check password strength in real-time for new password
    if (name === "newPassword") {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    dispatch(
      changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
    );
  };

  const closeModal = () => {
    setIsOpen(false);
    dispatch(resetAuthState());
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setPasswordStrength({ score: 0, feedback: [] });
    setShowPasswords({ current: false, new: false, confirm: false });
  };

  useEffect(() => {
    if (success) {
      toast.success("Password changed successfully!");
      closeModal();
    } else if (error) {
      toast.error(error.message || error.error || "Failed to change password");
    }
  }, [success, error]);

  // Password strength indicator
  const getStrengthColor = (score) => {
    if (score === 0) return "bg-gray-200";
    if (score <= 2) return "bg-red-500";
    if (score <= 3) return "bg-yellow-500";
    if (score <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = (score) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak";
    if (score <= 3) return "Fair";
    if (score <= 4) return "Good";
    return "Strong";
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <FaLock className="mr-2 text-sm" />
        Change Password
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FaShieldAlt className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-bold text-gray-900">
                        Change Password
                      </Dialog.Title>
                      <p className="text-sm text-gray-500 mt-1">
                        Update your account password
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          name="currentPassword"
                          placeholder="Enter current password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.currentPassword
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility("current")}
                        >
                          {showPasswords.current ? (
                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <FaTimes className="mr-1 text-red-500" />
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaKey className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          name="newPassword"
                          placeholder="Enter new password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.newPassword
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility("new")}
                        >
                          {showPasswords.new ? (
                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {formData.newPassword && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Password strength:
                            </span>
                            <span
                              className={`font-medium ${
                                passwordStrength.score <= 2
                                  ? "text-red-600"
                                  : passwordStrength.score <= 3
                                  ? "text-yellow-600"
                                  : passwordStrength.score <= 4
                                  ? "text-blue-600"
                                  : "text-green-600"
                              }`}
                            >
                              {getStrengthText(passwordStrength.score)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                                passwordStrength.score
                              )}`}
                              style={{
                                width: `${(passwordStrength.score / 5) * 100}%`,
                              }}
                            ></div>
                          </div>

                          {/* Password Requirements */}
                          <div className="text-xs text-gray-600 space-y-1 mt-2">
                            <div className="flex items-center">
                              {formData.newPassword.length >= 8 ? (
                                <FaCheck className="text-green-500 mr-2" />
                              ) : (
                                <FaTimes className="text-red-500 mr-2" />
                              )}
                              At least 8 characters
                            </div>
                            <div className="flex items-center">
                              {/[A-Z]/.test(formData.newPassword) ? (
                                <FaCheck className="text-green-500 mr-2" />
                              ) : (
                                <FaTimes className="text-red-500 mr-2" />
                              )}
                              One uppercase letter
                            </div>
                            <div className="flex items-center">
                              {/[a-z]/.test(formData.newPassword) ? (
                                <FaCheck className="text-green-500 mr-2" />
                              ) : (
                                <FaTimes className="text-red-500 mr-2" />
                              )}
                              One lowercase letter
                            </div>
                            <div className="flex items-center">
                              {/[0-9]/.test(formData.newPassword) ? (
                                <FaCheck className="text-green-500 mr-2" />
                              ) : (
                                <FaTimes className="text-red-500 mr-2" />
                              )}
                              One number
                            </div>
                            <div className="flex items-center">
                              {/[!@#$%^&*(),.?":{}|<>]/.test(
                                formData.newPassword
                              ) ? (
                                <FaCheck className="text-green-500 mr-2" />
                              ) : (
                                <FaTimes className="text-red-500 mr-2" />
                              )}
                              One special character
                            </div>
                          </div>
                        </div>
                      )}
                      {errors.newPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <FaTimes className="mr-1 text-red-500" />
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirm new password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.confirmPassword
                              ? "border-red-300 bg-red-50"
                              : formData.confirmPassword &&
                                formData.newPassword ===
                                  formData.confirmPassword
                              ? "border-green-300 bg-green-50"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => togglePasswordVisibility("confirm")}
                        >
                          {showPasswords.confirm ? (
                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {formData.confirmPassword &&
                        formData.newPassword === formData.confirmPassword && (
                          <p className="mt-1 text-sm text-green-600 flex items-center">
                            <FaCheck className="mr-1 text-green-500" />
                            Passwords match
                          </p>
                        )}
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <FaTimes className="mr-1 text-red-500" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <FaCheck className="mr-2" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChangePasswordModal;
