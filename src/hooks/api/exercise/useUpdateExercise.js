import { useDispatch } from "react-redux"

// reducer
import { set_app_error, set_app_success, set_app_loading } from "../../../store/slices/appSlice"
import { update_exercises } from "../../../store/slices/exerciseSlice"
import { set_display_form, set_edit_exercise_form } from "../../../store/slices/forms/exerciseFormSlice"

// hook
import useStateSelectors from "../../useStateSelectors"
import useClearExerciseFormFields from "../../useClearExerciseFormFields"
import useAxiosInstance from "../../useAxiosInstance"

// model
import Exercise from "../../../models/exerciseModel"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useUpdateExercise = () => {
  const dispatch = useDispatch()
  const {exerciseId, exerciseForm, accessToken} = useStateSelectors()
  const {clearExerciseFormFields} = useClearExerciseFormFields()
  const {axiosInstance} = useAxiosInstance()

  const updateExercise = async () => {
    dispatch(set_app_loading(true))

    try {
      const res = await axiosInstance({
        url: `/exercise/${exerciseId}`,
        method: 'patch',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        data: new Exercise(
          exerciseForm.title,
          exerciseForm.reps,
          exerciseForm.weight
        )
      })

      printLogInDevMode('updateExerciseRes: ', res)

      if (res.status === 200) {
        dispatch(update_exercises(res.data))
        clearExerciseFormFields()
        dispatch(set_app_error(null))
        dispatch(set_app_success('Exercise updated!'))
        dispatch(set_edit_exercise_form(false))
        dispatch(set_display_form(false))
      }
    } catch (error) {
      printLogInDevMode('updateExerciseErr: ', error)
      const errorMessage = error.response.data.error 
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_app_loading(false))
    }
  }

  return {updateExercise}
}

export default useUpdateExercise
