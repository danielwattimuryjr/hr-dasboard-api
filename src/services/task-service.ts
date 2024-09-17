import { query } from "../libs/pg"
import { Task } from "../types"

class TaskService {
  static GET = async (params: {
    fields?: Array<keyof Task>
    where?: Record<string, any>
  }) => {
    const whereClauses: string[] = [];
    const values: any[] = [];

    for (const key in params.where) {
      if (params.where.hasOwnProperty(key)) {
        whereClauses.push(`${key} = $${values.length + 1}`);
        values.push(params.where[key]);
      }
    }
    const whereClause = whereClauses.join(' AND ');

    const fethAllRoleResult = await query<Task>(`
    SELECT
      ${params.fields !== undefined ? params.fields.join(', ') : '*'}
    FROM roles
    ${whereClause ? 'WHERE ' + whereClause : ''}
    ORDER BY role_name
    `, values)

    return fethAllRoleResult
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
      u.name,
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
}

export default TaskService