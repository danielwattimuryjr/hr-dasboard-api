import { query } from "../libs/pg"
import { Employee, Team, TeamUser } from "../types"

class TeamService {
  static STORE = async (team: Team) => {
    const result = await query<Team>(`
    INSERT INTO teams (
      name
    ) VALUES ($1)
    RETURNING *
    `, [team.name])

    return result?.rows.at(0)
  }

  static UPDATE = async (team: Team) => {
    const result = await query<Team>(`
    UPDATE 
      teams
    SET
      name=$1
    WHERE 
      id=$2::integer
    `, [team.name])

    return result?.rows.at(0)
  }

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

    const result = await query<Team>(`
      SELECT 
        * 
      FROM teams
      ${whereClause ? 'WHERE ' + whereClause : ''}
      ORDER BY id ASC
    `)

    return result
  }

  static GET_BY_ID = async (team_id: number) => {
    const result = await query<Team>(`
    SELECT
      *
    FROM teams
    WHERE id=$1::integer
    `, [team_id])

    return result?.rows.at(0)
  }

  static DELETE = async (team_id: number) => {
    await query(`
      DELETE FROM teams
      WHERE id=$1::integer
    `, [team_id])
  }

  static CHECK_DUPLICATE_ENTRY = async (team: Team, excludeId?: number) => {
    const queryStr = `
    SELECT id
    FROM teams
    WHERE (name = $1)
    ${excludeId !== undefined ? 'AND id != $2' : ''}
    LIMIT 1
  `;

    const params = excludeId !== undefined
      ? [team.name, excludeId]
      : [team.name];

    const result = await query<{ id: number }>(queryStr, params);

    return result.rowCount > 0;
  }
}

export default TeamService