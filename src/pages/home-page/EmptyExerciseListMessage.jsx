import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { isMobile } from "react-device-detect"
import classNames from "classnames"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"

const EmptyExerciseListMessage = () => {
  const {exerciseArray} = useStateSelectors()

  const wrapperClass = classNames('flex justify-center items-center', {
  })

  return (
    <div className={wrapperClass}>
      <>
        {isMobile && exerciseArray.length === 0 &&
          <span className="h-custom-max-mobile flex gap-2 items-center text-xl">
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
