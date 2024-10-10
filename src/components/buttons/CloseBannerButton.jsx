import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { 
  set_app_error, 
  set_app_success
} from "../../store/slices/appSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"

const CloseBannerButton = ({
  showErrorDetails,
  setShowErrorDetails,
  restrictToErrorBanner
}) => {
  const dispatch = useDispatch()
  const {isLightMode, appError, appSuccess} = useStateSelectors()

  const btnWrapperClass = classNames('absolute right-3', {
    'top-7': showErrorDetails,
    'top-1/2 transform -translate-y-1/2': !showErrorDetails || appSuccess
  })

  const btnClass = classNames('btn btn-xs btn-square', {
    'bg-stone-800': !isLightMode,
    'hover:bg-neutral-400': isLightMode
  })

  const handleClick = () => {
    if (appError && restrictToErrorBanner) {
      dispatch(set_app_error(null))
      setShowErrorDetails(null)
    } else if (appSuccess) {
      dispatch(set_app_success(null))
    }
  }

  return (
    <div className={btnWrapperClass}>
      <button 
        className={btnClass}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  )
}

export default CloseBannerButton
