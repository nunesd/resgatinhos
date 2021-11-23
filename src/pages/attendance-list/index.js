import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Button, FormControl, InputAdornment, InputLabel } from "@mui/material";
import Search from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";
import MainBody from "../../components/MainBody";
import { TableContainer, Container, StyledTableCell, Header } from "./styles";
import api from "../../api";
import NoContent from "../../components/NoContent";

const Attendances = () => {
  const [attendances, setAttendances] = useState([]);
  const [allAttendances, setAllAttendances] = useState();
  const [filterText, setFilterText] = useState("");

  const onFilter = ({ target: { value: name } }) => {
    setFilterText(name);
    if (!name) {
      setAttendances(allAttendances);
      return;
    }
    setAttendances(
      allAttendances?.filter((item) =>
        item.animal.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  useEffect(() => {
    api("/attendance", {})
      .then((data) => data.json())
      .then((data) => {
        setAttendances(data);
        setAllAttendances(data);
      });
  }, []);

  return (
    <MainBody title="Atendimentos">
      <Container>
        <Header>
          <FormControl fullWidth sx={{ p: 0.1, mb: 3, display: "flex" }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Procurar atendimentos
            </InputLabel>
            <OutlinedInput
              label="Procurar atendimentos"
              value={filterText}
              onChange={onFilter}
              disabled={allAttendances?.length === 0}
              placeholder={allAttendances?.length === 0 && "Bloqueado"}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Link as={Link} to="/add/attendance">
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
          {allAttendances?.length === 0 ? (
            <NoContent />
          ) : (
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                  <StyledTableCell>Veterinário</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendances.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.animal.name}</TableCell>
                    <TableCell>{row.vetName}</TableCell>
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

export default Attendances;
