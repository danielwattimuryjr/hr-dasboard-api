import * as express from 'express';

export type KeysOfType<T> = keyof T;

declare global {
  namespace Express {
    interface Request {
      user?: Employee
    }
  }
}

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
  name: string;
  username: string;
  role?: string;
  role_id?: number;
  display_name?: string;
  profile_pic?: string;
  phone?: string;
  level?: EmployeeLevel,
  team_id?: number
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

export type Team = {
  id?: number;
  name: string;
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
  date_pending?: Date;
  date_team_lead_approved?: Date;
  date_hr_approved?: Date;
  is_approved?: boolean;
  reason?: string;
}

export type Login = {
  email: string;
  password: string;
}

export type TeamUser = {
  team_id: number;
  user_id: number;
}

export type TeamProject = {
  team_id: number;
  project_id: number;
}

export type Period = "weekly" | "monthly" | null;

export type EmployeeLevel = 'hr' | 'employee' | 'lead' | undefined;


