import client from "../../database/client"
import { tUser, tUserCreation, tUserList } from "../../../Shared/types/user.types"

export const getAllUsers = async (): Promise<tUserList> => {
  try {
    const query = `
      SELECT 
        *
      FROM users;
    `;
    const res = await client.query(query);
    return res.rows;
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

export const createUser = async (userData: tUserCreation): Promise<tUser> => {
  try {
    const query = `
      INSERT 
        INTO users
          (name, email, phone_number, latitude, longitude)
        VALUES
          ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [
      userData.name,
      userData.email,
      userData.phone_number,
      userData.latitude,
      userData.longitude
    ];
    const res = await client.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("error");
  }
}

