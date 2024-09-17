import { query } from "../libs/pg";
import { Role } from "../types";

class RoleService {
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

    const fethAllRoleResult = await query<Role>(`
    SELECT
      id,
      role_name,
      display_name AS "role"
    FROM roles
    ${whereClause ? 'WHERE ' + whereClause : ''}
    ORDER BY role_name
    `, values)

    return fethAllRoleResult
  }

  static STORE = async (role: Role) => {
    const storeRoleResult = await query<Role>(`
    INSERT INTO roles (
      role_name,
      display_name
    ) VALUES ($1, $2)
    RETURNING *
    `, [role.role_name, role.display_name])

    return storeRoleResult?.rows.at(0)
  }

  static UPDATE = async (role: Role) => {
    const updateRoleResult = await query(`
    UPDATE roles
    SET
      role_name=$1,
      display_name=$2
    WHERE id=$3
    RETURNING *
    `, [role.role_name, role.display_name, role.id])

    return updateRoleResult?.rows.at(0)
  }

  static DELETE = async (role_id: number): Promise<void> => {
    const deleteRoleResult = await query(`
    DELETE FROM roles
    WHERE id=$1::integer
    `, [role_id])
  }
}

export default RoleService