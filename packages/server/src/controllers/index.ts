import { calculateRoute } from "./routes.controller";
import { getAllUsers, createUser } from "./users.controller";

export const usersControllers = {
  getAllUsers,
  createUser
} 

export const routesControllers = {
  calculateRoute
}
