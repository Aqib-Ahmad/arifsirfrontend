// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "../redux/authSlice";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
// import devdojo from "../assets/DevDojo.png";
// import { fetchCurrentUser } from "../redux/userSlice";
// import userImage from "/user.png";
// import { toast } from "react-toastify";
// import useNetworkStatus from "../hooks/useNetworkStatus";

// function Navbar() {
//   const [modalType, setModalType] = useState(null);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { currentUser } = useSelector((state) => state.users);

//   const navigate = useNavigate();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     if (user) dispatch(fetchCurrentUser());
//   }, [dispatch, user]);

//   const openLogin = () => setModalType("login");
//   const openRegister = () => setModalType("register");
//   const closeModal = () => setModalType(null);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     dispatch({ type: "user/resetCurrentUser" });
//     navigate("/");
//     setDropdownOpen(false);
//     setMenuOpen(false);
//     toast.success("Logged Out Successfully!");
//   };

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim() !== "") {
//       navigate(`/courses?query=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setMenuOpen(false);
//     }
//   };
//   const isOnline = useNetworkStatus();
//   const wasOnline = useRef(isOnline);

//   useEffect(() => {
//     if (wasOnline.current !== isOnline) {
//       if (!isOnline) {
//         toast.error("You're offline. Some features may not work.");
//       } else {
//         toast.success("You're back online!");
//       }
//       wasOnline.current = isOnline;
//     }
//   }, [isOnline]);

//   // ------------------
//   const courseCategories = {
//     "Class 11/12": ["Physics", "Chemistry", "Maths", "Biology", "English"],
//     UG: ["B.Sc", "B.Com", "B.A", "B.Tech"],
//     PG: ["M.Sc", "M.Com", "M.A", "M.Tech"],
//   };
//   return (
//     <>
//       <header className="w-full fixed z-50 bg-white shadow-md">
//         <div className="flex justify-between items-center px-6 md:px-10 py-3 text-gray-800">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             {/* <img className="w-28" src={devdojo} alt="Logo" /> */}
//             <p className="w-28">Reabar Online </p>
//           </Link>

//           {/* Mobile Menu Icon */}
//           <button
//             className="md:hidden text-2xl text-gray-700"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </button>

//           {/* Desktop Menu */}
//           <nav className="hidden md:flex items-center gap-6 text-sm">
//             <Link
//               to="/courses"
//               className="hover:text-blue-600 transition-all font-medium"
//             >
//               Courses
//             </Link>

//             {user && (
//               <Link
//                 to="/exams"
//                 className="hover:text-blue-600 transition-all font-medium"
//               >
//                 Exams
//               </Link>
//             )}

//             {/* Search Bar */}
//             <input
//               type="text"
//               placeholder="Search for courses..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearch}
//               className="px-3 py-2 w-80 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//             />

//             {/* Auth/Dropdown */}
//             {user && currentUser ? (
//               <div className="relative">
//                 <button
//                   className="flex items-center gap-2 bg-blue-600 px-3 py-2 text-white rounded-md hover:bg-blue-500 transition"
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                 >
//                   <img
//                     src={currentUser.profilePicture || userImage}
//                     alt="Profile"
//                     className="w-6 h-6 rounded-full object-cover"
//                   />
//                   {currentUser.username}
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-md overflow-hidden z-50 animate-fadeIn">
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-sm hover:bg-gray-100"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                     <button
//                       className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <button
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//                   onClick={openLogin}
//                 >
//                   Login
//                 </button>
//                 <button
//                   className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
//                   onClick={openRegister}
//                 >
//                   Sign Up
//                 </button>
//               </>
//             )}
//           </nav>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden flex flex-col items-center py-4 gap-4 bg-white shadow-lg z-40">
//             <div className="relative group">
//               <button className="hover:text-blue-600 transition-all font-medium">
//                 Courses ▾
//               </button>

//               {/* First Dropdown - Class Levels */}
//               <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded hidden group-hover:block z-50">
//                 {Object.keys(courseCategories).map((classLevel) => (
//                   <div key={classLevel} className="relative group/item">
//                     <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
//                       {classLevel} ▸
//                     </button>

//                     {/* Second Dropdown - Subjects */}
//                     <div className="absolute top-0 left-full ml-1 w-48 bg-white shadow-md rounded hidden group-hover/item:block">
//                       {courseCategories[classLevel].map((subject) => (
//                         <Link
//                           key={subject}
//                           to={`/courses/${classLevel
//                             .toLowerCase()
//                             .replace(/\s/g, "")}/${subject.toLowerCase()}`}
//                           className="block px-4 py-2 hover:bg-gray-100"
//                         >
//                           {subject}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {user && (
//               <Link
//                 to="/exams"
//                 className="text-lg font-medium hover:text-blue-600"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Exams
//               </Link>
//             )}

//             <input
//               type="text"
//               placeholder="Search for courses..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={handleSearch}
//               className="px-4 py-2 w-4/5 border rounded-md focus:ring-2 focus:ring-blue-500"
//             />

//             {user ? (
//               <>
//                 <Link
//                   to="/profile"
//                   className="text-lg font-medium hover:text-blue-600"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   className="text-red-500 font-medium hover:text-red-700"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//                   onClick={openLogin}
//                 >
//                   Login
//                 </button>
//                 <button
//                   className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
//                   onClick={openRegister}
//                 >
//                   Sign Up
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//         {!isOnline && (
//           <div className="bg-red-600 text-white text-center text-sm py-1 animate-pulse">
//             ⚠️ You are currently offline
//           </div>
//         )}
//       </header>

//       {/* Login & Register Modals */}
//       {modalType === "login" && (
//         <Login
//           isOpen={true}
//           onClose={closeModal}
//           onRegisterClick={openRegister}
//         />
//       )}
//       {modalType === "register" && (
//         <Register isOpen={true} onClose={closeModal} onLoginClick={openLogin} />
//       )}
//     </>
//   );
// }

// export default Navbar;

// -----------------------------------------------------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import Register from "../pages/Register";
import Login from "../pages/Login";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaBook,
  FaSearch,
  FaChevronRight,
} from "react-icons/fa";
import { FiBook, FiUser, FiLogOut } from "react-icons/fi";
import { fetchCurrentUser } from "../redux/userSlice";
import userImage from "/user.png";
import { toast } from "react-toastify";
import useNetworkStatus from "../hooks/useNetworkStatus";

