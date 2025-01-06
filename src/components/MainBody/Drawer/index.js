import React from 'react';
import { Divider, IconButton, List, Toolbar, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../listItems';
import { StyledDrawer } from './styles';
import LogoSystem from '../../../assets/img/logo.jpeg';

const Drawer = ({ isOpen, toggleDrawer }) => {
  return (
    <StyledDrawer variant="permanent" open={isOpen}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, textAlign: 'center' }}
        >
          <img
            style={{ width: 150, height: 'auto', display: !isOpen && 'none  ' }}
            src={LogoSystem}
            alt="Logo Sistema"
          />
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>{mainListItems}</List>

      <Divider />
      <List>{secondaryListItems}</List>
    </StyledDrawer>
  );
};

export default Drawer;
