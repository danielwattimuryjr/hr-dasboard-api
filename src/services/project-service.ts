import { query } from "../libs/pg"
import { Project, TeamProject } from "../types"

class ProjectService {
  static GET = async (fields?: Record<string, any>) => {
    const whereClauses: string[] = [];
    const values: any[] = [];

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        whereClauses.push(`${key} = $${values.length + 1}`);
        values.push(fields[key]);
      }
    }
    const whereClause = whereClauses.join(' AND ');

    const result = await query<Project>(`
    SELECT
     *
    FROM projects
    ${whereClause ? 'WHERE ' + whereClause : ''}
    ORDER BY project_name
    `, values)

    return result
  }

  static STORE = async (project: Project): Promise<Project | undefined> => {
    const storeProjectResult = await query<Project>(`
    INSERT INTO projects (
      project_name
    ) VALUES ($1)
    RETURNING *
    `, [project.project_name])

    return storeProjectResult?.rows.at(0)
  }

  static UPDATE = async (project: Project): Promise<Project | undefined> => {
    const updateProjectResult = await query<Project>(`
      UPDATE projects
      SET
        project_name=$1
      WHERE id=$2::integer
      RETURNING *
    `, [project.project_name, project.id])

    return updateProjectResult?.rows.at(0)
  }

  static DELETE = async (project_id: number): Promise<void> => {
    await query(`
      DELETE FROM projects
      WHERE id=$1::integer
    `, [project_id])
  }
}

export default ProjectService