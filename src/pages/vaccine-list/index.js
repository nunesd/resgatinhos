import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  OutlinedInput,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import { TableContainer, Container, StyledTableCell, Header } from './styles';
import MainBody from '../../components/MainBody';
import NoContent from '../../components/NoContent';
import api from '../../api';

const Vaccines = () => {
  // const { setModalState } = useContext(ModalContext);

  const [vaccines, setVaccines] = useState([]);
  const [allVaccines, setAllVaccines] = useState([]);
  const [filterText, setFilterText] = useState('');

  const onFilter = ({ target: { value: name } }) => {
    setFilterText(name);
    if (!name) {
      setVaccines(allVaccines);
      return;
    }
    setVaccines(
      allVaccines.filter((item) =>
        item.vaccineName.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  // const onDelete = (id) => () => {
  //   api(`/vaccine/${id}`, { method: 'DELETE' }).then((data) => {
  //     if (!data.ok) {
  //       setModalState({
  //         isOpen: true,
  //         title: 'Erro ao deletar vacina!',
  //         description:
  //           'Revise os dados enviados ou entre em contato com o admin',
  //       });
  //       return;
  //     }

  //     setModalState({
  //       isOpen: true,
  //       title: 'Vacina deletada',
  //       description: 'Vacina deletada com sucesso!',
  //       refresh: true,
  //     });
  //   });
  // };

  useEffect(() => {
    api('/vaccine')
      .then((data) => data.json())
      .then((data) => {
        setVaccines(data);
        setAllVaccines(data);
      });
  }, []);

  return (
    <MainBody title="Vacinas">
      <Container>
        <Header>
          <FormControl fullWidth sx={{ p: 0.1, mb: 3, display: 'flex' }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Procurar vacinas
            </InputLabel>
            <OutlinedInput
              label="Procurar vacinas"
              value={filterText}
              onChange={onFilter}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Link as={Link} to="/add/vaccine">
            <Button
              sx={{ ml: 0.5, width: '100px', height: '56px' }}
              variant="contained"
            >
              Criar
              <Add />
            </Button>
          </Link>
        </Header>
        <TableContainer>
          {allVaccines?.length === 0 ? (
            <NoContent />
          ) : (
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                  {/* <TableCell padding="checkbox" /> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {vaccines.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.vaccineName}</TableCell>

                    {/* <TableCell padding="checkbox">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      as={Link}
                      to="/1"
                    >
                      <OpenInNew />
                    </IconButton>
                  </TableCell> */}
                    {/* <TableCell sx={{ display: "flex" }}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={onDelete(row.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell> */}
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

export default Vaccines;
