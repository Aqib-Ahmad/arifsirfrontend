// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCourses } from "../redux/courseSlice";
// import { useLocation } from "react-router-dom";
// import CourseCard from "../components/CourseCard";
// import { motion } from "framer-motion";

// const CoursesList = () => {
//     const dispatch = useDispatch();
//     const { courses, loading, error } = useSelector((state) => state.courses);
//     const location = useLocation();

//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredCourses, setFilteredCourses] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 8;

//     const [priceFilter, setPriceFilter] = useState("");
//     const [typeFilter, setTypeFilter] = useState("");
//     const [durationFilter, setDurationFilter] = useState("");
//     const [levelFilter, setLevelFilter] = useState("");

//     useEffect(() => {
//         dispatch(fetchAllCourses());
//     }, [dispatch]);

//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const query = params.get("query") || "";
//         setSearchQuery(query);
//     }, [location.search]);

//     useEffect(() => {
//         let filtered = [...courses];

//         if (searchQuery.trim() !== "") {
//             filtered = filtered.filter((course) =>
//                 course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 course.category.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }

//         if (priceFilter) {
//             filtered = filtered.filter((course) => {
//                 const price = course.price;
//                 switch (priceFilter) {
//                     case "<5000": return price < 5000;
//                     case "5000-10000": return price >= 5000 && price <= 10000;
//                     case "10000-15000": return price > 10000 && price <= 15000;
//                     case "15000-20000": return price > 15000 && price <= 20000;
//                     case ">20000": return price > 20000;
//                     default: return true;
//                 }
//             });
//         }

//         if (typeFilter) {
//             filtered = filtered.filter((course) =>
//                 typeFilter === "free" ? course.price === 0 : course.price > 0
//             );
//         }

//         if (durationFilter) {
//             filtered = filtered.filter((course) => {
//                 const duration = course.duration;
//                 if (durationFilter === "short") return duration <= 2;
//                 if (durationFilter === "medium") return duration > 2 && duration <= 5;
//                 if (durationFilter === "long") return duration > 5;
//                 return true;
//             });
//         }

//         if (levelFilter) {
//             filtered = filtered.filter((course) =>
//                 course.courseLevel.toLowerCase() === levelFilter.toLowerCase()
//             );
//         }

//         setFilteredCourses(filtered);
//         setCurrentPage(1);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }, [courses, searchQuery, priceFilter, typeFilter, durationFilter, levelFilter]);

//     const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
//     const currentCourses = filteredCourses.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );
//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//             window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: Scroll to top on page change
//         }
//     };

//     const goToPage = (page) => setCurrentPage(page);

//     const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

//     if (loading) {
//         return (
//             <div className="p-6 bg-gray-100">
//                 <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
//                     Loading Courses...
//                 </h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//                     {[...Array(8)].map((_, idx) => (
//                         <div key={idx} className="bg-white p-4 rounded-lg shadow animate-pulse">
//                             <div className="h-40 bg-gray-300 rounded mb-4"></div>
//                             <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//                             <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
//                             <div className="h-3 bg-gray-200 rounded w-1/3"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     if (error) return <p className="text-red-500 text-center">{error}</p>;

//     return (
//         <div className="p-6 bg-gray-200">
//             <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
//                 Available Courses
//             </h1>

//             <motion.div
//                 className="bg-white p-6 rounded-xl shadow-xl mb-8 border border-gray-200"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 <div className="flex justify-end mb-4">
//                     <button
//                         onClick={() => {
//                             setPriceFilter("");
//                             setTypeFilter("");
//                             setDurationFilter("");
//                             setLevelFilter("");
//                         }}
//                         className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md"
//                         title="Reset Filters"
//                     >
//                         ↺
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     <div>
//                         <label className="block text-gray-700 font-medium mb-1">💰 Price Range</label>
//                         <select
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={priceFilter}
//                             onChange={(e) => setPriceFilter(e.target.value)}
//                         >
//                             <option value="">All</option>
//                             <option value="<5000">Less than ₹5000</option>
//                             <option value="5000-10000">₹5000 - ₹10000</option>
//                             <option value="10000-15000">₹10000 - ₹15000</option>
//                             <option value="15000-20000">₹15000 - ₹20000</option>
//                             <option value=">20000">More than ₹20000</option>
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 font-medium mb-1">🎟️ Type</label>
//                         <select
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={typeFilter}
//                             onChange={(e) => setTypeFilter(e.target.value)}
//                         >
//                             <option value="">All</option>
//                             <option value="free">Free</option>
//                             <option value="paid">Paid</option>
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 font-medium mb-1">⏳ Duration</label>
//                         <select
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={durationFilter}
//                             onChange={(e) => setDurationFilter(e.target.value)}
//                         >
//                             <option value="">All</option>
//                             <option value="short">0-2 hours</option>
//                             <option value="medium">2-5 hours</option>
//                             <option value="long">5+ hours</option>
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-gray-700 font-medium mb-1">📚 Level</label>
//                         <select
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             value={levelFilter}
//                             onChange={(e) => setLevelFilter(e.target.value)}
//                         >
//                             <option value="">All</option>
//                             <option value="beginner">Beginner</option>
//                             <option value="intermediate">Intermediate</option>
//                             <option value="advance">Advance</option>
//                         </select>
//                     </div>
//                 </div>
//             </motion.div>

