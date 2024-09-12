import { query } from "../libs/pg"
import { Employee, Team, TeamUser } from "../types"

class TeamService {
  static CREATE_TEAM = async (team: Team) => {
    const result = await query<Team>(`
    INSERT INTO teams (
      name
    ) VALUES ($1)
    RETURNING *
    `, [team.name])

    return result?.rows.at(0)
  }

  static GET = async () => {
    const result = await query<Team>(`
      SELECT 
        * 
      FROM teams
      ORDER BY id ASC
    `)

    return result?.rows
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

  static DELETE_TEAM = async (team_id: number) => {
    await query(`
      DELETE FROM teams
      WHERE id=$1::integer
    `, [team_id])

    await query(`
      DELETE FROM team_user
      WHERE team_id=$1::integer
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