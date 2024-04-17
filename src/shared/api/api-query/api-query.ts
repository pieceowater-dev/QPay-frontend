import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.144',
})

export default axiosInstance
