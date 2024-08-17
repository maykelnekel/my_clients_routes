import express, { NextFunction, Request, Response } from 'express'
import {  usersControllers } from '../controllers'

const router = express.Router()

router.get('/list', (_: Request, __: Response, next: NextFunction) =>{
  /*
    #swagger.tags = ['Users']
    #swagger.sumary = 'Listagem de usuários'
    #swagger.description = 'Através dessa rota é possível listar todos os usuários da aplicação.'
    #swagger.schema = { $ref: '#/schemas/UsersListSchema' }
  */ 
  next()
}, usersControllers.getAllUsers);

router.post('/create',  (_: Request, __: Response, next: NextFunction) =>{
  /*
    #swagger.tags = ['Users']
    #swagger.sumary = 'Criação de usuário'
    #swagger.description = 'Através dessa rota é possível criar um usuário.'
    #swagger.schema = { #ref: #/schemas/UserSchema}
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/UserCreationSchema"
                    }  
                }
            }
        }
  */ 
  next()
}, usersControllers.createUser);

export default router;
