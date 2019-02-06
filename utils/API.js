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
  // find user by id - replace with tips controller to get user by Auth0 id
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
  // get saved places
  // Needs to be tested after below is fixed
  getUserSavedPlaces: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/saved`)
  },
  // save a place to a user's record (and add it to the places collection if new)
  // location is stored assuming we want to store Yelp location search string
  // THIS NEEDS TO BE FIXED - see notes in userController file
  addUserSavedPlace: function(id, location) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/saved/${location}`)
  },
  // remove saved place (and delete place from user's record if it hasVisited === false)
  // Needs to be tested after above is fixed
  removeUserSavedPlace: function(id, placeid) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/saved/${placeid}`)
  },
  // get visited places
  // Needs to be tested after below is fixed
  getUserVisitedPlaces: function(id) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/visited`)
  },
  // mark place visited in user's record (and add it to the places collection if new)
  // location is stored assuming we want to track the location search string
  addUserVisitedPlace: function(id, location) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/visited/${location}`)
  },
  removeUserVisitedPlace: function(id, placeid) {
    return axios.get(`http://${DEV_SERVER_URL}:8000/api/user/${id}/places/visited/${placeid}`)
  },
  // delete place from place collection -- for cleaning collection during testing
  // removal of place from user's record is embedded in methods to remove visited and saved flags above
  deletePlace: function(id) {
    return axios.put(`http://${DEV_SERVER_URL}:8000/api/place/${id}`)
  },
  getParentCategories: function() {
    return axios.get(`https://trek-tips.herokuapp.com/api/preferences`)
  },
  getChildCategories: function(parentAlias) {
    return axios.get(`https://trek-tips.herokuapp.com/api/preferences/${parentAlias}`)
  }
}