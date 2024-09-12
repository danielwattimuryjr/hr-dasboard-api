import { query } from "../libs/pg"
import { Project, TeamProject } from "../types"

class ProjectService {
  static GET_ALL = async (): Promise<Project[]> => {
    const fetchProjectResult = await query<Project>(`
    SELECT 
      * 
    FROM projects 
    ORDER BY project_name
    `)

    return fetchProjectResult?.rows || []
  }

  static GET_BY_ID = async (project_id: number) => {
    const fetchProjectByIdResult = await query<Project>(`
    SELECT 
      *
    FROM projects
    WHERE id=$1::integer
    `, [project_id])

    return fetchProjectByIdResult
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

  static UPDATE = async (project_id: number, project: Project): Promise<Project | undefined> => {
    const updateProjectResult = await query<Project>(`
      UPDATE projects
      SET
        project_name=$1
      WHERE id=$2::integer
      RETURNING *
    `, [project.project_name, project_id])

    return updateProjectResult?.rows.at(0)
  }

  static DELETE = async (project_id: number): Promise<void> => {
    await query(`
      DELETE FROM projects
      WHERE id=$1::integer
    `, [project_id])
  }

  static ASSIGN_PROJECT = async (team_id: number, project_id: number) => {
    await query(`
    INSERT INTO project_team (
      project_id,
      team_id
    ) VALUES (
      $1,
      $2
    )
    `, [team_id, project_id])
  }
}

export default ProjectService