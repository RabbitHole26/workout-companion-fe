import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"
import classNames from "classnames"

// reducer
import { set_home_loading } from "../../store/slices/homeSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
// import useFetchExercises from "../../hooks/api/exercise/useFetchExercises"
import useSearchExercises from "../../hooks/api/search/useSearchExercises"

// component
import ShowExerciseFormButton from "../../components/buttons/ShowExerciseFormButton"
import HomeLoadingMessage from "./HomeLoadingMessage"
import EmptyExerciseListMessage from "./EmptyExerciseListMessage"
import ExerciseList from "../../components/exercise-list/ExerciseList"
import ExerciseForm from "../../components/exercise-form/ExerciseForm"

const Home = () => {
  const dispatch = useDispatch()
  // const {fetchExercises} = useFetchExercises()
  const {searchExercises} = useSearchExercises()
  const {homeLoading, userData, exerciseArray, displayForm} = useStateSelectors()

  // local state
  const [exercisesFetched, setExercisesFetched] = useState(false)

  const homeWrapperClass = classNames('relative', {
    'flex justify-center items-center': homeLoading,
    // 'bg-red-300': ENV_MODE === 'dev'
  })

  const exerciseListWrapperClass = classNames('px-2 pb-2', {
    'pt-2': isMobile && !displayForm,
  })

  const exerciseFormWrapperClass = classNames('px-2 sticky top-[64px] w-full z-[1]', {
    'pt-2': isMobile && displayForm
  })

  useEffect(() => {
    // (async () => {if (userData) fetchExercises()})()
    (async () => {
      if (userData) {
        dispatch(set_home_loading(true))
        await searchExercises()
        setExercisesFetched(true)
        dispatch(set_home_loading(false))
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  return (
    <div className={homeWrapperClass}>
      <>
        {homeLoading && userData &&
          <HomeLoadingMessage />
        }
      </>
      <>
        {!homeLoading && userData &&
          <>
            <div className={exerciseFormWrapperClass}>
              <>
                {!isMobile && userData &&
                  <ShowExerciseFormButton />
                }
              </>
              <>
                {displayForm &&
                  <ExerciseForm />
                }
              </>
            </div>
            <>
              {/* {exerciseArray.length === 0 && !displayForm
                ? (
                    <EmptyExerciseListMessage />
                  )
                : (
                    <div className={exerciseListWrapperClass}>
                      <ExerciseList />
                    </div>
                  )
              } */}
              {exercisesFetched 
                ? (exerciseArray.length === 0 && !displayForm
                    ? (
                        <EmptyExerciseListMessage />
                      )
                    : (
                        <div className={exerciseListWrapperClass}>
                          <ExerciseList />
                        </div>
                      )
                  )
                : (
                    null
                  )
              }
            </>
          </>
        }
      </>
    </div>
  )
}

export default Home
