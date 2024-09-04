"use client";

import React, { useState, useEffect } from 'react';
import { FaBook, FaChalkboardTeacher, FaStickyNote, FaCalendarAlt, FaUser, FaBuilding } from 'react-icons/fa';
import { getNotesByStudentId } from '../network/lib/notes';
import { getClassById } from '../network/lib/classes';
import { getAllExams } from '../network/lib/exams';
import { useRouter } from 'next/navigation';
import { getEnrollmentsByStudentId } from '@/network/lib/enrollments';

// Mock function to fetch department information
const getDepartmentById = async (departmentId: number) => {
  // Replace with your actual API call
  return {
    id: departmentId,
    name: 'Computer Science Department',
    head: 'Dr. Jane Doe',
    building: 'Engineering Block',
  };
};

const StudentHome: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<any>(null); 
  const [classes, setClasses] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]); 
  const [exams, setExams] = useState<any[]>([]);
  const [department, setDepartment] = useState<any>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setPersonalInfo(parsedUser);

        try {
          const fetchedNotes = await getNotesByStudentId(parsedUser.id);
          console.log('Fetched notes:', fetchedNotes);

          const notesWithClassDetails = await Promise.all(
            fetchedNotes.map(async (note: any) => {
              const classDetails = await getClassById(note.classId);
              return { ...note, classDetails };
            })
          );

          setNotes(notesWithClassDetails);
        } catch (error) {
          console.error('Error fetching notes or class details:', error);
        }

        try {
          const fetchedExams = await getAllExams();
          console.log('Fetched exams:', fetchedExams);

          const examsWithClassDetails = await Promise.all(
            fetchedExams.map(async (exam: any) => {
              const classDetails = await getClassById(exam.classId);
              return { ...exam, classDetails };
            })
          );

          setExams(examsWithClassDetails);
        } catch (error) {
          console.error('Error fetching exams or class details:', error);
        }

        try {
          const fetchedDepartment = await getDepartmentById(parsedUser.departmentId);
          setDepartment(fetchedDepartment);
        } catch (error) {
          console.error('Error fetching department info:', error);
        }

        try {
          const enrollments = await getEnrollmentsByStudentId(parsedUser.id);
          console.log('Fetched enrollments:', enrollments);
        
          const classesWithDetails = await Promise.all(
            enrollments.map(async (enrollment: any) => {
              const classDetails = await getClassById(enrollment.classId);
              return { ...classDetails, enrollmentDate: enrollment.enrollmentDate };
            })
          );
        
          setClasses(classesWithDetails);
          console.log('Classes with details:', classesWithDetails);
          
        
          const totalCredits = classesWithDetails.reduce((acc: number, cls: any) => acc + cls.credit, 0);
          setTotalCredits(totalCredits);
        } catch (error) {
          console.error('Error fetching enrollments or class details:', error);
        } 
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDuration = (durationString: string) => {
    const [hours, minutes] = durationString.split(':').map(Number);
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <div className="px-6 py-8 space-y-8">
      {/* Personal Information Section */}
      {personalInfo && (
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaUser className="text-blue-500 mr-2" size={24} />
            <h2 className="text-2xl font-semibold">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>First Name:</strong> {personalInfo.firstName}</p>
            <p><strong>Last Name:</strong> {personalInfo.lastName}</p>
            <p><strong>Email:</strong> {personalInfo.email}</p>
            <p><strong>Age:</strong> {personalInfo.age}</p>
            <p><strong>Status:</strong> {personalInfo.status}</p>
          </div>
          <button className="mt-4 text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded">
            Edit Personal Information
          </button>
        </section>
      )}

      {/* Classes, Notes, Exams, and Department Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Classes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaChalkboardTeacher className="text-green-500 mr-2" size={24} />
            <h2 className="text-xl font-semibold">My Classes</h2>
          </div>
          <ul className='max-h-[20rem] overflow-auto'>
            {classes.map((cls) => (
              <li key={cls.id} className="mb-4 flex items-start">
                <FaBook className="text-purple-500 mr-2 mt-1" />
                <div className="flex-grow">
                  <strong>{cls.name}</strong> - {cls.credits} Credits
                  <br />
                  <span className="text-sm text-gray-500">Lecturer: {cls.lecturer}</span>
                  <p className="text-sm">Enrolled on: {formatDate(cls.enrollmentDate)}</p>
                </div>
                <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded">
                  Details
                </button>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => router.push('/enrollment')} 
            className={`mt-4 text-sm text-white py-1 px-4 rounded ${
              totalCredits >= 20 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`} 
            disabled={totalCredits >= 20}>
            Enroll in New Class
          </button>
        </div>

        {/* My Notes Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <FaStickyNote className="text-yellow-500 mr-2" size={24} />
            <h2 className="text-xl font-semibold">My Notes</h2>
          </div>
          <ul>
            {notes.map((note) => (
              <li key={note.id} className="mb-4 flex items-start">
                <div className="flex-grow">
                  <strong>{note.classDetails.name}</strong> 
                  <span className="text-sm text-gray-500"> ({note.type})</span>
                  <p className="text-sm">Points: {note.points} - Grade: {note.grade}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Exams Schedule Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 overflow-y-auto max-h-64">
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="text-red-500 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Exams Schedule</h2>
          </div>
          <ul>
            {exams.map((exam) => (
              <li key={exam.id} className="mb-4 flex items-start">
                <div className="flex-grow">
                  <strong>{exam.classDetails.name}</strong>
                  <p className="text-sm text-gray-500">
                    {exam.type} on {formatDate(exam.examDate)} for {formatDuration(exam.duration)}
                  </p>
                </div>
                <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded">
                  Details
                </button>
              </li>
            ))}
          </ul>
          <button className="mt-4 text-sm text-white bg-blue-500 hover:bg-blue-600 py-1 px-4 rounded">
            Schedule New Exam
          </button>
        </div>

        {/* Department Info Section */}
        {department && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 overflow-y-auto max-h-64">
            <div className="flex items-center mb-4">
              <FaBuilding className="text-teal-500 mr-2" size={24} />
              <h2 className="text-xl font-semibold">Department Info</h2>
            </div>
            <div>
              <p><strong>Name:</strong> {department.name}</p>
              <p><strong>Department Head:</strong> {department.head}</p>
              <p><strong>Location:</strong> {department.building}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHome;
