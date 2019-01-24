import axios from 'axios';
import {LOCAL_IP} from 'react-native-dotenv';
import {Platform} from 'react-native';

const DEV_SERVER_URL = Platform.OS === 'android'
  ? LOCAL_IP
  : 'localhost';

export default {
  getUser: function (accessToken) {
    return axios.get(`http://${DEV_SERVER_URL}:3000/api/tips/${accessToken}`)
  }
}