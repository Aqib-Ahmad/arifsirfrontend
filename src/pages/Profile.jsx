// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentUser, updateUser } from "../redux/userSlice";
// import { Link } from "react-router-dom";
// import { fetchResults } from "../redux/examSlice";
// import { getEnrolledCourses } from "../redux/courseSlice";
// import EnrolledCourses from "../components/EnrolledCourses";
// import ExamResults from "../components/ExamResults";
// import { motion } from "framer-motion";
// import ChangePasswordModal from "./ChangePassword";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { currentUser, loading, error } = useSelector((state) => state.users);
//   const { enrolledCourses } = useSelector((state) => state.courses);
//   const { results, loading: resultsLoading } = useSelector((state) => state.exam);

//   const [preview, setPreview] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchCurrentUser());
//     dispatch(getEnrolledCourses());
//     dispatch(fetchResults());
//   }, [dispatch]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleProfileUpdate = async () => {
//     if (selectedFile && currentUser) {
//       const formData = new FormData();
//       formData.append("profilePicture", selectedFile);
//       try {
//         await dispatch(updateUser({ id: currentUser._id, updates: formData }));
//         setPreview(null);
//         setSelectedFile(null);
//         setModalOpen(false);
//       } catch (error) {
//         console.error("Profile update failed:", error);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-70"></div>
//       </div>
//     );
//   }

//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!currentUser) return <p className="text-center">No user profile found.</p>;

//   return (
//     <motion.div
//       className="max-w-6xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-lg border border-gray-200 my-8"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       {/* Profile Header */}
//       <motion.div
//         className="flex flex-col md:flex-row items-center gap-6 border-b pb-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//       >
//         {/* Profile Picture */}
//         <div className="relative">
//           <button onClick={() => setModalOpen(true)} className="focus:outline-none">
//             <img
//               src={preview || currentUser.profilePicture || "/default-avatar.png"}
//               alt="Profile"
//               className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-blue-400 shadow-xl object-cover"
//             />
//           </button>
//           <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow">
//             {currentUser.role.toUpperCase()}
//           </span>
//         </div>

//         {/* User Info */}
//         <div className="text-center md:text-left">
//           <h2 className="text-3xl font-bold text-gray-800">{currentUser.fullName}</h2>
//           <p className="text-gray-600 text-lg">@{currentUser.username}</p>
//         </div>

//         <Link to="/updateUser" className="ml-auto">
//           <button className="px-4 py-2 bg-blue-600 max-sm:mr-25 text-white rounded-md hover:bg-blue-700 transition">
//             Edit Profile
//           </button>
//         </Link>
//         <ChangePasswordModal />
//       </motion.div>

//       {/* Modal */}
//       {modalOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <motion.div
//             className="bg-white p-6 rounded-xl shadow-xl w-[90%] md:w-[400px]"
//             initial={{ scale: 0.9 }}
//             animate={{ scale: 1 }}
//           >
//             <h3 className="text-xl font-semibold mb-4">Update Profile Picture</h3>
//             <img
//               src={preview || currentUser.profilePicture || "/default-avatar.png"}
//               alt="Preview"
//               className="w-full h-64 object-cover rounded-lg mb-4"
//             />

//             <label htmlFor="profile-upload" className="block bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer text-center">
//               Choose New Picture
//             </label>
//             <input
//               type="file"
//               id="profile-upload"
//               accept="image/*"
//               className="hidden"
//               onChange={handleFileChange}
//             />

//             <div className="flex justify-between mt-4">
//               {selectedFile && (
//                 <button
//                   onClick={handleProfileUpdate}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Save
//                 </button>
//               )}
//               <button
//                 onClick={() => {
//                   setSelectedFile(null);
//                   setPreview(null);
//                   setModalOpen(false);
//                 }}
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}

//       {/* Profile Info Section */}
//       <motion.div className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
//         {currentUser.privacySettings?.showEmail && (
//           <p><strong>Email:</strong> {currentUser.email}</p>
//         )}
//         {currentUser.privacySettings?.showPhone && currentUser.phoneNumber && (
//           <p><strong>Phone:</strong> {currentUser.phoneNumber}</p>
//         )}
//         {currentUser.dateOfBirth && (
//           <p><strong>Date of Birth:</strong> {new Date(currentUser.dateOfBirth).toLocaleDateString()}</p>
//         )}
//         {currentUser.address?.city && (
//           <p><strong>Address:</strong> {`${currentUser.address.city}, ${currentUser.address.state}, ${currentUser.address.country}`}</p>
//         )}
//       </motion.div>

