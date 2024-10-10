import classNames from "classnames"
import useMediaQueries from "../../hooks/useMediaQueries"

const HomeLoadingMessage = () => {
  const {isMobile, isDesktop} = useMediaQueries()

  const wrapperClass = classNames('flex flex-col items-center justify-center gap-2 text-2xl', {
    'h-custom-nav64': isMobile,
    'h-custom-nav80': isDesktop
  })

  return (
    <div className={wrapperClass}>
      <span>LOADING</span>
      <span className="loading loading-dots"></span>
    </div>
  )
}

export default HomeLoadingMessage
