import { useDispatch } from "react-redux"

// reducer
import { set_app_error, set_app_success, set_app_loading } from "../../../store/slices/appSlice"
import { add_exercise} from "../../../store/slices/exerciseSlice"

// hook
import useStateSelectors from "../../useStateSelectors"
import useClearExerciseFormFields from "../../useClearExerciseFormFields"
import useAxiosInstance from "../../useAxiosInstance"

// model
import Exercise from "../../../models/exerciseModel"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useAddExercise = () => {
  const dispatch = useDispatch()
  const {exerciseForm, accessToken} = useStateSelectors()
  const {clearExerciseFormFields} = useClearExerciseFormFields()
  const {axiosInstance} = useAxiosInstance()

  const addExercise = async () => {
    dispatch(set_app_loading(true))

    try {
      console.log('accessTokenInAddExercise: ', accessToken)

      const res = await axiosInstance({
        url: '/exercise/add-new-exercise',
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        data: new Exercise(
          exerciseForm.title, 
          exerciseForm.reps, 
          exerciseForm.weight
        )
      })

      printLogInDevMode('addExerciseRes: ', res)

      if (res.status === 201) {
        dispatch(add_exercise(res.data))
        clearExerciseFormFields()
        dispatch(set_app_error(null))
        dispatch(set_app_success('Exercise added!'))
      }
    } catch (error) {
      printLogInDevMode('addExerciseErr: ', error)
      const errorMessage = error.response.data.error 
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_app_loading(false))
    }
  }
  
  return {addExercise}
}

export default useAddExercise
