import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import PeopleIcon from "@mui/icons-material/People";
import PetsIcon from "@mui/icons-material/Pets";
import ColorizeIcon from "@mui/icons-material/Colorize";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListSubheader inset>Listagens</ListSubheader>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <ListItemText primary="Animais" />
    </ListItem>
    <ListItem button component={Link} to="/vaccines">
      <ListItemIcon>
        <ColorizeIcon />
      </ListItemIcon>
      <ListItemText primary="Vacinas" />
    </ListItem>
    <ListItem button component={Link} to="/adopters">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Adotantes" />
    </ListItem>
    <ListItem button component={Link} to="/adoptions">
      <ListItemIcon>
        <EmojiPeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Adoções" />
    </ListItem>
    <ListItem button component={Link} to="/attendances">
      <ListItemIcon>
        <HealthAndSafetyIcon />
      </ListItemIcon>
      <ListItemText primary="Atendimentos" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Cadastros</ListSubheader>
    <ListItem button component={Link} to="/add/animal">
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <ListItemText primary="Animal" />
    </ListItem>
    <ListItem button component={Link} to="/add/vaccine">
      <ListItemIcon>
        <ColorizeIcon />
      </ListItemIcon>
      <ListItemText primary="Vacina" />
    </ListItem>
    <ListItem button component={Link} to="/add/vaccination">
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Vacinação" />
    </ListItem>
    <ListItem button component={Link} to="/add/adopter">
      <ListItemIcon>
        <GroupAddIcon />
      </ListItemIcon>
      <ListItemText primary="Adotante" />
    </ListItem>
    <ListItem button component={Link} to="/add/adoption">
      <ListItemIcon>
        <AddReactionIcon />
      </ListItemIcon>
      <ListItemText primary="Adoção" />
    </ListItem>
    <ListItem button component={Link} to="/add/attendance">
      <ListItemIcon>
        <HealthAndSafetyIcon />
      </ListItemIcon>
      <ListItemText primary="Atendimento" />
    </ListItem>
  </div>
);
