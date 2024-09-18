import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import classNames from "classnames"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"

// component
import DeleteExerciseButton from "../buttons/DeleteExerciseButton"
import EditExerciseButton from "../buttons/EditExerciseButton"

const Exercise = ({exercise}) => {
  const {isLightMode} = useStateSelectors()

  const liClass = classNames('relative p-3 mb-2 border-2 rounded-lg', {
    'bg-neutral-200 border-primary': isLightMode,
    'bg-stone-900 border-primary': !isLightMode
  })

  return (
    <li className={liClass}>
      <h3 className="mb-2 italic text-xl text-center">
        {`${exercise?.title[0].toLocaleUpperCase()}${exercise?.title.slice(1).toLocaleLowerCase()}`}
      </h3>
      <p>
        <span className="font-bold">Reps: </span>
        {exercise.reps}
      </p>
      <p>
        <span className="font-bold">Weight: </span>
        <>
          {exercise.weight === 0
            ? <span>body-weight</span>
            : <span>{exercise.weight} kg</span>
          }
        </>
      </p>
      <p>
        <span className="font-bold">Created: </span>
        <>
          {formatDistanceToNow(new Date(exercise.createdAt), {addSuffix: true})}
        </>
      </p>
      <EditExerciseButton exercise={exercise} />
      <DeleteExerciseButton exercise={exercise} />
    </li>
  )
}

export default Exercise
