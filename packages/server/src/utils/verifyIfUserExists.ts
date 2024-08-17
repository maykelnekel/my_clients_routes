import { QueryResult } from "pg";
import { tUser } from "../../../Shared/types/user.types";
import client from "../../database/client";


const verifyIfUserExistsByEmail = async (email: string): Promise<tUser> => {
  const query = `
    SELECT * FROM users WHERE email = $1;
  `;
  const res: QueryResult<tUser> = await client.query(query, [email])
  return res.rows[0]
}

export default verifyIfUserExistsByEmail;