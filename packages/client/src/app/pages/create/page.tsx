"use client";
import Box from "@mui/material/Box";
import DrawerAppBar from "../../components/DrawerAppBar/index";
import { FormUserCreation } from "../../components/FormUserCreation/index";

export default function Home(): JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        minWidth: "100vw",
      }}
    >
      <DrawerAppBar screen="Criar usuário" />
      <FormUserCreation />
    </Box>
  );
}
