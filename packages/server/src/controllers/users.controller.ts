import { Request, Response } from 'express'
import { usersServices } from '../services'
import { tUser, tUserList } from '../../../Shared/types/user.types'


export const getAllUsers = async (__: Request, res: Response): Promise<Response<tUserList>> => {
  try {
    const result: tUserList = await usersServices.getAllUsers()
    return res.status(200).send(result)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Something went wrong' })
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response<tUser>> => {
  try {
    const userData = req.body;
    const result: tUser = await usersServices.createUser(userData)
    return res.status(201).send(result)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Something went wrong' })
  }
};

