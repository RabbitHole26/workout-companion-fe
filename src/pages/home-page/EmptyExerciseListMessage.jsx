import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useMediaQueries from "../../hooks/useMediaQueries"

const EmptyExerciseListMessage = () => {
  const {exerciseArray} = useStateSelectors()
  const {isMobile} = useMediaQueries()

  const wrapperClass = classNames('flex justify-center items-center', {
  })

  return (
    <div className={wrapperClass}>
      <>
        {isMobile && exerciseArray.length === 0 &&
          <span className="h-custom-nav64 flex gap-2 items-center text-xl">
            <span>
              Tap
            </span>
            <span className="text-primary text-2xl">
              <FontAwesomeIcon
                className="text-lg text-secondary"
                icon={faPlus}
              />
            </span>
            <span>
              to create exercise
            </span>
          </span>
        }
      </>
    </div>
  )
}

export default EmptyExerciseListMessage
