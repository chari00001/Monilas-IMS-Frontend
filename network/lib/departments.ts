import api from "../api"; 

export const getAllDepartments = async () => {
  try {
    const response = await api.get('/departments');
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const getDepartmentById = async (id: number) => {
  try {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching department with id ${id}:`, error);
    throw error;
  }
};

export const createDepartment = async (department: any) => {
  try {
    const response = await api.post('/departments', department);
    return response.data;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

export const updateDepartment = async (id: number, departmentDetails: any) => {
  try {
    const response = await api.put(`/departments/${id}`, departmentDetails);
    return response.data;
  } catch (error) {
    console.error(`Error updating department with id ${id}:`, error);
    throw error;
  }
};

export const deleteDepartmentById = async (id: number) => {
  try {
    const response = await api.delete(`/departments/${id}`);
    return response.status === 204; 
  } catch (error) {
    console.error(`Error deleting department with id ${id}:`, error);
    throw error;
  }
};

export const getDepartmentsByFaculty = async (faculty: string) => {
  try {
    const response = await api.get(`/departments/faculty/${faculty}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching departments for faculty ${faculty}:`, error);
    throw error;
  }
};

export const getDepartmentHead = async (id: number) => {
  try {
    const response = await api.get(`/departments/head/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching department head for department with id ${id}:`, error);
    throw error;
  }
};
