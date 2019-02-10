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
  // get all users
  getAllUsers: function() {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user`)
  },
  // create new user
  createUser: function() {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/user/new`)
  },
  // find user by id and populate with preferences
  findUserById: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}`)
  },
  // add user preference
  addUserPreference: function(id, categoryid) {
    return axios.post(`http://${DEV_SERVER_URL}:8000/api/user/${id}/category/${categoryid}`)
  },
  // delete user preference
  removeUserPreference: function(id, categoryid) {
    return axios.delete(`http://${DEV_SERVER_URL}:8000/api/user/${id}/category/${categoryid}`)
  },
  // get saved places and populate with place data
  getUserSavedPlaces: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/saved`)
  },
  // save a place to a user's record (and add it to the places collection if new)
  addUserSavedPlace: function(id, data) {
    return axios({
      url: `http://${DEV_SERVER_URL}:8000/api/user/${id}/places/saved`,
      method: 'post',
      data: data
    });
  },
  // remove saved place
  removeUserSavedPlace: function(id, placeid) {
    return axios.delete(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/saved/${placeid}`)
  },
  // get visited places
  getUserVisitedPlaces: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/visited`)
  },
  // mark place visited in user's record (and add it to the places collection if new)
  addUserVisitedPlace: function(id, data) {
    return axios({
      url: `http://${DEV_SERVER_URL}:8000/api/user/${id}/places/visited`,
      method: 'post',
      data: data
    });
  },
  // remove visited place
  removeUserVisitedPlace: function(id, placeid) {
    return axios.delete(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/visited/${placeid}`)
  },
  // delete place from place collection -- for cleaning collection during testing
  deletePlace: function(id) {
    return axios.put(`http://${DEV_SERVER_URL}:8000/api/place/${id}`)
  },
  getAllUserPlaces: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places`)
  },
  // get parent categories (yelp categories with no parent aliases defined)
  getParentCategories: function() {
    //return axios.get(`https://trek-tips.herokuapp.com/api/preferences`)
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/preferences`)
  },
  // get child categories classified under parent alias, e.g., arts, active, nightlife
  getChildCategories: function(parentAlias) {
    //return axios.get(`https://trek-tips.herokuapp.com/api/preferences/${parentAlias}`)
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/preferences/${parentAlias}`)
  }
}