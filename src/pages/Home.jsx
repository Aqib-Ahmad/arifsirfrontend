// import React from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCourses } from "../redux/courseSlice";
// import { FaCheckCircle, FaPlay } from "react-icons/fa";
// import herobg from "../assets/herobg.jpg";
// import fetchbg from "../assets/example.jpg";
// import reviewbg from "../assets/reviewbg.png";
// import { useEffect, useState } from "react";
// import CourseCard from "../components/CourseCard";
// import html5 from "../assets/html5.svg";
// import css3 from "../assets/css3.svg";
// import javascript from "../assets/js.svg";
// import nodejs from "../assets/node-js.svg";
// import python from "../assets/python.svg";
// import react from "../assets/react.svg";
// import vue from "../assets/vuejs.svg";
// import angular from "../assets/angular.svg";
// import CourseCategories from "../components/CourseCategories";
// import Testimonial from "../components/Testimonial";
// import MousePointer from "../components/MousePointer";
// import { motion } from "framer-motion";
// import ScrollToTopButton from "../components/ScrollToTopButton";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { courses } = useSelector((state) => state.courses);
//   const [featuredCourse, setFeaturedCourse] = useState(null);
//   const [additionalCourses, setAdditionalCourses] = useState([]);

//   useEffect(() => {
//     dispatch(fetchAllCourses());
//   }, [dispatch]);

//   useEffect(() => {
//     if (courses.length > 0) {
//       let index = 1;
//       setFeaturedCourse(courses[index]);
//       setAdditionalCourses(courses.slice(1, 7));
//       const interval = setInterval(() => {
//         index = (index + 1) % courses.length;
//         setFeaturedCourse(courses[index]);
//       }, 3000);

//       return () => clearInterval(interval);
//     }
//   }, [courses]);

//   const icons = [
//     { src: html5, alt: "HTML5" },
//     { src: css3, alt: "CSS3" },
//     { src: javascript, alt: "JavaScript", bg: true },
//     { src: nodejs, alt: "Node.js" },
//     { src: python, alt: "Python" },
//     { src: react, alt: "React" },
//     { src: vue, alt: "Vue.js" },
//     { src: angular, alt: "Angular" },
//   ];

//   const testimonials = [
//     {
//       id: 1,
//       name: "Emma Hart",
//       text: "Massa amet, at dolor tellus pellentesque aenean in eget massa tincidunt habitasse volutpat adipiscing sed id sit auctor eu vivamus nulla.",
//       image: "/images/emma.jpg",
//     },
//     {
//       id: 2,
//       name: "Eddie Johnson",
//       text: "Ut morbi felis, felis massa quam sit massa, amet, bibendum pulvinar elit in adipiscing amet imperdiet ac felis congue enim, elementum orci.",
//       image: "/images/eddie.jpg",
//     },
//     {
//       id: 3,
//       name: "Jonathan Doe",
//       text: "Donec in varius facilisis justo, curabitur aliquet sit justo sed sit interdum diam dolor ornare quis a felis adipiscing hendrerit quisque enim.",
//       image: "/images/jonathan.jpg",
//     },
//     {
//       id: 4,
//       name: "Mike Edward",
//       text: "Pulvinar dui vitae enim, diam et nulla elit nam leo lacinia et, a, pulvinar gravida enim in blandit mauris vitae volutpat urna, sed justo hendrerit.",
//       image: "/images/mike.jpg",
//     },
//   ];

//   return (
//     <div className="font-sans bg-gray-200">
//       <MousePointer />
//       {/* Hero Section with Slider */}
//       <section
//         className="relative h-auto md:h-[600px] bg-cover bg-center text-white"
//         style={{ backgroundImage: `url(${herobg})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/80 backdrop-blur-sm"></div>

//         <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 px-4 sm:px-6 md:px-10 py-12 md:h-full">
//           <motion.div
//             className="w-full md:w-1/2 text-center md:text-left"
//             initial={{ x: -60, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <p className="text-yellow-300 text-xs sm:text-sm uppercase tracking-widest">
//               ● Featured Course
//             </p>
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 md:mt-3 drop-shadow-md leading-snug">
//               {featuredCourse ? featuredCourse.title : "Loading..."}
//             </h1>
//             <p className="mt-3 text-sm sm:text-base text-gray-200">
//               {featuredCourse ? featuredCourse.description : "Please wait..."}
//             </p>
//             <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//               {featuredCourse && (
//                 <Link
//                   to={`/CourseDetails/${featuredCourse._id}`}
//                   className="bg-white text-blue-700 px-5 py-2 font-bold shadow hover:scale-105 transition text-sm sm:text-base"
//                 >
//                   Start Course
//                 </Link>
//               )}
//               <Link
//                 to="/courses"
//                 className="border border-white px-5 py-2 font-semibold hover:bg-white hover:text-blue-700 transition text-sm sm:text-base"
//               >
//                 View All →
//               </Link>
//             </div>
//           </motion.div>

