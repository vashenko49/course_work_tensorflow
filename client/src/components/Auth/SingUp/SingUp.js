import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import { RemoveRedEye, VisibilityOff } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import * as UsersAction from '../../../actions/Users';
import { connect } from 'react-redux';

class SingUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        password: '',
        repeatPassword: '',
        login: '',
        firstName: '',
        lastName: '',
        middleName: ''
      },
      passwordIsMasked: true,
      repeatPasswordIsMasked: true
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      const { formData } = this.state;
      return value === formData.password;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };
  toggleRepeatPasswordMask = () => {
    this.setState(prevState => ({
      repeatPasswordIsMasked: !prevState.repeatPasswordIsMasked
    }));
  };
  handleChange = event => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { formData } = this.state;
    const { createUser } = this.props;
    createUser(formData);
  };

  render() {
    const { togglePasswordMask, toggleRepeatPasswordMask, handleChange, handleSubmit } = this;
    const { formData, passwordIsMasked, repeatPasswordIsMasked } = this.state;
    return (
      <div>
        <DialogTitle id="auth-dialog">Sing Up</DialogTitle>
        <ValidatorForm ref="form" onSubmit={handleSubmit} onError={errors => console.log(errors)}>
          <TextValidator
            margin="normal"
            label="First name"
            onChange={handleChange}
            name="firstName"
            fullWidth
            value={formData.firstName}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <TextValidator
            margin="normal"
            label="Last name"
            onChange={handleChange}
            name="lastName"
            fullWidth
            value={formData.lastName}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
          />
          <TextValidator
            margin="normal"
            label="Middle name"
            onChange={handleChange}
            name="middleName"
            fullWidth
            value={formData.middleName}
            variant="outlined"
            validators={['required']}
            errorMessages={['This field is required']}
          />
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
                  className="password-eyes"
                >
                  {passwordIsMasked ? <RemoveRedEye /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />
          <TextValidator
            type={repeatPasswordIsMasked ? 'password' : 'text'}
            margin="normal"
            label="Repeat password"
            onChange={handleChange}
            name="repeatPassword"
            fullWidth
            variant="outlined"
            validators={['isPasswordMatch', 'required']}
            errorMessages={['Password mismatch', 'This field is required']}
            value={formData.repeatPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={toggleRepeatPasswordMask}
                  className="password-eyes"
                >
                  {repeatPasswordIsMasked ? <RemoveRedEye /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />
          <Box mt={1}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Box>
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
    createUser: bindActionCreators(UsersAction.createUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUp);
