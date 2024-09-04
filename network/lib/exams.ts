import api from "../api"; 

export const getAllExams = async () => {
  try {
    const response = await api.get('/exams');
    return response.data;
  } catch (error) {
    console.error('Error fetching exams:', error);
    throw error;
  }
};

export const getExamById = async (id: number) => {
  try {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exam with id ${id}:`, error);
    throw error;
  }
};

export const getExamsByClassId = async (classId: number) => {
  try {
    const response = await api.get(`/exams/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exams for class with id ${classId}:`, error);
    throw error;
  }
};

export const getExamsByExamDate = async (examDate: string) => {
  try {
    const response = await api.get(`/exams/date/${examDate}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exams with exam date ${examDate}:`, error);
    throw error;
  }
};

export const getExamsByType = async (type: string) => {
  try {
    const response = await api.get(`/exams/type/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exams of type ${type}:`, error);
    throw error;
  }
};

export const getExamsByDurationGreaterThanEqual = async (duration: string) => {
  try {
    const response = await api.get(`/exams/duration`, { params: { duration } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching exams with duration >= ${duration}:`, error);
    throw error;
  }
};

export const getExamsByExamDateAndClassId = async (examDate: string, classId: number) => {
  try {
    const response = await api.get(`/exams/date/${examDate}/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exams on date ${examDate} for class with id ${classId}:`, error);
    throw error;
  }
};

export const getExamsByTypeAndClassId = async (type: string, classId: number) => {
  try {
    const response = await api.get(`/exams/type/${type}/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exams of type ${type} for class with id ${classId}:`, error);
    throw error;
  }
};

export const getExamsByTypeAndDurationLessThan = async (type: string, duration: string) => {
  try {
    const response = await api.get(`/exams/type/${type}/duration`, { params: { duration } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching exams of type ${type} with duration < ${duration}:`, error);
    throw error;
  }
};

export const createOrUpdateExam = async (exam: any) => {
  try {
    const response = await api.post('/exams', exam);
    return response.data;
  } catch (error) {
    console.error('Error creating or updating exam:', error);
    throw error;
  }
};

export const deleteExamById = async (id: number) => {
  try {
    const response = await api.delete(`/exams/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error(`Error deleting exam with id ${id}:`, error);
    throw error;
  }
};
