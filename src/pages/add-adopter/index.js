import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  TextField,
  Grid as MaterialGrid,
  Button,
  useMediaQuery,
} from '@mui/material';
import MainBody from '../../components/MainBody';
import { useTheme } from '@material-ui/core';
import Add from '@mui/icons-material/Add';
import api from '../../api';
import { SCROLLBAR_OBJ } from '../../styles';
import { ModalContext } from '../../App';

const Grid = styled(MaterialGrid)(() => ({
  maxHeight: '200px',
}));

const Form = styled(MaterialGrid)(() => ({
  overflow: 'auto',
  ...SCROLLBAR_OBJ,
}));

const AddAdopter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { setModalState } = useContext(ModalContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api('/adopter', {
      method: 'POST',
      body: JSON.stringify({
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        cpf: data.get('cpf'),
        rg: data.get('rg'),
        phoneNumber: data.get('phoneNumber'),
        socialNetwork: data.get('socialNetwork'),
        info: data.get('info'),
      }),
    })
      .then((data) => {
        if (!data.ok) {
          setModalState({
            isOpen: true,
            title: 'Erro ao adicionar adotante!',
            description:
              'Revise os dados enviados ou entre em contato com o admin',
          });
        }
      })
      .then(() => {
        setModalState({
          isOpen: true,
          title: 'Adotante adicionado',
          description: 'Adotante adicionado com sucesso!',
          link: '/adopters',
        });
      })
      .catch(() => {
        setModalState({
          isOpen: true,
          title: 'Erro ao adicionar adotante!',
          description:
            'Revise os dados enviados ou entre em contato com o admin',
        });
      });
  };

  return (
    <MainBody title="Cadastro de Adotante">
      <Form container spacing={3} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Primeiro Nome"
            name="firstName"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Ultimo Nome"
            name="lastName"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Telefone"
            name="phoneNumber"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField variant="outlined" fullWidth label="RG" name="rg" />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField variant="outlined" fullWidth label="CPF" name="cpf" />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Midia Social"
            name="socialNetwork"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Informações relevantes"
            multiline
            rows={4}
            name="info"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            sx={{
              ml: 0.5,
              width: '100px',
              height: '56px',
              ...(isMobile && { width: '100%' }),
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

export default AddAdopter;
