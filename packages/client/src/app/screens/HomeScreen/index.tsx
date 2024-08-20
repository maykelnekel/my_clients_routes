"use client";
import { getAllUsers } from "@/api/myRoutesApi/users/getAllUsers";
import DrawerAppBar from "@/app/components/DrawerAppBar/index";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  cleanUsersToOrder,
  removeUserToOrder,
  setAllUsers,
  setOrderedUsers,
  setUserToOrder,
} from "@/libs/redux/slices/users/usersLists.slice";
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { tUserList } from "../../../../../Shared/types/user.types";
import { getOrderedUsersRoute } from "@/api/myRoutesApi/routes/getOrderedUsersRoute";
import { OrderedUsersModal } from "@/app/components/OrderedUsersModal/index";

export type tBaseFilterOptions = "name" | "phone_number" | "email";
export function HomeScreen() {
  const dispatch = useAppDispatch();

  const { allUsers, usersToOrder } = useAppSelector(
    (state) => state.usersListsReducer
  );
  const [sendMessage, setSendMessage] = React.useState("");
  const [send, setSend] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [baseFilter, setBaseFilter] =
    React.useState<tBaseFilterOptions>("name");
  const [filteredList, setFilteredList] = React.useState<tUserList>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setBaseFilter(event.target.value as tBaseFilterOptions);
  };

  const handleFilter = (event: { target: { value: string } }) => {
    const value = event.target.value;
    const list = allUsers.filter((user) =>
      user[baseFilter].toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    setFilteredList(list);
  };

  const handleToggle = (id: string) => () => {
    if (usersToOrder.includes(id)) {
      dispatch(removeUserToOrder(id));
    } else {
      dispatch(setUserToOrder(id));
    }
  };

  const handleOrderList = async () => {
    try {
      setSending(true);
      const userList = allUsers.filter((user) =>
        usersToOrder.includes(user.id)
      );
      const orderedUsers = await getOrderedUsersRoute(userList);
      console.log(orderedUsers);
      if (orderedUsers.status === 200 && "data" in orderedUsers) {
        setError(false);
        setSendMessage(orderedUsers.message);
        setSending(false);
        dispatch(setOrderedUsers(orderedUsers.data));
      } else {
        setError(true);
        setSendMessage(orderedUsers.message);
        setSending(false);
        return;
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setSendMessage(
        "Um erro inesperado aconteceu, por favor tente novamente mais tarde."
      );
      setSending(false);
      return;
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const users = await getAllUsers();
        if (users.status === 200 && "data" in users) {
          dispatch(setAllUsers(users.data));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  React.useEffect(() => {}, [allUsers, baseFilter, filteredList]);

  React.useEffect(() => {
    const orderedList = allUsers.filter((user) =>
      usersToOrder.includes(user.id)
    );
  }, [dispatch, usersToOrder, allUsers]);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <OrderedUsersModal />
      {send && (
        <Snackbar open={send} autoHideDuration={6000} message={sendMessage}>
          <Alert
            onClose={() => {
              setSend(false);
              setError(false);
            }}
            severity={error ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%", top: 0 }}
          >
            {sendMessage}
          </Alert>
        </Snackbar>
      )}
      <DrawerAppBar screen="Home" />
      <Box component="div" sx={{ display: "flex", paddingLeft: 2, gap: 1 }}>
        <TextField placeholder="Filtrar Usuários" onChange={handleFilter} />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={baseFilter}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="name">Nome</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="phone_number">Telephone</MenuItem>
        </Select>
        <Button
          variant="contained"
          size="large"
          color="info"
          onClick={handleOrderList}
        >
          {sending ? <CircularProgress color="inherit" /> : "Criar melhor rota"}
        </Button>
        <Button
          size="large"
          color="info"
          onClick={() => dispatch(cleanUsersToOrder())}
        >
          Limpar seleções
        </Button>
      </Box>
      <List sx={{ overflow: "auto", maxHeight: "75vh" }}>
        {(filteredList.length > 0 ? filteredList : allUsers).map((user) => {
          const userId = user.id;
          return (
            <ListItem key={userId} disablePadding>
              <ListItemButton
                onClick={handleToggle(userId)}
                dense
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignContent: "center",
                  gap: 2,
                  flexWrap: "nowrap",
                }}
              >
                <Checkbox
                  edge="start"
                  checked={usersToOrder.includes(userId)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": userId }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  <ListItemText id={userId} primary={user.name} />
                  <ListItemText id={userId} primary={user.email} />
                  <ListItemText id={userId} primary={user.phone_number} />
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ width: "100%" }}
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
