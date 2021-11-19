import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useTheme } from "@material-ui/core/styles";
import { Add } from "@mui/icons-material";
import MainBody from "../../components/MainBody";
import api from "../../api";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const FormControl = styled(MaterialFormControl)(({ theme }) => ({
  maxWidth: 400,
}));
const AddAdoption = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
      .then((data) => data.json())
      .then((data) => {
        // setGeneralState({ logged: true });
      });
  };

  useEffect(() => {
    const getAnimals = async () => {
      await api("/animal", {})
        .then((data) => data.json())
        .then((data) => {
          setAnimals(data);
        });
    };
    const getVaccines = async () => {
      await api("/vaccine", {})
        .then((data) => data.json())
        .then((data) => {
          setVaccines(data);
        });
    };

    getAnimals();
    getVaccines();
  }, []);

  return (
    <MainBody title="Cadastro de Vacinação">
      <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Animal</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={animalSelected}
              label="Animal"
              onChange={handleAnimalSelected}
            >
              {animals.map((animal) => (
                <MenuItem key={animal.id} value={animal.id}>
                  {animal.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Vacina</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={vaccineSelected}
              label="Vacinas"
              onChange={handleVaccineSelected}
            >
              {vaccines.map((vaccine) => (
                <MenuItem key={vaccine.id} value={vaccine.id}>
                  {vaccine.vaccineName}
                </MenuItem>
              ))}
            </Select>
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
          >
            Criar
            <Add />
          </Button>
        </Grid>
      </Grid>
    </MainBody>
  );
};

export default AddAdoption;
