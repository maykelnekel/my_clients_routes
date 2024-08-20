import axios, { AxiosError } from "axios";
import "dotenv/config";

import { tUserList } from "../../../../../Shared/types/user.types";
import {
  iMainResponse,
  iSchemaValidationError,
  iUserListResponse,
} from "../../../../../Shared/types/responses.types";

const BASE_URL = process.env.NEXT_APP_BASE_URL;
const API_VERSION = process.env.NEXT_APP_API_VERSION;

export const getOrderedUsersRoute = async (
  data: tUserList
): Promise<iUserListResponse | iMainResponse | iSchemaValidationError> => {
  // TODO: capturar uri do .env
  const uri = `${BASE_URL}/${API_VERSION}/users/create`;
  return axios
    .post<iUserListResponse>("http://localhost:4000/api/v1/routes/calculate_route", data)
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
