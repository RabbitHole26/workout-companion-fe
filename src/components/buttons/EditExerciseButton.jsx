import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"

// reducer
import { 
  set_display_form, 
  set_edit_exercise_form, 
  set_title, 
  set_reps,
  set_weight
} from "../../store/slices/forms/exerciseFormSlice"
import { set_exercise_id } from "../../store/slices/exerciseSlice"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"

const EditExerciseButton = ({exercise}) => {
  const dispatch = useDispatch()
  const {isLightMode, exerciseArray} = useStateSelectors()

  const btnClass = classNames('absolute bottom-0 right-0 btn btn-circle btn-sm no-animation mr-2 mb-2', {
    'bg-neutral-100': isLightMode,
    'bg-neutral-700': !isLightMode
  })

  const handleClick = () => {
    const formFields = exerciseArray.find(e => e._id === exercise._id)

    dispatch(set_display_form(true))
    dispatch(set_exercise_id(exercise._id))
    dispatch(set_edit_exercise_form(true))
    dispatch(set_title(formFields.title))
    dispatch(set_reps(formFields.reps))
    dispatch(set_weight(formFields.weight))
  }

  return (
    <button 
      className={btnClass}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faPen} />
    </button>
  )
}

export default EditExerciseButton
