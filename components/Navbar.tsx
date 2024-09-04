"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Importing Image for optimized loading

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optionally, you can redirect to the login page or home page after logout
    window.location.href = '/';
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-2">
          {/* <Image
            src="/logo.png" // Make sure to replace this with your actual logo path
            alt="IMS Logo"
            width={40}
            height={40}
          /> */}
          <Link href="/" className="text-white font-bold text-xl hover:text-gray-200">
            MonilasAcademy IMS
          </Link>
        </div>

        {/* Links for desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-white hover:text-gray-200 transition duration-300">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gray-200 transition duration-300">
            About
          </Link>
          <Link href="/students" className="text-white hover:text-gray-200 transition duration-300">
            Students
          </Link>
          <Link href="/faculty" className="text-white hover:text-gray-200 transition duration-300">
            Faculty
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200 transition duration-300">
            Contact
          </Link>
          {/* Logout Button for Desktop */}
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 w-64 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } h-full z-50`}
      >
        <div className="p-4">
          <button
            type="button"
            onClick={toggleSidebar}
            className="text-white hover:text-gray-200 focus:outline-none mb-4"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-white hover:text-gray-200 transition duration-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-200 transition duration-300">
              About
            </Link>
            <Link href="/students" className="text-white hover:text-gray-200 transition duration-300">
              Students
            </Link>
            <Link href="/faculty" className="text-white hover:text-gray-200 transition duration-300">
              Faculty
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-200 transition duration-300">
              Contact
            </Link>
            {/* Logout Button for Mobile */}
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
