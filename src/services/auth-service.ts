import { query } from "../libs/pg"
import { Employee, Login } from "../types"

class AuthService {
  static LOGIN = async (loginRequest: Login) => {
    const loginResult = await query<Employee>(`
      SELECT 
        u.id, 
        u.email, 
        u.full_name, 
        u.username, 
        u.phone,
        r.role_name, 
        r.display_name
      FROM 
        public."users" u
      JOIN 
        roles r ON u.role_id = r.id
      WHERE 
        u.email=$1 AND u.password=$2
    `, [loginRequest.email, loginRequest.password])

    return loginResult
  }
}

export default AuthService