import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { tUser, tUserList } from "../../../../../Shared/types/user.types";

export interface iCheckboxList {
  list: tUserList;
  checked: tUserList;
  selectHandle: (user: number) => void;
}
export default function CheckboxList({
  list,
  checked,
  selectHandle,
}: iCheckboxList) {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {list.map((value, index) => {
        return (
          <ListItem
            key={index}
            disablePadding
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={(event) => selectHandle(index)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ "aria-labelledby": value.id }}
              />
            }
          >
            <ListItemButton>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                disableRipple
                inputProps={{ "aria-labelledby": value.id }}
              />
              <ListItemText id={value.id} primary={value.name} />
              <ListItemText id={value.id} primary={value.phone_number} />
              <ListItemText id={value.id} primary={value.email} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