//       {/* Role-Specific Sections */}
//       <div className="mt-8 space-y-6">
//         {currentUser.role === "learner" && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
//             <h3 className="text-2xl font-bold text-blue-800 mb-4">🎓 Learner Dashboard</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-lg shadow">
//               {currentUser.qualification && <p><strong>Qualification:</strong> {currentUser.qualification} ({currentUser.qualificationStatus})</p>}
//               {currentUser.degree && <p><strong>Degree:</strong> {currentUser.degree}</p>}
//               {currentUser.profession && currentUser.privacySettings?.showProfession && (
//                 <p><strong>Profession:</strong> {currentUser.profession}</p>
//               )}
//               {currentUser.organization?.name && <p><strong>Organization:</strong> {currentUser.organization.name}</p>}
//               {currentUser.interests && <p><strong>Interests:</strong> {currentUser.interests}</p>}
//             </div>
//             {enrolledCourses.length > 0 && (
//               <div className="mt-4">
//                 <EnrolledCourses enrolledCourses={enrolledCourses} />
//               </div>
//             )}
//           </motion.div>
//         )}

//         {(currentUser.role === "examinee" || currentUser.role === "learner") && results?.length > 0 && (
//           <ExamResults results={results} />

//         )}

//         {currentUser.role === "trainer" && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
//             <h3 className="text-2xl font-bold text-yellow-800 mb-4">🧑‍🏫 Trainer Dashboard</h3>
//             <div className="bg-yellow-50 p-4 rounded-lg shadow space-y-2">
//               {currentUser.professionalTitle && <p><strong>Title:</strong> {currentUser.professionalTitle}</p>}
//               {currentUser.totalExperience && <p><strong>Experience:</strong> {currentUser.totalExperience} years</p>}
//               {currentUser.careerDescription && <p><strong>Career:</strong> {currentUser.careerDescription}</p>}
//               {currentUser.socialLinks?.linkedIn && <p><strong>LinkedIn:</strong> {currentUser.socialLinks.linkedIn}</p>}
//               {currentUser.socialLinks?.github && <p><strong>Github:</strong> {currentUser.socialLinks.github}</p>}
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//               <Link to="/courseForm"><button className="dashboard-btn">➕ Add Course</button></Link>
//               <Link to="/create-exam"><button className="dashboard-btn">📝 Add Exam</button></Link>
//               <Link to="/trainer-courses"><button className="dashboard-btn">📚 My Courses</button></Link>
//               <Link to="/trainer-exams"><button className="dashboard-btn">📊 My Exams</button></Link>
//             </div>
//           </motion.div>
//         )}

//         {currentUser.role === "admin" && (
//           <motion.div className="bg-gradient-to-r from-red-100 to-red-50 p-4 rounded-lg shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
//             <h3 className="text-xl font-bold text-red-700 mb-2">🛠 Admin Dashboard</h3>
//             {currentUser.accessLevel && <p><strong>Access Level:</strong> {currentUser.accessLevel}</p>}
//             <Link to="/admin/dash">
//               <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Go to Admin Panel</button>
//             </Link>
//           </motion.div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default Profile;

