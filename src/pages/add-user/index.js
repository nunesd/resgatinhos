import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Grid as MaterialGrid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import { Add } from "@mui/icons-material";
import MainBody from "../../components/MainBody";
import api from "../../api";
import { Context } from "../../App";
import { SCROLLBAR_OBJ } from "../../styles";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const Form = styled(MaterialGrid)(({ theme }) => ({
  overflow: "auto",
  ...SCROLLBAR_OBJ,
}));

const AddUser = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setGeneralState } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api("/systemAdmin", {
      method: "POST",
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        cpf: data.get("cpf"),
        username: data.get("username"),
        password: data.get("password"),
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setGeneralState({ logged: true });
      });
  };

  return (
    <MainBody title="Cadastro de Usuário">
      <Form container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Primeiro Nome"
            name="firstName"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Ultimo Nome"
            name="lastName"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="CPF"
            name="cpf"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Nome de usuário"
            helperText="Nome no qual será usado para fazer o login"
            name="username"
            required
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            label="Senha"
            name="password"
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              ml: 0.5,
              width: "100px",
              height: "56px",
              ...(isMobile && { width: "100%" }),
            }}
            variant="contained"
            type="submit"
          >
            Criar
            <Add />
          </Button>
        </Grid>
      </Form>
    </MainBody>
  );
};

export default AddUser;
