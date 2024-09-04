import api from "../api";

export const getAllLecturers = async () => {
  try {
    const response = await api.get('/lecturers');
    return response.data;
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    throw error;
  }
};

export const getLecturerById = async (id: number) => {
  try {
    const response = await api.get(`/lecturers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lecturer with id ${id}:`, error);
    throw error;
  }
};

export const createLecturer = async (lecturer: any) => {
  try {
    const response = await api.post('/lecturers', lecturer);
    return response.data;
  } catch (error) {
    console.error('Error creating lecturer:', error);
    throw error;
  }
};

export const updateLecturer = async (id: number, lecturer: any) => {
  try {
    const response = await api.put(`/lecturers/${id}`, lecturer);
    return response.data;
  } catch (error) {
    console.error(`Error updating lecturer with id ${id}:`, error);
    throw error;
  }
};

export const deleteLecturer = async (id: number) => {
  try {
    const response = await api.delete(`/lecturers/${id}`);
    return response.status === 204; // Returns true if the deletion was successful
  } catch (error) {
    console.error(`Error deleting lecturer with id ${id}:`, error);
    throw error;
  }
};

export const getLecturersByDepartmentId = async (departmentId: number) => {
  try {
    const response = await api.get(`/lecturers/department/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching lecturers for department with id ${departmentId}:`, error);
    throw error;
  }
};

export const searchLecturersByName = async (name: string) => {
  try {
    const response = await api.get(`/lecturers/search`, { params: { name } });
    return response.data;
  } catch (error) {
    console.error(`Error searching for lecturers with name ${name}:`, error);
    throw error;
  }
};

export const getDepartmentHeads = async () => {
  try {
    const response = await api.get('/lecturers/department-heads');
    return response.data;
  } catch (error) {
    console.error('Error fetching department heads:', error);
    throw error;
  }
};
