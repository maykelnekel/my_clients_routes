import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";

export interface iMenuItem {
  text: string;
  icon: React.ElementType;
  onClick: VoidFunction;
}
export default function CustomDrawer({ screen }: { screen: string }) {
  const route = useRouter();

  const drawerWidth = 240;

  const menuList: iMenuItem[] = [
    {
      text: "Home",
      icon: HomeIcon,
      onClick: () => route.push("/"),
    },
    {
      text: "Criar novo usuário",
      icon: PersonAddIcon,
      onClick: () => route.push("/pages/create"),
    },
  ];

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <DrawerHeader sx={{ justifyContent: "center" }}>
        <Typography fontSize={20} fontWeight="bold">
          {screen}
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {menuList.map((menuItem) => (
          <ListItem key={menuItem.text} disablePadding>
            <ListItemButton onClick={menuItem.onClick}>
              <ListItemIcon>
                <menuItem.icon />
              </ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
