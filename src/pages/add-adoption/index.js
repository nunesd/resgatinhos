import React, { useContext, useEffect, useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import MainBody from "../../components/MainBody";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import api from "../../api";
import Add from "@mui/icons-material/Add";
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

  const haveError = () => !animals.length || !adopters.length;

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
      .then((data) => {
        if (!data.ok) {
          setModalState({
            isOpen: true,
            title: "Erro ao adicionar adoção!",
            description:
              "Revise os dados enviados ou entre em contato com o admin",
          });
        }
      })
      .then((data) => {
        setModalState({
          isOpen: true,
          title: "Adotante adicionado",
          description: "Adotante adicionado com sucesso!",
          link: "/adopters",
        });
      })
      .catch(() => {
        setModalState({
          isOpen: true,
          title: "Erro ao adicionar adoção!",
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
    const getAdopters = async () => {
      await api("/adopter", {})
        .then((data) => data.json())
        .then((data) => {
          setAdopters(data);
        })
        .catch(() => {
          setAdopters([]);
        });
    };

    getAnimals();
    getAdopters();
  }, []);

  return (
    <MainBody title="Cadastro de Adoção">
      <Form container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth error={!animals.length}>
            <InputLabel id="demo-simple-select-helper-label">
              {!!animals.length ? "Nenhum animal encontrado" : "Animal"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={animalSelected}
              label={!animals.length ? "Nenhum animal encontrado" : "Animal"}
              onChange={handleAnimalSelected}
            >
              {animals.map((animal) => (
                <MenuItem key={animal.id} value={animal.id}>
                  {animal.name}
                </MenuItem>
              ))}
            </Select>
            {!Boolean(animals.length) && (
              <FormHelperText>
                Para criar uma adoção, é preciso ter uma animal cadastrado
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth error={!adopters.length}>
            <InputLabel id="demo-simple-select-helper-label">
              {!adopters.length ? "Nenhum adotante encontrado" : "Adotante"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={adopterSelected}
              label={
                !adopters.length ? "Nenhum adotante encontrado" : "Adotante"
              }
              onChange={handleAdopterSelected}
            >
              {adopters.map((adopter) => (
                <MenuItem key={adopter.id} value={adopter.id}>
                  {adopter.firstName}
                </MenuItem>
              ))}
            </Select>

            {!Boolean(adopters.length) && (
              <FormHelperText>
                Para criar uma adoção, é preciso ter uma adotante cadastrado
              </FormHelperText>
            )}
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
            label="Data"
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
