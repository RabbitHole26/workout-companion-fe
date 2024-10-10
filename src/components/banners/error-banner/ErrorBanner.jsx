import { useState } from "react"
import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { set_app_error } from "../../../store/slices/appSlice"

// hook
import useStateSelectors from "../../../hooks/useStateSelectors"

// util
import isArray from "../../../utils/isArray"

// component
import ShowErrorDetails from "./ShowErrorDetails"
import CloseBannerButton from "../../buttons/CloseBannerButton"

const ErrorBanner = () => {
  const dispatch = useDispatch()
  const {appError} = useStateSelectors()

  // local state
  const [showErrorDetails, setShowErrorDetails] = useState(false)

  const bannerWrapperClass = classNames('relative flex flex-col gap-2 bg-red-400 text-custom-black rounded-lg', {
    'p-3': appError
  })

  if(!isArray(appError)) {
    setTimeout(() => {
      dispatch(set_app_error(''))
    }, 3000)
  }

  return (
    <div className={bannerWrapperClass}>
      <>
        {appError && isArray(appError) &&
          <p className='text-center text-lg xl:text-xl'>
            Ups... something went wrong!
          </p>
        }
      </>
      <>
        {appError && isArray(appError) && !showErrorDetails &&
          <ShowErrorDetails setState={setShowErrorDetails} label='Show errors' />
        }
      </>
      <>
        {appError && isArray(appError) && showErrorDetails &&
          <>
            <ShowErrorDetails setState={setShowErrorDetails} label='Hide errors' />
            <>
              {appError.map((e, index) => (
                <ul key={index}>
                  <>
                    <p
                      className="font-bold"
                    >
                      {e.path === 'confirmPassword'
                        ? 'Confirm Password'
                        : e.path[0].toLocaleUpperCase() + e.path.slice(1).toLocaleLowerCase()
                      }
                    </p>
                  </>
                  <>
                    {e.message.map((m, index) => (
                      <li key={index}
                        className="ml-7 list-disc"
                      >
                        {m}
                      </li>
                    ))}
                  </>
                </ul>
              ))}
            </>
          </>
        }
      </>
      <>
        {appError && !isArray(appError) &&
          <p className='text-center text-lg xl:text-xl'>
            {appError}
          </p>
        }
      </>
      <>
        {appError &&
          <CloseBannerButton 
            showErrorDetails={showErrorDetails} 
            setShowErrorDetails={setShowErrorDetails}
            restrictToErrorBanner={true}
          />
        }
      </>
    </div>
  )
}

export default ErrorBanner
