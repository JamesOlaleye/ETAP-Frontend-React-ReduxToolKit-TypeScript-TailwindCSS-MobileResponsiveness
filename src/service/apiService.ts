import axios, { AxiosResponse } from 'axios';

// Environment variable for base URL
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define DTOs for requests
interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  adminKey?: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface CreateProgressDto {
  studentId: string;
  topicId: string;
  apiKey: string;
}

interface UpdateProgressDto {
  studentId: string;
  topicId: string;
  apiKey: string;
  progress: number;
}

interface CreateSubjectDto {
  name: string;
  teacherId?: string;
}

interface AssignTeacherDto {
  id: string;
  teacherId: string;
}

interface CreateTopicDto {
  title: string;
  description: string;
  subjectId: string;
  videoUrl?: string;
}

interface UploadVideoDto {
  id: string;
  videoUrl?: string;
}

interface UpdateTopicDto {
  id: string;
  title?: string;
  description?: string;
}

// Authentication
async function register(data: RegisterDto): Promise<AxiosResponse> {
  return await axios.post(`${BASE_URL}/auth/register`, data);
}

async function login(data: LoginDto): Promise<AxiosResponse> {
  return await axios.post(`${BASE_URL}/auth/login`, data);
}

// User Management
async function getUser(id: string): Promise<AxiosResponse> {
  return await axios.get(`${BASE_URL}/user/${id}`);
}

async function getAllUsers(): Promise<AxiosResponse> {
  return await axios.get(`${BASE_URL}/user`);
}

async function promoteUser(id: string): Promise<AxiosResponse> {
  return await axios.patch(`${BASE_URL}/user/promote/${id}`);
}

// Subject Management
async function createSubject(data: CreateSubjectDto): Promise<AxiosResponse> {
  return await axios.post(`${BASE_URL}/subject`, data);
}

async function getAllSubjects(): Promise<AxiosResponse> {
  return await axios.get(`${BASE_URL}/subject`);
}

async function getSubject(id: string): Promise<AxiosResponse> {
  return await axios.get(`${BASE_URL}/subject/${id}`);
}

async function assignTeacher(data: AssignTeacherDto): Promise<AxiosResponse> {
  return await axios.patch(`${BASE_URL}/subject/assign`, data);
}

async function enrollSubject(data: {
  studentId: string;
  subjectId: string;
}): Promise<AxiosResponse> {
  return await axios.post(`${BASE_URL}/subject/enroll`, data);
}

// Topic Management
async function createTopic(data: CreateTopicDto): Promise<AxiosResponse> {
  return await axios.post(`${BASE_URL}/topic`, data);
}

async function updateTopic(data: UpdateTopicDto): Promise<AxiosResponse> {
  return await axios.put(`${BASE_URL}/topic`, data);
}

async function getTopic(id: string): Promise<AxiosResponse> {
  return await axios.get(`${BASE_URL}/topic/${id}`);
}

async function getTopicsBySubject(id: string): Promise<AxiosResponse> {
  const token = localStorage.getItem('authToken'); // Retrieve the token

  return await axios.get(`${BASE_URL}/topic/subject/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the headers
    },
  });
}

async function uploadVideo(data: UploadVideoDto): Promise<AxiosResponse> {
  return await axios.patch(`${BASE_URL}/topic/video`, data);
}

// Progress Management
async function createProgress(data: CreateProgressDto): Promise<AxiosResponse> {
  return await axios.post(`${BASE_URL}/progress`, data);
}

async function updateProgress(data: UpdateProgressDto): Promise<AxiosResponse> {
  return await axios.patch(`${BASE_URL}/progress`, data);
}

async function getMyProgress(id: string): Promise<AxiosResponse> {
  return await axios.get(`${BASE_URL}/progress/mine/${id}`);
}

async function getProgressBySubject(id: string): Promise<AxiosResponse> {
  return await axios.get(`${BASE_URL}/progress/mine/subject/${id}`);
}

async function rankLearners(id: string): Promise<AxiosResponse> {
  return await axios.get(`${BASE_URL}/progress/rank/${id}`);
}

export {
  register,
  login,
  getUser,
  getAllUsers,
  promoteUser,
  createSubject,
  getAllSubjects,
  getSubject,
  assignTeacher,
  enrollSubject,
  createTopic,
  updateTopic,
  getTopic,
  getTopicsBySubject,
  uploadVideo,
  createProgress,
  updateProgress,
  getMyProgress,
  getProgressBySubject,
  rankLearners,
};
