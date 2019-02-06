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
  searchYelp: function(id, location, categories) {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/recommendations/`, {id, location, categories})
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
  },
  getUserVisitedPlaces: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/visited`)
  },
  getUserSavedPlaces: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/saved`)
  },
  addUserVisitedPlace: function(id, locationId) {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/${locationId}`)
  },
  addUserSavedPlace: function(id, locationId) {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/${locationId}`)
  },
  deleteUserSavedPlace: function(id, locationId) {
    return axios.delete(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/${locationId}`)
  },
  deleteUserVisitedPlace: function(id, locationId) {
    return axios.delete(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/${locationId}`)
  }
}