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

  // use a plain variable instead of React state variable for immediate update and preventing race conditions
  // the purpose of the variable is to put subsequent refresh token calls on hold until the current call is completed
  let isRefreshing = false 

  // configure axios instance res interceptors
  axiosInstance.interceptors.response.use(
    response => response, // proceed with the response if there is no error
    async (error) => {
      if (error.response && error.response.status === 403) {
        if (!isRefreshing) {
          try {
            isRefreshing = true

            // generate new access token
            // refreshToken fn will logout the user if new refresh token wasn't obtained
            const newAccessToken = await refreshToken()
            printLogInDevMode('newAccessToken: ', newAccessToken)

            if (newAccessToken) {
              // set default authorization header for this axios instance
              axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
    
              // clone original request
              const originalRequest = error.config
              printLogInDevMode('originalRequestHeaders: ', originalRequest.headers)
    
              // updated original request headers
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
              printLogInDevMode('updatedOriginalRequestHeaders: ', originalRequest.headers)
    
              // return original request with updated headers
              return axios(originalRequest)
            }
          } catch (refreshError) {
            printLogInDevMode('refreshTokenInnerErr (try/catch block): ', refreshError)
          } finally {
            isRefreshing = false
          }
        }
      }
      printLogInDevMode('refreshTokenErr (if block): ', error)
      return Promise.reject(error)
    }
  )

  return {axiosInstance}
}

export default useAxiosInstance
