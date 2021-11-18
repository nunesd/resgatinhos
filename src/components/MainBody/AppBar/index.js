import React, { useContext } from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon, Logout } from "@mui/icons-material";
import { StyledAppBar } from "./styles";
import { Context } from "../../../App";

const Appbar = ({ isOpen, toggleDrawer, title }) => {
  const { setGeneralState } = useContext(Context);

  const logout = () => {
    setGeneralState({ logged: false });
  };

  return (
    <StyledAppBar position="absolute" open={isOpen}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(isOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={logout}
          sx={{
            float: "right",
          }}
        >
          <Logout />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Appbar;
