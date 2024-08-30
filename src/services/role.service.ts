import { query } from "../libs/pg";
import { Role } from "../types";

class RoleService {
  static GET_ALL = async (): Promise<Role[]> => {
    const fethAllRoleResult = await query<Role>(`
    SELECT 
      *
    FROM roles
    SORT BY role_name
    `)

    return fethAllRoleResult?.rows || []
  }

  static GET_BY_ID = async (role_id: number): Promise<Role | undefined> => {
    const fetchRoleById = await query<Role>(`
    SELECT
      role_name,
      display_name
    FROM roles
    WHERE id=$1::integer
    `, [role_id])

    return fetchRoleById?.rows.at(0)
  }

  static STORE = async (role: Role): Promise<Role | undefined> => {
    const storeRoleResult = await query(`
    INSERT INTO roles (
      role_name,
      display_name
    ) VALUES ($1, $2)
    RETURNING *
    `, [role.role_name, role.display_name])

    return storeRoleResult?.rows.at(0)
  }

  static UPDATE = async (role_id: number, role: Role): Promise<Role | undefined> => {
    const updateRoleResult = await query(`
    UPDATE roles
    SET
      role_name=$1,
      display_name=$2
    WHERE id=$3
    RETURNING *
    `, [role.role_name, role.display_name, role_id])

    return updateRoleResult?.rows.at(0)
  }

  static DELETE = async (role_id: number): Promise<void> => {
    const deleteRoleResult = await query(`
    DELETE roles
    WHERE id=$1
    `, [role_id])
  }
}

export default RoleService