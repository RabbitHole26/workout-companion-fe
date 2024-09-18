import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"
import classNames from "classnames"

// reducer
import { set_signup_username, set_signup_email, set_signup_password, set_signup_confirm_password } from "../../store/slices/forms/signupFormSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useSetInputClass from "../../hooks/useSetInputClass"
import useSignup from "../../hooks/api/auth/useSignup"

// component
import SubmitFormButton from "../../components/buttons/SubmitFormButton"

const Signup = () => {
  const dispatch = useDispatch()
  const {signupForm} = useStateSelectors()
  const {signup} = useSignup()
  const {setInputClass} = useSetInputClass()

  const signupWrapper = classNames('flex flex-col justify-center', {
    'h-custom-max-desktop-mobile-lg': !isMobile,
    'h-custom-max-mobile lg:h-custom-max-desktop-mobile-lg': isMobile
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    signup()
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
            // placeholder="Username"
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
            // placeholder="Email"
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
            // placeholder="Password"
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
            // placeholder="Confirm password"
            onChange={e => dispatch(set_signup_confirm_password(e.target.value))}
            value={signupForm.confirmPassword}
          />
        </div>

        <div className="flex justify-center mt-12 mb-5">
          <SubmitFormButton label='Sign up' />
        </div>
      </form>
    </div>
  )
}

export default Signup
