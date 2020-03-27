import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import StyledLink from '../styled/StyledLink';

class HomePage extends Component {
  render() {
    return (
      <Container>
        <Typography variant={'h3'}>
          On this service you can find out if a person is sick or not with tuberculosis. Not a
          commercial version.
        </Typography>
        <StyledLink to={'analysis'}>
          <Typography variant={'body1'}>Analysis your fluorography -></Typography>
        </StyledLink>
      </Container>
    );
  }
}

export default HomePage;
