import { useDispatch } from "react-redux"
import axios from "axios"

// reducer
import { set_app_error, set_app_loading, set_app_success } from "../../../store/slices/appSlice"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useRequestPasswordReset = () => {
  const dispatch = useDispatch()

  const requestPasswordReset = async (email, setEmail) => {
    dispatch(set_app_loading(true))

    try {
      const res = await axios({
        url: '/auth/request-password-reset',
        method: 'post',
        data: {
          email: email
        }
      })

      printLogInDevMode('requestResetPasswordRes: ', res)

      if (res.status === 204) {
        dispatch(set_app_error(null))
        dispatch(set_app_success('Password reset link sent'))
        setEmail('PLEASE CHECK YOUR EMAIL')
        // document.querySelector('#forgotPasswordInput').value = ''
      } 
    } catch (error) {
      printLogInDevMode('requestResetPasswordErr: ', error)
      const errorMessage = error.response.data.error
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_app_loading(false))
    }
  }

  return {requestPasswordReset}
}

export default useRequestPasswordReset
