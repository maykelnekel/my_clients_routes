import axios, { AxiosError } from "axios";
import "dotenv/config";

import { tUser, tUserCreation } from "../../../../../Shared/types/user.types";
import { iUserResponse } from "../../../../../Shared/types/responses.types";

const BASE_URL=process.env.NEXT_APP_BASE_URL
const API_VERSION=process.env.NEXT_APP_API_VERSION

export const createUser = async (data: tUserCreation): Promise<tUser> => {
  const uri = `${BASE_URL}/${API_VERSION}/users/create`;
  console.log(uri)
    return axios.post<iUserResponse>('http://localhost:4000/api/v1/users/create', data)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.error("createUser", error);
      if (error instanceof AxiosError){
        return error.response.data;
      }
      return {error: true};
    });
};
