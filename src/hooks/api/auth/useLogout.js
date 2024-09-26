import { useDispatch } from "react-redux"

// reducer
import { use_logout } from "../../../store/slices/authSlice"
import { set_app_success } from "../../../store/slices/appSlice"
import { set_exercise_array } from "../../../store/slices/exerciseSlice"

// hook
import useAxiosInstance from "../../useAxiosInstance"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useLogout = () => {
  const dispatch = useDispatch()
  const {axiosInstance} = useAxiosInstance()

  const logout = async () => {
    try {
      const res = await axiosInstance({
        method: 'get',
        url: '/auth/logout'
      })

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
