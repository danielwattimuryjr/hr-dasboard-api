import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, Project, SuccessResponse } from "../types";
import { StatusCodes } from "http-status-codes";
import ProjectService from "../services/project-service";
import TeamUserService from "../services/team-user-service";
import TeamProjectService from "../services/team-project-service";


type ProjectResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type ProjectRequest = Request<{ project_id?: number }, any, {
  project_name: string;
}>

const getAllProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project[]>) => {
  const teamId = req.user?.team_id

  if (!teamId) {
    return res.status(400).json({
      status: 403,
      message: `No Team ID was specified`
    } as ErrorResponse)
  }
  const result = await TeamProjectService.GET_BY_TEAM_ID(teamId)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result
  })
})

const getProjectById = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
  const projectId = Number(req.params.project_id);
  const teamId = Number(req.user?.team_id);


  if (!teamId) {
    return res.status(400).json({
      status: 403,
      message: `No Team ID was specified`
    } as ErrorResponse)
  }

  const isPermitted = await TeamProjectService.CHECK_TEAM_PERMISSION(teamId, projectId)

  if (!isPermitted) {
    return res.status(404).json({
      status: 404,
      message: `Your team was not assigned for this project`
    } as ErrorResponse)
  }

  const result = await ProjectService.GET_BY_ID(projectId)
  const resultCount = result?.rowCount ?? 0

  if (!(resultCount > 0)) {
    return res.status(404).json({
      status: 404,
      message: `Project not found`
    } as ErrorResponse)
  }

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result?.rows.at(0)
  })
})

const createNewProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<any>) => {
  const result = ProjectService.STORE(req.body)

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    success: true,
    message: `New project successfully created`,
    data: result
  })
})

const updateProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
  const project_id = Number(req.params.project_id);

  const result = await ProjectService.UPDATE(project_id, req.body)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `Project with ID ${project_id} has been updated`,
    data: result
  })
})

const deleteProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<null>) => {
  const project_id = Number(req.params.project_id);

  ProjectService.DELETE(project_id)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `Project with ID ${project_id} has been deleted`,
  })
})


export {
  getAllProject,
  getProjectById,
  createNewProject,
  updateProject,
  deleteProject
}