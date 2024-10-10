import { useState } from "react"
import classNames from "classnames"

// hook
import useMediaQueries from "../../hooks/useMediaQueries"
import useSetInputClass from "../../hooks/useSetInputClass"
import useRequestPasswordReset from "../../hooks/api/auth/useRequestPasswordReset"

// component
import SubmitFormButton from "../../components/buttons/SubmitFormButton"
import PageLink from "../../components/page-link/PageLink"

const ForgotPassword = () => {
  const {isMobile, isDesktop} = useMediaQueries()
  const {setInputClass} = useSetInputClass()
  const {requestPasswordReset} = useRequestPasswordReset()

  // local state
  const [email, setEmail] = useState('')

  const forgotPasswordWrapper = classNames('flex flex-col justify-center mx-3', {
    'h-custom-nav80': isDesktop,
    'h-custom-nav64 lg:h-custom-nav80': isMobile
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await requestPasswordReset(email, setEmail)
  }

  return (
    <div className={forgotPasswordWrapper}>
      <div className="flex flex-col items-center mb-6">
        {/* TITLE */}
        <h2 className="text-2xl">Request password reset link</h2>

        {/* INSTRUCTIONS PARAGRAPH */}
        <div className="text-center mt-6">
          <span>
            Please use already registered email address. If you haven&apos;t signed up yet, you can do so
          </span>{' '}
          <PageLink to='/signup' label='here' className='inline' />!
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div className="flex flex-col">
          <label className="m-2">Email:</label>
          <input
            id="forgotPasswordInput"
            className={setInputClass('email')}
            type="text"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-12 mb-5">
          <SubmitFormButton label='Send reset link' />
        </div>
      </form>

      <PageLink to='/login' label='Back to login' />
    </div>
  )
}

export default ForgotPassword
