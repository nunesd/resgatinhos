import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Grid as MaterialGrid,
  Button,
  useMediaQuery,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import { Add } from "@mui/icons-material";
import MainBody from "../../components/MainBody";
import api from "../../api";
import { DesktopDatePicker } from "@mui/lab";
import { SCROLLBAR_OBJ } from "../../styles";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const Form = styled(MaterialGrid)(({ theme }) => ({
  overflow: "auto",
  ...SCROLLBAR_OBJ,
}));

const AddAnimal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [needAttendance, setNeedAttendance] = useState(false);
  const [isCastrated, setIsCastrated] = useState(false);
  const [rescueDate, setRescueDate] = useState(new Date());
  const [castrationDate, setCastrationDate] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api("/animal", {
      method: "POST",
      body: JSON.stringify({
        name: data.get("name"),
        age: data.get("age"),
        weight: data.get("weight"),
        rescueDate: rescueDate.toLocaleDateString(),
        needAttendance,
        attendanceDays: data.get("attendanceDays"),
        attendanceReason: data.get("attendanceReason"),
        isCastrated,
        castrationDate: castrationDate.toLocaleDateString(),
        vetName: data.get("vetName"),
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // setGeneralState({ logged: true });
      });
  };

  return (
    <MainBody title="Cadastro de Animal">
      <Form container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Nome"
            name="name"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Idade"
            name="age"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Peso"
            name="weight"
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopDatePicker
            label="Data de resgate"
            inputFormat="dd/MM/yyyy"
            value={rescueDate}
            onChange={(date) => {
              setRescueDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControlLabel
            checked={isCastrated}
            onChange={(e, checked) => {
              setIsCastrated(checked);
            }}
            control={<Switch defaultChecked />}
            label="é Castrado"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopDatePicker
            label="Data de castração"
            inputFormat="dd/MM/yyyy"
            value={castrationDate}
            disabled={!isCastrated}
            onChange={(date) => {
              setCastrationDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            disabled={!isCastrated}
            label="Veterinário que realizou a castração"
            name="vetName"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Avaliação inicial
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControlLabel
            checked={needAttendance}
            onChange={(e, checked) => {
              setNeedAttendance(checked);
            }}
            control={<Switch defaultChecked />}
            label="Precisou de atendimento médico"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            disabled={!needAttendance}
            label="Dias em atendimento"
            name="attendanceDays"
            required
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            disabled={!needAttendance}
            type="password"
            label="Motivo do atendimento"
            name="attendanceReason"
            required
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

export default AddAnimal;
