import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
  Grid as MaterialGrid,
} from "@mui/material";
import MainBody from "../../components/MainBody";
import { Context } from "../../App";
import { useTheme } from "@material-ui/core/styles";
import api from "../../api";
import { Add } from "@mui/icons-material";
import { SCROLLBAR_OBJ } from "../../styles";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const Form = styled(MaterialGrid)(({ theme }) => ({
  overflow: "auto",
  ...SCROLLBAR_OBJ,
}));

const AddVaccine = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setGeneralState } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api("/vaccine", {
      method: "POST",
      body: JSON.stringify({
        vaccineName: data.get("vaccineName"),
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setGeneralState({ logged: true });
      });
  };

  return (
    <MainBody title="Cadastro de Vacina">
      <Form container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Nome da vacina
          </InputLabel>
          <OutlinedInput
            variant="outlined"
            required
            fullWidth
            label="Nome da Vacina"
            name="vaccineName"
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

export default AddVaccine;
