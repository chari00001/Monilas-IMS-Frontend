"use client"

import React, { useState, useEffect } from 'react';
import { getAllClasses } from '@/network/lib/classes';
import { createOrUpdateEnrollment } from '@/network/lib/enrollments'; 
import { getLecturerById } from '@/network/lib/lecturers';
import { FaCheck, FaChalkboardTeacher, FaTrashAlt, FaUserGraduate } from 'react-icons/fa';

interface Class {
  id: number;
  name: string;
  description: string;
  credit: number;
  lecturerId: number;
}

interface Lecturer {
  id: number;
  name: string;
  email: string;
  qualification: string;
}

const Enrollment: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [lecturers, setLecturers] = useState<Record<number, Lecturer>>({});
  const [selectedClasses, setSelectedClasses] = useState<Class[]>([]);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  useEffect(() => {
    const fetchClassesAndLecturers = async () => {
      try {
        const fetchedClasses = await getAllClasses();
        setClasses(fetchedClasses);

        // Fetch lecturer information for each class
        const lecturerPromises = fetchedClasses.map((classItem: Class) => 
          getLecturerById(classItem.lecturerId)
        );

        const lecturersArray = await Promise.all(lecturerPromises);

        // Map lecturer ID to lecturer data for easy lookup
        const lecturersMap = lecturersArray.reduce((acc, lecturer) => {
          acc[lecturer.id] = lecturer;
          return acc;
        }, {} as Record<number, Lecturer>);

        setLecturers(lecturersMap);
      } catch (error) {
        console.error('Error fetching classes or lecturers:', error);
      }
    };

    fetchClassesAndLecturers();
  }, []);

  const handleSelectClass = (classItem: Class) => {
    const newTotalCredits = totalCredits + classItem.credit;

    if (newTotalCredits > 20) {
      alert('You cannot enroll in more than 20 credits.');
      return;
    }

    setSelectedClasses([...selectedClasses, classItem]);
    setTotalCredits(newTotalCredits);
  };

  const handleDeselectClass = (classId: number) => {
    const updatedSelectedClasses = selectedClasses.filter(cls => cls.id !== classId);
    const deselectedClass = selectedClasses.find(cls => cls.id === classId);

    if (deselectedClass) {
      setTotalCredits(totalCredits - deselectedClass.credit);
    }

    setSelectedClasses(updatedSelectedClasses);
  };

  const handleConfirmEnrollment = async () => {
    try {
      const studentId = JSON.parse(localStorage.getItem('user') || '{}').id; // Get student ID from local storage
      const enrollments = selectedClasses.map(cls => ({
        studentId,
        classId: cls.id,
        enrollmentDate: new Date().toISOString(),
      }));

      await Promise.all(enrollments.map(enrollment => createOrUpdateEnrollment(enrollment)));

      alert('Enrollment successful!');
      setSelectedClasses([]);
      setTotalCredits(0);
    } catch (error) {
      console.error('Error enrolling in classes:', error);
      alert('Error enrolling in classes. Please try again.');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Enrollment Page</h1>
      <div className="px-6 py-8 max-w-[1440px] mx-auto flex flex-row w-full gap-8">

        {/* Available Classes */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-1/2 flex flex-col justify-between h-[500px]">
          <div>
            <div className="flex items-center mb-4">
              <FaChalkboardTeacher className="text-blue-500 mr-2" size={24} />
              <h2 className="text-xl font-semibold">Available Classes</h2>
            </div>
            <ul className="max-h-[350px] overflow-y-auto">
              {classes.map(classItem => (
                <li key={classItem.id} className="mb-4 flex justify-between items-center p-2 rounded hover:bg-gray-100 transition-all">
                  <div>
                    <strong>{classItem.name}</strong> - {classItem.credit} Credits
                    <br />
                    <span className="text-sm text-gray-500">
                      Lecturer: {lecturers[classItem.lecturerId]?.name || 'Loading...'}
                    </span>
                  </div>
                  <button
                    className="text-sm text-white bg-green-500 hover:bg-green-600 py-1 px-2 rounded transition-all duration-200"
                    onClick={() => handleSelectClass(classItem)}
                    disabled={selectedClasses.some(selected => selected.id === classItem.id)}
                  >
                    <FaCheck />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Selected Classes */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-1/2 flex flex-col justify-between h-[500px]">
          <div>
            <div className="flex items-center mb-4">
              <FaUserGraduate className="text-green-500 mr-2" size={24} />
              <h2 className="text-xl font-semibold">Selected Classes</h2>
            </div>
            <ul className="max-h-[350px] overflow-y-auto">
              {selectedClasses.map(classItem => (
                <li key={classItem.id} className="mb-4 flex justify-between items-center p-2 rounded hover:bg-gray-100 transition-all">
                  <div>
                    <strong>{classItem.name}</strong> - {classItem.credit} Credits
                  </div>
                  <button
                    className="text-sm text-white bg-red-500 hover:bg-red-600 py-1 px-2 rounded transition-all duration-200"
                    onClick={() => handleDeselectClass(classItem.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mt-4 font-semibold">Total Credits: {totalCredits} / 20</p>
            <button
              className="mt-4 text-sm text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded transition-all duration-200"
              onClick={handleConfirmEnrollment}
              disabled={totalCredits === 0}
            >
              Confirm Enrollment
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Enrollment;
