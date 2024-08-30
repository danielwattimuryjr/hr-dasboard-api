import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, Project, SuccessResponse } from "../types";
import { query } from "../libs/pg";
import { StatusCodes } from "http-status-codes";
import ProjectService from "../services/project.service";


type ProjectResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type ProjectRequest = Request<{ project_id?: number }, any, {
  project_name: string;
}>

const getAllProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project[]>) => {
  const result = await ProjectService.GET_ALL()

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result
  })
})

const getProjectById = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
  const project_id = Number(req.params.project_id);

  if (!project_id) {
    const response: ErrorResponse = {
      status: StatusCodes.BAD_REQUEST,
      message: "Project ID not specified"
    }

    return res.status(StatusCodes.BAD_REQUEST).json(response)
  }

  const result = await ProjectService.GET_BY_ID(project_id)

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: result
  })
})

const createNewProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
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