import axios from 'axios';
import {LOCAL_IP} from 'react-native-dotenv';
import {Platform} from 'react-native';

const DEV_SERVER_URL = Platform.OS === 'android'
  ? LOCAL_IP
  : 'localhost';

export default {
   handleLogin: function (accessToken) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/tips/${accessToken}`)
  },
  searchYelp: function(location, categories) {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/recommendations/`, {location, categories})
  },
  getAllUsers: function() {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user`)
  },
  createUser: function() {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/user/new`)
  },
  findUserById: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}`)
  },
  addUserPreference: function(id, categoryid) {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/user/${id}/category/${categoryid}`)
  },
  removeUserPreference: function(id, categoryid) {
    return axios.delete(`http://${DEV_SERVER_URL}:8000/api/user/${id}/category/${categoryid}`)
  }
}