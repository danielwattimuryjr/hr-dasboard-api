import { query } from "../libs/pg"
import { Project, TeamProject } from "../types"

// type TeamProjectArgs

class TeamProjectService {
  static ASSIGN_PROJECT = async (project_id: number, team_id: number) => {
    const result = await query<TeamProject>(`
    INSERT INTO team_project (
      team_id,
      project_id
    ) VALUES (
      $1::integer, 
      $2::integer
    )
    RETURNING *
    `, [team_id, project_id]);

    return result?.rows.at(0)
  }

  static GET_BY_ID = async (project_id: number, team_id: number) => {
    const result = await query<TeamProject[]>(`
    SELECT * FROM 
      team_project 
    WHERE
      team_id=$1::integer
    AND
      project_id=$2::integer
    `, [team_id, project_id])

    return result?.rows.at(0)
  }

  static GET_BY_TEAM_ID = async (team_id: number) => {
    const result = await query<Project[]>(`
    SELECT 
      p.*
    FROM 
      team_project tp
    JOIN
      project p
    ON 
      tp.project_id=p.id
    WHERE
      tp.project_id=$1::integer
    `, [team_id])

    return result?.rows
  }

  static REMOVE_PROJECT = async (project_id: number, team_id: number) => {
    const result = await query(`
    DELETE FROM
      team_project
    WHERE
      project_id=$1::integer
    AND
      team_id=$2::integer
    `, [project_id, team_id])
  }
}

export default TeamProjectService