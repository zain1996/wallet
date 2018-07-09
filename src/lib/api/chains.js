import axios from 'axios'
import config from 'config'

export default axios.create({
  baseURL: config.chainsURL,
  timeout: 10000,
  headers: {}
})
