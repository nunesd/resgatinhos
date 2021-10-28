import React from "react";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { StyledAppBar } from "./styles";

const Appbar = ({ isOpen, toggleDrawer, title }) => (
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
    </Toolbar>
  </StyledAppBar>
);

export default Appbar;
