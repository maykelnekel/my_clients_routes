import { calculateRoute } from "./routes.service";
import { getAllUsers, createUser } from "./users.services";

export const usersServices = {
  getAllUsers,
  createUser
}
export const routesServices = {
  calculateRoute
}