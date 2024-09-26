import { useDispatch } from "react-redux"

// reducer
import { set_exercise_array } from "../../../store/slices/exerciseSlice"
import { set_app_error } from "../../../store/slices/appSlice"

// hook
import useAxiosInstance from "../../useAxiosInstance"
import useStateSelectors from "../../useStateSelectors"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useSearchExercises = () => {
  const dispatch = useDispatch()
  const {axiosInstance} = useAxiosInstance()
  const {accessToken} = useStateSelectors()

  const searchExercises = async (searchTerm) => {
    try {
      const res = await axiosInstance({
        url: '/search/exercises',
        method: 'get',
        params: searchTerm
          ? {searchTerm: searchTerm}
          : {},
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      printLogInDevMode('searchExercisesRes: ', res)

      if (res.status === 200) {
        dispatch(set_exercise_array(res.data))
      }
    } catch (error) {
      printLogInDevMode('searchExerciseErr: ', error)
      const errorMessage = error.response.data.error
      dispatch(set_app_error(errorMessage))
    }
  }

  return {searchExercises}
}

export default useSearchExercises
