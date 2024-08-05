export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  subjectId: string;
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
