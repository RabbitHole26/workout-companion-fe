import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { set_home_loading } from "../../store/slices/homeSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useSearchExercises from "../../hooks/api/search/useSearchExercises"
import useMediaQueries from "../../hooks/useMediaQueries"

// component
import ShowExerciseFormButton from "../../components/buttons/ShowExerciseFormButton"
import HomeLoadingMessage from "./HomeLoadingMessage"
import EmptyExerciseListMessage from "./EmptyExerciseListMessage"
import ExerciseList from "../../components/exercise-list/ExerciseList"
import ExerciseForm from "../../components/exercise-form/ExerciseForm"

const Home = () => {
  const dispatch = useDispatch()
  const {homeLoading, userData, exerciseArray, displayForm} = useStateSelectors()
  const {searchExercises} = useSearchExercises()
  const {isDesktop} = useMediaQueries()

  // local state
  const [exercisesFetched, setExercisesFetched] = useState(false)

  const homeWrapperClass = classNames('relative', {
    'flex justify-center items-center': homeLoading,
  })

  useEffect(() => {
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
            <div className="px-2 pt-2 sticky top-[64px] w-full z-[1]">
              <>
                {isDesktop && userData &&
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
              {exercisesFetched 
                ? (exerciseArray.length === 0 && !displayForm
                    ? (
                        <EmptyExerciseListMessage />
                      )
                    : (
                        <div className="px-2 pb-2">
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
