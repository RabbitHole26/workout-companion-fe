import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// hook
import useStateSelectors from "../../useStateSelectors"
import { 
  set_app_error, 
  set_app_success,
  set_app_loading
} from "../../../store/slices/appSlice"
import { set_user_data, set_access_token } from "../../../store/slices/authSlice"
import { set_login_email, set_login_password } from "../../../store/slices/forms/loginFormSlice"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loginForm} = useStateSelectors()

  const login = async () => {
    dispatch(set_app_loading(true))
    
    try {
      const res = await axios.post('/auth/login', {
        email: loginForm.email,
        password: loginForm.password
      })

      printLogInDevMode('loginRes: ', res)
  
      if (res.status === 200) {
        dispatch(set_user_data({
          username: res.data.username,
          avatarUrl: res.data.avatarUrl
        }))
        dispatch(set_access_token(res.data.accessToken))
        dispatch(set_login_email(''))
        dispatch(set_login_password(''))
        dispatch(set_app_error(null))
        dispatch(set_app_success(`You've logged in`))
        navigate('/')
      }
    } catch (error) {
      printLogInDevMode('loginErr: ', error)
      const errorMessage = error.response.data.error 
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_app_loading(false))
    }
  }

  return {login}
}

export default useLogin
