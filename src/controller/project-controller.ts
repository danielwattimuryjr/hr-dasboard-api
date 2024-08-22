import { Request, Response } from "express";
import { asyncHandler } from "../helper/async-helper";
import { ErrorResponse, SuccessResponse } from "../types";
import { query } from "../libs/pg";
import { StatusCodes } from "http-status-codes";

type Project = {
  id?: number;
  project_name: string;
  description: string;
}

type ProjectResponse<TData> = Response<SuccessResponse<TData> | ErrorResponse>
type ProjectRequest = Request<{ project_id?: number }, any, {
  project_name: string;
  description: string;
}>

const getAllProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project[]>) => {
  const fetchProjectResult = await query<Project>(
    `SELECT * FROM projects ORDER BY project_name`
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: fetchProjectResult?.rows || []
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

  const checkProjectExsistenceResult = await query<Project>(
    `SELECT * FROM projects WHERE id=$1`,
    [project_id]
  )

  if (checkProjectExsistenceResult?.rowCount < 0) {
    const response: ErrorResponse = {
      status: StatusCodes.NOT_FOUND,
      message: `Project with ID ${project_id} not found`
    }

    return res.status(StatusCodes.NOT_FOUND).json(response)
  }

  const fetchProjectResult = await query<Project>(
    `SELECT * FROM projects ORDER BY project_name`
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    data: fetchProjectResult?.rows.at(0)
  })
})

const createNewProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
  const { description, project_name } = req.body

  const storeNewProjectResult = await query<Project>(
    `INSERT INTO projects (project_name, description) VALUES ($1, $2) RETURNING *`,
    [project_name, description]
  )

  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    success: true,
    message: `New project successfully created`,
    data: storeNewProjectResult?.rows.at(0)
  })
})

const updateProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<Project>) => {
  const project_id = Number(req.params.project_id);
  const { description, project_name } = req.body

  const updateProjectResult = await query<Project>(
    `UPDATE projects SET project_name=$1, description=$2 WHERE id=$3 RETURNING *`,
    [project_name, description, project_id]
  )

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    success: true,
    message: `Project with ID ${project_id} has been updated`,
    data: updateProjectResult?.rows.at(0)
  })
})

const deleteProject = asyncHandler(async (req: ProjectRequest, res: ProjectResponse<null>) => {
  const project_id = Number(req.params.project_id);

  await query(
    `DELETE FROM projects WHERE id=$1`,
    [project_id]
  )

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