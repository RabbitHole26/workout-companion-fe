import { isMobile } from "react-device-detect"
import classNames from "classnames"

const HomeLoadingMessage = () => {
  const wrapperClass = classNames('flex flex-col items-center justify-center gap-2 text-2xl', {
    'h-custom-max-mobile': isMobile,
    'h-custom-max-mobile lg:h-custom-max-desktop-mobile-lg': !isMobile
  })

  return (
    // <div className="h-custom-max-mobile flex flex-col items-center justify-center gap-2 text-2xl">
    <div className={wrapperClass}>
      <span>LOADING</span>
      <span className="loading loading-dots"></span>
    </div>
  )
}

export default HomeLoadingMessage
