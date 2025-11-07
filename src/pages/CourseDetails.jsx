// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCourseById,
//   enrollCourse,
//   getEnrolledCourses,
// } from "../redux/courseSlice";

// const CourseDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { selectedCourse, loading, error, enrolledCourses } = useSelector(
//     (state) => state.courses
//   );
//   const token = useSelector((state) => state.auth.token);
//   const [showLessons, setShowLessons] = useState(false);
//   const [expandedSyllabusIndex, setExpandedSyllabusIndex] = useState(null);

//   useEffect(() => {
//     if (id) dispatch(fetchCourseById(id));
//     if (token) dispatch(getEnrolledCourses()); // Fetch enrolled courses
//   }, [dispatch, id, token]);

//   if (loading)
//     return <p className="text-center text-lg">Loading course details...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!selectedCourse) return <p className="text-center">Course not found.</p>;

//   const handleToggleLessons = () => {
//     setShowLessons(!showLessons);
//   };

//   const toggleSyllabus = (index) => {
//     setExpandedSyllabusIndex(expandedSyllabusIndex === index ? null : index);
//   };

//   const isAlreadyEnrolled = enrolledCourses?.some(
//     (course) => course._id === selectedCourse._id
//   );

//   const handleEnroll = async () => {
//     if (!token) {
//       alert("Please login to enroll.");
//       return;
//     }

//     if (isAlreadyEnrolled) {
//       alert("You are already enrolled in this course.");
//       return;
//     }

//     try {
//       await dispatch(enrollCourse(selectedCourse._id)).unwrap();

//       // ✅ Immediately update Redux state without needing a refresh
//       dispatch(getEnrolledCourses());
//     } catch (err) {
//       console.error("Enrollment failed:", err);
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto mt-2 text-white">
//       {/* <button
//       onClick={() => navigate(-1)}
//       className="mb-2 mx-6 px-4 py-1 bg-gray-800 text-white hover:bg-gray-700 rounded transition"
//     >
//       ← Back
//     </button> */}

//       {/* Header Section */}
//       <div
//         className="grid grid-cols-1 text-white md:grid-cols-5 gap-5 p-6 bg-white shadow-lg border border-gray-200 bg-gradient-to-r from-blue-700 to-blue-500
// "
//       >
//         {/* Course Information */}
//         <div className="col-span-1 md:col-span-3 mt-2 md:mt-0">
//           <h1 className="text-2xl md:text-3xl font-bold ">
//             {selectedCourse.title}
//           </h1>
//           <p className="text-gray-300 mt-2 text-sm md:text-base">
//             {selectedCourse.description}
//           </p>

//           {/* Additional Details */}
//           <div className="flex items-center gap-4 text-sm mt-3">
//             <p>
//               <strong>Category:</strong> {selectedCourse.category}
//             </p>
//             <p>
//               <strong>Certification:</strong>{" "}
//               {selectedCourse.certificationAvailable ? "Yes" : "No"}
//             </p>
//             <p>
//               <strong>Duration: </strong>
//               {selectedCourse.duration} Hrs
//             </p>
//             <p>
//               {" "}
//               <strong>Level: </strong> {selectedCourse.level || "Beginner"}
//             </p>
//           </div>

//           {/* Prerequisites */}
//           {selectedCourse.prerequisites && (
//             <p className="text-sm mt-3">
//               <strong>Prerequisites:</strong> {selectedCourse.prerequisites}
//             </p>
//           )}

//           {/* Pricing and Enrollment */}
//           <div className="mt-4">
//             <div className="text-lg font-bold text-white">
//               ₹{selectedCourse.price || "449"}
//             </div>
//             {isAlreadyEnrolled ? (
//               <button className="bg-white text-blue-700 px-5 py-2 mt-2 font-bold border-2 border-white hover:bg-blue-500 hover:text-white cursor-not-allowed">
//                 Already Enrolled
//               </button>
//             ) : (
//               <button
//                 onClick={handleEnroll}
//                 disabled={loading}
//                 className="bg-white text-blue-700 px-5 py-2 mt-2 font-bold border-2 border-white hover:bg-blue-500 hover:text-white transition-all duration-300"
//               >
//                 {loading ? "Enrolling..." : "Enroll Now"}
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Course Thumbnail on the Right Side */}
//         <div className="col-span-1 md:col-span-2 relative w-full h-52 md:h-60 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
//           <img
//             src={
//               selectedCourse.thumbnail || "https://via.placeholder.com/800x400"
//             }
//             alt={selectedCourse.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* Show Lessons Button */}
//       <div className="mt-6 mx-6">
//         <button
//           onClick={handleToggleLessons}
//           className="bg-blue-600 text-white font-bold px-4 py-2 hover:bg-blue-700 transition-all"
//         >
//           {showLessons ? "Hide Lessons" : "Show Lessons"}
//         </button>

