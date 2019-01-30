import axios from 'axios';
import {LOCAL_IP} from 'react-native-dotenv';
import {Platform} from 'react-native';

const DEV_SERVER_URL = Platform.OS === 'android'
  ? LOCAL_IP
  : 'localhost';

export default {
  getUser: function (accessToken) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/tips/${accessToken}`)
  },
  getAllUsers: function() {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user`)
  },
  createUser: function() {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/user/new`)
  },
  findUserById: function() {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/:id`)
  },
  addUserPreference: function() {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/user/:id/category/:categoryid`)
  },
  removeUserPreference: function() {
    return axios.delete(`http://${DEV_SERVER_URL}:8000/api/user/:id/category/:categoryid`)
  }

}