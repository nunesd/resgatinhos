import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Grid as MaterialGrid,
  Select,
  MenuItem,
  FormControl as MaterialFormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import MainBody from "../../components/MainBody";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import api from "../../api";
import Add from "@mui/icons-material/Add";

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
  const [adopters, setAdopters] = useState([]);
  const [animalSelected, setAnimalSelected] = useState();
  const [adopterSelected, setAdopterSelected] = useState();
  const [date, setDate] = useState(new Date());

  const handleAnimalSelected = ({ target: { value } }) => {
    setAnimalSelected(value);
  };

  const handleAdopterSelected = ({ target: { value } }) => {
    setAdopterSelected(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    api(`/adoption/animal/${animalSelected}/adopter/${adopterSelected}`, {
      method: "POST",
      body: JSON.stringify({
        animalStatus: data.get("animalStatus"),
        animalNewName: data.get("animalNewName"),
        adoptionDate: date.toLocaleDateString(),
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
    const getAdopters = async () => {
      await api("/adopter", {})
        .then((data) => data.json())
        .then((data) => {
          setAdopters(data);
        });
    };

    getAnimals();
    getAdopters();
  }, []);

  return (
    <MainBody title="Cadastro de Adoção">
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
            <InputLabel id="demo-simple-select-helper-label">
              Adotante
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={adopterSelected}
              label="Adotante"
              onChange={handleAdopterSelected}
            >
              {adopters.map((adopter) => (
                <MenuItem key={adopter.id} value={adopter.id}>
                  {adopter.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            name="animalNewName"
            label="Novo nome"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="dd/MM/yyyy"
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
            label="Status"
            name="animalStatus"
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
