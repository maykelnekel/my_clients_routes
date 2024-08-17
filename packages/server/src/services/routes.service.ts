import { tUser, tUserList } from "../../../Shared/types/user.types";
import utils from "../utils/index";
import "dotenv/config"

const COMPANY_COORD_X = Number(process.env.COMPANY_COORD_X)
const COMPANY_COORD_Y = Number(process.env.COMPANY_COORD_Y)

export const calculateRoute = (users: tUser[]): tUserList => {
  const startingPoint: tUser = {
    email: "minhaempresa@mail.com",
    id: "id",
    latitude: COMPANY_COORD_X,
    longitude: COMPANY_COORD_Y,
    name: "minha empresa",
    phone_number: "(41) 99999-9999"
  };
  let currentLocation = startingPoint;
  let route: tUser[] = [startingPoint]; // Inclua o ponto inicial na rota
  let unvisitedUsers = [...users]; // Cópia dos usuários para não modificar o array original

  while (unvisitedUsers.length > 0) {
      let nearestUser = unvisitedUsers.reduce((prev, curr) => {
          let prevDistance = utils.calculateEuclideanDistance(currentLocation.latitude, currentLocation.longitude, prev.latitude, prev.longitude);
          let currDistance = utils.calculateEuclideanDistance(currentLocation.latitude, currentLocation.longitude, curr.latitude, curr.longitude);
          return prevDistance < currDistance ? prev : curr;
      });

      route.push(nearestUser);
      unvisitedUsers = unvisitedUsers.filter(user => user !== nearestUser);
      currentLocation = nearestUser;
  }

  return route;
}
