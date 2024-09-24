import { useState } from "react"
import { isMobile } from "react-device-detect"
import classNames from "classnames"

// hook
import useSetInputClass from "../../hooks/useSetInputClass"
import useResetPassword from "../../hooks/api/auth/useResetPassword"

// component
import SubmitFormButton from "../../components/buttons/SubmitFormButton"

const PasswordReset = () => {
  const {setInputClass} = useSetInputClass()
  const {resetPassword} = useResetPassword()

  // local state
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const resetPasswordWrapper = classNames('flex flex-col justify-center mx-3', {
    'h-custom-max-desktop-mobile-lg': !isMobile,
    'h-custom-max-mobile lg:h-custom-max-desktop-mobile-lg': isMobile
  })

  // access url params (password reset link) to extract variables
  const params = new URLSearchParams(window.location.search)
  const data = {
    token: params.get('token'),
    uuid: params.get('uuid'),
    password: password,
    confirmPassword: confirmPassword
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await resetPassword(data)
  }

  return (
    <div className={resetPasswordWrapper}>
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl">Reset password</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* PASSWORD */}
        <div className="flex flex-col">
          <label className="m-2">New password:</label>
          <input
            className={setInputClass('password')}
            type="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col">
          <label className="m-2">Confirm new password:</label>
          <input
            className={setInputClass('confirmPassword')}
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-12 mb-5">
          <SubmitFormButton label='Change password' />
        </div>
      </form>
    </div>
  )
}

export default PasswordReset
