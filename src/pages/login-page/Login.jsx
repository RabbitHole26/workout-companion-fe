import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { set_login_email, set_login_password } from "../../store/slices/forms/loginFormSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useMediaQueries from "../../hooks/useMediaQueries"
import useSetInputClass from "../../hooks/useSetInputClass"
import useLogin from "../../hooks/api/auth/useLogin"

// component
import SubmitFormButton from "../../components/buttons/SubmitFormButton"
import PageLink from "../../components/page-link/PageLink"

const Login = () => {
  const dispatch = useDispatch()
  const {loginForm} = useStateSelectors()
  const {isMobile, isDesktop} = useMediaQueries()
  const {login} = useLogin()
  const {setInputClass} = useSetInputClass()

  const loginWrapper = classNames('flex flex-col justify-center', {
    'h-custom-nav80': isDesktop,
    'h-custom-nav64': isMobile
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login()
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
            onChange={e => dispatch(set_login_password(e.target.value))}
            value={loginForm.password}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex flex-col items-center gap-5 mt-12 mb-5">
          <SubmitFormButton label='Log in' />
          <PageLink to='/forgot-password' label='Forgot password' className='justify-normal' />
          <PageLink to='/signup' label='Sign up' className='justify-normal' />
        </div>
      </form>
    </div>
  )
}

export default Login
