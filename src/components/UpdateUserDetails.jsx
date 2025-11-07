// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentUser, updateUser } from "../redux/userSlice";
// import {Link, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";

// const Settings = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { currentUser, loading, error } = useSelector((state) => state.users);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     gender: "",
//     dateOfBirth: "",
//     address: { local: "", city: "", state: "", country: "", pincode: "" },
//     profession: "",
//     organization: { name: "", address: "" },
//     qualification: "",
//     degree: "",
//     qualificationStatus: "",
//     interests: "",
//     professionalTitle: "",
//     totalExperience: "",
//     socialLinks: { linkedIn: "", github: "", youtube: "", twitter: "" },
//     careerDescription: "",
//     accessLevel: "",
//   });

//   useEffect(() => {
//     dispatch(fetchCurrentUser());
//   }, [dispatch]);

//   useEffect(() => {
//     if (currentUser) {
//       setFormData({
//         fullName: currentUser.fullName || "",
//         email: currentUser.email || "",
//         phoneNumber: currentUser.phoneNumber || "",
//         gender: currentUser.gender || "",
//         dateOfBirth: currentUser.dateOfBirth ? currentUser.dateOfBirth.split("T")[0] : "",
//         address: currentUser.address || { local: "", city: "", state: "", country: "", pincode: "" },
//         profession: currentUser.profession || "",
//         organization: currentUser.organization || { name: "", address: "" },
//         qualification: currentUser.qualification || "",
//         degree: currentUser.degree || "",
//         qualificationStatus: currentUser.qualificationStatus || "",
//         interests: currentUser.interests || "",
//         professionalTitle: currentUser.professionalTitle || "",
//         totalExperience: currentUser.totalExperience || "",
//         socialLinks: currentUser.socialLinks || { linkedIn: "", github: "", youtube: "", twitter: "" },
//         careerDescription: currentUser.careerDescription || "",
//         accessLevel: currentUser.accessLevel || "",
//       });
//     }
//   }, [currentUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const keys = name.split(".");
//     if (keys.length > 1) {
//       setFormData((prev) => ({
//         ...prev,
//         [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
//       }));
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(updateUser({ id: currentUser._id, updates: formData })).unwrap();
//       alert("Profile updated successfully!");
//       navigate("/profile");
//     } catch (error) {
//       alert("Failed to update profile!");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
//       <Link to="/profile">
//       <FaArrowLeft/>
//       </Link>
//       <h2 className="text-2xl font-bold mb-5">Update Details</h2>

//       {error && <p className="text-red-500">{error}</p>}
//       {loading && <p className="text-gray-500">Loading...</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium">Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Phone Number</label>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         {/* Common Address Fields */}
//         <div>
//           <label className="block text-sm font-medium">City</label>
//           <input
//             type="text"
//             name="address.city"
//             value={formData.address.city}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">State</label>
//           <input
//             type="text"
//             name="address.state"
//             value={formData.address.state}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         {currentUser?.role === "learner" && (
//           <>
//             <div>
//               <label className="block text-sm font-medium">Qualification</label>
//               <input
//                 type="text"
//                 name="qualification"
//                 value={formData.qualification}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Degree</label>
//               <input
//                 type="text"
//                 name="degree"
//                 value={formData.degree}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//           </>
//         )}

//         {currentUser?.role === "trainer" && (
//           <>
//             <div>
//               <label className="block text-sm font-medium">Professional Title</label>
//               <input
//                 type="text"
//                 name="professionalTitle"
//                 value={formData.professionalTitle}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium">Total Experience (Years)</label>
//               <input
//                 type="number"
//                 name="totalExperience"
//                 value={formData.totalExperience}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//           </>
//         )}

//         {currentUser?.role === "admin" && (
//           <div>
//             <label className="block text-sm font-medium">Access Level</label>
//             <select
//               name="accessLevel"
//               value={formData.accessLevel}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="">Select Access Level</option>
//               <option value="Full Admin">Full Admin</option>
//               <option value="Content Manager">Content Manager</option>
//               <option value="Finance Manager">Finance Manager</option>
//             </select>
//           </div>
//         )}

//         {/* Social Links */}
//         <div>
//           <label className="block text-sm font-medium">LinkedIn</label>
//           <input
//             type="text"
//             name="socialLinks.linkedIn"
//             value={formData.socialLinks.linkedIn}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Github</label>
//           <input
//             type="text"
//             name="socialLinks.github"
//             value={formData.socialLinks.github}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
//         >
//           {loading ? "Updating..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Settings;

