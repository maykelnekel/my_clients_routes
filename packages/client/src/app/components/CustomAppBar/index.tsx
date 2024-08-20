import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export interface iMenuItem {
  text: string;
  icon: React.ElementType;
  onClick: VoidFunction;
}
export default function CustomAppBar() {
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="sticky" sx={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Atac - Rotas de usuáios
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
