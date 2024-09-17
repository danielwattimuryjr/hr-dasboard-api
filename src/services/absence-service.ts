import { query } from "../libs/pg"
import { Absence } from "../types";

class AbsenceService {
  static GET = async<TResult>(params: {
    fields?: Array<string> | undefined
    conditions?: Record<string, any>
    groupBy?: Array<string>
  }) => {
    const whereClauses: string[] = [];
    const values: any[] = [];

    for (const key in params.conditions) {
      if (params.conditions.hasOwnProperty(key) && params.conditions[key] !== undefined) {
        whereClauses.push(key);
        values.push(params.conditions[key]);
      }
    }
    const whereClause = whereClauses.join(' AND ');
    const joinedFields = (params.fields !== undefined) ? params.fields.length > 0 ? params.fields.join(', ') : '*' : '*'
    const groupedByFields = (params.groupBy !== undefined) ? params.groupBy.length > 0 ? params.groupBy.join(', ') : '' : ''

    const result = await query<TResult>(`
    SELECT
      ${joinedFields}
    FROM absences 
    ${whereClause ? 'WHERE ' + whereClause : ''}
    ${groupedByFields ? 'GROUP BY ' + groupedByFields : ''}
    ORDER BY date
    `, values)

    return result
  }

  static GET_ALL = async () => {
    const fetchAbsenceResult = await query<any>(`
    SELECT
        u.id AS user_id,
        u.name AS name,
        ARRAY_AGG(
            JSON_BUILD_OBJECT(
                'date', a.date,
                'type', a.type,
                'reason', a.reason
            )
        ) AS absences
    FROM absences a
    JOIN users u ON a.user_id = u.id
    GROUP BY u.id, u.name
    ORDER BY u.id;
    `);

    return fetchAbsenceResult?.rows || [];
  }

  static GET_BY_ID = async (employee_id: number): Promise<Absence | undefined> => {
    const fetchAbsenceResult = await query<Absence>(`
    SELECT
       *
    FROM absences a
    WHERE id=$1
    `, [employee_id]);

    return fetchAbsenceResult?.rows.at(0);
  }

  static GET_BY_EMPLOYEE_ID = async (employee_id: number) => {
    const fetchAbsenceResult = await query<any>(`
    SELECT
      id,
      user_id,
      date,
      type,
      date_team_lead_approved,
      date_hr_approved,
      is_approved,
      reason
    FROM absences
    WHERE user_id = $1::integer
    ORDER BY id ASC
    `, [employee_id]);

    return fetchAbsenceResult?.rows || [];
  }

  static STORE = async (absence: Absence) => {
    const saveAbsenceResult = await query<Absence>(`
    INSERT INTO absences (
      user_id, 
      date, 
      type
    ) VALUES ($1::integer, $2, $3) 
    RETURNING *
    `, [absence.user_id, absence.date, absence.type]);

    return saveAbsenceResult?.rows.at(0)
  }

  static DELETE = async (absence_id: number) => {
    await query(`
    DELETE FROM absences
    WHERE id=$1::integer
    `, [absence_id])
  }

  static UPDATE_STATUS = async (absence_id: number, approval: {
    is_approved: boolean;
    reason?: string
  }) => {
    const absence = await this.GET_BY_ID(absence_id);

    if (!absence) {
      throw new Error(`Absence with ID ${absence_id} not found.`);
    }

    let sql = `UPDATE absences SET `;
    const params: any[] = [];
    let updateField = '';

    if (approval.is_approved) {
      if (!absence.date_team_lead_approved) {
        updateField = 'date_team_lead_approved = NOW()';
      } else if (!absence.date_hr_approved) {
        updateField = 'date_hr_approved = NOW(), is_approved = TRUE';
      }

      if (!updateField) {
        return { message: "All fields are already set." };
      }

      sql += `${updateField} WHERE id = $1 RETURNING *`;
    } else {
      sql += `is_approved = FALSE`;
      if (approval.reason) {
        sql += `, reason = $1`;
        params.push(approval.reason);
      }
      sql += ` WHERE id = $2 RETURNING *`;
    }
    params.push(absence_id);

    const updateResult = await query<Absence>(sql, params);

    return updateResult?.rows.at(0);
  }
}

export default AbsenceService