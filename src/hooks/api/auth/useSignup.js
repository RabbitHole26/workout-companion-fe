import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// reducer
import { 
  set_app_error,
  set_app_success,
  set_app_loading
} from "../../../store/slices/appSlice"
import {
  set_signup_username,
  set_signup_email,
  set_signup_password,
  set_signup_confirm_password
} from "../../../store/slices/forms/signupFormSlice"
import { set_access_token, set_user_data } from "../../../store/slices/authSlice"

// hook
import useStateSelectors from "../../useStateSelectors"

// model
import User from "../../../models/userModel"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useSignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {signupForm} = useStateSelectors()

  const signup = async () => {
    // dispatch(set_error(null))
    dispatch(set_app_loading(true))

    try {
      const res = await axios.post('/auth/signup', new User(
        signupForm.username,
        signupForm.email,
        signupForm.password,
        signupForm.confirmPassword
      ))

      printLogInDevMode('signupRes', res)

      if (res.status === 201) {
        dispatch(set_access_token(res.data.accessToken))
        dispatch(set_user_data({
          username: res.data.username,
          avatarUrl: res.data.avatarUrl
        }))
        dispatch(set_signup_username(''))
        dispatch(set_signup_email(''))
        dispatch(set_signup_password(''))
        dispatch(set_signup_confirm_password(''))
        dispatch(set_app_error(null))
        dispatch(set_app_success('Account created!'))
        navigate('/')
      }
    } catch (error) {
      printLogInDevMode('signupErr: ', error)
      const errorMessage = error.response.data.error 
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_app_loading(false))
    }
  }

  return {signup}
}

export default useSignup
