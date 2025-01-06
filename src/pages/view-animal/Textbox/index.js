import React from 'react';
import { Typography } from '@mui/material';
import { Container } from './styles';

const Texbox = ({ title, description }) => {
  return (
    <Container>
      <Typography
        component="h3"
        variant="h8"
        color="inherit"
        noWrap
        sx={{ fontSize: '16px' }}
      >
        {title}
      </Typography>
      <Typography color="inherit" sx={{ paddingLeft: 3 }}>
        {description}
      </Typography>
    </Container>
  );
};

export default Texbox;
