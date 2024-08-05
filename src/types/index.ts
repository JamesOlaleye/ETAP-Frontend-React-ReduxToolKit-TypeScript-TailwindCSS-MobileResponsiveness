export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Subject {
  teacherName: ReactNode;
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
