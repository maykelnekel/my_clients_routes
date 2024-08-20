import React from "react";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { cleanOrderedUsers } from "@/libs/redux/slices/users/usersLists.slice";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";

export function OrderedUsersModal() {
  const dispatch = useAppDispatch();
  const { orderedUsers } = useAppSelector((state) => state.usersListsReducer);

  React.useEffect(() => {}, [orderedUsers]);
  return (
    <Modal
      open={orderedUsers.length > 0}
      onClose={() => dispatch(cleanOrderedUsers())}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <List
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 2,
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
          overflow: "auto",
          maxHeight: 500,
        }}
      >
        {orderedUsers.map((user, index) => {
          const userId = user.id;
          return (
            <ListItem
              key={userId}
              disablePadding
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "5px 0px",
                  gap: 5,
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: 24,
                  }}
                  primary={index++}
                  sx={{ fontWeight: "bold" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "flex-start",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <ListItemText primary={`Nome: ${user.name}`} />
                  <ListItemText primary={`Email: ${user.email}`} />
                  <ListItemText primary={`Telefone: ${user.phone_number}`} />
                </Box>
              </Box>
              <Divider orientation="horizontal" sx={{ width: "100%" }} />
            </ListItem>
          );
        })}
      </List>
    </Modal>
  );
}
