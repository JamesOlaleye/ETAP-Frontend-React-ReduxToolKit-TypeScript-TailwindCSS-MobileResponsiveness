// src/types/index.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Subject {
  teacherName: string;
  id: string;
  name: string;
  teacherId?: string;
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
  title: string;
  description: string;
}

export interface Progress {
  id: string;
  userId: string;
  topicId: string;
  progress: number;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  adminKey?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateProgress {
  studentId: string;
  topicId: string;
  apiKey: string;
}

export interface UpdateProgress {
  studentId: string;
  topicId: string;
  apiKey: string;
  progress: number;
}

export interface CreateSubject {
  name: string;
  teacherId?: string;
}

export interface AssignTeacher {
  id: string;
  teacherId: string;
}

export interface CreateTopic {
  title: string;
  description: string;
  subjectId: string;
  videoUrl?: string;
}

export interface UploadVideo {
  id: string;
  videoUrl?: string;
}

export interface UpdateTopic {
  id: string;
  title?: string;
  description?: string;
}
