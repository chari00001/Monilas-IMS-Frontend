// components/StudentHome.tsx
import React from 'react';

const StudentHome: React.FC = () => {
  return (
    <div>
      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Your Courses</h2>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Upcoming Exams</h2>
          <p className="text-2xl font-bold">2</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Assignment Deadlines</h2>
          <p className="text-2xl font-bold">3</p>
        </div>
      </section>

      {/* Announcements / Notifications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Student Announcements</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          <li className="mb-2">Don't forget to submit your assignments by next Monday.</li>
          <li className="mb-2">Join the study group for the upcoming Data Science exam.</li>
        </ul>
      </section>
    </div>
  );
};

export default StudentHome;
