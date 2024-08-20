"use client";
import CustomDrawer from "@/app/components/CustomDrawer/index";
import Box from "@mui/material/Box";
import CustomAppBar from "../../components/CustomAppBar/index";
import DrawerAppBar from "../../components/CustomAppBar/index";
import { FormUserCreation } from "../../components/FormUserCreation/index";

export default function Home(): JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <CustomDrawer screen="Criar novo usuário" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          width: "100%",
          // gap: 2,
          // padding: 2,
        }}
      >
        <CustomAppBar />
        <Box p={2}>
          <FormUserCreation />
        </Box>
      </Box>
    </Box>
  );
}
