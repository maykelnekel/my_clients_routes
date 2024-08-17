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
      throw new ResponseError(StatusCodes.CONFLICT, `O usuário com o email '${email}' já está cadastrado.`)
    }
  } catch (error) {
    if (error instanceof ResponseError) {
      const responseError = {
          status: error.status,
          error: true,
          message: error.message,
        } as iMainResponse

        return res.status(error.status).json(responseError);
      } else {
        const responseError = {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          error: true,
          message: "Internal Server Error.",
        } as iMainResponse;

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError);
      }
  }
}

export default verifyIfUserAlreadyExists;