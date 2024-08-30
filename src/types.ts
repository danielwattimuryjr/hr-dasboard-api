export type ErrorResponse = {
  status: number;
  message?: string;
}

export type SuccessResponse<T> = {
  status: number;
  success: boolean;
  message?: string;
  data?: T
}

export type Employee = {
  id?: number;
  email: string;
  password?: string;
  full_name: string;
  username: string;
  role?: string;
  role_id?: number;
  display_name?: string;
  profile_pic?: string;
  phone?: string;
}

export type Role = {
  id?: number;
  role_name: string;
  display_name: string;
  user_count?: number;
}

export type Project = {
  id?: number;
  project_name: string;
}

export type Task = {
  id?: number;
  user_id?: number;
  full_name?: string;
  task: string;
  start: Date;
  end: Date;
  project_id?: number;
  project_name?: string;
}

export type Absence = {
  id?: number;
  user_id?: number;
  date: Date;
  type: 'WFH' | 'AL' | 'SL';
  isApproved?: boolean;
}

export type Period = "weekly" | "monthly" | null;
