import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Grid as MaterialGrid,
  FormControlLabel,
  Switch,
  Button,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import MainBody from "../../components/MainBody";
import api from "../../api";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const AddAttendance = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [animals, setAnimals] = useState([]);
  const [animalSelected, setAnimalSelected] = useState();
  const [needMedicalAppointment, setNeedMedicalAppointment] = useState(false);
  const [needSpecialistAttendance, setNeedSpecialistAttendance] =
    useState(false);

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

    getAnimals();
  }, []);

  const handleAnimalSelected = ({ target: { value } }) => {
    setAnimalSelected(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api(`/attendance/animal/${animalSelected}`, {
      method: "POST",
      body: JSON.stringify({
        vetName: data.get("vetName"),
        needMedicalAppointment: needMedicalAppointment,
        needSpecialistAttendance: needSpecialistAttendance,
        medicalAppointmentReason: data.get("medicalAppointmentReason"),
        specialistAttendanceReason: data.get("specialistAttendanceReason"),
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // setGeneralState({ logged: true });
      });
  };

  return (
    <MainBody title="Cadastro de Adotante">
      <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
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
              he
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
                Para criar um atendimento, é preciso ter uma animal cadastrado
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Nome do veterinário"
            name="vetName"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControlLabel
            checked={needMedicalAppointment}
            onChange={(e, checked) => {
              setNeedMedicalAppointment(checked);
            }}
            control={<Switch defaultChecked />}
            label="Precisou de atendimento médico"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Precisou de atendimento médico"
            name="medicalAppointmentReason"
            multiline
            rows={4}
            disabled={!needMedicalAppointment}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControlLabel
            checked={needSpecialistAttendance}
            onChange={(e, checked) => {
              setNeedSpecialistAttendance(checked);
            }}
            control={<Switch defaultChecked />}
            label="Precisou de atendimento com especialista"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Precisou de atendimento com especialista"
            name="specialistAttendanceReason"
            multiline
            rows={4}
            disabled={!needSpecialistAttendance}
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
            disabled={!animals.length}
          >
            Criar
            <Add />
          </Button>
        </Grid>
      </Grid>
    </MainBody>
  );
};

export default AddAttendance;
