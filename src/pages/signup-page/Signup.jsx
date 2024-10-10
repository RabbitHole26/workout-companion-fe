import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { set_signup_username, set_signup_email, set_signup_password, set_signup_confirm_password } from "../../store/slices/forms/signupFormSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useMediaQueries from "../../hooks/useMediaQueries"
import useSetInputClass from "../../hooks/useSetInputClass"
import useSignup from "../../hooks/api/auth/useSignup"

// component
import SubmitFormButton from "../../components/buttons/SubmitFormButton"
import PageLink from "../../components/page-link/PageLink"

const Signup = () => {
  const dispatch = useDispatch()
  const {signupForm} = useStateSelectors()
  const {isMobile, isDesktop} = useMediaQueries()
  const {signup} = useSignup()
  const {setInputClass} = useSetInputClass()

  const signupWrapper = classNames('flex flex-col justify-center', {
    'h-custom-nav80': isDesktop,
    'h-custom-nav64': isMobile
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup()
  }

  return (
    <div className={signupWrapper}>
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl">Sign up</h2>
      </div>
      <form 
        className="mx-3 flex flex-col"
        onSubmit={handleSubmit}
      >
        {/* USERNAME */}
        <div className="flex flex-col">
          <label className="m-2">Username:</label>
          <input 
            className={setInputClass('username')}
            type="text"
            onChange={e => dispatch(set_signup_username(e.target.value))}
            value={signupForm.username}
          />
        </div>

        {/* EMAIL */}
        <div className="flex flex-col">
          <label className="m-2">Email:</label>
          <input 
            className={setInputClass('email')}
            type="text"
            onChange={e => dispatch(set_signup_email(e.target.value))}
            value={signupForm.email}
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col">
          <label className="m-2">Password:</label>
          <input 
            className={setInputClass('password')}
            type="password"
            onChange={e => dispatch(set_signup_password(e.target.value))}
            value={signupForm.password}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col">
          <label className="m-2">Confirm password:</label>
          <input 
            className={setInputClass('confirmPassword')}
            type="password"
            onChange={e => dispatch(set_signup_confirm_password(e.target.value))}
            value={signupForm.confirmPassword}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-12 mb-5">
          <SubmitFormButton label='Sign up' />
        </div>
      </form>

      <PageLink to='/login' label='Log in' />
    </div>
  )
}

export default Signup
