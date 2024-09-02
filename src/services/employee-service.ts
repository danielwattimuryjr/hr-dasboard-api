import { query } from "../libs/pg";
import { Employee } from "../types";

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
      SELECT u.id, u.email, u.full_name AS name, u.phone, r.display_name AS role
      FROM users u 
      LEFT JOIN roles r ON u.role_id = r.id
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

  static GET_BY_ID = async (employeeId: number): Promise<Employee | undefined> => {
    const fethUserInfoByIdResult = await query<Employee>(`
    SELECT
      u.*, 
      r.display_name AS role
    FROM public."users" u
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.id = $1::integer
    `, [employeeId])

    return fethUserInfoByIdResult?.rows.at(0)
  }

  static DELETE = async (employeeId: number): Promise<void> => {
    await query(`
      DELETE FROM public."users" 
      WHERE id=$1::integer
    `, [employeeId])
  }

  static STORE = async (employee: Employee): Promise<Employee | undefined> => {
    const { email, full_name, username, password, phone, role_id } = employee

    const storeEmployeeResult = await query<Employee>(`
    INSERT INTO public."users" (
      email,
      full_name,
      username,
      password,
      role_id,
      phone
    ) VALUES ($1, $2, $3, $4, $5::integer, $6) 
    RETURNING *
    `, [email, full_name, username, password, role_id, phone])

    return storeEmployeeResult?.rows.at(0)
  }

  static UPDATE = async (employee_id: number, employee: Employee): Promise<Employee | undefined> => {
    const { email, full_name, username, password, phone, role_id } = employee

    const updateEmployeeResult = await query<Employee>(`
    UPDATE public."users"
    SET 
      email=$1, 
      full_name=$2, 
      username=$3, 
      password=$4, 
      role_id=$5::integer,
      phone=$6
    WHERE id=$7::integer 
    RETURNING *
    `, [email, full_name, username, password, role_id, phone, employee_id])

    return updateEmployeeResult?.rows.at(0)
  }
}

export default EmployeeService