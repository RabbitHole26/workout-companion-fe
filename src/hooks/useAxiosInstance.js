import axios from "axios"

// env
import { BASE_URL } from "../config/env"

// hook
import useRefreshToken from "./api/auth/useRefreshToken"

// util
import printLogInDevMode from "../utils/printLogInDevMode"

const useAxiosInstance = () => {
  const {refreshToken} = useRefreshToken()

  // create axios instance with its own config
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
  })

  // configure axios instance res interceptors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 403) {
        try {
          // generate new access token
          const newAccessToken = await refreshToken()
          printLogInDevMode('newAccessToken: ', newAccessToken)

          // set default headers for this instance
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`

          // clone original request
          const originalRequest = error.config
          printLogInDevMode('originalRequestHeaders: ', originalRequest.headers)

          // updated original request headers
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          printLogInDevMode('updatedOriginalRequestHeaders: ', originalRequest.headers)

          // return original request with updated headers
          return axios(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    }
  )

  return {axiosInstance}
}

export default useAxiosInstance
