import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  useMediaQuery,
  Grid as MaterialGrid,
  TextField,
} from "@mui/material";
import MainBody from "../../components/MainBody";
import { ModalContext } from "../../App";
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
  const { setModalState } = useContext(ModalContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api("/vaccine", {
      method: "POST",
      body: JSON.stringify({
        vaccineName: data.get("vaccineName"),
      }),
    })
      .then((data) => {
        if (!data.ok) {
          setModalState({
            isOpen: true,
            title: "Erro ao adicionar vacina!",
            description:
              "Revise os dados enviados ou entre em contato com o admin",
          });
        }
      })
      .then((data) => {
        setModalState({
          isOpen: true,
          title: "Vacina",
          description: "vacina adicionada com sucesso!",
          link: "/vaccines",
        });
      });
  };

  return (
    <MainBody title="Cadastro de Vacina">
      <Form container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
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
