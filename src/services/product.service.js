import axios from 'axios';

const API_URL = process.env.VUE_APP_BASE_URI;

class ProductService {
  getAllProducts() {
    return axios.get(API_URL + '/products').then(response => {
      return response.data
    }).catch(err=> {
      console.log(err)
      return err
    })
  }
  
  getSingleProduct(id) {
    return axios.get(API_URL + '/products/' + id).then(response => {
      return response.data
    }).catch(err=> {
      console.log(err)
      return err
    })
  }

  getAllCategories() {
    return axios.get(API_URL + '/products/categories').then(response => {
      return response.data
    }).catch(err=> {
      console.log(err)
      return err
    })
  }
}

export default new ProductService();