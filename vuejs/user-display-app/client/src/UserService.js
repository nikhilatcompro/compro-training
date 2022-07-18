import axios from 'axios';

const url = 'http://localhost:9001/users';
class UserService {
  // get users
  static getUsers () {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // get single use
  static getUser (id) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}/${id}`, id);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // create user
  static createUser (user) {
    return axios.post(url, user);
  }

  // update user
  static updateUser (id, editedValues) {
    return axios.patch(`${url}/${id}`, editedValues);
  }

  // delete user
  static deleteUser (id) {
    return axios.delete(`${url}/${id}`, id);
  }
}

export default UserService;
