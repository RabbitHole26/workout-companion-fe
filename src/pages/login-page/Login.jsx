import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"
import classNames from "classnames"

// reducer
import { set_login_email, set_login_password } from "../../store/slices/forms/loginFormSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useSetInputClass from "../../hooks/useSetInputClass"
import useLogin from "../../hooks/api/auth/useLogin"

// component
import SubmitFormButton from "../../components/buttons/SubmitFormButton"


const Login = () => {
  const dispatch = useDispatch()
  const {loginForm} = useStateSelectors()
  const {login} = useLogin()
  const {setInputClass} = useSetInputClass()

  const loginWrapper = classNames('flex flex-col justify-center', {
    'h-custom-max-desktop-mobile-lg': !isMobile,
    'h-custom-max-mobile lg:h-custom-max-desktop-mobile-lg': isMobile
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
  }

  return (
    <div className={loginWrapper}>
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl">Log in</h2>
      </div>
      <form 
        className="mx-3 flex flex-col"
        onSubmit={handleSubmit}
      >
        {/* EMAIL */}
        <div className="flex flex-col">
          <label className="m-2">Email:</label>
          <input 
            className={setInputClass('email')}
            type="text"
            // placeholder="email"
            onChange={e => dispatch(set_login_email(e.target.value))}
            value={loginForm.email}
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col">
          <label className="m-2">Password:</label>
          <input 
            className={setInputClass('password')}
            type="password"
            // placeholder="Password"
            onChange={e => dispatch(set_login_password(e.target.value))}
            value={loginForm.password}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-12 mb-5">
          <SubmitFormButton label='Log in' />
        </div>
      </form>
    </div>
  )
}

export default Login
