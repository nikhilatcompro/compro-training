import axios from 'axios';

const url = 'https://1ltknpoty1.execute-api.ap-south-1.amazonaws.com/prod/users/';
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
        const res = await axios.get(`${url}${id}`, id);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // create user
  static createUser (user) {
    user = JSON.stringify(user);
    return axios.post(url, user).catch(error => console.log(error));
  }

  // update user
  static updateUser (id, editedValues) {
    // editedValues = JSON.stringify(editedValues);
    console.log(id, editedValues);
    return axios.patch(`${url}${id}`, editedValues).catch(error => console.log(error));
  }

  // delete user
  static deleteUser (id) {
    console.log(id);
    return axios.delete(`${url}${id}`).catch(error => console.log(error));
  }
}

export default UserService;
