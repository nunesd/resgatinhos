import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  TextField,
  Grid as MaterialGrid,
  Button,
  useMediaQuery,
  FormControlLabel,
  Switch,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@material-ui/core/styles';
import { Add } from '@mui/icons-material';
import MainBody from '../../components/MainBody';
import api from '../../api';
import { DesktopDatePicker } from '@mui/lab';
import { SCROLLBAR_OBJ } from '../../styles';
import { useParams } from 'react-router';
import { DateTime } from 'luxon';

const Grid = styled(MaterialGrid)(() => ({
  maxHeight: '200px',
}));

const Form = styled(MaterialGrid)(() => ({
  overflow: 'auto',
  ...SCROLLBAR_OBJ,
}));

window.DateTime = DateTime;

const EditAnimal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  let { id } = useParams();

  const [animal, setAnimal] = useState({});
  const [needAttendance, setNeedAttendance] = useState(false);
  const [isCastrated, setIsCastrated] = useState(false);
  const [rescueDate, setRescueDate] = useState(null);
  const [castrationDate, setCastrationDate] = useState(null);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [vetName, setVetName] = useState();
  const [attendanceDays, setAttendanceDays] = useState();
  const [attendanceReason, setAttendanceReason] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api(`/animal/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: data.get('name'),
        age: data.get('age'),
        weight: data.get('weight'),
        rescueDate: rescueDate?.toLocaleString(),
        needAttendance,
        attendanceDays: data.get('attendanceDays'),
        attendanceReason: data.get('attendanceReason'),
        isCastrated,
        castrationDate: castrationDate?.toLocaleString(),
        vetName: data.get('vetName'),
      }),
    })
      .then((data) => data.json())
      .then(() => {
        // setGeneralState({ logged: true });
      });
  };

  useEffect(() => {
    const getAnimal = async () => {
      await api(`/animal/${id}`, {})
        .then((data) => data.json())
        .then((data) => {
          setAnimal(data);
          data.rescueDate &&
            setRescueDate(DateTime.fromFormat(data.rescueDate, 'dd/MM/yyyy'));
          data.castrationDate &&
            setCastrationDate(
              DateTime.fromFormat(data.castrationDate, 'dd/MM/yyyy')
            );
          data.isCastrated !== null && setIsCastrated(data.isCastrated);
          data.needAttendance !== null &&
            setNeedAttendance(data.needAttendance);
          setName(data.name);
          setAge(data.age);
          setWeight(data.weight);
          setVetName(data.setVetName);
        })
        .catch(() => {
          setAnimal({});
        });
    };

    getAnimal();
  }, [id]);

  return (
    <MainBody title="Cadastro de Animal">
      <Form container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            value={name}
            onChange={({ target: { value } }) => {
              setName(value);
            }}
            placeholder={animal?.name !== undefined && 'Carregando'}
            label="Nome"
            name="name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            value={age}
            onChange={({ target: { value } }) => {
              setAge(value);
            }}
            label="Idade"
            name="age"
            placeholder={animal?.age === undefined && 'Carregando'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            value={weight}
            onChange={({ target: { value } }) => {
              setWeight(value);
            }}
            label="Peso"
            name="weight"
            placeholder={animal?.weight === undefined && 'Carregando'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
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
        <Grid item xs={12}>
          <Typography
            component="h2"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Castração
          </Typography>
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
            value={vetName}
            onChange={(date) => {
              setCastrationDate(date);
            }}
            label="Veterinário que realizou a castração"
            name="vetName"
            placeholder={animal?.vetName === undefined && 'Carregando'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
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
            value={attendanceDays}
            onChange={(date) => {
              setAttendanceDays(date);
            }}
            placeholder={animal?.vetName === undefined && 'Carregando'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            required
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            disabled={!needAttendance}
            value={attendanceReason}
            onChange={(date) => {
              setAttendanceReason(date);
            }}
            type="password"
            label="Motivo do atendimento"
            name="attendanceReason"
            placeholder={animal?.vetName === undefined && 'Carregando'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            sx={{
              ml: 0.5,
              width: '120px',
              height: '56px',
              ...(isMobile && { width: '100%' }),
            }}
            variant="contained"
            type="submit"
          >
            Atualizar
            <Add />
          </Button>
        </Grid>
      </Form>
    </MainBody>
  );
};

export default EditAnimal;
