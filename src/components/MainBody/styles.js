import { styled } from '@mui/material/styles';
import MuiContainer from '@mui/material/Paper';

export const Container = styled(MuiContainer)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  margin: theme.spacing(2),
  height: 'calc(100% - 110px) ',
  overflow: 'hidden',
}));
