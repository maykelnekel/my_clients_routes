import { Request, Response } from 'express'
import { usersServices } from '../services'
import { tUser, tUserList } from '../../../Shared/types/user.types'
import { iMainResponse, iUserListResponse, iUserResponse } from '../../../Shared/types/responses.types';
import { StatusCodes } from 'http-status-codes';


export const getAllUsers = async (__: Request, res: Response): Promise<Response<iUserListResponse>> => {
  try {
    const data: tUserList = await usersServices.getAllUsers()
    const response: iUserListResponse = {
      error: false,
      message: "Usuários listados com sucesso.",
      status: StatusCodes.OK,
      data,
    } 
    return res.status(StatusCodes.OK).send(response)
  } catch (error) {
    console.error(error);
    const response: iMainResponse = {
      error: false,
      message: "Erro interno no servidor.",
      status: 500
    } 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response)
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response<iUserResponse>> => {
  try {
    const userData = req.body;
    const data: tUser = await usersServices.createUser(userData)
    const response: iUserResponse = {
      error: false,
      message: "Usuário criado com sucesso.",
      status: StatusCodes.CREATED,
      data,
    } 
    return res.status(StatusCodes.CREATED).send(response)
  } catch (error) {
    console.error(error);
    const response: iMainResponse = {
      error: false,
      message: "Erro interno no servidor.",
      status: StatusCodes.INTERNAL_SERVER_ERROR
    } 
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response)
  }
};

