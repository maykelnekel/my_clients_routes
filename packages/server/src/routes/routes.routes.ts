import express, { NextFunction, Request, Response } from 'express'
import { userListSchema } from '../../../Shared/schemas/users.schemas';
import {  routesControllers } from '../controllers'
import { validationsMiddlewares } from '../middlewares/index';

const router = express.Router()

router.post('/calculate_route',  (_: Request, __: Response, next: NextFunction) =>{
  /* SWAGGER DOCS
  
    #swagger.tags = ['Routes']
    #swagger.sumary = 'Criação da rota de visita'
    #swagger.description = 'Através desse endpoint e com base em uma lista de usuários, é possível criar a ordenação da melhor rota de visitação.'
    #swagger.schema = { '#ref: #/schemas/UsersListSchema' }
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/UsersListSchema'
                    }  
                }
            }
        }
    #swagger.responses[200] = {
        description: 'Ordenação feita com sucesso.',
        schema: { $ref: '#/components/schemas/UserListResponse' }
    }
    #swagger.responses[400] = {
        description: 'Erro de validação.',
        schema: { $ref: '#/components/schemas/SchemaValidationErrorResponse' }
    }
    #swagger.responses[500] = {
        description: 'Erro interno.',
        schema: { $ref: '#/components/schemas/InternalServerErrorResponse' }
    }
  */ 
  next()
}, 
  validationsMiddlewares.validateDataSchemaByList(userListSchema),
  routesControllers.calculateRoute
);

export default router;