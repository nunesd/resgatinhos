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
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import OpenInNew from "@mui/icons-material/OpenInNew";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import MainBody from "../../components/MainBody";
import { TableContainer, Container, StyledTableCell, Header } from "./styles";
import api from "../../api";
import NoContent from "../../components/NoContent";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [allAnimals, setAllAnimals] = useState();
  const [filterText, setFilterText] = useState("");

  const onFilter = ({ target: { value: name } }) => {
    console.log(name);
    setFilterText(name);
    if (!name) {
      setAnimals(allAnimals);
      return;
    }
    setAnimals(
      allAnimals?.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  useEffect(() => {
    api("/animal", {})
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setAnimals(data);
        setAllAnimals(data);
      });
  }, []);

  return (
    <MainBody title="Animais">
      <Container>
        <Header>
          <FormControl fullWidth sx={{ p: 0.1, mb: 3, display: "flex" }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Procurar animais
            </InputLabel>
            <OutlinedInput
              label="Procurar animais"
              value={filterText}
              onChange={onFilter}
              disabled={allAnimals?.length === 0}
              placeholder={allAnimals?.length === 0 && "Bloqueado"}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Link as={Link} to="/add/animal">
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
          {allAnimals?.length === 0 ? (
            <NoContent />
          ) : (
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <StyledTableCell>Nome</StyledTableCell>
                  <StyledTableCell>Data de resgate</StyledTableCell>
                  <StyledTableCell>Castrado</StyledTableCell>
                  <TableCell padding="checkbox" />
                </TableRow>
              </TableHead>
              <TableBody>
                {animals.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell padding="checkbox">
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        as={Link}
                        to="/1"
                      >
                        <OpenInNew />
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.rescueDate}</TableCell>
                    <TableCell>
                      {row.isCastrated === undefined
                        ? "-"
                        : row.isCastrated
                        ? "Sim"
                        : "Nâo"}
                    </TableCell>

                    <TableCell sx={{ display: "flex" }}>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        as={Link}
                        to={`/edit/animal/${row.id}`}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        as={Link}
                        to={`/edit/animal/${row.id}`}
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

export default Animals;