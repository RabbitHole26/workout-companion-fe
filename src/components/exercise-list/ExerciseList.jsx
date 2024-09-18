// hook
import useStateSelectors from "../../hooks/useStateSelectors"

// component
import Exercise from "../exercise/Exercise"

const ExerciseList = () => {
  const {exerciseArray, displayForm} = useStateSelectors()

  return (
    <ul className={`${displayForm ? 'pt-2' : ''}`}>
      {exerciseArray && exerciseArray.map(e => (
        <Exercise
          key={e._id}
          exercise={e}
        />
      ))}
    </ul>
  )
}

export default ExerciseList
