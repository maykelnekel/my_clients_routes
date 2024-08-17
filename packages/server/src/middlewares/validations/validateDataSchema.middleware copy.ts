import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { StatusCodes } from 'http-status-codes';
import { iMainResponse, iSchemaValidationError } from '../../../../Shared/types/responses.types';

export const validateDataSchema = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction): void | Response<iSchemaValidationError> => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
      const response = error.errors.map((issue: any) => ({
          status: StatusCodes.BAD_REQUEST,
          error: true,
          message: issue.message,
          details: {
            type: "Formato de dado inválido.",
            field: issue.path.join('.'),
          }
        } as iSchemaValidationError))

        return res.status(StatusCodes.BAD_REQUEST).json(response[0]);
      } else {
        const response: iMainResponse = {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          error: true,
          message: "Erro interno no servidor.",
        };

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  };
}