import { Request, Response } from "express";
import { ErrorResponse, Project, SuccessResponse, TeamProject } from "../../types";
import { asyncHandler } from "../../helper/async-helper";
import TeamProjectService from "../../services/team-project-service";
import ProjectService from "../../services/project-service";
import ProjectValidation from "./validation";

type ProjectResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type ProjectRequest = Request<{ project_id?: number }, any, {
  id?: number;
  project_name: string;
}>

class ProjectController {
  static GET = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<TeamProject[]>) => {
    const teamId = req.user?.team_id

    if (!teamId) {
      return res.status(403).json({
        status: 403,
        message: `No Team ID was specified`
      } as ErrorResponse)
    }

    const result = await TeamProjectService.GET({
      team_id: teamId
    }, true)

    res.status(200).json({
      status: 200,
      success: true,
      data: result?.rows
    })
  })

  static SHOW = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
    const projectId = Number(req.params.project_id)
    const teamId = req.user?.team_id

    if (!teamId) {
      return res.status(400).json({
        status: 403,
        message: `No Team ID was specified`
      } as ErrorResponse)
    }

    const isExist = await TeamProjectService.GET({
      project_id: projectId,
      team_id: teamId
    }, true)

    if (!isExist) {
      return res.status(404).json({
        status: 404,
        message: `Your team was not assigned for this project`
      } as ErrorResponse)
    }

    const project = isExist.rows.at(0)

    res.status(200).json({
      status: 200,
      success: true,
      data: {
        project_name: project?.project_name,
        id: project?.project_id
      }
    })
  })

  static STORE = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
    const isExist = await ProjectValidation.isExist({
      project_name: req.body.project_name
    }, 'projects')

    if (isExist) {
      return res.status(403).json({
        status: 403,
        message: `Project name not available`
      } as ErrorResponse)
    }

    const result = await ProjectService.STORE(req.body)

    res.status(201).json({
      status: 201,
      success: true,
      message: `Project has been created successfully`,
      data: result
    })
  })

  static UPDATE = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
    const projectId = Number(req.body.id)

    const isExist = await ProjectValidation.isExist({
      id: projectId
    }, "projects")

    if (!isExist) {
      return res.status(403).json({
        status: 403,
        message: `Project not found`
      } as ErrorResponse)
    }

    const result = await ProjectService.UPDATE(req.body)

    res.status(200).json({
      status: 200,
      success: true,
      message: `Project has been updated successfully`,
      data: result
    })
  })

  static DELETE = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<undefined>) => {
    const projectId = Number(req.params.project_id)

    const isExist = await ProjectValidation.isExist({
      id: projectId
    }, 'projects')

    if (!isExist) {
      return res.status(403).json({
        status: 403,
        message: `Project not found`
      } as ErrorResponse)
    }

    await ProjectService.DELETE(projectId)

    res.status(200).json({
      status: 200,
      success: true,
      message: `Project has been deleted successfully`,
    })
  })
}

export default ProjectController