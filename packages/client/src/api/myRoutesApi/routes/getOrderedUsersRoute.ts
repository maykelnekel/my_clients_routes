import axios, { AxiosError } from "axios";

import { tUserList } from "../../../../../Shared/types/user.types";
import {
  iMainResponse,
  iSchemaValidationError,
  iUserListResponse,
} from "../../../../../Shared/types/responses.types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export const getOrderedUsersRoute = async (
  data: tUserList
): Promise<iUserListResponse | iMainResponse | iSchemaValidationError> => {
  const uri = `${BASE_URL}/${API_VERSION}/routes/calculate_route`;
  return axios
    .post<iUserListResponse>(uri, data)
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