// ----------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaTwitter,
  FaSave,
  FaVenusMars,
  FaCalendarAlt,
  FaBuilding,
  FaLock,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: { local: "", city: "", state: "", country: "", pincode: "" },
    profession: "",
    organization: { name: "", address: "" },
    qualification: "",
    degree: "",
    qualificationStatus: "",
    interests: "",
    professionalTitle: "",
    totalExperience: "",
    socialLinks: { linkedIn: "", github: "", youtube: "", twitter: "" },
    careerDescription: "",
    accessLevel: "",
  });

  const [activeSection, setActiveSection] = useState("personal");

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        phoneNumber: currentUser.phoneNumber || "",
        gender: currentUser.gender || "",
        dateOfBirth: currentUser.dateOfBirth
          ? currentUser.dateOfBirth.split("T")[0]
          : "",
        address: currentUser.address || {
          local: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        },
        profession: currentUser.profession || "",
        organization: currentUser.organization || { name: "", address: "" },
        qualification: currentUser.qualification || "",
        degree: currentUser.degree || "",
        qualificationStatus: currentUser.qualificationStatus || "",
        interests: currentUser.interests || "",
        professionalTitle: currentUser.professionalTitle || "",
        totalExperience: currentUser.totalExperience || "",
        socialLinks: currentUser.socialLinks || {
          linkedIn: "",
          github: "",
          youtube: "",
          twitter: "",
        },
        careerDescription: currentUser.careerDescription || "",
        accessLevel: currentUser.accessLevel || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateUser({ id: currentUser._id, updates: formData })
      ).unwrap();
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update profile!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const sections = [
    {
      id: "personal",
      label: "Personal Info",
      icon: <FaUser className="text-sm" />,
    },
    {
      id: "address",
      label: "Address",
      icon: <FaMapMarkerAlt className="text-sm" />,
    },
    {
      id: "professional",
      label: "Professional",
      icon: <FaBriefcase className="text-sm" />,
    },
    {
      id: "social",
      label: "Social Links",
      icon: <FaLinkedin className="text-sm" />,
    },
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaUser className="mr-2 text-blue-500" />
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaEnvelope className="mr-2 text-blue-500" />
            Email
            {currentUser?.role !== "admin" && (
              <FaLock
                className="ml-2 text-gray-400 text-xs"
                title="Email cannot be changed"
              />
            )}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={currentUser?.role !== "admin"}
            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              currentUser?.role !== "admin"
                ? "bg-gray-100 cursor-not-allowed text-gray-600"
                : ""
            }`}
            placeholder="Enter your email"
          />
          {currentUser?.role !== "admin" && (
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be modified. Contact admin for changes.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaPhone className="mr-2 text-blue-500" />
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaVenusMars className="mr-2 text-blue-500" />
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Local Address
          </label>
          <input
            type="text"
            name="address.local"
            value={formData.address.local}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Street address"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter city"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter state"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter country"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            type="text"
            name="address.pincode"
            value={formData.address.pincode}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter pincode"
          />
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      {currentUser?.role === "learner" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaGraduationCap className="mr-2 text-blue-500" />
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Your qualification"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaGraduationCap className="mr-2 text-blue-500" />
              Degree
            </label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Your degree"
            />
          </div>
        </div>
      )}

      {currentUser?.role === "trainer" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaBriefcase className="mr-2 text-blue-500" />
              Professional Title
            </label>
            <input
              type="text"
              name="professionalTitle"
              value={formData.professionalTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Your professional title"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaBriefcase className="mr-2 text-blue-500" />
              Total Experience (Years)
            </label>
            <input
              type="number"
              name="totalExperience"
              value={formData.totalExperience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Years of experience"
            />
          </div>
        </div>
      )}

      {currentUser?.role === "admin" && (
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaBuilding className="mr-2 text-blue-500" />
            Access Level
          </label>
          <select
            name="accessLevel"
            value={formData.accessLevel}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="">Select Access Level</option>
            <option value="Full Admin">Full Admin</option>
            <option value="Content Manager">Content Manager</option>
            <option value="Finance Manager">Finance Manager</option>
          </select>
        </div>
      )}
    </div>
  );

  const renderSocialLinks = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaLinkedin className="mr-2 text-blue-700" />
            LinkedIn
          </label>
          <input
            type="text"
            name="socialLinks.linkedIn"
            value={formData.socialLinks.linkedIn}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="LinkedIn profile URL"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaGithub className="mr-2 text-gray-800" />
            GitHub
          </label>
          <input
            type="text"
            name="socialLinks.github"
            value={formData.socialLinks.github}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="GitHub profile URL"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaYoutube className="mr-2 text-red-600" />
            YouTube
          </label>
          <input
            type="text"
            name="socialLinks.youtube"
            value={formData.socialLinks.youtube}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="YouTube channel URL"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FaTwitter className="mr-2 text-blue-400" />
            Twitter
          </label>
          <input
            type="text"
            name="socialLinks.twitter"
            value={formData.socialLinks.twitter}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Twitter profile URL"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/profile"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Profile
          </Link>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Profile Settings
            </h2>
            <p className="text-gray-600 mt-1">
              Update your personal and professional information
            </p>
          </div>
          <div className="w-24"></div> {/* Spacer for balance */}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-2">Loading your profile...</p>
          </div>
        )}

        {!loading && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar Navigation */}
              <div className="md:w-64 bg-gray-50 p-6 border-r border-gray-200">
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {section.icon}
                      <span className="ml-3 font-medium">{section.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {activeSection === "personal" && renderPersonalInfo()}
                  {activeSection === "address" && renderAddressInfo()}
                  {activeSection === "professional" && renderProfessionalInfo()}
                  {activeSection === "social" && renderSocialLinks()}

                  {/* Submit Button */}
                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaSave className="mr-2" />
                      {loading ? "Saving Changes..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
