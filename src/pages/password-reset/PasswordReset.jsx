import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"

// hook
import useMediaQueries from "../../hooks/useMediaQueries"
import useSetInputClass from "../../hooks/useSetInputClass"
import useResetPassword from "../../hooks/api/auth/useResetPassword"
import useVerifyPasswordToken from "../../hooks/api/auth/useVerifyPasswordToken"

// component
import SubmitFormButton from "../../components/buttons/SubmitFormButton"

const PasswordReset = () => {
  const {isMobile, isDesktop} = useMediaQueries()
  const {setInputClass} = useSetInputClass()
  const {resetPassword} = useResetPassword()
  const {verifyPasswordToken} = useVerifyPasswordToken()
  const navigate = useNavigate()

  // local state
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const resetPasswordWrapper = classNames('flex flex-col justify-center mx-3', {
    'h-custom-nav80': isDesktop,
    'h-custom-nav64': isMobile
  })

  // access url params (password reset link) to extract variables
  const params = new URLSearchParams(window.location.search)
  let data = {
    token: params.get('token'),
    uuid: params.get('uuid')
  }

  useEffect(() => {
    const validateToken = async () => {
      // redirect user to forgot-password if the token param is not present in the URL
      if (!data.token) return navigate('/forgot-password')

      await verifyPasswordToken(data)
    }

    validateToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await resetPassword({
      ...data, 
      password: password, 
      confirmPassword: confirmPassword
    }) // call the resetPassword fn with data object complimented with password and confirmPassword
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
