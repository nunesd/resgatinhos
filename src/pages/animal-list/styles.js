import { TableCell, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TableContainer = styled("div")``;

export const Header = styled("div")`
  display: flex;
`;

export const Container = styled("div")`
  flex-direction: column;
  flex: 1;

  a {
    text-decoration: none;
  }
`;

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
}));
