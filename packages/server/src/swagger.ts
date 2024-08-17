import swaggerAutogen from 'swagger-autogen';
import { tUser, tUserCreation } from '../../Shared/types/user.types';

const outputFile = './swagger.json';
const endpointsFiles = ['./app.ts'];
const configs = { 
  language: 'pr-BR', 
  openapi: '3.0.0'
};

const UserCreationSchema: tUserCreation = {
  name: "string",
  email: "mail@mail.com",
  phone_number: "(xx) xxxxx-xxxx || (xx) xxxx-xxxx",
  latitude: 0,
  longitude: 0,
}

const UserSchema: tUser = {
  ...UserCreationSchema,
  id: "UUID"
}

const doc = {
  swagger: 3.0,
  info: {
    version: '1.0.0',
    title: 'Minha API Express',
    description: 'API desenvolvida com Express e documentada com Swagger',
  },
  host: 'localhost:4000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Users',
      description: 'Rotas para interação com os usuários da aplicação.'
    },
  ],
  components: {
    schemas: {
      UserSchema,
      UserCreationSchema,
      UsersListSchema: [UserSchema],
    }
  },
};

swaggerAutogen(configs)(outputFile, endpointsFiles, doc)