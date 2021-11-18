import React from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Grid as MaterialGrid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import MainBody from "../../components/MainBody";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const AddressForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = () => {};

  return (
    <MainBody title="Cadastro de Adotante">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Primeiro Nome"
            value=""
            onChange={handleChange("amount")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Ultimo Nome"
            value=""
            onChange={handleChange("amount")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="CPF"
            value=""
            onChange={handleChange("amount")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Nome de usuário"
            helperText="Nome no qual será usado para fazer o login"
            value=""
            onChange={handleChange("amount")}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            type="password"
            label="Senha"
            value=""
            onChange={handleChange("amount")}
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
            component={Link}
            to="/"
          >
            Criar
            <Add />
          </Button>
        </Grid>
      </Grid>
    </MainBody>
  );
};

export default AddressForm;
