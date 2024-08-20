import axios, { AxiosError } from "axios";

import {
  iMainResponse,
  iUserListResponse,
} from "../../../../../Shared/types/responses.types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export const getAllUsers = async (): Promise<iUserListResponse | iMainResponse> => {
  const uri = `${BASE_URL}/${API_VERSION}/users/list`;
  return axios
    .get<iUserListResponse>(uri)
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
