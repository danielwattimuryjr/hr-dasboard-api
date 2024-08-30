import { query } from "../libs/pg"
import { Absence } from "../types";

class AbsenceService {
  static GET_ALL = async () => {
    const fetchAbsenceResult = await query<any>(`
    SELECT
        u.id AS user_id,
        u.full_name AS name,
        ARRAY_AGG(
            JSON_BUILD_OBJECT(
                'date', a.date,
                'type', a.type
            )
        ) AS absences
    FROM absences a
    JOIN users u ON a.user_id = u.id
    GROUP BY u.id, u.full_name
    ORDER BY u.id;
    `);

    return fetchAbsenceResult?.rows || [];
  }

  static GET_BY_ID = async (employee_id: number) => {
    const fetchAbsenceResult = await query<Absence>(`
    SELECT
       *
    FROM absences a
    WHERE id=$1
    `, [employee_id]);

    return fetchAbsenceResult?.rows || [];
  }

  static GET_BY_EMPLOYEE_ID = async (employee_id: number) => {
    const fetchAbsenceResult = await query<any>(`
    SELECT
        u.id AS user_id,
        u.full_name AS name,
        ARRAY_AGG(
            JSON_BUILD_OBJECT(
                'date', a.date,
                'type', a.type
            )
        ) AS absences
    FROM absences a
    JOIN users u ON a.user_id = u.id
    WHERE a.user_id = $1
    GROUP BY u.id, u.full_name
    ORDER BY u.id;
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

  static UPDATE = async (employee_id: number, absence: Absence) => {
    const updateResult = await query<Absence>(`
    UPDATE absences
    SET
      user_id=$1::integer,
      date=$2,
      type=$3
    WHERE id=$4::integer
    RETURNING *
    `, [absence.user_id, absence.date, absence.type, employee_id])

    return updateResult?.rows.at(0)
  }

  static DELETE = async (absence_id: number) => {
    await query(`
    DELETE FROM absences
    WHERE id=$1::integer
    `, [absence_id])
  }

  static APPROVAL = async (absence_id: number, isApproved: boolean) => {
    const updateApprovalResult = await query<Absence>(`
    UPDATE 
      absences 
    SET is_approved=$1 
    WHERE id=$2
    RETURNING *
    `, [isApproved, absence_id])

    return updateApprovalResult?.rows.at(0)
  }
}

export default AbsenceService