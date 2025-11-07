// import React from "react";
// import { Link } from "react-router-dom";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// // import devdojo from "../assets/DevDojo.png";

// function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-10 px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Logo & Description */}
//         <div className="flex flex-col items-center md:items-start">
//           <Link to="/" className="logo">
//             {/* <img className="w-40" src={devdojo} alt="Logo" /> */}
//             <p className="w-40">Reabar Online</p>
//           </Link>
//           <p className="text-sm mt-3 text-gray-400 text-center md:text-left">
//             Empowering learners with quality education anytime, anywhere.
//           </p>
//         </div>

//         {/* Navigation Links */}
//         <div className="text-center md:text-left">
//           <h3 className="font-semibold text-lg text-white">Quick Links</h3>
//           <ul className="mt-3 space-y-2">
//             <li>
//               <Link
//                 to="/courses"
//                 className="hover:text-blue-400 transition duration-300"
//               >
//                 📚 Courses
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about-us"
//                 className="hover:text-blue-400 transition duration-300"
//               >
//                 ℹ️ About Us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contact"
//                 className="hover:text-blue-400 transition duration-300"
//               >
//                 ✉️ Contact
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/faq"
//                 className="hover:text-blue-400 transition duration-300"
//               >
//                 ❓ FAQ
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div className="text-center md:text-left">
//           <h3 className="font-semibold text-lg text-white">Follow Us</h3>
//           <div className="flex justify-center md:justify-start space-x-4 mt-3">
//             <a href="#" className="hover:text-blue-500 transition duration-300">
//               <FaFacebook size={28} />
//             </a>
//             <a href="#" className="hover:text-sky-400 transition duration-300">
//               <FaTwitter size={28} />
//             </a>
//             <a href="#" className="hover:text-pink-500 transition duration-300">
//               <FaInstagram size={28} />
//             </a>
//             <a href="#" className="hover:text-blue-600 transition duration-300">
//               <FaLinkedin size={28} />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
//         &copy; {new Date().getFullYear()}{" "}
//         <span className="text-blue-400 font-semibold">Reabar Online</span>. All
//         rights reserved.
//       </div>
//     </footer>
//   );
// }

// export default Footer;

// ------------------------------------------------------

import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGraduationCap,
} from "react-icons/fa";
import { FiBook, FiUsers, FiAward } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl">
                <FaGraduationCap className="text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Rehbar Online
                </h2>
                <p className="text-sm text-gray-300">Jammu & Kashmir</p>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering Jammu & Kashmir students with quality education from
              Class 11 to competitive exams. Your trusted partner in academic
              success.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-700 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebook className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-gray-700 hover:bg-sky-500 p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-gray-700 hover:bg-pink-600 p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-gray-700 hover:bg-blue-700 p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="#"
                className="bg-gray-700 hover:bg-red-600 p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
              >
                <FaYoutube className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
              <FiBook className="text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Class 11 Courses", path: "/courses/class-11" },
                { name: "Class 12 Courses", path: "/courses/class-12" },
                { name: "UG Programs", path: "/courses/undergraduate" },
                { name: "PG Programs", path: "/courses/postgraduate" },
                {
                  name: "Competitive Exams",
                  path: "/courses/competitive-exams",
                },
                { name: "Practice Tests", path: "/exams" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
              <FiUsers className="text-purple-400" />
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Study Materials", path: "/materials" },
                { name: "Video Lectures", path: "/videos" },
                { name: "Practice Papers", path: "/papers" },
                { name: "Career Guidance", path: "/career" },
                { name: "Blog & Articles", path: "/blog" },
                { name: "Success Stories", path: "/success" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white">
              <FiAward className="text-green-400" />
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-sm">Jammu & Kashmir, India</p>
                  <p className="text-xs text-gray-400">Srinagar, Jammu</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="bg-green-600 p-2 rounded-lg">
                  <FaPhone className="text-sm" />
                </div>
                <div>
                  <p className="text-sm">+91 7006XXXXXX</p>
                  <p className="text-xs text-gray-400">Mon-Sun, 9AM-6PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="text-sm">support@rehbaronline.com</p>
                  <p className="text-xs text-gray-400">Quick response</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-200">
                Stay Updated
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Rehbar Online
                </span>
                . All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/refund"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-110 group">
          <div className="relative">
            <FaEnvelope className="text-xl" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
              !
            </span>
          </div>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
