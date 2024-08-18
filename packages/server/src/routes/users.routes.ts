import express, { NextFunction, Request, Response } from 'express'
import { userCreationSchema } from '../../../Shared/schemas/users.schemas';
import {  usersControllers } from '../controllers'
import { usersMiddlewares, validationsMiddlewares } from '../middlewares/index';

const router = express.Router()

router.post('/create',  (_: Request, __: Response, next: NextFunction) =>{
  /* SWAGGER DOCS

    #swagger.tags = ['Users']
    #swagger.sumary = 'Criação de usuário'
    #swagger.description = 'Através desse endpoint é possível criar um usuário.'
    #swagger.schema = { '#ref: #/schemas/UserSchema' }
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/UserCreationSchema'
                    }  
                }
            }
        }
    #swagger.responses[201] = {
        description: 'Crição feita com sucesso.',
        schema: { $ref: '#/components/schemas/UserCreationResponse' }
    }
    #swagger.responses[400] = {
        description: 'Erro de validação.',
        schema: { $ref: '#/components/schemas/SchemaValidationErrorResponse' }
    }
    #swagger.responses[409] = {
        description: 'Erro por conflitos.',
        schema: { $ref: '#/components/schemas/ConflictErrorResponse' }
    }
    #swagger.responses[500] = {
        description: 'Erro interno.',
        schema: { $ref: '#/components/schemas/InternalServerErrorResponse' }
    }
  */ 
  next()
}, 
  validationsMiddlewares.validateDataSchema(userCreationSchema),
  usersMiddlewares.verifyIfUserAlreadyExists,
  usersControllers.createUser
);

router.get('/list', (_: Request, __: Response, next: NextFunction) =>{
  /* SWAGGER DOCS

    #swagger.tags = ['Users']
    #swagger.sumary = 'Listagem de usuários'
    #swagger.description = 'Através desse endpoint é possível listar todos os usuários da aplicação.'
    #swagger.schema = { $ref: '#/schemas/UsersListSchema' }
    #swagger.responses[200] = {
        description: 'Retorno feito com sucesso.',
        schema: { $ref: '#/components/schemas/UserListResponse' }
    }
    #swagger.responses[500] = {
        description: 'Erro interno.',
        schema: { $ref: '#/components/schemas/InternalServerErrorResponse' }
    }
  */ 
  next()
}, usersControllers.getAllUsers);

export default router;
