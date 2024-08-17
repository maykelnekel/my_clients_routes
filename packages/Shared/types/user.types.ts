import z  from "zod";
import { userCreationSchema, userListSchema, userSchema } from "../schemas/users.schemas";

export type tUser = z.infer<typeof userSchema>;

export type tUserCreation = z.infer<typeof userCreationSchema>;

export type tUserList = z.infer<typeof userListSchema>;
