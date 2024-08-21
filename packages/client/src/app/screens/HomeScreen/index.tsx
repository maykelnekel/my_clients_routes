"use client";
import { getAllUsers } from "@/api/myRoutesApi/users/getAllUsers";
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
import CustomDrawer from "@/app/components/CustomDrawer/index";
import CustomAppBar from "@/app/components/CustomAppBar/index";
import { DataGrid } from "@mui/x-data-grid";

export type tBaseFilterOptions = "name" | "phone_number" | "email";
export function HomeScreen() {
  const dispatch = useAppDispatch();

  const { allUsers, usersToOrder } = useAppSelector(
    (state) => state.usersListsReducer
  );
  const [lineColor, setLineColor] = React.useState("black");
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
    const list = allUsers.filter((user) => {
      const base = user[baseFilter];
      if (value.length === 0) {
        return;
      }
      if (typeof base === "string") {
          return base.toLowerCase().includes(value.toLocaleLowerCase());
      } else if (typeof base === "number") {
        return base == Number(value);
      }
    });
    setFilteredList(list);
  };

  const handleOrderList = async () => {
    try {
      setSending(true);
      
      const userList = allUsers.filter((user) =>
        usersToOrder.includes(user.id)
      );
      if (userList.length === 0){
        setError(true);
        setSendMessage(
          "Nenhum usuário selecionado.",
        );
        setSending(false);
        return;
      }
      const orderedUsers = await getOrderedUsersRoute(userList);
      if (orderedUsers.status === 200 && "data" in orderedUsers) {
        setError(false);
        setSendMessage(orderedUsers.message);
        setSending(false);
        dispatch(setOrderedUsers(orderedUsers.data));
      } else if (orderedUsers.status === 400) {
        setError(true);
        setSendMessage("Há um problema com o envio dos dados.");
        setSending(false);
        return;
      } else {
        setError(true);
        setSendMessage("Houve um erro inesperado ao tentar listar os usuários, tente novamente mais tarde.");
        setSending(false);
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
          setError(false);
          dispatch(setAllUsers(users.data));
          setSendMessage(users.message);
          setSending(false);
        } else if (users.status === 400 && "data" in users) {
          setError(true);
          setSendMessage("Há um problema com o envio dos dados.");
          setSending(false);
          return;
        } else if (users.status === 404 && "data" in users) {
          setError(true);
          setSendMessage("Nenhum cadastrado.");
          setSending(false);
          return;
        } else {
          setError(true);
          setSendMessage("Houve um erro inesperado ao tentar listar os usuários, tente novamente mais tarde.");
          setSending(false);
        }
      } catch (error) {
        console.error(error);
        setError(true);
        setSendMessage(
          "Um erro inesperado aconteceu, por favor tente novamente mais tarde.",
        );
        setSending(false);
        return;
      }

    })();
  }, [dispatch]);

  React.useEffect(() => {}, [
    allUsers,
    baseFilter,
    filteredList,
    lineColor,
    dispatch,
    usersToOrder,
    allUsers,
  ]);

  React.useEffect(() => {}, [error, sending, send]);

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <OrderedUsersModal />
      {error && (
        <Snackbar open={error} autoHideDuration={6000} message={sendMessage}>
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
      <CustomDrawer screen="Home" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <CustomAppBar />
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
            <MenuItem value="phone_number">Telefone</MenuItem>
            <MenuItem value="latitude">Latitude</MenuItem>
            <MenuItem value="longitude">Longitude</MenuItem>
          </Select>
          <Button
            variant="contained"
            size="large"
            color="info"
            onClick={handleOrderList}
            disabled={usersToOrder.length === 0}
          >
            {sending ? (
              <CircularProgress color="inherit" />
            ) : (
              usersToOrder.length > 0 ? "Criar melhor rota" : "Selecione usuários na lista"
            )}
          </Button>
          <Button
            size="large"
            color="info"
            onClick={() => dispatch(cleanUsersToOrder())}
          >
            Limpar seleções
          </Button>
        </Box>
        <DataGrid
          autoHeight
          onRowClick={(data) => {
            if (usersToOrder.includes(data.id as string)) {
              dispatch(removeUserToOrder(data.id as string));
            } else {
              dispatch(setUserToOrder(data.id as string));
            }
          }}
          columns={[
            {
              field: "id",
              headerName: "Selecionado",
              valueGetter: (id) => {
                const value = usersToOrder.includes(id) ? "✅" : "";
                return value;
              },
            },
            { field: "name", headerName: "Nome", minWidth: 200 },
            { field: "email", headerName: "Email", minWidth: 200 },
            { field: "phone_number", headerName: "Telefone", minWidth: 200 },
            { field: "latitude", headerName: "Latitude", minWidth: 200 },
            { field: "longitude", headerName: "longitude", minWidth: 200 },
          ]}
          rows={filteredList.length > 0 ? filteredList : allUsers}
          sx={{
            height: "300px",
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
          rowSelection
        />
      </Box>
    </Box>
  );
}
