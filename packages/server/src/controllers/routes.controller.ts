import { Request, Response } from 'express'
import { routesServices } from '../services'
import { tUserList } from '../../../Shared/types/user.types'
import { iMainResponse, iUserListResponse } from '../../../Shared/types/responses.types';
import { StatusCodes } from 'http-status-codes';


export const calculateRoute = async (req: Request, res: Response): Promise<Response<iUserListResponse>> => {
  try {
    const list = req.body
    const data: tUserList = routesServices.calculateRoute(list)
    const response: iUserListResponse = {
      error: false,
      message: "Ordenação feita com sucesso.",
      status: StatusCodes.OK,
      data,
    } 
    return res.status(StatusCodes.OK).send(response)
  } catch (error) {
    console.error(error)
    const response: iMainResponse = {
      error: false,
      message: "Erro interno no servidor.",
      status: StatusCodes.INTERNAL_SERVER_ERROR
    } 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response)
  }
};
