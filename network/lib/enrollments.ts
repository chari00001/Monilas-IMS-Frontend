import api from "../api"; 

export const getAllEnrollments = async () => {
  try {
    const response = await api.get('/enrollments');
    return response.data;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw error;
  }
};

export const getEnrollmentById = async (id: number) => {
  try {
    const response = await api.get(`/enrollments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching enrollment with id ${id}:`, error);
    throw error;
  }
};

export const getEnrollmentsByStudentId = async (studentId: number) => {
  try {
    const response = await api.get(`/enrollments/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching enrollments for student with id ${studentId}:`, error);
    throw error;
  }
};

export const getEnrollmentsByClassId = async (classId: number) => {
  try {
    const response = await api.get(`/enrollments/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching enrollments for class with id ${classId}:`, error);
    throw error;
  }
};

export const getEnrollmentsByEnrollmentDate = async (enrollmentDate: string) => {
  try {
    const response = await api.get(`/enrollments/date/${enrollmentDate}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching enrollments with date ${enrollmentDate}:`, error);
    throw error;
  }
};

export const getEnrollmentsByStudentIdAndClassId = async (studentId: number, classId: number) => {
  try {
    const response = await api.get(`/enrollments/student/${studentId}/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching enrollments for student ${studentId} in class ${classId}:`, error);
    throw error;
  }
};

export const getEnrollmentsByDateRange = async (startDate: string, endDate: string) => {
  try {
    const response = await api.get(`/enrollments/date-range`, { params: { startDate, endDate } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching enrollments between ${startDate} and ${endDate}:`, error);
    throw error;
  }
};

export const createOrUpdateEnrollment = async (enrollment: any) => {
  try {
    const response = await api.post('/enrollments', enrollment);
    return response.data;
  } catch (error) {
    console.error('Error creating or updating enrollment:', error);
    throw error;
  }
};

export const deleteEnrollmentById = async (id: number) => {
  try {
    const response = await api.delete(`/enrollments/${id}`);
    return response.status === 204; 
  } catch (error) {
    console.error(`Error deleting enrollment with id ${id}:`, error);
    throw error;
  }
};
