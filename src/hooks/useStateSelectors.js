import { useSelector } from "react-redux"

// centralized state distribution hook
const useStateSelectors = () => {
  // app
  const theme = useSelector(state => state.app.theme)
  const isLightMode = theme === 'light'
  const savedAvatarUrl = useSelector(state => state.app.savedAvatarUrl)
  const appError = useSelector(state => state.app.appError)
  const appSuccess = useSelector(state => state.app.appSuccess)
  const appLoading = useSelector(state => state.app.appLoading)

  // home
  // const homeError = useSelector(state => state.home.homeError)
  const homeLoading = useSelector(state => state.home.homeLoading)

  // auth
  const userData = useSelector(state => state.auth.userData)
  const accessToken = useSelector(state => state.auth.accessToken)

  // exercise
  const exerciseArray = useSelector(state => state.exercise.exerciseArray)
  const exerciseId = useSelector(state => state.exercise.exerciseId)
  const exerciseLoading = useSelector(state => state.exercise.exerciseLoading)

  // exerciseForm
  const exerciseForm = useSelector(state => state.exerciseForm)
  const displayForm = useSelector(state => state.exerciseForm.displayForm)
  const editExerciseForm = useSelector(state => state.exerciseForm.editExerciseForm)

  // signupForm
  const signupForm = useSelector(state => state.signupForm)

  // loginForm
  const loginForm = useSelector(state => state.loginForm)

  return {
    isLightMode,
    savedAvatarUrl,
    appError,
    appSuccess,
    appLoading,
    // homeError,
    homeLoading,
    userData,
    accessToken,
    exerciseArray,
    exerciseId,
    exerciseLoading,
    exerciseForm,
    displayForm,
    editExerciseForm,
    signupForm,
    loginForm
  }
}

export default useStateSelectors
