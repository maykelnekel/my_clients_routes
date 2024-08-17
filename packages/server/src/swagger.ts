import swaggerAutogen from 'swagger-autogen';
import { tUser, tUserCreation } from '../../Shared/types/user.types';

const outputFile = './swagger.json';
const endpointsFiles = ['./app.ts'];

type tDefinitionTypes = string | number | "UUID"
type tDefinition<T> = {
  [K in keyof T]: {
    type: tDefinitionTypes;
    example: tDefinitionTypes;
  }
}
const UserCreationDenifition: tDefinition<tUserCreation> = {
  name: {
    type: "string",
    example: "nome"
  },
  email: {
    example: "email@mail.com",
    type: "string"
  },
  phone_number: {
    example: "(xx) xxxxx-xxxx | (xx) xxxx-xxxx",
    type: "string"
  },
  latitude: {
    example: 0,
    type: "number"
  },
  longitude: {
    example: 0,
    type: "number"
  },
}


const UserDefinition: tDefinition<tUser> = {
  ...UserCreationDenifition,
  id: {
    example: "eaedeabb-0af5-4a97-962d-f8572d4e3667",
    type: "UUID"
  }
}

const UserCreationSchema: tUserCreation = {
  name: "string",
  email: "mail@mail.com",
  phone_number: "(xx) xxxxx-xxxx | (xx) xxxx-xxxx",
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
  // definitions: {
  //   UserDefinition,
  //   UserCreationDefinition: UserCreationDenifition,
  //   UsersListDefinition: [UserDefinition],
  // }
};

swaggerAutogen({ language: 'pr-BR', openapi: '3.0.0' })(outputFile, endpointsFiles, doc)