import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GeneralStateContext, ModalContext } from '../../App';
import api from '../../api';

const theme = createTheme({});

const Login = () => {
  const { setGeneralState } = useContext(GeneralStateContext);
  const { setModalState } = useContext(ModalContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    api('/login', {
      method: 'POST',
      body: JSON.stringify({
        username: data.get('email'),
        password: data.get('password'),
      }),
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error('Login error');
        }
        return data.json();
      })
      .then(() => {
        setGeneralState({ logged: true });
      })
      .catch(() => {
        setGeneralState({ logged: false });
        setModalState({
          isOpen: true,
          title: 'Erro ao fazer login!',
          description:
            'Revise os dados enviados ou entre em contato com o admin',
        });
        //TODO: modal de erro no login
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Resgatinhos
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
