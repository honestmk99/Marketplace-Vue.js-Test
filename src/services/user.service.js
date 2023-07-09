import axios from 'axios';

const API_URL = process.env.VUE_APP_BASE_URI;

class UserService {
  getUser(id) {
    return axios.get(API_URL + `/users/` + id).then(response => {
      return response.data
    }).catch(err=> {
      console.log(err)
      return null
    })
  }
  
  updateUser(id, data) {
    return axios.put(API_URL + `/users/` + id, data).then(response => {
      return response.data
    }).catch(err=> {
      console.log(err)
      return null
    })
  }
}

export default new UserService();