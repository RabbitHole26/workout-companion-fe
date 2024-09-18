import { useDispatch } from "react-redux"

// reducer
import { delete_exercise, set_exercise_loading } from "../../../store/slices/exerciseSlice"
import { set_app_error, set_app_success } from "../../../store/slices/appSlice"

// hook
import useStateSelectors from "../../useStateSelectors"
import useAxiosInstance from "../../useAxiosInstance"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useDeleteExercise = (exercise) => {
  const dispatch = useDispatch()
  const {accessToken} = useStateSelectors()
  const {axiosInstance} = useAxiosInstance()

  const deleteExercise = async () => {
    dispatch(set_exercise_loading(true))

    try {
      const res = await axiosInstance({
        url: `/exercise/${exercise._id}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      printLogInDevMode('deleteExerciseRes: ', res)

      if (res.status === 200) {
        dispatch(delete_exercise(res.data._id))
        dispatch(set_app_success('Exercise deleted!'))
      }
    } catch (error) {
      printLogInDevMode('deleteExerciseErr: ', error)
      const errorMessage = error.response.data.error 
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_exercise_loading(false))
    }
  }

  return {deleteExercise}
}

export default useDeleteExercise
