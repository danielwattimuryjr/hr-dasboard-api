import ProjectService from "../../services/project-service";
import TeamProjectService from "../../services/team-project-service"
import TeamService from "../../services/team-service";

class ProjectValidation {
  static isExist = async (fields: Record<string, any>, table: 'team_project' | 'projects') => {
    let result

    switch (table) {
      case "team_project":
        result = await TeamProjectService.GET(fields, true, true);
        break;
      case "projects":
        result = await ProjectService.GET(fields)
        break;
    }

    if (
      result?.rowCount !== undefined &&
      result?.rowCount !== null &&
      result?.rowCount > 0
    ) {
      // Data exist
      console.log('Data Exist');

      return result.rows.at(0);
    }

    // Data does not exist
    console.log('Not exist');

    return false;
  };
}

export default ProjectValidation