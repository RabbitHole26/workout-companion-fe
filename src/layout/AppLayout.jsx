import { useLocation } from 'react-router-dom'

// hook
import useStateSelectors from '../hooks/useStateSelectors'
import useMediaQueries from '../hooks/useMediaQueries'

// components
import Navbar from '../components/navbar/Navbar'
import ErrorBanner from '../components/banners/error-banner/ErrorBanner'
import SuccessBanner from '../components/banners/success-banner/SuccessBanner'
import ShowExerciseFormButton from '../components/buttons/ShowExerciseFormButton'

const AppLayout = ({children}) => {
  const {appError, appSuccess, homeLoading, userData} = useStateSelectors()
  const {isMobile} = useMediaQueries()
  const location = useLocation()
  
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className='absolute w-full flex flex-col gap-2 p-2 z-10'>
        <>
          {appError && <ErrorBanner />}
        </>
        <>
          {appSuccess && <SuccessBanner />}
        </>
      </div>
      <Navbar />
      <div className='flex-grow md:mx-[10%]'>
        {children}
      </div>
      <>
        {isMobile && !homeLoading && userData && location.pathname === '/' &&
          <div className='sticky bottom-6 flex justify-end mt-6 mr-6'>
            <ShowExerciseFormButton />
          </div>
        }
      </>
    </div>
  )
}

export default AppLayout
