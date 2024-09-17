import EmployeeService from "../../services/employee-service"

class EmployeeValidation {
  static isDataExist = async (fields: Record<string, any>, isUpdate: boolean = false) => {
    const result = await EmployeeService.GET(fields);

    if (
      result?.rowCount !== undefined &&
      result?.rowCount !== null &&
      result?.rowCount > 0
    ) {
      // Data exist
      return result.rows.at(0);
    }

    // Data does not exist
    return false;
  };
}

export default EmployeeValidation