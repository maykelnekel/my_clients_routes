import { Request, Response } from 'express'
import { routesServices } from '../services'
import { tUserList } from '../../../Shared/types/user.types'
import { iMainResponse, iUserListResponse } from '../../../Shared/types/responses.types';


export const calculateRoute = async (req: Request, res: Response): Promise<Response<iUserListResponse>> => {
  try {
    const list = req.body
    const data: tUserList = routesServices.calculateRoute(list)
    const response: iUserListResponse = {
      error: false,
      message: "Ordenação feita com sucesso.",
      status: 200,
      data,
    } 
    return res.status(200).send(response)
  } catch (error) {
    console.error(error)
    const response: iMainResponse = {
      error: false,
      message: "Erro interno no servidor.",
      status: 500
    } 
    return res.status(500).send(response)
  }
};
