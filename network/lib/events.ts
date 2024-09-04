import api from "../api";

export const getAllEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id: number) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    throw error;
  }
};

export const getEventsByTitle = async (title: string) => {
  try {
    const response = await api.get(`/events/title/${title}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching events with title ${title}:`, error);
    throw error;
  }
};

export const getEventsByEventDate = async (eventDate: string) => {
  try {
    const response = await api.get(`/events/date/${eventDate}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching events on date ${eventDate}:`, error);
    throw error;
  }
};

export const getEventsByLocation = async (location: string) => {
  try {
    const response = await api.get(`/events/location/${location}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching events at location ${location}:`, error);
    throw error;
  }
};

export const getEventsByDateRange = async (startDate: string, endDate: string) => {
  try {
    const response = await api.get(`/events/date-range`, { params: { startDate, endDate } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching events between ${startDate} and ${endDate}:`, error);
    throw error;
  }
};

export const getEventsByDescriptionContaining = async (keyword: string) => {
  try {
    const response = await api.get(`/events/description`, { params: { keyword } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching events containing keyword ${keyword} in description:`, error);
    throw error;
  }
};

export const createOrUpdateEvent = async (event: any) => {
  try {
    const response = await api.post('/events', event);
    return response.data;
  } catch (error) {
    console.error('Error creating or updating event:', error);
    throw error;
  }
};

export const deleteEventById = async (id: number) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.status === 204; 
  } catch (error) {
    console.error(`Error deleting event with id ${id}:`, error);
    throw error;
  }
};

export const deleteEvent = async (event: any) => {
  try {
    const response = await api.delete('/events', { data: event });
    return response.status === 204; 
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
