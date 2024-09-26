import axios from 'axios'
import Cookies from 'js-cookie'

const createAxiosInstance = async () => {
  const token = Cookies.get('token')

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ADDRESS,
  })

  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        Cookies.remove('token')
        window.location.replace('/')
      }
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

export const getAxiosInstance = async () => {
  return await createAxiosInstance()
}
