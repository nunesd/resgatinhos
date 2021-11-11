import React from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Grid as MaterialGrid,
  Select,
  MenuItem,
  FormControl as MaterialFormControl,
  InputLabel,
} from "@mui/material";
import MainBody from "../../components/MainBody";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const Grid = styled(MaterialGrid)(({ theme }) => ({
  maxHeight: "200px",
}));

const FormControl = styled(MaterialFormControl)(({ theme }) => ({
  maxWidth: 400,
}));

const AddAdoption = () => {
  const handleChange = () => {};
  return (
    <MainBody title="Cadastro de Adoção">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Animal</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={""}
              label="Animal"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Adotante
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={""}
              label="Adotante"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Novo nome"
            value=""
            onChange={handleChange("amount")}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="dd/MM/yyyy"
            value={new Date()}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TextField
            variant="outlined"
            fullWidth
            label="Status"
            value=""
            multiline
            rows={4}
            onChange={handleChange("amount")}
          />
        </Grid>
      </Grid>
    </MainBody>
  );
};

export default AddAdoption;
