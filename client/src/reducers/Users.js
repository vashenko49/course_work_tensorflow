import * as USERS from '../config/Users';

const initialState = {
  loading: true,
  openWindowLogIn: false,
  isAuthorization: false,
  jwt: '',
  error: '',
  personalInfo: {
    _id: '',
    isAdmin: false,
    login: '',
    firstName: '',
    lastName: '',
    middleName: ''
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  // eslint-disable-next-line
    switch (type) {
    case USERS.LOG_IN_API_REQUEST:
    case USERS.UPDATE_PERSONAL_DATA_API_REQUEST:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case USERS.LOG_IN_API_SUCCEEDED:
      return {
        ...state,
        loading: true,
        jwt: payload,
        error: ''
      };
    case USERS.LOG_IN_API_FAILED:
      return {
        ...initialState,
        loading: true,
        openWindowLogIn: true,
        error: 'Failed to log in.'
      };
    case USERS.LOG_IN_API_GET_TOKEN_SUCCEEDED:
      return {
        ...state,
        openWindowLogIn: false,
        isAuthorization: true,
        personalInfo: payload
      };
    case USERS.OPEN_WINDOW_AUTH:
      return {
        ...state,
        openWindowLogIn: true
      };
    case USERS.CLOSE_WINDOW_AUTH:
      return {
        ...state,
        openWindowLogIn: false
      };
    case USERS.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
