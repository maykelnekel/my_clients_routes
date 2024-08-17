import "dotenv/config"
import swaggerAutogen from 'swagger-autogen';
import { iMainResponse, iSchemaValidationError, iUserListResponse, iUserResponse } from '../../Shared/types/responses.types';
import { tUser, tUserCreation } from '../../Shared/types/user.types';

const PORT = Number(process.env.SERVER_PORT);
const HOST = process.env.SERVER_HOST;

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

const InternalServerError: iMainResponse = {
  error: true || false,
  message: "string",
  status: 500,
}

const ConflictError: iMainResponse = {
  error: true || false,
  message: "string",
  status: 409,
} 

const SchemaValidationError: iSchemaValidationError = {
  error: true,
  message: "string",
  status: 400,
  details: {
    field: "string",
    type: "string"
  }
}

const UserListResponse: iUserListResponse = {
  error: false,
  message: "string",
  status: 200,
  data: [
    UserSchema
  ]
} 

const UserResponse: iUserResponse = {
  error: false,
  message: "string",
  status: 0,
  data: UserSchema
} 

const UserCreationResponse: iUserResponse = {
  error: false,
  message: "string",
  status: 201,
  data: UserSchema
} 

const doc = {
  swagger: 3.0,
  info: {
    version: '1.0.0',
    title: 'Minha rota de usuários',
    description: 'API desenvolvida com Express, Typescript e Postgres. E documentada com Swagger',
  },
  host: `${HOST}:${PORT}`,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Users',
      description: 'Endpoints para interação com os usuários da aplicação.'
    },
    {
      name: 'Routes',
      description: 'Endpoints para controle e interação com as rota de visitas.'
    },
  ],
  components: {
    schemas: {
      UserSchema,
      UserCreationSchema,
      UsersListSchema: [UserSchema],
      InternalServerError,
      ConflictError,
      UserCreationResponse,
      SchemaValidationError,
      UserListResponse,
      UserResponse
    }
  },
};

swaggerAutogen(configs)(outputFile, endpointsFiles, doc)
