import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MainBody from "../../components/MainBody";
import OutlinedInput from "@mui/material/OutlinedInput";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import Search from "@mui/icons-material/Search";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { TableContainer, Container, StyledTableCell } from "./styles";

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

const Vaccines = () => {
  const handleChange = () => {};

  return (
    <MainBody title="Vacina">
      <Container>
        <FormControl fullWidth sx={{ p: 0.1, mb: 3 }}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </MainBody>
  );
};

export default Vaccines;
