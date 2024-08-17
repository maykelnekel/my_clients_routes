import { Request, Response } from 'express'
import { usersServices } from '../services'
import { tUser, tUserList } from '../../../Shared/types/user.types'
import { iMainResponse, iUserListResponse, iUserResponse } from '../../../Shared/types/responses.types';


export const getAllUsers = async (__: Request, res: Response): Promise<Response<iUserListResponse>> => {
  try {
    const data: tUserList = await usersServices.getAllUsers()
    const response: iUserListResponse = {
      error: false,
      message: "Usuários listados com sucesso.",
      status: 200,
      data,
    } 
    return res.status(200).send(response)
  } catch (error) {
    console.error(error);
    const response: iMainResponse = {
      error: false,
      message: "Erro interno no servidor.",
      status: 500
    } 
    return res.status(500).send(response)
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response<iUserResponse>> => {
  try {
    const userData = req.body;
    const data: tUser = await usersServices.createUser(userData)
    const response: iUserResponse = {
      error: false,
      message: "Usuários criado com sucesso.",
      status: 200,
      data,
    } 
    return res.status(200).send(response)
  } catch (error) {
    console.error(error);
    const response: iMainResponse = {
      error: false,
      message: "Erro interno no servidor.",
      status: 500
    } 
    return res.status(500).send(response)
  }
};