//             {searchQuery && (
//                 <p className="text-center text-lg text-gray-600 mb-4">
//                     Search results for: <span className="font-semibold text-blue-600">{searchQuery}</span>
//                 </p>
//             )}

//             <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
//                 {currentCourses.length > 0 ? (
//                     currentCourses.map((course) => (
//                         <motion.div
//                             key={course._id}
//                             initial={{ opacity: 0, y: 50 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5 }}
//                             viewport={{ once: true, amount: 0.3 }}
//                         >
//                             <CourseCard
//                                 image={course.thumbnail || "https://via.placeholder.com/300"}
//                                 category={course.category || "Coding"}
//                                 heading={course.title || "Untitled Course"}
//                                 level={course.courseLevel || "Beginner"}
//                                 duration={course.duration || "N/A"}
//                                 link={`/CourseDetails/${course._id}`}
//                             />
//                         </motion.div>
//                     ))
//                 ) : (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.5 }}
//                         className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg"
//                     >
//                         <img
//                             src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-5302901-4448828.png"
//                             alt="No Results"
//                             className="w-48 h-48 object-contain mb-4"
//                         />
//                         <p className="text-lg text-gray-600">🚫 No courses found. Try a different search.</p>
//                     </motion.div>
//                 )}
//             </div>

//             {totalPages > 1 && (
//                 <div className="mt-10 flex flex-col items-center space-y-4">
//                     <div className="flex space-x-2">
//                         <button
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                             className={`px-4 py-2 rounded-md text-sm font-medium border transition ${currentPage === 1
//                                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                                 : " text-white bg-blue-600 hover:bg-blue-700"
//                                 }`}
//                         >
//                             Prev
//                         </button>
//                         <button
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                             className={`px-4 py-2 rounded-md text-sm font-medium border transition ${currentPage === totalPages
//                                 ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                                 : "text-white bg-blue-600 hover:bg-blue-700"
//                                 }`}
//                         >
//                             Next
//                         </button>
//                     </div>

//                     <p className="text-sm text-gray-600">
//                         Page <span className="font-semibold">{currentPage}</span> of{" "}
//                         <span className="font-semibold">{totalPages}</span>
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CoursesList;

// --------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/courseSlice";
import { useLocation } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFilter,
  FaTimes,
  FaSearch,
  FaRupeeSign,
  FaClock,
  FaLayerGroup,
  FaChalkboardTeacher,
  FaStar,
  FaSortAmountDown,
} from "react-icons/fa";
import { FiBook, FiUsers, FiAward } from "react-icons/fi";

