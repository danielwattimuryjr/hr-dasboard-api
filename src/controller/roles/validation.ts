import RoleService from "../../services/role-service";

class RoleValidation {
  static isDataExist = async (fields: Record<string, any>) => {
    const result = await RoleService.GET(fields);

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

export default RoleValidation