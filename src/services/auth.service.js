import axios from 'axios';

const API_URL = process.env.VUE_APP_BASE_URI;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/auth/' + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/users/' + 'add', {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
  
  getRandomUser() {
    return axios.get(API_URL + '/users').then(response => {
      return response.data
    }).catch(err=> {
      console.log(err)
      return null
    })
  }
}

export default new AuthService();