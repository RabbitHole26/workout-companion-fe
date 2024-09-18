import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useDeleteExercise from "../../hooks/api/exercise/useDeleteExercise"

const DeleteExerciseButton = ({exercise}) => {
  const {isLightMode, exerciseLoading, editExerciseForm} = useStateSelectors()
  const {deleteExercise: handleClick} = useDeleteExercise(exercise)

  const btnClass = classNames('absolute top-0 right-0 btn btn-circle btn-sm no-animation mr-2 mt-2', {
    'bg-neutral-100': isLightMode,
    'bg-neutral-700': !isLightMode,
    'hidden': editExerciseForm
  })

  return (
    <button 
      className={btnClass}
      onClick={handleClick}
    >
      <>
        {exerciseLoading
          ? <span className="text-sm loading loading-spinner"></span>
          : <FontAwesomeIcon className="text-lg" icon={faTrashCan} /> 
        }
      </>
    </button>
  )
}

export default DeleteExerciseButton
