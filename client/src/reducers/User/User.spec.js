import reducer, { initialState } from './Users';
import * as USER from '../../config/Users';
import expect from 'expect';

describe('User reducer', () => {
  it('LOG_IN_API_REQUEST', () => {
    const action = {
      type: USER.LOG_IN_API_REQUEST
    };

    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false
    });
  });

  it('LOG_IN_API_SUCCEEDED', () => {
    const preState = {
      ...initialState,
      loading: false
    };
    const action = {
      type: USER.LOG_IN_API_SUCCEEDED,
      payload: ''
    };
    expect(reducer(preState, action)).toEqual({
      ...initialState,
      loading: true,
      jwt: action.payload
    });
  });

  it('LOG_IN_API_FAILED', () => {
    const preState = {
      ...initialState,
      loading: false
    };

    const action = {
      type: USER.LOG_IN_API_FAILED
    };

    expect(reducer(preState, action)).toEqual({
      ...initialState,
      loading: true,
      openWindowLogIn: true,
      error: 'Failed to log in.'
    });
  });

  it('LOG_IN_API_GET_TOKEN_SUCCEEDED', () => {
    const preState = {
      ...initialState
    };

    const action = {
      type: USER.LOG_IN_API_GET_TOKEN_SUCCEEDED,
      payload: 1
    };

    expect(reducer(preState, action)).toEqual({
      ...initialState,
      openWindowLogIn: false,
      isAuthorization: true,
      personalInfo: 1
    });
  });

  it('OPEN_WINDOW_AUTH ', function() {
    const action = {
      type: USER.OPEN_WINDOW_AUTH
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      openWindowLogIn: true
    });
  });

  it('CLOSE_WINDOW_AUTH ', function() {
    const action = {
      type: USER.CLOSE_WINDOW_AUTH
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      openWindowLogIn: false
    });
  });

  it('LOG_OUT ', function() {
    const action = {
      type: USER.LOG_OUT
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState
    });
  });
});
