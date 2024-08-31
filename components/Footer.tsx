// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">&copy; 2024 University Automation System. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/privacy" className="text-sm hover:text-gray-400 transition-colors duration-300">Privacy Policy</a>
          <a href="/terms" className="text-sm hover:text-gray-400 transition-colors duration-300">Terms of Service</a>
          <a href="/contact" className="text-sm hover:text-gray-400 transition-colors duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
