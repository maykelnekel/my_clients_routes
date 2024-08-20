import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../slices/users/index";

export const mainStore = () => {
  return configureStore({
    reducer: {
      usersListsReducer: userReducers.usersListsSlices,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
}

export type tAppStore = ReturnType<typeof mainStore>;
export type tRootState = ReturnType<tAppStore["getState"]>;
export type tAppDispatch = tAppStore["dispatch"];

export default mainStore;
