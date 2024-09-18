import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const signupFormSlice = createSlice({
  name: 'signupForm',
  initialState,
  reducers : {
    set_signup_username: (state, action) => {
      state.username = action.payload
    },
    set_signup_email: (state, action) => {
      state.email = action.payload
    },
    set_signup_password: (state, action) => {
      state.password = action.payload
    },
    set_signup_confirm_password: (state, action) => {
      state.confirmPassword = action.payload
    }
  }
})

// export action creators for use in components
export const {
  set_signup_username,
  set_signup_email,
  set_signup_password,
  set_signup_confirm_password
} = signupFormSlice.actions

// export slice reducer for use in the store
export default signupFormSlice.reducer
