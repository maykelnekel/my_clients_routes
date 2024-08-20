import axios, { AxiosError } from "axios";

import { tUserCreation } from "../../../../../Shared/types/user.types";
import {
  iMainResponse,
  iSchemaValidationError,
  iUserResponse,
} from "../../../../../Shared/types/responses.types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export const createUser = async (
  data: tUserCreation
): Promise<iUserResponse | iMainResponse | iSchemaValidationError> => {
  const uri = `${BASE_URL}/${API_VERSION}/users/create`;
  return axios
    .post<iUserResponse>(uri, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error instanceof AxiosError) {
        return error.response!.data;
      }
      return {
        error: true,
        message: error.message,
        status: 500,
      } as iMainResponse;
    });
};
