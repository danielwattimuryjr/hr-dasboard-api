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

export type Task = {
  desc: string;
  project: string;
  start: Date;
  end: Date;
  user_id?: number;
  id?: number;
}

export type Period = "weekly" | "monthly" | null;
