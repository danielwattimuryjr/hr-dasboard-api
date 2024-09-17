import EmployeeService from "../../services/employee-service";
import TeamProjectService from "../../services/team-project-service";
import TeamService from "../../services/team-service";
import TeamUserService from "../../services/team-user-service";
import { Team } from "../../types";

class TeamValidation {
  static isDataExist = async (fields: Record<string, any>) => {
    const result = await TeamService.GET(fields);

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

  static isValid = async (team: Team, isUpdate: boolean = false): Promise<{
    valid: boolean,
    message?: string
  }> => {
    const isDuplicated = await TeamService.CHECK_DUPLICATE_ENTRY(team)
    isUpdate ? team.id : undefined

    if (isDuplicated) {
      return {
        valid: false,
        message: `Team with the name ${team.name} is already exist`
      }
    }

    return {
      valid: true
    }
  }

  static readonly validateProjectOwnership = async (project_id: number, team_id: number): Promise<{
    valid: boolean,
    message: string;
  }> => {
    const isAssigned = await TeamProjectService.GET({
      project_id,
      team_id
    })

    if (isAssigned) {
      return {
        valid: false,
        message: "The Project with the same ID, already assigned to the team."
      }
    }

    return {
      valid: true,
      message: ""
    }
  }

  static readonly validateMembership = async (user_id: number, team_id: number) => {
    // Check if the user is already a member of the team
    const isMember = await TeamUserService.CHECK_MEMBER_EXISTANCE(user_id);
    if (isMember) {
      return {
        valid: false,
        message: "Employee already in the team."
      };
    }

    // Fetch the user information
    const user = await EmployeeService.GET_EMPLOYEE_LEVEL(user_id);

    // Prevent "hr" from joining any team
    if (user?.level === "hr") {
      return {
        valid: false,
        message: "HR cannot be added to teams."
      };
    }

    // Prevent adding more than one "lead" to a team
    if (user?.level === "lead") {
      const hasLead = await TeamUserService.CHECK_LEAD_EXISTENCE(team_id);
      if (hasLead) {
        return {
          valid: false,
          message: "This team already has a lead."
        };
      }
    }

    return {
      valid: true,
      message: ""
    };
  };
}

export default TeamValidation