//         {showLessons && (
//           <div className="mt-8 text-black">
//             {/* Course Lessons Heading */}

//             <h2 className="text-3xl font-bold">Lessons</h2>

//             {selectedCourse?.lessons?.length > 0 ? (
//               <div className="space-y-6">
//                 {selectedCourse.lessons.map((lesson, index) => {
//                   const isSample = index === 0;
//                   const canAccess = isAlreadyEnrolled || isSample;

//                   return (
//                     <div
//                       key={lesson._id}
//                       className="border border-blue-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
//                     >
//                       {/* Lesson Header */}
//                       <div className="p-4 bg-gradient-to-r from-blue-700 to-blue-500">
//                         <h4 className="text-lg font-semibold text-white">
//                           Lesson {index + 1}: {lesson.title}
//                           {isSample && !isAlreadyEnrolled && (
//                             <span className="ml-2 text-sm bg-yellow-300 text-black px-2 py-1 rounded-full">
//                               Sample
//                             </span>
//                           )}
//                         </h4>
//                       </div>

//                       {/* Lesson Content */}
//                       <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 items-center">
//                         {/* Lesson Info */}
//                         <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
//                           <h4 className="text-xl font-semibold text-gray-900 mb-2">
//                             {lesson.title}
//                           </h4>
//                           {lesson.description && (
//                             <p className="text-gray-600 text-base">
//                               {lesson.description}
//                             </p>
//                           )}
//                         </div>

