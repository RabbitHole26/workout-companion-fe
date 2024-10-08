import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

// reducer
import { set_app_error, set_app_loading, set_app_success } from "../../../store/slices/appSlice"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useVerifyPasswordToken = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const verifyPasswordToken = async (data) => {
    dispatch(set_app_loading(true))

    try {
      const res = await axios({
        url: '/auth/verify-password-token',
        method: 'post',
        data: data
      })

      printLogInDevMode('verifyPasswordTokenRes: ', res)

      if (res.status === 200) dispatch(set_app_success('Password reset link verified'))
    } catch (error) {
      printLogInDevMode('verifyPasswordTokenErr: ', error)
      const errorMessage = error.response.data.error
      dispatch(set_app_error(errorMessage))
      navigate('/forgot-password')
    } finally {
      dispatch(set_app_loading(false))
    }
  }

  return {verifyPasswordToken}
}

export default useVerifyPasswordToken
