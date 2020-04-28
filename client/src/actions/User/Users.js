import UsersAPI from '../../services/Users';
import * as USERS from '../../config/Users';
import setDefaultOptions from '../../utils/setDefaultOptions';

export function loginInSystem(userData) {
  return dispatch => {
    dispatch({
      type: USERS.LOG_IN_API_REQUEST
    });

    return UsersAPI.login(userData)
      .then(res => {
        const { token } = res;
        dispatch({
          type: USERS.LOG_IN_API_SUCCEEDED,
          payload: token
        });

        localStorage.setItem('Authorization', token);
        setDefaultOptions(token);

        return UsersAPI.getInformationByJWT()
          .then(res => {
            dispatch({
              type: USERS.LOG_IN_API_GET_TOKEN_SUCCEEDED,
              payload: res
            });
          })
          .catch(er => {
            throw er;
          });
      })
      .catch(() => {
        dispatch({
          type: USERS.LOG_IN_API_FAILED
        });
      });
  };
}

export function createUser(userData) {
  return dispatch => {
    dispatch({
      type: USERS.LOG_IN_API_REQUEST
    });

    return UsersAPI.createUser(userData)
      .then(res => {
        const { token } = res;
        dispatch({
          type: USERS.LOG_IN_API_SUCCEEDED,
          payload: token
        });

        localStorage.setItem('Authorization', token);
        setDefaultOptions(token);
        return UsersAPI.getInformationByJWT()
          .then(res => {
            dispatch({
              type: USERS.LOG_IN_API_GET_TOKEN_SUCCEEDED,
              payload: res
            });
          })
          .catch(e => {
            throw e;
          });
      })
      .catch(() => {
        dispatch({
          type: USERS.LOG_IN_API_FAILED
        });
      });
  };
}

export function logInUseOldJWT(JWT) {
  return dispatch => {
    setDefaultOptions(JWT);
    return UsersAPI.getInformationByJWT()
      .then(res => {
        return dispatch({
          type: USERS.LOG_IN_API_GET_TOKEN_SUCCEEDED,
          payload: res
        });
      })
      .catch(() => {
        setDefaultOptions();
      });
  };
}

export function openWindowAuth() {
  return {
    type: USERS.OPEN_WINDOW_AUTH
  };
}

export function closeWindowAuth() {
  return {
    type: USERS.CLOSE_WINDOW_AUTH
  };
}

export function resetError() {
  return {
    type: USERS.RESET_ERROR
  };
}

export function signOut() {
  localStorage.removeItem('Authorization');
  setDefaultOptions();
  return {
    type: USERS.LOG_OUT
  };
}
