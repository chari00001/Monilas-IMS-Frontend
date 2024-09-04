import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaBook, FaBullhorn, FaUniversity, FaFileAlt } from 'react-icons/fa';
import { createOrUpdateNote } from "@/network/lib/notes";
import { getClassesByLecturerId } from '@/network/lib/classes';
import { getEnrollmentsByClassId } from '@/network/lib/enrollments';

const LecturerHome: React.FC = () => {
  const [lecturerData, setLecturerData] = useState<any | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [researchPapers, setResearchPapers] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve lecturer data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLecturerData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (lecturerData) {
      const fetchCourses = async () => {
        try {
          const fetchedCourses = await getClassesByLecturerId(lecturerData.id);
          setCourses(fetchedCourses);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      fetchCourses();
    }
  }, [lecturerData]);

  const handleSelectCourse = async (courseId: number) => {
    setSelectedCourse(courseId);
    try {
      const enrolledStudents = await getEnrollmentsByClassId(courseId);
      setStudents(enrolledStudents);
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
    }
  };

  const handleAddAnnouncement = () => {
    setAnnouncements([...announcements, "New Announcement"]);
  };

  const handleAddResearchPaper = () => {
    setResearchPapers([...researchPapers, "New Research Paper"]);
  };

  if (!lecturerData) {
    return <p>Loading...</p>; // Show a loading message while fetching lecturer data
  }

  return (
    <div className="px-6 py-8">
      {/* Grid Container with 1 2 2 layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Full-width row */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaChalkboardTeacher className="text-blue-500 mr-2" />
            Lecturer Information
          </h2>
          <p><strong>Name:</strong> {lecturerData.name}</p>
          <p><strong>Email:</strong> {lecturerData.email}</p>
          <p><strong>Qualification:</strong> {lecturerData.qualification}</p>
          <p><strong>Department:</strong> Computer Engineering</p>
          {lecturerData.isDepartmentHead === 1 && <p><strong>Role:</strong> Department Head</p>}
        </div>

        {/* Two-column row for Courses Management and Department Management */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaBook className="text-green-500 mr-2" />
            Courses Management
          </h2>
          <ul>
            {courses.map((course) => (
              <li key={course.id} className="mb-4 flex justify-between items-center">
                <div>
                  <strong>{course.name}</strong>
                </div>
                <button
                  onClick={() => handleSelectCourse(course.id)}
                  className="text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded"
                >
                  Manage
                </button>
              </li>
            ))}
          </ul>
          <button className="mt-4 text-sm text-white bg-green-500 hover:bg-green-600 py-1 px-4 rounded">
            Add New Course
          </button>
        </section>

        {lecturerData.isDepartmentHead === 1 && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <FaUniversity className="text-purple-500 mr-2" />
              Department Management
            </h2>
            <p>Manage departmental activities, meetings, and approvals.</p>
            <button className="mt-4 text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded">
              Manage Department
            </button>
          </section>
        )}

        {/* Two-column row for Research and Publications, and Announcements */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaFileAlt className="text-yellow-500 mr-2" />
            Research and Publications
          </h2>
          <ul>
            {researchPapers.map((paper, index) => (
              <li key={index} className="mb-2">{paper}</li>
            ))}
          </ul>
          <button 
            onClick={handleAddResearchPaper}
            className="mt-4 text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded"
          >
            Add New Research Paper
          </button>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <FaBullhorn className="text-red-500 mr-2" />
            Announcements
          </h2>
          <ul>
            {announcements.map((announcement, index) => (
              <li key={index} className="mb-2">{announcement}</li>
            ))}
          </ul>
          <button 
            onClick={handleAddAnnouncement}
            className="mt-4 text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded"
          >
            Post New Announcement
          </button>
        </section>

      </div>
    </div>
  );
};

export default LecturerHome;
