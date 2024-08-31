// components/UpcomingEvents.tsx
import React from 'react';
import { FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'; // Importing icons for better UI

const UpcomingEvents: React.FC = () => {
  // Example events data, replace with actual data source
  const events = [
    { date: '2024-09-10', title: 'Orientation for New Students', description: 'An introductory session for all new students to familiarize them with university policies, campus, and resources.', location: 'Main Auditorium' },
    { date: '2024-09-15', title: 'Mid-Term Exams Begin', description: 'Mid-term examinations will commence. Please check the examination schedule for specific dates and venues.', location: 'Various Classrooms' },
    { date: '2024-10-01', title: 'Research Paper Submission Deadline', description: 'Deadline for submitting research papers for all ongoing courses.', location: 'Online Submission' },
    { date: '2024-11-05', title: 'Annual University Fest', description: 'Join us for the annual university fest featuring cultural events, sports, and more!', location: 'University Grounds' },
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-3xl font-semibold mb-6 flex items-center">
        <FaCalendarAlt className="mr-2 text-indigo-500" />
        Upcoming Events
      </h2>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-indigo-600">{event.date}</p>
                <p className="text-lg font-medium">{event.title}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
              </div>
              <button className="bg-indigo-500 text-white py-2 px-4 rounded-full shadow hover:bg-indigo-600 transition duration-300">
                <FaInfoCircle className="inline-block mr-2" />
                Details
              </button>
            </div>
            <p className="mt-3 text-gray-700 text-sm">{event.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpcomingEvents;
