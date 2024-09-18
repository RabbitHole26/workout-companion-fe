import { useDispatch } from "react-redux"
import axios from "axios"

// reducer
import { set_access_token } from "../../../store/slices/authSlice"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"


const useRefreshToken = () => {
  const dispatch = useDispatch()

  const refreshToken = async () => {
    try {
      const res = await axios.get('/auth/refresh-token')

      printLogInDevMode('refreshTokenRes: ', res)

      const newAccessToken = res.data.accessToken

      if (res.status === 201) {
        dispatch(set_access_token(newAccessToken))
      }

      return newAccessToken
    } catch (error) {
      printLogInDevMode('refreshTokenErr: ', error)
    }
  }

  return {
    refreshToken
  }
}

export default useRefreshToken
