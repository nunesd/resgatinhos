import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import MainBody from "../../components/MainBody";
import { TableContainer, Container, StyledTableCell, Header } from "./styles";
import api from "../../api";
import NoContent from "../../components/NoContent";

const Adopters = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [adopters, setAdopters] = useState([]);
  const [allAdopters, setAllAdopters] = useState([]);
  const [filterText, setFilterText] = useState("");

  const onFilter = ({ target: { value: name } }) => {
    console.log(name);
    setFilterText(name);
    if (!name) {
      setAdopters(allAdopters);
      return;
    }
    setAdopters(
      allAdopters.filter((item) =>
        item.firstName.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  useEffect(() => {
    api("/adopter", {})
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setAdopters(data);
        setAllAdopters(data);
      });
  }, []);

  return (
    <MainBody title="Adotantes">
      <Container>
        <Header>
          <FormControl fullWidth sx={{ p: 0.1, mb: 3, display: "flex" }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Procurar adotantes
            </InputLabel>
            <OutlinedInput
              label="Procurar adotantes"
              value={filterText}
              onChange={onFilter}
              disabled={allAdopters?.length === 0}
              placeholder={allAdopters?.length === 0 && "Bloqueado"}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Link as={Link} to="/add/adopter">
            <Button
              sx={{ ml: 0.5, width: "100px", height: "56px" }}
              variant="contained"
            >
              Criar
              <Add />
            </Button>
          </Link>
        </Header>
        <TableContainer>
          {allAdopters?.length === 0 ? (
            <NoContent />
          ) : (
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                  {!isMobile && <StyledTableCell>Sobrenome</StyledTableCell>}
                  <StyledTableCell>Telefone</StyledTableCell>
                  <TableCell padding="checkbox" />
                </TableRow>
              </TableHead>
              <TableBody>
                {adopters.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.firstName}</TableCell>
                    {!isMobile && <TableCell>{row.lastName}</TableCell>}
                    <TableCell>{row.phoneNumber || "-"}</TableCell>

                    <TableCell sx={{ display: "flex" }}>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        as={Link}
                        to={`/edit/${row.id}`}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </MainBody>
  );
};

export default Adopters;
