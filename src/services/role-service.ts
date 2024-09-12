import { query } from "../libs/pg";
import { Role } from "../types";

class RoleService {
  static GET_ALL = async (): Promise<Role[]> => {
    const fethAllRoleResult = await query<Role>(`
    SELECT 
      id,
      role_name,
      display_name AS role
    FROM roles
    ORDER BY role_name
    `)

    return fethAllRoleResult?.rows || []
  }

  static GET_BY_ID = async (role_id: number) => {
    const fetchRoleById = await query<Role>(`
    SELECT
      role_name,
      display_name
    FROM roles
    WHERE id=$1::integer
    `, [role_id])

    return fetchRoleById?.rows.at(0)
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

  static CHECK_DUPLICATE_ENTRY = async (role: Role, excludeId?: number) => {
    const queryStr = `
    SELECT id
    FROM roles
    WHERE (display_name = $1 OR role_name = $2)
    ${excludeId !== undefined ? 'AND id != $3' : ''}
    LIMIT 1
  `;

    const params = excludeId !== undefined
      ? [role.display_name, role.role_name, excludeId]
      : [role.display_name, role.role_name];

    const result = await query<{ id: number }>(queryStr, params);

    return result.rowCount > 0;
  }
}

export default RoleService