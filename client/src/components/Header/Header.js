import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import * as UsersAction from '../../actions/User/Users';
import { connect } from 'react-redux';
import Auth from '../Auth/Auth';
import Box from '@material-ui/core/Box';
import './Header.scss';
import StyledLink from '../styled/StyledLink';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDrawer: false,
      isOpenDrawerAdmin: false
    };
  }

  render() {
    const { openWindowAuth, signOut } = this.props;
    const { isAuthorization } = this.props.Users;
    return (
      <AppBar position="static">
        <Toolbar>
          <StyledLink className={'admin-btn'} to={'/'} color="inherit">
            <Typography variant="h6">Home</Typography>
          </StyledLink>
          <Box className={'header-main-block'} display="flex" justifyContent="flex-end" m={1}>
            {isAuthorization ? (
              <Box>
                <Button onClick={signOut} color="inherit">
                  Sign Out
                </Button>
              </Box>
            ) : (
              <Box>
                <Button onClick={openWindowAuth} color="inherit">
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
        <Auth />
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return { Users: state.Users };
}

function mapDispatchToProps(dispatch) {
  return {
    openWindowAuth: bindActionCreators(UsersAction.openWindowAuth, dispatch),
    signOut: bindActionCreators(UsersAction.signOut, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
