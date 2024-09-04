import api from "../api"; 

export const getAllClasses = async () => {
  try {
    const response = await api.get('/classes');
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

export const getClassById = async (id: number) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching class with id ${id}:`, error);
    throw error;
  }
};

export const getClassByName = async (name: string) => {
  try {
    const response = await api.get(`/classes/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching class with name ${name}:`, error);
    throw error;
  }
};

export const getClassesByLecturerId = async (lecturerId: number) => {
  try {
    const response = await api.get(`/classes/lecturer/${lecturerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching classes for lecturer with id ${lecturerId}:`, error);
    throw error;
  }
};

export const getClassesByPartialName = async (name: string) => {
  try {
    const response = await api.get(`/classes/search`, { params: { name } });
    return response.data;
  } catch (error) {
    console.error(`Error searching for classes with partial name ${name}:`, error);
    throw error;
  }
};

export const getClassesByCreditRange = async (minCredit: number, maxCredit: number) => {
  try {
    const response = await api.get(`/classes/credits`, { params: { minCredit, maxCredit } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching classes within credit range ${minCredit}-${maxCredit}:`, error);
    throw error;
  }
};

export const getClassesByLecturerIdAndCreditRange = async (
  lecturerId: number,
  minCredit: number,
  maxCredit: number
) => {
  try {
    const response = await api.get(`/classes/lecturer/${lecturerId}/credits`, { params: { minCredit, maxCredit } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching classes for lecturer ${lecturerId} within credit range ${minCredit}-${maxCredit}:`, error);
    throw error;
  }
};

export const countClassesByLecturerId = async (lecturerId: number) => {
  try {
    const response = await api.get(`/classes/lecturer/${lecturerId}/count`);
    return response.data;
  } catch (error) {
    console.error(`Error counting classes for lecturer with id ${lecturerId}:`, error);
    throw error;
  }
};

export const createOrUpdateClass = async (classObj: any) => {
  try {
    const response = await api.post('/classes', classObj);
    return response.data;
  } catch (error) {
    console.error('Error creating or updating class:', error);
    throw error;
  }
};

export const deleteClass = async (id: number) => {
  try {
    const response = await api.delete(`/classes/${id}`);
    return response.status === 204; // Returns true if the deletion was successful
  } catch (error) {
    console.error(`Error deleting class with id ${id}:`, error);
    throw error;
  }
};
