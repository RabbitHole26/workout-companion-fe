import { isMobile } from "react-device-detect"
import classNames from "classnames"

const HomeLoadingMessage = () => {
  const wrapperClass = classNames('flex flex-col items-center justify-center gap-2 text-2xl', {
    'h-custom-nav64': isMobile,
    'h-custom-nav64 lg:h-custom-nav80': !isMobile
  })

  return (
    // <div className="h-custom-nav64 flex flex-col items-center justify-center gap-2 text-2xl">
    <div className={wrapperClass}>
      <span>LOADING</span>
      <span className="loading loading-dots"></span>
    </div>
  )
}

export default HomeLoadingMessage
