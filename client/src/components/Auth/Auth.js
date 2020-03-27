import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UsersAction from '../../actions/Users';
import Dialog from '@material-ui/core/Dialog';
import { Paper } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LogIn from './LogIn/LogIn';
import SingUp from './SingUp/SingUp';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  setIndexTab = (event, newValue) => {
    this.setState({ index: newValue });
  };

  render() {
    const { setIndexTab } = this;
    const { index } = this.state;
    const { closeWindowAuth } = this.props;
    const { openWindowLogIn } = this.props.Users;
    return (
      <Dialog onClose={closeWindowAuth} aria-labelledby="auth-dialog" open={openWindowLogIn}>
        <Paper>
          <Tabs
            value={index}
            onChange={setIndexTab}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label={'Log In'} {...a11yProps(0)} />
            <Tab label={'Sign Up'} {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={index} index={0}>
            <LogIn />
          </TabPanel>
          <TabPanel value={index} index={1}>
            <SingUp />
          </TabPanel>
        </Paper>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return { Users: state.Users };
}

function mapDispatchToProps(dispatch) {
  return {
    closeWindowAuth: bindActionCreators(UsersAction.closeWindowAuth, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
