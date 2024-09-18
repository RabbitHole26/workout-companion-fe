import { useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"

// reducer
import { set_display_form, set_edit_exercise_form } from "../../store/slices/forms/exerciseFormSlice"

// hooks
import useStateSelectors from "../../hooks/useStateSelectors"
import useClearExerciseFormFields from "../../hooks/useClearExerciseFormFields"


const CloseFormButton = () => {
  const dispatch = useDispatch()
  const {isLightMode} = useStateSelectors()
  const {clearExerciseFormFields} = useClearExerciseFormFields()

  const btnClass = classNames('btn btn-xs btn-square', {
    'bg-stone-800': !isLightMode,
    'hover:bg-neutral-400': isLightMode && !isMobile
  })
  
  const handleClick = () => {
    dispatch(set_display_form(false))
    dispatch(set_edit_exercise_form(false))
    clearExerciseFormFields()
  }

  return (
    <div className="absolute top-3 right-3">
      <button 
        className={btnClass}
        type="button"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  )
}

export default CloseFormButton
