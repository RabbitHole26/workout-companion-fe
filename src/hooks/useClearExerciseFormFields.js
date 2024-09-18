import { useDispatch } from "react-redux"

// reducer
import { 
  set_title,
  set_reps, 
  set_weight
} from "../store/slices/forms/exerciseFormSlice"

const useClearExerciseFormFields = () => {
  const dispatch = useDispatch()

  const clearExerciseFormFields = () => {
    dispatch(set_title(''))
    dispatch(set_reps(''))
    dispatch(set_weight(''))
  }

  return {clearExerciseFormFields}
}

export default useClearExerciseFormFields
