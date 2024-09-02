import { query } from "../libs/pg"
import { Task } from "../types"

class TaskService {
  static GET_ALL = async (): Promise<Task[]> => {
    const fetchTaskResult = await query<Task>(`
    SELECT
      t.id,
      t.task,
      u.full_name,
      t.start,
      t."end",
      p.project_name
    FROM tasks t
    JOIN users u ON t.user_id=u.id
    JOIN projects p ON t.project_id=p.id
    ORDER BY start, "end" ASC
    `)

    return fetchTaskResult?.rows || []
  }

  static GET_BY_ID = async (task_id: number): Promise<Task | undefined> => {
    const fetchTaskResult = await query<Task>(`
    SELECT
      t.id,
      t.task,
      u.full_name,
      t.start,
      t."end",
      p.project_name
    FROM tasks t
    JOIN users u ON t.user_id=u.id
    JOIN projects p ON t.project_id=p.id
    WHERE t.id=$1::integer
    ORDER BY start, "end" ASC
    `, [task_id])

    return fetchTaskResult?.rows.at(0)
  }

  static GET_BY_EMPLOYEE_ID = async (employee_id: number, period?: "weekly" | "monthly" | undefined) => {
    let filterByPeriodStr: string = ''

    switch (period) {
      case "weekly":
        filterByPeriodStr = `AND start >= date_trunc('week', current_timestamp) AND start < date_trunc('week', current_timestamp) + interval '1 week'`;
        break;
      case "monthly":
        filterByPeriodStr = `AND start >= date_trunc('month', current_timestamp) AND start < date_trunc('month', current_timestamp) + interval '1 month'`
        break;
      default:
        break;
    }

    const fetchTaskResult = await query<Task>(`
    SELECT
      t.id,
      t.task,
      u.full_name,
      t.start,
      t."end",
      p.project_name
    FROM tasks t
    JOIN users u ON t.user_id=u.id
    JOIN projects p ON t.project_id=p.id
    WHERE user_id=$1 
    ${filterByPeriodStr}
    ORDER BY start, "end" ASC
    `, [employee_id])

    return fetchTaskResult?.rows || []
  }

  static STORE = async (user_id: number, tasks: Task[]) => {
    const q: string[] = [];
    const params: string[] = [];

    tasks?.forEach((task, index) => {
      const baseIndex = index * 5;
      q.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5})`);

      params.push(`${task.project_id}`)
      params.push(`${task.task}`)
      params.push(`${task.start}`)
      params.push(`${task.end}`)
      params.push(`${user_id}`)
    })

    const queryStr = `INSERT INTO tasks (project_id, task, start, "end", user_id) VALUES ` + q.join(', ') + `RETURNING *`;

    const storeTaskResult = await query<Task>(queryStr, params)

    return storeTaskResult?.rows
  }

  static UPDATE = async (task_id: number, task: Task) => {
    const updateTaskResult = await query<Task>(`
    UPDATE tasks
    SET 
      project_id=$1,
      task=$2,
      start=$3,
      "end"=$4,
      user_id=$5
    WHERE id=$6
    RETURNING *
    `, [task.project_id, task.task, task.start, task.end, task_id])

    return updateTaskResult?.rows.at(0)
  }

  static DELETE = async (task_id: number) => {
    await query(`
    DELETE FROM tasks
    WHERE id=$1::integer
    `, [task_id])
  }
}

export default TaskService