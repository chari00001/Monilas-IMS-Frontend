import api from "../api"; 

export const getAllStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const getStudentById = async (id: number) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with id ${id}:`, error);
    throw error;
  }
};

export const createStudent = async (student: any) => {
  try {
    const response = await api.post('/students', student);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

export const updateStudent = async (id: number, student: any) => {
  try {
    const response = await api.put(`/students/${id}`, student);
    return response.data;
  } catch (error) {
    console.error(`Error updating student with id ${id}:`, error);
    throw error;
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.status === 204; // Returns true if the deletion was successful
  } catch (error) {
    console.error(`Error deleting student with id ${id}:`, error);
    throw error;
  }
};
