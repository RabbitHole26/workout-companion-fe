import { useDispatch } from "react-redux"
import axios from "axios"

// reducer
import { use_logout } from "../../../store/slices/authSlice"
import { set_app_success } from "../../../store/slices/appSlice"
import { set_exercise_array } from "../../../store/slices/exerciseSlice"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useLogout = () => {
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      const res = await axios.get('/auth/logout')

      printLogInDevMode('logoutRes: ', res)

      if (res.status === 204) {
        dispatch(use_logout())
        dispatch(set_exercise_array([]))
        dispatch(set_app_success(`You've logged out`))
      }
    } catch (error) {
      printLogInDevMode('logoutErr: ', error)
    }
  }

  return {logout}
}

export default useLogout
