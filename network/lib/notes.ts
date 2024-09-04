import api from "../api"; 

export const getAllNotes = async () => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getNoteById = async (id: number) => {
  try {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching note with id ${id}:`, error);
    throw error;
  }
};

export const getNotesByStudentId = async (studentId: number) => {
  try {
    const response = await api.get(`/notes/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes for student with id ${studentId}:`, error);
    throw error;
  }
};

export const getNotesByClassId = async (classId: number) => {
  try {
    const response = await api.get(`/notes/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes for class with id ${classId}:`, error);
    throw error;
  }
};

export const getNotesByGrade = async (grade: string) => {
  try {
    const response = await api.get(`/notes/grade/${grade}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes with grade ${grade}:`, error);
    throw error;
  }
};

export const getNotesByType = async (type: string) => {
  try {
    const response = await api.get(`/notes/type/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes of type ${type}:`, error);
    throw error;
  }
};

export const getNotesByPointsGreaterThanEqual = async (points: number) => {
  try {
    const response = await api.get(`/notes/points`, { params: { points } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes with points >= ${points}:`, error);
    throw error;
  }
};

export const getNotesByAttendanceGreaterThanEqual = async (attendance: number) => {
  try {
    const response = await api.get(`/notes/attendance`, { params: { attendance } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes with attendance >= ${attendance}:`, error);
    throw error;
  }
};

export const getNotesByStudentIdAndClassId = async (studentId: number, classId: number) => {
  try {
    const response = await api.get(`/notes/student/${studentId}/class/${classId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching notes for student ${studentId} in class ${classId}:`, error);
    throw error;
  }
};

export const createOrUpdateNote = async (note: any) => {
  try {
    const response = await api.post('/notes', note);
    return response.data;
  } catch (error) {
    console.error('Error creating or updating note:', error);
    throw error;
  }
};

export const deleteNoteById = async (id: number) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.status === 204; // Returns true if the deletion was successful
  } catch (error) {
    console.error(`Error deleting note with id ${id}:`, error);
    throw error;
  }
};
