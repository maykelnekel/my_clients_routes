import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseError from "../../../../Shared/errors/AppError";
import { iMainResponse } from "../../../../Shared/types/responses.types";
import verifyIfUserExistsByEmail from "../../utils/verifyIfUserExists";

const verifyIfUserAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email
    const user = await verifyIfUserExistsByEmail(email)
    if ( user ){
      throw new ResponseError(StatusCodes.CONFLICT, `Já existe um usuário com o email '${email}'.`)
    }
    next();
  } catch (error) {
    if (error instanceof ResponseError) {
        console.error(error)
        const response: iMainResponse = {
          status: error.status,
          error: true,
          message: error.message,
        }

        return res.status(error.status).json(response);
      } else {
        console.error(error)
        const response: iMainResponse = {
          error: false,
          message: "Erro interno no servidor.",
          status: StatusCodes.INTERNAL_SERVER_ERROR
        } 
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response)
      }
  }
}

export default verifyIfUserAlreadyExists;