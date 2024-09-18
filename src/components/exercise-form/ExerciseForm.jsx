import { useDispatch } from "react-redux"
import classNames from "classnames"

// reducer
import {
  set_title, 
  set_reps, 
  set_weight,  
} from "../../store/slices/forms/exerciseFormSlice.js"

// hook
import useStateSelectors from "../../hooks/useStateSelectors"
import useAddExercise from "../../hooks/api/exercise/useAddExercise.js"
import useUpdateExercise from "../../hooks/api/exercise/useUpdateExercise.js"
import useSetInputClass from "../../hooks/useSetInputClass.js"

// component
import SubmitFormButton from "../buttons/SubmitFormButton.jsx"
import CloseFormButton from "../buttons/CloseFormButton.jsx"

const ExerciseForm = () => {
  const dispatch = useDispatch()
  const {appError, isLightMode, exerciseForm, editExerciseForm} = useStateSelectors()
  const {addExercise} = useAddExercise()
  const {updateExercise} = useUpdateExercise()
  const {setInputClass} = useSetInputClass()

  const formClass = classNames('relative px-3 pb-3 pt-7 rounded-lg', {
    'bg-neutral-300': isLightMode,
    'bg-neutral-600': !isLightMode
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    editExerciseForm
      ? updateExercise()
      : addExercise()
  }

  return (
    <form
      className={formClass}
      onSubmit={handleSubmit}
    >
      {/* TITLE */}
      <div className="flex flex-col">
        <label className="m-2">Exercise title:</label>
        <input
          className={setInputClass('title')}
          type="text"
          onChange={e => dispatch(set_title(e.target.value))}
          value={exerciseForm.title}
        />
      </div>

      {/* REPS */}
      <div className="flex flex-col">
        <label className="m-2">Number of reps:</label>
        <input
          className={setInputClass('reps')}
          type="number"
          onChange={e => dispatch(set_reps(e.target.value))}
          value={exerciseForm.reps}
        />
      </div>

      {/* WEIGHT */}
      <div className="flex flex-col">
        <label className="m-2">Weight (in KG):</label>
        <input
          className={setInputClass('weight')}
          type="number"
          onChange={e => dispatch(set_weight(e.target.value))}
          value={exerciseForm.weight}
        />
      </div>

      {/* FORM SUBMIT BUTTON */}
      <div className="flex justify-center mt-2 mb-5">
        <>
          {editExerciseForm
            ? <SubmitFormButton label='Update exercise' />
            : <SubmitFormButton label='Add exercise' />
          }
        </>
      </div>

      {/* CLOSE FORM BUTTON */}
      <>
        {!appError &&
          <CloseFormButton />
        }
      </>
    </form>
  )
}

export default ExerciseForm
