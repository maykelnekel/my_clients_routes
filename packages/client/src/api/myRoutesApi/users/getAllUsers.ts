import axios, { AxiosError } from "axios";
import "dotenv/config";

import {
  iMainResponse,
  iUserListResponse,
} from "../../../../../Shared/types/responses.types";

const BASE_URL = process.env.NEXT_APP_BASE_URL;
const API_VERSION = process.env.NEXT_APP_API_VERSION;

export const getAllUsers = async (): Promise<iUserListResponse | iMainResponse> => {
  // TODO: capturar uri do .env
  const uri = `${BASE_URL}/${API_VERSION}/users/create`;
  return axios
    .get<iUserListResponse>("http://localhost:4000/api/v1/users/list")
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
