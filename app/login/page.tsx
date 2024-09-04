"use client";

import React, { useState } from 'react';
import StudentLogin from './StudentLogin';
import LecturerLogin from './LecturerLogin';

const LoginPage: React.FC = () => {
  const [showStudentLogin, setShowStudentLogin] = useState(false);
  const [showLecturerLogin, setShowLecturerLogin] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="bg-white p-10 border border-gray-300 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Login</h2>

        {!showStudentLogin && !showLecturerLogin && (
          <div className="space-y-6">
            <button
              onClick={() => setShowStudentLogin(true)}
              className="w-full py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition duration-200 ease-in-out hover:scale-110 hover:shadow-xl"
            >
              Student Login
            </button>
            <button
              onClick={() => setShowLecturerLogin(true)}
              className="w-full py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition duration-200 ease-in-out hover:scale-110 hover:shadow-xl"
            >
              Lecturer Login
            </button>
          </div>
        )}

        {showStudentLogin && <StudentLogin />}
        {showLecturerLogin && <LecturerLogin />}
      </div>
    </div>
  );
};

export default LoginPage;