const CoursesList = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const itemsPerPage = 9;

  // Filter states
  const [priceFilter, setPriceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query") || "";
    setSearchQuery(query);
  }, [location.search]);

  useEffect(() => {
    let filtered = [...courses];

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter) {
      filtered = filtered.filter((course) => {
        const price = course.price || 0;
        switch (priceFilter) {
          case "free":
            return price === 0;
          case "<1000":
            return price > 0 && price < 1000;
          case "1000-3000":
            return price >= 1000 && price <= 3000;
          case "3000-5000":
            return price > 3000 && price <= 5000;
          case ">5000":
            return price > 5000;
          default:
            return true;
        }
      });
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter((course) =>
        typeFilter === "free"
          ? (course.price || 0) === 0
          : (course.price || 0) > 0
      );
    }

    // Duration filter
    if (durationFilter) {
      filtered = filtered.filter((course) => {
        const duration = course.duration || 0;
        if (durationFilter === "short") return duration <= 10;
        if (durationFilter === "medium") return duration > 10 && duration <= 30;
        if (durationFilter === "long") return duration > 30;
        return true;
      });
    }

    // Level filter
    if (levelFilter) {
      filtered = filtered.filter(
        (course) => course.level?.toLowerCase() === levelFilter.toLowerCase()
      );
    }

    // Class filter
    if (classFilter) {
      filtered = filtered.filter((course) =>
        course.category?.toLowerCase().includes(classFilter.toLowerCase())
      );
    }

    // Subject filter
    if (subjectFilter) {
      filtered = filtered.filter(
        (course) =>
          course.title?.toLowerCase().includes(subjectFilter.toLowerCase()) ||
          course.category?.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    }

    // Teacher filter
    if (teacherFilter) {
      filtered = filtered.filter((course) =>
        course.instructor?.toLowerCase().includes(teacherFilter.toLowerCase())
      );
    }

    // Sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return (a.price || 0) - (b.price || 0);
          case "price-high":
            return (b.price || 0) - (a.price || 0);
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "duration":
            return (a.duration || 0) - (b.duration || 0);
          case "popular":
            return (b.enrolledStudents || 0) - (a.enrolledStudents || 0);
          default:
            return 0;
        }
      });
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  }, [
    courses,
    searchQuery,
    priceFilter,
    typeFilter,
    durationFilter,
    levelFilter,
    classFilter,
    subjectFilter,
    teacherFilter,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const resetFilters = () => {
    setPriceFilter("");
    setTypeFilter("");
    setDurationFilter("");
    setLevelFilter("");
    setClassFilter("");
    setSubjectFilter("");
    setTeacherFilter("");
    setSortBy("");
    setSearchQuery("");
  };

  const activeFiltersCount = [
    priceFilter,
    typeFilter,
    durationFilter,
    levelFilter,
    classFilter,
    subjectFilter,
    teacherFilter,
    sortBy,
  ].filter(Boolean).length;

  // Academic classes and subjects
  const academicClasses = [
    "Class 11",
    "Class 12",
    "Undergraduate",
    "Postgraduate",
    "Competitive Exams",
  ];

  const subjects = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science",
    "Accountancy",
    "Business Studies",
    "Economics",
    "History",
    "Political Science",
    "Geography",
    "English",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 h-96"></div>
              </div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow-lg p-4 h-80"
                    >
                      <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Courses
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => dispatch(fetchAllCourses())}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Explore Courses
              </h1>
              <p className="text-gray-600">
                Discover the perfect course for your academic journey
              </p>
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200"
              >
                <FaFilter className="text-blue-600" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white pl-10 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sort by</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration">Duration</option>
                </select>
                <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mt-6 max-w-2xl">
            <input
              type="text"
              placeholder="Search courses, subjects, teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FaFilter className="text-blue-600" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Reset All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Class Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiBook className="text-blue-500" />
                    Class Level
                  </label>
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Classes</option>
                    {academicClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiAward className="text-green-500" />
                    Subject
                  </label>
                  <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Subjects</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Teacher Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaChalkboardTeacher className="text-purple-500" />
                    Teacher
                  </label>
                  <input
                    type="text"
                    placeholder="Search teacher..."
                    value={teacherFilter}
                    onChange={(e) => setTeacherFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaRupeeSign className="text-yellow-500" />
                    Price
                  </label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Prices</option>
                    <option value="free">Free</option>
                    <option value="<1000">Under ₹1000</option>
                    <option value="1000-3000">₹1000 - ₹3000</option>
                    <option value="3000-5000">₹3000 - ₹5000</option>
                    <option value=">5000">Above ₹5000</option>
                  </select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaClock className="text-red-500" />
                    Duration
                  </label>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any Duration</option>
                    <option value="short">Short (0-10 hrs)</option>
                    <option value="medium">Medium (10-30 hrs)</option>
                    <option value="long">Long (30+ hrs)</option>
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaLayerGroup className="text-indigo-500" />
                    Level
                  </label>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredCourses.length}
                  </span>{" "}
                  courses
                </p>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {priceFilter && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    💰 {priceFilter === "free" ? "Free" : "Paid"}
                    <button onClick={() => setPriceFilter("")}>×</button>
                  </span>
                )}
                {classFilter && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    📚 {classFilter}
                    <button onClick={() => setClassFilter("")}>×</button>
                  </span>
                )}
                {subjectFilter && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    📖 {subjectFilter}
                    <button onClick={() => setSubjectFilter("")}>×</button>
                  </span>
                )}
                {teacherFilter && (
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    👨‍🏫 {teacherFilter}
                    <button onClick={() => setTeacherFilter("")}>×</button>
                  </span>
                )}
              </motion.div>
            )}

            {/* Courses Grid */}
            <AnimatePresence>
              {currentCourses.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {currentCourses.map((course, index) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <CourseCard
                        image={course.thumbnail}
                        category={course.category}
                        heading={course.title}
                        level={course.level}
                        duration={course.duration}
                        link={`/CourseDetails/${course._id}`}
                        rating={course.rating || 4.5}
                        students={course.enrolledStudents || 0}
                        instructor={course.instructor}
                        price={course.price}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-12 text-center"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <FiBook className="text-4xl text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 flex flex-col items-center space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-lg border border-gray-200"
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white shadow-lg border border-gray-200"
                    }`}
                  >
                    Next
                  </button>
                </div>

                <p className="text-sm text-gray-600">
                  Page{" "}
                  <span className="font-semibold text-gray-900">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {totalPages}
                  </span>{" "}
                  •{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredCourses.length}
                  </span>{" "}
                  courses
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                {/* Mobile Filter Content - Same as desktop but stacked */}
                <div className="space-y-6">
                  {/* Add the same filter components as desktop sidebar here */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Class Level
                    </label>
                    <select
                      value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Classes</option>
                      {academicClasses.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Add other filters similarly */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Subjects</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price
                    </label>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">All Prices</option>
                      <option value="free">Free</option>
                      <option value="<1000">Under ₹1000</option>
                      <option value="1000-3000">₹1000 - ₹3000</option>
                      <option value="3000-5000">₹3000 - ₹5000</option>
                      <option value=">5000">Above ₹5000</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesList;
