import React from "react";
import { styled } from "@mui/material/styles";
import { TextField, Grid as MaterialGrid } from "@mui/material";
import MainBody from "../../components/MainBody";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const AddressForm = () => {
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
      </Grid>
    </MainBody>
  );
};

export default AddressForm;