//           <motion.div
//             className="w-full md:w-1/2"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             <img
//               src={featuredCourse ? featuredCourse.thumbnail : "Loading..."}
//               alt="Course"
//               className="rounded-xl shadow-lg w-full max-h-[250px] sm:max-h-[320px] object-cover"
//             />
//           </motion.div>
//         </div>
//       </section>
//       <section className="bg-white py-8">
//         <div className="max-w-5xl mx-auto grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-6 justify-items-center">
//           {icons.map((icon, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               className="hover:scale-110 transition-transform"
//               title={icon.alt}
//             >
//               <img
//                 src={icon.src}
//                 alt={icon.alt}
//                 className="w-12 md:w-14 opacity-80 hover:opacity-100 grayscale hover:grayscale-0 transition"
//               />
//             </motion.div>
//           ))}
//         </div>
//       </section>
//       {/* Additional Courses */}
//       <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
//           Explore More Courses
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {additionalCourses.map((course, index) => (
//             <motion.div
//               key={course._id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1, duration: 0.4 }}
//             >
//               <CourseCard
//                 image={course.thumbnail}
//                 category={course.category}
//                 heading={course.title}
//                 level={course.level}
//                 duration={course.duration}
//                 link={`/CourseDetails/${course._id}`}
//               />
//             </motion.div>
//           ))}
//         </div>
//       </section>
//       <Testimonial />
//       <ScrollToTopButton /> {/* 👈 Scroll to top button */}
//     </div>
//   );
// };

// export default Home;

// -----------------------------------------------------------------------------------------------

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCourses } from "../redux/courseSlice";
import {
  FaArrowRight,
  FaStar,
  FaPlayCircle,
  FaUsers,
  FaCertificate,
  FaClock,
  FaChalkboardTeacher,
  FaMobileAlt,
  FaBook,
  FaGraduationCap,
  FaUniversity,
  FaAward,
} from "react-icons/fa";
import { HiAcademicCap, HiLightBulb } from "react-icons/hi";
import { MdOndemandVideo, MdSupportAgent, MdSchool } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import herobg from "../assets/herobg.jpg";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import Testimonial from "../components/Testimonial";
// import MousePointer from "../components/MousePointer";
import { motion } from "framer-motion";
import ScrollToTopButton from "../components/ScrollToTopButton";

// Import slider images
import slide1 from "../assets/slide1.avif";
import slide2 from "../assets/slide2.avif";
import slide3 from "../assets/slide3.avif";

const Home = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      setFeaturedCourses(courses.slice(0, 6));
    }
  }, [courses]);

  // Motivational quotes slider with J&K focus
  const motivationalQuotes = [
    {
      text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
      author: "Malcolm X",
      image: slide1,
    },
    {
      text: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
      image: slide2,
    },
    {
      text: "Your education is the foundation upon which you will build your future success.",
      author: "Jammu & Kashmir Education Board",
      image: slide3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Academic Features
  const features = [
    {
      icon: <GiTeacher className="text-2xl" />,
      title: "Expert JKBOSE Faculty",
      description:
        "Learn from certified teachers with JKBOSE curriculum expertise",
    },
    {
      icon: <FaCertificate className="text-2xl" />,
      title: "Comprehensive Syllabus",
      description:
        "Complete coverage of 11th, 12th, UG, PG & competitive exams",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to all materials",
    },
    {
      icon: <FaBook className="text-2xl" />,
      title: "Study Materials",
      description: "Detailed notes, practice papers, and reference books",
    },
    {
      icon: <FaMobileAlt className="text-2xl" />,
      title: "Mobile Learning",
      description: "Access courses on any device, perfect for J&K students",
    },
    {
      icon: <MdSupportAgent className="text-2xl" />,
      title: "Doubt Support",
      description: "24/7 doubt solving with subject matter experts",
    },
  ];

  const stats = [
    { number: "25K+", label: "J&K Students", icon: <FaUsers /> },
    { number: "500+", label: "Expert Teachers", icon: <FaChalkboardTeacher /> },
    { number: "200+", label: "Courses Available", icon: <HiAcademicCap /> },
    { number: "95%", label: "Success Rate", icon: <FaGraduationCap /> },
  ];

  // Academic Subjects for different levels
  const academicSubjects = [
    {
      level: "11th & 12th Science",
      subjects: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
        "Computer Science",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      level: "11th & 12th Commerce",
      subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
      color: "from-green-500 to-emerald-500",
    },
    {
      level: "11th & 12th Arts",
      subjects: [
        "History",
        "Political Science",
        "Geography",
        "Psychology",
        "Sociology",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      level: "UG Courses",
      subjects: ["B.A", "B.Sc", "B.Com", "B.Tech", "BBA", "BCA"],
      color: "from-orange-500 to-red-500",
    },
    {
      level: "PG Courses",
      subjects: ["M.A", "M.Sc", "M.Com", "M.Tech", "MBA", "MCA"],
      color: "from-teal-500 to-blue-500",
    },
    {
      level: "Competitive Exams",
      subjects: ["JEE", "NEET", "UPSC", "JKSSB", "Banking", "SSC"],
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const competitiveExams = [
    {
      name: "JEE Main & Advanced",
      description: "Engineering entrance preparation",
      students: "5,000+",
      success: "78%",
    },
    {
      name: "NEET UG",
      description: "Medical entrance coaching",
      students: "4,200+",
      success: "82%",
    },
    {
      name: "JKSSB",
      description: "Jammu & Kashmir Services Selection Board",
      students: "8,000+",
      success: "65%",
    },
    {
      name: "UPSC Civil Services",
      description: "Civil services examination",
      students: "2,500+",
      success: "12%",
    },
    {
      name: "Banking Exams",
      description: "PO, Clerk, SO examinations",
      students: "3,800+",
      success: "58%",
    },
    {
      name: "SSC CGL/CHSL",
      description: "Staff Selection Commission",
      students: "4,500+",
      success: "62%",
    },
  ];

  const learningPaths = [
    {
      title: "School Education",
      description: "Complete JKBOSE curriculum for 11th & 12th",
      courses: 45,
      duration: "2 years",
      icon: <MdSchool />,
    },
    {
      title: "Undergraduate",
      description: "Degree courses for college students",
      courses: 38,
      duration: "3-4 years",
      icon: <FaGraduationCap />,
    },
    {
      title: "Postgraduate",
      description: "Master's and advanced degree programs",
      courses: 32,
      duration: "2 years",
      icon: <FaUniversity />,
    },
    {
      title: "Competitive Exams",
      description: "Government job and entrance exam prep",
      courses: 28,
      duration: "1-2 years",
      icon: <FaAward />,
    },
  ];

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* <MousePointer /> */}

      {/* Motivational Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
          {motivationalQuotes.map((quote, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${quote.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 backdrop-blur-[2px]"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <HiLightBulb className="text-yellow-400 text-xl" />
                <span className="text-white font-semibold text-sm">
                  Empowering J&K Students Since 2020
                </span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Quality Education for
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Jammu & Kashmir
                </span>
              </h1>

              <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Comprehensive learning platform for 11th, 12th, UG, PG, and
                competitive exams. JKBOSE curriculum with expert faculty.
              </p>

              {/* Quote Slider */}
              <div className="relative h-24 mb-8">
                {motivationalQuotes.map((quote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: index === currentSlide ? 1 : 0,
                      y: index === currentSlide ? 0 : 20,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 flex flex-col items-center justify-center ${
                      index === currentSlide
                        ? "pointer-events-auto"
                        : "pointer-events-none"
                    }`}
                  >
                    <p className="text-lg sm:text-xl text-gray-200 italic text-center mb-2 max-w-3xl leading-relaxed">
                      "{quote.text}"
                    </p>
                    <p className="text-white font-semibold text-sm">
                      — {quote.author}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Slider Indicators */}
              <div className="flex justify-center gap-2 mb-8">
                {motivationalQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-yellow-400 w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/courses"
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 text-lg"
                  >
                    <FaPlayCircle className="text-xl" />
                    Start Learning Now
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/courses"
                    className="group bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-3 text-lg"
                  >
                    Explore All Courses
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <div className="text-3xl">{stat.icon}</div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm sm:text-base">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Levels Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Academic Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From school education to competitive exams - we cover it all for
              J&K students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicSubjects.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gradient-to-br ${level.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <h3 className="text-xl font-bold mb-4">{level.level}</h3>
                <div className="space-y-2">
                  {level.subjects.map((subject, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center gap-2 text-white/90"
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm">{subject}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                  Explore Courses
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Designed specifically for Jammu & Kashmir students' educational
              needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Exams Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Competitive Exam Preparation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coaching for all major competitive examinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitiveExams.map((exam, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {exam.name}
                  </h3>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {exam.success} Success
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{exam.students} enrolled</span>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold">
                    View Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow curated paths designed by JKBOSE experts and career
              counselors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <div className="text-blue-600 text-2xl">{path.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {path.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{path.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{path.courses} courses</span>
                  <span>{path.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Most enrolled courses by Jammu & Kashmir students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <CourseCard
                  image={course.thumbnail}
                  category={course.category}
                  heading={course.title}
                  level={course.level}
                  duration={course.duration}
                  link={`/CourseDetails/${course._id}`}
                  rating={4.8}
                  students={1200}
                  instructor={course.instructor}
                  price={course.price}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/courses"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group text-lg"
            >
              View All Courses
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonial />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Excel in Your Academic Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Jammu & Kashmir students who are achieving their
              academic goals with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3 text-lg"
                >
                  Get Started Free
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/courses"
                  className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-3 text-lg"
                >
                  Browse Courses
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
};

export default Home;
