import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AccessDenied from '../AccessDenied/AccessDenied';

class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuthorization } = this.props.Users;
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthorization ? <Component {...props} /> : <AccessDenied />;
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return { Users: state.Users };
}

export default connect(mapStateToProps, null)(PrivateRoute);
