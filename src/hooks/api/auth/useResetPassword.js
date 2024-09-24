import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// reducer
import { set_app_error, set_app_loading, set_app_success } from "../../../store/slices/appSlice"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const resetPassword = async (data) => {
    dispatch(set_app_loading(true))
    
    try {
      const res = await axios({
        url: '/auth/password-reset',
        method: 'post',
        data: data
      })

      printLogInDevMode('resetPasswordRes: ', res)

      if (res.status === 204) {
        dispatch(set_app_error(null))
        dispatch(set_app_success('Password changed'))
        navigate('/login')
      }
    } catch (error) {
      printLogInDevMode('resetPasswordErr: ', error)
      const errorMessage = error.response.data.error
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_app_loading(false))
    }
  }

  return {resetPassword}
}

export default useResetPassword
