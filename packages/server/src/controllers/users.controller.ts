import { Request, Response } from 'express'
import { usersServices } from '../services'
import { tUser, tUserList } from '../../../Shared/types/user.types'
import { iMainResponse, iUserListResponse } from '../../../Shared/types/responses.types';


export const getAllUsers = async (__: Request, res: Response): Promise<Response<iUserListResponse>> => {
  try {
    const data: tUserList = await usersServices.getAllUsers()
    const response: iUserListResponse = {
      data,
      error: false,
      message: "Usuários listados.",
      status: 200
    } 
    return res.status(200).send(response)
  } catch (error) {
    const response: iMainResponse = {
      error: false,
      message: "Erro interno no servidor.",
      status: 500
    } 
    return res.status(500).send(response)
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response<tUser>> => {
  try {
    const userData = req.body;
    const result: tUser = await usersServices.createUser(userData)
    return res.status(201).send(result)
  } catch (error) {
    const response: iMainResponse = {
      error: false,
      message: "Erro interno no servidor.",
      status: 500
    } 
    return res.status(500).send(response)
  }
};

