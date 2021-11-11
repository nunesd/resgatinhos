import React from "react";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Grid as MaterialGrid,
} from "@mui/material";
import MainBody from "../../components/MainBody";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const AddressForm = () => {
  const handleChange = () => {};
  return (
    <MainBody title="Cadastro de Vacina">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">
              Nome da vacina
            </InputLabel>
            <OutlinedInput
              label="Nome da vacina"
              value=""
              onChange={handleChange("amount")}
            />
          </FormControl>
        </Grid>
      </Grid>
    </MainBody>
  );
};

export default AddressForm;
