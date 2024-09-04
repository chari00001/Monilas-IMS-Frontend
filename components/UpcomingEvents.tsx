"use client"

import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { getAllEvents } from '@/network/lib/events';

interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string; // Assuming the date comes in string format, adjust if different
  location: string;
}

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg mb-8 max-w-full mx-auto">
      <h2 className="text-3xl font-semibold mb-6 flex items-center">
        <FaCalendarAlt className="mr-2 text-indigo-500" />
        Upcoming Events
      </h2>
      <div className="overflow-y-auto max-h-80">
        <ul>
          {events.map((event) => (
            <li
              key={event.id}
              className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-indigo-600">{new Date(event.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
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
      </div>
    </section>
  );
};

export default UpcomingEvents;
