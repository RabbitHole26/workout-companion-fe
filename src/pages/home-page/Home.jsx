import { useEffect } from "react"
import { isMobile } from "react-device-detect"
import classNames from "classnames"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useFetchExercises from "../../hooks/api/exercise/useFetchExercises"

// component
import ShowExerciseFormButton from "../../components/buttons/ShowExerciseFormButton"
import HomeLoadingMessage from "./HomeLoadingMessage"
import EmptyExerciseListMessage from "./EmptyExerciseListMessage"
import ExerciseList from "../../components/exercise-list/ExerciseList"
import ExerciseForm from "../../components/exercise-form/ExerciseForm"

const Home = () => {
  const {fetchExercises} = useFetchExercises()
  const {homeLoading, userData, exerciseArray, displayForm} = useStateSelectors()

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
    (async () => {if (userData) fetchExercises()})()
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
              {exerciseArray.length === 0 && !displayForm
                ? (
                    <EmptyExerciseListMessage />
                  )
                : (
                    <div className={exerciseListWrapperClass}>
                      <ExerciseList />
                    </div>
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
