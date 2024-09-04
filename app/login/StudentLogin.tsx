"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { login } from "@/network/lib/auth";

const StudentLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  interface StudentData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    age: number;
    password: string;
    role?: string;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await login({ email, password });

      if (response instanceof Error) {
        throw response;
      }
  
      if (response.status === 200) {
        const studentData: StudentData = { ...response.data.data, role: 'student' };

        console.log('Student data:', studentData);
        

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(studentData));

        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in as a student!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          router.push('/'); // Redirect to student home page
        });

      } else {
        console.error('Unexpected response status:', response.status);
        Swal.fire({
          title: 'Error!',
          text: 'Unexpected response status!',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    } catch (error: any) {
      console.error('Login failed:', error.message);
      setError(error.message);
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <h2 className="text-2xl font-semibold text-center mb-6">Student Login</h2>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transform transition duration-200 ease-in-out focus:scale-105 focus:shadow-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transform transition duration-200 ease-in-out focus:scale-105 focus:shadow-md"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition duration-200 ease-in-out hover:scale-110 hover:shadow-xl"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-700">
          Don't have an account?{' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default StudentLogin;
