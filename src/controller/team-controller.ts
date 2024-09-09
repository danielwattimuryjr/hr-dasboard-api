import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import TeamService from "../services/team-service";
import { Employee, ErrorResponse, SuccessResponse, Team, TeamProject, TeamUser } from "../types";
import EmployeeService from "../services/employee-service";
import TeamUserService from "../services/team-role-service";
import TeamProjectService from "../services/team-project-service";

type TeamResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>

class TeamController {
  static INDEX = asyncHandler(async (req: Request, res: Response) => {
    const result = await TeamService.GET();
    res.status(200).json({
      status: 200,
      success: true,
      data: result,
    });
  });

  // SHOW
  static SHOW = asyncHandler(async (req: Request, res: Response) => {
    const team_id = Number(req.body.team_id);
    const teamDetailsResult = await TeamService.GET_BY_ID(team_id);
    const memberResult = await TeamUserService.GET_TEAM_MEMBER(team_id);

    res.status(200).json({
      status: 200,
      success: true,
      data: {
        team: teamDetailsResult,
        members: memberResult,
      },
    });
  });

  static CREATE_TEAM = asyncHandler(async (req: Request, res: TeamResponse<Team>) => {
    const result = await TeamService.CREATE_TEAM(req.body)

    res.status(201).json({
      status: 201,
      success: true,
      message: "Team has been created sucessfully",
      data: result
    })
  })

  static ADD_MEMBER = asyncHandler(async (req: Request, res: TeamResponse<TeamUser>) => {
    const user_id = Number(req.body.user_id)
    const team_id = Number(req.body.team_id)

    const validation = await Validation.validateMembership(user_id, team_id);
    if (!validation.valid) {
      return res.status(403).json({
        status: 403,
        message: validation.message
      } as ErrorResponse);
    }

    const result = await TeamUserService.ADD_MEMBER(
      user_id,
      team_id
    )

    res.status(201).json({
      status: 201,
      success: true,
      message: `Employee has been successfully added into the team`,
      data: result
    })
  })

  static REMOVE_MEMBER = asyncHandler(async (req: Request, res: Response) => {
    const user_id = Number(req.body.user_id)
    const team_id = Number(req.body.team_id)

    const result = await TeamUserService.REMOVE_MEMBER(user_id, team_id)

    res.status(200).json({
      status: 200,
      success: true,
      message: `Employee has been successfully removed from the team`,
      data: result
    })
  })

  static DESTROY = asyncHandler(async (req: Request, res: Response) => {
    const team_id = Number(req.body.team_id)

    await TeamService.DELETE_TEAM(team_id)

    res.status(200).json({
      status: 200,
      success: true,
      message: `Team has been successfully deleted`,
    })
  })

  static ASSIGN_PROJECT = asyncHandler(async (req: Request, res: Response) => {
    const team_id = Number(req.body.team_id);
    const project_id = Number(req.body.project_id);

    const { valid, message: validationMessage } = await Validation.validateProjectOwnership(project_id, team_id);
    if (!valid) {
      return res.status(401).json({
        status: 403,
        message: validationMessage
      } as ErrorResponse)
    }

    const result = await TeamProjectService.ASSIGN_PROJECT(project_id, team_id)

    return res.status(201).json({
      status: 201,
      success: true,
      message: `Project has been assigned to the team soccessfully!`,
      data: result
    } as SuccessResponse<TeamProject>)
  })

  static REMOVE_PROJECT_FROM_TEAM = asyncHandler(async (req: Request, res: Response) => {
    const team_id = Number(req.body.team_id);
    const project_id = Number(req.body.project_id);

    await TeamProjectService.REMOVE_PROJECT(project_id, team_id)

    return res.status(200).json({
      status: 200,
      success: true,
      message: `Project has been removed from the team`
    } as SuccessResponse<undefined>)
  })
}

class Validation {
  static readonly validateProjectOwnership = async (project_id: number, team_id: number): Promise<{
    valid: boolean,
    message: string;
  }> => {
    const isAssigned = await TeamProjectService.GET_BY_ID(project_id, team_id)

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
    const isMember = await TeamUserService.CHECK_MEMBER_EXISTANCE(user_id, team_id);
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

export default TeamController