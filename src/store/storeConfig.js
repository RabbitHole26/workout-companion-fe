import { configureStore } from "@reduxjs/toolkit"

// reducers
import appReducer from "./slices/appSlice"
import homeReducer from "./slices/homeSlice"
import authReducer from "./slices/authSlice"
import exerciseReducer from "./slices/exerciseSlice"
import exerciseFormReducer from "./slices/forms/exerciseFormSlice"
import signupFormReducer from "./slices/forms/signupFormSlice"
import loginFormReducer from "./slices/forms/loginFormSlice"

export const storeConfig = configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
    auth: authReducer,
    exercise: exerciseReducer,
    exerciseForm: exerciseFormReducer,
    signupForm: signupFormReducer,
    loginForm: loginFormReducer
  }
})
