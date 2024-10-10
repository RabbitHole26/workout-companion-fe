import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import { 
  set_display_form, 
  set_edit_exercise_form
} from "../../store/slices/forms/exerciseFormSlice.js"

// hook
import useStateSelectors from "../../hooks/useStateSelectors.js"
import useMediaQueries from "../../hooks/useMediaQueries.js"
import useClearExerciseFormFields from "../../hooks/useClearExerciseFormFields.js"

const ShowExerciseFormButton = () => {
  const dispatch = useDispatch()
  const {isLightMode, displayForm} = useStateSelectors()
  const {isMobile, isDesktop} = useMediaQueries()
  const {clearExerciseFormFields} = useClearExerciseFormFields()

  const desktopBtnClass = classNames('no-animation btn border-2 btn-wide', {
    'border-neutral-400': isLightMode,
    'border-neutral-700': !isLightMode
  })

  const handleClick = () => {
    dispatch(set_display_form())
    dispatch(set_edit_exercise_form(false))
    clearExerciseFormFields()
  }

  return (
    <div className={`${isDesktop ? 'pb-2' : ''}`}>
      <>
        {isMobile &&
          <button
            className="btn btn-md btn-secondary btn-circle shadow-md"
            onClick={handleClick}
          >
            <FontAwesomeIcon className="text-xl" icon={displayForm ? faMinus : faPlus} />
          </button>
        }
      </>
      <>
        {isDesktop &&
          <div className="flex justify-center">
            <button
              className={desktopBtnClass}
              onClick={handleClick}
            >
              <div className="flex gap-3">
                <FontAwesomeIcon icon={displayForm ? faCaretUp : faCaretDown} />
                <span>Add new exercise</span>
              </div>
            </button>
          </div>
        }
      </>
    </div>
  )
}

export default ShowExerciseFormButton
