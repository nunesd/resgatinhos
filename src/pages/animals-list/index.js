import React from "react";
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

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

const Animals = () => {
  const handleChange = () => {};

  return (
    <MainBody title="Animais">
      <Container>
        <Header>
          <FormControl fullWidth sx={{ p: 0.1, mb: 3, display: "flex" }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Procurar vacinas
            </InputLabel>
            <OutlinedInput
              label="Procurar vacinas"
              value=""
              onChange={handleChange("amount")}
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
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Ship To</StyledTableCell>
                <StyledTableCell>Payment Method</StyledTableCell>
                <StyledTableCell align="right">Sale Amount</StyledTableCell>
                <TableCell padding="checkbox" />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
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
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shipTo}</TableCell>
                  <TableCell>{row.paymentMethod}</TableCell>
                  <TableCell align="right">{`$${row.amount}`}</TableCell>

                  <TableCell sx={{ display: "flex" }}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      as={Link}
                      to={`/edit/${row.id}`}
                    >
                      <Edit />
                    </IconButton>
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
        </TableContainer>
      </Container>
    </MainBody>
  );
};

export default Animals;
