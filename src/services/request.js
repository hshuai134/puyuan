import axios from "axios"
import queryString from "query-string";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const request = {
  get: (url, params) => {
    const query = queryString.stringify(params);
    return axios.get(`${url}?${query}`)
  },
  post: (url, params) => {
    return axios.post(url, params)
  }
}

export default request