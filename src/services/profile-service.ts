import { query } from "../libs/pg"
import { Employee } from "../types"

class ProfileService {
  static GET_PROFILE = async (employee_id: number) => {
    const getProfileResult = await query<Employee>(`
      SELECT
        u.id,
        u.email,
        u.name,
        u.phone,
        u.level,
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
        name=$3
        role_id=$4::integer
        phone=$5
      WHERE id=$6::integer
    `, [employee.email, employee.password, employee.name, employee.role, employee.phone, employee_id])

    return updateProfileResult?.rows.at(0)
  }

}

export default ProfileService