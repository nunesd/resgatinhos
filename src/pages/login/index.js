import React, { useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GeneralStateContext } from "../../App";
import { Link as RouterLink } from "react-router-dom";
import api from "../../api";

const theme = createTheme({});

const Login = () => {
  const { setGeneralState } = useContext(GeneralStateContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("email"),
      password: data.get("password"),
    });

    api("/login", {
      method: "POST",
      body: JSON.stringify({
        username: data.get("email"),
        password: data.get("password"),
      }),
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error("Login error");
        }
        return data.json();
      })
      .then((data) => {
        setGeneralState({ logged: true });
      })
      .catch(() => {
        setGeneralState({ logged: false });
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/add/user" variant="body2">
                  Não tem conta? Crie uma!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
