import { useDispatch } from "react-redux"
import axios from "axios"

// reducer
import { set_access_token } from "../../../store/slices/authSlice"

// hook
import useLogout from "./useLogout"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useRefreshToken = () => {
  const dispatch = useDispatch()
  const {logout} = useLogout()

  const refreshToken = async () => {
    try {
      const res = await axios.get('/auth/refresh-token')

      printLogInDevMode('refreshTokenRes: ', res)

      const newAccessToken = res.data.newAccessToken

      if (res.status === 201) {
        dispatch(set_access_token(newAccessToken))
        return newAccessToken
      }
    } catch (error) {
      printLogInDevMode('refreshTokenErr: ', error)
      await logout() // logout the user if refresh token wasn't issued
    }
  }

  return {
    refreshToken
  }
}

export default useRefreshToken
