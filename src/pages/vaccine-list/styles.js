import { TableCell, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const TableContainer = styled("div")``;

export const Container = styled("div")`
  flex-direction: column;
  flex: 1;
`;

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
}));
