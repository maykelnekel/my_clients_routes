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
      const responseError = error.errors.map((issue: any) => ({
          status: StatusCodes.BAD_REQUEST,
          error: true,
          message: issue.message,
          details: {
            type: "Invalid data",
            field: issue.path.join('.'),
          }
        } as iSchemaValidationError))

        return res.status(StatusCodes.BAD_REQUEST).json(responseError[0]);
      } else {
        const responseError = {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          error: true,
          message: "Internal Server Error.",
        } as iMainResponse;

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responseError);
      }
    }
  };
}