import { tUser, tUserList } from "./user.types";

export  interface iMainResponse {
  status: number;
  error: boolean;
  message: string;
}

export  interface iSchemaValidationError extends iMainResponse {
  details: {
    type: string;
    field: string;
  }
}

export  interface iUserListResponse extends iMainResponse {
  data: tUserList
}

export  interface iUserResponse extends iMainResponse {
  data: tUser
}
