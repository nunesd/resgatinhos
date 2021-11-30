import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Grid as MaterialGrid,
  Select,
  MenuItem,
  FormControl as MaterialFormControl,
  InputLabel,
  Button,
  useMediaQuery,
  FormHelperText,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useTheme } from "@material-ui/core/styles";
import { Add } from "@mui/icons-material";
import MainBody from "../../components/MainBody";
import api from "../../api";
import { SCROLLBAR_OBJ } from "../../styles";
import { ModalContext } from "../../App";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const Form = styled(MaterialGrid)(({ theme }) => ({
  overflow: "auto",
  ...SCROLLBAR_OBJ,
}));

const FormControl = styled(MaterialFormControl)(({ theme }) => ({
  maxWidth: 400,
}));
const AddAdoption = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setModalState } = useContext(ModalContext);

  const [animals, setAnimals] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [animalSelected, setAnimalSelected] = useState();
  const [vaccineSelected, setVaccineSelected] = useState();
  const [date, setDate] = useState(new Date());

  const handleAnimalSelected = ({ target: { value } }) => {
    setAnimalSelected(value);
  };

  const handleVaccineSelected = ({ target: { value } }) => {
    setVaccineSelected(value);
  };

  const haveError = () => !animals.length || !vaccines.length;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api(`/vaccination/animal/${animalSelected}/vaccine/${vaccineSelected}`, {
      method: "POST",
      body: JSON.stringify({
        vetName: data.get("vetName"),
        informations: data.get("informations"),
        vaccineDate: date.toLocaleDateString(),
      }),
    })
      .then((data) => {
        if (!data.ok) {
          setModalState({
            isOpen: true,
            title: "Erro ao adicionar vacinação!",
            description:
              "Revise os dados enviados ou entre em contato com o admin",
          });
        }
      })
      .then((data) => {
        setModalState({
          isOpen: true,
          title: "Vacinação adicionada",
          description: "Vacinação adicionada com sucesso!",
          link: "/",
        });
      })
      .catch(() => {
        setModalState({
          isOpen: true,
          title: "Erro ao adicionar vacinação!",
          description:
            "Revise os dados enviados ou entre em contato com o admin",
        });
      });
  };

  useEffect(() => {
    const getAnimals = async () => {
      await api("/animal", {})
        .then((data) => data.json())
        .then((data) => {
          setAnimals(data);
        })
        .catch(() => {
          setAnimals([]);
        });
    };
    const getVaccines = async () => {
      await api("/vaccine", {})
        .then((data) => data.json())
        .then((data) => {
          setVaccines(data);
        })
        .catch(() => {
          setVaccines([]);
        });
    };

    getAnimals();
    getVaccines();
  }, []);

  return (
    <MainBody title="Cadastro de Vacinação">
      <Form container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth error={!animals.length}>
            <InputLabel id="demo-simple-select-helper-label">
              {!animals.length ? "Nenhum animal encontrado" : "Animal"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={animalSelected}
              label={!animals.length ? "Nenhum animal encontrado" : "Animal"}
              onChange={handleAnimalSelected}
            >
              {animals?.map((animal) => (
                <MenuItem key={animal.id} value={animal.id}>
                  {animal.name}
                </MenuItem>
              ))}
            </Select>
            {!Boolean(animals.length) && (
              <FormHelperText>
                Para criar uma vacinação, é preciso ter uma animal cadastrado
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth error={!vaccines.length}>
            <InputLabel id="demo-simple-select-helper-label">
              {!vaccines.length ? "Nenhuma vacina encontrada" : "Vacinas"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={vaccineSelected}
              label={!vaccines.length ? "Nenhuma vacina encontrada" : "Vacinas"}
              onChange={handleVaccineSelected}
            >
              {vaccines?.map((vaccine) => (
                <MenuItem key={vaccine.id} value={vaccine.id}>
                  {vaccine.vaccineName}
                </MenuItem>
              ))}
            </Select>
            {!Boolean(vaccines.length) && (
              <FormHelperText>
                Para criar uma vacinação, é preciso ter uma vacina cadastrado
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            name="vetName"
            label="Veterinário"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopDatePicker
            label="Data"
            inputFormat="dd/MM/yyyy"
            name="vaccineDate"
            value={date}
            onChange={(date) => {
              setDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            name="informations"
            label="Observações"
            multiline
            rows={4}
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
            disabled={haveError()}
          >
            Criar
            <Add />
          </Button>
        </Grid>
      </Form>
    </MainBody>
  );
};

export default AddAdoption;
