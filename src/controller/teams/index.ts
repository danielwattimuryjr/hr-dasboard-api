import { Request, Response } from "express"
import { ErrorResponse, SuccessResponse, Team, TeamProject } from "../../types"
import { asyncHandler } from "../../helper/async-helper";
import TeamService from "../../services/team-service";
import TeamValidation from "./validation";
import TeamProjectService from "../../services/team-project-service";

type TeamRequest = Request<{ team_id?: number }, any, {
  id?: number;
  name: string;
}>
type TeamResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type TeamProjectRequest = Request<{}, any, {
  team_id: number;
  project_id: number;
}>
type TeamProjectResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>

class TeamController {
  static GET = asyncHandler(async (req: TeamRequest, res: TeamResponse<Team[]>) => {
    const result = await TeamService.GET()

    res.status(200).json({
      status: 200,
      success: true,
      data: result?.rows
    })
  })

  static SHOW = asyncHandler(async (req: TeamRequest, res: TeamResponse<Team>) => {
    const teamId = Number(req.params.team_id);
    const data = await TeamValidation.isDataExist({
      id: teamId
    })

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Team not found`
      } as ErrorResponse)
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: data
    })
  })

  static STORE = asyncHandler(async (req: TeamRequest, res: TeamResponse<Team>) => {
    const { name } = req.body;

    const isExist = await TeamValidation.isDataExist({
      name
    });

    if (isExist) {
      return res.status(403).json({
        status: 403,
        message: `Team Name not available`
      } as ErrorResponse);
    }

    const result = await TeamService.STORE({
      name
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: `Role has been created successfully`,
      data: result
    });
  })

  static UPDATE = asyncHandler(async (req: TeamRequest, res: TeamResponse<Team>) => {
    const teamId = Number(req.body.id)
    const { name } = req.body;

    const isExist = await TeamValidation.isDataExist({
      id: teamId
    });

    if (!isExist) {
      return res.status(404).json({
        status: 404,
        message: `Team not found`
      } as ErrorResponse);
    }

    const result = await TeamService.UPDATE({
      name
    });

    res.status(201).json({
      status: 201,
      success: true,
      message: `Team has been updated successfully`,
      data: result
    });
  })

  static DELETE = asyncHandler(async (req: TeamRequest, res: TeamResponse<undefined>) => {
    const teamId = Number(req.params.team_id)

    const isExist = await TeamValidation.isDataExist({
      id: teamId
    });

    if (!isExist) {
      return res.status(404).json({
        status: 404,
        message: `Team not found`
      } as ErrorResponse);
    }

    await TeamService.DELETE(teamId)

    res.status(201).json({
      status: 201,
      success: true,
      message: `Team has been deleted successfully`,
    });
  })

  // Project Assignment
  static ASSIGN_PROJECT = asyncHandler(async (req: TeamProjectRequest, res: TeamResponse<TeamProject>) => {
    const team_id = Number(req.body.team_id);
    const project_id = Number(req.body.project_id);

    const { valid, message: validationMessage } = await TeamValidation.validateProjectOwnership(project_id, team_id);
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

  static REMOVE_PROJECT_FROM_TEAM = asyncHandler(async (req: TeamProjectRequest, res: TeamResponse<undefined>) => {
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

export default TeamController