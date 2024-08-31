// components/LecturerHome.tsx
import React from 'react';

const LecturerHome: React.FC = () => {
  return (
    <div>
      {/* Dashboard Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Courses You Teach</h2>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Pending Grades</h2>
          <p className="text-2xl font-bold">4</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Scheduled Lectures</h2>
          <p className="text-2xl font-bold">2</p>
        </div>
      </section>

      {/* Announcements / Notifications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Lecturer Announcements</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          <li className="mb-2">Please review the new grading guidelines by next week.</li>
          <li className="mb-2">Faculty meeting scheduled for Friday, 2 PM.</li>
        </ul>
      </section>
    </div>
  );
};

export default LecturerHome;
