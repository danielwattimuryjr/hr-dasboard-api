import { query } from "../libs/pg"
import { Employee } from "../types"

class ProfileService {
  static GET_PROFILE = async (employee_id: number) => {
    const getProfileResult = await query<Employee>(`
      SELECT
        u.id,
        u.email,
        u.full_name,
        u.username,
        u.phone,
        r.display_name as role
      FROM public."users" u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id=$1::integer
    `, [employee_id])

    return getProfileResult?.rows.at(0)
  }

  static UPDATE_PROFILE = async (employee_id: number, employee: Employee) => {
    const updateProfileResult = await query<Employee>(`
      UPDATE public."users"
      SET
        email=$1
        password=$2
        full_name=$3
        username=$4
        role_id=$5::integer
        phone=$6
      WHERE id=$7::integer
    `, [employee.email, employee.password, employee.full_name, employee.username, employee.role, employee.phone, employee_id])

    return updateProfileResult?.rows.at(0)
  }

}

export default ProfileService