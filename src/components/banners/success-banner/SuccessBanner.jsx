import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { set_app_success } from "../../../store/slices/appSlice"

// hook
import useStateSelectors from "../../../hooks/useStateSelectors"

// component
import CloseBannerButton from "../../buttons/CloseBannerButton"

const SuccessBanner = () => {
  const dispatch = useDispatch()
  const {appSuccess} = useStateSelectors()

  const bannerWrapperClass = classNames('relative flex justify-center bg-green-400 text-custom-black rounded-lg', {
    'p-3': appSuccess
  })

  setTimeout(() => {
    dispatch(set_app_success(''))
  }, 2000)

  return (
    <>
      {appSuccess &&
        <div className={bannerWrapperClass}>
          <p className="text-lg xl:text-xl">
            {appSuccess}
          </p>
          <>
            {appSuccess &&
              <CloseBannerButton />
            }
          </>
        </div>
      }
    </>
  )
}

export default SuccessBanner
