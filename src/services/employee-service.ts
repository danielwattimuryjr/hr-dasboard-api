import { query } from "../libs/pg";
import { Employee, KeysOfType } from "../types";

class EmployeeService {
  static GET_ALL = async (
    limit: number,
    currentPage: number,
    searchStr?: string,
  ): Promise<{
    totalItems: number;
    employees: Employee[] | undefined;
    totalPages: number;
    currentPage: number;
    limit?: number;
    search?: string | null;
    rowPerPages: number[];
  }> => {
    const whereClauses: any[] = []
    const queryParams: any[] = []
    let limitQuery: string = '';
    let offsetQuery: string = '';

    if (searchStr) {
      whereClauses.push(`u::text ILIKE $${queryParams.length + 1} OR r::text ILIKE $${queryParams.length + 1}`)
      queryParams.push(`%${searchStr}%`)
    }

    limitQuery = `LIMIT $${queryParams.length + 1}`;
    queryParams.push(limit);

    offsetQuery = `OFFSET $${queryParams.length + 1}`;
    queryParams.push((currentPage - 1) * limit);

    const whereClause = whereClauses.length > 0 ? ' WHERE ' + whereClauses.join(' AND ') : '';

    const queryString = `
      SELECT 
        u.id, 
        u.email, 
        u.name, 
        u.phone, 
        u.role_id,
        r.display_name AS role,
        u.team_id,
        t.name AS team,
        u.level
      FROM users u 
      LEFT JOIN roles r ON u.role_id = r.id
      LEFT JOIN teams t ON u.team_id = t.id
      ${whereClause}
      ORDER BY u.id ASC
      ${limitQuery}
      ${offsetQuery}
    `;

    const countQueryString = `
      SELECT COUNT(*) AS total 
      FROM users u 
      LEFT JOIN roles r ON u.role_id = r.id 
      ${whereClause}
    `;

    const result = await query<Employee>(queryString, queryParams)
    const countResult = await query<{ total: number }>(countQueryString, searchStr ? [queryParams[0]] : []);

    const totalRecords = Number(countResult?.rows[0]?.total || 0);
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      totalItems: totalRecords,
      totalPages: totalPages,
      currentPage: currentPage,
      limit,
      search: searchStr || null,
      rowPerPages: [5, 10, 15],
      employees: result?.rows,
    }
  }

  static GET_BY_ID = async (employeeId: number) => {
    const fethUserInfoByIdResult = await query<Employee>(`
    SELECT
      u.id, 
      u.email, 
      u.name, 
      u.phone,
      u.level,
      u.role_id,
      r.display_name AS role,
      u.team_id,
      t.name AS team
    FROM public."users" u
    JOIN roles r ON u.role_id = r.id
    JOIN teams t ON u.team_id = t.id
    WHERE u.id = $1::integer
    `, [employeeId])

    return fethUserInfoByIdResult
  }

  static DELETE = async (employeeId: number): Promise<void> => {
    console.log(employeeId);

    await query(`
      DELETE FROM public."users" 
      WHERE id=$1::integer
    `, [employeeId])
  }

  static STORE = async (employee: Employee): Promise<Employee | undefined> => {
    const { email, name, password, phone, role_id, team_id, level } = employee

    const storeEmployeeResult = await query<Employee>(`
    INSERT INTO public."users" (
      email,
      password,
      name,
      role_id,
      phone,
      level,
      team_id
    ) VALUES ($1, $2, $3, $4::integer, $5, $6, $7::integer) 
    RETURNING *
    `, [email, password, name, role_id, phone, level, team_id])

    return storeEmployeeResult?.rows.at(0)
  }

  static UPDATE = async (employee: Employee): Promise<Employee | undefined> => {
    const { email, name, phone, level, role_id, team_id, id } = employee

    const updateEmployeeResult = await query<Employee>(`
    UPDATE public."users"
    SET 
      email=$1, 
      name=$2, 
      phone=$3,
      level=$4,
      role_id=$5::integer,
      team_id=$6::integer
    WHERE id=$7::integer 
    RETURNING *
    `, [email, name, phone, level, role_id, team_id, id])

    return updateEmployeeResult?.rows.at(0)
  }

  static GET_EMPLOYEE_LEVEL = async (user_id: number) => {
    const result = await query<Employee>(`
    SELECT level FROM public."users" WHERE id=$1::integer
  `, [user_id]);

    return result?.rows.at(0);
  };
}

export default EmployeeService