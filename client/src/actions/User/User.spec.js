import * as USER_ACTION from './Users';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as USER from '../../config/Users';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User action', () => {
  describe('loginInSystem', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('loginInSystem', async () => {
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
  });
});
