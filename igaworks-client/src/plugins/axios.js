import Vue from "vue";
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.baseURL = 'http://15.164.162.135/api/';
axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios;

export default axios;