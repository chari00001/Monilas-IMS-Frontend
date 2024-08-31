"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for routing
import Swal from 'sweetalert2'; // Import SweetAlert2
import { login } from "@/network/lib/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await login({ email, password });
      if (response instanceof Error) {
        throw response;  // If response is an error, throw it to be caught below
      }
  
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        const token = response.data.token; 

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.data));

        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to home page after alert is closed
          router.push('/');
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
      setError(error.message);  // Update the UI to reflect the error
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="bg-white p-10 border border-gray-300 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Login</h2>

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

export default LoginPage;