//                         {/* Video Section */}
//                         <div className="col-span-1 md:col-span-3 flex justify-center items-center">
//                           {canAccess ? (
//                             <video
//                               src={lesson.videoUrl}
//                               controls
//                               className="w-full md:w-[95%] h-auto max-w-[800px] rounded-md shadow-md"
//                             />
//                           ) : (
//                             <div className="w-full h-[200px] flex items-center justify-center bg-gray-200 text-gray-600 rounded-md shadow-inner text-lg font-semibold">
//                               🔒 Enroll to unlock this lesson
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             ) : (
//               <p className="text-lg text-center text-gray-500 bg-gray-100 py-4 rounded-lg">
//                 🚫 No lessons available for this course.
//               </p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Syllabus Section */}
//       <div className="mt-8 mx-6">
//         <h3 className="text-3xl font-bold mb-5 text-gray-900">Syllabus</h3>
//         <div className="space-y-4">
//           {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 ? (
//             selectedCourse.syllabus.map((module, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-300 p-5 m-5 rounded-lg bg-gray-50 hover:shadow-md transition-all duration-300"
//               >
//                 <button
//                   onClick={() => toggleSyllabus(index)}
//                   className="w-full text-left font-semibold text-lg flex justify-between items-center focus:outline-none"
//                 >
//                   <span className="text-gray-900">{module.title}</span>
//                   <div className="flex items-center space-x-2">
//                     <span className="text-gray-600 text-sm">
//                       Module Details
//                     </span>
//                     <span className="text-gray-600">
//                       {expandedSyllabusIndex === index ? "▲" : "▼"}
//                     </span>
//                   </div>
//                 </button>
//                 {expandedSyllabusIndex === index && (
//                   <div className="mt-3 text-gray-700 transition-all duration-300">
//                     <p className="mt-2 bg-gray-100 p-4 rounded-lg">
//                       {module.description}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-700 text-lg">No syllabus available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;






// ----------------------------------------------------------------------------


import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseById,
  enrollCourse,
  getEnrolledCourses,
} from "../redux/courseSlice";
import { 
  FaPlay, 
  FaClock, 
  FaUser, 
  FaStar, 
  FaChevronDown, 
  FaChevronUp,
  FaBook,
  FaCertificate,
  FaLock,
  FaUnlock,
  FaArrowLeft,
  FaShare,
  FaHeart
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Simple Video Player Component
const VideoPlayer = ({ videoUrl, title, isLocked, onUnlock }) => {
  const videoRef = useRef(null);

  if (isLocked) {
    return (
      <div className="relative w-full h-64 bg-gray-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/50">
          <FaLock className="text-4xl mb-4 text-yellow-400" />
          <h3 className="text-xl font-bold mb-2">Lesson Locked</h3>
          <p className="text-gray-300 mb-4 text-center px-4">
            Enroll in the course to access all lessons
          </p>
          <button
            onClick={onUnlock}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Enroll to Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full h-auto max-h-96"
        controlsList="nodownload"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCourse, loading, error, enrolledCourses } = useSelector(
    (state) => state.courses
  );
  const { user, token } = useSelector((state) => state.auth);
  
  const [expandedModules, setExpandedModules] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id));
    }
    if (token) {
      dispatch(getEnrolledCourses());
    }
  }, [dispatch, id, token]);

  const toggleModule = (moduleIndex) => {
    setExpandedModules(prev =>
      prev.includes(moduleIndex)
        ? prev.filter(index => index !== moduleIndex)
        : [...prev, moduleIndex]
    );
  };

  const isAlreadyEnrolled = enrolledCourses?.some(
    (course) => course._id === selectedCourse?._id
  );

  const handleEnroll = async () => {
    if (!token) {
      alert("Please login to enroll in this course.");
      navigate('/login');
      return;
    }

    if (isAlreadyEnrolled) {
      alert("You are already enrolled in this course.");
      return;
    }

    setEnrollLoading(true);
    try {
      const result = await dispatch(enrollCourse(selectedCourse._id));
      
      if (enrollCourse.fulfilled.match(result)) {
        // Enrollment successful
        dispatch(getEnrolledCourses());
        alert("Successfully enrolled in the course!");
      } else {
        // Enrollment failed
        throw new Error(result.payload || "Enrollment failed");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      alert(`Enrollment failed: ${err.message}`);
    } finally {
      setEnrollLoading(false);
    }
  };

  const playVideo = (videoUrl, title) => {
    setCurrentVideo({ url: videoUrl, title });
    setShowVideoModal(true);
  };

  // Mock video data - Replace with actual video URLs from your backend
  const mockVideos = {
    "physics-intro": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "chemistry-basics": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "maths-fundamentals": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
  };

  const getVideoUrl = (lessonTitle) => {
    // First try to get from course data
    if (selectedCourse?.lessons?.[0]?.videoUrl) {
      return selectedCourse.lessons[0].videoUrl;
    }
    
    // Fallback to mock videos based on course title
    const key = selectedCourse?.title?.toLowerCase().split(' ')[0];
    return mockVideos[key] || mockVideos["physics-intro"];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-300 rounded-xl"></div>
                <div className="h-32 bg-gray-300 rounded-xl"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Course</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  if (!selectedCourse) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
        <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate("/courses")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Courses
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Courses</span>
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <FaShare />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8"
            >
              <div className="relative h-64 lg:h-80">
                <img
                  src={selectedCourse.thumbnail || "https://via.placeholder.com/800x400"}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCourse.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {selectedCourse.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {selectedCourse.description}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    <span>{selectedCourse.duration || '10'} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUser className="text-green-500" />
                    <span>{selectedCourse.level || "Beginner"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCertificate className="text-purple-500" />
                    <span>{selectedCourse.certificationAvailable ? "Certificate" : "No Certificate"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span>4.8 (1.2k reviews)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Free Preview Section */}
            {!isAlreadyEnrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8"
              >
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <FaUnlock className="text-green-500" />
                    Free Preview
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Watch the introduction to see if this course is right for you
                  </p>
                </div>

                <div className="p-6">
                  <VideoPlayer
                    videoUrl={getVideoUrl(selectedCourse.title)}
                    title="Course Introduction"
                    isLocked={false}
                  />
                </div>
              </motion.div>
            )}

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8"
            >
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: "overview", label: "Overview" },
                    { id: "curriculum", label: "Curriculum" },
                    { id: "instructor", label: "Instructor" },
                    { id: "reviews", label: "Reviews" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About This Course</h3>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedCourse.description}
                        </p>
                      </div>

                      {selectedCourse.prerequisites && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h4>
                          <p className="text-gray-600">{selectedCourse.prerequisites}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">What You'll Learn</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {(selectedCourse.syllabus || []).slice(0, 6).map((module, index) => (
                            <div key={index} className="flex items-center gap-3 text-gray-600">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>{module.title || `Module ${index + 1}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "curriculum" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Course Content</h3>
                        <div className="text-sm text-gray-600">
                          {(selectedCourse.syllabus || []).length} modules • {selectedCourse.duration || '10'} hours
                        </div>
                      </div>
                      
                      {(selectedCourse.syllabus || []).map((module, moduleIndex) => (
                        <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleModule(moduleIndex)}
                            className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                          >
                            <div className="flex items-center gap-3">
                              <FaBook className="text-blue-500" />
                              <div className="text-left">
                                <h4 className="font-semibold text-gray-900">
                                  {module.title || `Module ${moduleIndex + 1}`}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {module.lessons?.length || 5} lessons • {module.duration || '2 hours'}
                                </p>
                              </div>
                            </div>
                            {expandedModules.includes(moduleIndex) ? (
                              <FaChevronUp className="text-gray-400" />
                            ) : (
                              <FaChevronDown className="text-gray-400" />
                            )}
                          </button>

                          <AnimatePresence>
                            {expandedModules.includes(moduleIndex) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-4 space-y-3 bg-white">
                                  {(module.lessons || Array.from({ length: 5 }, (_, i) => ({
                                    title: `Lesson ${i + 1}: ${module.title || `Module ${moduleIndex + 1}`} Part ${i + 1}`,
                                    duration: '15 min',
                                    isFree: i === 0
                                  }))).map((lesson, lessonIndex) => {
                                    const isFreePreview = lessonIndex === 0;
                                    const canAccess = isAlreadyEnrolled || isFreePreview;

                                    return (
                                      <div
                                        key={lessonIndex}
                                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                                      >
                                        <div className="flex items-center gap-3">
                                          {canAccess ? (
                                            <FaUnlock className="text-green-500" />
                                          ) : (
                                            <FaLock className="text-gray-400" />
                                          )}
                                          <div>
                                            <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                                            <p className="text-sm text-gray-600">
                                              {lesson.duration || '15 min'}
                                              {isFreePreview && !isAlreadyEnrolled && (
                                                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                                  Free Preview
                                                </span>
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                        {canAccess ? (
                                          <button 
                                            onClick={() => playVideo(getVideoUrl(lesson.title), lesson.title)}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                          >
                                            <FaPlay className="text-xs" />
                                            Watch
                                          </button>
                                        ) : (
                                          <span className="text-sm text-gray-500">Locked</span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Other tabs remain the same */}
                  {activeTab === "instructor" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                        {selectedCourse.instructor?.[0] || "A"}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {selectedCourse.instructor || "Expert Instructor"}
                      </h3>
                      <p className="text-gray-600 mb-4">Senior Educator with 10+ years experience</p>
                      <p className="text-gray-600 max-w-2xl mx-auto">
                        Dedicated to providing quality education to Jammu & Kashmir students with 
                        practical knowledge and real-world applications.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === "reviews" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <div className="text-6xl mb-4">⭐</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Student Reviews</h3>
                      <p className="text-gray-600">Be the first to review this course!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24 space-y-6"
            >
              {/* Pricing Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedCourse.price === 0 || selectedCourse.price === '0' ? (
                      "FREE"
                    ) : (
                      `₹${selectedCourse.price || "999"}`
                    )}
                  </div>
                  {selectedCourse.originalPrice && selectedCourse.originalPrice > selectedCourse.price && (
                    <div className="text-lg text-gray-500 line-through">
                      ₹{selectedCourse.originalPrice}
                    </div>
                  )}
                </div>

                {isAlreadyEnrolled ? (
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <FaPlay />
                    Continue Learning
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrollLoading}
                    className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                      enrollLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                    }`}
                  >
                    {enrollLoading ? "Enrolling..." : (
                      selectedCourse.price === 0 || selectedCourse.price === '0' ? "Enroll for FREE" : "Enroll Now"
                    )}
                  </button>
                )}

                <div className="mt-4 text-center text-sm text-gray-600">
                  ✅ 30-day money-back guarantee
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{selectedCourse.duration || '10'} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium">{selectedCourse.level || "Beginner"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificate</span>
                    <span className="font-medium">
                      {selectedCourse.certificationAvailable ? "Included" : "Not Included"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Access</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">This course includes:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <FaPlay className="text-blue-500" />
                    <span>{selectedCourse.duration || '10'} hours on-demand video</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <FaBook className="text-green-500" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <FaCertificate className="text-purple-500" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <FaLock className="text-yellow-500" />
                    <span>Full lifetime access</span>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUser className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Need help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is here to assist you
                </p>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  Contact Support
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && currentVideo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={() => setShowVideoModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black rounded-lg overflow-hidden w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-white font-semibold">{currentVideo.title}</h3>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <VideoPlayer
                  videoUrl={currentVideo.url}
                  title={currentVideo.title}
                  isLocked={false}
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetails;
