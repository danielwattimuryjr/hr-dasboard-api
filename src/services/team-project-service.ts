import { query } from "../libs/pg"
import { Project, TeamProject } from "../types"

// type TeamProjectArgs

class TeamProjectService {
  static GET = async (fields: Record<string, any>, withProject: boolean = false, withTeam: boolean = false) => {
    const whereClauses: string[] = [];
    const values: any[] = [];
    const columnParts = ['tp.team_id', 'tp.project_id'];
    const joins = [];

    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        whereClauses.push(`${key} = $${values.length + 1}`);
        values.push(fields[key]);
      }
    }
    const whereClause = whereClauses.join(' AND ');

    if (withTeam) {
      columnParts.push('t.name');
      joins.push('LEFT JOIN teams t ON tp.team_id = t.id');
    }

    if (withProject) {
      columnParts.push('p.project_name');
      joins.push('LEFT JOIN projects p ON tp.project_id = p.id');
    }

    const columns = columnParts.length > 0 ? columnParts.join(', ') : 'tp.*';

    let queryStr = `
      SELECT ${columns}
      FROM team_project tp
      ${joins.join('\n    ')}
      ${whereClause ? 'WHERE ' + whereClause : ''}
    `;

    const fethAllRoleResult = await query<TeamProject>(queryStr, values)

    return fethAllRoleResult
  }


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

  static GET_BY_TEAM_ID = async (team_id: number) => {
    const result = await query<Project>(`
    SELECT 
      p.*
    FROM 
      team_project tp
    JOIN
      projects p
    ON 
      tp.project_id=p.id
    WHERE
      tp.team_id=$1::integer
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