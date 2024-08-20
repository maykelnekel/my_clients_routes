import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tUser, tUserList } from "../../../../../../Shared/types/user.types";

export interface iUserSlice {
  allUsers: tUserList;
  orderedUsers: tUserList;
  usersToOrder: string[];
}
const initialState: iUserSlice = {
  allUsers: [],
  orderedUsers: [],
  usersToOrder: [],
};

const usersLists = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<tUserList>) => {
      state.allUsers = [...action.payload];
    },
    setOrderedUsers: (state, action: PayloadAction<tUserList>) => {
      state.orderedUsers = [...action.payload];
    },
    setUserToOrder: (state, action: PayloadAction<string>) => {
      state.usersToOrder.push(action.payload);
    },
    removeUserToOrder: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.usersToOrder = [
        ...state.usersToOrder.filter((id) => id !== idToRemove),
      ];
    },
    cleanUsersToOrder: (state) => {
      state.usersToOrder = initialState.usersToOrder;
    },
    cleanOrderedUsers: (state) => {
      state.orderedUsers = initialState.orderedUsers;
    },
  },
});

export const {
  setAllUsers,
  setOrderedUsers,
  setUserToOrder,
  removeUserToOrder,
  cleanUsersToOrder,
  cleanOrderedUsers
} = usersLists.actions;

export default usersLists.reducer;
