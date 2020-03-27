import axios from 'axios';

export default class UsersAPI {
  static createUser = userData => axios.post('/api/user', userData).then(value => value.data);
  static login = logInAndPassword =>
    axios.post('/api/user/login', logInAndPassword).then(value => value.data);
  static getInformationByJWT = () => axios.get('/api/user').then(value => value.data);
}
