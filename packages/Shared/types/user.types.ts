import z  from "zod";
import { userCreationSchema, userSchema, userUpdateSchema } from "../schemas/users.schemas";

export type tUser = z.infer<typeof userSchema>;

export type tUserCreation = z.infer<typeof userCreationSchema>;

export type tUserUpdate = z.infer<typeof userUpdateSchema>;

export type tUserList = tUser[];
