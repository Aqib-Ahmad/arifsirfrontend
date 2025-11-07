import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCourses,
  getPendingCourses,
  updateCourseApproval,
} from "../redux/courseSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  FiUsers,
  FiBook,
  FiClipboard,
  FiDollarSign,
  FiBarChart,
  FiHome,
} from "react-icons/fi";
import CourseCard from "../components/CourseCard";

const AllCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState({});
  const [videoModal, setVideoModal] = useState({ open: false, url: "" });

  const { courses, pendingCourses, loading, error } = useSelector(
    (state) => state.courses
  );

  const { user } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    dispatch(fetchAllCourses());
    if (user?.role === "admin") {
      dispatch(getPendingCourses());
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, courses]);

  const handleApproval = async (courseId) => {
    await dispatch(
      updateCourseApproval({
        courseId,
        status: "approved",
        rejectionReason: "",
      })
    );
    dispatch(fetchAllCourses());
    dispatch(getPendingCourses());
  };

  const handleRejection = async (courseId) => {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      await dispatch(
        updateCourseApproval({
          courseId,
          status: "rejected",
          rejectionReason: reason,
        })
      );
      dispatch(fetchAllCourses());
      dispatch(getPendingCourses());
    }
  };

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/admin/usersList"
                className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
              >
                <FiUsers /> Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/coursesList"
                className="flex items-center gap-2 p-2 bg-blue-700 rounded cursor-pointer"
              >
                <FiBook /> Manage Courses
              </Link>
            </li>
            <li>
              <Link
                to="/admin/exams"
                className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
              >
                <FiClipboard /> Manage Exams
              </Link>
            </li>
            <li>
              <Link
                to="/admin/payments"
                className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
              >
                <FiDollarSign /> Payments
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
              >
                <FiBarChart /> Reports & Analytics
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dash"
                className="flex items-center gap-2 p-2 hover:bg-blue-700 rounded cursor-pointer"
              >
                <FiHome /> Back to Admin Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">All Courses</h2>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search courses by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-md w-full max-w-md"
          />
        </div>

        {loading && (
          <p className="text-center text-gray-600">Loading courses...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && currentCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <CourseCard
                key={course._id}
                image={course.thumbnail || "/placeholder.png"}
                category={course.category || "General"}
                heading={course.title || "Untitled Course"}
                level={course.courseLevel || "Beginner"}
                duration={course.duration || "N/A"}
                link={`/CourseDetails/${course._id}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No courses found.</p>
        )}

        {/* Pending Courses (Admin Only) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {pendingCourses.map((course) => (
            <div
              key={course._id}
              className="border p-4 rounded-lg shadow-md bg-white mt-6"
            >
              <CourseCard
                image={course.thumbnail || "/placeholder.png"}
                category={course.category || "General"}
                heading={course.title || "Untitled Course"}
                level={course.courseLevel || "Beginner"}
                duration={course.duration || "N/A"}
              />

              <button
                onClick={() =>
                  setShowDetails((prev) => ({
                    ...prev,
                    [course._id]: !prev[course._id],
                  }))
                }
                className="mt-2 text-blue-600 underline cursor-pointer"
              >
                {showDetails[course._id] ? "Hide Details" : "View Details"}
              </button>

              {showDetails[course._id] && (
                <div className="mt-2 p-2 bg-gray-50 rounded">
                  <p>
                    <strong>Description:</strong> {course.description}
                  </p>
                  <p>
                    <strong>Prerequisites:</strong>{" "}
                    {course.prerequisites || "N/A"}
                  </p>
                  <p>
                    <strong>Certification:</strong>{" "}
                    {course.certificationAvailable ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Syllabus:</strong>
                  </p>
                  <ul className="list-disc list-inside">
                    {course.syllabus?.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.title}:</strong> {item.description}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-2 font-semibold">Lessons:</p>
                  <ul className="list-disc list-inside">
                    {course.lessons?.map((lesson) => (
                      <li
                        key={lesson._id}
                        className="mb-2 flex items-center justify-between"
                      >
                        <span>{lesson.title}</span>
                        <button
                          onClick={() =>
                            setVideoModal({ open: true, url: lesson.videoUrl })
                          }
                          className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
                        >
                          Watch Video
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleApproval(course._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition cursor-pointer"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejection(course._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Video Modal */}
        {videoModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative w-full max-w-2xl">
              {/* Close Button */}
              <button
                onClick={() => setVideoModal({ open: false, url: "" })}
                className="absolute -top-5 -right-5 text-white bg-red-600 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-red-700 transition cursor-pointer z-50"
              >
                &times;
              </button>

              {/* Video Container */}
              <div className="bg-white rounded-lg overflow-hidden p-4">
                <video
                  src={videoModal.url}
                  controls
                  autoPlay
                  className="w-full h-auto rounded"
                ></video>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition disabled:bg-gray-400 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:bg-gray-400 cursor-pointer"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default AllCourses;
