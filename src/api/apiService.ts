// src/api/apiService.ts
import axios, { AxiosResponse } from 'axios';

// Types
import {
  RegisterData,
  LoginData,
  CreateProgress,
  UpdateProgress,
  CreateSubject,
  AssignTeacher,
  CreateTopic,
  UploadVideo,
  UpdateTopic,
  Progress,
  User,
  Subject,
  Topic,
} from '../types';

// Environment variable for base URL
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

// Centralized error handling
const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data || 'An unexpected error occurred';
  }
  return 'An unexpected error occurred';
};

// Authentication
export const register = async (
  data: RegisterData
): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);
    return response.data; // Ensure this matches { message: string }
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const login = async (data: LoginData): Promise<{ token: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    return response.data; // Ensure this matches { token: string }
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// User Management
export const getUser = async (id: string): Promise<AxiosResponse<User>> => {
  try {
    return await axios.get(`${BASE_URL}/user/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const getAllUsers = async (): Promise<AxiosResponse<User[]>> => {
  try {
    return await axios.get(`${BASE_URL}/user`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const promoteUser = async (
  id: string
): Promise<AxiosResponse<{ message: string }>> => {
  try {
    return await axios.patch(`${BASE_URL}/user/promote/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// Subject Management
export const createSubject = async (
  data: CreateSubject
): Promise<AxiosResponse<Subject>> => {
  try {
    return await axios.post(`${BASE_URL}/subject`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const getAllSubjects = async (): Promise<AxiosResponse<Subject[]>> => {
  try {
    return await axios.get(`${BASE_URL}/subject`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const getSubject = async (
  id: string
): Promise<AxiosResponse<Subject>> => {
  try {
    return await axios.get(`${BASE_URL}/subject/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const assignTeacher = async (
  data: AssignTeacher
): Promise<AxiosResponse<{ message: string }>> => {
  try {
    return await axios.patch(`${BASE_URL}/subject/assign`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const enrollSubject = async (data: {
  studentId: string;
  subjectId: string;
}): Promise<AxiosResponse<{ message: string }>> => {
  try {
    return await axios.post(`${BASE_URL}/subject/enroll`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// Topic Management
export const createTopic = async (
  data: CreateTopic
): Promise<AxiosResponse<Topic>> => {
  try {
    return await axios.post(`${BASE_URL}/topic`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const updateTopic = async (
  data: UpdateTopic
): Promise<AxiosResponse<Topic>> => {
  try {
    return await axios.put(`${BASE_URL}/topic`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const getTopic = async (id: string): Promise<AxiosResponse<Topic>> => {
  try {
    return await axios.get(`${BASE_URL}/topic/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const getTopicsBySubject = async (
  id: string
): Promise<AxiosResponse<Topic[]>> => {
  const token = localStorage.getItem('authToken'); // Retrieve the token
  try {
    return await axios.get(`${BASE_URL}/topic/subject/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const uploadVideo = async (
  data: UploadVideo
): Promise<AxiosResponse<{ message: string }>> => {
  try {
    return await axios.patch(`${BASE_URL}/topic/video`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

// Progress Management
export const createProgress = async (
  data: CreateProgress
): Promise<AxiosResponse<Progress>> => {
  try {
    return await axios.post(`${BASE_URL}/progress`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const updateProgress = async (
  data: UpdateProgress
): Promise<AxiosResponse<Progress>> => {
  try {
    return await axios.patch(`${BASE_URL}/progress`, data);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const getMyProgress = async (
  id: string
): Promise<AxiosResponse<Progress[]>> => {
  try {
    return await axios.get(`${BASE_URL}/progress/mine/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const getProgressBySubject = async (
  id: string
): Promise<AxiosResponse<Progress[]>> => {
  try {
    return await axios.get(`${BASE_URL}/progress/mine/subject/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};

export const rankLearners = async (
  id: string
): Promise<AxiosResponse<{ ranking: number }>> => {
  try {
    return await axios.get(`${BASE_URL}/progress/rank/${id}`);
  } catch (error) {
    throw new Error(handleAxiosError(error));
  }
};