function Navbar() {
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [activeClass, setActiveClass] = useState(null);

  // Mobile menu states
  const [mobileActiveLevel, setMobileActiveLevel] = useState(null);
  const [mobileActiveStream, setMobileActiveStream] = useState(null);

  const coursesDropdownRef = useRef(null);
  const coursesButtonRef = useRef(null);
  const userDropdownRef = useRef(null);
  const userButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    if (user) dispatch(fetchCurrentUser());
  }, [dispatch, user]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Courses dropdown
      if (
        coursesDropdownRef.current &&
        !coursesDropdownRef.current.contains(event.target) &&
        coursesButtonRef.current &&
        !coursesButtonRef.current.contains(event.target)
      ) {
        setCoursesDropdownOpen(false);
        setActiveClass(null);
      }

      // User dropdown
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

      // Mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        event.target.closest("button")?.className?.includes?.("md:hidden") ===
          false
      ) {
        setMenuOpen(false);
        setMobileActiveLevel(null);
        setMobileActiveStream(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
      setMobileActiveLevel(null);
      setMobileActiveStream(null);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, [menuOpen]);

  const openLogin = () => {
    setModalType("login");
    setMenuOpen(false);
  };

  const openRegister = () => {
    setModalType("register");
    setMenuOpen(false);
  };

  const closeModal = () => setModalType(null);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch({ type: "user/resetCurrentUser" });
    navigate("/");
    setDropdownOpen(false);
    setMenuOpen(false);
    toast.success("Logged Out Successfully!");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/courses?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const toggleUserDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleCoursesDropdown = () => {
    setCoursesDropdownOpen(!coursesDropdownOpen);
    if (!coursesDropdownOpen) {
      setActiveClass(null);
    }
  };

  // Mobile menu handlers
  const handleMobileLevelClick = (level) => {
    if (mobileActiveLevel === level) {
      setMobileActiveLevel(null);
      setMobileActiveStream(null);
    } else {
      setMobileActiveLevel(level);
      setMobileActiveStream(null);
    }
  };

  const handleMobileStreamClick = (stream) => {
    if (mobileActiveStream === stream) {
      setMobileActiveStream(null);
    } else {
      setMobileActiveStream(stream);
    }
  };

  const handleMobileSubjectClick = () => {
    setMenuOpen(false);
    setMobileActiveLevel(null);
    setMobileActiveStream(null);
  };

  const isOnline = useNetworkStatus();
  const wasOnline = useRef(isOnline);

  useEffect(() => {
    if (wasOnline.current !== isOnline) {
      if (!isOnline) {
        toast.error("You're offline. Some features may not work.");
      } else {
        toast.success("You're back online!");
      }
      wasOnline.current = isOnline;
    }
  }, [isOnline]);

  // Course Categories with subjects
  const courseCategories = {
    "Class 11": {
      Science: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
        "Computer Science",
      ],
      Commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
      Arts: [
        "History",
        "Political Science",
        "Geography",
        "Psychology",
        "Sociology",
      ],
    },
    "Class 12": {
      Science: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
        "Computer Science",
      ],
      Commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
      Arts: [
        "History",
        "Political Science",
        "Geography",
        "Psychology",
        "Sociology",
      ],
    },
    Undergraduate: {
      "Bachelor of Arts": [
        "English Literature",
        "History",
        "Political Science",
        "Economics",
        "Sociology",
        "Psychology",
      ],
      "Bachelor of Science": [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
        "Computer Science",
        "Statistics",
      ],
      "Bachelor of Commerce": [
        "Accountancy",
        "Business Studies",
        "Economics",
        "Finance",
        "Banking",
      ],
      "Professional Degrees": ["B.Tech", "BBA", "BCA", "B.Ed", "LLB"],
    },
    Postgraduate: {
      "Master of Arts": [
        "English",
        "History",
        "Political Science",
        "Economics",
        "Sociology",
      ],
      "Master of Science": [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
        "Computer Science",
      ],
      "Master of Commerce": [
        "Accountancy",
        "Business Studies",
        "Economics",
        "Finance",
      ],
      "Professional Degrees": ["M.Tech", "MBA", "MCA", "M.Ed", "LLM"],
    },
    "Competitive Exams": {
      Engineering: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE"],
      Medical: ["NEET UG", "NEET PG", "AIIMS", "JIPMER"],
      "Government Jobs": [
        "JKSSB",
        "UPSC",
        "SSC CGL",
        "SSC CHSL",
        "Banking PO",
        "Banking Clerk",
      ],
      "Other Exams": ["NDA", "CDS", "Teaching Exams", "Railway Exams"],
    },
  };

  return (
    <>
      <header className="w-full fixed top-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 text-gray-800">
          {/* Logo - Clickable for Home */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-1.5 sm:p-2 rounded-lg">
              <FaBook className="text-lg sm:text-xl" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rehbar Online
              </h1>
              <p className="text-xs text-gray-500">Jammu & Kashmir</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Rehbar
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm">
            {/* Courses Dropdown */}
            <div className="relative">
              <button
                ref={coursesButtonRef}
                className="flex items-center gap-2 hover:text-blue-600 transition-all font-medium text-gray-700 hover:font-semibold px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200"
                onClick={toggleCoursesDropdown}
                onMouseEnter={() => setCoursesDropdownOpen(true)}
              >
                <FiBook className="text-base lg:text-lg" />
                <span className="hidden lg:inline">Courses</span>
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    coursesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {coursesDropdownOpen && (
                <div
                  ref={coursesDropdownRef}
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-[90vw] max-w-4xl bg-white shadow-2xl rounded-2xl border border-gray-200 overflow-hidden z-50"
                  onMouseEnter={() => setCoursesDropdownOpen(true)}
                  onMouseLeave={() => {
                    setCoursesDropdownOpen(false);
                    setActiveClass(null);
                  }}
                >
                  <div className="flex flex-col lg:flex-row h-[70vh] lg:h-96">
                    {/* Left Side - Class Levels */}
                    <div className="w-full lg:w-1/3 bg-gradient-to-b from-blue-50 to-purple-50 border-b lg:border-b-0 lg:border-r border-gray-200">
                      <div className="p-3 lg:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
                        <h3 className="font-bold text-white text-base lg:text-lg flex items-center gap-2">
                          Academic Programs
                        </h3>
                        <p className="text-blue-100 text-xs lg:text-sm mt-1">
                          Choose your level
                        </p>
                      </div>
                      <div className="p-2 lg:p-3 space-y-1 max-h-48 lg:max-h-full overflow-y-auto">
                        {Object.keys(courseCategories).map((classLevel) => (
                          <button
                            key={classLevel}
                            onMouseEnter={() => setActiveClass(classLevel)}
                            onClick={() => setActiveClass(classLevel)}
                            className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all duration-200 flex items-center gap-2 lg:gap-3 ${
                              activeClass === classLevel
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                : "text-gray-700 hover:bg-white hover:shadow-md"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${
                                activeClass === classLevel
                                  ? "bg-white"
                                  : "bg-blue-500"
                              }`}
                            ></div>
                            <span className="font-medium text-sm lg:text-base">
                              {classLevel}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right Side - Subjects */}
                    <div className="w-full lg:w-2/3 p-4 lg:p-6 overflow-y-auto">
                      {activeClass ? (
                        <>
                          <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                              <FiBook className="text-white text-base lg:text-lg" />
                            </div>
                            <div>
                              <h3 className="text-lg lg:text-2xl font-bold text-gray-900">
                                {activeClass}
                              </h3>
                              <p className="text-gray-600 text-sm lg:text-base">
                                Select your stream and subject
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {Object.entries(courseCategories[activeClass]).map(
                              ([stream, subjects]) => (
                                <div
                                  key={stream}
                                  className="bg-gray-50 rounded-xl p-3 lg:p-4 border border-gray-200"
                                >
                                  <h4 className="font-bold text-gray-800 mb-2 lg:mb-3 text-xs lg:text-sm uppercase tracking-wide text-blue-700 border-b border-gray-300 pb-2">
                                    {stream}
                                  </h4>
                                  <div className="space-y-1 lg:space-y-2">
                                    {subjects.map((subject) => (
                                      <Link
                                        key={subject}
                                        to={`/courses/${activeClass
                                          .toLowerCase()
                                          .replace(/\s/g, "-")}/${stream
                                          .toLowerCase()
                                          .replace(/\s/g, "-")}/${subject
                                          .toLowerCase()
                                          .replace(/\s/g, "-")}`}
                                        className="block text-xs lg:text-sm text-gray-600 hover:text-blue-600 hover:font-medium transition-all py-1 lg:py-2 px-2 lg:px-3 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-blue-200"
                                        onClick={() => {
                                          setCoursesDropdownOpen(false);
                                          setActiveClass(null);
                                        }}
                                      >
                                        {subject}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-8 lg:py-0">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                            <FiBook className="text-blue-600 text-xl lg:text-2xl" />
                          </div>
                          <h3 className="text-lg lg:text-xl font-bold text-gray-700 mb-2">
                            Select Academic Level
                          </h3>
                          <p className="text-gray-500 text-sm lg:text-base max-w-md">
                            Choose from Class 11, Class 12, Undergraduate,
                            Postgraduate, or Competitive Exams to view available
                            subjects
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 lg:p-4 text-center border-t border-blue-500">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <p className="text-white text-xs lg:text-sm">
                        🎯 <strong>25,000+</strong> J&K Students Already
                        Learning
                      </p>
                      <Link
                        to="/courses"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 lg:px-6 py-1.5 lg:py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
                        onClick={() => {
                          setCoursesDropdownOpen(false);
                          setActiveClass(null);
                        }}
                      >
                        View All Courses
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user && (
              <Link
                to="/exams"
                className="hover:text-blue-600 transition-all font-medium text-gray-700 hover:font-semibold px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-50 border border-transparent hover:border-blue-200"
              >
                Practice Tests
              </Link>
            )}

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="px-3 lg:px-4 pl-8 lg:pl-10 py-2 w-48 lg:w-64 xl:w-80 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 text-sm"
              />
              <FaSearch className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs lg:text-sm" />
            </div>

            {/* Auth/Dropdown */}
            {user && currentUser ? (
              <div className="relative">
                <button
                  ref={userButtonRef}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-3 lg:px-4 py-2 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-500"
                  onClick={toggleUserDropdown}
                >
                  <img
                    src={currentUser.profilePicture || userImage}
                    alt="Profile"
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="font-medium text-sm lg:text-base hidden xl:inline">
                    {currentUser.username}
                  </span>
                  <FaChevronDown
                    className={`text-xs transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div
                    ref={userDropdownRef}
                    className="absolute right-0 mt-2 w-48 lg:w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                  >
                    {/* <div className="p-2 lg:p-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUser.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {currentUser.email}
                      </p>
                    </div> */}
                    <div className="p-1 lg:p-2 space-y-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiUser className="text-base lg:text-lg" />
                        My Profile
                      </Link>
                      {/* <Link
                        to="/my-courses"
                        className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FiBook className="text-base lg:text-lg" />
                        My Courses
                      </Link> */}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        className="flex items-center gap-2 lg:gap-3 w-full text-left px-2 lg:px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        onClick={handleLogout}
                      >
                        <FiLogOut className="text-base lg:text-lg" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:gap-3">
                <button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 lg:px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium border border-blue-500 text-sm lg:text-base"
                  onClick={openLogin}
                >
                  Login
                </button>
                <button
                  className="bg-gray-800 text-white px-3 lg:px-6 py-2 rounded-lg hover:bg-gray-900 transition-all duration-300 hover:scale-105 font-medium border border-gray-700 text-sm lg:text-base"
                  onClick={openRegister}
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-xl lg:text-2xl text-gray-700 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex flex-col min-h-full pb-20">
              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="px-4 pl-10 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                </div>
              </div>

              {/* Mobile Courses Section */}
              <div className="flex-1">
                {/* Back button when in nested view */}
                {(mobileActiveLevel || mobileActiveStream) && (
                  <div className="border-b border-gray-200 bg-gray-50">
                    <button
                      onClick={() => {
                        if (mobileActiveStream) {
                          setMobileActiveStream(null);
                        } else {
                          setMobileActiveLevel(null);
                          setMobileActiveStream(null);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-3 text-blue-600 font-medium w-full text-left"
                    >
                      <FaChevronRight className="transform rotate-180 text-sm" />
                      {mobileActiveStream
                        ? `Back to ${mobileActiveLevel}`
                        : "Back to All Courses"}
                    </button>
                  </div>
                )}

                {/* Courses List */}
                {!mobileActiveLevel && !mobileActiveStream && (
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FiBook className="text-blue-600" />
                      Browse Courses
                    </h3>
                    <div className="space-y-2">
                      {Object.keys(courseCategories).map((classLevel) => (
                        <button
                          key={classLevel}
                          onClick={() => handleMobileLevelClick(classLevel)}
                          className="flex items-center justify-between w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all"
                        >
                          <span className="font-medium text-gray-800">
                            {classLevel}
                          </span>
                          <FaChevronRight className="text-gray-400 text-sm" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Streams List */}
                {mobileActiveLevel && !mobileActiveStream && (
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-blue-600">{mobileActiveLevel}</span>
                    </h3>
                    <div className="space-y-2">
                      {Object.keys(courseCategories[mobileActiveLevel]).map(
                        (stream) => (
                          <button
                            key={stream}
                            onClick={() => handleMobileStreamClick(stream)}
                            className="flex items-center justify-between w-full p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all"
                          >
                            <span className="font-medium text-gray-800">
                              {stream}
                            </span>
                            <FaChevronRight className="text-gray-400 text-sm" />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Subjects List */}
                {mobileActiveLevel && mobileActiveStream && (
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      <span className="text-blue-600">
                        {mobileActiveStream}
                      </span>
                    </h3>
                    <div className="space-y-2">
                      {courseCategories[mobileActiveLevel][
                        mobileActiveStream
                      ].map((subject) => (
                        <Link
                          key={subject}
                          to={`/courses/${mobileActiveLevel
                            .toLowerCase()
                            .replace(/\s/g, "-")}/${mobileActiveStream
                            .toLowerCase()
                            .replace(/\s/g, "-")}/${subject
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                          className="block p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all text-gray-800"
                          onClick={handleMobileSubjectClick}
                        >
                          {subject}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Section */}
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2">
                      <img
                        src={currentUser?.profilePicture || userImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {currentUser?.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-blue-600 py-2 px-2 rounded-lg transition-all"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FiUser className="text-lg" />
                      My Profile
                    </Link>
                    <Link
                      to="/my-courses"
                      className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-blue-600 py-2 px-2 rounded-lg transition-all"
                      onClick={() => setMenuOpen(false)}
                    >
                      <FiBook className="text-lg" />
                      My Courses
                    </Link>
                    {user && (
                      <Link
                        to="/exams"
                        className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-blue-600 py-2 px-2 rounded-lg transition-all"
                        onClick={() => setMenuOpen(false)}
                      >
                        <FiBook className="text-lg" />
                        Practice Tests
                      </Link>
                    )}
                    <button
                      className="flex items-center gap-3 w-full text-red-500 font-medium hover:text-red-700 py-2 px-2 text-left rounded-lg transition-all"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="text-lg" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
                      onClick={openLogin}
                    >
                      Login
                    </button>
                    <button
                      className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-all font-medium"
                      onClick={openRegister}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Network Status */}
        {!isOnline && (
          <div className="bg-red-600 text-white text-center text-xs lg:text-sm py-1.5 lg:py-2 animate-pulse">
            ⚠️ You are currently offline - Some features may not work
          </div>
        )}
      </header>

      {/* Add padding to prevent content from being hidden behind fixed navbar */}
      <div className="h-16 lg:h-20"></div>

      {/* Login & Register Modals */}
      {modalType === "login" && (
        <Login
          isOpen={true}
          onClose={closeModal}
          onRegisterClick={openRegister}
        />
      )}
      {modalType === "register" && (
        <Register isOpen={true} onClose={closeModal} onLoginClick={openLogin} />
      )}
    </>
  );
}

export default Navbar;
