import { useMediaQuery } from "react-responsive"

const useMediaQueries = () => {
  const isDesktop = useMediaQuery({minWidth: 1024})
  const isMobile = useMediaQuery({maxWidth: 1023})
  const isMobileHeight = useMediaQuery({maxHeight: 667})

  const Desktop = ({children}) => {return isDesktop ? children : null}
  // const Mobile = ({children}) => {return isMobile ? children : null}

  return {
    isDesktop,
    isMobile,
    isMobileHeight,
    Desktop,
    // Mobile
  }
}

export default useMediaQueries
