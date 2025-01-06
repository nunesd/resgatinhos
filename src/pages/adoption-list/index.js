import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Search from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import MainBody from '../../components/MainBody';
import NoContent from '../../components/NoContent';
import { ModalContext } from '../../App';
import { TableContainer, Container, StyledTableCell, Header } from './styles';
import api from '../../api';

const Adoptions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { setModalState } = useContext(ModalContext);

  const [adoptions, setAdoptions] = useState([]);
  const [allAdoptions, setAllAdoptions] = useState();
  const [filterText, setFilterText] = useState('');

  const onFilter = ({ target: { value: name } }) => {
    setFilterText(name);
    if (!name) {
      setAdoptions(allAdoptions);
      return;
    }
    setAdoptions(
      allAdoptions?.filter((item) =>
        item.animalNewName.toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  // const onDelete = (id) => () => {
  //   api(`/adoption/${id}`, { method: 'DELETE' }).then((data) => {
  //     if (!data.ok) {
  //       setModalState({
  //         isOpen: true,
  //         title: 'Erro ao deletar adoção!',
  //         description:
  //           'Revise os dados enviados ou entre em contato com o admin',
  //       });
  //       return;
  //     }

  //     setModalState({
  //       isOpen: true,
  //       title: 'Adoção deletada',
  //       description: 'Adoção deletada com sucesso!',
  //       refresh: true,
  //     });
  //   });
  // };

  useEffect(() => {
    api('/adoption', {})
      .then((data) => data.json())
      .then((data) => {
        setAdoptions(data);
        setAllAdoptions(data);
      });
  }, []);

  return (
    <MainBody title="Adoções">
      <Container>
        <Header>
          <FormControl fullWidth sx={{ p: 0.1, mb: 3, display: 'flex' }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Procurar adoções
            </InputLabel>
            <OutlinedInput
              label="Procurar adoções"
              value={filterText}
              onChange={onFilter}
              disabled={allAdoptions?.length === 0}
              placeholder={allAdoptions?.length === 0 && 'Bloqueado'}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <Link as={Link} to="/add/adoption">
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
          {allAdoptions?.length === 0 ? (
            <NoContent />
          ) : (
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome do animal</StyledTableCell>
                  {!isMobile && <StyledTableCell>Adotante</StyledTableCell>}
                  <StyledTableCell>Telefone</StyledTableCell>
                  {/* <TableCell padding="checkbox" /> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {adoptions.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.animalNewName}</TableCell>
                    {!isMobile && (
                      <TableCell>{row.adopter?.firstName}</TableCell>
                    )}
                    <TableCell>{row.adopter.phoneNumber || '-'}</TableCell>

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

export default Adoptions;
