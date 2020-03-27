import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import { RemoveRedEye, VisibilityOff } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import './LogIn.scss';
import { bindActionCreators } from 'redux';
import * as UsersAction from '../../../actions/Users';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        login: '',
        password: ''
      },
      passwordIsMasked: true
    };
  }

  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { formData } = this.state;
    const { loginInSystem } = this.props;
    loginInSystem(formData);
  };
  togglePasswordMask = () => {
    if (this.state.formData.password)
      this.setState(prevState => ({
        passwordIsMasked: !prevState.passwordIsMasked
      }));
  };

  render() {
    const { handleSubmit, handleChange, togglePasswordMask } = this;
    const { formData, passwordIsMasked } = this.state;
    const { loading, error } = this.props.Users;
    return (
      <div>
        <DialogTitle id="auth-dialog">Log In</DialogTitle>
        <ValidatorForm ref="form" onSubmit={handleSubmit} onError={errors => console.log(errors)}>
          <TextValidator
            margin="normal"
            label="Login"
            onChange={handleChange}
            name="login"
            fullWidth
            value={formData.login}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <TextValidator
            type={passwordIsMasked ? 'password' : 'text'}
            margin="normal"
            label="Password"
            onChange={handleChange}
            name="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            validators={['required']}
            errorMessages={['This field is required']}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={togglePasswordMask}
                  className="passwordIsMasked"
                >
                  {passwordIsMasked ? <RemoveRedEye /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />
          <Box mt={2} mb={2}>
            <Button disabled={!loading} type="submit" fullWidth variant="contained" color="primary">
              Log In
            </Button>
          </Box>
          {_.isString(error) && error.length > 0 && (
            <Typography className="other-account" variant="body2">
              {error}
            </Typography>
          )}
        </ValidatorForm>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { Users: state.Users };
}

function mapDispatchToProps(dispatch) {
  return {
    loginInSystem: bindActionCreators(UsersAction.loginInSystem, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
