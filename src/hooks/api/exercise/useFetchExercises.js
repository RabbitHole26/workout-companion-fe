import { useDispatch } from "react-redux"

// reducer
import { set_exercise_array } from "../../../store/slices/exerciseSlice"
import { set_app_error } from "../../../store/slices/appSlice"
import { set_home_loading } from "../../../store/slices/homeSlice"

// hook
import useStateSelectors from "../../useStateSelectors"
import useAxiosInstance from "../../useAxiosInstance"

// util
import printLogInDevMode from "../../../utils/printLogInDevMode"

const useFetchExercises = () => {
  const dispatch = useDispatch()
  const {accessToken} = useStateSelectors()
  const {axiosInstance} = useAxiosInstance()

  const fetchExercises = async () => {
    try {
      console.log('accessTokenInFetchExercises: ', accessToken)

      const res = await axiosInstance({
        url: '/exercise/',
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      
      printLogInDevMode('fetchExercises: ', res)

      if (res.status === 200)
        dispatch(set_exercise_array(res.data))
    } catch (error) {
      printLogInDevMode('fetchExercisesErr: ', error)
      const errorMessage = error.response.data.error 
      dispatch(set_app_error(errorMessage))
    } finally {
      dispatch(set_home_loading(false))
    }
  }

  return {
    fetchExercises
  }
}

export default useFetchExercises