// --------------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser } from "../redux/userSlice";
import { Link } from "react-router-dom";
import { fetchResults } from "../redux/examSlice";
import { getEnrolledCourses } from "../redux/courseSlice";
import EnrolledCourses from "../components/EnrolledCourses";
import ExamResults from "../components/ExamResults";
import { motion } from "framer-motion";
import ChangePasswordModal from "./ChangePassword";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaBook,
  FaBuilding,
  FaHeart,
  FaEdit,
  FaCamera,
  FaChalkboardTeacher,
  FaUserShield,
  FaChartLine,
  FaCertificate,
  FaClock,
  FaPlus,
  FaFileAlt,
  FaList,
  FaChartBar,
} from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.users);
  const { enrolledCourses } = useSelector((state) => state.courses);
  const { results, loading: resultsLoading } = useSelector(
    (state) => state.exam
  );

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(getEnrolledCourses());
    dispatch(fetchResults());
  }, [dispatch]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setModalOpen(true);
    }
  };

  const handleProfileUpdate = async () => {
    if (selectedFile && currentUser) {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      try {
        await dispatch(updateUser({ id: currentUser._id, updates: formData }));
        setPreview(null);
        setSelectedFile(null);
        setModalOpen(false);
      } catch (error) {
        console.error("Profile update failed:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-70 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 text-lg font-medium">{error}</p>
          <button
            onClick={() => dispatch(fetchCurrentUser())}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (!currentUser)
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No user profile found.</p>
        </div>
      </div>
    );

  // Stats cards data
  const stats = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses?.length || 0,
      icon: FaBook,
      color: "blue",
      bgColor: "from-blue-500 to-blue-600",
    },
    {
      label: "Exams Taken",
      value: results?.length || 0,
      icon: FaCertificate,
      color: "green",
      bgColor: "from-green-500 to-green-600",
    },
    {
      label: "Learning Hours",
      value: "24+",
      icon: FaClock,
      color: "purple",
      bgColor: "from-purple-500 to-purple-600",
    },
    {
      label: "Progress Rate",
      value: "75%",
      icon: FaChartLine,
      color: "orange",
      bgColor: "from-orange-500 to-orange-600",
    },
  ];

  const getRoleColor = (role) => {
    const colors = {
      learner: "bg-blue-100 text-blue-800 border-blue-200",
      trainer: "bg-yellow-100 text-yellow-800 border-yellow-200",
      examinee: "bg-green-100 text-green-800 border-green-200",
      admin: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[role] || colors.learner;
  };

  const getRoleIcon = (role) => {
    const icons = {
      learner: FaGraduationCap,
      trainer: FaChalkboardTeacher,
      examinee: FaCertificate,
      admin: FaUserShield,
    };
    return icons[role] || FaUser;
  };

  const RoleIcon = getRoleIcon(currentUser.role);

  // Trainer action buttons
  const trainerActions = [
    {
      label: "Create Course",
      icon: FaPlus,
      path: "/courseForm",
      color: "from-blue-500 to-cyan-500",
      description: "Add new course content",
    },
    {
      label: "Create Exam",
      icon: FaFileAlt,
      path: "/create-exam",
      color: "from-green-500 to-emerald-500",
      description: "Design new tests",
    },
    {
      label: "My Courses",
      icon: FaList,
      path: "/trainer-courses",
      color: "from-purple-500 to-pink-500",
      description: "Manage your courses",
    },
    {
      label: "My Exams",
      icon: FaChartBar,
      path: "/trainer-exams",
      color: "from-orange-500 to-red-500",
      description: "View exam analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your account and track your learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar - Profile Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Profile Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                <div className="relative inline-block">
                  <div className="relative">
                    <img
                      src={
                        preview ||
                        currentUser.profilePicture ||
                        "/default-avatar.png"
                      }
                      alt="Profile"
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      <FaCamera className="text-sm" />
                    </label>
                    <input
                      type="file"
                      id="profile-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-xl font-bold text-white truncate">
                    {currentUser.fullName || currentUser.username}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <RoleIcon className="text-white text-sm" />
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                        currentUser.role
                      )}`}
                    >
                      {currentUser.role.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {enrolledCourses?.length || 0}
                    </p>
                    <p className="text-xs text-gray-600">Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {results?.length || 0}
                    </p>
                    <p className="text-xs text-gray-600">Exams</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 space-y-3">
                <Link
                  to="/updateUser"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium text-sm"
                >
                  <FaEdit className="text-sm" />
                  Edit Profile
                </Link>
                <ChangePasswordModal />
              </div>
            </div>

            {/* Stats Cards for Mobile */}
            <div className="lg:hidden grid grid-cols-2 gap-3 mt-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`bg-gradient-to-br ${stat.bgColor} text-white rounded-xl p-4 shadow-lg`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white bg-opacity-20">
                        <Icon className="text-white text-sm" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">
                          {stat.value}
                        </p>
                        <p className="text-xs text-white text-opacity-90">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  {["overview", "courses", "results"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Stats Cards for Desktop */}
                    <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className={`bg-gradient-to-br ${stat.bgColor} text-white rounded-xl p-4 shadow-lg`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white bg-opacity-20">
                                <Icon className="text-white text-lg" />
                              </div>
                              <div>
                                <p className="text-2xl font-bold text-white">
                                  {stat.value}
                                </p>
                                <p className="text-sm text-white text-opacity-90">
                                  {stat.label}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Personal Information */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                    >
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <FaUser className="text-blue-600" />
                          Personal Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <FaEnvelope className="text-gray-400 text-lg" />
                            <div>
                              <p className="text-sm text-gray-600">Email</p>
                              <p className="font-medium text-gray-900">
                                {currentUser.email}
                              </p>
                            </div>
                          </div>
                          {currentUser.phoneNumber && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <FaPhone className="text-gray-400 text-lg" />
                              <div>
                                <p className="text-sm text-gray-600">Phone</p>
                                <p className="font-medium text-gray-900">
                                  {currentUser.phoneNumber}
                                </p>
                              </div>
                            </div>
                          )}
                          {currentUser.dateOfBirth && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <FaBirthdayCake className="text-gray-400 text-lg" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Date of Birth
                                </p>
                                <p className="font-medium text-gray-900">
                                  {new Date(
                                    currentUser.dateOfBirth
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-green-600" />
                          Additional Information
                        </h3>
                        <div className="space-y-3">
                          {currentUser.address?.city && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <FaMapMarkerAlt className="text-gray-400 text-lg" />
                              <div>
                                <p className="text-sm text-gray-600">Address</p>
                                <p className="font-medium text-gray-900">
                                  {`${currentUser.address.city}, ${currentUser.address.state}`}
                                </p>
                              </div>
                            </div>
                          )}
                          {currentUser.qualification && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <FaGraduationCap className="text-gray-400 text-lg" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Qualification
                                </p>
                                <p className="font-medium text-gray-900">
                                  {currentUser.qualification}{" "}
                                  {currentUser.qualificationStatus &&
                                    `(${currentUser.qualificationStatus})`}
                                </p>
                              </div>
                            </div>
                          )}
                          {currentUser.interests && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <FaHeart className="text-gray-400 text-lg" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Interests
                                </p>
                                <p className="font-medium text-gray-900">
                                  {currentUser.interests}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Role Specific Content */}
                    {currentUser.role === "learner" &&
                      enrolledCourses?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Recent Courses
                          </h3>
                          <EnrolledCourses
                            enrolledCourses={enrolledCourses.slice(0, 3)}
                          />
                        </motion.div>
                      )}

                    {(currentUser.role === "examinee" ||
                      currentUser.role === "learner") &&
                      results?.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Recent Results
                          </h3>
                          <ExamResults results={results.slice(0, 3)} />
                        </motion.div>
                      )}
                  </div>
                )}

                {/* Courses Tab */}
                {activeTab === "courses" && enrolledCourses?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <EnrolledCourses enrolledCourses={enrolledCourses} />
                  </motion.div>
                )}

                {/* Results Tab */}
                {activeTab === "results" && results?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ExamResults results={results} />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Trainer Action Cards */}
            {currentUser.role === "trainer" && (
              <motion.div
                className="mt-4 sm:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaChalkboardTeacher className="text-yellow-600" />
                  Trainer Dashboard
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {trainerActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.div
                        key={action.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <Link
                          to={action.path}
                          className="block p-4 text-center"
                        >
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}
                          >
                            <Icon className="text-white text-xl" />
                          </div>
                          <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                            {action.label}
                          </h4>
                          <p className="text-gray-600 text-xs">
                            {action.description}
                          </p>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Admin Action Card */}
            {currentUser.role === "admin" && (
              <motion.div
                className="mt-4 sm:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUserShield className="text-red-600" />
                  Admin Dashboard
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <Link to="/admin/dash" className="block p-6 text-center">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaUserShield className="text-white text-2xl" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">
                        Admin Control Panel
                      </h4>
                      <p className="text-white text-opacity-90 text-sm">
                        Manage users, courses, exams, and platform settings
                      </p>
                      <button className="mt-4 bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Access Admin Panel
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Profile Picture Update Modal */}
      {modalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Update Profile Picture
              </h3>
              <div className="mb-4">
                <img
                  src={
                    preview ||
                    currentUser.profilePicture ||
                    "/default-avatar.png"
                  }
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg mb-4 border-2 border-gray-200"
                />
                <label
                  htmlFor="profile-upload-modal"
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg cursor-pointer text-center hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Choose New Picture
                </label>
                <input
                  type="file"
                  id="profile-upload-modal"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex gap-3">
                {selectedFile && (
                  <button
                    onClick={handleProfileUpdate}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Save Changes
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                    setModalOpen(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
