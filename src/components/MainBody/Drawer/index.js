import React from "react";
import { Divider, IconButton, List, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems } from "../listItems";
import { StyledDrawer } from "./styles";

const Drawer = ({ isOpen, toggleDrawer }) => {
  return (
    <StyledDrawer variant="permanent" open={isOpen}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>{mainListItems}</List>
    </StyledDrawer>
  );
};

export default Drawer;
