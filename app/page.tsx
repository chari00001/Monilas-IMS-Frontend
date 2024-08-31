"use client"

import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import StudentHome from '@/components/StudentHome';
import LecturerHome from '@/components/LecturerHome';
import UpcomingEvents from '@/components/UpcomingEvents'; // Import the UpcomingEvents component
import './globals.css';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  status: string;
  role: 'student' | 'lecturer'; // Define the possible user roles
}

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser({ ...parsedUser }); // Directly use the parsed user
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <Head>
        <title>University Automation System</title>
        <meta name="description" content="University Automation System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold mb-4">Welcome to the University Automation System</h1>

        {/* Upcoming Events - Visible to both students and lecturers */}
        <UpcomingEvents />

        {/* Conditional Rendering Based on User Role */}
        {user ? (
          user.role === 'student' ? (
            <StudentHome />
          ) : (
            <LecturerHome />
          )
        ) : (
          <p>Loading...</p> // Show loading or error state if user data is not available
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
