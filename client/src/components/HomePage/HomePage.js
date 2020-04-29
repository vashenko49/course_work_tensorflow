import React, { Component } from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import StyledLink from '../styled/StyledLink';
export class HomePage extends Component {
  render() {
    return (
      <Container>
        <Typography variant={'h3'}>
          Analysis of fluorograms for tuberculosis. Not a commercial version.
        </Typography>
        <StyledLink to={'analysis'}>
          <Typography variant={'body1'}>Analysis your fluorography -></Typography>
        </StyledLink>
      </Container>
    );
  }
}

export default HomePage;
