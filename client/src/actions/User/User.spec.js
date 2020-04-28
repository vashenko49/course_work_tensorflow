import * as USER_ACTION from './Users';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as USER from '../../config/Users';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User action', () => {
  describe('loginInSystem', () => {
    it('loginInSystem  all success', async () => {
      const token = 'token';
      const result = 'result';

      let mock = new MockAdapter(axios);

      mock.onPost('/api/user/login').reply(200, {
        token
      });
      mock.onGet('/api/user').reply(200, result);

      const expectedActions = [
        {
          type: USER.LOG_IN_API_REQUEST
        },
        {
          type: USER.LOG_IN_API_SUCCEEDED,
          payload: token
        },
        {
          type: USER.LOG_IN_API_GET_TOKEN_SUCCEEDED,
          payload: result
        }
      ];

      let store = mockStore({});

      return store.dispatch(USER_ACTION.loginInSystem({})).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    it('loginInSystem failed login', async () => {
      let mock = new MockAdapter(axios);
      mock.onPost('/api/user/login').reply(400);

      const expectedActions = [
        {
          type: USER.LOG_IN_API_REQUEST
        },
        {
          type: USER.LOG_IN_API_FAILED
        }
      ];

      let store = mockStore({});

      return store.dispatch(USER_ACTION.loginInSystem({})).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    it('loginInSystem failed getInformationByJWT', async () => {
      const token = 'token';

      let mock = new MockAdapter(axios);

      mock.onPost('/api/user/login').reply(200, {
        token
      });
      mock.onGet('/api/user').reply(400);

      const expectedActions = [
        {
          type: USER.LOG_IN_API_REQUEST
        },
        {
          type: USER.LOG_IN_API_SUCCEEDED,
          payload: token
        },
        {
          type: USER.LOG_IN_API_FAILED
        }
      ];

      let store = mockStore({});

      return store.dispatch(USER_ACTION.loginInSystem({})).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });

  describe('createUser', () => {
    it('createUser all success', async () => {
      const token = 'token';
      const result = 'result';

      let mock = new MockAdapter(axios);

      mock.onPost('/api/user').reply(200, {
        token
      });
      mock.onGet('/api/user').reply(200, result);

      const expectedActions = [
        {
          type: USER.LOG_IN_API_REQUEST
        },
        {
          type: USER.LOG_IN_API_SUCCEEDED,
          payload: token
        },
        {
          type: USER.LOG_IN_API_GET_TOKEN_SUCCEEDED,
          payload: result
        }
      ];

      let store = mockStore({});

      return store.dispatch(USER_ACTION.createUser({})).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    it('createUser createUser failed', async () => {
      let mock = new MockAdapter(axios);

      mock.onPost('/api/user').reply(400);

      const expectedActions = [
        {
          type: USER.LOG_IN_API_REQUEST
        },
        {
          type: USER.LOG_IN_API_FAILED
        }
      ];

      let store = mockStore({});

      return store.dispatch(USER_ACTION.createUser({})).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });

    it('createUser getInformationByJWT failed', async () => {
      const token = 'token';

      let mock = new MockAdapter(axios);

      mock.onPost('/api/user').reply(200, {
        token
      });
      mock.onGet('/api/user').reply(400);

      const expectedActions = [
        {
          type: USER.LOG_IN_API_REQUEST
        },
        {
          type: USER.LOG_IN_API_SUCCEEDED,
          payload: token
        },
        {
          type: USER.LOG_IN_API_FAILED
        }
      ];

      let store = mockStore({});

      return store.dispatch(USER_ACTION.createUser({})).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });

  describe('logInUseOldJWT', () => {
    it('logInUseOldJWT all success', async () => {
      const result = 'result';
      let mock = new MockAdapter(axios);

      mock.onGet('/api/user').reply(200, result);

      const expectedActions = [
        {
          type: USER.LOG_IN_API_GET_TOKEN_SUCCEEDED,
          payload: result
        }
      ];

      let store = mockStore({});

      return store.dispatch(USER_ACTION.logInUseOldJWT({})).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
    });
  });
  describe('openWindowAuth', () => {
    it('openWindowAuth all success', () => {
      const expectedActions = {
        type: USER.OPEN_WINDOW_AUTH
      };

      expect(USER_ACTION.openWindowAuth({})).toEqual(expectedActions);
    });
  });
  describe('closeWindowAuth', () => {
    it('closeWindowAuth all success', () => {
      const expectedActions = {
        type: USER.CLOSE_WINDOW_AUTH
      };

      expect(USER_ACTION.closeWindowAuth({})).toEqual(expectedActions);
    });
  });
  describe('resetError', () => {
    it('resetError all success', () => {
      const expectedActions = {
        type: USER.RESET_ERROR
      };

      expect(USER_ACTION.resetError()).toEqual(expectedActions);
    });
  });

  describe('signOut', () => {
    it('signOut all success', () => {
      const expectedActions = {
        type: USER.LOG_OUT
      };

      expect(USER_ACTION.signOut()).toEqual(expectedActions);
    });
  });
});
