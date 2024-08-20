import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
import { iMainResponse, iSchemaValidationError } from '../../../../Shared/types/responses.types';

export const validateDataSchemaByList = (schema: z.ZodArray<z.ZodObject<any, any>>) => {
  return (req: Request, res: Response, next: NextFunction): void | Response<iSchemaValidationError> => {
    try {
      const list = req.body;
      schema.parse(list);      
      next();
    } catch (error) {
      console.error(error)
      if (error instanceof ZodError) {
        const response = error.errors.map((issue: any) => ({
          status: StatusCodes.BAD_REQUEST,
          error: true,
          message: issue.message,
          details: {
            type: "Tipo de dado inválido.",
            field: issue.path.join('.'),
          }
        } as iSchemaValidationError))

        return res.status(StatusCodes.BAD_REQUEST).json(response[0]);
      } else {
        const response: iMainResponse = {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          error: true,
          message: "Internal Server Error.",
        };

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  };
}