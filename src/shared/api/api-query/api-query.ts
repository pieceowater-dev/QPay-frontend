import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ADDRESS,
})

const token = Cookies.get('token')
if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Cookies.remove('token')
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
