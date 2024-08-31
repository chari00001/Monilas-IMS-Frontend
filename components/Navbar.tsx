// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image"; // Importing Image for optimized loading

const Navbar: React.FC = () => {
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

        {/* Links */}
        <div className="hidden md:flex space-x-6">
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
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button type="button" className="text-white hover:text-gray-200 focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
